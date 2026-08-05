"use client";

import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

export function RadioGroup({
  className,
  ...props
}: ComponentProps<typeof RadioGroupPrimitive.Root>) {
  return (
    <RadioGroupPrimitive.Root className={cn("grid gap-3", className)} {...props} />
  );
}

export function RadioGroupItem({
  className,
  ...props
}: ComponentProps<typeof RadioGroupPrimitive.Item>) {
  return (
    <RadioGroupPrimitive.Item
      className={cn(
        "aspect-square size-5 shrink-0 rounded-full border border-input bg-card transition-colors duration-200",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "data-[state=checked]:border-accent",
        className,
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator className="grid size-full place-items-center">
        <span className="size-2.5 rounded-full bg-accent" />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  );
}

/**
 * A full-width selectable card — used for delivery and payment method choice
 * at checkout, where the whole row should be clickable.
 */
export function RadioCard({
  className,
  children,
  value,
  id,
}: {
  className?: string;
  children: React.ReactNode;
  value: string;
  id: string;
}) {
  return (
    <label
      htmlFor={id}
      className={cn(
        "flex cursor-pointer items-start gap-4 rounded-2xl border border-border bg-card p-5 transition-all duration-300 ease-luxe",
        "hover:border-foreground/25 has-[:checked]:border-accent has-[:checked]:bg-accent/5",
        className,
      )}
    >
      <RadioGroupItem value={value} id={id} className="mt-0.5" />
      <div className="flex-1">{children}</div>
    </label>
  );
}
