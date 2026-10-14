"use client";

import Image from "next/image";
import { profile } from "@/data/profile";
import { aboutHeading } from "@/data/site";
import LocalTime from "@/components/ui/LocalTime";
import { BlurReveal } from "@/components/ui/Reveal";
import { ButtonPill, DataRow } from "@/components/ui/Surface";
import { DotLabel, TwoTone } from "@/components/ui/Type";
import { openResumeDialog } from "@/components/ui/ResumeDialog";
import { scrollToTarget } from "@/components/providers/SmoothScrollProvider";
import { BLUR_DATA_URL } from "@/lib/images";
import { Download, Mail } from "@/components/ui/Icons";

export default function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="relative bg-shell-2 py-20 sm:py-24 lg:py-28">
      <div className="wrap grid items-center gap-14 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1fr)] lg:gap-16">
        {/* ---------------------------------------------------------- portrait */}
        <BlurReveal blur={10}>
          <div className="relative mx-auto w-full max-w-[460px]">
            <div className="panel relative aspect-[4/5] overflow-hidden">
              <Image
                src={profile.profileImage}
                alt={`Portrait of ${profile.name}`}
                fill
                sizes="(min-width: 1024px) 460px, 90vw"
                placeholder="blur"
                blurDataURL={BLUR_DATA_URL}
                className="object-cover"
              />
            </div>

            <div className="absolute -bottom-6 -right-3 hidden w-[218px] sm:block lg:-right-6">
              <div className="float bg-panel p-4 shadow-lift ring-1 ring-ink/[0.06]">
                <DotLabel color="var(--color-moss)" pulse>
                  Available
                </DotLabel>
                <p className="mt-2.5 text-[0.82rem] leading-snug text-ink-2">{profile.availability}</p>
                <p className="micro-xs mt-3 text-ink-soft">
                  {profile.city} · <LocalTime timeZone={profile.timeZone} />
                </p>
              </div>
            </div>
          </div>
        </BlurReveal>

        {/* ------------------------------------------------------------- copy */}
        <div>
          <TwoTone id="about-title" micro={aboutHeading.micro} boxedMicro ghost={aboutHeading.ghost} ink={aboutHeading.ink} size="md" />

          <BlurReveal delay={0.3}>
            <div className="mt-7 flex flex-col gap-4">
              {profile.about.paragraphs.map((paragraph) => (
                <p key={paragraph} className="max-w-[56ch] text-[0.98rem] leading-relaxed text-ink-2">
                  {paragraph}
                </p>
              ))}
            </div>
          </BlurReveal>

          <BlurReveal delay={0.4} className="mt-9">
            <dl>
              {profile.about.facts.map((fact) => (
                <DataRow key={fact.label} label={fact.label} value={fact.value} />
              ))}
            </dl>
          </BlurReveal>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <ButtonPill variant="dark" badge cursor="CV" onClick={() => openResumeDialog()}>
              <Download className="size-4" />
              Open the résumé
            </ButtonPill>
            <ButtonPill variant="light" cursor="EMAIL" onClick={() => scrollToTarget("#contact")}>
              <Mail className="size-4" />
              {profile.email}
            </ButtonPill>
          </div>
        </div>
      </div>
    </section>
  );
}
