<div align="center">

# EXTRA SHOP

**Objects of lasting desire**

A premium, frontend-only e-commerce storefront built with Next.js 16, React 19, TypeScript and Tailwind CSS v4.

[**Live on Vercel →**](https://extra-shop-omega.vercel.app/) &nbsp;·&nbsp; [**Live on GitHub Pages →**](https://abedinbybit2-arch.github.io/EXTRA-SHOP/)

</div>

---

## Overview

EXTRA SHOP is a complete luxury retail storefront — 20 routes, 62 products across nine departments, and twelve house brands. It is deliberately **frontend only**: there is no backend, no database, and no authentication. Cart, wishlist and browsing history persist in the browser's own `localStorage`, so the entire site deploys as a static export to any static host.

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
git clone https://github.com/abedinbybit2-arch/EXTRA-SHOP.git
cd EXTRA-SHOP

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

GitHub Pages serves this project from `/EXTRA-SHOP`, so the base path is injected at build time:

```bash
NEXT_PUBLIC_BASE_PATH=/EXTRA-SHOP npm run build
```

Omit the variable to build for a domain root.

---

## Project structure

```
extra-shop/
├── .github/workflows/deploy.yml   # CI: lint, build, deploy to Pages
├── public/                        # Static assets (+ .nojekyll for Pages)
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

The same source deploys to two hosts, which differ only in configuration:

| | GitHub Pages | Vercel |
|---|---|---|
| URL | [abedinbybit2-arch.github.io/EXTRA-SHOP](https://abedinbybit2-arch.github.io/EXTRA-SHOP/) | [extra-shop-omega.vercel.app](https://extra-shop-omega.vercel.app/) |
| Served from | project subpath | domain root |
| `NEXT_PUBLIC_BASE_PATH` | `/EXTRA-SHOP` | *(unset)* |
| `NEXT_PUBLIC_SITE_URL` | the Pages URL | the Vercel URL |
| Trigger | `.github/workflows/deploy.yml` on push to `main` | `vercel --prod` |

### Environment variables

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_BASE_PATH` | Path prefix when served from a subdirectory. Leave unset for a domain root. |
| `NEXT_PUBLIC_SITE_URL` | Canonical origin for `metadataBase`, Open Graph tags, `sitemap.xml` and `robots.txt`. Defaults to the GitHub Pages URL. |

Both are read at **build time**, so changing either requires a rebuild.

To deploy anywhere else, run `npm run build` and serve the resulting `out/` directory from any static host (Netlify, Cloudflare Pages, S3, nginx).

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
