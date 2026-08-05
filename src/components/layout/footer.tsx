"use client";

import { ArrowRight, Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";

import { Logo } from "@/components/brand/logo";
import { Input } from "@/components/ui/input";
import { footerNav, siteConfig } from "@/lib/site";

const PAYMENT_METHODS = ["Visa", "Mastercard", "Amex", "PayPal", "Apple Pay"];

export function Footer() {
  const [email, setEmail] = useState("");

  const subscribe = (event: React.FormEvent) => {
    event.preventDefault();
    if (!email.includes("@")) {
      toast.error("Enter a valid email address");
      return;
    }
    toast.success("You're on the list", {
      description: "Look out for the next Atelier dispatch.",
    });
    setEmail("");
  };

  return (
    <footer className="mt-24 border-t border-border bg-secondary/40">
      <div className="container-luxe py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_2fr]">
          {/* Brand & newsletter */}
          <div className="max-w-md">
            <Logo />
            <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
              {siteConfig.description}
            </p>

            <form onSubmit={subscribe} className="mt-8">
              <label
                htmlFor="footer-email"
                className="mb-2.5 block text-[11px] uppercase tracking-[0.18em] text-muted-foreground"
              >
                The Atelier dispatch
              </label>
              <div className="flex gap-2">
                <Input
                  id="footer-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  autoComplete="email"
                  className="h-11"
                />
                <button
                  type="submit"
                  aria-label="Subscribe to the newsletter"
                  className="grid size-11 shrink-0 place-items-center rounded-xl bg-primary text-primary-foreground transition-all duration-300 ease-luxe hover:shadow-lift"
                >
                  <ArrowRight className="size-4" />
                </button>
              </div>
              <p className="mt-2.5 text-xs text-muted-foreground">
                One dispatch a month. Unsubscribe in a click.
              </p>
            </form>
          </div>

          {/* Link columns & contact */}
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {footerNav.map((group) => (
              <nav key={group.title} aria-label={group.title}>
                <h3 className="mb-4 font-sans text-[11px] font-semibold uppercase tracking-[0.18em] text-foreground">
                  {group.title}
                </h3>
                <ul className="space-y-2.5">
                  {group.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm text-muted-foreground transition-colors hover:text-accent"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}

            <div>
              <h3 className="mb-4 font-sans text-[11px] font-semibold uppercase tracking-[0.18em] text-foreground">
                Concierge
              </h3>
              <ul className="space-y-3.5 text-sm text-muted-foreground">
                <li className="flex gap-2.5">
                  <MapPin className="mt-0.5 size-4 shrink-0 text-accent" />
                  <span>{siteConfig.contact.address}</span>
                </li>
                <li className="flex gap-2.5">
                  <Phone className="mt-0.5 size-4 shrink-0 text-accent" />
                  <a
                    href={`tel:${siteConfig.contact.phone.replace(/[^+\d]/g, "")}`}
                    className="transition-colors hover:text-accent"
                  >
                    {siteConfig.contact.phone}
                  </a>
                </li>
                <li className="flex gap-2.5">
                  <Mail className="mt-0.5 size-4 shrink-0 text-accent" />
                  <a
                    href={`mailto:${siteConfig.contact.email}`}
                    className="break-all transition-colors hover:text-accent"
                  >
                    {siteConfig.contact.email}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 flex flex-col gap-6 border-t border-border pt-8 md:flex-row md:items-center md:justify-between">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} {siteConfig.name}. A frontend
            demonstration project — no real transactions are processed.
          </p>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            <ul className="flex items-center gap-4">
              {siteConfig.social.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-muted-foreground transition-colors hover:text-accent"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>

            <ul className="flex items-center gap-2" aria-label="Accepted payment methods">
              {PAYMENT_METHODS.map((method) => (
                <li
                  key={method}
                  className="rounded-md border border-border px-2 py-1 text-[9px] uppercase tracking-wider text-muted-foreground"
                >
                  {method}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
