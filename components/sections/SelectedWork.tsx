"use client";

import Image from "next/image";
import Link from "next/link";
import { projects } from "@/data/projects";
import { workHeading } from "@/data/site";
import { Trend } from "@/components/ui/DataViz";
import Counter from "@/components/ui/Counter";
import { BlurReveal, StaggerGroup, StaggerItem } from "@/components/ui/Reveal";
import { ButtonPill, CheckRow } from "@/components/ui/Surface";
import { MicroLabel, TwoTone } from "@/components/ui/Type";
import { useDragScroll } from "@/lib/hooks/useDragScroll";
import { BLUR_DATA_URL, img } from "@/lib/images";
import { cn } from "@/lib/utils";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "@/components/ui/Icons";

/** IllUSTRATIVE chart shape for the featured case panel. */
const CHART = [26, 29, 27, 33, 31, 38, 36, 43, 41, 48, 52, 58];

export default function SelectedWork() {
  const rail = useDragScroll<HTMLDivElement>();
  const [featured, ...rest] = projects;
  const card = workHeading.card;

  return (
    <section id="work" aria-labelledby="work-title" className="relative bg-shell-3">
      <div className="wrap pt-20 sm:pt-24 lg:pt-28">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:items-end">
          <TwoTone
            id="work-title"
            micro={workHeading.micro}
            boxedMicro
            ghost={workHeading.ghost}
            ink={workHeading.ink}
            size="md"
          />
          <BlurReveal delay={0.25}>
            <p className="body max-w-[46ch] lg:pb-2">{workHeading.support}</p>
          </BlurReveal>
        </div>
      </div>

      {/* ------------------------------------------------- full-bleed centrepiece */}
      <BlurReveal blur={8} className="relative mt-14 sm:mt-16">
        <div className="relative min-h-[560px] w-full overflow-hidden sm:min-h-[620px]">
          <Image
            src={img(`${featured.slug}-band`, 2000, 1200)}
            alt=""
            fill
            sizes="100vw"
            quality={78}
            placeholder="blur"
            blurDataURL={BLUR_DATA_URL}
            className="animate-breathe object-cover"
          />
          <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/15 to-black/40" />

          <div className="wrap relative flex h-full min-h-[560px] items-center justify-center py-16 sm:min-h-[620px] lg:justify-end">
            <div className="relative w-full max-w-[440px]">
              {/* the floating counter */}
              <div className="absolute -top-9 left-0 z-10 sm:-left-10 sm:-top-11">
                <div className="float w-[188px] bg-panel-fixed p-4 text-ink-fixed shadow-lift backdrop-blur-xl">
                  <p className="display-sm text-[1.7rem] tabular-nums">
                    <Counter value={2410} prefix="+" />
                  </p>
                  <p className="micro-xs mt-1.5 text-ink-fixed-soft">{card.counter.label}</p>
                  <Link
                    href={`/work/${featured.slug}`}
                    className="micro-xs mt-3 inline-flex items-center gap-1.5 rounded-full bg-ink-fixed/[0.07] px-2.5 py-1.5 text-ink-fixed transition-colors hover:bg-ink-fixed/[0.12]"
                    data-cursor="OPEN"
                  >
                    View detail
                    <ArrowRight className="size-3" />
                  </Link>
                </div>
              </div>

              {/* the bronze case panel */}
              <div
                className="panel relative overflow-hidden p-6 shadow-deep sm:p-7"
                style={{ background: "linear-gradient(155deg, #8d6236, #573d1d)" }}
              >
                <div aria-hidden className="absolute inset-0 bg-[radial-gradient(80%_60%_at_20%_0%,rgba(255,255,255,0.18),transparent_70%)]" />

                <div className="relative">
                  <MicroLabel tone="photo">
                    {featured.category} · {featured.year}
                  </MicroLabel>
                  <h3 className="display-sm mt-4 text-[clamp(1.35rem,2.6vw,1.75rem)] text-on-photo">{featured.title}</h3>
                  <p className="mt-2 text-[0.9rem] leading-relaxed text-on-photo-soft">{featured.tagline}</p>

                  <div className="relative mt-6 h-[120px]">
                    <Trend data={CHART} />
                    <span className="absolute -top-2 right-0 rounded-[7px] bg-on-photo px-2.5 py-1 text-[0.7rem] font-medium tabular-nums text-ink-fixed">
                      {card.chip}
                    </span>
                  </div>

                  <ul className="mt-6 flex flex-col gap-2.5">
                    {card.checklist.map((item) => (
                      <li key={item}>
                        <CheckRow tone="photo" color="var(--color-parchment)">
                          {item}
                        </CheckRow>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-7">
                    <ButtonPill variant="photo" badge cursor="OPEN" href={`/work/${featured.slug}`}>
                      Read the case
                    </ButtonPill>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* the drifting alert, like the reference's overlay card */}
          <div className="absolute bottom-8 left-8 hidden max-w-[268px] xl:block">
            <div className="float bg-panel-fixed p-4 text-ink-fixed shadow-lift backdrop-blur-xl">
              <span className="micro-xs inline-flex items-center gap-2 text-ink-fixed-soft">
                <span aria-hidden className="size-1.5 rounded-full" style={{ background: "var(--color-ochre)" }} />
                {card.alert.title}
              </span>
              <p className="mt-2 text-[0.85rem] leading-snug text-ink-fixed">{card.alert.body}</p>
            </div>
          </div>
        </div>
      </BlurReveal>

      {/* ------------------------------------------------------------- the rail */}
      <div className="wrap pb-20 pt-16 sm:pb-24 sm:pt-20">
        <div className="flex items-end justify-between gap-6">
          <MicroLabel tone="soft">
            {projects.length} projects · drag to browse
          </MicroLabel>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => rail.scrollByPage(-1)}
              disabled={rail.atStart}
              className="grid size-10 place-items-center rounded-full border border-ink/15 text-ink transition-colors hover:bg-ink hover:text-shell disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-ink"
              aria-label="Previous project"
            >
              <ArrowLeft className="size-4" />
            </button>
            <button
              type="button"
              onClick={() => rail.scrollByPage(1)}
              disabled={rail.atEnd}
              className="grid size-10 place-items-center rounded-full border border-ink/15 text-ink transition-colors hover:bg-ink hover:text-shell disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-ink"
              aria-label="Next project"
            >
              <ArrowRight className="size-4" />
            </button>
          </div>
        </div>

        <div
          ref={rail.ref}
          data-cursor="DRAG"
          className={cn(
            "no-scrollbar mt-8 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-2",
            rail.dragging && "cursor-grabbing select-none",
          )}
        >
          {rest.map((project) => (
            <Link
              key={project.slug}
              href={`/work/${project.slug}`}
              data-drag-item
              data-cursor="OPEN"
              className="group w-[262px] shrink-0 snap-start sm:w-[300px]"
            >
              <div className="tile relative aspect-[4/3] overflow-hidden">
                <Image
                  src={img(project.cover, 800, 600)}
                  alt={`${project.title} — ${project.tagline}`}
                  fill
                  sizes="(min-width: 640px) 300px, 262px"
                  placeholder="blur"
                  blurDataURL={BLUR_DATA_URL}
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                />
              </div>
              <div className="mt-4 flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <h3 className="text-[1rem] font-medium leading-snug">{project.title}</h3>
                  <p className="micro-xs mt-2 text-ink-soft">
                    {project.category} · {project.year}
                  </p>
                </div>
                <span aria-hidden className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-full bg-ink/[0.06] text-ink transition-colors group-hover:bg-ink group-hover:text-shell">
                  <ArrowUpRight className="size-3.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-6 h-px w-full bg-ink/10">
          <span className="block h-px bg-ink transition-[width] duration-300" style={{ width: `${Math.round(Math.max(0, Math.min(1, rail.progress)) * 100)}%` }} />
        </div>
      </div>
    </section>
  );
}
