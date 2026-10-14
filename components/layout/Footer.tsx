"use client";

import Image from "next/image";
import { profile } from "@/data/profile";
import { footerNote } from "@/data/site";
import { scrollToTarget, scrollToTop } from "@/components/providers/SmoothScrollProvider";
import LocalTime from "@/components/ui/LocalTime";
import { ButtonPill } from "@/components/ui/Surface";
import { MicroLabel } from "@/components/ui/Type";
import { openResumeDialog } from "@/components/ui/ResumeDialog";
import { BLUR_DATA_URL, img } from "@/lib/images";
import { ArrowUp, Download } from "@/components/ui/Icons";

const LINKEDIN_IS_PLACEHOLDER = profile.linkedin.startsWith("[");

export default function Footer() {
  const year = new Date().getFullYear();

  const elsewhere = [
    { label: "WhatsApp", href: profile.whatsapp, external: true },
    { label: "Email", href: `mailto:${profile.email}`, external: false },
    {
      label: LINKEDIN_IS_PLACEHOLDER ? "LinkedIn [soon]" : "LinkedIn",
      href: LINKEDIN_IS_PLACEHOLDER ? undefined : profile.linkedin,
      external: true,
    },
  ];

  return (
    <footer className="relative bg-night text-on-photo">
      {/* ------------------------------------------------------- the closing image */}
      <div className="relative h-[44svh] min-h-[320px] w-full overflow-hidden">
        <Image
          src={img("footer-neutral-abstract", 2000, 1100)}
          alt=""
          fill
          sizes="100vw"
          quality={78}
          placeholder="blur"
          blurDataURL={BLUR_DATA_URL}
          className="animate-breathe object-cover"
        />
        <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-night via-night/40 to-night/30" />

        <div className="wrap absolute inset-x-0 top-6 flex items-center justify-between gap-4">
          <MicroLabel tone="photo">{profile.wordmark}</MicroLabel>
          <MicroLabel tone="photo" className="hidden sm:inline-flex">
            {profile.tagline}
          </MicroLabel>
        </div>

        <div className="wrap absolute inset-x-0 bottom-7">
          <p className="display text-[clamp(2.1rem,7vw,4.6rem)] text-on-photo">
            {profile.wordmarkLower}
          </p>
          <p className="mt-3 text-[0.9rem] text-on-photo-soft">{profile.jobTitleLong}</p>
        </div>
      </div>

      {/* ------------------------------------------------------------- the columns */}
      <div className="wrap pb-10 pt-14">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)_minmax(0,1fr)] lg:gap-14">
          <div>
            <MicroLabel tone="photo">{footerNote.micro}</MicroLabel>
            <p className="mt-4 max-w-[42ch] text-[0.95rem] leading-relaxed text-on-photo-soft">
              {profile.availability}. Based in {profile.location}, working with clients remotely.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <ButtonPill variant="light" badge cursor="SAY HI" onClick={() => scrollToTarget("#contact")}>
                Get in touch
              </ButtonPill>
              <ButtonPill variant="photo" cursor="CV" onClick={() => openResumeDialog()}>
                <Download className="size-4" />
                Résumé
              </ButtonPill>
            </div>
          </div>

          <nav aria-label="Footer">
            <MicroLabel tone="photo">Sections</MicroLabel>
            <ul className="mt-4 flex flex-col gap-2.5">
              {[...profile.nav, ...profile.footerNav].map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={(event) => {
                      event.preventDefault();
                      scrollToTarget(item.href);
                    }}
                    className="text-[0.92rem] text-on-photo-soft transition-colors hover:text-on-photo"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <MicroLabel tone="photo">Elsewhere</MicroLabel>
            <ul className="mt-4 flex flex-col gap-2.5">
              {elsewhere.map((item) => (
                <li key={item.label}>
                  {item.href ? (
                    <a
                      href={item.href}
                      target={item.external ? "_blank" : undefined}
                      rel={item.external ? "noopener noreferrer" : undefined}
                      className="text-[0.92rem] text-on-photo-soft transition-colors hover:text-on-photo"
                    >
                      {item.label}
                    </a>
                  ) : (
                    <span className="text-[0.92rem] text-on-photo-soft/60">{item.label}</span>
                  )}
                </li>
              ))}
            </ul>
            <p className="micro mt-6 flex flex-wrap items-center gap-2 text-on-photo-soft">
              {profile.city}
              <span aria-hidden className="opacity-40">
                ·
              </span>
              <LocalTime timeZone={profile.timeZone} className="tabular-nums" />
            </p>
          </div>
        </div>

        {/* -------------------------------------------------------------- the meta */}
        <div className="mt-14 flex flex-col gap-5 border-t border-white/12 pt-6 lg:flex-row lg:items-center lg:justify-between">
          <p className="micro text-on-photo-soft">
            © {year} {profile.name}
          </p>
          <p className="max-w-[64ch] text-[0.78rem] leading-relaxed text-on-photo-soft/80">{footerNote.disclaimer}</p>
          <button
            type="button"
            onClick={() => scrollToTop()}
            className="micro flex items-center gap-2 text-on-photo-soft transition-colors hover:text-on-photo"
          >
            Back to top
            <ArrowUp className="size-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
