"use client";

import { Check, Send } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/checkbox";
import { Input, Textarea } from "@/components/ui/input";
import { RadioCard, RadioGroup } from "@/components/ui/radio-group";

const TOPICS = [
  { id: "order", label: "An existing order", body: "Tracking, changes or delivery" },
  { id: "product", label: "A product question", body: "Sizing, materials or fit" },
  { id: "repair", label: "Repairs & servicing", body: "Resoling, restringing, servicing" },
  { id: "other", label: "Something else", body: "Press, partnerships or feedback" },
];

interface Errors {
  name?: string;
  email?: string;
  message?: string;
}

/** Contact form UI. Submissions are not sent anywhere — this is a demo. */
export function ContactForm() {
  const [topic, setTopic] = useState("order");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [orderRef, setOrderRef] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);

  const submit = (event: React.FormEvent) => {
    event.preventDefault();

    const next: Errors = {};
    if (!name.trim()) next.name = "Please tell us your name";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      next.email = "Enter a valid email address";
    if (message.trim().length < 12)
      next.message = "A little more detail helps us answer properly";

    setErrors(next);
    if (Object.keys(next).length > 0) return;

    setSent(true);
    toast.success("Message received", {
      description: "The concierge team will reply within a few hours.",
    });
    setName("");
    setEmail("");
    setOrderRef("");
    setMessage("");
    setTimeout(() => setSent(false), 4500);
  };

  return (
    <form onSubmit={submit} noValidate className="space-y-8">
      <fieldset>
        <legend className="mb-4 text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
          What is this about?
        </legend>
        <RadioGroup
          value={topic}
          onValueChange={setTopic}
          className="sm:grid-cols-2"
        >
          {TOPICS.map((item) => (
            <RadioCard key={item.id} value={item.id} id={`topic-${item.id}`}>
              <p className="text-sm font-medium">{item.label}</p>
              <p className="mt-1 text-xs text-muted-foreground">{item.body}</p>
            </RadioCard>
          ))}
        </RadioGroup>
      </fieldset>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="contact-name" className="mb-2 block text-xs text-muted-foreground">
            Your name
          </Label>
          <Input
            id="contact-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoComplete="name"
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "contact-name-error" : undefined}
          />
          {errors.name && (
            <p id="contact-name-error" className="mt-1.5 text-xs text-destructive">
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <Label htmlFor="contact-email" className="mb-2 block text-xs text-muted-foreground">
            Email address
          </Label>
          <Input
            id="contact-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            placeholder="your@email.com"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "contact-email-error" : undefined}
          />
          {errors.email && (
            <p id="contact-email-error" className="mt-1.5 text-xs text-destructive">
              {errors.email}
            </p>
          )}
        </div>

        {topic === "order" && (
          <div className="sm:col-span-2">
            <Label
              htmlFor="contact-order"
              className="mb-2 block text-xs text-muted-foreground"
            >
              Order reference (optional)
            </Label>
            <Input
              id="contact-order"
              value={orderRef}
              onChange={(e) => setOrderRef(e.target.value)}
              placeholder="AS-123456"
            />
          </div>
        )}

        <div className="sm:col-span-2">
          <Label
            htmlFor="contact-message"
            className="mb-2 block text-xs text-muted-foreground"
          >
            Message
          </Label>
          <Textarea
            id="contact-message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Tell us what you need — the more detail the better."
            aria-invalid={Boolean(errors.message)}
            aria-describedby={errors.message ? "contact-message-error" : undefined}
          />
          {errors.message && (
            <p id="contact-message-error" className="mt-1.5 text-xs text-destructive">
              {errors.message}
            </p>
          )}
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <Button type="submit" size="lg" disabled={sent}>
          {sent ? (
            <>
              <Check className="size-4" />
              Message sent
            </>
          ) : (
            <>
              <Send className="size-4" />
              Send message
            </>
          )}
        </Button>
        <p className="text-xs text-muted-foreground">
          Frontend demonstration — nothing is transmitted.
        </p>
      </div>
    </form>
  );
}
