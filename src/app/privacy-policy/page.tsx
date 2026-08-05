import type { Metadata } from "next";

import { LegalLayout, type LegalSection } from "@/components/legal/legal-layout";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How ABEDIN SHOP collects, uses, stores and protects personal information.",
};

const sections: LegalSection[] = [
  {
    id: "information-we-collect",
    title: "Information we collect",
    paragraphs: [
      "We collect only what is needed to fulfil an order and improve the storefront: your name, delivery and billing address, email address, telephone number and order history. Payment card details are tokenised by our payment processor and never reach our servers.",
      "We also record standard technical information — browser type, device category, referring page and approximate region derived from your IP address — to diagnose faults and understand which parts of the catalogue are useful.",
    ],
  },
  {
    id: "how-we-use-it",
    title: "How we use your information",
    paragraphs: [
      "Order information is used to process, pack, ship and support your purchase, and to handle returns, exchanges and repairs. We will contact you about an order without asking for separate consent, because that communication is necessary to perform the contract.",
      "Marketing email is sent only where you have opted in, and every message carries a one-click unsubscribe. We do not sell, rent or share your personal information with third parties for their own marketing purposes.",
    ],
  },
  {
    id: "cookies",
    title: "Cookies and local storage",
    paragraphs: [
      "Essential cookies keep your session and bag intact between visits. Your shopping bag, wishlist and recently viewed history are stored in your browser's local storage on your own device — they are never transmitted to us.",
      "Analytics cookies are set only after you accept them. Declining leaves the storefront fully functional; it simply means we learn less about how the site is used.",
    ],
  },
  {
    id: "sharing",
    title: "Who we share data with",
    paragraphs: [
      "We share the minimum necessary data with our payment processor, our shipping carriers, and the atelier handling a repair. Each is bound by contract to use that data only for the service they provide to us.",
      "We will disclose information where legally compelled to do so, and will tell you when we are permitted to.",
    ],
  },
  {
    id: "retention",
    title: "How long we keep it",
    paragraphs: [
      "Order records are retained for seven years to meet tax and accounting obligations. Marketing preferences are kept until you withdraw them. Analytics data is aggregated after twenty-six months so it can no longer be linked to an individual.",
    ],
  },
  {
    id: "your-rights",
    title: "Your rights",
    paragraphs: [
      "You may request a copy of the personal information we hold about you, ask us to correct it, ask us to delete it, or object to a particular use. Requests are answered within thirty days at no charge.",
      "If you are unhappy with how we have handled a request you have the right to complain to your local data protection authority.",
    ],
  },
  {
    id: "security",
    title: "Security",
    paragraphs: [
      "The entire site is served over TLS 1.3. Access to customer records is restricted to staff who need it, protected by hardware-key two-factor authentication, and logged. We are PCI DSS Level 1 compliant through our payment processor.",
    ],
  },
  {
    id: "contact",
    title: "Contacting us",
    paragraphs: [
      "Privacy questions and rights requests can be sent to abedin.shop@gmail.com, which is the only contact channel we operate. We aim to reply within two working days.",
    ],
  },
];

export default function PrivacyPolicyPage() {
  return (
    <LegalLayout
      eyebrow="Legal"
      title="Privacy Policy"
      intro="What we collect, why we collect it, and what you can ask us to do about it — written to be read rather than skipped."
      updated="5 February 2026"
      sections={sections}
    />
  );
}
