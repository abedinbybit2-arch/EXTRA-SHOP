import { Star } from "lucide-react";

import { cn, formatCompact } from "@/lib/utils";

interface RatingProps {
  value: number;
  /** Review count rendered next to the stars; omit to hide. */
  count?: number;
  size?: "sm" | "md" | "lg";
  className?: string;
  /** Show the numeric score, e.g. "4.8". */
  showValue?: boolean;
}

const SIZES = {
  sm: { star: "size-3", text: "text-[11px]" },
  md: { star: "size-3.5", text: "text-xs" },
  lg: { star: "size-4", text: "text-sm" },
} as const;

/**
 * Five-star display with fractional fill. Purely presentational — the whole
 * control is announced once to assistive tech rather than as five icons.
 */
export function Rating({
  value,
  count,
  size = "md",
  className,
  showValue = false,
}: RatingProps) {
  const s = SIZES[size];
  const percent = Math.max(0, Math.min(100, (value / 5) * 100));

  return (
    <div
      className={cn("flex items-center gap-1.5", className)}
      aria-label={`Rated ${value.toFixed(1)} out of 5${
        count ? ` from ${count} reviews` : ""
      }`}
    >
      <span className="relative inline-flex" aria-hidden>
        {/* Empty track */}
        <span className="flex gap-0.5">
          {Array.from({ length: 5 }, (_, i) => (
            <Star key={i} className={cn(s.star, "text-border")} fill="currentColor" />
          ))}
        </span>
        {/* Gold overlay clipped to the score */}
        <span
          className="absolute inset-0 flex gap-0.5 overflow-hidden"
          style={{ width: `${percent}%` }}
        >
          {Array.from({ length: 5 }, (_, i) => (
            <Star
              key={i}
              className={cn(s.star, "shrink-0 text-gold")}
              fill="currentColor"
            />
          ))}
        </span>
      </span>

      {showValue && (
        <span className={cn(s.text, "font-medium text-foreground")}>
          {value.toFixed(1)}
        </span>
      )}
      {typeof count === "number" && (
        <span className={cn(s.text, "text-muted-foreground")}>
          ({formatCompact(count)})
        </span>
      )}
    </div>
  );
}
