import { Quote } from "lucide-react";

import { Reveal } from "@/components/common/reveal";
import { SectionHeading } from "@/components/common/section-heading";
import { Rating } from "@/components/ui/rating";
import { testimonials } from "@/data/reviews";

/** Customer testimonial wall. */
export function Testimonials() {
  return (
    <section className="container-luxe py-20 lg:py-28">
      <SectionHeading
        eyebrow="Customer reviews"
        title="What people say once the parcel arrives"
        description="Unedited feedback from verified orders across ninety-four countries."
        align="center"
      />

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((testimonial, index) => (
          <Reveal key={testimonial.id} delay={(index % 3) * 0.08}>
            <figure className="flex h-full flex-col rounded-2xl border border-border bg-card p-7 transition-all duration-500 ease-luxe hover:-translate-y-1 hover:shadow-lift">
              <Quote className="size-7 text-accent/30" aria-hidden />
              <Rating value={testimonial.rating} size="sm" className="mt-5" />
              <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-muted-foreground">
                &ldquo;{testimonial.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3 border-t border-border pt-5">
                <span className="grid size-10 shrink-0 place-items-center rounded-full bg-secondary font-display text-sm text-accent">
                  {testimonial.author
                    .split(" ")
                    .map((part) => part[0])
                    .join("")}
                </span>
                <span className="min-w-0">
                  <span className="block truncate text-sm font-medium text-foreground">
                    {testimonial.author}
                  </span>
                  <span className="block truncate text-xs text-muted-foreground">
                    {testimonial.role}
                  </span>
                </span>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
