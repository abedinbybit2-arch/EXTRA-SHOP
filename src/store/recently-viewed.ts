"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

const MAX_ENTRIES = 12;

interface RecentlyViewedState {
  slugs: string[];
  hydrated: boolean;
  /** Record a view, moving an existing entry back to the front. */
  record: (slug: string) => void;
  clear: () => void;
}

export const useRecentlyViewed = create<RecentlyViewedState>()(
  persist(
    (set) => ({
      slugs: [],
      hydrated: false,

      record: (slug) =>
        set((state) => ({
          slugs: [slug, ...state.slugs.filter((s) => s !== slug)].slice(
            0,
            MAX_ENTRIES,
          ),
        })),

      clear: () => set({ slugs: [] }),
    }),
    {
      name: "abedin-shop-recently-viewed",
      partialize: (state) => ({ slugs: state.slugs }),
      onRehydrateStorage: () => () => {
        useRecentlyViewed.setState({ hydrated: true });
      },
    },
  ),
);
