"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";

interface PaginationProps {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
  className?: string;
}

/**
 * Numbered pagination that collapses to ellipses on long ranges, always
 * showing the first, last and neighbouring pages.
 */
export function Pagination({
  page,
  totalPages,
  onChange,
  className,
}: PaginationProps) {
  const pages = pageRange(page, totalPages);

  return (
    <nav
      aria-label="Pagination"
      className={cn("flex items-center justify-center gap-2", className)}
    >
      <button
        type="button"
        onClick={() => onChange(page - 1)}
        disabled={page <= 1}
        aria-label="Previous page"
        className="grid size-10 place-items-center rounded-full border border-border transition-colors hover:border-foreground/40 disabled:pointer-events-none disabled:opacity-35"
      >
        <ChevronLeft className="size-4" />
      </button>

      <ul className="flex items-center gap-1.5">
        {pages.map((entry, index) =>
          entry === "…" ? (
            <li
              key={`gap-${index}`}
              aria-hidden
              className="px-1 text-sm text-muted-foreground"
            >
              …
            </li>
          ) : (
            <li key={entry}>
              <button
                type="button"
                onClick={() => onChange(entry)}
                aria-current={entry === page ? "page" : undefined}
                className={cn(
                  "grid size-10 place-items-center rounded-full text-sm transition-colors",
                  entry === page
                    ? "bg-primary text-primary-foreground"
                    : "border border-border hover:border-foreground/40",
                )}
              >
                {entry}
              </button>
            </li>
          ),
        )}
      </ul>

      <button
        type="button"
        onClick={() => onChange(page + 1)}
        disabled={page >= totalPages}
        aria-label="Next page"
        className="grid size-10 place-items-center rounded-full border border-border transition-colors hover:border-foreground/40 disabled:pointer-events-none disabled:opacity-35"
      >
        <ChevronRight className="size-4" />
      </button>
    </nav>
  );
}

/** Build the visible page list, inserting ellipses where pages are skipped. */
function pageRange(page: number, total: number): (number | "…")[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);

  const result: (number | "…")[] = [1];
  const start = Math.max(2, page - 1);
  const end = Math.min(total - 1, page + 1);

  if (start > 2) result.push("…");
  for (let i = start; i <= end; i += 1) result.push(i);
  if (end < total - 1) result.push("…");
  result.push(total);

  return result;
}
