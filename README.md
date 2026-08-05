<div align="center">

# ABEDIN SHOP

**Objects of lasting desire**

A premium, frontend-only e-commerce storefront built with Next.js 16, React 19, TypeScript and Tailwind CSS v4.

[**abedin.shop →**](https://abedin.shop/)

</div>

---

## Overview

ABEDIN SHOP is a complete luxury retail storefront — 20 routes, 62 products across nine departments, and twelve house brands. It is deliberately **frontend only**: there is no backend, no database, and no authentication. Cart, wishlist and browsing history persist in the browser's own `localStorage`, so the entire site deploys as a static export to any static host.

The design brief was to avoid looking like a marketplace template. The result is an editorial, warm-ivory-and-ink palette with a single champagne-gold accent, a display serif for headings, and motion used sparingly enough to still register.

### What's implemented

| Area | Details |
|---|---|
| **Pages** | Home, Shop, Categories (index + 9 department pages), Product Details (62), Search, Wishlist, Cart, Checkout, Offers, New Arrivals, Best Sellers, Flash Deals, Brands (index + 12 brand pages), FAQ, Contact, About, Privacy Policy, Terms, 404 |
| **Commerce UI** | Advanced faceted filtering, sorting, pagination, grid/list toggle, cart drawer, coupon codes, order summary, multi-step checkout, order confirmation |
| **Product page** | Multi-image gallery with cursor-tracked zoom and lightbox, colour/size variants, quantity stepper, tabbed specifications, reviews with rating distribution, related products, recently viewed |
| **UX** | Sticky glass navbar, mega menu, `⌘K` search with live suggestions, breadcrumbs, skeleton loading, empty states, toast notifications, back-to-top, mobile bottom navigation, scroll-reveal animations |
| **Theming** | Full light and dark mode via CSS custom properties, with no flash on load |
| **SEO** | Per-page metadata, Open Graph and Twitter cards, JSON-LD product and FAQ structured data, generated `sitemap.xml` and `robots.txt` |
| **Accessibility** | Skip link, focus-visible rings, ARIA labelling on interactive controls, keyboard-navigable menus and dialogs, `prefers-reduced-motion` support |

---

## Tech stack

| Purpose | Choice |
|---|---|
| Framework | **Next.js 16** (App Router, Turbopack, static export) |
| Language | **TypeScript 5** (strict) |
| UI runtime | **React 19** |
| Styling | **Tailwind CSS v4** with a CSS-variable design-token system |
| Components | **Radix UI** primitives, styled in the shadcn/ui pattern |
| Animation | **Motion** (Framer Motion) + `tw-animate-css` |
| State | **Zustand** with `localStorage` persistence |
| Icons | **Lucide** |
| Carousels | **Embla Carousel** |
| Notifications | **Sonner** |

No component library is pulled in wholesale — Radix supplies only the accessible behaviour (focus trapping, roving tabindex, dismissal), and every visual layer is written for this project.

---

## Getting started

**Prerequisites:** Node.js 20.9+ and npm.

```bash
# 1. Clone
git clone https://github.com/abedinbybit2-arch/ABEDIN-SHOP.git
cd ABEDIN-SHOP

# 2. Install
npm install

# 3. Run the dev server
npm run dev
```

Open <http://localhost:3000>.

### Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the development server |
| `npm run build` | Produce the static export in `out/` |
| `npm run lint` | Run ESLint over `src/` |
| `npm run typecheck` | Type-check without emitting |
| `npm run preview` | Build, then serve `out/` locally on port 4000 |

### Building for a subpath

Production is served from the root of `abedin.shop`, so no base path is needed.
If you host the export from a subdirectory instead, inject the prefix at build
time:

```bash
NEXT_PUBLIC_BASE_PATH=/my-subdir npm run build
```

---

## Project structure

```
abedin-shop/
├── public/                        # Static assets
├── next.config.ts                 # Static export, basePath, unoptimized images
└── src/
    ├── app/                       # App Router: one folder per route
    │   ├── layout.tsx             # Root layout, fonts, providers, chrome
    │   ├── page.tsx               # Homepage
    │   ├── globals.css            # Design tokens, themes, utilities
    │   ├── icon.svg               # Brand favicon
    │   ├── sitemap.ts robots.ts   # Generated SEO files
    │   ├── not-found.tsx          # 404
    │   ├── shop/ search/ cart/ checkout/ wishlist/
    │   ├── categories/[slug]/  brands/[slug]/  product/[slug]/
    │   └── offers/ new-arrivals/ best-sellers/ flash-deals/
    │       about/ contact/ faq/ privacy-policy/ terms/
    │
    ├── components/
    │   ├── ui/                    # Primitives (button, dialog, sheet, tabs…)
    │   ├── layout/                # Header, mega menu, search, footer, tab bar
    │   ├── home/                  # Homepage sections
    │   ├── product/               # Card, grid, carousel, gallery, buy box
    │   ├── shop/                  # Filters, sorting, pagination, results
    │   ├── cart/ checkout/ wishlist/ contact/ legal/
    │   ├── common/                # Reveal, breadcrumb, price, empty state…
    │   ├── brand/                 # Logo and mark
    │   └── providers/             # Theme and toast providers
    │
    ├── data/                      # Dummy catalogue (no backend)
    │   ├── products/              # One authored file per department
    │   ├── images.ts              # Curated, verified photography pool
    │   └── categories.ts brands.ts reviews.ts content.ts
    │
    ├── lib/                       # Catalogue queries, cart totals, utils, icons
    ├── store/                     # Zustand: cart, wishlist, recently viewed, ui
    ├── hooks/                     # useMounted
    └── types/                     # Shared domain types
```

### Architectural notes

- **Data is authored, then derived.** Each product is written as an editorial *seed* (name, copy, price, specs); ids, slugs and image galleries are generated by a builder, so they can never drift out of sync. See `src/data/products/shared.ts`.
- **Filtering runs in the browser.** With no server to query, `ShopView` reads the URL via `useSearchParams` inside a `Suspense` boundary — which is also what supplies the skeleton loading state.
- **Persistence is hydration-safe.** Every store exposes a `hydrated` flag, so counters and lists render empty until `localStorage` has been read and the static HTML always agrees with the first client render.
- **Photography is verified, not assumed.** Every image in `src/data/images.ts` was checked to resolve and reviewed visually, so products are never paired with mismatched shots. Frames showing real-world brand marks were excluded — the twelve houses are fictional, so borrowed logos would undercut the identity.

---

## Deployment

The site is served from a **single canonical origin**, [abedin.shop](https://abedin.shop/),
hosted on Vercel. Deploy with:

```bash
vercel --prod
```

Vercel's generated `*.vercel.app` deployment URLs are deliberately not public:
the project uses Deployment Protection (`all_except_custom_domains`), so those
URLs require authentication while the custom domain stays open. This keeps one
indexable copy of the site and avoids duplicate content.

> A GitHub Pages mirror previously ran from `.github/workflows/deploy.yml`. It
> was retired in favour of the custom domain; the workflow remains in git
> history if it is ever needed again.

### Custom domain

`abedin.shop` is registered at Hostinger, with DNS still managed there rather
than delegated to Vercel:

| Record | Name | Value |
|---|---|---|
| `A` | `@` | `76.76.21.21` |
| `CNAME` | `www` | `cname.vercel-dns.com.` |

`www.abedin.shop` is configured in Vercel to issue a permanent (308) redirect to
the apex, so the site has exactly one canonical hostname. TLS is provisioned
automatically by Vercel through Let's Encrypt.

### Environment variables

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_BASE_PATH` | Path prefix when served from a subdirectory. Leave unset for a domain root. |
| `NEXT_PUBLIC_SITE_URL` | Canonical origin for `metadataBase`, Open Graph tags, `sitemap.xml` and `robots.txt`. Set to `https://abedin.shop` in production. |
| `NEXT_PUBLIC_FIREBASE_*` | Firebase web config — see `.env.example`. Omit them and the storefront runs exactly as before on `localStorage` alone, with the account features hidden. |

All are read at **build time**, so changing any of them requires a rebuild.

To deploy anywhere else, run `npm run build` and serve the resulting `out/` directory from any static host (Netlify, Cloudflare Pages, S3, nginx).

---

## Accounts and data (Firebase)

The storefront itself is still static and backendless. Accounts are the one
exception: they run on Firebase **Authentication** and **Cloud Firestore** only,
on the free Spark plan.

### How sessions work

| | Guest | Registered |
|---|---|---|
| Identity | Firebase anonymous uid | Firebase uid from email + password |
| Document | `guests/{guestId}` | `users/{uid}` |
| Orders | `guests/{guestId}/orders/{ref}` | `users/{uid}/orders/{ref}` |
| Survives restart | yes, until site data is cleared | yes, across devices |

Guests are signed in **anonymously** rather than given a client-generated id.
That is a security decision, not a convenience one: a purely local id would
force the `guests` collection to be world-readable and world-writable for the
feature to function, letting anyone read or edit another visitor's cart and
orders. With an anonymous uid, rules reduce to `request.auth.uid == guestId`.

### Rules

`firestore.rules` denies everything by default. A document is reachable only by
the uid that owns it, orders are create-only so a placed order can never be
altered, and carts are validated as a bounded list. Deploy them with:

```bash
npx firebase-tools deploy --only firestore:rules
```

### First-time project setup

Everything except one step can be scripted. In the Firebase console, open
**Authentication → Get started** and enable **Email/Password** and
**Anonymous** — on the Spark plan this cannot be done through the API, because
the programmatic route (`identityPlatform:initializeAuth`) requires billing.
Then add your production hostname under **Authentication → Settings →
Authorized domains**.

---

## Notes and limitations

This is a **UI demonstration**, and it says so throughout the interface:

- No orders are placed, no payments processed, and no data leaves your browser.
- Product data, brands, reviews and testimonials are fictional.
- Newsletter and contact forms validate input and show feedback, but transmit nothing.
- Legal pages contain illustrative sample copy, not legal advice.

Photography is from [Unsplash](https://unsplash.com) under the Unsplash License.

---

## Licence

Released under the [MIT Licence](LICENSE).
