import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";

import { PageHeader } from "@/components/common/page-header";
import { ShopView } from "@/components/shop/shop-view";
import { ProductGridSkeleton } from "@/components/ui/skeleton";
import { brands, getBrand } from "@/data/brands";
import { byBrand } from "@/lib/catalog";

/** Pre-render one page per house. */
export function generateStaticParams() {
  return brands.map((brand) => ({ slug: brand.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/brands/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const brand = getBrand(slug);
  if (!brand) return { title: "Brand not found" };

  return {
    title: brand.name,
    description: brand.description,
  };
}

export default async function BrandPage({ params }: PageProps<"/brands/[slug]">) {
  const { slug } = await params;
  const brand = getBrand(slug);
  if (!brand) notFound();

  const items = byBrand(slug);

  return (
    <>
      <PageHeader
        eyebrow={`${brand.origin} · Est. ${brand.founded}`}
        title={brand.name}
        description={brand.description}
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Brands", href: "/brands" },
          { label: brand.name },
        ]}
      >
        <p className="mt-8 inline-flex items-center gap-3 rounded-full border border-border bg-card px-5 py-2.5 text-sm">
          <span className="grid size-8 place-items-center rounded-full border border-border font-display text-[11px] tracking-wider text-accent">
            {brand.monogram}
          </span>
          <span className="text-muted-foreground">
            <span className="font-medium text-foreground">{items.length}</span>{" "}
            pieces in the catalogue
          </span>
        </p>
      </PageHeader>

      <div className="container-luxe py-12 lg:py-16">
        <Suspense fallback={<ProductGridSkeleton count={6} />}>
          <ShopView products={items} lockedBrand={slug} />
        </Suspense>
      </div>
    </>
  );
}
