import Image from "next/image";

import { Breadcrumb, type Crumb } from "./breadcrumb";
import { cn } from "@/lib/utils";

interface PageHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  crumbs: Crumb[];
  /** Optional background photograph; switches the header to light-on-dark. */
  image?: string;
  className?: string;
  children?: React.ReactNode;
}

/** Consistent header band across every listing and content page. */
export function PageHeader({
  eyebrow,
  title,
  description,
  crumbs,
  image,
  className,
  children,
}: PageHeaderProps) {
  if (image) {
    return (
      <header className={cn("relative isolate overflow-hidden", className)}>
        <Image
          src={image}
          alt=""
          fill
          priority
          sizes="100vw"
          className="-z-10 object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black/85 via-black/60 to-black/30" />

        <div className="container-luxe py-16 text-white lg:py-24">
          <Breadcrumb
            items={crumbs}
            className="mb-7 [&_a:hover]:text-white [&_a]:text-white/60 [&_span]:text-white"
          />
          {eyebrow && (
            <p className="mb-3 text-[11px] uppercase tracking-[0.22em] text-gold">
              {eyebrow}
            </p>
          )}
          <h1 className="max-w-3xl text-balance font-display text-4xl font-light leading-[1.08] lg:text-5xl xl:text-6xl">
            {title}
          </h1>
          {description && (
            <p className="mt-5 max-w-2xl text-pretty text-sm leading-relaxed text-white/75 lg:text-base">
              {description}
            </p>
          )}
          {children}
        </div>
      </header>
    );
  }

  return (
    <header
      className={cn(
        "bg-gradient-luxe border-b border-border",
        className,
      )}
    >
      <div className="container-luxe py-12 lg:py-16">
        <Breadcrumb items={crumbs} className="mb-6" />
        {eyebrow && (
          <p className="mb-3 text-[11px] uppercase tracking-[0.22em] text-accent">
            {eyebrow}
          </p>
        )}
        <h1 className="max-w-3xl text-balance text-4xl leading-[1.08] lg:text-5xl">
          {title}
        </h1>
        {description && (
          <p className="mt-5 max-w-2xl text-pretty text-sm leading-relaxed text-muted-foreground lg:text-base">
            {description}
          </p>
        )}
        {children}
      </div>
    </header>
  );
}
