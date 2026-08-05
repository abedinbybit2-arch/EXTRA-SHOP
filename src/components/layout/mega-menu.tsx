"use client";

import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Price } from "@/components/common/price";
import { brands } from "@/data/brands";
import { categories } from "@/data/categories";
import { collections } from "@/data/content";
import { newArrivals, trending } from "@/lib/catalog";
import { getIcon } from "@/lib/icons";

export type MegaMenuKey = "shop" | "categories" | "brands";

const SHOP_LINKS = [
  {
    title: "Edits",
    links: [
      { label: "All products", href: "/shop" },
      { label: "New arrivals", href: "/new-arrivals" },
      { label: "Best sellers", href: "/best-sellers" },
      { label: "Trending now", href: "/shop?sort=rating" },
    ],
  },
  {
    title: "Offers",
    links: [
      { label: "Flash deals", href: "/flash-deals" },
      { label: "All offers", href: "/offers" },
      { label: "Under $500", href: "/shop?max=500" },
      { label: "Last few pieces", href: "/shop?stock=low" },
    ],
  },
];

/** Panel contents for each top-level menu. */
export function MegaMenuPanel({
  menu,
  onNavigate,
}: {
  menu: MegaMenuKey;
  onNavigate: () => void;
}) {
  if (menu === "categories") {
    return (
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => {
          const Icon = getIcon(category.icon);
          return (
            <Link
              key={category.slug}
              href={`/categories/${category.slug}`}
              onClick={onNavigate}
              className="group flex items-center gap-4 rounded-2xl p-3 transition-colors hover:bg-secondary"
            >
              <span className="relative size-16 shrink-0 overflow-hidden rounded-xl">
                <Image
                  src={category.image}
                  alt=""
                  fill
                  sizes="64px"
                  className="object-cover transition-transform duration-700 ease-luxe group-hover:scale-105"
                />
              </span>
              <span className="min-w-0">
                <span className="flex items-center gap-2 text-sm font-medium">
                  <Icon className="size-4 text-accent" />
                  {category.name}
                </span>
                <span className="mt-1 block truncate text-xs text-muted-foreground">
                  {category.tagline}
                </span>
              </span>
            </Link>
          );
        })}
      </div>
    );
  }

  if (menu === "brands") {
    return (
      <div className="grid gap-8 lg:grid-cols-[1.6fr_1fr]">
        <div className="grid gap-1 sm:grid-cols-2 lg:grid-cols-3">
          {brands.map((brand) => (
            <Link
              key={brand.slug}
              href={`/brands/${brand.slug}`}
              onClick={onNavigate}
              className="group flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors hover:bg-secondary"
            >
              <span className="grid size-9 shrink-0 place-items-center rounded-full border border-border font-display text-[11px] tracking-wider text-accent">
                {brand.monogram}
              </span>
              <span className="min-w-0">
                <span className="block truncate text-sm font-medium">{brand.name}</span>
                <span className="block truncate text-[11px] text-muted-foreground">
                  {brand.origin}
                </span>
              </span>
            </Link>
          ))}
        </div>

        <Link
          href="/brands"
          onClick={onNavigate}
          className="group relative hidden overflow-hidden rounded-2xl lg:block"
        >
          <Image
            src={collections[1].image}
            alt=""
            fill
            sizes="320px"
            className="object-cover transition-transform duration-700 ease-luxe group-hover:scale-105"
          />
          <span className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
          <span className="absolute inset-x-0 bottom-0 p-5 text-white">
            <span className="block font-display text-xl">Twelve houses</span>
            <span className="mt-1 flex items-center gap-1.5 text-xs opacity-90">
              Meet the makers <ArrowRight className="size-3.5" />
            </span>
          </span>
        </Link>
      </div>
    );
  }

  // Default: the "Shop" menu — link columns plus two featured products.
  const featured = [...trending(1), ...newArrivals(1)];

  return (
    <div className="grid gap-10 lg:grid-cols-[1fr_1fr_1.4fr]">
      {SHOP_LINKS.map((group) => (
        <div key={group.title}>
          <p className="mb-4 text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
            {group.title}
          </p>
          <ul className="space-y-1">
            {group.links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={onNavigate}
                  className="group flex items-center gap-2 py-1.5 text-sm transition-colors hover:text-accent"
                >
                  {link.label}
                  <ArrowRight className="size-3.5 -translate-x-1 opacity-0 transition-all duration-300 ease-luxe group-hover:translate-x-0 group-hover:opacity-100" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}

      <div>
        <p className="mb-4 text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
          Featured
        </p>
        <div className="grid grid-cols-2 gap-4">
          {featured.map((product) => (
            <Link
              key={product.slug}
              href={`/product/${product.slug}`}
              onClick={onNavigate}
              className="group"
            >
              <span className="relative block aspect-4/5 overflow-hidden rounded-xl bg-muted">
                <Image
                  src={product.images[0]}
                  alt=""
                  fill
                  sizes="200px"
                  className="object-cover transition-transform duration-700 ease-luxe group-hover:scale-105"
                />
              </span>
              <span className="mt-2.5 block truncate text-sm font-medium">
                {product.name}
              </span>
              <Price
                value={product.price}
                compareAt={product.comparePrice}
                size="sm"
                className="mt-0.5"
              />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
