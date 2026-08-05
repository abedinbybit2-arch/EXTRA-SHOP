import { brandMap } from "@/data/brands";
import { categoryMap } from "@/data/categories";
import { products, productMap } from "@/data/products";
import type {
  Product,
  ProductFilters,
  ProductTag,
  SortKey,
  StockStatus,
} from "@/types";

import { discountPercent } from "./utils";

export { products, productMap };

/* -------------------------------------------------------------------------- */
/* Lookups                                                                    */
/* -------------------------------------------------------------------------- */

export function getProduct(slug: string): Product | undefined {
  return productMap.get(slug);
}

export function getProducts(slugs: string[]): Product[] {
  return slugs
    .map((slug) => productMap.get(slug))
    .filter((p): p is Product => Boolean(p));
}

/** Lowest and highest price in the catalogue — seeds the price filter. */
export const priceBounds = {
  min: 0,
  max: Math.ceil(Math.max(...products.map((p) => p.price)) / 100) * 100,
};

/* -------------------------------------------------------------------------- */
/* Derived state                                                              */
/* -------------------------------------------------------------------------- */

export function stockStatus(product: Product): StockStatus {
  if (product.stock <= 0) return "out-of-stock";
  if (product.stock <= 8) return "low-stock";
  return "in-stock";
}

export function stockLabel(product: Product): string {
  const status = stockStatus(product);
  if (status === "out-of-stock") return "Sold out";
  if (status === "low-stock") return `Only ${product.stock} left`;
  return "In stock";
}

export function hasDiscount(product: Product) {
  return discountPercent(product.price, product.comparePrice) > 0;
}

/* -------------------------------------------------------------------------- */
/* Curated collections                                                        */
/* -------------------------------------------------------------------------- */

export function byTag(tag: ProductTag, limit?: number): Product[] {
  const list = products.filter((p) => p.tags.includes(tag));
  return typeof limit === "number" ? list.slice(0, limit) : list;
}

export function byCategory(slug: string, limit?: number): Product[] {
  const list = products.filter((p) => p.category === slug);
  return typeof limit === "number" ? list.slice(0, limit) : list;
}

export function byBrand(slug: string, limit?: number): Product[] {
  const list = products.filter((p) => p.brand === slug);
  return typeof limit === "number" ? list.slice(0, limit) : list;
}

/** Newest first, by release date. */
export function newArrivals(limit?: number): Product[] {
  const list = [...products].sort(
    (a, b) => Date.parse(b.releasedAt) - Date.parse(a.releasedAt),
  );
  return typeof limit === "number" ? list.slice(0, limit) : list;
}

/** Highest lifetime units sold. */
export function bestSellers(limit?: number): Product[] {
  const list = [...products]
    .filter((p) => p.tags.includes("bestseller"))
    .sort((a, b) => b.unitsSold - a.unitsSold);
  return typeof limit === "number" ? list.slice(0, limit) : list;
}

export function trending(limit?: number): Product[] {
  const list = [...products]
    .filter((p) => p.tags.includes("trending"))
    .sort((a, b) => b.rating * b.reviewCount - a.rating * a.reviewCount);
  return typeof limit === "number" ? list.slice(0, limit) : list;
}

/** Flash-sale line-up, deepest discount first. */
export function flashDeals(limit?: number): Product[] {
  const list = products
    .filter((p) => p.tags.includes("flash") && hasDiscount(p))
    .sort(
      (a, b) =>
        discountPercent(b.price, b.comparePrice) -
        discountPercent(a.price, a.comparePrice),
    );
  return typeof limit === "number" ? list.slice(0, limit) : list;
}

/** Everything currently reduced, regardless of tag. */
export function onSale(limit?: number): Product[] {
  const list = products
    .filter(hasDiscount)
    .sort(
      (a, b) =>
        discountPercent(b.price, b.comparePrice) -
        discountPercent(a.price, a.comparePrice),
    );
  return typeof limit === "number" ? list.slice(0, limit) : list;
}

/** Highest rated across the whole floor. */
export function topRated(limit = 8): Product[] {
  return [...products]
    .sort((a, b) => b.rating - a.rating || b.reviewCount - a.reviewCount)
    .slice(0, limit);
}

/**
 * Related products: same category first, then the same brand, never the
 * product itself.
 */
export function relatedProducts(product: Product, limit = 4): Product[] {
  const sameCategory = products.filter(
    (p) => p.slug !== product.slug && p.category === product.category,
  );
  const sameBrand = products.filter(
    (p) =>
      p.slug !== product.slug &&
      p.brand === product.brand &&
      p.category !== product.category,
  );
  return [...sameCategory, ...sameBrand].slice(0, limit);
}

/* -------------------------------------------------------------------------- */
/* Search                                                                     */
/* -------------------------------------------------------------------------- */

/**
 * Weighted keyword search across name, brand, category and tagline. Ranked so
 * a name match always outranks an incidental description match.
 */
export function searchProducts(query: string, limit?: number): Product[] {
  const term = query.trim().toLowerCase();
  if (!term) return [];

  const scored = products
    .map((product) => {
      const brand = brandMap.get(product.brand)?.name.toLowerCase() ?? "";
      const category = categoryMap.get(product.category)?.name.toLowerCase() ?? "";
      const name = product.name.toLowerCase();

      let score = 0;
      if (name.startsWith(term)) score += 100;
      else if (name.includes(term)) score += 60;
      if (brand.includes(term)) score += 30;
      if (category.includes(term)) score += 20;
      if (product.tagline.toLowerCase().includes(term)) score += 10;
      if (product.description.toLowerCase().includes(term)) score += 4;
      if (product.tags.some((tag) => tag.includes(term))) score += 8;

      return { product, score };
    })
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score || b.product.rating - a.product.rating);

  const list = scored.map((entry) => entry.product);
  return typeof limit === "number" ? list.slice(0, limit) : list;
}

/* -------------------------------------------------------------------------- */
/* Filtering & sorting                                                        */
/* -------------------------------------------------------------------------- */

export const defaultFilters: ProductFilters = {
  categories: [],
  brands: [],
  minPrice: priceBounds.min,
  maxPrice: priceBounds.max,
  minRating: 0,
  inStockOnly: false,
  onSaleOnly: false,
};

export function filterProducts(
  list: Product[],
  filters: ProductFilters,
): Product[] {
  return list.filter((product) => {
    if (filters.categories.length && !filters.categories.includes(product.category)) {
      return false;
    }
    if (filters.brands.length && !filters.brands.includes(product.brand)) {
      return false;
    }
    if (product.price < filters.minPrice || product.price > filters.maxPrice) {
      return false;
    }
    if (product.rating < filters.minRating) return false;
    if (filters.inStockOnly && product.stock <= 0) return false;
    if (filters.onSaleOnly && !hasDiscount(product)) return false;
    return true;
  });
}

export const sortOptions: { value: SortKey; label: string }[] = [
  { value: "featured", label: "Featured" },
  { value: "newest", label: "Newest first" },
  { value: "price-asc", label: "Price: low to high" },
  { value: "price-desc", label: "Price: high to low" },
  { value: "rating", label: "Highest rated" },
  { value: "discount", label: "Biggest discount" },
];

export function sortProducts(list: Product[], sort: SortKey): Product[] {
  const sorted = [...list];
  switch (sort) {
    case "newest":
      return sorted.sort((a, b) => Date.parse(b.releasedAt) - Date.parse(a.releasedAt));
    case "price-asc":
      return sorted.sort((a, b) => a.price - b.price);
    case "price-desc":
      return sorted.sort((a, b) => b.price - a.price);
    case "rating":
      return sorted.sort((a, b) => b.rating - a.rating || b.reviewCount - a.reviewCount);
    case "discount":
      return sorted.sort(
        (a, b) =>
          discountPercent(b.price, b.comparePrice) -
          discountPercent(a.price, a.comparePrice),
      );
    case "featured":
    default:
      // Featured blends social proof with merchandising priority.
      return sorted.sort(
        (a, b) =>
          b.tags.length * 1000 + b.unitsSold / 100 -
          (a.tags.length * 1000 + a.unitsSold / 100),
      );
  }
}

/** Count of products per category — powers the filter sidebar badges. */
export function categoryCounts(): Record<string, number> {
  return products.reduce<Record<string, number>>((acc, product) => {
    acc[product.category] = (acc[product.category] ?? 0) + 1;
    return acc;
  }, {});
}

/** Count of products per brand. */
export function brandCounts(): Record<string, number> {
  return products.reduce<Record<string, number>>((acc, product) => {
    acc[product.brand] = (acc[product.brand] ?? 0) + 1;
    return acc;
  }, {});
}
