"use client";

import { Star } from "lucide-react";

import { Checkbox, Label } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { brands } from "@/data/brands";
import { categories } from "@/data/categories";
import { brandCounts, categoryCounts, priceBounds } from "@/lib/catalog";
import { cn, formatPrice } from "@/lib/utils";
import type { ProductFilters } from "@/types";

interface FilterPanelProps {
  filters: ProductFilters;
  onChange: (next: Partial<ProductFilters>) => void;
  /** Hide the category block when the page is already scoped to one. */
  hideCategories?: boolean;
  hideBrands?: boolean;
  className?: string;
}

const RATING_OPTIONS = [4.5, 4, 3.5, 0];

/** Faceted filter controls, shared by the sidebar and the mobile sheet. */
export function FilterPanel({
  filters,
  onChange,
  hideCategories = false,
  hideBrands = false,
  className,
}: FilterPanelProps) {
  const catCounts = categoryCounts();
  const brCounts = brandCounts();

  const toggle = (list: string[], value: string) =>
    list.includes(value) ? list.filter((v) => v !== value) : [...list, value];

  return (
    <div className={cn("space-y-9", className)}>
      {!hideCategories && (
        <FilterGroup title="Category">
          <ul className="space-y-3">
            {categories.map((category) => (
              <li key={category.slug} className="flex items-center gap-3">
                <Checkbox
                  id={`cat-${category.slug}`}
                  checked={filters.categories.includes(category.slug)}
                  onCheckedChange={() =>
                    onChange({
                      categories: toggle(filters.categories, category.slug),
                    })
                  }
                />
                <Label
                  htmlFor={`cat-${category.slug}`}
                  className="flex flex-1 cursor-pointer items-center justify-between font-normal"
                >
                  <span>{category.name}</span>
                  <span className="text-xs text-muted-foreground">
                    {catCounts[category.slug] ?? 0}
                  </span>
                </Label>
              </li>
            ))}
          </ul>
        </FilterGroup>
      )}

      <FilterGroup title="Price">
        <Slider
          value={[filters.minPrice, filters.maxPrice]}
          min={priceBounds.min}
          max={priceBounds.max}
          step={50}
          minStepsBetweenThumbs={1}
          onValueChange={([min, max]) =>
            onChange({ minPrice: min, maxPrice: max })
          }
        />
        <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
          <span className="rounded-lg border border-border px-2.5 py-1.5 text-foreground">
            {formatPrice(filters.minPrice)}
          </span>
          <span className="rounded-lg border border-border px-2.5 py-1.5 text-foreground">
            {formatPrice(filters.maxPrice)}
          </span>
        </div>
      </FilterGroup>

      {!hideBrands && (
        <FilterGroup title="Brand">
          <ul className="space-y-3">
            {brands.map((brand) => (
              <li key={brand.slug} className="flex items-center gap-3">
                <Checkbox
                  id={`brand-${brand.slug}`}
                  checked={filters.brands.includes(brand.slug)}
                  onCheckedChange={() =>
                    onChange({ brands: toggle(filters.brands, brand.slug) })
                  }
                />
                <Label
                  htmlFor={`brand-${brand.slug}`}
                  className="flex flex-1 cursor-pointer items-center justify-between font-normal"
                >
                  <span className="truncate">{brand.name}</span>
                  <span className="text-xs text-muted-foreground">
                    {brCounts[brand.slug] ?? 0}
                  </span>
                </Label>
              </li>
            ))}
          </ul>
        </FilterGroup>
      )}

      <FilterGroup title="Rating">
        <ul className="space-y-2">
          {RATING_OPTIONS.map((value) => (
            <li key={value}>
              <button
                type="button"
                onClick={() => onChange({ minRating: value })}
                aria-pressed={filters.minRating === value}
                className={cn(
                  "flex w-full items-center gap-2 rounded-xl px-3 py-2 text-sm transition-colors",
                  filters.minRating === value
                    ? "bg-secondary text-foreground"
                    : "text-muted-foreground hover:bg-secondary/60",
                )}
              >
                {value === 0 ? (
                  <span>Any rating</span>
                ) : (
                  <>
                    <span className="flex gap-0.5">
                      {Array.from({ length: 5 }, (_, i) => (
                        <Star
                          key={i}
                          className={cn(
                            "size-3.5",
                            i < Math.floor(value) ? "text-gold" : "text-border",
                          )}
                          fill="currentColor"
                        />
                      ))}
                    </span>
                    <span>{value} & up</span>
                  </>
                )}
              </button>
            </li>
          ))}
        </ul>
      </FilterGroup>

      <FilterGroup title="Availability">
        <ul className="space-y-3">
          <li className="flex items-center gap-3">
            <Checkbox
              id="in-stock"
              checked={filters.inStockOnly}
              onCheckedChange={(checked) =>
                onChange({ inStockOnly: checked === true })
              }
            />
            <Label htmlFor="in-stock" className="cursor-pointer font-normal">
              In stock only
            </Label>
          </li>
          <li className="flex items-center gap-3">
            <Checkbox
              id="on-sale"
              checked={filters.onSaleOnly}
              onCheckedChange={(checked) =>
                onChange({ onSaleOnly: checked === true })
              }
            />
            <Label htmlFor="on-sale" className="cursor-pointer font-normal">
              Reduced only
            </Label>
          </li>
        </ul>
      </FilterGroup>
    </div>
  );
}

function FilterGroup({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h3 className="mb-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-foreground">
        {title}
      </h3>
      {children}
    </section>
  );
}
