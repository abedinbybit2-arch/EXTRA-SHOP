"use client";

import { create } from "zustand";

import { DEFAULT_AVATAR_ID } from "@/data/avatars";
import type { AccountKind, OrderRecord } from "@/lib/firebase/schema";

export type SessionStatus = "loading" | "guest" | "user" | "unavailable";

interface SessionState {
  /** `unavailable` means Firebase is not configured for this build. */
  status: SessionStatus;
  /** Guest ID when browsing anonymously, Firebase uid once registered. */
  uid: string | null;
  kind: AccountKind;
  email: string | null;
  avatarId: string;
  orders: OrderRecord[];
  /** True while a sign-in, registration or sign-out is in flight. */
  busy: boolean;

  set: (patch: Partial<SessionState>) => void;
  reset: () => void;
}

const INITIAL = {
  status: "loading" as SessionStatus,
  uid: null,
  kind: "guest" as AccountKind,
  email: null,
  avatarId: DEFAULT_AVATAR_ID,
  orders: [] as OrderRecord[],
  busy: false,
};

/**
 * Session state shared across the app. The provider owns every Firebase
 * subscription and pushes results in here; components only read.
 */
export const useSession = create<SessionState>()((set) => ({
  ...INITIAL,
  set: (patch) => set(patch),
  reset: () => set(INITIAL),
}));

export const isSignedIn = (status: SessionStatus) => status === "user";
