import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  /** Optional "view all" action rendered opposite the title. */
  action?: { label: string; href: string };
  align?: "left" | "center";
  className?: string;
}

/** Shared heading treatment for every homepage and listing section. */
export function SectionHeading({
  eyebrow,
  title,
  description,
  action,
  align = "left",
  className,
}: SectionHeadingProps) {
  const centered = align === "center";

  return (
    <div
      className={cn(
        "mb-10 flex flex-col gap-5 md:mb-14",
        centered
          ? "items-center text-center"
          : "md:flex-row md:items-end md:justify-between",
        className,
      )}
    >
      <div className={cn("max-w-2xl", centered && "flex flex-col items-center")}>
        {eyebrow && (
          <p className="mb-3 flex items-center gap-3 text-[11px] uppercase tracking-[0.22em] text-accent">
            <span aria-hidden className="h-px w-8 bg-accent/50" />
            {eyebrow}
          </p>
        )}
        <h2 className="text-balance text-3xl leading-[1.1] md:text-4xl lg:text-[2.75rem]">
          {title}
        </h2>
        {description && (
          <p className="mt-4 text-pretty text-sm leading-relaxed text-muted-foreground md:text-base">
            {description}
          </p>
        )}
      </div>

      {action && (
        <Link
          href={action.href}
          className="group inline-flex shrink-0 items-center gap-2 text-sm font-medium text-foreground transition-colors hover:text-accent"
        >
          {action.label}
          <ArrowRight className="size-4 transition-transform duration-300 ease-luxe group-hover:translate-x-1" />
        </Link>
      )}
    </div>
  );
}
