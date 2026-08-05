"use client";

import {
  ArrowLeft,
  ArrowRight,
  Banknote,
  Building2,
  Check,
  Lock,
  ShoppingBag,
  Truck,
  Zap,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";

import { useHydrated } from "@/hooks/use-hydrated";
import { OrderSummary } from "@/components/cart/order-summary";
import { EmptyState } from "@/components/common/empty-state";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { RadioCard, RadioGroup } from "@/components/ui/radio-group";
import { Skeleton } from "@/components/ui/skeleton";
import {
  calculateTotals,
  findCoupon,
  resolveLines,
  type CartTotals,
} from "@/lib/cart-totals";
import { addOrder } from "@/lib/firebase/account";
import type { OrderRecord } from "@/lib/firebase/schema";
import { cn, formatPrice } from "@/lib/utils";
import { useCart } from "@/store/cart";
import { useSession } from "@/store/session";

import { OrderConfirmation, type ConfirmedOrder } from "./order-confirmation";

const STEPS = ["Shipping", "Delivery", "Payment", "Review"] as const;

const DELIVERY_OPTIONS = [
  {
    id: "standard",
    icon: Truck,
    label: "Standard delivery",
    body: "5–9 working days, fully tracked",
    price: 0,
    eta: "in 5–9 working days",
  },
  {
    id: "express",
    icon: Zap,
    label: "Express delivery",
    body: "2–4 working days, priority handling",
    price: 0,
    eta: "in 2–4 working days",
  },
  {
    id: "nominated",
    icon: Building2,
    label: "Nominated day",
    body: "Choose your delivery date at the door",
    price: 18,
    eta: "on your nominated day",
  },
];

/**
 * Cash on delivery is the only payment method. No card, wallet or online
 * payment details are collected anywhere in this flow.
 */
const PAYMENT_LABEL = "Cash on delivery";

interface FormState {
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  apartment: string;
  city: string;
  postcode: string;
  country: string;
  phone: string;
}

const EMPTY_FORM: FormState = {
  email: "",
  firstName: "",
  lastName: "",
  address: "",
  apartment: "",
  city: "",
  postcode: "",
  country: "United States",
  phone: "",
};

/**
 * Display-only order reference. Kept at module scope so the randomness sits
 * outside the render path.
 */
function makeOrderReference() {
  return `AS-${Math.floor(100000 + Math.random() * 899999)}`;
}

/**
 * The checkout deliberately has no header band, but the page still needs a
 * single top-level heading for assistive tech and search engines. The order
 * confirmation carries its own visible h1, so this only covers the other
 * states.
 */
function CheckoutHeading() {
  return <h1 className="sr-only">Checkout</h1>;
}

/** Four-step checkout. Entirely UI — nothing is transmitted anywhere. */
export function CheckoutView() {
  const items = useCart((s) => s.items);
  const hydrated = useHydrated(useCart);
  const couponCode = useCart((s) => s.couponCode);
  const clear = useCart((s) => s.clear);
  const sessionUid = useSession((s) => s.uid);
  const sessionKind = useSession((s) => s.kind);

  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [delivery, setDelivery] = useState("express");
  const [order, setOrder] = useState<ConfirmedOrder | null>(null);

  if (order) return <OrderConfirmation order={order} />;

  if (!hydrated) {
    return (
      <div className="container-luxe grid gap-10 py-12 lg:grid-cols-[1fr_380px]">
        <CheckoutHeading />
        <Skeleton className="h-[480px] w-full rounded-2xl" />
        <Skeleton className="h-80 w-full rounded-2xl" />
      </div>
    );
  }

  const lines = resolveLines(items);
  if (lines.length === 0) {
    return (
      <div className="container-luxe py-12">
        <CheckoutHeading />
        <EmptyState
          icon={ShoppingBag}
          title="There's nothing to check out"
          description="Your bag is empty. Add a piece or two and come back."
          action={{ label: "Browse the catalogue", href: "/shop" }}
        />
      </div>
    );
  }

  const coupon = couponCode ? findCoupon(couponCode) : null;
  const baseTotals = calculateTotals(lines, coupon);
  const deliveryOption =
    DELIVERY_OPTIONS.find((o) => o.id === delivery) ?? DELIVERY_OPTIONS[0];

  // Nominated-day delivery is charged on top of the standard shipping rule.
  const totals: CartTotals = {
    ...baseTotals,
    shipping: baseTotals.shipping + deliveryOption.price,
    total: baseTotals.total + deliveryOption.price,
  };

  const set = (field: keyof FormState, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  };

  const validateShipping = () => {
    const next: Partial<Record<keyof FormState, string>> = {};
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      next.email = "Enter a valid email address";
    if (!form.firstName.trim()) next.firstName = "Required";
    if (!form.lastName.trim()) next.lastName = "Required";
    if (!form.address.trim()) next.address = "Required";
    if (!form.city.trim()) next.city = "Required";
    if (!form.postcode.trim()) next.postcode = "Required";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const next = () => {
    if (step === 0 && !validateShipping()) return;
    // Cash on delivery collects nothing, so the payment step needs no checks.
    setStep((s) => Math.min(s + 1, STEPS.length - 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const back = () => {
    setStep((s) => Math.max(0, s - 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const placeOrder = () => {
    const reference = makeOrderReference();
    const address = [
      `${form.firstName} ${form.lastName}`,
      form.address,
      form.apartment,
      `${form.city} ${form.postcode}`,
      form.country,
    ]
      .filter(Boolean)
      .join(", ");
    const paymentLabel = PAYMENT_LABEL;

    setOrder({
      reference,
      email: form.email,
      address,
      deliveryLabel: deliveryOption.label,
      deliveryEta: deliveryOption.eta,
      paymentLabel,
      lines,
      totals,
    });

    // Persist to Firestore under the current session — guest or registered —
    // so the order survives a refresh and reappears in My Orders. Failure here
    // must never block the confirmation the shopper already sees.
    if (sessionUid) {
      const record: OrderRecord = {
        id: reference,
        reference,
        placedAt: new Date().toISOString(),
        email: form.email,
        address,
        deliveryLabel: deliveryOption.label,
        deliveryEta: deliveryOption.eta,
        paymentLabel,
        lines: lines.map((line) => ({
          productId: line.productId,
          name: line.product.name,
          image: line.product.images[0],
          quantity: line.quantity,
          unitPrice: line.product.price,
          lineTotal: line.lineTotal,
          ...(line.color ? { color: line.color } : {}),
          ...(line.size ? { size: line.size } : {}),
        })),
        totals: {
          subtotal: totals.subtotal,
          discount: totals.discount,
          shipping: totals.shipping,
          tax: totals.tax,
          total: totals.total,
          itemCount: totals.itemCount,
        },
      };

      void addOrder(sessionKind, sessionUid, record).catch(() => {
        toast.error("Order saved locally", {
          description: "We couldn't reach the server to store it just now.",
        });
      });
    }

    clear();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="container-luxe py-12 lg:py-16">
      <CheckoutHeading />

      {/* Step indicator */}
      <ol className="mb-12 flex flex-wrap items-center gap-x-3 gap-y-2">
        {STEPS.map((label, index) => (
          <li key={label} className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => index < step && setStep(index)}
              disabled={index > step}
              className={cn(
                "flex items-center gap-2.5 text-sm transition-colors",
                index < step && "cursor-pointer hover:text-accent",
                index === step ? "text-foreground" : "text-muted-foreground",
              )}
            >
              <span
                className={cn(
                  "grid size-8 shrink-0 place-items-center rounded-full border text-xs transition-colors",
                  index < step
                    ? "border-accent bg-accent text-accent-foreground"
                    : index === step
                      ? "border-foreground text-foreground"
                      : "border-border",
                )}
              >
                {index < step ? <Check className="size-3.5" /> : index + 1}
              </span>
              <span className="hidden sm:inline">{label}</span>
            </button>
            {index < STEPS.length - 1 && (
              <span aria-hidden className="h-px w-6 bg-border sm:w-10" />
            )}
          </li>
        ))}
      </ol>

      <div className="grid items-start gap-10 lg:grid-cols-[1fr_380px] lg:gap-12">
        <div>
          {step === 0 && (
            <section>
              <h2 className="font-display text-2xl font-light">
                Contact &amp; shipping
              </h2>
              <div className="mt-7 grid gap-5 sm:grid-cols-2">
                <Field
                  className="sm:col-span-2"
                  id="email"
                  label="Email address"
                  value={form.email}
                  onChange={(v) => set("email", v)}
                  error={errors.email}
                  type="email"
                  autoComplete="email"
                  placeholder="your@email.com"
                />
                <Field
                  id="firstName"
                  label="First name"
                  value={form.firstName}
                  onChange={(v) => set("firstName", v)}
                  error={errors.firstName}
                  autoComplete="given-name"
                />
                <Field
                  id="lastName"
                  label="Last name"
                  value={form.lastName}
                  onChange={(v) => set("lastName", v)}
                  error={errors.lastName}
                  autoComplete="family-name"
                />
                <Field
                  className="sm:col-span-2"
                  id="address"
                  label="Street address"
                  value={form.address}
                  onChange={(v) => set("address", v)}
                  error={errors.address}
                  autoComplete="address-line1"
                />
                <Field
                  className="sm:col-span-2"
                  id="apartment"
                  label="Apartment, suite (optional)"
                  value={form.apartment}
                  onChange={(v) => set("apartment", v)}
                  autoComplete="address-line2"
                />
                <Field
                  id="city"
                  label="City"
                  value={form.city}
                  onChange={(v) => set("city", v)}
                  error={errors.city}
                  autoComplete="address-level2"
                />
                <Field
                  id="postcode"
                  label="Postal code"
                  value={form.postcode}
                  onChange={(v) => set("postcode", v)}
                  error={errors.postcode}
                  autoComplete="postal-code"
                />
                <Field
                  id="country"
                  label="Country"
                  value={form.country}
                  onChange={(v) => set("country", v)}
                  autoComplete="country-name"
                />
                <Field
                  id="phone"
                  label="Phone (optional)"
                  value={form.phone}
                  onChange={(v) => set("phone", v)}
                  type="tel"
                  autoComplete="tel"
                />
              </div>
            </section>
          )}

          {step === 1 && (
            <section>
              <h2 className="font-display text-2xl font-light">Delivery method</h2>
              <RadioGroup
                value={delivery}
                onValueChange={setDelivery}
                className="mt-7"
              >
                {DELIVERY_OPTIONS.map((option) => (
                  <RadioCard key={option.id} value={option.id} id={`delivery-${option.id}`}>
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex gap-3">
                        <option.icon className="mt-0.5 size-4 shrink-0 text-accent" />
                        <div>
                          <p className="text-sm font-medium">{option.label}</p>
                          <p className="mt-1 text-xs text-muted-foreground">
                            {option.body}
                          </p>
                        </div>
                      </div>
                      <span className="shrink-0 text-sm font-medium">
                        {option.price === 0 ? "Free" : formatPrice(option.price)}
                      </span>
                    </div>
                  </RadioCard>
                ))}
              </RadioGroup>
            </section>
          )}

          {step === 2 && (
            <section>
              <h2 className="font-display text-2xl font-light">Payment method</h2>

              {/*
                Cash on delivery only. No card, wallet or online payment
                details are collected anywhere in this flow, so there is no
                payment form to render.
              */}
              <div className="mt-7 rounded-2xl border border-accent/40 bg-accent/5 p-6">
                <div className="flex gap-4">
                  <span className="grid size-11 shrink-0 place-items-center rounded-full bg-accent/12 text-accent">
                    <Banknote className="size-5" strokeWidth={1.6} />
                  </span>
                  <div>
                    <p className="text-sm font-medium">{PAYMENT_LABEL}</p>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                      Pay the courier in cash when your order arrives. Nothing is
                      charged now, and no card or account details are required.
                    </p>
                  </div>
                </div>

                <p className="mt-5 flex items-center gap-2 border-t border-accent/20 pt-4 text-xs text-muted-foreground">
                  <Lock className="size-3.5 text-accent" />
                  Have the order total ready for the courier.
                </p>
              </div>
            </section>
          )}

          {step === 3 && (
            <section>
              <h2 className="font-display text-2xl font-light">Review your order</h2>

              <div className="mt-7 space-y-4">
                <ReviewRow
                  title="Delivering to"
                  onEdit={() => setStep(0)}
                  body={`${form.firstName} ${form.lastName}, ${form.address}${
                    form.apartment ? `, ${form.apartment}` : ""
                  }, ${form.city} ${form.postcode}, ${form.country}`}
                />
                <ReviewRow
                  title="Delivery method"
                  onEdit={() => setStep(1)}
                  body={`${deliveryOption.label} — arriving ${deliveryOption.eta}`}
                />
                <ReviewRow
                  title="Payment"
                  onEdit={() => setStep(2)}
                  body={`${PAYMENT_LABEL} — pay the courier on arrival`}
                />
              </div>

              <ul className="mt-7 divide-y divide-border rounded-2xl border border-border bg-card px-6">
                {lines.map((line) => (
                  <li
                    key={`${line.productId}-${line.color}-${line.size}`}
                    className="flex gap-4 py-5"
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
            </section>
          )}

          {/* Step navigation */}
          <div className="mt-9 flex flex-wrap items-center gap-3">
            {step > 0 ? (
              <Button variant="outline" onClick={back}>
                <ArrowLeft className="size-4" />
                Back
              </Button>
            ) : (
              <Button asChild variant="outline">
                <Link href="/cart">
                  <ArrowLeft className="size-4" />
                  Back to bag
                </Link>
              </Button>
            )}

            {step < STEPS.length - 1 ? (
              <Button size="lg" onClick={next}>
                Continue
                <ArrowRight className="size-4" />
              </Button>
            ) : (
              <Button size="lg" variant="gold" onClick={placeOrder}>
                <Lock className="size-4" />
                Place order · {formatPrice(totals.total)}
              </Button>
            )}
          </div>
        </div>

        {/* Summary */}
        <div className="lg:sticky lg:top-28">
          <OrderSummary totals={totals}>
            <p className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
              <Lock className="size-3.5 text-accent" />
              Frontend demo — no payment is processed
            </p>
          </OrderSummary>
        </div>
      </div>
    </div>
  );
}

function Field({
  id,
  label,
  value,
  onChange,
  error,
  className,
  ...props
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  className?: string;
} & Omit<React.ComponentProps<"input">, "id" | "value" | "onChange" | "className">) {
  return (
    <div className={className}>
      <Label htmlFor={id} className="mb-2 block text-xs text-muted-foreground">
        {label}
      </Label>
      <Input
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        {...props}
      />
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-xs text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}

function ReviewRow({
  title,
  body,
  onEdit,
}: {
  title: string;
  body: string;
  onEdit: () => void;
}) {
  return (
    <div className="flex items-start justify-between gap-4 rounded-2xl border border-border bg-card p-5">
      <div className="min-w-0">
        <p className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
          {title}
        </p>
        <p className="mt-1.5 text-sm">{body}</p>
      </div>
      <button
        type="button"
        onClick={onEdit}
        className="shrink-0 text-xs text-muted-foreground underline underline-offset-4 transition-colors hover:text-accent"
      >
        Edit
      </button>
    </div>
  );
}
