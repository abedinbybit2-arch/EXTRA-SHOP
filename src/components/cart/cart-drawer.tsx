"use client";

import { ArrowRight, ShoppingBag, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { QuantityStepper } from "@/components/ui/quantity-stepper";
import {
  Sheet,
  SheetBody,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  calculateTotals,
  FREE_SHIPPING_THRESHOLD,
  resolveLines,
} from "@/lib/cart-totals";
import { formatPrice } from "@/lib/utils";
import { useCart } from "@/store/cart";
import { useUI } from "@/store/ui";

/** Slide-out bag summary, opened from the header and mobile tab bar. */
export function CartDrawer() {
  const { cartOpen, setCartOpen } = useUI();
  const items = useCart((s) => s.items);
  const hydrated = useCart((s) => s.hydrated);
  const setQuantity = useCart((s) => s.setQuantity);
  const removeItem = useCart((s) => s.removeItem);

  const lines = hydrated ? resolveLines(items) : [];
  const totals = calculateTotals(lines);
  const progress = Math.min(
    100,
    (totals.subtotal / FREE_SHIPPING_THRESHOLD) * 100,
  );

  return (
    <Sheet open={cartOpen} onOpenChange={setCartOpen}>
      <SheetContent side="right" className="w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle>
            Your bag
            {totals.itemCount > 0 && (
              <span className="ml-2 text-sm text-muted-foreground">
                ({totals.itemCount})
              </span>
            )}
          </SheetTitle>
        </SheetHeader>

        {lines.length === 0 ? (
          <SheetBody className="flex flex-col items-center justify-center text-center">
            <div className="grid size-16 place-items-center rounded-full bg-secondary">
              <ShoppingBag className="size-7 text-muted-foreground" strokeWidth={1.5} />
            </div>
            <h3 className="mt-5 text-xl">Your bag is empty</h3>
            <p className="mt-2 max-w-xs text-sm text-muted-foreground">
              Nothing saved yet. Browse the floor and add something worth keeping.
            </p>
            <Button asChild className="mt-6" onClick={() => setCartOpen(false)}>
              <Link href="/shop">Start shopping</Link>
            </Button>
          </SheetBody>
        ) : (
          <>
            <SheetBody className="space-y-0 p-0">
              {/* Free-shipping progress */}
              <div className="border-b border-border px-6 py-4">
                {totals.freeShippingRemaining > 0 ? (
                  <p className="text-xs text-muted-foreground">
                    Add{" "}
                    <span className="font-medium text-foreground">
                      {formatPrice(totals.freeShippingRemaining)}
                    </span>{" "}
                    more for complimentary shipping
                  </p>
                ) : (
                  <p className="text-xs font-medium text-success">
                    Complimentary express shipping unlocked
                  </p>
                )}
                <div
                  role="progressbar"
                  aria-valuenow={Math.round(progress)}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-label="Progress toward free shipping"
                  className="mt-2.5 h-1 overflow-hidden rounded-full bg-muted"
                >
                  <div
                    className="h-full rounded-full bg-accent transition-[width] duration-500 ease-luxe"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>

              <ul className="divide-y divide-border">
                {lines.map((line) => {
                  const key = `${line.productId}-${line.color}-${line.size}`;
                  return (
                    <li key={key} className="flex gap-4 px-6 py-5">
                      <Link
                        href={`/product/${line.product.slug}`}
                        onClick={() => setCartOpen(false)}
                        className="relative aspect-4/5 w-20 shrink-0 overflow-hidden rounded-xl bg-muted"
                      >
                        <Image
                          src={line.product.images[0]}
                          alt={line.product.name}
                          fill
                          sizes="80px"
                          className="object-cover"
                        />
                      </Link>

                      <div className="flex min-w-0 flex-1 flex-col">
                        <div className="flex items-start justify-between gap-3">
                          <Link
                            href={`/product/${line.product.slug}`}
                            onClick={() => setCartOpen(false)}
                            className="text-sm font-medium leading-snug transition-colors hover:text-accent"
                          >
                            {line.product.name}
                          </Link>
                          <button
                            type="button"
                            onClick={() =>
                              removeItem({
                                productId: line.productId,
                                color: line.color,
                                size: line.size,
                              })
                            }
                            aria-label={`Remove ${line.product.name}`}
                            className="shrink-0 text-muted-foreground transition-colors hover:text-destructive"
                          >
                            <Trash2 className="size-4" />
                          </button>
                        </div>

                        {(line.color || line.size) && (
                          <p className="mt-1 text-xs text-muted-foreground">
                            {[line.color, line.size].filter(Boolean).join(" · ")}
                          </p>
                        )}

                        <div className="mt-auto flex items-center justify-between gap-3 pt-3">
                          <QuantityStepper
                            size="sm"
                            value={line.quantity}
                            max={Math.max(1, line.product.stock)}
                            onChange={(quantity) =>
                              setQuantity(
                                {
                                  productId: line.productId,
                                  color: line.color,
                                  size: line.size,
                                },
                                quantity,
                              )
                            }
                          />
                          <span className="text-sm font-medium">
                            {formatPrice(line.lineTotal)}
                          </span>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </SheetBody>

            <SheetFooter className="space-y-4">
              <dl className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Subtotal</dt>
                  <dd className="font-medium">{formatPrice(totals.subtotal)}</dd>
                </div>
                {totals.savings > 0 && (
                  <div className="flex justify-between text-success">
                    <dt>You save</dt>
                    <dd>−{formatPrice(totals.savings)}</dd>
                  </div>
                )}
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Shipping</dt>
                  <dd className="font-medium">
                    {totals.shipping === 0 ? "Free" : formatPrice(totals.shipping)}
                  </dd>
                </div>
              </dl>

              <p className="text-xs text-muted-foreground">
                Taxes calculated at checkout.
              </p>

              <div className="grid gap-2">
                <Button asChild size="lg" onClick={() => setCartOpen(false)}>
                  <Link href="/checkout">
                    Checkout
                    <ArrowRight className="size-4" />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  onClick={() => setCartOpen(false)}
                >
                  <Link href="/cart">View full bag</Link>
                </Button>
              </div>
            </SheetFooter>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
