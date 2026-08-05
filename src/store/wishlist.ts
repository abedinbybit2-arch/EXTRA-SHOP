"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

interface WishlistState {
  /** Product slugs, most recently saved first. */
  slugs: string[];
  hydrated: boolean;
  toggle: (slug: string) => void;
  remove: (slug: string) => void;
  clear: () => void;
  has: (slug: string) => boolean;
}

export const useWishlist = create<WishlistState>()(
  persist(
    (set, get) => ({
      slugs: [],
      hydrated: false,

      toggle: (slug) =>
        set((state) => ({
          slugs: state.slugs.includes(slug)
            ? state.slugs.filter((s) => s !== slug)
            : [slug, ...state.slugs],
        })),

      remove: (slug) =>
        set((state) => ({ slugs: state.slugs.filter((s) => s !== slug) })),

      clear: () => set({ slugs: [] }),

      has: (slug) => get().slugs.includes(slug),
    }),
    {
      name: "extra-shop-wishlist",
      partialize: (state) => ({ slugs: state.slugs }),
      onRehydrateStorage: () => () => {
        useWishlist.setState({ hydrated: true });
      },
    },
  ),
);
