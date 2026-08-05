"use client";

import { Package, RotateCcw, Truck } from "lucide-react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getBrand } from "@/data/brands";
import type { Product, Review } from "@/types";

import { ReviewsPanel } from "./reviews-panel";

const SHIPPING = [
  {
    icon: Truck,
    title: "Shipping",
    body: "Orders placed before 2pm EST are dispatched the same working day. Express delivery is two to four working days worldwide and is complimentary above $250; below that it is a flat $12. Duties and import taxes are calculated at checkout for most destinations, so there is nothing further to pay on arrival.",
  },
  {
    icon: RotateCcw,
    title: "Returns & exchanges",
    body: "Sixty days from delivery — twice the statutory minimum. Items must be unworn with the house documentation intact. We pay return postage in every country we ship to, and refunds are issued when the courier scans the parcel rather than when it reaches our warehouse.",
  },
  {
    icon: Package,
    title: "Packaging & repairs",
    body: "Every order ships in a recycled presentation box with a dust bag and the house documentation. Lifetime repairs are routed back to the original atelier and handled through us at cost — resoling, restringing, servicing and refinishing included.",
  },
];

/** Tabbed detail panels beneath the buy box. */
export function ProductTabs({
  product,
  reviews,
}: {
  product: Product;
  reviews: Review[];
}) {
  const brand = getBrand(product.brand);

  return (
    <Tabs defaultValue="details" className="w-full">
      <TabsList>
        <TabsTrigger value="details">Details</TabsTrigger>
        <TabsTrigger value="specifications">Specifications</TabsTrigger>
        <TabsTrigger value="reviews">
          Reviews ({product.reviewCount.toLocaleString()})
        </TabsTrigger>
        <TabsTrigger value="shipping">Shipping & returns</TabsTrigger>
      </TabsList>

      <TabsContent value="details">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <h3 className="text-2xl">About this piece</h3>
            <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
              {product.description}
            </p>
            <ul className="mt-7 space-y-3">
              {product.highlights.map((highlight) => (
                <li
                  key={highlight}
                  className="flex gap-3 text-sm text-muted-foreground"
                >
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-accent" />
                  {highlight}
                </li>
              ))}
            </ul>
          </div>

          {brand && (
            <div className="rounded-2xl border border-border bg-card p-7">
              <p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                The house
              </p>
              <div className="mt-4 flex items-center gap-4">
                <span className="grid size-14 shrink-0 place-items-center rounded-full border border-border font-display text-sm tracking-wider text-accent">
                  {brand.monogram}
                </span>
                <div>
                  <h4 className="font-display text-xl font-light">{brand.name}</h4>
                  <p className="text-xs text-muted-foreground">
                    {brand.origin} · Est. {brand.founded}
                  </p>
                </div>
              </div>
              <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
                {brand.description}
              </p>
            </div>
          )}
        </div>
      </TabsContent>

      <TabsContent value="specifications">
        <div className="max-w-3xl">
          <h3 className="text-2xl">Specifications</h3>
          <dl className="mt-7 divide-y divide-border rounded-2xl border border-border">
            {product.specs.map((spec) => (
              <div
                key={spec.label}
                className="grid gap-1 px-6 py-4 sm:grid-cols-[220px_1fr] sm:gap-6"
              >
                <dt className="text-sm text-muted-foreground">{spec.label}</dt>
                <dd className="text-sm font-medium">{spec.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </TabsContent>

      <TabsContent value="reviews">
        <ReviewsPanel product={product} reviews={reviews} />
      </TabsContent>

      <TabsContent value="shipping">
        <div className="grid gap-6 md:grid-cols-3">
          {SHIPPING.map((section) => (
            <div
              key={section.title}
              className="rounded-2xl border border-border bg-card p-7"
            >
              <span className="mb-5 grid size-11 place-items-center rounded-full bg-accent/10 text-accent">
                <section.icon className="size-5" strokeWidth={1.6} />
              </span>
              <h3 className="font-sans text-base font-medium">{section.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {section.body}
              </p>
            </div>
          ))}
        </div>
      </TabsContent>
    </Tabs>
  );
}
