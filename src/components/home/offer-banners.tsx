import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Countdown } from "@/components/common/countdown";
import { Reveal } from "@/components/common/reveal";
import { Badge } from "@/components/ui/badge";
import { IMAGES, photoWide } from "@/data/images";

const BANNERS = [
  {
    id: "banner-atelier",
    badge: "Members only",
    title: "15% off the Atelier list",
    body: "Use ATELIER15 on any order above $500 through the end of the season.",
    cta: { label: "Shop the offer", href: "/offers" },
    image: photoWide(IMAGES.jewellery[3], 1200, 800),
  },
  {
    id: "banner-welcome",
    badge: "First order",
    title: "10% off your first purchase",
    body: "Enter WELCOME10 at checkout — no minimum spend, valid across every department.",
    cta: { label: "Start shopping", href: "/shop" },
    image: photoWide(IMAGES.footwear[3], 1200, 800),
  },
];

/** Two promotional cards, one carrying the live countdown. */
export function OfferBanners() {
  return (
    <section className="container-luxe py-20 lg:py-28">
      <div className="grid gap-5 lg:grid-cols-2">
        {BANNERS.map((banner, index) => (
          <Reveal key={banner.id} delay={index * 0.08}>
            <div className="group relative h-full overflow-hidden rounded-3xl">
              <div className="relative aspect-16/10 lg:aspect-3/2">
                <Image
                  src={banner.image}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 50vw, 95vw"
                  className="object-cover transition-transform duration-[900ms] ease-luxe group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-black/85 via-black/50 to-black/15" />
              </div>

              <div className="absolute inset-0 flex flex-col justify-center p-8 text-white lg:p-12">
                <Badge variant="gold" size="sm" className="mb-4 w-fit">
                  {banner.badge}
                </Badge>
                <h3 className="max-w-sm text-balance font-display text-2xl font-light leading-tight lg:text-4xl">
                  {banner.title}
                </h3>
                <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/75">
                  {banner.body}
                </p>

                {index === 0 && (
                  <Countdown
                    hours={72}
                    className="mt-6 [&_span]:border-white/20 [&_span]:bg-white/10 [&_span]:text-white"
                  />
                )}

                <Link
                  href={banner.cta.href}
                  className="mt-7 inline-flex w-fit items-center gap-2 rounded-full bg-white px-6 py-3 text-xs font-medium text-black transition-all duration-300 ease-luxe hover:gap-3"
                >
                  {banner.cta.label}
                  <ArrowRight className="size-4" />
                </Link>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
