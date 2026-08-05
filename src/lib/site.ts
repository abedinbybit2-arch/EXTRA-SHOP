/** Single source of truth for brand copy, contact details and navigation. */
export const siteConfig = {
  name: "EXTRA SHOP",
  tagline: "Objects of lasting desire",
  description:
    "EXTRA SHOP is a curated destination for modern luxury — watches, fragrance, leather goods, eyewear, audio and fine jewellery from the world's most considered makers.",
  url: "https://abedinbybit2-arch.github.io/EXTRA-SHOP",
  locale: "en_US",
  contact: {
    email: "concierge@extrashop.com",
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

/** Rotating announcements in the top utility bar. */
export const announcements = [
  "Complimentary express shipping on orders over $250",
  "Extended 60-day returns on every full-price order",
  "New season: Winter Atelier has landed",
] as const;
