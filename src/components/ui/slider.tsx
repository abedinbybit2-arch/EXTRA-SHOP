"use client";

import * as SliderPrimitive from "@radix-ui/react-slider";
import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

/** Range slider used for the price filter. Renders one thumb per value. */
export function Slider({
  className,
  value,
  defaultValue,
  ...props
}: ComponentProps<typeof SliderPrimitive.Root>) {
  const thumbCount = (value ?? defaultValue ?? [0]).length;

  return (
    <SliderPrimitive.Root
      value={value}
      defaultValue={defaultValue}
      className={cn(
        "relative flex w-full touch-none select-none items-center py-2",
        className,
      )}
      {...props}
    >
      <SliderPrimitive.Track className="relative h-1 w-full grow overflow-hidden rounded-full bg-muted">
        <SliderPrimitive.Range className="absolute h-full bg-accent" />
      </SliderPrimitive.Track>
      {Array.from({ length: thumbCount }, (_, i) => (
        <SliderPrimitive.Thumb
          key={i}
          aria-label={thumbCount === 2 ? (i === 0 ? "Minimum price" : "Maximum price") : "Value"}
          className="block size-5 rounded-full border-2 border-accent bg-card shadow-soft transition-transform duration-200 hover:scale-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring disabled:pointer-events-none"
        />
      ))}
    </SliderPrimitive.Root>
  );
}
