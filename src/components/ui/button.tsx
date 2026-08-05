import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-all duration-300 ease-luxe disabled:pointer-events-none disabled:opacity-45 [&_svg]:pointer-events-none [&_svg]:shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring active:scale-[0.98]",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-soft hover:shadow-lift hover:-translate-y-px",
        gold: "bg-accent text-accent-foreground shadow-soft hover:shadow-lift hover:-translate-y-px",
        outline:
          "border border-border bg-transparent text-foreground hover:border-foreground/40 hover:bg-secondary",
        secondary: "bg-secondary text-secondary-foreground hover:bg-muted",
        ghost: "text-foreground hover:bg-secondary",
        destructive:
          "bg-destructive text-destructive-foreground shadow-soft hover:opacity-90",
        link: "text-foreground underline-offset-4 hover:underline hover:text-accent",
      },
      size: {
        sm: "h-9 rounded-full px-4 text-xs tracking-wide [&_svg]:size-4",
        default: "h-11 rounded-full px-6 text-sm [&_svg]:size-4",
        lg: "h-13 rounded-full px-8 text-sm tracking-wide [&_svg]:size-5",
        icon: "size-10 rounded-full [&_svg]:size-4",
        "icon-sm": "size-9 rounded-full [&_svg]:size-4",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  },
);

export interface ButtonProps
  extends ComponentProps<"button">,
    VariantProps<typeof buttonVariants> {
  /** Render as the child element, e.g. to make a Link look like a button. */
  asChild?: boolean;
}

export function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
}

export { buttonVariants };
