import { formatPrice } from "@/lib/utils";
import type { CartTotals } from "@/lib/cart-totals";
import { cn } from "@/lib/utils";

interface OrderSummaryProps {
  totals: CartTotals;
  className?: string;
  children?: React.ReactNode;
  title?: string;
}

/** Price breakdown shared by the cart page and checkout. */
export function OrderSummary({
  totals,
  className,
  children,
  title = "Order summary",
}: OrderSummaryProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-border bg-card p-6 lg:p-7",
        className,
      )}
    >
      <h2 className="font-display text-xl font-light">{title}</h2>

      <dl className="mt-6 space-y-3 text-sm">
        <div className="flex justify-between">
          <dt className="text-muted-foreground">
            Subtotal
            <span className="ml-1">
              ({totals.itemCount} {totals.itemCount === 1 ? "item" : "items"})
            </span>
          </dt>
          <dd className="font-medium tabular-nums">
            {formatPrice(totals.subtotal)}
          </dd>
        </div>

        {totals.savings > 0 && (
          <div className="flex justify-between text-success">
            <dt>Product savings</dt>
            <dd className="tabular-nums">−{formatPrice(totals.savings)}</dd>
          </div>
        )}

        {totals.discount > 0 && (
          <div className="flex justify-between text-accent">
            <dt>Promo discount</dt>
            <dd className="tabular-nums">−{formatPrice(totals.discount)}</dd>
          </div>
        )}

        <div className="flex justify-between">
          <dt className="text-muted-foreground">Shipping</dt>
          <dd className="font-medium tabular-nums">
            {totals.shipping === 0 ? "Free" : formatPrice(totals.shipping)}
          </dd>
        </div>

        <div className="flex justify-between">
          <dt className="text-muted-foreground">Estimated tax</dt>
          <dd className="font-medium tabular-nums">{formatPrice(totals.tax)}</dd>
        </div>
      </dl>

      <div className="mt-6 flex items-baseline justify-between border-t border-border pt-5">
        <span className="text-sm font-medium">Total</span>
        <span className="font-display text-2xl font-light tabular-nums">
          {formatPrice(totals.total)}
        </span>
      </div>

      {children && <div className="mt-6">{children}</div>}
    </div>
  );
}
