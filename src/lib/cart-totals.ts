import { coupons } from "@/data/content";
import type { CartItem, Coupon, Product } from "@/types";

import { getProduct } from "./catalog";

export interface CartLine extends CartItem {
  product: Product;
  lineTotal: number;
}

/** Resolve stored cart items into renderable lines, dropping stale entries. */
export function resolveLines(items: CartItem[]): CartLine[] {
  return items.flatMap((item) => {
    const product = getProduct(item.productId);
    if (!product) return [];
    return [{ ...item, product, lineTotal: product.price * item.quantity }];
  });
}

export const FREE_SHIPPING_THRESHOLD = 250;
export const STANDARD_SHIPPING = 12;
export const TAX_RATE = 0.08;

export interface CartTotals {
  subtotal: number;
  /** Amount saved against the original prices. */
  savings: number;
  discount: number;
  shipping: number;
  tax: number;
  total: number;
  itemCount: number;
  /** How much more is needed to unlock free shipping; 0 once reached. */
  freeShippingRemaining: number;
}

export function calculateTotals(
  lines: CartLine[],
  coupon?: Coupon | null,
): CartTotals {
  const subtotal = lines.reduce((sum, line) => sum + line.lineTotal, 0);
  const itemCount = lines.reduce((sum, line) => sum + line.quantity, 0);

  const savings = lines.reduce((sum, line) => {
    const compare = line.product.comparePrice;
    if (!compare || compare <= line.product.price) return sum;
    return sum + (compare - line.product.price) * line.quantity;
  }, 0);

  const couponApplies = Boolean(coupon) && subtotal >= (coupon?.minimumSpend ?? 0);
  const discount = couponApplies ? subtotal * (coupon?.percentOff ?? 0) : 0;

  const afterDiscount = subtotal - discount;
  const shipping =
    afterDiscount === 0 || afterDiscount >= FREE_SHIPPING_THRESHOLD
      ? 0
      : STANDARD_SHIPPING;
  const tax = afterDiscount * TAX_RATE;

  return {
    subtotal,
    savings,
    discount,
    shipping,
    tax,
    total: afterDiscount + shipping + tax,
    itemCount,
    freeShippingRemaining: Math.max(0, FREE_SHIPPING_THRESHOLD - afterDiscount),
  };
}

/** Look up a coupon by code, case-insensitively. */
export function findCoupon(code: string): Coupon | undefined {
  const normalised = code.trim().toUpperCase();
  return coupons.find((c) => c.code === normalised);
}
