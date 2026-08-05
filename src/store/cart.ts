"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

import type { CartItem } from "@/types";

/** Two lines are the same only if product, colour and size all match. */
function sameLine(a: CartItem, b: Omit<CartItem, "quantity">) {
  return (
    a.productId === b.productId && a.color === b.color && a.size === b.size
  );
}

interface CartState {
  items: CartItem[];
  /** Applied coupon code, carried from the cart through to checkout. */
  couponCode: string | null;
  /** False until persisted state has been read from localStorage. */
  hydrated: boolean;
  addItem: (item: CartItem) => void;
  removeItem: (item: Omit<CartItem, "quantity">) => void;
  setQuantity: (item: Omit<CartItem, "quantity">, quantity: number) => void;
  setCoupon: (code: string | null) => void;
  /** Replace the whole cart, used when restoring a cart from Firestore. */
  replaceAll: (items: CartItem[]) => void;
  clear: () => void;
  /** Total units across every line. */
  count: () => number;
}

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      couponCode: null,
      hydrated: false,

      addItem: (item) =>
        set((state) => {
          const existing = state.items.find((line) => sameLine(line, item));
          if (existing) {
            return {
              items: state.items.map((line) =>
                sameLine(line, item)
                  ? { ...line, quantity: line.quantity + item.quantity }
                  : line,
              ),
            };
          }
          return { items: [...state.items, item] };
        }),

      removeItem: (item) =>
        set((state) => ({
          items: state.items.filter((line) => !sameLine(line, item)),
        })),

      setQuantity: (item, quantity) =>
        set((state) => ({
          items:
            quantity <= 0
              ? state.items.filter((line) => !sameLine(line, item))
              : state.items.map((line) =>
                  sameLine(line, item) ? { ...line, quantity } : line,
                ),
        })),

      setCoupon: (couponCode) => set({ couponCode }),

      replaceAll: (items) => set({ items }),

      clear: () => set({ items: [], couponCode: null }),

      count: () => get().items.reduce((sum, line) => sum + line.quantity, 0),
    }),
    {
      name: "abedin-shop-cart",
      partialize: (state) => ({
        items: state.items,
        couponCode: state.couponCode,
      }),
      onRehydrateStorage: () => () => {
        // Flip the flag so the UI can safely render persisted counts.
        useCart.setState({ hydrated: true });
      },
    },
  ),
);
