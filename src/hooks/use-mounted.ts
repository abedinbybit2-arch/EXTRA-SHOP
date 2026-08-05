"use client";

import { useSyncExternalStore } from "react";

/** No external store to watch — mounting is the only signal we need. */
const subscribe = () => () => {};

/**
 * True once the component has hydrated on the client, false during the static
 * prerender. Uses useSyncExternalStore rather than a mount effect so no state
 * is set synchronously inside an effect.
 */
export function useMounted() {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
}
