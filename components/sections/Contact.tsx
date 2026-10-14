"use client";

import { profile } from "@/data/profile";
import { contactHeading } from "@/data/site";
import ContactForm from "@/components/layout/ContactForm";
import LocalTime from "@/components/ui/LocalTime";
import { BlurReveal, StaggerGroup, StaggerItem } from "@/components/ui/Reveal";
import { MicroLabel, TwoTone } from "@/components/ui/Type";
import { ArrowUpRight } from "@/components/ui/Icons";

const LINKEDIN_IS_PLACEHOLDER = profile.linkedin.startsWith("[");

type Channel = {
  id: string;
  kicker: string;
  heading: string;
  value: string;
  href?: string;
  external?: boolean;
};

const channels: Channel[] = [
  {
    id: "email",
    kicker: "Write to me",
    heading: "Email",
    value: profile.email,
    href: `mailto:${profile.email}`,
  },
  {
    id: "phone",
    kicker: "Call or WhatsApp",
    heading: profile.phoneDisplay,
    value: "WhatsApp is usually fastest",
    href: profile.whatsapp,
    external: true,
  },
  {
    id: "linkedin",
    kicker: "Elsewhere",
    heading: "LinkedIn",
    value: LINKEDIN_IS_PLACEHOLDER ? "[LINKEDIN URL] — coming soon" : "Connect with me",
    href: LINKEDIN_IS_PLACEHOLDER ? undefined : profile.linkedin,
    external: true,
  },
];

export default function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="relative bg-shell-3 py-20 sm:py-24 lg:py-28">
      <div className="wrap">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:items-end">
          <TwoTone
            id="contact-title"
            micro={contactHeading.micro}
            boxedMicro
            ghost={contactHeading.ghost}
            ink={contactHeading.ink}
            size="md"
          />
          <BlurReveal delay={0.25}>
            <p className="body max-w-[46ch] lg:pb-2">{contactHeading.support}</p>
          </BlurReveal>
        </div>

        <div className="mt-14 grid gap-12 sm:mt-16 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1fr)] lg:gap-16">
          {/* -------------------------------------------------------- the channels */}
          <StaggerGroup>
            {channels.map((channel) => {
              const inner = (
                <>
                  <span className="min-w-0">
                    <MicroLabel tone="soft">{channel.kicker}</MicroLabel>
                    <span className="display-sm mt-3 block text-[clamp(1.1rem,2.2vw,1.35rem)]">{channel.heading}</span>
                    <span className="mt-1.5 block truncate text-[0.85rem] text-ink-soft">{channel.value}</span>
                  </span>
                  <span
                    aria-hidden
                    className="grid size-9 shrink-0 place-items-center rounded-[10px] text-ink-fixed transition-transform duration-500 group-hover:translate-x-0.5"
                    style={{ background: "var(--color-ochre)" }}
                  >
                    <ArrowUpRight className="size-4" />
                  </span>
                </>
              );

              return (
                <StaggerItem key={channel.id} className="rule">
                  {channel.href ? (
                    <a
                      href={channel.href}
                      target={channel.external ? "_blank" : undefined}
                      rel={channel.external ? "noopener noreferrer" : undefined}
                      className="group flex items-center justify-between gap-4 py-6"
                      data-cursor="OPEN"
                    >
                      {inner}
                    </a>
                  ) : (
                    <div className="flex items-center justify-between gap-4 py-6 opacity-60">{inner}</div>
                  )}
                </StaggerItem>
              );
            })}

            <p className="micro mt-7 flex flex-wrap items-center gap-2 text-ink-soft">
              {profile.city}, {profile.country}
              <span aria-hidden className="opacity-40">
                ·
              </span>
              <LocalTime timeZone={profile.timeZone} className="tabular-nums" />
            </p>
          </StaggerGroup>

          {/* ------------------------------------------------------------- the form */}
          <BlurReveal blur={8} delay={0.15}>
            <ContactForm />
            <p className="mt-6 max-w-[46ch] text-[0.82rem] leading-relaxed text-ink-soft">
              Prefer email? {profile.email} works just as well — I answer everything within a working day.
            </p>
          </BlurReveal>
        </div>
      </div>
    </section>
  );
}
