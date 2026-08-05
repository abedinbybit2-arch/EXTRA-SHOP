import type { Brand } from "@/types";

/**
 * ABEDIN SHOP house brands. These are fictional makers invented for the
 * storefront so the catalogue reads as an original retailer rather than a
 * reseller of existing labels.
 */
export const brands: Brand[] = [
  {
    slug: "aurelian",
    name: "Aurelian",
    origin: "Geneva, Switzerland",
    founded: 1954,
    monogram: "AU",
    description:
      "Fourth-generation watchmakers working out of a converted mill in the Vallée de Joux. Every calibre is regulated in six positions by hand.",
  },
  {
    slug: "meridian-co",
    name: "Meridian & Co.",
    origin: "Glashütte, Germany",
    founded: 1978,
    monogram: "MC",
    description:
      "Instrument watches built to marine chronometer tolerances, with legibility treated as the first design constraint.",
  },
  {
    slug: "maison-vero",
    name: "Maison Vero",
    origin: "Florence, Italy",
    founded: 1931,
    monogram: "MV",
    description:
      "A Florentine leather house working exclusively in vegetable-tanned hides cured over ninety days in chestnut liquor.",
  },
  {
    slug: "bastien",
    name: "Bastien",
    origin: "Paris, France",
    founded: 1996,
    monogram: "BA",
    description:
      "Minimal leather goods with saddle-stitched seams and no visible hardware. Quietly built, quietly worn.",
  },
  {
    slug: "corso-nero",
    name: "Corso Nero",
    origin: "Naples, Italy",
    founded: 1967,
    monogram: "CN",
    description:
      "Goodyear-welted footwear on hand-carved lasts, finished with a patina applied one layer at a time.",
  },
  {
    slug: "lumiere",
    name: "Lumière Atelier",
    origin: "Antwerp, Belgium",
    founded: 1988,
    monogram: "LA",
    description:
      "Fine jewellery set with traceable stones, designed around the way light moves rather than carat weight alone.",
  },
  {
    slug: "eclat",
    name: "Éclat",
    origin: "Jaipur, India",
    founded: 2004,
    monogram: "EC",
    description:
      "Contemporary gold work bridging Rajasthani craft traditions with restrained modern silhouettes.",
  },
  {
    slug: "noctis",
    name: "Noctis Audio",
    origin: "Copenhagen, Denmark",
    founded: 2009,
    monogram: "NO",
    description:
      "Reference listening equipment voiced in an anechoic chamber and machined from a single aluminium billet.",
  },
  {
    slug: "verrier",
    name: "Verrier",
    origin: "Cadore, Italy",
    founded: 1972,
    monogram: "VE",
    description:
      "Eyewear milled from Mazzucchelli block acetate, cured for eight months before a frame is ever cut.",
  },
  {
    slug: "atelier-nord",
    name: "Atelier Nord",
    origin: "Stockholm, Sweden",
    founded: 2011,
    monogram: "AN",
    description:
      "Slow-made apparel in merino, long-staple cotton and Japanese selvedge, cut for a decade of wear.",
  },
  {
    slug: "saint-ambre",
    name: "Saint Ambre",
    origin: "Grasse, France",
    founded: 1949,
    monogram: "SA",
    description:
      "A perfumery working at extrait concentration with naturals harvested within forty kilometres of the atelier.",
  },
  {
    slug: "halcyon",
    name: "Halcyon Living",
    origin: "Kyoto, Japan",
    founded: 1985,
    monogram: "HL",
    description:
      "Furniture and tabletop objects shaped by joinery traditions that refuse glue, screws and shortcuts.",
  },
];

export const brandMap = new Map(brands.map((b) => [b.slug, b]));

export function getBrand(slug: string) {
  return brandMap.get(slug);
}
