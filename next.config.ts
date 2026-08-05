import type { NextConfig } from "next";

/**
 * ABEDIN SHOP is a frontend-only storefront, so it ships as a fully static
 * export. Production is served from the root of abedin.shop; the base path is
 * left configurable for hosts that serve the site from a subdirectory.
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
