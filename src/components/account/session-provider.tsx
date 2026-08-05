"use client";

import { onAuthStateChanged, signInAnonymously } from "firebase/auth";
import { useEffect, useRef } from "react";

import { DEFAULT_AVATAR_ID } from "@/data/avatars";
import {
  ensureAccountDoc,
  saveCart,
  watchAccount,
  watchOrders,
  writeStoredGuestId,
} from "@/lib/firebase/account";
import { getFirebase } from "@/lib/firebase/client";
import type { AccountKind } from "@/lib/firebase/schema";
import { useCart } from "@/store/cart";
import { useSession } from "@/store/session";

/** Cart writes are coalesced so a quantity stepper does not spam Firestore. */
const CART_SYNC_DELAY = 500;

/**
 * Owns every Firebase subscription for the session.
 *
 * A visitor with no account is signed in anonymously, which is what produces
 * the Guest ID: it persists across refreshes and browser restarts until site
 * data is cleared, and it lets security rules scope guest documents to their
 * own owner instead of leaving them world-writable.
 *
 * Renders nothing — it is mounted once in the root layout.
 */
export function SessionProvider() {
  const setSession = useSession((s) => s.set);
  const replaceAll = useCart((s) => s.replaceAll);

  /** Suppresses the outbound cart write while we apply a cart from Firestore. */
  const applyingRemote = useRef(false);
  /** Identity the cart writer should target. */
  const target = useRef<{ kind: AccountKind; uid: string } | null>(null);

  useEffect(() => {
    const fb = getFirebase();

    if (!fb) {
      // Deferred so no state is set synchronously inside the effect body.
      queueMicrotask(() => setSession({ status: "unavailable" }));
      return;
    }

    let stopAccount = () => {};
    let stopOrders = () => {};

    const stopAuth = onAuthStateChanged(fb.auth, async (user) => {
      // No session yet — open a guest one.
      if (!user) {
        target.current = null;
        try {
          await signInAnonymously(fb.auth);
        } catch {
          setSession({ status: "unavailable" });
        }
        return;
      }

      const kind: AccountKind = user.isAnonymous ? "guest" : "user";
      if (kind === "guest") writeStoredGuestId(user.uid);

      const account = await ensureAccountDoc(kind, user.uid, user.email);
      target.current = { kind, uid: user.uid };

      // Restore the saved cart. If this session has nothing stored but the
      // browser does, keep the local cart and push it up instead of wiping it.
      const remoteCart = account?.cart ?? [];
      const localCart = useCart.getState().items;

      if (remoteCart.length === 0 && localCart.length > 0) {
        void saveCart(kind, user.uid, localCart);
      } else {
        applyingRemote.current = true;
        replaceAll(remoteCart);
        queueMicrotask(() => {
          applyingRemote.current = false;
        });
      }

      setSession({
        status: kind === "guest" ? "guest" : "user",
        uid: user.uid,
        kind,
        email: user.email,
        avatarId: account?.avatarId ?? DEFAULT_AVATAR_ID,
        busy: false,
      });

      stopAccount();
      stopAccount = watchAccount(kind, user.uid, (snapshot) => {
        if (snapshot) {
          setSession({ avatarId: snapshot.avatarId, email: snapshot.email });
        }
      });

      stopOrders();
      stopOrders = watchOrders(kind, user.uid, (orders) => setSession({ orders }));
    });

    return () => {
      stopAuth();
      stopAccount();
      stopOrders();
    };
  }, [setSession, replaceAll]);

  // Mirror every local cart mutation up to Firestore.
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | undefined;

    const unsubscribe = useCart.subscribe((state, previous) => {
      if (applyingRemote.current) return;
      if (state.items === previous.items) return;

      const current = target.current;
      if (!current) return;

      const items = state.items;
      clearTimeout(timer);
      timer = setTimeout(
        () => void saveCart(current.kind, current.uid, items),
        CART_SYNC_DELAY,
      );
    });

    return () => {
      clearTimeout(timer);
      unsubscribe();
    };
  }, []);

  return null;
}
