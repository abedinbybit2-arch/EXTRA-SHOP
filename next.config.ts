import type { NextConfig } from "next";

/**
 * EXTRA SHOP is a frontend-only storefront, so it ships as a fully static
 * export. On GitHub Pages the site is served from a project subpath
 * (`/EXTRA-SHOP`), which is injected at build time via NEXT_PUBLIC_BASE_PATH so
 * local development still runs from the root.
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  // Emits `/shop/index.html` instead of `/shop.html` so static hosts resolve
  // nested routes without custom rewrite rules.
  trailingSlash: true,
  images: {
    // Static exports have no image optimization server.
    unoptimized: true,
  },
};

export default nextConfig;
