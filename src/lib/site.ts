/**
 * Canonical origin for metadata, Open Graph tags, sitemap and robots.
 *
 * Injected at build time rather than hardcoded, so a local or self-hosted build
 * does not advertise the production hostname. Falls back to the live domain,
 * which is the only public origin.
 */
const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://abedin.shop"
).replace(/\/+$/, "");

/** Single source of truth for brand copy, contact details and navigation. */
export const siteConfig = {
  name: "ABEDIN SHOP",
  tagline: "Objects of lasting desire",
  description:
    "ABEDIN SHOP is a curated destination for modern luxury — watches, fragrance, leather goods, eyewear, audio and fine jewellery from the world's most considered makers.",
  url: siteUrl,
  locale: "en_US",
  contact: {
    email: "concierge@abedin.shop",
    phone: "+1 (212) 555-0139",
    address: "18 Mercer Street, SoHo, New York, NY 10013",
    hours: "Mon – Sat, 9:00 – 20:00 EST",
  },
  social: [
    { label: "Instagram", href: "https://instagram.com" },
    { label: "Pinterest", href: "https://pinterest.com" },
    { label: "YouTube", href: "https://youtube.com" },
    { label: "LinkedIn", href: "https://linkedin.com" },
  ],
} as const;

/** Primary header navigation. */
export const mainNav = [
  { label: "Shop", href: "/shop" },
  { label: "Categories", href: "/categories" },
  { label: "New In", href: "/new-arrivals" },
  { label: "Best Sellers", href: "/best-sellers" },
  { label: "Flash Deals", href: "/flash-deals" },
  { label: "Brands", href: "/brands" },
] as const;

/** Grouped links used by the premium footer. */
export const footerNav = [
  {
    title: "Shop",
    links: [
      { label: "All Products", href: "/shop" },
      { label: "New Arrivals", href: "/new-arrivals" },
      { label: "Best Sellers", href: "/best-sellers" },
      { label: "Flash Deals", href: "/flash-deals" },
      { label: "Offers", href: "/offers" },
      { label: "Brands", href: "/brands" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Categories", href: "/categories" },
      { label: "Contact", href: "/contact" },
      { label: "FAQ", href: "/faq" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Shopping Cart", href: "/cart" },
      { label: "Wishlist", href: "/wishlist" },
      { label: "Checkout", href: "/checkout" },
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Terms & Conditions", href: "/terms" },
    ],
  },
] as const;

/**
 * Rotating announcements in the top utility bar. The demo disclosure leads the
 * rotation — this is a portfolio storefront, and it should never be mistaken
 * for a real shop that takes payments.
 */
export const announcements = [
  "Demo store — a frontend portfolio project. No real orders or payments.",
  "Complimentary express shipping on orders over $250",
  "Extended 60-day returns on every full-price order",
  "New season: Winter Atelier has landed",
] as const;
