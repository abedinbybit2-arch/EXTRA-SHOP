import type { Metadata } from "next";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import Image from "next/image";

import { PageHeader } from "@/components/common/page-header";
import { ContactForm } from "@/components/contact/contact-form";
import { IMAGES, photoWide } from "@/data/images";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Reach the EXTRA SHOP concierge team by email, phone or message — replies within a few hours.",
};

const DETAILS = [
  { icon: MapPin, label: "Showroom", value: siteConfig.contact.address },
  { icon: Phone, label: "Telephone", value: siteConfig.contact.phone, href: `tel:${siteConfig.contact.phone.replace(/[^+\d]/g, "")}` },
  { icon: Mail, label: "Email", value: siteConfig.contact.email, href: `mailto:${siteConfig.contact.email}` },
  { icon: Clock, label: "Opening hours", value: siteConfig.contact.hours },
];

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Concierge"
        title="Talk to a person"
        description="No ticket queues and no chatbots. Messages reach the same small team that handles the showroom floor."
        crumbs={[{ label: "Home", href: "/" }, { label: "Contact" }]}
      />

      <div className="container-luxe py-14 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1fr_380px] lg:gap-16">
          <div>
            <h2 className="text-2xl">Send us a message</h2>
            <div className="mb-9 mt-3 h-px w-16 rule-gold" />
            <ContactForm />
          </div>

          <aside className="space-y-6">
            {/* Showroom card */}
            <div className="overflow-hidden rounded-2xl border border-border bg-card">
              <div className="relative aspect-4/3">
                <Image
                  src={photoWide(IMAGES.living[0], 800, 600)}
                  alt="The EXTRA SHOP showroom in SoHo, New York"
                  fill
                  sizes="380px"
                  className="object-cover"
                />
                <span className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <span className="absolute inset-x-0 bottom-0 p-5 text-white">
                  <span className="block font-display text-xl font-light">
                    The SoHo showroom
                  </span>
                  <span className="mt-1 block text-xs text-white/75">
                    Appointments recommended at weekends
                  </span>
                </span>
              </div>
            </div>

            <ul className="space-y-5 rounded-2xl border border-border bg-card p-7">
              {DETAILS.map((detail) => (
                <li key={detail.label} className="flex gap-4">
                  <span className="grid size-10 shrink-0 place-items-center rounded-full bg-accent/10 text-accent">
                    <detail.icon className="size-4" strokeWidth={1.6} />
                  </span>
                  <div className="min-w-0">
                    <p className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
                      {detail.label}
                    </p>
                    {detail.href ? (
                      <a
                        href={detail.href}
                        className="mt-1 block break-words text-sm transition-colors hover:text-accent"
                      >
                        {detail.value}
                      </a>
                    ) : (
                      <p className="mt-1 text-sm leading-relaxed">{detail.value}</p>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </div>
    </>
  );
}
