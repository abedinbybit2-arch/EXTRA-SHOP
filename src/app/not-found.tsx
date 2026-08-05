import { ArrowRight, Home, Store } from "lucide-react";
import Link from "next/link";

import { ProductSection } from "@/components/product/product-section";
import { Button } from "@/components/ui/button";
import { categories } from "@/data/categories";
import { topRated } from "@/lib/catalog";

const QUICK_LINKS = [
  { label: "New arrivals", href: "/new-arrivals" },
  { label: "Best sellers", href: "/best-sellers" },
  { label: "Flash deals", href: "/flash-deals" },
  { label: "Offers", href: "/offers" },
  { label: "Brands", href: "/brands" },
  { label: "FAQ", href: "/faq" },
];

/** Rendered as 404.html in the static export — GitHub Pages serves it directly. */
export default function NotFound() {
  return (
    <>
      <section className="bg-gradient-luxe border-b border-border">
        <div className="container-luxe flex flex-col items-center py-24 text-center lg:py-32">
          <p className="font-display text-[7rem] font-light leading-none text-gradient-gold sm:text-[10rem]">
            404
          </p>
          <h1 className="mt-4 text-balance text-3xl leading-tight lg:text-4xl">
            This page has left the floor
          </h1>
          <p className="mt-5 max-w-lg text-pretty text-sm leading-relaxed text-muted-foreground lg:text-base">
            The address you followed doesn&rsquo;t exist, or the piece it pointed
            to has been retired. The catalogue is small — you&rsquo;ll find your
            way back quickly.
          </p>

          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <Button asChild size="lg">
              <Link href="/">
                <Home className="size-4" />
                Back to home
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/shop">
                <Store className="size-4" />
                Browse the catalogue
              </Link>
            </Button>
          </div>

          <ul className="mt-12 flex flex-wrap items-center justify-center gap-2">
            {QUICK_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="inline-flex items-center gap-1.5 rounded-full border border-border px-4 py-2 text-xs transition-colors hover:border-accent hover:text-accent"
                >
                  {link.label}
                  <ArrowRight className="size-3" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Department shortcuts */}
      <section className="container-luxe py-16">
        <h2 className="mb-8 text-center text-xl text-muted-foreground">
          Or jump straight to a department
        </h2>
        <ul className="mx-auto flex max-w-3xl flex-wrap items-center justify-center gap-2">
          {categories.map((category) => (
            <li key={category.slug}>
              <Link
                href={`/categories/${category.slug}`}
                className="inline-block rounded-full bg-secondary px-4 py-2.5 text-sm transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                {category.name}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <div className="bg-secondary/40">
        <ProductSection
          eyebrow="While you're here"
          title="Our highest rated"
          products={topRated(8)}
        />
      </div>
    </>
  );
}
