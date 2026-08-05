"use client";

import { Check, Heart, RotateCcw, ShieldCheck, ShoppingBag, Truck } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

import { useHydrated } from "@/hooks/use-hydrated";
import { Price } from "@/components/common/price";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { QuantityStepper } from "@/components/ui/quantity-stepper";
import { Rating } from "@/components/ui/rating";
import { getBrand } from "@/data/brands";
import { getCategory } from "@/data/categories";
import { stockLabel, stockStatus } from "@/lib/catalog";
import { cn, discountPercent } from "@/lib/utils";
import { useCart } from "@/store/cart";
import { useUI } from "@/store/ui";
import { useWishlist } from "@/store/wishlist";
import type { Product } from "@/types";

import { ColorSwatches, SizeSelector } from "./variant-selectors";

const ASSURANCES = [
  { icon: Truck, label: "Free express shipping over $250" },
  { icon: RotateCcw, label: "60-day returns, we pay postage" },
  { icon: ShieldCheck, label: "2-year international warranty" },
];

/** Right-hand buying column on the product detail page. */
export function PurchasePanel({ product }: { product: Product }) {
  const router = useRouter();
  const addItem = useCart((s) => s.addItem);
  const openCart = useUI((s) => s.openCart);
  const toggleWishlist = useWishlist((s) => s.toggle);
  const wishlistHydrated = useHydrated(useWishlist);
  const saved = useWishlist((s) => s.slugs.includes(product.slug));
  const wishlisted = wishlistHydrated && saved;

  const [color, setColor] = useState(product.colors[0]?.name);
  const [size, setSize] = useState(product.sizes?.[0]);
  const [quantity, setQuantity] = useState(1);

  const status = stockStatus(product);
  const soldOut = status === "out-of-stock";
  const brand = getBrand(product.brand);
  const category = getCategory(product.category);
  const off = discountPercent(product.price, product.comparePrice);

  const addToCart = () => {
    addItem({ productId: product.slug, quantity, color, size });
    toast.success("Added to your bag", {
      description: `${product.name} · ${quantity} item${quantity > 1 ? "s" : ""}`,
      action: { label: "View bag", onClick: openCart },
    });
  };

  const buyNow = () => {
    addItem({ productId: product.slug, quantity, color, size });
    router.push("/checkout");
  };

  return (
    <div className="lg:sticky lg:top-28">
      {/* Merchandising flags */}
      <div className="mb-4 flex flex-wrap items-center gap-2">
        {off > 0 && <Badge variant="sale" size="sm">−{off}% reduced</Badge>}
        {product.tags.includes("new") && <Badge variant="gold" size="sm">New in</Badge>}
        {product.tags.includes("limited") && (
          <Badge variant="outline" size="sm">Limited edition</Badge>
        )}
        {product.tags.includes("bestseller") && (
          <Badge variant="muted" size="sm">Best seller</Badge>
        )}
      </div>

      {brand && (
        <Link
          href={`/brands/${brand.slug}`}
          className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:text-accent"
        >
          {brand.name}
        </Link>
      )}

      <h1 className="mt-2 text-balance text-3xl leading-tight lg:text-4xl">
        {product.name}
      </h1>
      <p className="mt-3 font-display text-lg font-light italic text-muted-foreground">
        {product.tagline}
      </p>

      <div className="mt-5 flex flex-wrap items-center gap-4">
        <Rating value={product.rating} count={product.reviewCount} showValue />
        <a
          href="#reviews"
          className="text-xs text-muted-foreground underline underline-offset-4 transition-colors hover:text-accent"
        >
          Read reviews
        </a>
      </div>

      <Price
        value={product.price}
        compareAt={product.comparePrice}
        size="xl"
        showDiscount
        className="mt-6"
      />
      <p className="mt-1.5 text-xs text-muted-foreground">
        Duties included · Cash on delivery
      </p>

      <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
        {product.description}
      </p>

      {/* Variants */}
      <div className="mt-8 space-y-6">
        <ColorSwatches colors={product.colors} value={color} onChange={setColor} />
        {product.sizes && (
          <SizeSelector sizes={product.sizes} value={size} onChange={setSize} />
        )}
      </div>

      {/* Quantity & stock */}
      <div className="mt-8 flex items-center gap-4">
        <QuantityStepper
          value={quantity}
          onChange={setQuantity}
          max={Math.max(1, product.stock)}
        />
        <span
          className={cn(
            "flex items-center gap-2 text-sm",
            soldOut
              ? "text-muted-foreground"
              : status === "low-stock"
                ? "text-warning"
                : "text-success",
          )}
        >
          <span
            className={cn(
              "size-1.5 rounded-full",
              soldOut ? "bg-muted-foreground" : status === "low-stock" ? "bg-warning" : "bg-success",
            )}
          />
          {stockLabel(product)}
        </span>
      </div>

      {/* Actions */}
      <div className="mt-6 space-y-3">
        <div className="flex gap-3">
          <Button
            size="lg"
            className="flex-1"
            onClick={addToCart}
            disabled={soldOut}
          >
            <ShoppingBag className="size-4" />
            {soldOut ? "Sold out" : "Add to bag"}
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="w-13 px-0"
            onClick={() => {
              toggleWishlist(product.slug);
              toast[wishlisted ? "info" : "success"](
                wishlisted ? "Removed from wishlist" : "Saved to wishlist",
                { description: product.name },
              );
            }}
            aria-label={wishlisted ? "Remove from wishlist" : "Save to wishlist"}
            aria-pressed={wishlisted}
          >
            <Heart
              className={cn("size-4", wishlisted && "fill-destructive text-destructive")}
            />
          </Button>
        </div>

        <Button
          variant="gold"
          size="lg"
          className="w-full"
          onClick={buyNow}
          disabled={soldOut}
        >
          Buy it now
        </Button>
      </div>

      {/* Assurances */}
      <ul className="mt-8 space-y-3 rounded-2xl border border-border bg-card p-5">
        {ASSURANCES.map((item) => (
          <li key={item.label} className="flex items-center gap-3 text-sm">
            <item.icon className="size-4 shrink-0 text-accent" />
            <span className="text-muted-foreground">{item.label}</span>
          </li>
        ))}
      </ul>

      {/* Highlights */}
      <div className="mt-8">
        <h2 className="mb-4 text-[11px] font-semibold uppercase tracking-[0.18em]">
          At a glance
        </h2>
        <ul className="space-y-2.5">
          {product.highlights.map((highlight) => (
            <li key={highlight} className="flex gap-3 text-sm text-muted-foreground">
              <Check className="mt-0.5 size-4 shrink-0 text-accent" />
              {highlight}
            </li>
          ))}
        </ul>
      </div>

      {category && (
        <p className="mt-8 text-xs text-muted-foreground">
          Department:{" "}
          <Link
            href={`/categories/${category.slug}`}
            className="text-foreground underline underline-offset-4 transition-colors hover:text-accent"
          >
            {category.name}
          </Link>
        </p>
      )}
    </div>
  );
}
