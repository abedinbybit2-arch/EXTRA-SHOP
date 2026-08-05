import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";

import { PageHeader } from "@/components/common/page-header";
import { ShopView } from "@/components/shop/shop-view";
import { ProductGridSkeleton } from "@/components/ui/skeleton";
import { categories, getCategory } from "@/data/categories";
import { byCategory } from "@/lib/catalog";

/** Pre-render one page per department — required for a static export. */
export function generateStaticParams() {
  return categories.map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/categories/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) return { title: "Category not found" };

  return {
    title: category.name,
    description: category.description,
    openGraph: {
      title: `${category.name} — ABEDIN SHOP`,
      description: category.description,
      images: [category.image],
    },
  };
}

export default async function CategoryPage({
  params,
}: PageProps<"/categories/[slug]">) {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) notFound();

  const items = byCategory(slug);

  return (
    <>
      <PageHeader
        eyebrow={category.tagline}
        title={category.name}
        description={category.description}
        image={category.image}
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Categories", href: "/categories" },
          { label: category.name },
        ]}
      />

      <div className="container-luxe py-12 lg:py-16">
        <Suspense fallback={<ProductGridSkeleton count={6} />}>
          <ShopView products={items} lockedCategory={slug} />
        </Suspense>
      </div>
    </>
  );
}
