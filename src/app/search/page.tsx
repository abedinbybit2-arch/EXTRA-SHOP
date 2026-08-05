import type { Metadata } from "next";
import { Suspense } from "react";

import { PageHeader } from "@/components/common/page-header";
import { SearchResults } from "@/components/shop/search-results";
import { ProductGridSkeleton } from "@/components/ui/skeleton";

export const metadata: Metadata = {
  title: "Search",
  description: "Search the EXTRA SHOP catalogue by product, house or department.",
  // Search result pages carry no standalone value for crawlers.
  robots: { index: false, follow: true },
};

export default function SearchPage() {
  return (
    <>
      <PageHeader
        eyebrow="Search"
        title="Find your piece"
        description="Search across every department by product name, house, material or department."
        crumbs={[{ label: "Home", href: "/" }, { label: "Search" }]}
      />

      <Suspense
        fallback={
          <div className="container-luxe py-12 lg:py-16">
            <ProductGridSkeleton count={8} />
          </div>
        }
      >
        <SearchResults />
      </Suspense>
    </>
  );
}
