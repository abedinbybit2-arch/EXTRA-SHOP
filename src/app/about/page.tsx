import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { PageHeader } from "@/components/common/page-header";
import { Reveal } from "@/components/common/reveal";
import { Button } from "@/components/ui/button";
import { milestones, valueProps } from "@/data/content";
import { IMAGES, photoWide } from "@/data/images";
import { brands } from "@/data/brands";
import { categories } from "@/data/categories";
import { getIcon } from "@/lib/icons";
import { products } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "About",
  description:
    "ABEDIN SHOP is a curated luxury retailer working directly with twelve houses across nine departments.",
};

export default function AboutPage() {
  const stats = [
    { value: `${brands.length}`, label: "Houses, all direct" },
    { value: `${categories.length}`, label: "Departments" },
    { value: `${products.length}`, label: "Pieces in the catalogue" },
    { value: "94", label: "Countries served" },
  ];

  return (
    <>
      <PageHeader
        eyebrow="Since 2016"
        title="A deliberately small catalogue"
        description="ABEDIN SHOP exists because buying well is hard. We would rather stock sixty pieces we can defend than six thousand we cannot."
        image={photoWide(IMAGES.living[3])}
        crumbs={[{ label: "Home", href: "/" }, { label: "About" }]}
      />

      {/* Stats */}
      <section className="border-b border-border">
        <div className="container-luxe grid grid-cols-2 gap-8 py-12 lg:grid-cols-4 lg:py-16">
          {stats.map((stat, index) => (
            <Reveal key={stat.label} delay={index * 0.06}>
              <div>
                <p className="font-display text-4xl font-light lg:text-5xl">
                  {stat.value}
                </p>
                <p className="mt-2 text-xs uppercase tracking-[0.14em] text-muted-foreground">
                  {stat.label}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Story */}
      <section className="container-luxe py-16 lg:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal direction="right">
            <div className="relative aspect-4/5 overflow-hidden rounded-3xl bg-muted">
              <Image
                src={photoWide(IMAGES.living[2], 900, 1125)}
                alt=""
                fill
                sizes="(min-width: 1024px) 45vw, 90vw"
                className="object-cover"
              />
            </div>
          </Reveal>

          <Reveal direction="left">
            <p className="mb-4 text-[11px] uppercase tracking-[0.22em] text-accent">
              Our position
            </p>
            <h2 className="text-balance text-3xl leading-[1.15] lg:text-4xl">
              We would rather explain a price than discount it
            </h2>
            <div className="mt-7 space-y-5 text-sm leading-relaxed text-muted-foreground">
              <p>
                Most luxury retail is a logistics business wearing a marketing
                costume. Stock is bought on margin, photographed beautifully, and
                described in language that carefully avoids saying anything
                verifiable about how the thing was actually made.
              </p>
              <p>
                We took the opposite position. Every product page on this site
                tells you the construction method, the material grade, and the
                trade-offs — including the ones that might put you off. If a
                watch is heavy, we say so. If a boot needs breaking in, we say
                that too.
              </p>
              <p>
                That only works if we know the answer, which is why the last
                third-party distributor left our supply chain in 2024. Every
                house is now a relationship we hold directly, and every repair is
                routed back to the bench that built the piece.
              </p>
            </div>
            <Button asChild className="mt-9">
              <Link href="/brands">Meet the houses</Link>
            </Button>
          </Reveal>
        </div>
      </section>

      {/* Milestones */}
      <section className="border-y border-border bg-secondary/40 py-16 lg:py-24">
        <div className="container-luxe">
          <p className="mb-4 text-[11px] uppercase tracking-[0.22em] text-accent">
            The route here
          </p>
          <h2 className="mb-14 max-w-2xl text-balance text-3xl leading-[1.15] lg:text-4xl">
            Ten years, five decisions that mattered
          </h2>

          <ol className="relative space-y-10 border-l border-border pl-8 lg:pl-12">
            {milestones.map((milestone, index) => (
              <Reveal key={milestone.year} delay={index * 0.06} as="li">
                <span
                  aria-hidden
                  className="absolute -left-[6px] mt-2 size-3 rounded-full border-2 border-background bg-accent"
                />
                <p className="font-display text-2xl font-light text-accent">
                  {milestone.year}
                </p>
                <h3 className="mt-1.5 font-sans text-base font-medium">
                  {milestone.title}
                </h3>
                <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground">
                  {milestone.body}
                </p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Commitments */}
      <section className="container-luxe py-16 lg:py-24">
        <p className="mb-4 text-[11px] uppercase tracking-[0.22em] text-accent">
          What we commit to
        </p>
        <h2 className="mb-12 max-w-2xl text-balance text-3xl leading-[1.15] lg:text-4xl">
          The promises that cost us money
        </h2>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {valueProps.map((prop, index) => {
            const Icon = getIcon(prop.icon);
            return (
              <Reveal key={prop.title} delay={index * 0.07}>
                <div className="h-full rounded-2xl border border-border bg-card p-7">
                  <span className="mb-6 grid size-12 place-items-center rounded-full bg-accent/10 text-accent">
                    <Icon className="size-5" strokeWidth={1.6} />
                  </span>
                  <h3 className="font-sans text-base font-medium">{prop.title}</h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
                    {prop.body}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>
    </>
  );
}
