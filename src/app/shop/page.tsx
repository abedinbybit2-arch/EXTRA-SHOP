import type { Metadata } from "next";
import { Suspense } from "react";

import { PageHeader } from "@/components/common/page-header";
import { ShopView } from "@/components/shop/shop-view";
import { ProductGridSkeleton } from "@/components/ui/skeleton";
import { products } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Shop all",
  description:
    "Browse the complete EXTRA SHOP catalogue — watches, leather goods, footwear, fine jewellery, audio, eyewear, apparel, fragrance and home.",
};

export default function ShopPage() {
  return (
    <>
      <PageHeader
        eyebrow="The catalogue"
        title="Everything on the floor"
        description={`All ${products.length} pieces across nine departments. Filter by department, house, price or rating — the whole catalogue is deliberately small enough to read end to end.`}
        crumbs={[{ label: "Home", href: "/" }, { label: "Shop" }]}
      />

      <div className="container-luxe py-12 lg:py-16">
        {/* useSearchParams requires a Suspense boundary in a static export. */}
        <Suspense fallback={<ProductGridSkeleton count={9} />}>
          <ShopView products={products} />
        </Suspense>
      </div>
    </>
  );
}
