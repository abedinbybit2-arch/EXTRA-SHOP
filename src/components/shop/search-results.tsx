"use client";

import { SearchX } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";

import { EmptyState } from "@/components/common/empty-state";
import { ProductGrid } from "@/components/product/product-grid";
import { ProductSection } from "@/components/product/product-section";
import { searchProducts, topRated } from "@/lib/catalog";

/** Renders results for the `?q=` term, with a fallback edit when empty. */
export function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") ?? "";

  const results = useMemo(() => searchProducts(query), [query]);

  if (!query.trim()) {
    return (
      <>
        <EmptyState
          icon={SearchX}
          title="What are you looking for?"
          description="Search by product, house, department or material — try 'chronograph', 'merino' or 'Aurelian'."
          action={{ label: "Browse the catalogue", href: "/shop" }}
        />
        <ProductSection
          eyebrow="In the meantime"
          title="Our highest rated"
          products={topRated(8)}
          className="!pt-0"
        />
      </>
    );
  }

  if (results.length === 0) {
    return (
      <>
        <EmptyState
          icon={SearchX}
          title={`No matches for "${query}"`}
          description="Nothing in the catalogue matches that term. Try a broader word, or browse by department instead."
          action={{ label: "Browse everything", href: "/shop" }}
          secondaryAction={{ label: "View categories", href: "/categories" }}
        />
        <ProductSection
          eyebrow="You might like"
          title="Our highest rated"
          products={topRated(8)}
          className="!pt-0"
        />
      </>
    );
  }

  return (
    <div className="container-luxe py-12 lg:py-16">
      <p className="mb-8 text-sm text-muted-foreground">
        <span className="font-medium text-foreground">{results.length}</span>{" "}
        {results.length === 1 ? "result" : "results"} for{" "}
        <span className="font-medium text-foreground">
          &ldquo;{query}&rdquo;
        </span>
      </p>
      <ProductGrid products={results} priorityCount={4} />
    </div>
  );
}
