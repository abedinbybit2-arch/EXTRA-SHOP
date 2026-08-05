import { cn, discountPercent, formatPrice } from "@/lib/utils";

interface PriceProps {
  value: number;
  /** Original price; when higher than `value` a strike-through is shown. */
  compareAt?: number;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  /** Render the "-30%" chip alongside the prices. */
  showDiscount?: boolean;
}

const SIZES = {
  sm: { now: "text-sm", was: "text-xs" },
  md: { now: "text-base", was: "text-sm" },
  lg: { now: "text-xl", was: "text-sm" },
  xl: { now: "text-3xl", was: "text-base" },
} as const;

/** Current price with optional original price and discount chip. */
export function Price({
  value,
  compareAt,
  size = "md",
  className,
  showDiscount = false,
}: PriceProps) {
  const s = SIZES[size];
  const off = discountPercent(value, compareAt);

  return (
    <div className={cn("flex flex-wrap items-baseline gap-x-2 gap-y-1", className)}>
      <span className={cn(s.now, "font-medium tracking-tight text-foreground")}>
        {formatPrice(value)}
      </span>
      {off > 0 && compareAt && (
        <>
          <span className={cn(s.was, "text-muted-foreground line-through")}>
            {formatPrice(compareAt)}
          </span>
          {showDiscount && (
            <span className={cn(s.was, "font-medium text-destructive")}>
              −{off}%
            </span>
          )}
        </>
      )}
    </div>
  );
}
