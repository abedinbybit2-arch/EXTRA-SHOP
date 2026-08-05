"use client";

import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

import { cn } from "@/lib/utils";
import type { Product } from "@/types";

import { ProductCard } from "./product-card";

/**
 * Horizontally scrolling product rail. Falls back to native touch scrolling
 * on small screens and exposes arrow controls from large breakpoints up.
 */
export function ProductCarousel({
  products,
  className,
}: {
  products: Product[];
  className?: string;
}) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: false,
    containScroll: "trimSnaps",
  });
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCanPrev(emblaApi.canScrollPrev());
    setCanNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    // Deferred so the initial sync runs outside the effect body.
    const frame = requestAnimationFrame(onSelect);
    emblaApi.on("select", onSelect).on("reInit", onSelect);
    return () => {
      cancelAnimationFrame(frame);
      emblaApi.off("select", onSelect).off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <div className={cn("relative", className)}>
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex touch-pan-y gap-5 sm:gap-6">
          {products.map((product) => (
            <div
              key={product.slug}
              className="min-w-0 shrink-0 grow-0 basis-[62%] sm:basis-[42%] lg:basis-[30%] xl:basis-[23%]"
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>

      <CarouselButton
        direction="prev"
        disabled={!canPrev}
        onClick={() => emblaApi?.scrollPrev()}
      />
      <CarouselButton
        direction="next"
        disabled={!canNext}
        onClick={() => emblaApi?.scrollNext()}
      />
    </div>
  );
}

function CarouselButton({
  direction,
  disabled,
  onClick,
}: {
  direction: "prev" | "next";
  disabled: boolean;
  onClick: () => void;
}) {
  const Icon = direction === "prev" ? ChevronLeft : ChevronRight;
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={direction === "prev" ? "Previous products" : "Next products"}
      className={cn(
        "glass absolute top-[36%] z-10 hidden size-11 place-items-center rounded-full border text-foreground shadow-lift transition-all duration-300 ease-luxe",
        "hover:bg-primary hover:text-primary-foreground disabled:pointer-events-none disabled:opacity-0",
        "lg:grid",
        direction === "prev" ? "-left-5" : "-right-5",
      )}
    >
      <Icon className="size-5" />
    </button>
  );
}
