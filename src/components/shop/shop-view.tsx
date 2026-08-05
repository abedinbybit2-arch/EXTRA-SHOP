"use client";

import { LayoutGrid, List, SlidersHorizontal, X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { PackageSearch } from "lucide-react";

import { EmptyState } from "@/components/common/empty-state";
import { ProductGrid } from "@/components/product/product-grid";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetBody,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { getBrand } from "@/data/brands";
import { getCategory } from "@/data/categories";
import {
  defaultFilters,
  filterProducts,
  priceBounds,
  sortOptions,
  sortProducts,
} from "@/lib/catalog";
import { cn } from "@/lib/utils";
import type { Product, ProductFilters, SortKey } from "@/types";

import { FilterPanel } from "./filter-panel";
import { Pagination } from "./pagination";

const PAGE_SIZE = 12;

interface ShopViewProps {
  products: Product[];
  /** Scope the view to one category/brand and hide that facet. */
  lockedCategory?: string;
  lockedBrand?: string;
}

/**
 * Client-side catalogue browser. All filtering runs in the browser because the
 * site is a static export — there is no server to query.
 */
export function ShopView({
  products,
  lockedCategory,
  lockedBrand,
}: ShopViewProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [filters, setFilters] = useState<ProductFilters>(() => ({
    ...defaultFilters,
    categories: lockedCategory ? [] : paramList(searchParams.get("category")),
    brands: lockedBrand ? [] : paramList(searchParams.get("brand")),
    maxPrice: Number(searchParams.get("max")) || defaultFilters.maxPrice,
    onSaleOnly: searchParams.get("sale") === "1",
  }));

  const [sort, setSort] = useState<SortKey>(
    (searchParams.get("sort") as SortKey) || "featured",
  );
  const [page, setPage] = useState(1);
  const [layout, setLayout] = useState<"grid" | "list">("grid");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const update = (next: Partial<ProductFilters>) => {
    setFilters((current) => ({ ...current, ...next }));
    setPage(1);
  };

  // Keep the sort choice in the URL so a filtered view can be shared.
  useEffect(() => {
    const params = new URLSearchParams(Array.from(searchParams.entries()));
    if (sort === "featured") params.delete("sort");
    else params.set("sort", sort);
    const query = params.toString();
    router.replace(query ? `?${query}` : "?", { scroll: false });
    // `searchParams` is intentionally omitted — including it would loop.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sort, router]);

  const results = useMemo(() => {
    const filtered = filterProducts(products, filters);
    return sortProducts(filtered, sort);
  }, [products, filters, sort]);

  const totalPages = Math.max(1, Math.ceil(results.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const visible = results.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );

  const activeChips = buildChips(filters, lockedCategory, lockedBrand);
  const hasActiveFilters = activeChips.length > 0;

  const clearAll = () => {
    setFilters({ ...defaultFilters });
    setPage(1);
  };

  return (
    <div className="grid gap-10 lg:grid-cols-[260px_1fr] lg:gap-12">
      {/* Desktop sidebar */}
      <aside className="hidden lg:block">
        <div className="sticky top-28">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="font-display text-xl font-light">Filters</h2>
            {hasActiveFilters && (
              <button
                type="button"
                onClick={clearAll}
                className="text-xs text-muted-foreground underline underline-offset-4 transition-colors hover:text-accent"
              >
                Clear all
              </button>
            )}
          </div>
          <div className="max-h-[calc(100dvh-12rem)] overflow-y-auto pr-2">
            <FilterPanel
              filters={filters}
              onChange={update}
              hideCategories={Boolean(lockedCategory)}
              hideBrands={Boolean(lockedBrand)}
            />
          </div>
        </div>
      </aside>

      <div className="min-w-0">
        {/* Toolbar */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-muted-foreground">
            <span className="font-medium text-foreground">{results.length}</span>{" "}
            {results.length === 1 ? "piece" : "pieces"}
          </p>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="lg:hidden"
              onClick={() => setMobileFiltersOpen(true)}
            >
              <SlidersHorizontal className="size-3.5" />
              Filters
              {hasActiveFilters && (
                <span className="ml-1 grid size-4 place-items-center rounded-full bg-accent text-[10px] text-accent-foreground">
                  {activeChips.length}
                </span>
              )}
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  {sortOptions.find((o) => o.value === sort)?.label}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuRadioGroup
                  value={sort}
                  onValueChange={(value) => {
                    setSort(value as SortKey);
                    setPage(1);
                  }}
                >
                  {sortOptions.map((option) => (
                    <DropdownMenuRadioItem key={option.value} value={option.value}>
                      {option.label}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>

            <div className="hidden items-center rounded-full border border-border p-0.5 sm:flex">
              <ViewToggle
                active={layout === "grid"}
                onClick={() => setLayout("grid")}
                label="Grid view"
                icon={LayoutGrid}
              />
              <ViewToggle
                active={layout === "list"}
                onClick={() => setLayout("list")}
                label="List view"
                icon={List}
              />
            </div>
          </div>
        </div>

        {/* Active filter chips */}
        {hasActiveFilters && (
          <ul className="mb-7 flex flex-wrap items-center gap-2">
            {activeChips.map((chip) => (
              <li key={chip.key}>
                <button
                  type="button"
                  onClick={() => update(chip.clear)}
                  className="flex items-center gap-1.5 rounded-full border border-border bg-secondary px-3 py-1.5 text-xs transition-colors hover:border-destructive hover:text-destructive"
                >
                  {chip.label}
                  <X className="size-3" />
                </button>
              </li>
            ))}
            <li>
              <button
                type="button"
                onClick={clearAll}
                className="px-2 py-1.5 text-xs text-muted-foreground underline underline-offset-4 transition-colors hover:text-accent"
              >
                Clear all
              </button>
            </li>
          </ul>
        )}

        {/* Results */}
        {visible.length === 0 ? (
          <EmptyState
            icon={PackageSearch}
            title="Nothing matches those filters"
            description="Try widening the price range or clearing a facet or two — the catalogue is deliberately small."
            action={{ label: "Browse everything", href: "/shop" }}
          />
        ) : (
          <>
            <ProductGrid
              products={visible}
              layout={layout}
              priorityCount={4}
              columns={3}
            />
            {totalPages > 1 && (
              <Pagination
                page={currentPage}
                totalPages={totalPages}
                onChange={(next) => {
                  setPage(next);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="mt-14"
              />
            )}
          </>
        )}
      </div>

      {/* Mobile filter sheet */}
      <Sheet open={mobileFiltersOpen} onOpenChange={setMobileFiltersOpen}>
        <SheetContent side="bottom" className="lg:hidden">
          <SheetHeader>
            <SheetTitle>Filters</SheetTitle>
          </SheetHeader>
          <SheetBody>
            <FilterPanel
              filters={filters}
              onChange={update}
              hideCategories={Boolean(lockedCategory)}
              hideBrands={Boolean(lockedBrand)}
            />
          </SheetBody>
          <SheetFooter className="flex gap-3">
            <Button variant="outline" className="flex-1" onClick={clearAll}>
              Clear all
            </Button>
            <Button className="flex-1" onClick={() => setMobileFiltersOpen(false)}>
              Show {results.length} results
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
}

function ViewToggle({
  active,
  onClick,
  label,
  icon: Icon,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  icon: typeof LayoutGrid;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      aria-pressed={active}
      className={cn(
        "grid size-8 place-items-center rounded-full transition-colors",
        active
          ? "bg-primary text-primary-foreground"
          : "text-muted-foreground hover:text-foreground",
      )}
    >
      <Icon className="size-4" />
    </button>
  );
}

/** Split a comma-separated query parameter into a list. */
function paramList(value: string | null): string[] {
  return value ? value.split(",").filter(Boolean) : [];
}

interface Chip {
  key: string;
  label: string;
  clear: Partial<ProductFilters>;
}

/** Describe the active facets as removable chips. */
function buildChips(
  filters: ProductFilters,
  lockedCategory?: string,
  lockedBrand?: string,
): Chip[] {
  const chips: Chip[] = [];

  if (!lockedCategory) {
    for (const slug of filters.categories) {
      chips.push({
        key: `cat-${slug}`,
        label: getCategory(slug)?.name ?? slug,
        clear: { categories: filters.categories.filter((s) => s !== slug) },
      });
    }
  }

  if (!lockedBrand) {
    for (const slug of filters.brands) {
      chips.push({
        key: `brand-${slug}`,
        label: getBrand(slug)?.name ?? slug,
        clear: { brands: filters.brands.filter((s) => s !== slug) },
      });
    }
  }

  if (
    filters.minPrice !== priceBounds.min ||
    filters.maxPrice !== priceBounds.max
  ) {
    chips.push({
      key: "price",
      label: `$${filters.minPrice} – $${filters.maxPrice}`,
      clear: { minPrice: priceBounds.min, maxPrice: priceBounds.max },
    });
  }

  if (filters.minRating > 0) {
    chips.push({
      key: "rating",
      label: `${filters.minRating}★ & up`,
      clear: { minRating: 0 },
    });
  }

  if (filters.inStockOnly) {
    chips.push({
      key: "stock",
      label: "In stock",
      clear: { inStockOnly: false },
    });
  }

  if (filters.onSaleOnly) {
    chips.push({ key: "sale", label: "Reduced", clear: { onSaleOnly: false } });
  }

  return chips;
}
