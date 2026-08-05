import Link from "next/link";

import { SectionHeading } from "@/components/common/section-heading";
import { brands } from "@/data/brands";

/**
 * Infinite brand marquee. The list is rendered twice so the -50% translation
 * loops seamlessly.
 */
export function BrandsStrip() {
  const marquee = [...brands, ...brands];

  return (
    <section className="border-y border-border bg-secondary/40 py-20 lg:py-24">
      <div className="container-luxe">
        <SectionHeading
          eyebrow="Featured houses"
          title="Twelve makers we work with directly"
          description="No distributors, no third parties. Every house on this list is a relationship we hold ourselves."
          align="center"
          className="mb-12"
        />
      </div>

      <div
        className="group relative flex overflow-hidden"
        // Fade the marquee out at both edges.
        style={{
          maskImage:
            "linear-gradient(90deg, transparent, black 8%, black 92%, transparent)",
          WebkitMaskImage:
            "linear-gradient(90deg, transparent, black 8%, black 92%, transparent)",
        }}
      >
        <ul className="flex shrink-0 animate-marquee items-center gap-4 pr-4 group-hover:[animation-play-state:paused]">
          {marquee.map((brand, index) => (
            <li key={`${brand.slug}-${index}`}>
              <Link
                href={`/brands/${brand.slug}`}
                // Duplicated entries are decorative only.
                aria-hidden={index >= brands.length}
                tabIndex={index >= brands.length ? -1 : undefined}
                className="flex w-64 items-center gap-4 rounded-2xl border border-border bg-card px-6 py-5 transition-all duration-500 ease-luxe hover:-translate-y-1 hover:border-accent/40 hover:shadow-lift"
              >
                <span className="grid size-11 shrink-0 place-items-center rounded-full border border-border font-display text-xs tracking-wider text-accent">
                  {brand.monogram}
                </span>
                <span className="min-w-0">
                  <span className="block truncate font-display text-lg font-light">
                    {brand.name}
                  </span>
                  <span className="block truncate text-[11px] text-muted-foreground">
                    Est. {brand.founded} · {brand.origin.split(",")[1]?.trim()}
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
