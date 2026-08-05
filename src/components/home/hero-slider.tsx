"use client";

import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { heroSlides } from "@/data/content";
import { cn } from "@/lib/utils";

/** Full-bleed editorial hero with autoplay, arrows and progress dots. */
export function HeroSlider() {
  // Built once per mount; a ref would be read during render.
  const autoplay = useMemo(
    () =>
      Autoplay({ delay: 6500, stopOnInteraction: false, stopOnMouseEnter: true }),
    [],
  );
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [autoplay]);
  const [selected, setSelected] = useState(0);

  const onSelect = useCallback(() => {
    if (emblaApi) setSelected(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const frame = requestAnimationFrame(onSelect);
    emblaApi.on("select", onSelect).on("reInit", onSelect);
    return () => {
      cancelAnimationFrame(frame);
      emblaApi.off("select", onSelect).off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <section
      aria-label="Featured collections"
      aria-roledescription="carousel"
      className="relative"
    >
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {heroSlides.map((slide, index) => (
            <div
              key={slide.id}
              role="group"
              aria-roledescription="slide"
              aria-label={`${index + 1} of ${heroSlides.length}`}
              className="relative min-w-0 shrink-0 grow-0 basis-full"
            >
              <div className="relative h-[78vh] min-h-[520px] w-full lg:h-[86vh]">
                <Image
                  src={slide.image}
                  alt=""
                  fill
                  // Only the first slide is above the fold.
                  priority={index === 0}
                  sizes="100vw"
                  className="object-cover"
                />
                {/* Scrim keeps the copy legible over any photograph. */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/45 to-black/10" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

                <div className="container-luxe absolute inset-0 flex items-center">
                  <AnimatePresence mode="wait">
                    {selected === index && (
                      <motion.div
                        key={slide.id}
                        initial={{ opacity: 0, y: 26 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -14 }}
                        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                        className="max-w-xl text-white"
                      >
                        <p className="mb-5 flex items-center gap-3 text-[11px] uppercase tracking-[0.24em] text-white/80">
                          <span aria-hidden className="h-px w-10 bg-white/40" />
                          {slide.eyebrow}
                        </p>
                        <h1 className="text-balance font-display text-4xl font-light leading-[1.05] sm:text-5xl lg:text-6xl xl:text-7xl">
                          {slide.title}
                        </h1>
                        <p className="mt-6 max-w-md text-pretty text-sm leading-relaxed text-white/80 sm:text-base">
                          {slide.body}
                        </p>
                        <div className="mt-9 flex flex-wrap items-center gap-3">
                          <Button asChild size="lg" variant="gold">
                            <Link href={slide.cta.href}>
                              {slide.cta.label}
                              <ArrowRight className="size-4" />
                            </Link>
                          </Button>
                          <Button
                            asChild
                            size="lg"
                            variant="outline"
                            className="border-white/35 bg-white/5 text-white backdrop-blur hover:border-white/60 hover:bg-white/12"
                          >
                            <Link href={slide.secondary.href}>
                              {slide.secondary.label}
                            </Link>
                          </Button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Controls */}
      <div className="container-luxe pointer-events-none absolute inset-x-0 bottom-8 flex items-end justify-between gap-6">
        <div className="pointer-events-auto flex items-center gap-2.5">
          {heroSlides.map((slide, index) => (
            <button
              key={slide.id}
              type="button"
              onClick={() => emblaApi?.scrollTo(index)}
              aria-label={`Go to slide ${index + 1}`}
              aria-current={selected === index}
              className={cn(
                "h-1 rounded-full transition-all duration-500 ease-luxe",
                selected === index
                  ? "w-12 bg-white"
                  : "w-6 bg-white/35 hover:bg-white/60",
              )}
            />
          ))}
        </div>

        <div className="pointer-events-auto hidden items-center gap-2 sm:flex">
          <HeroArrow
            label="Previous slide"
            onClick={() => emblaApi?.scrollPrev()}
            icon={ChevronLeft}
          />
          <HeroArrow
            label="Next slide"
            onClick={() => emblaApi?.scrollNext()}
            icon={ChevronRight}
          />
        </div>
      </div>
    </section>
  );
}

function HeroArrow({
  label,
  onClick,
  icon: Icon,
}: {
  label: string;
  onClick: () => void;
  icon: typeof ChevronLeft;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="grid size-11 place-items-center rounded-full border border-white/30 bg-white/10 text-white backdrop-blur transition-colors hover:bg-white hover:text-black"
    >
      <Icon className="size-5" />
    </button>
  );
}
