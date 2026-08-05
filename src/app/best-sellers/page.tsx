import type { Metadata } from "next";

import { PageHeader } from "@/components/common/page-header";
import { ProductGrid } from "@/components/product/product-grid";
import { IMAGES, photoWide } from "@/data/images";
import { bestSellers } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Best sellers",
  description:
    "The EXTRA SHOP pieces bought most often — ranked by lifetime units sold.",
};

export default function BestSellersPage() {
  const items = bestSellers();

  return (
    <>
      <PageHeader
        eyebrow="Bought most often"
        title="Best sellers"
        description="Ranked by lifetime units sold rather than by what we would like to move. These are the pieces customers come back for and recommend."
        image={photoWide(IMAGES.footwear[4])}
        crumbs={[{ label: "Home", href: "/" }, { label: "Best sellers" }]}
      />

      <div className="container-luxe py-12 lg:py-16">
        <p className="mb-8 text-sm text-muted-foreground">
          <span className="font-medium text-foreground">{items.length}</span>{" "}
          pieces, ranked by units sold
        </p>
        <ProductGrid products={items} priorityCount={4} />
      </div>
    </>
  );
}
