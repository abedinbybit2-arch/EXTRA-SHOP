"use client";

import { useEffect } from "react";

import { useHydrated } from "@/hooks/use-hydrated";
import { ProductSection } from "@/components/product/product-section";
import { getProducts } from "@/lib/catalog";
import { useRecentlyViewed } from "@/store/recently-viewed";

/**
 * Records the current product in the recently-viewed history and renders the
 * rest of it. Rendering nothing until hydration avoids a mismatch, since the
 * history only exists in localStorage.
 */
export function RecentlyViewed({ currentSlug }: { currentSlug?: string }) {
  const slugs = useRecentlyViewed((s) => s.slugs);
  const hydrated = useHydrated(useRecentlyViewed);
  const record = useRecentlyViewed((s) => s.record);

  useEffect(() => {
    if (currentSlug) record(currentSlug);
  }, [currentSlug, record]);

  if (!hydrated) return null;

  const products = getProducts(slugs.filter((slug) => slug !== currentSlug));
  if (products.length === 0) return null;

  return (
    <ProductSection
      eyebrow="Your history"
      title="Recently viewed"
      products={products.slice(0, 8)}
    />
  );
}
