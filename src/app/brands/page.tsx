import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

import { PageHeader } from "@/components/common/page-header";
import { Reveal } from "@/components/common/reveal";
import { brands } from "@/data/brands";
import { brandCounts } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Brands",
  description:
    "The twelve houses EXTRA SHOP works with directly — no distributors, no third parties.",
};

export default function BrandsPage() {
  const counts = brandCounts();

  return (
    <>
      <PageHeader
        eyebrow="The makers"
        title="Twelve houses"
        description="Every house on this list is a direct relationship. The last third-party distributor left our supply chain in 2024, which is why we can speak to how each piece is made."
        crumbs={[{ label: "Home", href: "/" }, { label: "Brands" }]}
      />

      <div className="container-luxe py-14 lg:py-20">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {brands.map((brand, index) => (
            <Reveal key={brand.slug} delay={(index % 3) * 0.07}>
              <Link
                href={`/brands/${brand.slug}`}
                className="group flex h-full flex-col rounded-2xl border border-border bg-card p-7 transition-all duration-500 ease-luxe hover:-translate-y-1 hover:border-accent/40 hover:shadow-lift"
              >
                <div className="flex items-start justify-between gap-4">
                  <span className="grid size-14 shrink-0 place-items-center rounded-full border border-border font-display text-sm tracking-wider text-accent transition-colors duration-500 group-hover:border-accent">
                    {brand.monogram}
                  </span>
                  <ArrowUpRight className="size-4 text-muted-foreground transition-all duration-400 ease-luxe group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
                </div>

                <h2 className="mt-6 font-display text-2xl font-light">
                  {brand.name}
                </h2>
                <p className="mt-1.5 text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                  {brand.origin} · Est. {brand.founded}
                </p>
                <p className="mt-4 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {brand.description}
                </p>
                <p className="mt-6 border-t border-border pt-5 text-xs text-muted-foreground">
                  <span className="font-medium text-foreground">
                    {counts[brand.slug] ?? 0}
                  </span>{" "}
                  pieces in the catalogue
                </p>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </>
  );
}
