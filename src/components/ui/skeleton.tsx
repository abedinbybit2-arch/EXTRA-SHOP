import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

/** Shimmering placeholder used while a section is mounting. */
export function Skeleton({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      aria-hidden
      className={cn("skeleton-shimmer rounded-xl bg-muted", className)}
      {...props}
    />
  );
}

/** Matches the footprint of a ProductCard so grids do not shift on load. */
export function ProductCardSkeleton() {
  return (
    <div className="space-y-3">
      <Skeleton className="aspect-4/5 w-full rounded-2xl" />
      <Skeleton className="h-3 w-20" />
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-3 w-24" />
      <Skeleton className="h-5 w-28" />
    </div>
  );
}

export function ProductGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 gap-x-5 gap-y-10 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: count }, (_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}
