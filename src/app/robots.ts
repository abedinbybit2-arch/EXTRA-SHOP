import type { MetadataRoute } from "next";

import { siteConfig } from "@/lib/site";

/** Required so the route is emitted as a file rather than served on demand. */
export const dynamic = "force-static";

/** Emitted as robots.txt during the static export. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Personal and transactional views carry no value for crawlers.
      disallow: ["/cart", "/checkout", "/wishlist", "/search"],
    },
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
