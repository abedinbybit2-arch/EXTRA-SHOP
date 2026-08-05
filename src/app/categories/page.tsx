import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { PageHeader } from "@/components/common/page-header";
import { Reveal } from "@/components/common/reveal";
import { categories } from "@/data/categories";
import { categoryCounts } from "@/lib/catalog";
import { getIcon } from "@/lib/icons";

export const metadata: Metadata = {
  title: "Categories",
  description:
    "Nine departments, each edited by a specialist buyer — watches, leather goods, footwear, jewellery, audio, eyewear, apparel, fragrance and home.",
};

export default function CategoriesPage() {
  const counts = categoryCounts();

  return (
    <>
      <PageHeader
        eyebrow="Departments"
        title="Nine departments"
        description="Each is edited by a specialist buyer who is accountable for every piece in it. Nothing is stocked because it sells — only because it is the best example of its kind."
        crumbs={[{ label: "Home", href: "/" }, { label: "Categories" }]}
      />

      <div className="container-luxe py-14 lg:py-20">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category, index) => {
            const Icon = getIcon(category.icon);
            return (
              <Reveal key={category.slug} delay={(index % 3) * 0.08}>
                <Link
                  href={`/categories/${category.slug}`}
                  className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all duration-500 ease-luxe hover:-translate-y-1 hover:shadow-lift"
                >
                  <div className="relative aspect-16/10 overflow-hidden bg-muted">
                    <Image
                      src={category.image}
                      alt=""
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 90vw"
                      className="object-cover transition-transform duration-[900ms] ease-luxe group-hover:scale-105"
                    />
                    <span className="absolute left-4 top-4 flex items-center gap-2 rounded-full bg-black/45 px-3 py-1.5 text-[10px] uppercase tracking-[0.16em] text-white backdrop-blur">
                      <Icon className="size-3.5" />
                      {counts[category.slug] ?? 0} pieces
                    </span>
                  </div>

                  <div className="flex flex-1 flex-col p-6">
                    <p className="text-[11px] uppercase tracking-[0.16em] text-accent">
                      {category.tagline}
                    </p>
                    <h2 className="mt-2 font-display text-2xl font-light">
                      {category.name}
                    </h2>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                      {category.description}
                    </p>
                    <span className="mt-5 inline-flex items-center gap-2 text-sm font-medium transition-colors group-hover:text-accent">
                      Shop {category.name.toLowerCase()}
                      <ArrowUpRight className="size-4 transition-transform duration-400 ease-luxe group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </>
  );
}
