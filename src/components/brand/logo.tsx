import Link from "next/link";

import { cn } from "@/lib/utils";

/**
 * The ABEDIN SHOP mark: a gold lozenge bisected by a vertical rule, paired with
 * a wide-tracked serif wordmark.
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden
      className={cn("size-8", className)}
    >
      <path
        d="M16 2.5 29.5 16 16 29.5 2.5 16 16 2.5Z"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinejoin="round"
      />
      <path d="M16 9.5v13" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
      <path
        d="M16 11.5 20 16l-4 4.5L12 16l4-4.5Z"
        fill="currentColor"
        opacity="0.9"
      />
    </svg>
  );
}

interface LogoProps {
  className?: string;
  /** Hide the wordmark, leaving only the lozenge. */
  markOnly?: boolean;
  href?: string;
}

export function Logo({ className, markOnly = false, href = "/" }: LogoProps) {
  return (
    <Link
      href={href}
      aria-label="ABEDIN SHOP — home"
      className={cn(
        "group inline-flex items-center gap-2.5 text-foreground transition-opacity hover:opacity-80",
        className,
      )}
    >
      <LogoMark className="size-7 text-accent transition-transform duration-500 ease-luxe group-hover:rotate-90" />
      {!markOnly && (
        /*
         * Tracking is a touch tighter than the old five-letter wordmark so the
         * longer name still clears the icons in a narrow mobile header.
         */
        <span className="font-display text-lg font-medium uppercase leading-none tracking-[0.2em] sm:tracking-[0.24em]">
          Abedin
          <span className="ml-[0.24em] font-light text-accent">Shop</span>
        </span>
      )}
    </Link>
  );
}
