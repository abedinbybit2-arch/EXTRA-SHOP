"use client";

import { Tag, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { coupons } from "@/data/content";
import { findCoupon } from "@/lib/cart-totals";
import { formatPrice } from "@/lib/utils";
import { useCart } from "@/store/cart";

/** Promo code entry. Valid codes are listed below the field for the demo. */
export function CouponBox({ subtotal }: { subtotal: number }) {
  const couponCode = useCart((s) => s.couponCode);
  const setCoupon = useCart((s) => s.setCoupon);
  const [value, setValue] = useState("");

  const applied = couponCode ? findCoupon(couponCode) : undefined;

  const apply = (event: React.FormEvent) => {
    event.preventDefault();
    const coupon = findCoupon(value);

    if (!coupon) {
      toast.error("That code isn't recognised", {
        description: "Check the spelling, or try one of the codes listed below.",
      });
      return;
    }
    if (subtotal < coupon.minimumSpend) {
      toast.error("Minimum spend not reached", {
        description: `${coupon.code} applies to orders over ${formatPrice(coupon.minimumSpend)}.`,
      });
      return;
    }

    setCoupon(coupon.code);
    setValue("");
    toast.success(`${coupon.code} applied`, { description: coupon.label });
  };

  if (applied) {
    return (
      <div className="flex items-center justify-between gap-3 rounded-xl border border-accent/40 bg-accent/5 px-4 py-3.5">
        <div className="flex min-w-0 items-center gap-3">
          <Tag className="size-4 shrink-0 text-accent" />
          <div className="min-w-0">
            <p className="truncate text-sm font-medium">{applied.code}</p>
            <p className="truncate text-xs text-muted-foreground">
              {applied.label}
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => {
            setCoupon(null);
            toast.info("Coupon removed");
          }}
          aria-label="Remove coupon"
          className="shrink-0 text-muted-foreground transition-colors hover:text-destructive"
        >
          <X className="size-4" />
        </button>
      </div>
    );
  }

  return (
    <div>
      <form onSubmit={apply} className="flex gap-2">
        <label htmlFor="coupon" className="sr-only">
          Promo code
        </label>
        <Input
          id="coupon"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Promo code"
          className="h-11 uppercase"
        />
        <Button type="submit" variant="outline" disabled={!value.trim()}>
          Apply
        </Button>
      </form>

      <div className="mt-3 flex flex-wrap gap-1.5">
        {coupons.map((coupon) => (
          <button
            key={coupon.code}
            type="button"
            onClick={() => setValue(coupon.code)}
            title={coupon.label}
            className="rounded-full border border-dashed border-border px-2.5 py-1 text-[10px] uppercase tracking-wider text-muted-foreground transition-colors hover:border-accent hover:text-accent"
          >
            {coupon.code}
          </button>
        ))}
      </div>
    </div>
  );
}
