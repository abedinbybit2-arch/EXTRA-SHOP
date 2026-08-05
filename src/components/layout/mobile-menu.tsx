"use client";

import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

import { Logo } from "@/components/brand/logo";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Sheet, SheetBody, SheetContent, SheetHeader } from "@/components/ui/sheet";
import { brands } from "@/data/brands";
import { categories } from "@/data/categories";
import { mainNav } from "@/lib/site";
import { getIcon } from "@/lib/icons";
import { useUI } from "@/store/ui";

import { ThemeToggle } from "./theme-toggle";

/** Utility links surfaced below the main navigation on mobile. */
const SECONDARY_LINKS = [
  { label: "About Us", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "FAQ", href: "/faq" },
  { label: "Offers", href: "/offers" },
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms", href: "/terms" },
];

/** Slide-in navigation for small screens. */
export function MobileMenu() {
  const { mobileMenuOpen, setMobileMenuOpen } = useUI();
  const pathname = usePathname();

  // Close automatically once navigation completes.
  useEffect(() => setMobileMenuOpen(false), [pathname, setMobileMenuOpen]);

  const close = () => setMobileMenuOpen(false);

  return (
    <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
      <SheetContent side="left" className="lg:hidden">
        <SheetHeader className="flex items-center justify-between">
          <Logo />
        </SheetHeader>

        <SheetBody className="px-4">
          <nav aria-label="Mobile">
            <ul className="mb-2">
              {mainNav
                .filter((item) => !["Categories", "Brands"].includes(item.label))
                .map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={close}
                      className="flex items-center justify-between rounded-xl px-2 py-3.5 text-base font-medium transition-colors hover:bg-secondary"
                    >
                      {item.label}
                      <ChevronRight className="size-4 text-muted-foreground" />
                    </Link>
                  </li>
                ))}
            </ul>

            <Accordion type="multiple" className="px-2">
              <AccordionItem value="categories">
                <AccordionTrigger className="py-3.5 text-base">
                  Categories
                </AccordionTrigger>
                <AccordionContent className="pr-0">
                  <ul className="space-y-0.5 pb-1">
                    {categories.map((category) => {
                      const Icon = getIcon(category.icon);
                      return (
                        <li key={category.slug}>
                          <Link
                            href={`/categories/${category.slug}`}
                            onClick={close}
                            className="flex items-center gap-3 rounded-lg px-2 py-2.5 text-sm text-foreground transition-colors hover:bg-secondary"
                          >
                            <Icon className="size-4 text-accent" />
                            {category.name}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="brands">
                <AccordionTrigger className="py-3.5 text-base">Brands</AccordionTrigger>
                <AccordionContent className="pr-0">
                  <ul className="space-y-0.5 pb-1">
                    {brands.map((brand) => (
                      <li key={brand.slug}>
                        <Link
                          href={`/brands/${brand.slug}`}
                          onClick={close}
                          className="flex items-center gap-3 rounded-lg px-2 py-2.5 text-sm transition-colors hover:bg-secondary"
                        >
                          <span className="grid size-7 shrink-0 place-items-center rounded-full border border-border font-display text-[10px] text-accent">
                            {brand.monogram}
                          </span>
                          {brand.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </nav>

          <div className="mt-6 border-t border-border pt-5">
            <ul className="grid grid-cols-2 gap-x-4 gap-y-1">
              {SECONDARY_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={close}
                    className="block py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-6 flex items-center justify-between border-t border-border pt-5">
            <span className="text-sm text-muted-foreground">Appearance</span>
            <ThemeToggle />
          </div>
        </SheetBody>
      </SheetContent>
    </Sheet>
  );
}
