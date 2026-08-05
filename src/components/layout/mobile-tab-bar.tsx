"use client";

import { Heart, Home, Search, ShoppingBag, Store } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { useCart } from "@/store/cart";
import { useUI } from "@/store/ui";
import { useWishlist } from "@/store/wishlist";

/** Persistent bottom navigation on small screens. */
export function MobileTabBar() {
  const pathname = usePathname();
  const { openCart, setSearchOpen } = useUI();

  const cartItems = useCart((s) => s.items);
  const cartHydrated = useCart((s) => s.hydrated);
  const wishlistSlugs = useWishlist((s) => s.slugs);
  const wishlistHydrated = useWishlist((s) => s.hydrated);

  const cartCount = cartHydrated
    ? cartItems.reduce((sum, line) => sum + line.quantity, 0)
    : 0;
  const wishlistCount = wishlistHydrated ? wishlistSlugs.length : 0;

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <nav
      aria-label="Primary mobile"
      className="glass fixed inset-x-0 bottom-0 z-40 border-t pb-[env(safe-area-inset-bottom)] lg:hidden"
    >
      <ul className="grid grid-cols-5">
        <TabLink href="/" icon={Home} label="Home" active={isActive("/")} />
        <TabLink href="/shop" icon={Store} label="Shop" active={isActive("/shop")} />

        <li>
          <button
            type="button"
            onClick={() => setSearchOpen(true)}
            className="flex w-full flex-col items-center gap-1 py-2.5 text-muted-foreground transition-colors hover:text-foreground"
          >
            <Search className="size-5" />
            <span className="text-[10px] tracking-wide">Search</span>
          </button>
        </li>

        <TabLink
          href="/wishlist"
          icon={Heart}
          label="Saved"
          active={isActive("/wishlist")}
          count={wishlistCount}
        />

        <li>
          <button
            type="button"
            onClick={openCart}
            className="relative flex w-full flex-col items-center gap-1 py-2.5 text-muted-foreground transition-colors hover:text-foreground"
          >
            <span className="relative">
              <ShoppingBag className="size-5" />
              {cartCount > 0 && <TabCount value={cartCount} />}
            </span>
            <span className="text-[10px] tracking-wide">Bag</span>
          </button>
        </li>
      </ul>
    </nav>
  );
}

function TabLink({
  href,
  icon: Icon,
  label,
  active,
  count = 0,
}: {
  href: string;
  icon: typeof Home;
  label: string;
  active: boolean;
  count?: number;
}) {
  return (
    <li>
      <Link
        href={href}
        aria-current={active ? "page" : undefined}
        className={cn(
          "flex flex-col items-center gap-1 py-2.5 transition-colors",
          active ? "text-accent" : "text-muted-foreground hover:text-foreground",
        )}
      >
        <span className="relative">
          <Icon className="size-5" />
          {count > 0 && <TabCount value={count} />}
        </span>
        <span className="text-[10px] tracking-wide">{label}</span>
      </Link>
    </li>
  );
}

function TabCount({ value }: { value: number }) {
  return (
    <span className="absolute -right-2 -top-1.5 grid min-w-[16px] place-items-center rounded-full bg-accent px-1 text-[9px] font-semibold leading-4 text-accent-foreground">
      {value > 9 ? "9+" : value}
    </span>
  );
}
