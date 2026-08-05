import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1 rounded-full font-medium tracking-wide transition-colors [&_svg]:size-3",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground",
        gold: "bg-accent text-accent-foreground",
        outline: "border border-border text-foreground",
        muted: "bg-secondary text-secondary-foreground",
        sale: "bg-destructive text-destructive-foreground",
        success: "bg-success/12 text-success",
        warning: "bg-warning/12 text-warning",
        glass: "glass border text-foreground backdrop-blur",
      },
      size: {
        sm: "px-2 py-0.5 text-[10px] uppercase",
        default: "px-2.5 py-1 text-[11px] uppercase",
        lg: "px-3.5 py-1.5 text-xs",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  },
);

export function Badge({
  className,
  variant,
  size,
  ...props
}: ComponentProps<"span"> & VariantProps<typeof badgeVariants>) {
  return (
    <span className={cn(badgeVariants({ variant, size }), className)} {...props} />
  );
}

export { badgeVariants };
