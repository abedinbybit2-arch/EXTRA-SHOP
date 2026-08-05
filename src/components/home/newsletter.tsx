"use client";

import { Check, Send } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const PERKS = [
  "First access to limited releases",
  "Private sale invitations",
  "One dispatch a month, never more",
];

/** Newsletter capture band. UI-only — nothing is transmitted. */
export function Newsletter() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!email.includes("@") || email.length < 6) {
      toast.error("Enter a valid email address");
      return;
    }
    setDone(true);
    toast.success("Welcome to the list", {
      description: "Your first dispatch arrives at the start of next month.",
    });
    setEmail("");
    // Return to the idle state so the section can be demonstrated repeatedly.
    setTimeout(() => setDone(false), 4000);
  };

  return (
    <section className="container-luxe py-20 lg:py-28">
      <div className="bg-gradient-luxe relative overflow-hidden rounded-3xl border border-border px-6 py-16 text-center sm:px-12 lg:py-20">
        <p className="mb-4 text-[11px] uppercase tracking-[0.24em] text-accent">
          The Atelier dispatch
        </p>
        <h2 className="text-balance text-3xl leading-[1.1] md:text-4xl lg:text-[2.75rem]">
          Know before it sells out
        </h2>
        <p className="mx-auto mt-5 max-w-lg text-pretty text-sm leading-relaxed text-muted-foreground md:text-base">
          Limited releases are usually gone within a day. The dispatch is the only
          way to hear about them first.
        </p>

        <form
          onSubmit={submit}
          className="mx-auto mt-9 flex max-w-md flex-col gap-3 sm:flex-row"
        >
          <label htmlFor="newsletter-email" className="sr-only">
            Email address
          </label>
          <Input
            id="newsletter-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            autoComplete="email"
            className="h-13 flex-1 text-center sm:text-left"
          />
          <Button type="submit" size="lg" variant="gold" disabled={done}>
            {done ? (
              <>
                <Check className="size-4" />
                Subscribed
              </>
            ) : (
              <>
                <Send className="size-4" />
                Subscribe
              </>
            )}
          </Button>
        </form>

        <ul className="mx-auto mt-8 flex max-w-2xl flex-wrap items-center justify-center gap-x-7 gap-y-3">
          {PERKS.map((perk) => (
            <li
              key={perk}
              className="flex items-center gap-2 text-xs text-muted-foreground"
            >
              <Check className="size-3.5 text-accent" />
              {perk}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
