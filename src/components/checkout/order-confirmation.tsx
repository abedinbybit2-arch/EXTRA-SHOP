"use client";

import { Check, Mail, MapPin, Package, Truck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";

import { Button } from "@/components/ui/button";
import type { CartLine, CartTotals } from "@/lib/cart-totals";
import { formatPrice } from "@/lib/utils";

export interface ConfirmedOrder {
  reference: string;
  email: string;
  address: string;
  deliveryLabel: string;
  deliveryEta: string;
  paymentLabel: string;
  lines: CartLine[];
  totals: CartTotals;
}

const TIMELINE = [
  { icon: Check, title: "Order confirmed", body: "We've received your order.", done: true },
  { icon: Package, title: "Packed at the atelier", body: "Within 24 hours.", done: false },
  { icon: Truck, title: "In transit", body: "Tracking link sent by email.", done: false },
  { icon: MapPin, title: "Delivered", body: "Signature required.", done: false },
];

/** Post-purchase screen. No order is actually placed — this is UI only. */
export function OrderConfirmation({ order }: { order: ConfirmedOrder }) {
  return (
    <div className="container-luxe py-16 lg:py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto max-w-3xl text-center"
      >
        <motion.span
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.15, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mb-7 grid size-20 place-items-center rounded-full bg-success/12 text-success"
        >
          <Check className="size-9" strokeWidth={1.5} />
        </motion.span>

        <p className="text-[11px] uppercase tracking-[0.22em] text-accent">
          Order {order.reference}
        </p>
        <h1 className="mt-4 text-balance text-4xl leading-tight lg:text-5xl">
          Thank you — your order is confirmed
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-pretty text-sm leading-relaxed text-muted-foreground">
          A confirmation has been sent to{" "}
          <span className="text-foreground">{order.email}</span>. Your pieces will
          be packed at the atelier and dispatched within 24 hours.
        </p>
      </motion.div>

      {/* Timeline */}
      <ol className="mx-auto mt-14 grid max-w-4xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {TIMELINE.map((step, index) => (
          <motion.li
            key={step.title}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 + index * 0.08, duration: 0.5 }}
            className="rounded-2xl border border-border bg-card p-6"
          >
            <span
              className={
                step.done
                  ? "mb-4 grid size-10 place-items-center rounded-full bg-success/12 text-success"
                  : "mb-4 grid size-10 place-items-center rounded-full bg-secondary text-muted-foreground"
              }
            >
              <step.icon className="size-4" />
            </span>
            <p className="text-sm font-medium">{step.title}</p>
            <p className="mt-1 text-xs text-muted-foreground">{step.body}</p>
          </motion.li>
        ))}
      </ol>

      {/* Details */}
      <div className="mx-auto mt-12 grid max-w-4xl gap-5 lg:grid-cols-[1fr_340px]">
        <div className="rounded-2xl border border-border bg-card p-6 lg:p-7">
          <h2 className="font-display text-xl font-light">Your order</h2>
          <ul className="mt-6 divide-y divide-border">
            {order.lines.map((line) => (
              <li
                key={`${line.productId}-${line.color}-${line.size}`}
                className="flex gap-4 py-4 first:pt-0 last:pb-0"
              >
                <span className="relative aspect-4/5 w-16 shrink-0 overflow-hidden rounded-lg bg-muted">
                  <Image
                    src={line.product.images[0]}
                    alt=""
                    fill
                    sizes="64px"
                    className="object-cover"
                  />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-medium">
                    {line.product.name}
                  </span>
                  <span className="mt-1 block text-xs text-muted-foreground">
                    {[line.color, line.size, `Qty ${line.quantity}`]
                      .filter(Boolean)
                      .join(" · ")}
                  </span>
                </span>
                <span className="shrink-0 text-sm font-medium tabular-nums">
                  {formatPrice(line.lineTotal)}
                </span>
              </li>
            ))}
          </ul>

          <dl className="mt-6 space-y-2.5 border-t border-border pt-5 text-sm">
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Subtotal</dt>
              <dd className="tabular-nums">{formatPrice(order.totals.subtotal)}</dd>
            </div>
            {order.totals.discount > 0 && (
              <div className="flex justify-between text-accent">
                <dt>Promo discount</dt>
                <dd className="tabular-nums">
                  −{formatPrice(order.totals.discount)}
                </dd>
              </div>
            )}
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Shipping</dt>
              <dd className="tabular-nums">
                {order.totals.shipping === 0
                  ? "Free"
                  : formatPrice(order.totals.shipping)}
              </dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Tax</dt>
              <dd className="tabular-nums">{formatPrice(order.totals.tax)}</dd>
            </div>
            <div className="flex justify-between border-t border-border pt-3 text-base font-medium">
              <dt>Total paid</dt>
              <dd className="tabular-nums">{formatPrice(order.totals.total)}</dd>
            </div>
          </dl>
        </div>

        <div className="space-y-5">
          <DetailCard icon={MapPin} title="Delivering to" body={order.address} />
          <DetailCard
            icon={Truck}
            title={order.deliveryLabel}
            body={`Estimated arrival ${order.deliveryEta}`}
          />
          <DetailCard icon={Mail} title="Paid with" body={order.paymentLabel} />
        </div>
      </div>

      <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
        <Button asChild size="lg">
          <Link href="/shop">Continue shopping</Link>
        </Button>
        <Button asChild variant="outline" size="lg">
          <Link href="/">Back to home</Link>
        </Button>
      </div>

      <p className="mt-10 text-center text-xs text-muted-foreground">
        This is a frontend demonstration. No payment was taken and no order will
        be dispatched.
      </p>
    </div>
  );
}

function DetailCard({
  icon: Icon,
  title,
  body,
}: {
  icon: typeof MapPin;
  title: string;
  body: string;
}) {
  return (
    <div className="rounded-2xl border border-border bg-card p-6">
      <span className="mb-3 flex items-center gap-2 text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
        <Icon className="size-3.5 text-accent" />
        {title}
      </span>
      <p className="text-sm leading-relaxed text-foreground">{body}</p>
    </div>
  );
}
