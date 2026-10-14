"use client";

import Image from "next/image";
import { pillars, pillarsHeading, type PillarMock } from "@/data/site";
import { Bars, Donut, Meter } from "@/components/ui/DataViz";
import { BlurReveal, StaggerGroup, StaggerItem } from "@/components/ui/Reveal";
import { Metric } from "@/components/ui/Surface";
import { MicroLabel, TwoTone } from "@/components/ui/Type";
import { Plus } from "@/components/ui/Icons";
import { img } from "@/lib/images";
import { cn } from "@/lib/utils";

/* ---------------------------------------------------------------------------
 * The floating glass panel that overhangs each tile. Its contents are driven by
 * the `visual` discriminator so all three panels share one layout rhythm.
 * ------------------------------------------------------------------------- */

function PanelShell({ title, className, children }: { title: string; className?: string; children: React.ReactNode }) {
  return (
    <div className={cn("float bg-panel/92 p-4 shadow-lift backdrop-blur-xl ring-1 ring-ink/[0.06]", className)}>
      <div className="flex items-center justify-between gap-3">
        <MicroLabel tone="soft">{title}</MicroLabel>
        <span aria-hidden className="grid size-5 place-items-center rounded-full bg-ink/[0.06] text-ink-2">
          <Plus className="size-3" />
        </span>
      </div>
      {children}
    </div>
  );
}

function PillarPanel({ mock }: { mock: PillarMock }) {
  if (mock.visual === "bars") {
    return (
      <PanelShell title={mock.title}>
        {mock.metrics?.length ? (
          <div className="mt-4 grid grid-cols-3 gap-3">
            {mock.metrics.map((item) => (
              <Metric key={item.label} label={item.label} value={item.value} />
            ))}
          </div>
        ) : null}

        {mock.series?.length ? <Bars data={mock.series} className="mt-4" height={54} /> : null}

        {mock.rows?.length ? (
          <dl className="mt-3">
            {mock.rows.map((row) => (
              <div key={row.label} className="rule flex items-center justify-between py-2 text-[0.8rem]">
                <dt className="text-ink-soft">{row.label}</dt>
                <dd className="tabular-nums">{row.value}</dd>
              </div>
            ))}
          </dl>
        ) : null}
      </PanelShell>
    );
  }

  if (mock.visual === "metric") {
    return (
      <PanelShell title={mock.title}>
        {mock.hero ? (
          <div className="mt-4">
            <Metric label={mock.hero.label} value={mock.hero.value} sub={mock.hero.note} />
          </div>
        ) : null}

        {mock.metrics?.length ? (
          <div className="rule mt-4 grid grid-cols-3 gap-3 pt-3">
            {mock.metrics.map((item) => (
              <div key={item.label}>
                <p className="micro-xs text-ink-soft">{item.label}</p>
                <p className="mt-1.5 text-[0.95rem] font-medium tabular-nums">{item.value}</p>
              </div>
            ))}
          </div>
        ) : null}

        {mock.rows?.length ? (
          <dl className="mt-2">
            {mock.rows.map((row) => (
              <div key={row.label} className="rule flex items-center justify-between py-2 text-[0.8rem]">
                <dt className="text-ink-soft">{row.label}</dt>
                <dd className="tabular-nums">{row.value}</dd>
              </div>
            ))}
          </dl>
        ) : null}
      </PanelShell>
    );
  }

  return (
    <PanelShell title={mock.title}>
      {mock.hero ? (
        <div className="mt-4">
          <Metric label={mock.hero.label} value={mock.hero.value} sub={mock.hero.note} />
        </div>
      ) : null}

      {mock.donut?.length ? (
        <div className="mt-4 flex items-center gap-4">
          <Donut segments={mock.donut} className="size-[74px] shrink-0" thickness={13} />
          <ul className="flex min-w-0 flex-col gap-1.5">
            {mock.donut.map((segment) => (
              <li key={segment.label} className="flex items-center gap-2 text-[0.78rem]">
                <span aria-hidden className="size-1.5 shrink-0 rounded-full" style={{ background: segment.color }} />
                <span className="truncate text-ink-soft">{segment.label}</span>
                <span className="ml-auto tabular-nums">{segment.value}%</span>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {mock.meter ? (
        <div className="mt-4">
          <Meter value={mock.meter.value} />
          <p className="mt-2 text-[0.78rem] text-ink-soft">{mock.meter.label}</p>
        </div>
      ) : null}
    </PanelShell>
  );
}

/* ------------------------------------------------------------------------- */

export default function Pillars() {
  return (
    <section id="services" aria-labelledby="services-title" className="relative bg-shell py-20 sm:py-24 lg:py-32">
      <div className="wrap">
        <div className="mx-auto max-w-[820px] text-center">
          <TwoTone
            id="services-title"
            micro={pillarsHeading.micro}
            boxedMicro
            ghost={pillarsHeading.ghost}
            ink={pillarsHeading.ink}
            size="lg"
            align="center"
            className="items-center"
          />
          <BlurReveal delay={0.3}>
            <p className="body mx-auto mt-6 max-w-[58ch] text-[1.0625rem]">{pillarsHeading.support}</p>
          </BlurReveal>
        </div>

        <StaggerGroup className="mt-16 grid gap-14 sm:mt-20 lg:grid-cols-3 lg:gap-8">
          {pillars.map((pillar) => (
            <StaggerItem key={pillar.id} className="group">
              <MicroLabel tone="soft">[{pillar.index}]</MicroLabel>

              <div className="relative mt-5">
                {/* the gradient tile */}
                <div className="tile relative overflow-hidden">
                  <div
                    className="relative h-[300px] sm:h-[340px]"
                    style={{ background: `linear-gradient(155deg, ${pillar.tile.from}, ${pillar.tile.to})` }}
                  >
                    <Image
                      src={img(`pillar-${pillar.id}-abstract`, 800, 900)}
                      alt=""
                      fill
                      sizes="(min-width: 1024px) 380px, 90vw"
                      className="object-cover opacity-25 mix-blend-luminosity"
                    />
                    <div aria-hidden className="absolute inset-0 bg-[radial-gradient(75%_55%_at_28%_18%,rgba(255,255,255,0.34),transparent_72%)]" />
                  </div>
                </div>

                {/* the panel hanging over its bottom edge */}
                <div className="absolute inset-x-[-10px] bottom-[-26px]">
                  <PillarPanel mock={pillar.mock} />
                </div>
              </div>

              <h3 className="display-sm mt-20 text-[clamp(1.35rem,2.4vw,1.6rem)]">{pillar.title}</h3>
              <p className="mt-3 max-w-[38ch] text-[0.95rem] leading-relaxed text-ink-soft">{pillar.blurb}</p>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
