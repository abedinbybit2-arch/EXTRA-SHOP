import type { CartItem } from "@/types";

/** Which kind of session a document belongs to. */
export type AccountKind = "guest" | "user";

/** A single line of a placed order, denormalised so orders stay readable. */
export interface OrderLineRecord {
  productId: string;
  name: string;
  image: string;
  quantity: number;
  unitPrice: number;
  lineTotal: number;
  color?: string;
  size?: string;
}

export interface OrderTotals {
  subtotal: number;
  discount: number;
  shipping: number;
  tax: number;
  total: number;
  itemCount: number;
}

/** An order as stored in Firestore. Written once and never modified. */
export interface OrderRecord {
  id: string;
  reference: string;
  placedAt: string;
  email: string;
  address: string;
  deliveryLabel: string;
  deliveryEta: string;
  paymentLabel: string;
  lines: OrderLineRecord[];
  totals: OrderTotals;
}

/**
 * The per-session document. Guests and registered users share this shape; the
 * only difference is which collection it lives in and whether `email` is set.
 */
export interface AccountDoc {
  kind: AccountKind;
  email: string | null;
  avatarId: string;
  cart: CartItem[];
  createdAt: string;
  updatedAt: string;
}

export const GUESTS_COLLECTION = "guests";
export const USERS_COLLECTION = "users";

/** Collection a session's document lives in. */
export function collectionFor(kind: AccountKind) {
  return kind === "guest" ? GUESTS_COLLECTION : USERS_COLLECTION;
}
