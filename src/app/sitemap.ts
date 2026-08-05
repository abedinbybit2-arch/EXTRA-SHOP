import type { MetadataRoute } from "next";

import { brands } from "@/data/brands";
import { categories } from "@/data/categories";
import { products } from "@/data/products";
import { siteConfig } from "@/lib/site";

/** Required so the route is emitted as a file rather than served on demand. */
export const dynamic = "force-static";

/** Static routes, paired with the priority we want crawlers to see. */
const STATIC_ROUTES: [string, number][] = [
  ["", 1],
  ["/shop", 0.9],
  ["/categories", 0.8],
  ["/brands", 0.8],
  ["/new-arrivals", 0.8],
  ["/best-sellers", 0.8],
  ["/flash-deals", 0.7],
  ["/offers", 0.7],
  ["/about", 0.5],
  ["/contact", 0.5],
  ["/faq", 0.5],
  ["/privacy-policy", 0.3],
  ["/terms", 0.3],
];

/** Emitted as sitemap.xml during the static export. */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const url = (path: string) => `${siteConfig.url}${path}`;

  return [
    ...STATIC_ROUTES.map(([path, priority]) => ({
      url: url(path),
      lastModified,
      changeFrequency: "weekly" as const,
      priority,
    })),
    ...categories.map((category) => ({
      url: url(`/categories/${category.slug}`),
      lastModified,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
    ...brands.map((brand) => ({
      url: url(`/brands/${brand.slug}`),
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    ...products.map((product) => ({
      url: url(`/product/${product.slug}`),
      lastModified: new Date(product.releasedAt),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
  ];
}
