import { Reveal } from "@/components/common/reveal";
import { SectionHeading } from "@/components/common/section-heading";
import { valueProps } from "@/data/content";
import { getIcon } from "@/lib/icons";

/** "Why choose us" — four service commitments. */
export function ValueProps() {
  return (
    <section className="container-luxe py-20 lg:py-28">
      <SectionHeading
        eyebrow="Why ABEDIN SHOP"
        title="The part that happens after you buy"
        description="Anyone can photograph a product well. What separates a retailer is what happens once the parcel has left."
        align="center"
      />

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {valueProps.map((prop, index) => {
          const Icon = getIcon(prop.icon);
          return (
            <Reveal key={prop.title} delay={index * 0.08}>
              <div className="group h-full rounded-2xl border border-border bg-card p-7 transition-all duration-500 ease-luxe hover:-translate-y-1 hover:border-accent/40 hover:shadow-lift">
                <span className="mb-6 grid size-12 place-items-center rounded-full bg-accent/10 text-accent transition-colors duration-500 group-hover:bg-accent group-hover:text-accent-foreground">
                  <Icon className="size-5" strokeWidth={1.6} />
                </span>
                <h3 className="font-sans text-base font-medium">{prop.title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
                  {prop.body}
                </p>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
