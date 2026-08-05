"use client";

import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

/** Milliseconds remaining until the given target, floored at zero. */
function remainingMs(target: number) {
  return Math.max(0, target - Date.now());
}

function split(ms: number) {
  return {
    hours: Math.floor(ms / 3_600_000),
    minutes: Math.floor((ms % 3_600_000) / 60_000),
    seconds: Math.floor((ms % 60_000) / 1000),
  };
}

interface CountdownProps {
  /** Hours from first client render until the sale ends. */
  hours?: number;
  className?: string;
  variant?: "default" | "compact";
}

/**
 * Flash-sale countdown. The target is established on the client after mount so
 * the statically exported HTML never ships a stale timestamp.
 */
export function Countdown({
  hours = 48,
  className,
  variant = "default",
}: CountdownProps) {
  const targetRef = useRef<number | null>(null);
  const [ms, setMs] = useState(hours * 3_600_000);

  useEffect(() => {
    // Established after mount so the exported HTML never carries a stale
    // timestamp. State is only ever set from the interval callback.
    const end = Date.now() + hours * 3_600_000;
    targetRef.current = end;

    const tick = () => setMs(remainingMs(end));
    const frame = requestAnimationFrame(tick);
    const id = setInterval(tick, 1000);

    return () => {
      cancelAnimationFrame(frame);
      clearInterval(id);
    };
  }, [hours]);

  const { hours: h, minutes: m, seconds: s } = split(ms);
  const units = [
    { value: h, label: "Hours" },
    { value: m, label: "Minutes" },
    { value: s, label: "Seconds" },
  ];

  if (variant === "compact") {
    return (
      <span className={cn("font-medium tabular-nums", className)}>
        {String(h).padStart(2, "0")}:{String(m).padStart(2, "0")}:
        {String(s).padStart(2, "0")}
      </span>
    );
  }

  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      {units.map((unit) => (
        <div key={unit.label} className="flex flex-col items-center gap-1.5">
          <span className="grid min-w-14 place-items-center rounded-xl border border-border bg-card px-3 py-2.5 font-display text-2xl tabular-nums shadow-soft">
            {String(unit.value).padStart(2, "0")}
          </span>
          <span className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
            {unit.label}
          </span>
        </div>
      ))}
    </div>
  );
}
