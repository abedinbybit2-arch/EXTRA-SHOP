"use client";

import { ArrowRight, Heart, ShoppingBag, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";

import { useHydrated } from "@/hooks/use-hydrated";
import { EmptyState } from "@/components/common/empty-state";
import { Price } from "@/components/common/price";
import { Button } from "@/components/ui/button";
import { QuantityStepper } from "@/components/ui/quantity-stepper";
import { Skeleton } from "@/components/ui/skeleton";
import { getBrand } from "@/data/brands";
import {
  calculateTotals,
  findCoupon,
  FREE_SHIPPING_THRESHOLD,
  resolveLines,
} from "@/lib/cart-totals";
import { formatPrice } from "@/lib/utils";
import { useCart } from "@/store/cart";
import { useWishlist } from "@/store/wishlist";

import { CouponBox } from "./coupon-box";
import { OrderSummary } from "./order-summary";

/** Full shopping bag page. */
export function CartView() {
  const items = useCart((s) => s.items);
  const hydrated = useHydrated(useCart);
  const couponCode = useCart((s) => s.couponCode);
  const setQuantity = useCart((s) => s.setQuantity);
  const removeItem = useCart((s) => s.removeItem);
  const clear = useCart((s) => s.clear);
  const saveForLater = useWishlist((s) => s.toggle);

  if (!hydrated) {
    return (
      <div className="grid gap-10 lg:grid-cols-[1fr_380px]">
        <div className="space-y-5">
          {Array.from({ length: 3 }, (_, i) => (
            <Skeleton key={i} className="h-40 w-full rounded-2xl" />
          ))}
        </div>
        <Skeleton className="h-96 w-full rounded-2xl" />
      </div>
    );
  }

  const lines = resolveLines(items);
  const coupon = couponCode ? findCoupon(couponCode) : null;
  const totals = calculateTotals(lines, coupon);

  if (lines.length === 0) {
    return (
      <EmptyState
        icon={ShoppingBag}
        title="Your bag is empty"
        description="Nothing here yet. The catalogue is small enough to read end to end — start there."
        action={{ label: "Browse the catalogue", href: "/shop" }}
        secondaryAction={{ label: "View your wishlist", href: "/wishlist" }}
      />
    );
  }

  const progress = Math.min(
    100,
    (totals.subtotal / FREE_SHIPPING_THRESHOLD) * 100,
  );

  return (
    <div className="grid items-start gap-10 lg:grid-cols-[1fr_380px] lg:gap-12">
      <div>
        {/* Free-shipping progress */}
        <div className="mb-7 rounded-2xl border border-border bg-card p-5">
          {totals.freeShippingRemaining > 0 ? (
            <p className="text-sm text-muted-foreground">
              You&rsquo;re{" "}
              <span className="font-medium text-foreground">
                {formatPrice(totals.freeShippingRemaining)}
              </span>{" "}
              away from complimentary express shipping.
            </p>
          ) : (
            <p className="text-sm font-medium text-success">
              Complimentary express shipping unlocked.
            </p>
          )}
          <div
            role="progressbar"
            aria-valuenow={Math.round(progress)}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Progress toward free shipping"
            className="mt-3 h-1.5 overflow-hidden rounded-full bg-muted"
          >
            <div
              className="h-full rounded-full bg-accent transition-[width] duration-700 ease-luxe"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="mb-5 flex items-center justify-between">
          <h2 className="font-display text-xl font-light">
            {totals.itemCount} {totals.itemCount === 1 ? "item" : "items"}
          </h2>
          <button
            type="button"
            onClick={() => {
              clear();
              toast.info("Bag emptied");
            }}
            className="text-xs text-muted-foreground underline underline-offset-4 transition-colors hover:text-destructive"
          >
            Empty bag
          </button>
        </div>

        <ul className="space-y-4">
          {lines.map((line) => {
            const key = `${line.productId}-${line.color}-${line.size}`;
            const brand = getBrand(line.product.brand);
            const identity = {
              productId: line.productId,
              color: line.color,
              size: line.size,
            };

            return (
              <li
                key={key}
                className="flex flex-col gap-5 rounded-2xl border border-border bg-card p-5 sm:flex-row"
              >
                <Link
                  href={`/product/${line.product.slug}`}
                  className="relative aspect-4/5 w-full shrink-0 overflow-hidden rounded-xl bg-muted sm:w-32"
                >
                  <Image
                    src={line.product.images[0]}
                    alt={line.product.name}
                    fill
                    sizes="128px"
                    className="object-cover"
                  />
                </Link>

                <div className="flex min-w-0 flex-1 flex-col">
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <p className="text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                        {brand?.name}
                      </p>
                      <h3 className="mt-1 font-sans text-base font-medium">
                        <Link
                          href={`/product/${line.product.slug}`}
                          className="transition-colors hover:text-accent"
                        >
                          {line.product.name}
                        </Link>
                      </h3>
                      {(line.color || line.size) && (
                        <p className="mt-1.5 text-xs text-muted-foreground">
                          {[line.color, line.size].filter(Boolean).join(" · ")}
                        </p>
                      )}
                    </div>
                    <Price
                      value={line.product.price}
                      compareAt={line.product.comparePrice}
                      className="shrink-0 text-right"
                    />
                  </div>

                  <div className="mt-auto flex flex-wrap items-center justify-between gap-4 pt-5">
                    <QuantityStepper
                      value={line.quantity}
                      max={Math.max(1, line.product.stock)}
                      onChange={(quantity) => setQuantity(identity, quantity)}
                    />

                    <div className="flex items-center gap-4">
                      <button
                        type="button"
                        onClick={() => {
                          saveForLater(line.product.slug);
                          removeItem(identity);
                          toast.success("Moved to wishlist", {
                            description: line.product.name,
                          });
                        }}
                        className="flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-accent"
                      >
                        <Heart className="size-3.5" />
                        Save for later
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          removeItem(identity);
                          toast.info("Removed from bag", {
                            description: line.product.name,
                          });
                        }}
                        className="flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-destructive"
                      >
                        <Trash2 className="size-3.5" />
                        Remove
                      </button>
                    </div>

                    <span className="ml-auto text-sm font-medium tabular-nums">
                      {formatPrice(line.lineTotal)}
                    </span>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Summary column */}
      <div className="space-y-5 lg:sticky lg:top-28">
        <div className="rounded-2xl border border-border bg-card p-6 lg:p-7">
          <h2 className="mb-4 font-display text-xl font-light">Promo code</h2>
          <CouponBox subtotal={totals.subtotal} />
        </div>

        <OrderSummary totals={totals}>
          <div className="grid gap-2">
            <Button asChild size="lg">
              <Link href="/checkout">
                Proceed to checkout
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/shop">Continue shopping</Link>
            </Button>
          </div>
          <p className="mt-4 text-center text-xs text-muted-foreground">
            Frontend demonstration — no payment is processed.
          </p>
        </OrderSummary>
      </div>
    </div>
  );
}
