import type { Metadata } from "next";

import { LegalLayout, type LegalSection } from "@/components/legal/legal-layout";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description:
    "The terms governing purchases, delivery, returns and warranty at ABEDIN SHOP.",
};

const sections: LegalSection[] = [
  {
    id: "these-terms",
    title: "About these terms",
    paragraphs: [
      "These terms apply to every order placed through ABEDIN SHOP. By completing a purchase you accept them. We may revise them from time to time; the version in force is the one published when your order was placed.",
    ],
  },
  {
    id: "orders",
    title: "Orders and acceptance",
    paragraphs: [
      "An order is an offer to buy. A contract forms only when we send a dispatch confirmation. Until then we may decline an order — for example where an item has sold out, where a price has been listed in error, or where we cannot complete address verification.",
      "Where a pricing error is obvious and the mistake could reasonably have been recognised, we are not obliged to supply at the incorrect price. We will contact you and offer to proceed at the correct price or cancel and refund in full.",
    ],
  },
  {
    id: "pricing",
    title: "Pricing, taxes and duties",
    paragraphs: [
      "Prices display in your local currency and include applicable sales tax. For most destinations, duties and import taxes are calculated and collected at checkout, so there is nothing further to pay on delivery. Where a territory does not permit this, you will be told clearly at checkout and the carrier will bill you on arrival.",
      "Promotional codes cannot be combined unless expressly stated, and cannot be applied retrospectively to a completed order.",
    ],
  },
  {
    id: "delivery",
    title: "Delivery",
    paragraphs: [
      "Orders placed before 2pm EST are dispatched the same working day. Express delivery is two to four working days worldwide; standard is five to nine. Delivery estimates are estimates and are not guaranteed dates.",
      "Risk passes to you on delivery. Where a signature is required and no one is available, the carrier will attempt redelivery before returning the parcel to us.",
    ],
  },
  {
    id: "returns",
    title: "Returns and cancellation",
    paragraphs: [
      "You may return any item within sixty days of delivery, which is twice the statutory minimum. Items must be unworn and complete with the house documentation. We pay return postage in every country we ship to.",
      "Refunds are issued when the carrier first scans the parcel into the network rather than on receipt at our warehouse, so you are not waiting on transit time. Refunds are returned to the original payment method.",
      "Made-to-order, engraved and personalised pieces are excluded from the returns policy except where faulty, and this is stated on the product page before purchase.",
    ],
  },
  {
    id: "warranty",
    title: "Warranty and repairs",
    paragraphs: [
      "Every piece carries a two-year international warranty against manufacturing defect. The warranty does not cover fair wear and tear, accidental damage, or work carried out by a third party.",
      "Lifetime repairs are offered on everything we sell and are routed back to the original atelier. Repairs outside warranty are charged at cost with no handling margin.",
    ],
  },
  {
    id: "liability",
    title: "Liability",
    paragraphs: [
      "Nothing in these terms limits liability for death or personal injury caused by negligence, for fraud, or for any other liability that cannot lawfully be limited. Subject to that, our total liability in connection with an order is limited to the amount you paid for it.",
      "We are not liable for delays outside our reasonable control, including carrier disruption, customs inspection or extreme weather, but we will keep you informed and will not charge you for a delay we caused.",
    ],
  },
  {
    id: "intellectual-property",
    title: "Intellectual property",
    paragraphs: [
      "All site content — text, photography, layout and the ABEDIN SHOP name and marks — remains our property or that of our licensors. You may not reproduce it commercially without written permission.",
    ],
  },
  {
    id: "governing-law",
    title: "Governing law",
    paragraphs: [
      "These terms are governed by the laws of the State of New York. Consumers retain the benefit of any mandatory protections available under the law of their country of residence.",
    ],
  },
];

export default function TermsPage() {
  return (
    <LegalLayout
      eyebrow="Legal"
      title="Terms & Conditions"
      intro="The terms that govern buying from ABEDIN SHOP — ordering, pricing, delivery, returns, warranty and liability."
      updated="5 February 2026"
      sections={sections}
    />
  );
}
