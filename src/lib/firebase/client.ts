"use client";

import { getApp, getApps, initializeApp, type FirebaseApp } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";
import { getFirestore, type Firestore } from "firebase/firestore";

/**
 * Firebase web configuration. These values are public by design — the database
 * is protected by Firestore security rules, not by hiding the config — but they
 * are still injected as environment variables so a fork can point at its own
 * project without editing source.
 */
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

/**
 * Whether Firebase is configured for this build. When it is not, the storefront
 * still runs exactly as before on localStorage alone — the account features
 * simply stay hidden rather than the whole site failing.
 */
export const firebaseEnabled = Boolean(
  firebaseConfig.apiKey && firebaseConfig.projectId,
);

interface FirebaseServices {
  app: FirebaseApp;
  auth: Auth;
  db: Firestore;
}

let services: FirebaseServices | null = null;

/**
 * Lazily initialise Firebase in the browser. Returns null on the server and in
 * builds without configuration, so every caller must handle the null case.
 */
export function getFirebase(): FirebaseServices | null {
  if (typeof window === "undefined" || !firebaseEnabled) return null;

  if (!services) {
    const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
    services = { app, auth: getAuth(app), db: getFirestore(app) };
  }

  return services;
}
