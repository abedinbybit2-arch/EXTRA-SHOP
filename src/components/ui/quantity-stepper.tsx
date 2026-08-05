"use client";

import { Minus, Plus } from "lucide-react";

import { cn } from "@/lib/utils";

interface QuantityStepperProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  className?: string;
  size?: "sm" | "md";
}

/** Accessible +/- quantity control shared by the cart, drawer and PDP. */
export function QuantityStepper({
  value,
  onChange,
  min = 1,
  max = 99,
  className,
  size = "md",
}: QuantityStepperProps) {
  const btn =
    size === "sm"
      ? "size-8 [&_svg]:size-3.5"
      : "size-11 [&_svg]:size-4";

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border border-border bg-card",
        className,
      )}
    >
      <button
        type="button"
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={value <= min}
        aria-label="Decrease quantity"
        className={cn(
          btn,
          "grid place-items-center rounded-full text-muted-foreground transition-colors hover:text-foreground disabled:opacity-35 disabled:hover:text-muted-foreground",
        )}
      >
        <Minus />
      </button>
      <span
        aria-live="polite"
        className={cn(
          "min-w-8 text-center text-sm font-medium tabular-nums",
          size === "sm" && "min-w-6 text-xs",
        )}
      >
        {value}
      </span>
      <button
        type="button"
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
        aria-label="Increase quantity"
        className={cn(
          btn,
          "grid place-items-center rounded-full text-muted-foreground transition-colors hover:text-foreground disabled:opacity-35 disabled:hover:text-muted-foreground",
        )}
      >
        <Plus />
      </button>
    </div>
  );
}
