import type { Metadata } from "next";

import { PageHeader } from "@/components/common/page-header";
import { ProductGrid } from "@/components/product/product-grid";
import { IMAGES, photoWide } from "@/data/images";
import { newArrivals } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "New arrivals",
  description:
    "The most recent additions to the EXTRA SHOP catalogue, across all nine departments.",
};

export default function NewArrivalsPage() {
  const items = newArrivals();

  return (
    <>
      <PageHeader
        eyebrow="Just landed"
        title="New arrivals"
        description="Every piece added to the floor this season, newest first. New releases are usually limited — the pieces marked as such rarely restock."
        image={photoWide(IMAGES.apparel[2])}
        crumbs={[{ label: "Home", href: "/" }, { label: "New arrivals" }]}
      />

      <div className="container-luxe py-12 lg:py-16">
        <p className="mb-8 text-sm text-muted-foreground">
          <span className="font-medium text-foreground">{items.length}</span>{" "}
          pieces, ordered by release date
        </p>
        <ProductGrid products={items} priorityCount={4} />
      </div>
    </>
  );
}
