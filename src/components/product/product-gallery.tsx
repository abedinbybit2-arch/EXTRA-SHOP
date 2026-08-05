"use client";

import { Expand } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

interface ProductGalleryProps {
  images: string[];
  name: string;
}

/**
 * Product image gallery with cursor-tracked magnification. The zoom layer only
 * renders on pointer devices — touch users get the lightbox instead.
 */
export function ProductGallery({ images, name }: ProductGalleryProps) {
  const [active, setActive] = useState(0);
  const [zooming, setZooming] = useState(false);
  const [origin, setOrigin] = useState({ x: 50, y: 50 });
  const [lightbox, setLightbox] = useState(false);
  const frameRef = useRef<HTMLDivElement>(null);

  const handleMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const frame = frameRef.current;
    if (!frame) return;
    const rect = frame.getBoundingClientRect();
    setOrigin({
      x: ((event.clientX - rect.left) / rect.width) * 100,
      y: ((event.clientY - rect.top) / rect.height) * 100,
    });
  };

  return (
    <div className="flex flex-col-reverse gap-4 lg:flex-row">
      {/* Thumbnails */}
      <ul className="no-scrollbar flex gap-3 overflow-x-auto lg:flex-col lg:overflow-visible">
        {images.map((image, index) => (
          <li key={image} className="shrink-0">
            <button
              type="button"
              onClick={() => setActive(index)}
              aria-label={`View image ${index + 1} of ${images.length}`}
              aria-current={index === active}
              className={cn(
                "relative block aspect-4/5 w-16 overflow-hidden rounded-xl border-2 transition-all duration-300 ease-luxe lg:w-20",
                index === active
                  ? "border-accent"
                  : "border-transparent opacity-60 hover:opacity-100",
              )}
            >
              <Image
                src={image}
                alt=""
                fill
                sizes="80px"
                className="object-cover"
              />
            </button>
          </li>
        ))}
      </ul>

      {/* Main frame */}
      <div className="relative flex-1">
        <div
          ref={frameRef}
          onMouseEnter={() => setZooming(true)}
          onMouseLeave={() => setZooming(false)}
          onMouseMove={handleMove}
          className="relative aspect-4/5 overflow-hidden rounded-2xl bg-muted"
        >
          <Image
            src={images[active]}
            alt={name}
            fill
            priority
            sizes="(min-width: 1024px) 45vw, 92vw"
            className={cn(
              "object-cover transition-opacity duration-300",
              zooming && "opacity-0",
            )}
          />

          {/* Magnified layer, positioned to follow the cursor. */}
          <div
            aria-hidden
            className={cn(
              "pointer-events-none absolute inset-0 hidden bg-no-repeat transition-opacity duration-300 lg:block",
              zooming ? "opacity-100" : "opacity-0",
            )}
            style={{
              backgroundImage: `url(${images[active]})`,
              backgroundSize: "190%",
              backgroundPosition: `${origin.x}% ${origin.y}%`,
            }}
          />

          <button
            type="button"
            onClick={() => setLightbox(true)}
            aria-label="Open full-screen image"
            className="glass absolute bottom-4 right-4 grid size-10 place-items-center rounded-full border text-foreground shadow-lift transition-colors hover:bg-card"
          >
            <Expand className="size-4" />
          </button>

          <p className="glass pointer-events-none absolute bottom-4 left-4 hidden rounded-full border px-3 py-1.5 text-[11px] text-muted-foreground lg:block">
            Hover to zoom
          </p>
        </div>
      </div>

      {/* Lightbox */}
      <Dialog open={lightbox} onOpenChange={setLightbox}>
        <DialogContent className="max-w-4xl bg-card p-2">
          <DialogTitle className="sr-only">{name} — enlarged image</DialogTitle>
          <div className="relative aspect-4/5 max-h-[82dvh] overflow-hidden rounded-xl">
            <Image
              src={images[active]}
              alt={name}
              fill
              sizes="90vw"
              className="object-contain"
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
