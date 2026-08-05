import type { Coupon } from "@/types";

import { IMAGES, photoSquare, photoWide } from "./images";

/** Hero slider — one editorial slide per season story. */
export const heroSlides = [
  {
    id: "hero-1",
    eyebrow: "Winter Atelier 2026",
    title: "Objects of lasting desire",
    body: "Nine departments, twelve houses, and a catalogue edited down to only what we would own ourselves.",
    cta: { label: "Explore the collection", href: "/shop" },
    secondary: { label: "New arrivals", href: "/new-arrivals" },
    image: photoWide(IMAGES.watches[5]),
    align: "left" as const,
  },
  {
    id: "hero-2",
    eyebrow: "Maison Vero",
    title: "Cut from a single hide",
    body: "Florentine leather goods, vegetable-tanned across ninety days and finished entirely by hand.",
    cta: { label: "Shop leather goods", href: "/categories/bags" },
    secondary: { label: "Meet the house", href: "/brands/maison-vero" },
    image: photoWide(IMAGES.bags[3]),
    align: "left" as const,
  },
  {
    id: "hero-3",
    eyebrow: "Flash event — 48 hours",
    title: "Up to 30% reduced",
    body: "A short, deliberately small selection from across the floor. When it is gone it will not return at this price.",
    cta: { label: "Shop flash deals", href: "/flash-deals" },
    secondary: { label: "View all offers", href: "/offers" },
    image: photoWide(IMAGES.audio[3]),
    align: "left" as const,
  },
];

/** "Why choose us" value propositions. */
export const valueProps = [
  {
    icon: "Truck",
    title: "Complimentary express shipping",
    body: "Free worldwide on orders over $250, dispatched within 24 hours and tracked end to end.",
  },
  {
    icon: "RotateCcw",
    title: "Sixty-day returns",
    body: "Twice the statutory window. Refunds are processed on scan, not on receipt at the warehouse.",
  },
  {
    icon: "ShieldCheck",
    title: "Authenticity guaranteed",
    body: "Every piece ships with house documentation and a two-year international warranty.",
  },
  {
    icon: "Wrench",
    title: "Lifetime repairs",
    body: "Resoling, restringing, refinishing and servicing handled through the original atelier.",
  },
];

/** Curated shopping edits promoted on the homepage. */
export const collections = [
  {
    slug: "the-quiet-edit",
    title: "The Quiet Edit",
    body: "Unbranded, undecorated, and built to be noticed only by the person wearing it.",
    image: photoSquare(IMAGES.apparel[6]),
    href: "/shop?sort=featured",
  },
  {
    slug: "first-heirlooms",
    title: "First Heirlooms",
    body: "Pieces bought once and handed on — mechanical watches, solid gold, welted leather.",
    image: photoSquare(IMAGES.watches[3]),
    href: "/categories/watches",
  },
  {
    slug: "the-travel-case",
    title: "The Travel Case",
    body: "Everything that earns its place in carry-on and nothing that does not.",
    image: photoSquare(IMAGES.bags[0]),
    href: "/categories/bags",
  },
  {
    slug: "listening-room",
    title: "The Listening Room",
    body: "Reference headphones, phono stages and the small things that make a record sound right.",
    image: photoSquare(IMAGES.audio[0]),
    href: "/categories/audio",
  },
];

/** Social gallery strip. */
export const instagramPosts = [
  { id: "ig-1", image: photoSquare(IMAGES.watches[6], 600), likes: 2841 },
  { id: "ig-2", image: photoSquare(IMAGES.bags[5], 600), likes: 1920 },
  { id: "ig-3", image: photoSquare(IMAGES.footwear[3], 600), likes: 3104 },
  { id: "ig-4", image: photoSquare(IMAGES.jewellery[2], 600), likes: 4218 },
  { id: "ig-5", image: photoSquare(IMAGES.audio[1], 600), likes: 1663 },
  { id: "ig-6", image: photoSquare(IMAGES.eyewear[1], 600), likes: 2477 },
];

/** Coupon codes accepted by the cart UI. */
export const coupons: Coupon[] = [
  { code: "WELCOME10", label: "10% off your first order", percentOff: 0.1, minimumSpend: 0 },
  { code: "ATELIER15", label: "15% off orders over $500", percentOff: 0.15, minimumSpend: 500 },
  { code: "WINTER25", label: "25% off orders over $1,500", percentOff: 0.25, minimumSpend: 1500 },
];

export const faqs = [
  {
    category: "Orders & Shipping",
    items: [
      {
        q: "How long will my order take to arrive?",
        a: "Orders placed before 2pm EST are dispatched the same working day. Express delivery is two to four working days worldwide, and standard delivery is five to nine. You will receive a tracking link the moment the parcel is scanned by the courier.",
      },
      {
        q: "Do you ship internationally?",
        a: "We ship to 94 countries. Duties and import taxes are calculated and collected at checkout for most destinations, so there is nothing further to pay on delivery. A handful of territories are billed on arrival by the local carrier — you will be told clearly at checkout if yours is one of them.",
      },
      {
        q: "Is shipping really free?",
        a: "Express shipping is complimentary on every order over $250. Below that threshold it is a flat $12 worldwide. There are no surcharges for remote addresses.",
      },
    ],
  },
  {
    category: "Returns & Exchanges",
    items: [
      {
        q: "What is your returns policy?",
        a: "Sixty days from delivery, twice the statutory minimum. Items must be unworn with the house documentation intact. Refunds are issued when the courier scans the parcel into the network rather than when it reaches our warehouse, so you are not waiting on transit time.",
      },
      {
        q: "Who pays for return shipping?",
        a: "We do, on every order, in every country we ship to. A prepaid label is generated from your order page in two clicks.",
      },
      {
        q: "Can I exchange for a different size?",
        a: "Yes. Start an exchange from your order page and we reserve the replacement size immediately, before the original is returned, so you are not competing with other customers for stock.",
      },
    ],
  },
  {
    category: "Products & Care",
    items: [
      {
        q: "Are your products authentic?",
        a: "Every piece is produced by the house named on the listing and ships with its documentation. ABEDIN SHOP works directly with each atelier — there are no third-party resellers anywhere in our supply chain.",
      },
      {
        q: "Do you offer repairs?",
        a: "Lifetime repairs on everything we sell, routed back to the original atelier. Resoling, restringing, movement servicing, refinishing and strap replacement are all handled through us at cost.",
      },
      {
        q: "How should I care for leather goods?",
        a: "Keep them dry, condition twice a year with a neutral cream, and store them stuffed and out of direct sunlight. Vegetable-tanned leather will darken — that is the material behaving correctly, not a fault.",
      },
    ],
  },
  {
    category: "Payment & Security",
    items: [
      {
        q: "What payment methods do you accept?",
        a: "Cash on delivery only. You pay the courier in cash when the order reaches you — nothing is charged when you place the order, and we never ask for card or account details.",
      },
      {
        q: "Is my payment information secure?",
        a: "There is no payment information to secure — we take no card or account details at any point, because every order is paid in cash on delivery. The site itself is served entirely over TLS 1.3.",
      },
      {
        q: "Can I pay in my local currency?",
        a: "Prices display in your local currency based on your location, and you are charged in that currency at checkout, so there is no conversion fee from your bank.",
      },
    ],
  },
];

/** Milestones shown on the About page. */
export const milestones = [
  { year: "2016", title: "Founded in SoHo", body: "Three people, one showroom, and four houses willing to take a risk on an unknown retailer." },
  { year: "2019", title: "The repairs atelier", body: "We opened our own workshop so that a repair never meant sending a customer elsewhere." },
  { year: "2022", title: "Ninety-four countries", body: "Duties-paid shipping rolled out across the majority of our international markets." },
  { year: "2024", title: "Direct-to-atelier", body: "The last third-party distributor left our supply chain. Every house is now a direct relationship." },
  { year: "2026", title: "Twelve houses, nine departments", body: "The catalogue reached its current shape — deliberately small, and edited every season." },
];
