import type { Product, ProductColor, ProductSpec, ProductTag } from "@/types";

import { buildGallery, type ImageGroup } from "../images";
import { slugify } from "@/lib/utils";

/**
 * Authoring shape for the catalogue. Seeds carry only the editorial fields;
 * ids, slugs and gallery URLs are derived so they can never drift out of sync.
 */
export interface ProductSeed {
  name: string;
  brand: string;
  category: string;
  /** Photography pool the gallery is drawn from. */
  group: ImageGroup;
  /** Index of the hero frame within that pool. */
  hero: number;
  tagline: string;
  description: string;
  price: number;
  comparePrice?: number;
  rating: number;
  reviewCount: number;
  stock: number;
  colors: ProductColor[];
  sizes?: string[];
  highlights: string[];
  specs: ProductSpec[];
  tags: ProductTag[];
  releasedAt: string;
  unitsSold: number;
}

/** Expand editorial seeds into full product records. */
export function buildProducts(seeds: ProductSeed[]): Product[] {
  return seeds.map((seed) => ({
    ...seed,
    id: slugify(seed.name),
    slug: slugify(seed.name),
    images: buildGallery(seed.group, seed.hero),
  }));
}

/* -------------------------------------------------------------------------- */
/* Shared colour palettes                                                     */
/* -------------------------------------------------------------------------- */

export const LEATHER_COLORS: ProductColor[] = [
  { name: "Cognac", hex: "#96552b" },
  { name: "Espresso", hex: "#3b2a21" },
  { name: "Nero", hex: "#151311" },
];

export const METAL_COLORS: ProductColor[] = [
  { name: "Brushed Steel", hex: "#b9bdc2" },
  { name: "Yellow Gold", hex: "#c8a24c" },
  { name: "Rose Gold", hex: "#c48b76" },
];

export const MONO_COLORS: ProductColor[] = [
  { name: "Obsidian", hex: "#16130f" },
  { name: "Ivory", hex: "#efe9df" },
  { name: "Graphite", hex: "#5b5852" },
];

export const JEWEL_COLORS: ProductColor[] = [
  { name: "18k Yellow", hex: "#c8a24c" },
  { name: "18k Rose", hex: "#c48b76" },
  { name: "Platinum", hex: "#c9ccd1" },
];

export const NEUTRAL_COLORS: ProductColor[] = [
  { name: "Bone", hex: "#e6dfd2" },
  { name: "Olive", hex: "#5c5c3d" },
  { name: "Midnight", hex: "#1c2434" },
];

/* -------------------------------------------------------------------------- */
/* Shared size scales                                                         */
/* -------------------------------------------------------------------------- */

export const APPAREL_SIZES = ["XS", "S", "M", "L", "XL", "XXL"];
export const SHOE_SIZES = ["UK 6", "UK 7", "UK 8", "UK 9", "UK 10", "UK 11"];
export const RING_SIZES = ["48", "50", "52", "54", "56", "58"];
export const STRAP_SIZES = ["36mm", "38mm", "40mm", "42mm"];

/* -------------------------------------------------------------------------- */
/* Shared specification fragments                                             */
/* -------------------------------------------------------------------------- */

/** Rows appended to every product so the spec table is never sparse. */
export const COMMON_SPECS: ProductSpec[] = [
  { label: "Warranty", value: "2-year international coverage" },
  { label: "Packaging", value: "Recycled presentation box & dust bag" },
  { label: "Ships From", value: "New York, United States" },
];
