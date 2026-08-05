"use client";

import { create } from "zustand";

/**
 * Ephemeral interface state shared across the tree — deliberately not
 * persisted, so a reload always lands on a clean page.
 */
interface UIState {
  cartOpen: boolean;
  searchOpen: boolean;
  mobileMenuOpen: boolean;
  filtersOpen: boolean;
  /** Slug of the product shown in the quick-view modal, or null. */
  quickViewSlug: string | null;

  openCart: () => void;
  closeCart: () => void;
  setCartOpen: (open: boolean) => void;

  setSearchOpen: (open: boolean) => void;
  setMobileMenuOpen: (open: boolean) => void;
  setFiltersOpen: (open: boolean) => void;

  openQuickView: (slug: string) => void;
  closeQuickView: () => void;
}

export const useUI = create<UIState>()((set) => ({
  cartOpen: false,
  searchOpen: false,
  mobileMenuOpen: false,
  filtersOpen: false,
  quickViewSlug: null,

  openCart: () => set({ cartOpen: true }),
  closeCart: () => set({ cartOpen: false }),
  setCartOpen: (cartOpen) => set({ cartOpen }),

  setSearchOpen: (searchOpen) => set({ searchOpen }),
  setMobileMenuOpen: (mobileMenuOpen) => set({ mobileMenuOpen }),
  setFiltersOpen: (filtersOpen) => set({ filtersOpen }),

  openQuickView: (slug) => set({ quickViewSlug: slug }),
  closeQuickView: () => set({ quickViewSlug: null }),
}));
