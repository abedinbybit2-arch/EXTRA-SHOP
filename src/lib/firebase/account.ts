"use client";

import {
  collection,
  doc,
  getDoc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";

import { DEFAULT_AVATAR_ID } from "@/data/avatars";
import type { CartItem } from "@/types";

import { getFirebase } from "./client";
import {
  collectionFor,
  type AccountDoc,
  type AccountKind,
  type OrderRecord,
} from "./schema";

/** Mirrors the guest uid into localStorage so it is inspectable and durable. */
export const GUEST_ID_KEY = "abedin-shop-guest-id";

export function readStoredGuestId(): string | null {
  if (typeof window === "undefined") return null;
  try {
    return window.localStorage.getItem(GUEST_ID_KEY);
  } catch {
    return null;
  }
}

export function writeStoredGuestId(id: string) {
  try {
    window.localStorage.setItem(GUEST_ID_KEY, id);
  } catch {
    // Private browsing can block storage; the auth session still persists.
  }
}

function accountRef(kind: AccountKind, id: string) {
  const fb = getFirebase();
  if (!fb) return null;
  return doc(fb.db, collectionFor(kind), id);
}

function ordersRef(kind: AccountKind, id: string) {
  const fb = getFirebase();
  if (!fb) return null;
  return collection(fb.db, collectionFor(kind), id, "orders");
}

/**
 * Create the session document if it does not exist yet, and return the current
 * contents. Called once per sign-in so a guest or user always has a home.
 */
export async function ensureAccountDoc(
  kind: AccountKind,
  id: string,
  email: string | null,
): Promise<AccountDoc | null> {
  const ref = accountRef(kind, id);
  if (!ref) return null;

  const snapshot = await getDoc(ref);

  if (!snapshot.exists()) {
    const now = new Date().toISOString();
    const fresh: AccountDoc = {
      kind,
      email,
      avatarId: DEFAULT_AVATAR_ID,
      cart: [],
      createdAt: now,
      updatedAt: now,
    };
    await setDoc(ref, { ...fresh, updatedAtServer: serverTimestamp() });
    return fresh;
  }

  const data = snapshot.data() as Partial<AccountDoc>;

  // Backfill the email on an account created before it was known.
  if (email && data.email !== email) {
    await updateDoc(ref, { email, updatedAt: new Date().toISOString() });
  }

  return {
    kind,
    email: email ?? data.email ?? null,
    avatarId: data.avatarId ?? DEFAULT_AVATAR_ID,
    cart: Array.isArray(data.cart) ? data.cart : [],
    createdAt: data.createdAt ?? new Date().toISOString(),
    updatedAt: data.updatedAt ?? new Date().toISOString(),
  };
}

/** Live subscription to the session document. */
export function watchAccount(
  kind: AccountKind,
  id: string,
  onChange: (doc: AccountDoc | null) => void,
) {
  const ref = accountRef(kind, id);
  if (!ref) return () => {};

  return onSnapshot(
    ref,
    (snapshot) => {
      if (!snapshot.exists()) {
        onChange(null);
        return;
      }
      const data = snapshot.data() as Partial<AccountDoc>;
      onChange({
        kind,
        email: data.email ?? null,
        avatarId: data.avatarId ?? DEFAULT_AVATAR_ID,
        cart: Array.isArray(data.cart) ? data.cart : [],
        createdAt: data.createdAt ?? "",
        updatedAt: data.updatedAt ?? "",
      });
    },
    () => onChange(null),
  );
}

/** Persist the whole cart. Called on every cart mutation. */
export async function saveCart(
  kind: AccountKind,
  id: string,
  cart: CartItem[],
) {
  const ref = accountRef(kind, id);
  if (!ref) return;
  await setDoc(
    ref,
    { cart, updatedAt: new Date().toISOString(), updatedAtServer: serverTimestamp() },
    { merge: true },
  );
}

export async function saveAvatar(
  kind: AccountKind,
  id: string,
  avatarId: string,
) {
  const ref = accountRef(kind, id);
  if (!ref) return;
  await setDoc(
    ref,
    { avatarId, updatedAt: new Date().toISOString() },
    { merge: true },
  );
}

/** Append an order. Orders are immutable once written. */
export async function addOrder(
  kind: AccountKind,
  id: string,
  order: OrderRecord,
) {
  const ref = ordersRef(kind, id);
  if (!ref) return;
  await setDoc(doc(ref, order.id), { ...order, createdAt: serverTimestamp() });
}

/** Live subscription to the order history, newest first. */
export function watchOrders(
  kind: AccountKind,
  id: string,
  onChange: (orders: OrderRecord[]) => void,
) {
  const ref = ordersRef(kind, id);
  if (!ref) return () => {};

  return onSnapshot(
    query(ref, orderBy("placedAt", "desc")),
    (snapshot) => {
      onChange(snapshot.docs.map((d) => d.data() as OrderRecord));
    },
    () => onChange([]),
  );
}
