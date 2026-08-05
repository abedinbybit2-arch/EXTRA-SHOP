import type { Metadata } from "next";

import { PageHeader } from "@/components/common/page-header";
import { WishlistView } from "@/components/wishlist/wishlist-view";

export const metadata: Metadata = {
  title: "Wishlist",
  description: "The pieces you've saved from the EXTRA SHOP catalogue.",
  robots: { index: false, follow: true },
};

export default function WishlistPage() {
  return (
    <>
      <PageHeader
        eyebrow="Saved for later"
        title="Your wishlist"
        description="Saved pieces are kept on this device. Nothing is reserved — limited editions may sell out."
        crumbs={[{ label: "Home", href: "/" }, { label: "Wishlist" }]}
      />
      <div className="container-luxe py-12 lg:py-16">
        <WishlistView />
      </div>
    </>
  );
}
