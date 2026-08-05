import { PageHeader } from "@/components/common/page-header";

export interface LegalSection {
  id: string;
  title: string;
  /** Each entry renders as its own paragraph. */
  paragraphs: string[];
}

interface LegalLayoutProps {
  title: string;
  eyebrow: string;
  intro: string;
  updated: string;
  sections: LegalSection[];
}

/** Shared two-column layout for the policy pages, with a sticky index. */
export function LegalLayout({
  title,
  eyebrow,
  intro,
  updated,
  sections,
}: LegalLayoutProps) {
  return (
    <>
      <PageHeader
        eyebrow={eyebrow}
        title={title}
        description={intro}
        crumbs={[{ label: "Home", href: "/" }, { label: title }]}
      >
        <p className="mt-6 text-xs text-muted-foreground">
          Last updated {updated}
        </p>
      </PageHeader>

      <div className="container-luxe py-14 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[240px_1fr] lg:gap-16">
          {/* Section index */}
          <nav aria-label="On this page" className="lg:sticky lg:top-28 lg:self-start">
            <p className="mb-4 text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
              On this page
            </p>
            <ol className="space-y-2.5">
              {sections.map((section, index) => (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    className="flex gap-3 text-sm text-muted-foreground transition-colors hover:text-accent"
                  >
                    <span className="tabular-nums text-accent/60">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    {section.title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <div className="max-w-3xl space-y-12">
            {sections.map((section, index) => (
              <section key={section.id} id={section.id} className="scroll-mt-32">
                <h2 className="flex items-baseline gap-3 text-2xl">
                  <span className="font-sans text-sm tabular-nums text-accent">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {section.title}
                </h2>
                <div className="mt-5 space-y-4">
                  {section.paragraphs.map((paragraph, i) => (
                    <p
                      key={i}
                      className="text-sm leading-relaxed text-muted-foreground"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </section>
            ))}

            <p className="rounded-2xl border border-border bg-secondary/50 p-6 text-xs leading-relaxed text-muted-foreground">
              EXTRA SHOP is a frontend demonstration project. This document is
              illustrative sample content written to exercise the page design —
              it is not legal advice and does not govern any real service.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
