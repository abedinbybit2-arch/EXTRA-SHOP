"use client";

import { useSyncExternalStore } from "react";

/** The slice of a persisted Zustand store this hook needs. */
interface PersistedStore {
  persist: {
    hasHydrated: () => boolean;
    onFinishHydration: (listener: () => void) => () => void;
  };
}

/**
 * True once a persisted store has been read back from localStorage.
 *
 * This asks Zustand directly rather than mirroring the state in a `hydrated`
 * field on the store. Setting such a field from `onRehydrateStorage` looks
 * correct but cannot work: with synchronous storage Zustand runs that callback
 * *during* `create()`, so the store constant is still in its temporal dead
 * zone. The resulting ReferenceError is swallowed by Zustand and the flag stays
 * false forever — which silently emptied the cart, wishlist and checkout.
 *
 * `useSyncExternalStore` also gives the correct server snapshot (false) without
 * setting state inside an effect.
 */
export function useHydrated(store: PersistedStore): boolean {
  return useSyncExternalStore(
    (onChange) => store.persist.onFinishHydration(onChange),
    () => store.persist.hasHydrated(),
    () => false,
  );
}
