import { Reveal } from "@/components/common/reveal";
import { cn } from "@/lib/utils";
import type { Product } from "@/types";

import { ProductCard } from "./product-card";

interface ProductGridProps {
  products: Product[];
  className?: string;
  layout?: "grid" | "list";
  /** Number of leading cards to eager-load (above the fold). */
  priorityCount?: number;
  columns?: 3 | 4;
}

/** Responsive product grid with staggered scroll reveal. */
export function ProductGrid({
  products,
  className,
  layout = "grid",
  priorityCount = 0,
  columns = 4,
}: ProductGridProps) {
  if (layout === "list") {
    return (
      <div className={cn("flex flex-col gap-4", className)}>
        {products.map((product, index) => (
          <Reveal key={product.slug} delay={Math.min(index, 6) * 0.04}>
            <ProductCard product={product} layout="list" />
          </Reveal>
        ))}
      </div>
    );
  }

  return (
    <div
      className={cn(
        "grid grid-cols-2 gap-x-5 gap-y-10 sm:gap-x-6",
        columns === 4
          ? "lg:grid-cols-3 xl:grid-cols-4"
          : "lg:grid-cols-3",
        className,
      )}
    >
      {products.map((product, index) => (
        <Reveal
          key={product.slug}
          // Stagger within the first two rows only, so long grids stay snappy.
          delay={Math.min(index, 7) * 0.05}
          className="flex"
        >
          <ProductCard
            product={product}
            priority={index < priorityCount}
            className="w-full"
          />
        </Reveal>
      ))}
    </div>
  );
}
