"use client";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

import { getFirebase } from "./client";

/** Turns Firebase's error codes into something a shopper can act on. */
export function authErrorMessage(error: unknown): string {
  const code =
    typeof error === "object" && error !== null && "code" in error
      ? String((error as { code: unknown }).code)
      : "";

  switch (code) {
    case "auth/email-already-in-use":
      return "That email is already registered. Try signing in instead.";
    case "auth/invalid-email":
      return "That email address doesn't look right.";
    case "auth/weak-password":
      return "Password must be at least six characters.";
    case "auth/invalid-credential":
    case "auth/wrong-password":
    case "auth/user-not-found":
      return "Email or password is incorrect.";
    case "auth/too-many-requests":
      return "Too many attempts. Wait a moment and try again.";
    case "auth/network-request-failed":
      return "Network problem — check your connection and try again.";
    case "auth/operation-not-allowed":
      return "Email sign-in is not enabled for this project yet.";
    default:
      return "Something went wrong. Please try again.";
  }
}

export async function registerWithEmail(email: string, password: string) {
  const fb = getFirebase();
  if (!fb) throw new Error("Firebase is not configured");
  await createUserWithEmailAndPassword(fb.auth, email.trim(), password);
}

export async function loginWithEmail(email: string, password: string) {
  const fb = getFirebase();
  if (!fb) throw new Error("Firebase is not configured");
  await signInWithEmailAndPassword(fb.auth, email.trim(), password);
}

/**
 * Sign out of the registered account. The auth listener immediately opens a
 * fresh guest session, so the storefront is never left without one.
 */
export async function logout() {
  const fb = getFirebase();
  if (!fb) return;
  await signOut(fb.auth);
}
