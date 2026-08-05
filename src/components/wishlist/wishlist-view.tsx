"use client";

import { Heart, ShoppingBag, Trash2 } from "lucide-react";
import { toast } from "sonner";

import { EmptyState } from "@/components/common/empty-state";
import { ProductGrid } from "@/components/product/product-grid";
import { Button } from "@/components/ui/button";
import { ProductGridSkeleton } from "@/components/ui/skeleton";
import { getProducts, stockStatus } from "@/lib/catalog";
import { useCart } from "@/store/cart";
import { useUI } from "@/store/ui";
import { useWishlist } from "@/store/wishlist";

/** Saved items page with a bulk "add all" action. */
export function WishlistView() {
  const slugs = useWishlist((s) => s.slugs);
  const hydrated = useWishlist((s) => s.hydrated);
  const clear = useWishlist((s) => s.clear);
  const addItem = useCart((s) => s.addItem);
  const openCart = useUI((s) => s.openCart);

  if (!hydrated) return <ProductGridSkeleton count={4} />;

  const products = getProducts(slugs);

  if (products.length === 0) {
    return (
      <EmptyState
        icon={Heart}
        title="No saved pieces yet"
        description="Tap the heart on any product to keep it here. Your wishlist is stored on this device."
        action={{ label: "Browse the catalogue", href: "/shop" }}
        secondaryAction={{ label: "See what's new", href: "/new-arrivals" }}
      />
    );
  }

  const available = products.filter((p) => stockStatus(p) !== "out-of-stock");

  const addAll = () => {
    for (const product of available) {
      addItem({
        productId: product.slug,
        quantity: 1,
        color: product.colors[0]?.name,
        size: product.sizes?.[0],
      });
    }
    toast.success(`${available.length} items added to your bag`, {
      action: { label: "View bag", onClick: openCart },
    });
  };

  return (
    <>
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <p className="text-sm text-muted-foreground">
          <span className="font-medium text-foreground">{products.length}</span>{" "}
          saved {products.length === 1 ? "piece" : "pieces"}
        </p>

        <div className="flex flex-wrap items-center gap-2">
          <Button onClick={addAll} disabled={available.length === 0}>
            <ShoppingBag className="size-4" />
            Add all to bag
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              clear();
              toast.info("Wishlist cleared");
            }}
          >
            <Trash2 className="size-4" />
            Clear
          </Button>
        </div>
      </div>

      <ProductGrid products={products} priorityCount={4} />
    </>
  );
}
