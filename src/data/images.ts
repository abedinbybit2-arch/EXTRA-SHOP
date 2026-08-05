/**
 * Curated photography pool.
 *
 * Every identifier below was verified to resolve and was reviewed visually so
 * products are never paired with mismatched imagery. Frames showing real-world
 * brand marks were deliberately excluded — ABEDIN SHOP ships its own house
 * brands, so borrowed logos would undercut the identity.
 */

const UNSPLASH = "https://images.unsplash.com/photo-";

/** Build a sized Unsplash URL for a verified photo id. */
export function photo(id: string, width = 900, height = 1125) {
  return `${UNSPLASH}${id}?auto=format&fit=crop&w=${width}&h=${height}&q=80`;
}

/** Wide crop for hero banners and editorial bands. */
export function photoWide(id: string, width = 1800, height = 1000) {
  return `${UNSPLASH}${id}?auto=format&fit=crop&w=${width}&h=${height}&q=80`;
}

/** Square crop for category tiles and the social gallery. */
export function photoSquare(id: string, size = 800) {
  return `${UNSPLASH}${id}?auto=format&fit=crop&w=${size}&h=${size}&q=80`;
}

export const IMAGES = {
  watches: [
    "1434056886845-dac89ffe9b56",
    "1508057198894-247b23fe5ade",
    "1508685096489-7aacd43bd3b1",
    "1509048191080-d2984bad6ae5",
    "1523170335258-f5ed11844a49",
    "1523275335684-37898b6baf30",
    "1524805444758-089113d48a6d",
    "1533139502658-0198f920d8e8",
    "1546868871-7041f2a55e12",
    "1548171915-e79a380a2a4b",
    "1587836374828-4dbafa94cf0e",
    "1614164185128-e4ec99c436d7",
    "1622434641406-a158123450f9",
  ],
  bags: [
    "1553062407-98eeb64c6a62",
    "1566150905458-1bf1fc113f0d",
    "1584917865442-de89df76afd3",
    "1590874103328-eac38a683ce7",
    "1591561954557-26941169b49e",
    "1594223274512-ad4803739b7c",
    "1627123424574-724758594e93",
  ],
  footwear: [
    "1449505278894-297fdb3edbc1",
    "1491553895911-0055eca6402d",
    "1520639888713-7851133b1ed0",
    "1531310197839-ccf54634509e",
    "1533867617858-e7b97e060509",
    "1543163521-1bf539c55dd2",
    "1560343090-f0409e92791a",
    "1560769629-975ec94e6a86",
    "1582897085656-c636d006a246",
    "1608256246200-53e635b5b65f",
    "1614252235316-8c857d38b5f4",
  ],
  jewellery: [
    "1515562141207-7a88fb7ce338",
    "1573408301185-9146fe634ad0",
    "1599643478518-a784e5dc4c8f",
    "1602173574767-37ac01994b2a",
    "1605100804763-247f67b3557e",
    "1611085583191-a3b181a88401",
    "1611591437281-460bfbe1220a",
  ],
  audio: [
    "1483412033650-1015ddeb83d1",
    "1484704849700-f032a568e944",
    "1487215078519-e21cc028cb29",
    "1505740420928-5e560c06d30e",
    "1546435770-a3e426bf472b",
    "1583394838336-acd977736f90",
    "1590658268037-6bf12165a8df",
  ],
  eyewear: [
    "1473496169904-658ba7c44d8a",
    "1508296695146-257a814070b4",
    "1511499767150-a48a237f0083",
    "1574258495973-f010dfbb5371",
    "1577803645773-f96470509666",
  ],
  apparel: [
    "1487222477894-8943e31ef7b2",
    "1489987707025-afc232f7ea0f",
    "1490481651871-ab68de25d43d",
    "1523381210434-271e8be1f52b",
    "1594633312681-425c7b97ccd1",
    "1596755094514-f87e34085b2c",
    "1618354691373-d851c5c3a990",
  ],
  beauty: [
    "1526947425960-945c6e72858f",
    "1547887538-047f814bfb64",
    "1571875257727-256c39da42af",
    "1615634260167-c8cdede054de",
    "1620503374956-c942862f0372",
  ],
  living: [
    "1441986300917-64674bd600d8",
    "1522708323590-d24dbb6b0267",
    "1567538096630-e0c55bd6374c",
    "1586023492125-27b2c045efd7",
  ],
} as const;

export type ImageGroup = keyof typeof IMAGES;

/**
 * Build a four-shot gallery: the product's hero frame followed by supporting
 * frames drawn from the same category so the set stays visually coherent.
 */
export function buildGallery(group: ImageGroup, heroIndex: number): string[] {
  const pool = IMAGES[group];
  const hero = pool[heroIndex % pool.length];
  const gallery = [photo(hero)];
  for (let offset = 1; offset < 4; offset += 1) {
    gallery.push(photo(pool[(heroIndex + offset * 2 + 1) % pool.length]));
  }
  return gallery;
}
