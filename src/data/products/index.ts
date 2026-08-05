import type { Product } from "@/types";

import { apparelProducts } from "./apparel";
import { audioProducts } from "./audio";
import { bagProducts } from "./bags";
import { eyewearProducts } from "./eyewear";
import { footwearProducts } from "./footwear";
import { fragranceProducts } from "./fragrance";
import { jewelleryProducts } from "./jewellery";
import { livingProducts } from "./living";
import { watchProducts } from "./watches";

/** The complete ABEDIN SHOP catalogue, ordered by department. */
export const products: Product[] = [
  ...watchProducts,
  ...bagProducts,
  ...footwearProducts,
  ...jewelleryProducts,
  ...audioProducts,
  ...eyewearProducts,
  ...apparelProducts,
  ...fragranceProducts,
  ...livingProducts,
];

export const productMap = new Map(products.map((p) => [p.slug, p]));
