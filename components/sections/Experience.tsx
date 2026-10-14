"use client";

import { profile } from "@/data/profile";
import Counter from "@/components/ui/Counter";
import { BlurReveal, StaggerGroup, StaggerItem } from "@/components/ui/Reveal";
import { ButtonPill } from "@/components/ui/Surface";
import { MicroLabel, TwoTone } from "@/components/ui/Type";
import { openResumeDialog } from "@/components/ui/ResumeDialog";
import { Download } from "@/components/ui/Icons";

/**
 * The timeline as a ledger: hairline rows, monospace dates down the left, the
 * company set as the display face, and the stack as chips on the right.
 */
export default function Experience() {
  const entries = profile.experience.filter((entry) => entry.published);

  return (
    <section id="experience" aria-labelledby="experience-title" className="relative bg-shell-2 py-20 sm:py-24 lg:py-28">
      <div className="wrap">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-end">
          <TwoTone
            id="experience-title"
            micro={profile.experienceHeadline.micro}
            boxedMicro
            ghost={profile.experienceHeadline.ghost}
            ink={profile.experienceHeadline.ink}
            size="md"
          />
          <BlurReveal delay={0.25}>
            <p className="body max-w-[44ch] lg:pb-2">{profile.experienceHeadline.support}</p>
          </BlurReveal>
        </div>

        {/* ------------------------------------------------------------ the rows */}
        <div className="mt-14 sm:mt-16">
          {entries.map((entry) => (
            <BlurReveal key={entry.id} blur={8}>
              <article className="rule grid gap-5 py-9 lg:grid-cols-[150px_minmax(0,1fr)_210px] lg:gap-10 lg:py-11">
                <div>
                  <MicroLabel tone="soft">{entry.period}</MicroLabel>
                  <p className="mt-3 text-[0.8rem] text-ink-soft">{entry.duration}</p>
                </div>

                <div>
                  <h3 className="display-sm text-[clamp(1.3rem,2.8vw,1.85rem)]">{entry.company}</h3>
                  <p className="mt-2 text-[0.95rem] font-medium text-ink-2">{entry.role}</p>
                  <p className="mt-3 max-w-[54ch] text-[0.9rem] leading-relaxed text-ink-soft">{entry.summary}</p>

                  <ul className="mt-5 flex flex-col gap-2">
                    {entry.bullets.map((bullet) => (
                      <li key={bullet} className="flex gap-2.5 text-[0.86rem] leading-relaxed text-ink-2">
                        <span aria-hidden className="mt-[8px] size-1 shrink-0 rounded-full bg-ink/35" />
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="lg:text-right">
                  <MicroLabel tone="soft">{entry.location}</MicroLabel>
                  <ul className="mt-3 flex flex-wrap gap-1.5 lg:justify-end">
                    {entry.stack.map((item) => (
                      <li key={item} className="chip text-ink-soft">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </BlurReveal>
          ))}
        </div>

        {/* ---------------------------------------------------------- the numbers */}
        <StaggerGroup className="rule grid gap-y-8 pt-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {profile.stats.map((stat) => (
            <StaggerItem key={stat.label}>
              <p className="display-sm text-[clamp(1.8rem,4vw,2.5rem)] tabular-nums">
                <Counter value={stat.value} prefix={stat.prefix} suffix={stat.suffix} plain={stat.plain} />
              </p>
              <p className="mt-3 max-w-[24ch] text-[0.85rem] leading-snug text-ink-soft">{stat.label}</p>
            </StaggerItem>
          ))}
        </StaggerGroup>

        <BlurReveal delay={0.15} className="mt-12 flex flex-wrap items-center gap-3">
          <ButtonPill variant="dark" badge cursor="CV" onClick={() => openResumeDialog()}>
            <Download className="size-4" />
            Open the résumé
          </ButtonPill>
          <span className="micro text-ink-soft">{profile.availability}</span>
        </BlurReveal>
      </div>
    </section>
  );
}
