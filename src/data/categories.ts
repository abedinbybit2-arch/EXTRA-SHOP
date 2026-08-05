import type { Category } from "@/types";

import { IMAGES, photoSquare } from "./images";

/** The nine departments that make up the EXTRA SHOP floor plan. */
export const categories: Category[] = [
  {
    slug: "watches",
    name: "Watches",
    tagline: "Mechanical poetry",
    description:
      "Hand-finished movements, sapphire crystal and cases built to outlive their owners. From dress pieces to dive-rated chronographs.",
    image: photoSquare(IMAGES.watches[5]),
    icon: "Watch",
  },
  {
    slug: "bags",
    name: "Bags & Leather",
    tagline: "Vegetable-tanned, hand-cut",
    description:
      "Full-grain leather goods cut and stitched in small ateliers — top handles, weekenders, billfolds and everyday carry.",
    image: photoSquare(IMAGES.bags[3]),
    icon: "Briefcase",
  },
  {
    slug: "footwear",
    name: "Footwear",
    tagline: "Goodyear-welted",
    description:
      "Derbies, monk straps, boots and low-profile sneakers built on lasts that can be resoled a dozen times over.",
    image: photoSquare(IMAGES.footwear[0]),
    icon: "Footprints",
  },
  {
    slug: "jewellery",
    name: "Fine Jewellery",
    tagline: "Set by hand",
    description:
      "Solid gold, conflict-free stones and pearls matched by lustre. Pieces designed to be layered and lived in.",
    image: photoSquare(IMAGES.jewellery[4]),
    icon: "Gem",
  },
  {
    slug: "audio",
    name: "Audio",
    tagline: "Studio-grade listening",
    description:
      "Reference headphones and monitors tuned by mastering engineers, wrapped in machined aluminium and lambskin.",
    image: photoSquare(IMAGES.audio[3]),
    icon: "Headphones",
  },
  {
    slug: "eyewear",
    name: "Eyewear",
    tagline: "Italian acetate",
    description:
      "Frames milled from block acetate and titanium, finished with mineral or polarised lenses.",
    image: photoSquare(IMAGES.eyewear[2]),
    icon: "Glasses",
  },
  {
    slug: "apparel",
    name: "Apparel",
    tagline: "Considered tailoring",
    description:
      "Outerwear, knitwear and shirting in long-staple cotton, merino and Japanese selvedge.",
    image: photoSquare(IMAGES.apparel[0]),
    icon: "Shirt",
  },
  {
    slug: "fragrance",
    name: "Fragrance & Beauty",
    tagline: "Composed in Grasse",
    description:
      "Extrait-strength perfumes, botanical skincare and grooming oils blended in small batches.",
    image: photoSquare(IMAGES.beauty[3]),
    icon: "SprayCan",
  },
  {
    slug: "living",
    name: "Home & Living",
    tagline: "Objects for the everyday",
    description:
      "Furniture, lighting and tabletop pieces chosen for how they age rather than how they photograph.",
    image: photoSquare(IMAGES.living[2]),
    icon: "Lamp",
  },
];

/** Fast lookup used across product cards and breadcrumbs. */
export const categoryMap = new Map(categories.map((c) => [c.slug, c]));

export function getCategory(slug: string) {
  return categoryMap.get(slug);
}
