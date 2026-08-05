"use client";

import { ArrowRight, Heart, ShoppingBag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";

import { Price } from "@/components/common/price";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { QuantityStepper } from "@/components/ui/quantity-stepper";
import { Rating } from "@/components/ui/rating";
import { getBrand } from "@/data/brands";
import { getProduct, stockLabel, stockStatus } from "@/lib/catalog";
import { cn } from "@/lib/utils";
import { useCart } from "@/store/cart";
import { useUI } from "@/store/ui";
import { useWishlist } from "@/store/wishlist";
import type { Product } from "@/types";

import { ColorSwatches, SizeSelector } from "./variant-selectors";

/** Lightweight product preview opened from a product card. */
export function QuickViewDialog() {
  const quickViewSlug = useUI((s) => s.quickViewSlug);
  const closeQuickView = useUI((s) => s.closeQuickView);
  const product = quickViewSlug ? getProduct(quickViewSlug) : undefined;

  if (!product) return null;

  return (
    <Dialog
      open={Boolean(quickViewSlug)}
      onOpenChange={(open) => !open && closeQuickView()}
    >
      <DialogContent className="max-w-4xl p-0">
        {/* Keyed so switching products remounts with fresh selections. */}
        <QuickViewContent key={product.slug} product={product} />
      </DialogContent>
    </Dialog>
  );
}

function QuickViewContent({ product }: { product: Product }) {
  const closeQuickView = useUI((s) => s.closeQuickView);
  const openCart = useUI((s) => s.openCart);
  const addItem = useCart((s) => s.addItem);
  const toggleWishlist = useWishlist((s) => s.toggle);
  const wishlisted = useWishlist(
    (s) => s.hydrated && s.slugs.includes(product.slug),
  );

  const [color, setColor] = useState(product.colors[0]?.name);
  const [size, setSize] = useState(product.sizes?.[0]);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);

  const soldOut = stockStatus(product) === "out-of-stock";
  const brand = getBrand(product.brand);

  const handleAdd = () => {
    addItem({ productId: product.slug, quantity, color, size });
    closeQuickView();
    toast.success("Added to your bag", {
      description: `${product.name} · ${quantity} item${quantity > 1 ? "s" : ""}`,
      action: { label: "View bag", onClick: openCart },
    });
  };

  return (
    <div className="grid gap-0 md:grid-cols-2">
      {/* Gallery */}
      <div className="bg-muted p-5">
        <div className="relative aspect-4/5 overflow-hidden rounded-xl bg-card">
          <Image
            src={product.images[activeImage]}
            alt={product.name}
            fill
            sizes="(min-width: 768px) 45vw, 90vw"
            className="object-cover"
          />
        </div>
        <div className="mt-3 flex gap-2">
          {product.images.slice(0, 4).map((image, index) => (
            <button
              key={image}
              type="button"
              onClick={() => setActiveImage(index)}
              aria-label={`View image ${index + 1}`}
              className={cn(
                "relative aspect-square w-16 overflow-hidden rounded-lg border-2 transition-colors",
                index === activeImage ? "border-accent" : "border-transparent",
              )}
            >
              <Image src={image} alt="" fill sizes="64px" className="object-cover" />
            </button>
          ))}
        </div>
      </div>

      {/* Details */}
      <div className="flex flex-col p-6 md:p-8">
        <p className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
          {brand?.name}
        </p>
        <DialogTitle className="mt-2 text-2xl leading-tight">
          {product.name}
        </DialogTitle>

        <Rating
          value={product.rating}
          count={product.reviewCount}
          className="mt-3"
          showValue
        />

        <Price
          value={product.price}
          compareAt={product.comparePrice}
          size="lg"
          showDiscount
          className="mt-4"
        />

        <p className="mt-4 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
          {product.description}
        </p>

        <div className="mt-6 space-y-5">
          <ColorSwatches colors={product.colors} value={color} onChange={setColor} />
          {product.sizes && (
            <SizeSelector sizes={product.sizes} value={size} onChange={setSize} />
          )}
        </div>

        <div className="mt-6 flex items-center gap-3">
          <QuantityStepper
            value={quantity}
            onChange={setQuantity}
            max={Math.max(1, product.stock)}
          />
          <span
            className={cn(
              "text-xs",
              soldOut
                ? "text-muted-foreground"
                : stockStatus(product) === "low-stock"
                  ? "text-warning"
                  : "text-success",
            )}
          >
            {stockLabel(product)}
          </span>
        </div>

        <div className="mt-6 flex gap-2">
          <Button size="lg" className="flex-1" onClick={handleAdd} disabled={soldOut}>
            <ShoppingBag className="size-4" />
            {soldOut ? "Sold out" : "Add to bag"}
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="w-13 px-0"
            onClick={() => toggleWishlist(product.slug)}
            aria-label={wishlisted ? "Remove from wishlist" : "Save to wishlist"}
            aria-pressed={wishlisted}
          >
            <Heart
              className={cn("size-4", wishlisted && "fill-destructive text-destructive")}
            />
          </Button>
        </div>

        <Link
          href={`/product/${product.slug}`}
          onClick={closeQuickView}
          className="group mt-5 inline-flex items-center gap-2 text-sm font-medium transition-colors hover:text-accent"
        >
          View full details
          <ArrowRight className="size-4 transition-transform duration-300 ease-luxe group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  );
}
