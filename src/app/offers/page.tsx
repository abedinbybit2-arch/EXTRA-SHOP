import type { Metadata } from "next";
import { Tag } from "lucide-react";

import { PageHeader } from "@/components/common/page-header";
import { ProductGrid } from "@/components/product/product-grid";
import { Reveal } from "@/components/common/reveal";
import { coupons } from "@/data/content";
import { IMAGES, photoWide } from "@/data/images";
import { onSale } from "@/lib/catalog";
import { formatPrice } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Offers",
  description:
    "Everything currently reduced at EXTRA SHOP, plus the promo codes you can stack on top.",
};

export default function OffersPage() {
  const items = onSale();

  return (
    <>
      <PageHeader
        eyebrow="Reduced"
        title="Current offers"
        description="Every piece currently below its original price, deepest discount first. Promo codes below can be applied on top at checkout."
        image={photoWide(IMAGES.jewellery[1])}
        crumbs={[{ label: "Home", href: "/" }, { label: "Offers" }]}
      />

      <div className="container-luxe py-12 lg:py-16">
        {/* Stackable promo codes */}
        <div className="mb-12 grid gap-4 sm:grid-cols-3">
          {coupons.map((coupon, index) => (
            <Reveal key={coupon.code} delay={index * 0.07}>
              <div className="flex h-full flex-col rounded-2xl border border-dashed border-accent/50 bg-accent/5 p-6">
                <span className="flex items-center gap-2 text-[11px] uppercase tracking-[0.16em] text-accent">
                  <Tag className="size-3.5" />
                  Promo code
                </span>
                <p className="mt-3 font-display text-2xl font-light tracking-wide">
                  {coupon.code}
                </p>
                <p className="mt-2 flex-1 text-sm text-muted-foreground">
                  {coupon.label}
                </p>
                <p className="mt-4 text-xs text-muted-foreground">
                  {coupon.minimumSpend > 0
                    ? `Minimum spend ${formatPrice(coupon.minimumSpend)}`
                    : "No minimum spend"}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <p className="mb-8 text-sm text-muted-foreground">
          <span className="font-medium text-foreground">{items.length}</span>{" "}
          reduced pieces
        </p>
        <ProductGrid products={items} priorityCount={4} />
      </div>
    </>
  );
}
