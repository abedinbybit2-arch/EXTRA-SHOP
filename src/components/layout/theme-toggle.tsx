"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { useMounted } from "@/hooks/use-mounted";
import { cn } from "@/lib/utils";

/**
 * Light/dark switch. Renders a stable placeholder until mounted, because the
 * resolved theme is unknown during the static prerender.
 */
export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useMounted();

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={
        mounted
          ? `Switch to ${isDark ? "light" : "dark"} mode`
          : "Toggle colour theme"
      }
      className={cn(
        "relative grid size-10 place-items-center rounded-full text-foreground transition-colors hover:bg-secondary",
        className,
      )}
    >
      {mounted ? (
        <>
          <Sun
            className={cn(
              "absolute size-[18px] transition-all duration-500 ease-luxe",
              isDark ? "rotate-90 scale-0 opacity-0" : "rotate-0 scale-100 opacity-100",
            )}
          />
          <Moon
            className={cn(
              "absolute size-[18px] transition-all duration-500 ease-luxe",
              isDark ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-0 opacity-0",
            )}
          />
        </>
      ) : (
        <Sun className="size-[18px] opacity-40" />
      )}
    </button>
  );
}
