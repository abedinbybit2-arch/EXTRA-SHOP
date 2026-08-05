"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

import { announcements } from "@/lib/site";

/** Slim rotating announcement strip above the header. */
export function AnnouncementBar() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(
      () => setIndex((i) => (i + 1) % announcements.length),
      5200,
    );
    return () => clearInterval(id);
  }, []);

  return (
    <div className="border-b border-border bg-primary text-primary-foreground">
      <div className="container-luxe flex h-9 items-center justify-center overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.p
            key={index}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="truncate text-[11px] uppercase tracking-[0.16em]"
          >
            {announcements[index]}
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
  );
}
