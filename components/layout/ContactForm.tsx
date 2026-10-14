"use client";

import { useState } from "react";
import { ButtonPill } from "@/components/ui/Surface";
import { cn } from "@/lib/utils";
import { ArrowRight, Check } from "@/components/ui/Icons";

type Status = "idle" | "sending" | "sent" | "error";

/**
 * Contact form with floating labels. Posts to /api/contact, which validates and
 * acknowledges — wire a real provider there (Resend, Formspree, …) when ready.
 *
 * The floating-label behaviour lives in the `.field` rules in globals.css so the
 * same markup works on both the light and over-photo tones.
 */
export default function ContactForm({ tone = "page" }: { tone?: "page" | "photo" }) {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [values, setValues] = useState({ name: "", email: "", message: "" });

  const onPhoto = tone === "photo";

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("sending");
    setError("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = (await response.json()) as { ok?: boolean; error?: string };

      if (!response.ok || !data.ok) {
        setError(data.error ?? "Something went wrong. Please email me instead.");
        setStatus("error");
        return;
      }

      setStatus("sent");
      setValues({ name: "", email: "", message: "" });
    } catch {
      setError("Network error. Please email me instead.");
      setStatus("error");
    }
  };

  const fieldShell = cn("field", onPhoto && "text-on-photo");

  return (
    <form onSubmit={submit} className="flex flex-col gap-7" noValidate>
      <div className="grid gap-7 sm:grid-cols-2">
        <div className={fieldShell}>
          <input
            id="contact-name"
            name="name"
            type="text"
            required
            autoComplete="name"
            placeholder=" "
            value={values.name}
            onChange={(event) => setValues((v) => ({ ...v, name: event.target.value }))}
          />
          <label htmlFor="contact-name">Your name</label>
        </div>

        <div className={fieldShell}>
          <input
            id="contact-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder=" "
            value={values.email}
            onChange={(event) => setValues((v) => ({ ...v, email: event.target.value }))}
          />
          <label htmlFor="contact-email">Email address</label>
        </div>
      </div>

      <div className={fieldShell}>
        <textarea
          id="contact-message"
          name="message"
          required
          rows={4}
          placeholder=" "
          value={values.message}
          onChange={(event) => setValues((v) => ({ ...v, message: event.target.value }))}
          className="resize-none"
        />
        <label htmlFor="contact-message">Tell me about the project</label>
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <ButtonPill
          type="submit"
          variant="dark"
          size="lg"
          badge
          cursor={status === "sending" ? "SENDING" : "SEND"}
          className={cn(status === "sending" && "pointer-events-none opacity-60")}
        >
          {status === "sending" ? "Sending…" : "Send message"}
          <ArrowRight className="size-4" />
        </ButtonPill>

        {status === "sent" ? (
          <span className="flex items-center gap-2 text-[0.85rem] text-ink" role="status">
            <Check className="size-4" />
            Thanks — I&apos;ll reply within a day.
          </span>
        ) : null}

        {status === "error" ? (
          <span className="text-[0.85rem] text-[var(--color-live)]" role="alert">
            {error}
          </span>
        ) : null}
      </div>
    </form>
  );
}
