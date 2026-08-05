import type { Metadata } from "next";
import { Zap } from "lucide-react";

import { Countdown } from "@/components/common/countdown";
import { PageHeader } from "@/components/common/page-header";
import { ProductGrid } from "@/components/product/product-grid";
import { IMAGES, photoWide } from "@/data/images";
import { flashDeals } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Flash deals",
  description:
    "A 48-hour flash event across the ABEDIN SHOP floor — deepest reductions first.",
};

export default function FlashDealsPage() {
  const items = flashDeals();

  return (
    <>
      <PageHeader
        eyebrow="48-hour event"
        title="Flash deals"
        description="A deliberately small selection pulled from across the floor. When the clock runs out these prices do not return."
        image={photoWide(IMAGES.audio[4])}
        crumbs={[{ label: "Home", href: "/" }, { label: "Flash deals" }]}
      >
        <div className="mt-9">
          <Countdown
            hours={48}
            className="[&_span]:border-white/20 [&_span]:bg-white/10 [&_span]:text-white [&_span:last-child]:text-white/60"
          />
        </div>
      </PageHeader>

      <div className="container-luxe py-12 lg:py-16">
        <p className="mb-8 flex items-center gap-2 text-sm text-muted-foreground">
          <Zap className="size-4 fill-current text-accent" />
          <span className="font-medium text-foreground">{items.length}</span>{" "}
          pieces in this event, deepest reduction first
        </p>
        <ProductGrid products={items} priorityCount={4} />
      </div>
    </>
  );
}
