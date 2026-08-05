import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";

import { BackToTop } from "@/components/common/back-to-top";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { MobileTabBar } from "@/components/layout/mobile-tab-bar";
import { CartDrawer } from "@/components/cart/cart-drawer";
import { AccountPanel } from "@/components/account/account-panel";
import { AuthDialog } from "@/components/account/auth-dialog";
import { SessionProvider } from "@/components/account/session-provider";
import { QuickViewDialog } from "@/components/product/quick-view-dialog";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { ToastProvider } from "@/components/providers/toast-provider";
import { heroSlides } from "@/data/content";
import { siteConfig } from "@/lib/site";

import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

/** Editorial serif used for every display heading. */
const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — ${siteConfig.tagline}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  keywords: [
    "luxury e-commerce",
    "designer watches",
    "niche fragrance",
    "leather goods",
    "fine jewellery",
    "premium audio",
    "ABEDIN SHOP",
  ],
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
    images: [
      {
        url: heroSlides[0].image,
        width: 1800,
        height: 1000,
        alt: `${siteConfig.name} — ${siteConfig.tagline}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
    images: [heroSlides[0].image],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#faf8f5" },
    { media: "(prefers-color-scheme: dark)", color: "#0b0a09" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${cormorant.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-background text-foreground">
        <ThemeProvider>
          {/* Keyboard users can jump the header and mega menu entirely. */}
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-primary focus:px-5 focus:py-3 focus:text-sm focus:text-primary-foreground focus:shadow-float"
          >
            Skip to content
          </a>
          <Header />
          {/* Bottom padding clears the mobile tab bar on small screens. */}
          <main id="main" className="flex-1 pb-20 lg:pb-0">
            {children}
          </main>
          <Footer />
          <MobileTabBar />
          <CartDrawer />
          <QuickViewDialog />
          <BackToTop />
          <ToastProvider />
          {/* Account layer: guest session, auth dialogs and the profile panel. */}
          <SessionProvider />
          <AuthDialog />
          <AccountPanel />
        </ThemeProvider>
      </body>
    </html>
  );
}
