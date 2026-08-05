"use client";

import { Eye, Heart, ShoppingBag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";

import { useHydrated } from "@/hooks/use-hydrated";
import { Price } from "@/components/common/price";
import { Badge } from "@/components/ui/badge";
import { Rating } from "@/components/ui/rating";
import { getBrand } from "@/data/brands";
import { stockStatus } from "@/lib/catalog";
import { cn, discountPercent } from "@/lib/utils";
import { useCart } from "@/store/cart";
import { useUI } from "@/store/ui";
import { useWishlist } from "@/store/wishlist";
import type { Product } from "@/types";

interface ProductCardProps {
  product: Product;
  /** Priority-load the image for above-the-fold grid positions. */
  priority?: boolean;
  className?: string;
  layout?: "grid" | "list";
}

export function ProductCard({
  product,
  priority = false,
  className,
  layout = "grid",
}: ProductCardProps) {
  const addItem = useCart((s) => s.addItem);
  const openCart = useUI((s) => s.openCart);
  const openQuickView = useUI((s) => s.openQuickView);

  const wishlistHydrated = useHydrated(useWishlist);
  const saved = useWishlist((s) => s.slugs.includes(product.slug));
  const wishlisted = wishlistHydrated && saved;
  const toggleWishlist = useWishlist((s) => s.toggle);

  const status = stockStatus(product);
  const soldOut = status === "out-of-stock";
  const off = discountPercent(product.price, product.comparePrice);
  const brand = getBrand(product.brand);
  const href = `/product/${product.slug}`;

  const handleAddToCart = () => {
    if (soldOut) return;
    addItem({
      productId: product.slug,
      quantity: 1,
      color: product.colors[0]?.name,
      size: product.sizes?.[0],
    });
    toast.success("Added to your bag", {
      description: product.name,
      action: { label: "View bag", onClick: openCart },
    });
  };

  const handleWishlist = () => {
    toggleWishlist(product.slug);
    toast[wishlisted ? "info" : "success"](
      wishlisted ? "Removed from wishlist" : "Saved to wishlist",
      { description: product.name },
    );
  };

  if (layout === "list") {
    return (
      <article
        className={cn(
          "group flex gap-5 rounded-2xl border border-border bg-card p-4 transition-all duration-500 ease-luxe hover:shadow-lift",
          className,
        )}
      >
        <Link
          href={href}
          className="relative aspect-4/5 w-28 shrink-0 overflow-hidden rounded-xl bg-muted sm:w-36"
        >
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            sizes="144px"
            className="object-cover transition-transform duration-700 ease-luxe group-hover:scale-105"
          />
        </Link>

        <div className="flex min-w-0 flex-1 flex-col">
          <p className="text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
            {brand?.name}
          </p>
          <h3 className="mt-1 font-sans text-base font-medium leading-snug">
            <Link href={href} className="transition-colors hover:text-accent">
              {product.name}
            </Link>
          </h3>
          <p className="mt-1.5 line-clamp-2 text-sm text-muted-foreground">
            {product.tagline}
          </p>
          <Rating
            value={product.rating}
            count={product.reviewCount}
            size="sm"
            className="mt-2.5"
          />
          <div className="mt-auto flex flex-wrap items-end justify-between gap-3 pt-4">
            <Price
              value={product.price}
              compareAt={product.comparePrice}
              size="lg"
              showDiscount
            />
            <button
              type="button"
              onClick={handleAddToCart}
              disabled={soldOut}
              className="inline-flex h-10 items-center gap-2 rounded-full bg-primary px-5 text-xs font-medium text-primary-foreground transition-all hover:shadow-lift disabled:opacity-40"
            >
              <ShoppingBag className="size-3.5" />
              {soldOut ? "Sold out" : "Add to bag"}
            </button>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className={cn("group flex flex-col", className)}>
      <div className="relative overflow-hidden rounded-2xl bg-muted">
        <Link href={href} className="block" aria-label={product.name}>
          <span className="relative block aspect-4/5">
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              priority={priority}
              loading={priority ? undefined : "lazy"}
              sizes="(min-width: 1280px) 22vw, (min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw"
              className={cn(
                "object-cover transition-all duration-700 ease-luxe",
                "group-hover:scale-[1.06] group-hover:opacity-0",
                soldOut && "opacity-60 saturate-50",
              )}
            />
            {/* Second frame revealed on hover. */}
            <Image
              src={product.images[1] ?? product.images[0]}
              alt=""
              fill
              aria-hidden
              loading="lazy"
              sizes="(min-width: 1280px) 22vw, (min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw"
              className="scale-[1.06] object-cover opacity-0 transition-all duration-700 ease-luxe group-hover:scale-100 group-hover:opacity-100"
            />
          </span>
        </Link>

        {/* Merchandising badges */}
        <div className="pointer-events-none absolute left-3 top-3 flex flex-col items-start gap-1.5">
          {off > 0 && <Badge variant="sale" size="sm">−{off}%</Badge>}
          {product.tags.includes("new") && (
            <Badge variant="glass" size="sm">New</Badge>
          )}
          {product.tags.includes("limited") && (
            <Badge variant="gold" size="sm">Limited</Badge>
          )}
          {soldOut && <Badge variant="muted" size="sm">Sold out</Badge>}
        </div>

        {/* Wishlist — always visible on touch, revealed on hover for pointers */}
        <button
          type="button"
          onClick={handleWishlist}
          aria-label={wishlisted ? "Remove from wishlist" : "Save to wishlist"}
          aria-pressed={wishlisted}
          className={cn(
            "glass absolute right-3 top-3 grid size-9 place-items-center rounded-full border transition-all duration-300 ease-luxe",
            "lg:translate-y-1 lg:opacity-0 lg:group-hover:translate-y-0 lg:group-hover:opacity-100 lg:focus-visible:translate-y-0 lg:focus-visible:opacity-100",
            wishlisted ? "text-destructive lg:opacity-100" : "text-foreground",
          )}
        >
          <Heart className={cn("size-4", wishlisted && "fill-current")} />
        </button>

        {/* Hover actions */}
        <div className="absolute inset-x-3 bottom-3 flex gap-2 opacity-100 transition-all duration-400 ease-luxe lg:translate-y-3 lg:opacity-0 lg:group-hover:translate-y-0 lg:group-hover:opacity-100">
          <button
            type="button"
            onClick={handleAddToCart}
            disabled={soldOut}
            className="flex h-10 flex-1 items-center justify-center gap-2 rounded-full bg-primary text-xs font-medium text-primary-foreground shadow-lift transition-colors hover:bg-accent hover:text-accent-foreground disabled:cursor-not-allowed disabled:opacity-45"
          >
            <ShoppingBag className="size-3.5" />
            {soldOut ? "Sold out" : "Add to bag"}
          </button>
          <button
            type="button"
            onClick={() => openQuickView(product.slug)}
            aria-label={`Quick view ${product.name}`}
            className="glass grid size-10 shrink-0 place-items-center rounded-full border text-foreground shadow-lift transition-colors hover:bg-card"
          >
            <Eye className="size-4" />
          </button>
        </div>
      </div>

      {/* Details */}
      <div className="mt-4 flex flex-1 flex-col">
        <p className="text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
          {brand?.name}
        </p>
        <h3 className="mt-1.5 font-sans text-sm font-medium leading-snug">
          <Link href={href} className="transition-colors hover:text-accent">
            {product.name}
          </Link>
        </h3>

        <Rating
          value={product.rating}
          count={product.reviewCount}
          size="sm"
          className="mt-2"
        />

        <div className="mt-2.5 flex items-end justify-between gap-2">
          <Price value={product.price} compareAt={product.comparePrice} />
          <StockPill status={status} stock={product.stock} />
        </div>
      </div>
    </article>
  );
}

/** Compact stock indicator shown under the price. */
function StockPill({
  status,
  stock,
}: {
  status: ReturnType<typeof stockStatus>;
  stock: number;
}) {
  if (status === "out-of-stock") {
    return <span className="text-[11px] text-muted-foreground">Sold out</span>;
  }
  if (status === "low-stock") {
    return (
      <span className="flex items-center gap-1.5 text-[11px] text-warning">
        <span className="size-1.5 rounded-full bg-warning" />
        Only {stock} left
      </span>
    );
  }
  return (
    <span className="flex items-center gap-1.5 text-[11px] text-success">
      <span className="size-1.5 rounded-full bg-success" />
      In stock
    </span>
  );
}
