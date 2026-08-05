import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Merge conditional class names while letting later Tailwind classes win. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Format a number as a USD price, e.g. 1299.5 -> "$1,299.50". */
export function formatPrice(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

/** Compact review counts, e.g. 1240 -> "1.2k". */
export function formatCompact(value: number) {
  return new Intl.NumberFormat("en-US", { notation: "compact" }).format(value);
}

/** Percentage saved when comparing a sale price against its original. */
export function discountPercent(price: number, comparePrice?: number) {
  if (!comparePrice || comparePrice <= price) return 0;
  return Math.round(((comparePrice - price) / comparePrice) * 100);
}

/** URL-safe slug from an arbitrary label. */
export function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/** Deterministic pseudo-random in [0,1) so dummy data stays stable per build. */
export function seededRandom(seed: number) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

/** Pick `count` items spread evenly through a list without repeating. */
export function sample<T>(items: readonly T[], count: number, offset = 0): T[] {
  if (items.length === 0) return [];
  const result: T[] = [];
  for (let i = 0; i < Math.min(count, items.length); i += 1) {
    result.push(items[(offset + i) % items.length]);
  }
  return result;
}

/** Readable date for reviews and order summaries. */
export function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}
