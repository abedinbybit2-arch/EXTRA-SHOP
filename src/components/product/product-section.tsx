import { SectionHeading } from "@/components/common/section-heading";
import { cn } from "@/lib/utils";
import type { Product } from "@/types";

import { ProductCarousel } from "./product-carousel";
import { ProductGrid } from "./product-grid";

interface ProductSectionProps {
  eyebrow?: string;
  title: string;
  description?: string;
  products: Product[];
  action?: { label: string; href: string };
  /** Rails scroll horizontally; grids wrap. */
  variant?: "carousel" | "grid";
  className?: string;
}

/** Heading + product rail/grid, reused across the homepage. */
export function ProductSection({
  eyebrow,
  title,
  description,
  products,
  action,
  variant = "carousel",
  className,
}: ProductSectionProps) {
  if (products.length === 0) return null;

  return (
    <section className={cn("container-luxe py-20 lg:py-28", className)}>
      <SectionHeading
        eyebrow={eyebrow}
        title={title}
        description={description}
        action={action}
      />
      {variant === "carousel" ? (
        <ProductCarousel products={products} />
      ) : (
        <ProductGrid products={products} />
      )}
    </section>
  );
}
