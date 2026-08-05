import { ArrowRight, Zap } from "lucide-react";
import Link from "next/link";

import { Countdown } from "@/components/common/countdown";
import { ProductCarousel } from "@/components/product/product-carousel";
import { Button } from "@/components/ui/button";
import { flashDeals } from "@/lib/catalog";

/** High-contrast flash-sale band with a live countdown. */
export function FlashSale() {
  const deals = flashDeals(8);
  if (deals.length === 0) return null;

  return (
    <section className="relative overflow-hidden bg-primary py-20 text-primary-foreground lg:py-28">
      {/* Subtle gold wash so the band does not read as flat black. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.14]"
        style={{
          backgroundImage:
            "radial-gradient(60% 60% at 15% 0%, var(--gold) 0%, transparent 60%), radial-gradient(50% 50% at 90% 100%, var(--gold) 0%, transparent 55%)",
        }}
      />

      <div className="container-luxe relative">
        <div className="mb-12 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-xl">
            <p className="mb-4 flex items-center gap-2.5 text-[11px] uppercase tracking-[0.22em] text-gold">
              <Zap className="size-3.5 fill-current" />
              Flash event
            </p>
            <h2 className="text-balance text-3xl leading-[1.1] md:text-4xl lg:text-[2.75rem]">
              Forty-eight hours, then it closes
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-primary-foreground/70 md:text-base">
              A deliberately small selection pulled from across the floor. These
              prices do not return when the clock runs out.
            </p>
          </div>

          <div className="flex flex-col gap-6 lg:items-end">
            <Countdown
              hours={48}
              className="[&_span]:border-white/15 [&_span]:bg-white/8 [&_span]:text-primary-foreground"
            />
            <Button asChild variant="gold" size="lg">
              <Link href="/flash-deals">
                Shop all deals
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>
        </div>

        {/* Scoped overrides so cards read correctly on the dark band. */}
        <div className="[&_.text-muted-foreground]:text-primary-foreground/60 [&_h3]:text-primary-foreground">
          <ProductCarousel products={deals} />
        </div>
      </div>
    </section>
  );
}
