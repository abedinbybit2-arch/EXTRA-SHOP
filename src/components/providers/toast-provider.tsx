"use client";

import { useTheme } from "next-themes";
import { Toaster } from "sonner";

/** Sonner toaster wired to follow the active colour theme. */
export function ToastProvider() {
  const { resolvedTheme } = useTheme();

  return (
    <Toaster
      position="bottom-right"
      theme={resolvedTheme === "dark" ? "dark" : "light"}
      closeButton
      offset={24}
      toastOptions={{
        classNames: {
          toast:
            "!rounded-2xl !border-border !bg-card !text-card-foreground !shadow-float !font-sans",
          title: "!text-sm !font-medium",
          description: "!text-xs !text-muted-foreground",
          actionButton: "!rounded-full !bg-primary !text-primary-foreground",
          closeButton: "!rounded-full !border-border !bg-card",
        },
      }}
    />
  );
}
