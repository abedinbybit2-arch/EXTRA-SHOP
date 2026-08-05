"use client";

import { cn } from "@/lib/utils";
import type { ProductColor } from "@/types";

/** Colour swatch row. The active swatch is ringed rather than filled. */
export function ColorSwatches({
  colors,
  value,
  onChange,
  className,
}: {
  colors: ProductColor[];
  value?: string;
  onChange: (name: string) => void;
  className?: string;
}) {
  if (colors.length === 0) return null;

  return (
    <fieldset className={cn(className)}>
      <legend className="mb-3 flex w-full items-center justify-between text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
        <span>Colour</span>
        <span className="normal-case tracking-normal text-foreground">{value}</span>
      </legend>
      <div className="flex flex-wrap gap-2.5">
        {colors.map((color) => {
          const active = color.name === value;
          return (
            <button
              key={color.name}
              type="button"
              onClick={() => onChange(color.name)}
              aria-label={color.name}
              aria-pressed={active}
              title={color.name}
              className={cn(
                "grid size-9 place-items-center rounded-full border transition-all duration-300 ease-luxe",
                active
                  ? "border-accent ring-2 ring-accent/30"
                  : "border-border hover:border-foreground/40",
              )}
            >
              <span
                className="size-6 rounded-full border border-black/10"
                style={{ backgroundColor: color.hex }}
              />
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}

/** Size selector rendered as a row of pills. */
export function SizeSelector({
  sizes,
  value,
  onChange,
  className,
}: {
  sizes: string[];
  value?: string;
  onChange: (size: string) => void;
  className?: string;
}) {
  if (sizes.length === 0) return null;

  return (
    <fieldset className={cn(className)}>
      <legend className="mb-3 flex w-full items-center justify-between text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
        <span>Size</span>
        <button
          type="button"
          className="normal-case tracking-normal text-foreground underline underline-offset-4 transition-colors hover:text-accent"
        >
          Size guide
        </button>
      </legend>
      <div className="flex flex-wrap gap-2">
        {sizes.map((size) => {
          const active = size === value;
          return (
            <button
              key={size}
              type="button"
              onClick={() => onChange(size)}
              aria-pressed={active}
              className={cn(
                "min-w-14 rounded-full border px-4 py-2.5 text-xs font-medium transition-all duration-300 ease-luxe",
                active
                  ? "border-accent bg-accent text-accent-foreground"
                  : "border-border text-foreground hover:border-foreground/40",
              )}
            >
              {size}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}
