import type { Review } from "@/types";

import { seededRandom } from "@/lib/utils";

const AUTHORS = [
  "Elena Marchetti",
  "James Okafor",
  "Priya Raghunathan",
  "Tomas Lindqvist",
  "Amara Diallo",
  "Julian Reyes",
  "Sofia Bergström",
  "Hiroshi Tanaka",
  "Nadia Haddad",
  "Marcus Whitfield",
  "Clara Oyelaran",
  "Dmitri Volkov",
  "Ines Ferreira",
  "Yuki Nakamura",
  "Rowan Blackwood",
];

/** Review bodies keyed loosely by star rating so sentiment matches the score. */
const POSITIVE = [
  {
    title: "Better in person than in photographs",
    body: "I hesitated for weeks before ordering because nothing online quite conveyed the finish. It arrived and the difference was immediate — the weight, the way the edges are finished, the packaging. Three months of daily wear and it looks the same as the day it came out of the box.",
  },
  {
    title: "Worth the wait and the price",
    body: "I bought a cheaper version of this two years ago and replaced it twice. This one has cost me more once and will almost certainly outlast both of them combined. The quality difference is not subtle.",
  },
  {
    title: "Exactly as described",
    body: "The product description is unusually honest — everything listed is accurate, including the things that could have been glossed over. Shipping took four days and arrived beautifully packed.",
  },
  {
    title: "The details are where it shows",
    body: "Anyone can get the broad strokes right. What impressed me here was the finishing on the parts you do not see until you look for them. Clearly made by people who care about the work.",
  },
  {
    title: "Second one I have bought",
    body: "Bought the first as a gift and liked it so much I ordered one for myself a month later. Customer service answered a sizing question within a few hours and got it right.",
  },
];

const MIXED = [
  {
    title: "Excellent, with one small caveat",
    body: "No complaints about the quality at all — it is genuinely lovely. My only note is that it runs slightly smaller than I expected, so check the measurements rather than ordering your usual size. Would still buy again.",
  },
  {
    title: "Very good, took time to break in",
    body: "The first week was stiffer than I anticipated and I nearly returned it. Glad I did not — after about ten days it softened considerably and now it is one of my favourite things. Just be patient with it.",
  },
  {
    title: "Beautiful but consider the weight",
    body: "Superb construction and the finish is flawless. It is noticeably heavier than the alternatives, which I have come to appreciate but which genuinely will not suit everyone. Worth knowing before you order.",
  },
];

/**
 * Generate a stable review set for a product. Reviews are derived from the
 * product slug so the same content renders on every build without a backend.
 */
export function getReviews(slug: string, rating: number, count: number): Review[] {
  const seed = slug.split("").reduce((sum, ch) => sum + ch.charCodeAt(0), 0);
  const total = Math.min(6, Math.max(3, count % 7 || 4));

  return Array.from({ length: total }, (_, index) => {
    const r = seededRandom(seed + index * 17);
    // Weight most reviews toward the product's headline rating.
    const stars = r > 0.78 ? Math.max(3, Math.round(rating) - 1) : Math.round(rating);
    const pool = stars >= Math.round(rating) ? POSITIVE : MIXED;
    const entry = pool[Math.floor(seededRandom(seed + index * 31) * pool.length)];
    const author = AUTHORS[Math.floor(seededRandom(seed + index * 13) * AUTHORS.length)];
    const daysAgo = Math.floor(seededRandom(seed + index * 7) * 240) + 5;
    const date = new Date(Date.UTC(2026, 1, 5) - daysAgo * 86_400_000);

    return {
      id: `${slug}-review-${index}`,
      author,
      initials: author
        .split(" ")
        .map((part) => part[0])
        .join(""),
      rating: stars,
      title: entry.title,
      body: entry.body,
      date: date.toISOString(),
      verified: r > 0.18,
      helpful: Math.floor(seededRandom(seed + index * 23) * 84) + 2,
    };
  });
}

/** Homepage testimonial wall — separate from per-product reviews. */
export const testimonials = [
  {
    id: "t1",
    quote:
      "I have bought from EXTRA SHOP four times now and the packaging alone makes it feel like an occasion. The concierge team answered a sizing question at 11pm on a Sunday.",
    author: "Elena Marchetti",
    role: "Architect, Milan",
    rating: 5,
  },
  {
    id: "t2",
    quote:
      "What sets them apart is the honesty of the product copy. Nothing is oversold. When I asked whether a watch would suit a 16cm wrist they told me plainly that it would not, and recommended something else.",
    author: "James Okafor",
    role: "Photographer, Lagos",
    rating: 5,
  },
  {
    id: "t3",
    quote:
      "Returned a jacket that did not suit me and the refund was processed before the courier had even scanned it back into the warehouse. That is how it should work.",
    author: "Sofia Bergström",
    role: "Editor, Stockholm",
    rating: 5,
  },
  {
    id: "t4",
    quote:
      "The curation is genuinely opinionated rather than a catalogue of everything. I trust it enough now that I browse the new arrivals the way I would read a magazine.",
    author: "Hiroshi Tanaka",
    role: "Product Designer, Kyoto",
    rating: 5,
  },
  {
    id: "t5",
    quote:
      "Three years and eleven orders in. Not one disappointment, and two pieces that I will pass down. The repairs service is the reason I keep coming back.",
    author: "Nadia Haddad",
    role: "Gallery Director, Beirut",
    rating: 5,
  },
  {
    id: "t6",
    quote:
      "I work in manufacturing and I am hard to impress on construction claims. Everything they say about how these are made checks out when you have the object in your hands.",
    author: "Marcus Whitfield",
    role: "Engineer, Toronto",
    rating: 5,
  },
];
