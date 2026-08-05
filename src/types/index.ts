/** Domain model for the ABEDIN SHOP storefront. */

/** Merchandising flags that drive the curated landing pages. */
export type ProductTag =
  | "new"
  | "bestseller"
  | "trending"
  | "flash"
  | "limited"
  | "exclusive";

export type StockStatus = "in-stock" | "low-stock" | "out-of-stock";

export interface ProductColor {
  name: string;
  /** CSS colour used for the swatch. */
  hex: string;
}

export interface ProductSpec {
  label: string;
  value: string;
}

export interface Review {
  id: string;
  author: string;
  initials: string;
  rating: number;
  title: string;
  body: string;
  date: string;
  verified: boolean;
  helpful: number;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  /** Slug of the owning brand. */
  brand: string;
  /** Slug of the owning category. */
  category: string;
  tagline: string;
  description: string;
  price: number;
  /** Original price before discount; absent when sold at full price. */
  comparePrice?: number;
  rating: number;
  reviewCount: number;
  /** Units remaining — drives the stock badge. */
  stock: number;
  images: string[];
  colors: ProductColor[];
  sizes?: string[];
  highlights: string[];
  specs: ProductSpec[];
  tags: ProductTag[];
  /** ISO date used for "new arrivals" ordering. */
  releasedAt: string;
  /** Lifetime units sold — drives best-seller ordering. */
  unitsSold: number;
}

export interface Category {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  image: string;
  /** Lucide icon name rendered in navigation. */
  icon: string;
}

export interface Brand {
  slug: string;
  name: string;
  /** Short country/city of origin line. */
  origin: string;
  founded: number;
  description: string;
  /** Monogram shown in the brand tile. */
  monogram: string;
}

export interface CartItem {
  productId: string;
  quantity: number;
  color?: string;
  size?: string;
}

export interface Coupon {
  code: string;
  label: string;
  /** Fractional discount, e.g. 0.15 for 15% off. */
  percentOff: number;
  minimumSpend: number;
}

/** Sort options offered on the shop and search pages. */
export type SortKey =
  | "featured"
  | "newest"
  | "price-asc"
  | "price-desc"
  | "rating"
  | "discount";

export interface ProductFilters {
  categories: string[];
  brands: string[];
  minPrice: number;
  maxPrice: number;
  minRating: number;
  inStockOnly: boolean;
  onSaleOnly: boolean;
}
