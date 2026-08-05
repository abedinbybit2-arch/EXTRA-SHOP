import type { Metadata } from "next";
import { Mail, MessageCircle, Phone } from "lucide-react";
import Link from "next/link";

import { PageHeader } from "@/components/common/page-header";
import { Reveal } from "@/components/common/reveal";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { faqs } from "@/data/content";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Answers on shipping, returns, authenticity, repairs, payment and security at EXTRA SHOP.",
};

export default function FaqPage() {
  // Structured data so the answers can surface directly in search results.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.flatMap((group) =>
      group.items.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: { "@type": "Answer", text: item.a },
      })),
    ),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <PageHeader
        eyebrow="Help centre"
        title="Frequently asked questions"
        description="Everything customers ask most often. If your question isn't answered here, the concierge team replies within a few hours."
        crumbs={[{ label: "Home", href: "/" }, { label: "FAQ" }]}
      />

      <div className="container-luxe py-14 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1fr_320px] lg:gap-16">
          <div className="space-y-14">
            {faqs.map((group, groupIndex) => (
              <Reveal key={group.category} delay={groupIndex * 0.05}>
                <section>
                  <h2 className="mb-2 text-2xl">{group.category}</h2>
                  <div className="mb-6 h-px w-16 rule-gold" />
                  <Accordion type="single" collapsible className="w-full">
                    {group.items.map((item, index) => (
                      <AccordionItem
                        key={item.q}
                        value={`${groupIndex}-${index}`}
                      >
                        <AccordionTrigger>{item.q}</AccordionTrigger>
                        <AccordionContent>{item.a}</AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </section>
              </Reveal>
            ))}
          </div>

          {/* Contact aside */}
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-2xl border border-border bg-card p-7">
              <span className="mb-5 grid size-12 place-items-center rounded-full bg-accent/10 text-accent">
                <MessageCircle className="size-5" strokeWidth={1.6} />
              </span>
              <h2 className="font-display text-xl font-light">
                Still have a question?
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                The concierge team is available {siteConfig.contact.hours} and
                replies to most messages within a few hours.
              </p>

              <ul className="mt-6 space-y-3 text-sm">
                <li className="flex items-center gap-3">
                  <Mail className="size-4 shrink-0 text-accent" />
                  <a
                    href={`mailto:${siteConfig.contact.email}`}
                    className="break-all text-muted-foreground transition-colors hover:text-accent"
                  >
                    {siteConfig.contact.email}
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="size-4 shrink-0 text-accent" />
                  <a
                    href={`tel:${siteConfig.contact.phone.replace(/[^+\d]/g, "")}`}
                    className="text-muted-foreground transition-colors hover:text-accent"
                  >
                    {siteConfig.contact.phone}
                  </a>
                </li>
              </ul>

              <Button asChild className="mt-7 w-full">
                <Link href="/contact">Contact the concierge</Link>
              </Button>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
