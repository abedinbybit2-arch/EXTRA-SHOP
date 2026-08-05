import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Reveal } from "@/components/common/reveal";
import { SectionHeading } from "@/components/common/section-heading";
import { collections } from "@/data/content";

/** Curated editorial edits linking into filtered views of the catalogue. */
export function Collections() {
  return (
    <section className="container-luxe py-20 lg:py-28">
      <SectionHeading
        eyebrow="Top collections"
        title="Edited by intent, not by category"
        description="Four ways into the catalogue, each assembled around how a piece is actually used rather than what department it sits in."
        action={{ label: "Browse everything", href: "/shop" }}
      />

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {collections.map((collection, index) => (
          <Reveal key={collection.slug} delay={index * 0.07}>
            <Link
              href={collection.href}
              className="group relative block overflow-hidden rounded-2xl bg-muted"
            >
              <div className="relative aspect-3/4">
                <Image
                  src={collection.image}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 90vw"
                  className="object-cover transition-transform duration-[900ms] ease-luxe group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />
              </div>

              <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                <h3 className="font-display text-2xl font-light">{collection.title}</h3>
                <p className="mt-2 text-xs leading-relaxed text-white/75">
                  {collection.body}
                </p>
                <span className="mt-4 inline-flex items-center gap-2 text-xs font-medium">
                  Explore
                  <ArrowRight className="size-3.5 transition-transform duration-400 ease-luxe group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
