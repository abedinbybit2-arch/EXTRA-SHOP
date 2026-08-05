"use client";

import { ArrowUpRight, Search, TrendingUp } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { brands } from "@/data/brands";
import { categories } from "@/data/categories";
import { searchProducts } from "@/lib/catalog";
import { formatPrice } from "@/lib/utils";
import { useUI } from "@/store/ui";

const POPULAR = [
  "Chronograph",
  "Leather",
  "Merino",
  "Diver",
  "Gold",
  "Headphones",
];

/** Command-palette style search with live product, category and brand results. */
export function SearchDialog() {
  const { searchOpen, setSearchOpen } = useUI();
  const [query, setQuery] = useState("");
  const router = useRouter();

  // Cmd/Ctrl+K opens search from anywhere on the site.
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [setSearchOpen]);

  const results = useMemo(() => searchProducts(query, 5), [query]);

  const matchedCategories = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return [];
    return categories.filter((c) => c.name.toLowerCase().includes(term)).slice(0, 3);
  }, [query]);

  const matchedBrands = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return [];
    return brands.filter((b) => b.name.toLowerCase().includes(term)).slice(0, 3);
  }, [query]);

  /** Clear the field on dismissal so the palette always reopens empty. */
  const handleOpenChange = (open: boolean) => {
    if (!open) setQuery("");
    setSearchOpen(open);
  };

  const submit = (value: string) => {
    const term = value.trim();
    if (!term) return;
    handleOpenChange(false);
    router.push(`/search?q=${encodeURIComponent(term)}`);
  };

  const hasQuery = query.trim().length > 0;
  const hasResults =
    results.length > 0 || matchedCategories.length > 0 || matchedBrands.length > 0;

  return (
    <Dialog open={searchOpen} onOpenChange={handleOpenChange}>
      <DialogContent
        showClose={false}
        className="top-24 max-w-2xl translate-y-0 overflow-hidden p-0"
      >
        <DialogTitle className="sr-only">Search products</DialogTitle>

        <form
          onSubmit={(event) => {
            event.preventDefault();
            submit(query);
          }}
          className="flex items-center gap-3 border-b border-border px-5"
        >
          <Search className="size-5 shrink-0 text-muted-foreground" />
          <input
            autoFocus
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search watches, leather, brands…"
            aria-label="Search products"
            className="h-16 flex-1 bg-transparent text-base outline-none placeholder:text-muted-foreground/70"
          />
          <kbd className="hidden rounded-md border border-border px-2 py-1 text-[10px] text-muted-foreground sm:block">
            ESC
          </kbd>
        </form>

        <div className="max-h-[55dvh] overflow-y-auto p-3">
          {!hasQuery && (
            <div className="p-3">
              <p className="mb-3 flex items-center gap-2 text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
                <TrendingUp className="size-3.5" />
                Popular searches
              </p>
              <div className="flex flex-wrap gap-2">
                {POPULAR.map((term) => (
                  <button
                    key={term}
                    type="button"
                    onClick={() => setQuery(term)}
                    className="rounded-full border border-border px-3.5 py-1.5 text-xs transition-colors hover:border-accent hover:text-accent"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          )}

          {hasQuery && !hasResults && (
            <p className="px-3 py-10 text-center text-sm text-muted-foreground">
              No matches for{" "}
              <span className="text-foreground">&ldquo;{query}&rdquo;</span>. Try a
              broader term.
            </p>
          )}

          {results.length > 0 && (
            <section className="mb-2">
              <p className="px-3 py-2 text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
                Products
              </p>
              <ul>
                {results.map((product) => (
                  <li key={product.slug}>
                    <Link
                      href={`/product/${product.slug}`}
                      onClick={() => setSearchOpen(false)}
                      className="flex items-center gap-4 rounded-xl px-3 py-2.5 transition-colors hover:bg-secondary"
                    >
                      <Image
                        src={product.images[0]}
                        alt=""
                        width={48}
                        height={60}
                        className="size-12 rounded-lg object-cover"
                      />
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-sm font-medium">
                          {product.name}
                        </span>
                        <span className="block truncate text-xs text-muted-foreground">
                          {product.tagline}
                        </span>
                      </span>
                      <span className="shrink-0 text-sm font-medium">
                        {formatPrice(product.price)}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {(matchedCategories.length > 0 || matchedBrands.length > 0) && (
            <section className="border-t border-border pt-2">
              <p className="px-3 py-2 text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
                Collections
              </p>
              <ul>
                {matchedCategories.map((category) => (
                  <li key={category.slug}>
                    <Link
                      href={`/categories/${category.slug}`}
                      onClick={() => setSearchOpen(false)}
                      className="flex items-center justify-between gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors hover:bg-secondary"
                    >
                      <span>{category.name}</span>
                      <ArrowUpRight className="size-4 text-muted-foreground" />
                    </Link>
                  </li>
                ))}
                {matchedBrands.map((brand) => (
                  <li key={brand.slug}>
                    <Link
                      href={`/brands/${brand.slug}`}
                      onClick={() => setSearchOpen(false)}
                      className="flex items-center justify-between gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors hover:bg-secondary"
                    >
                      <span>{brand.name}</span>
                      <ArrowUpRight className="size-4 text-muted-foreground" />
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {hasQuery && hasResults && (
            <button
              type="button"
              onClick={() => submit(query)}
              className="mt-2 flex w-full items-center justify-between gap-3 rounded-xl border-t border-border px-3 py-3.5 text-sm font-medium transition-colors hover:bg-secondary"
            >
              See all results for &ldquo;{query}&rdquo;
              <ArrowUpRight className="size-4" />
            </button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
