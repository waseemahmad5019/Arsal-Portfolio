"use client";

import { profile } from "@/data/profile";
import { closing, liveLog, liveLogHeading } from "@/data/site";
import { BlurReveal } from "@/components/ui/Reveal";
import { ButtonPill } from "@/components/ui/Surface";
import { DotLabel, InlineImage, MicroLabel } from "@/components/ui/Type";
import { openResumeDialog } from "@/components/ui/ResumeDialog";
import { scrollToTarget } from "@/components/providers/SmoothScrollProvider";
import { Download } from "@/components/ui/Icons";

const RAIL_COPIES = 2;

export default function Closing() {
  return (
    <section id="start" aria-labelledby="start-title" className="relative overflow-hidden bg-shell pt-20 sm:pt-24 lg:pt-28">
      <div className="wrap">
        <div className="mx-auto max-w-[1000px] text-center">
          <BlurReveal blur={7}>
            <MicroLabel boxed tone="soft" className="hairline border">
              {closing.micro}
            </MicroLabel>
          </BlurReveal>

          <h2 id="start-title" className="display mt-7 text-[clamp(2rem,5.6vw,4rem)]">
            <BlurReveal as="span" className="ghost block" delay={0.15}>
              {closing.ghost} <InlineImage seed="abstract-geometry-1" alt="" /> {closing.ghostTail}
            </BlurReveal>
            <BlurReveal as="span" className="block text-ink" delay={0.25}>
              {closing.ink} <InlineImage seed="abstract-geometry-2" alt="" />
            </BlurReveal>
          </h2>

          <BlurReveal delay={0.35}>
            <p className="body mx-auto mt-7 max-w-[58ch] text-[1.0625rem]">{closing.support}</p>
          </BlurReveal>

          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <ButtonPill variant="dark" size="lg" badge cursor="SAY HI" onClick={() => scrollToTarget("#contact")}>
              Get in touch
            </ButtonPill>
            <ButtonPill variant="light" size="lg" cursor="CV" onClick={() => openResumeDialog()}>
              <Download className="size-4" />
              Open the résumé
            </ButtonPill>
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------- the live work log */}
      <div className="mt-20 sm:mt-24">
        <div className="wrap flex items-center gap-4">
          <MicroLabel tone="soft">{liveLogHeading.micro}</MicroLabel>
          <DotLabel color="var(--color-live)" pulse tone="soft" className="micro-xs">
            {liveLogHeading.live}
          </DotLabel>
          <span aria-hidden className="rail-dash hidden flex-1 text-ink/25 sm:block" />
        </div>

        <div className="marquee mt-8 overflow-hidden py-2" aria-hidden="true">
          <div className="marquee-track">
            {Array.from({ length: RAIL_COPIES }, (_, copy) => (
              <ul key={copy} className="flex shrink-0 items-center">
                {liveLog.map((item) => (
                  <li key={item.id} className="flex w-[268px] shrink-0 flex-col gap-1.5 border-l border-ink/10 px-6 sm:w-[320px]">
                    <span className="micro-xs text-ink-soft">{item.title}</span>
                    <span className="text-[0.92rem] leading-snug text-ink-2">{item.detail}</span>
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>

        {/* The moving rail is decorative; this is the readable version. */}
        <ul className="sr-only">
          {liveLog.map((item) => (
            <li key={item.id}>
              {item.title}: {item.detail}
            </li>
          ))}
        </ul>

        <div className="wrap mt-14 pb-16 sm:pb-20">
          <p className="micro text-ink-soft">
            {profile.city}, {profile.country} · {profile.availability}
          </p>
        </div>
      </div>
    </section>
  );
}
