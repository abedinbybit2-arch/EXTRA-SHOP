import type { Metadata } from "next";

import { CartView } from "@/components/cart/cart-view";
import { PageHeader } from "@/components/common/page-header";

export const metadata: Metadata = {
  title: "Shopping bag",
  description: "Review the pieces in your ABEDIN SHOP bag before checkout.",
  robots: { index: false, follow: true },
};

export default function CartPage() {
  return (
    <>
      <PageHeader
        eyebrow="Your selection"
        title="Shopping bag"
        crumbs={[{ label: "Home", href: "/" }, { label: "Bag" }]}
      />
      <div className="container-luxe py-12 lg:py-16">
        <CartView />
      </div>
    </>
  );
}
