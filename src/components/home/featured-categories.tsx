import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Reveal } from "@/components/common/reveal";
import { SectionHeading } from "@/components/common/section-heading";
import { categories } from "@/data/categories";
import { categoryCounts } from "@/lib/catalog";
import { getIcon } from "@/lib/icons";
import { cn } from "@/lib/utils";

/** Department tiles. The first two run wide to break the grid rhythm. */
export function FeaturedCategories() {
  const counts = categoryCounts();

  return (
    <section className="container-luxe py-20 lg:py-28">
      <SectionHeading
        eyebrow="The floor plan"
        title="Nine departments, one standard"
        description="Each department is edited by a specialist buyer. Nothing is stocked because it sells — only because it is the best example of its kind."
        action={{ label: "All categories", href: "/categories" }}
      />

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-6">
        {categories.map((category, index) => {
          const Icon = getIcon(category.icon);
          // First two tiles are double-width on large screens.
          const wide = index < 2;

          return (
            <Reveal
              key={category.slug}
              delay={Math.min(index, 6) * 0.05}
              className={cn(wide ? "col-span-2 lg:col-span-3" : "lg:col-span-2")}
            >
              <Link
                href={`/categories/${category.slug}`}
                className="group relative block h-full overflow-hidden rounded-2xl bg-muted"
              >
                <div
                  className={cn(
                    "relative",
                    wide ? "aspect-4/3 lg:aspect-16/9" : "aspect-4/5 lg:aspect-4/3",
                  )}
                >
                  <Image
                    src={category.image}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 33vw, 50vw"
                    className="object-cover transition-transform duration-[900ms] ease-luxe group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent transition-opacity duration-500 group-hover:from-black/85" />
                </div>

                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-5">
                  <div className="min-w-0 text-white">
                    <p className="flex items-center gap-2 text-[10px] uppercase tracking-[0.18em] text-white/70">
                      <Icon className="size-3.5" />
                      {counts[category.slug] ?? 0} pieces
                    </p>
                    <h3 className="mt-1.5 truncate font-display text-xl font-light lg:text-2xl">
                      {category.name}
                    </h3>
                    <p className="mt-0.5 truncate text-xs text-white/70">
                      {category.tagline}
                    </p>
                  </div>

                  <span className="grid size-10 shrink-0 place-items-center rounded-full border border-white/30 bg-white/10 text-white backdrop-blur transition-all duration-400 ease-luxe group-hover:bg-white group-hover:text-black">
                    <ArrowUpRight className="size-4" />
                  </span>
                </div>
              </Link>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
