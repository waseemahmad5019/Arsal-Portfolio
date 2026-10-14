"use client";

import Image from "next/image";
import { comparison } from "@/data/site";
import { BlurReveal } from "@/components/ui/Reveal";
import { ButtonPill } from "@/components/ui/Surface";
import { TwoTone } from "@/components/ui/Type";
import { scrollToTarget } from "@/components/providers/SmoothScrollProvider";
import { BLUR_DATA_URL, img } from "@/lib/images";
import { Check } from "@/components/ui/Icons";

type Mark = "yes" | "partial" | "absent";

const MARK_LABEL: Record<Mark, string> = {
  yes: "Yes",
  partial: "Sometimes",
  absent: "Not usually",
};

function MarkIcon({ mark }: { mark: Mark }) {
  if (mark === "yes") {
    return (
      <span className="grid size-6 place-items-center rounded-full bg-ink-fixed text-on-photo">
        <Check className="size-3.5" />
      </span>
    );
  }

  if (mark === "partial") {
    return (
      <span className="grid size-6 place-items-center rounded-full border border-[var(--color-ochre)] text-[var(--color-ochre)]">
        <span aria-hidden className="size-2 rounded-full bg-current" />
      </span>
    );
  }

  return (
    <span className="grid size-6 place-items-center rounded-full border border-ink-fixed/20 text-ink-fixed/40">
      <span aria-hidden className="h-px w-3 bg-current" />
    </span>
  );
}

export default function Comparison() {
  return (
    <section id="why" aria-labelledby="why-title" className="relative isolate overflow-hidden">
      <Image
        src={img("workspace-neutral-abstract", 2000, 1400)}
        alt=""
        fill
        sizes="100vw"
        quality={78}
        placeholder="blur"
        blurDataURL={BLUR_DATA_URL}
        className="object-cover"
      />
      <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/35 to-black/55" />

      <div className="wrap relative py-20 sm:py-24 lg:py-28">
        <BlurReveal blur={10}>
          {/* The panel stays white in every palette — it sits on photography. */}
          <div className="panel mx-auto max-w-[1080px] overflow-hidden bg-panel-fixed/95 p-6 text-ink-fixed shadow-deep backdrop-blur-2xl sm:p-9 lg:p-11">
            <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-14">
              <div>
                <TwoTone
                  id="why-title"
                  micro={comparison.micro}
                  boxedMicro
                  ghost={comparison.ghost}
                  ink={comparison.ink}
                  size="sm"
                  className="text-ink-fixed [&_.ghost]:text-ink-fixed/45"
                />
                <p className="mt-6 max-w-[42ch] text-[0.95rem] leading-relaxed text-ink-fixed-soft">{comparison.support}</p>

                <div className="mt-8">
                  <ButtonPill variant="dark" badge cursor="SAY HI" onClick={() => scrollToTarget("#contact")}>
                    Get in touch
                  </ButtonPill>
                </div>
              </div>

              {/* ------------------------------------------------------ the table */}
              <div>
                <div className="grid grid-cols-[minmax(0,1fr)_74px_74px] items-end gap-2 sm:grid-cols-[minmax(0,1fr)_110px_110px] sm:gap-4">
                  <span className="micro-xs text-ink-fixed-soft">{comparison.columns.left}</span>
                  <span className="micro-xs text-center text-ink-fixed">{comparison.columns.mine}</span>
                  <span className="micro-xs text-center text-ink-fixed-soft">{comparison.columns.theirs}</span>
                </div>

                <ul className="mt-4">
                  {comparison.rows.map((row) => (
                    <li
                      key={row.label}
                      className="grid grid-cols-[minmax(0,1fr)_74px_74px] items-center gap-2 border-t border-ink-fixed/10 py-3.5 sm:grid-cols-[minmax(0,1fr)_110px_110px] sm:gap-4"
                    >
                      <span className="text-[0.84rem] leading-snug text-ink-fixed sm:text-[0.9rem]">{row.label}</span>
                      <span className="flex justify-center">
                        <MarkIcon mark={row.mine as Mark} />
                        <span className="sr-only">{MARK_LABEL[row.mine as Mark]}</span>
                      </span>
                      <span className="flex justify-center">
                        <MarkIcon mark={row.theirs as Mark} />
                        <span className="sr-only">{MARK_LABEL[row.theirs as Mark]}</span>
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="grid grid-cols-[minmax(0,1fr)_74px_74px] items-center gap-2 border-t border-ink-fixed/25 bg-[var(--color-parchment)] px-0 py-4 sm:grid-cols-[minmax(0,1fr)_110px_110px] sm:gap-4">
                  <span className="pl-0 text-[0.84rem] font-medium text-ink-fixed sm:text-[0.9rem]">{comparison.footer.label}</span>
                  <span className="text-center text-[0.78rem] font-medium text-ink-fixed sm:text-[0.84rem]">{comparison.footer.mine}</span>
                  <span className="text-center text-[0.78rem] text-ink-fixed-soft sm:text-[0.84rem]">{comparison.footer.theirs}</span>
                </div>
              </div>
            </div>
          </div>
        </BlurReveal>
      </div>
    </section>
  );
}
