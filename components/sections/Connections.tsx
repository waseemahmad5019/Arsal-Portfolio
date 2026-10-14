"use client";

import { capabilities, capabilitiesHeading, network } from "@/data/site";
import { BlurReveal, StaggerGroup, StaggerItem } from "@/components/ui/Reveal";
import { MicroLabel, TwoTone } from "@/components/ui/Type";
import { cn } from "@/lib/utils";

/* ---------------------------------------------------------------------------
 * The connection diagram: five satellite nodes joined to a single core by
 * hairlines, over concentric dashed rings and a warm glow. Everything is drawn
 * with percentages so it scales from a phone to a 1920px display.
 * ------------------------------------------------------------------------- */

function Diagram() {
  return (
    <div className="relative aspect-[4/3.2] w-full sm:aspect-[16/10]">
      {/* rings */}
      <div aria-hidden className="absolute inset-0">
        {[30, 52, 76].map((size, index) => (
          <span
            key={size}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-ink/15"
            style={{
              width: `${size}%`,
              aspectRatio: "1",
              opacity: 1 - index * 0.22,
            }}
          />
        ))}
        <span className="absolute left-1/2 top-1/2 size-[38%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(245,226,193,0.55),transparent)] blur-[6px]" />
      </div>

      {/* connectors */}
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 size-full text-ink/25" aria-hidden>
        {network.nodes.map((node) => (
          <line
            key={node.id}
            x1={node.x}
            y1={node.y}
            x2={50}
            y2={50}
            stroke="currentColor"
            strokeWidth={1}
            strokeDasharray="3 3"
            vectorEffect="non-scaling-stroke"
          />
        ))}
      </svg>

      {/* core */}
      <span className="micro absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-panel px-4 py-2.5 text-ink shadow-lift ring-1 ring-ink/10">
        {network.core}
      </span>

      {/* nodes */}
      {network.nodes.map((node) => (
        <span
          key={node.id}
          className={cn(
            "absolute flex -translate-x-1/2 -translate-y-1/2 gap-2",
            node.align === "below" && "flex-col items-center",
            node.align === "right" && "flex-row items-center",
            node.align === "left" && "flex-row-reverse items-center",
          )}
          style={{ left: `${node.x}%`, top: `${node.y}%` }}
        >
          <span aria-hidden className="size-1.5 shrink-0 rounded-full bg-ink" />
          <span className="micro-xs whitespace-nowrap text-ink-soft">{node.label}</span>
        </span>
      ))}
    </div>
  );
}

export default function Connections() {
  return (
    <section id="capabilities" aria-labelledby="capabilities-title" className="relative bg-shell-2 py-20 sm:py-24 lg:py-28">
      <div className="wrap">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-16">
          <div>
            <TwoTone
              id="capabilities-title"
              micro={network.micro}
              boxedMicro
              ghost={network.ghost}
              ink={network.ink}
              size="md"
            />
            <BlurReveal delay={0.35}>
              <ul className="mt-8 flex flex-col gap-3">
                {network.caption.map((line) => (
                  <li key={line} className="flex items-center gap-3 text-[0.95rem] text-ink-soft">
                    <span aria-hidden className="h-px w-6 bg-ink/25" />
                    {line}
                  </li>
                ))}
              </ul>
            </BlurReveal>
          </div>

          <Diagram />
        </div>

        {/* ------------------------------------------------- core capabilities */}
        <div className="rule mt-20 pt-10 sm:mt-24">
          <MicroLabel tone="soft">{capabilitiesHeading.micro}</MicroLabel>
          <BlurReveal delay={0.1}>
            <h3 className="display-sm mt-5 max-w-[24ch] text-[clamp(1.5rem,3.4vw,2.35rem)]">
              {capabilitiesHeading.title}
            </h3>
          </BlurReveal>

          <StaggerGroup className="mt-10 grid gap-8 sm:grid-cols-3 sm:gap-6">
            {capabilities.map((item) => (
              <StaggerItem key={item.id} className="rule pt-6">
                <h4 className="text-[1.05rem] font-medium">{item.title}</h4>
                <p className="mt-2 max-w-[36ch] text-[0.9rem] leading-relaxed text-ink-soft">{item.blurb}</p>
                <ul className="mt-4 flex flex-wrap gap-1.5">
                  {item.tags.map((tag) => (
                    <li key={tag} className="chip text-ink-soft">
                      {tag}
                    </li>
                  ))}
                </ul>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </div>
    </section>
  );
}
