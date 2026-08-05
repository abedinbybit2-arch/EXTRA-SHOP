"use client";

import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Heart, Menu, Search, ShoppingBag } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { Logo } from "@/components/brand/logo";
import { ProfileMenu } from "@/components/account/profile-menu";
import { AnnouncementBar } from "./announcement-bar";
import { MegaMenuPanel, type MegaMenuKey } from "./mega-menu";
import { MobileMenu } from "./mobile-menu";
import { SearchDialog } from "./search-dialog";
import { ThemeToggle } from "./theme-toggle";
import { mainNav } from "@/lib/site";
import { cn } from "@/lib/utils";
import { useCart } from "@/store/cart";
import { useUI } from "@/store/ui";
import { useWishlist } from "@/store/wishlist";

/** Nav labels that open a mega-menu panel rather than navigating on hover. */
const MEGA_MENUS: Record<string, MegaMenuKey> = {
  Shop: "shop",
  Categories: "categories",
  Brands: "brands",
};

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [openMenu, setOpenMenu] = useState<MegaMenuKey | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const { openCart, setSearchOpen, setMobileMenuOpen } = useUI();

  const cartItems = useCart((s) => s.items);
  const cartHydrated = useCart((s) => s.hydrated);
  const wishlistSlugs = useWishlist((s) => s.slugs);
  const wishlistHydrated = useWishlist((s) => s.hydrated);

  const cartCount = cartHydrated
    ? cartItems.reduce((sum, line) => sum + line.quantity, 0)
    : 0;
  const wishlistCount = wishlistHydrated ? wishlistSlugs.length : 0;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    // Deferred to a frame so the initial sync happens outside the effect body.
    const frame = requestAnimationFrame(onScroll);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpenMenu(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  /** Small grace period so the pointer can travel from trigger to panel. */
  const scheduleClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpenMenu(null), 140);
  };
  const cancelClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  };

  return (
    <>
      <header className="sticky top-0 z-50">
        {/* The announcement strip retracts once the page is scrolled. */}
        <div
          className={cn(
            "overflow-hidden transition-[height] duration-500 ease-luxe",
            scrolled ? "h-0" : "h-9",
          )}
        >
          <AnnouncementBar />
        </div>

        <div
          onMouseLeave={scheduleClose}
          className={cn(
            "border-b transition-all duration-300 ease-luxe",
            scrolled
              ? "glass border-glass-border shadow-soft"
              : "border-transparent bg-background",
          )}
        >
          <div className="container-luxe flex h-16 items-center gap-3 lg:h-20 lg:gap-8">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open menu"
              className="-ml-2 grid size-10 shrink-0 place-items-center rounded-full text-foreground transition-colors hover:bg-secondary lg:hidden"
            >
              <Menu className="size-5" />
            </button>

            <Logo className="shrink-0" />

            <nav
              aria-label="Main"
              className="ml-2 hidden flex-1 items-center gap-1 lg:flex"
            >
              {mainNav.map((item) => {
                const megaKey = MEGA_MENUS[item.label];
                const active =
                  pathname === item.href || pathname.startsWith(`${item.href}/`);

                return (
                  <div
                    key={item.href}
                    onMouseEnter={() => {
                      cancelClose();
                      setOpenMenu(megaKey ?? null);
                    }}
                  >
                    <Link
                      href={item.href}
                      onFocus={() => setOpenMenu(megaKey ?? null)}
                      // Navigating away should always dismiss the panel.
                      onClick={() => setOpenMenu(null)}
                      aria-expanded={megaKey ? openMenu === megaKey : undefined}
                      className={cn(
                        "relative rounded-full px-3.5 py-2 text-sm transition-colors",
                        "after:absolute after:inset-x-3.5 after:bottom-1 after:h-px after:origin-left after:scale-x-0 after:bg-accent after:transition-transform after:duration-300 after:ease-luxe",
                        "hover:text-accent hover:after:scale-x-100",
                        active || openMenu === megaKey
                          ? "text-accent after:scale-x-100"
                          : "text-foreground",
                      )}
                    >
                      {item.label}
                    </Link>
                  </div>
                );
              })}
            </nav>

            <div className="ml-auto flex items-center gap-0.5 lg:gap-1">
              <button
                type="button"
                onClick={() => setSearchOpen(true)}
                aria-label="Search"
                className="grid size-10 place-items-center rounded-full text-foreground transition-colors hover:bg-secondary"
              >
                <Search className="size-[18px]" />
              </button>

              <ThemeToggle className="hidden sm:grid" />

              <Link
                href="/wishlist"
                aria-label={`Wishlist, ${wishlistCount} items`}
                className="relative hidden size-10 place-items-center rounded-full text-foreground transition-colors hover:bg-secondary sm:grid"
              >
                <Heart className="size-[18px]" />
                {wishlistCount > 0 && <CountBadge value={wishlistCount} />}
              </Link>

              <button
                type="button"
                onClick={openCart}
                aria-label={`Shopping bag, ${cartCount} items`}
                className="relative grid size-10 place-items-center rounded-full text-foreground transition-colors hover:bg-secondary"
              >
                <ShoppingBag className="size-[18px]" />
                {cartCount > 0 && <CountBadge value={cartCount} />}
              </button>

              <ProfileMenu />
            </div>
          </div>

          {/* Mega menu panel, anchored beneath the bar. */}
          <AnimatePresence>
            {openMenu && (
              <motion.div
                key={openMenu}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                onMouseEnter={cancelClose}
                className="absolute inset-x-0 top-full hidden border-b border-border bg-popover shadow-float lg:block"
              >
                <div className="container-luxe py-8">
                  <MegaMenuPanel
                    menu={openMenu}
                    onNavigate={() => setOpenMenu(null)}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>

      <MobileMenu />
      <SearchDialog />
    </>
  );
}

/** Small gold counter pinned to the corner of an icon button. */
function CountBadge({ value }: { value: number }) {
  return (
    <span className="absolute -right-0.5 -top-0.5 grid min-w-[18px] place-items-center rounded-full bg-accent px-1 text-[10px] font-semibold leading-[18px] text-accent-foreground">
      {value > 99 ? "99+" : value}
    </span>
  );
}
