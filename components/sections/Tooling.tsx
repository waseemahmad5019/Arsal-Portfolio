"use client";

import { toolingHeading, tools, type Tool } from "@/data/site";
import { BlurReveal, StaggerGroup, StaggerItem } from "@/components/ui/Reveal";
import { TwoTone } from "@/components/ui/Type";
import { cn } from "@/lib/utils";

const TONES: Record<Tool["tone"], string> = {
  light: "bg-panel text-ink ring-1 ring-ink/10",
  dark: "bg-ink text-shell",
  butter: "bg-butter text-ink",
  ochre: "bg-ochre text-ink",
  moss: "bg-moss text-on-photo",
};

function Bubble({ tool, fixed = false }: { tool: Tool; fixed?: boolean }) {
  return (
    <span
      className={cn(
        "grid place-items-center rounded-full shadow-lift ring-1 ring-black/[0.06]",
        TONES[tool.tone],
        tool.soft && "opacity-70",
      )}
      style={{
        width: fixed ? tool.size : tool.size * 0.8,
        height: fixed ? tool.size : tool.size * 0.8,
        filter: tool.soft ? "blur(1.5px)" : undefined,
      }}
    >
      <span className="micro-xs font-medium">{tool.monogram}</span>
      <span className="sr-only">{tool.name}</span>
    </span>
  );
}

export default function Tooling() {
  return (
    <section id="tooling" aria-labelledby="tooling-title" className="relative overflow-hidden bg-shell py-20 sm:py-24 lg:py-28">
      <div className="wrap">
        <div className="mx-auto max-w-[760px] text-center">
          <TwoTone
            id="tooling-title"
            micro={toolingHeading.micro}
            boxedMicro
            ghost={toolingHeading.ghost}
            ink={toolingHeading.ink}
            size="md"
            align="center"
          />
          <BlurReveal delay={0.3}>
            <p className="display-sm mt-8 text-[clamp(1.1rem,2.2vw,1.45rem)] text-ink">{toolingHeading.lead}</p>
          </BlurReveal>
          <BlurReveal delay={0.4}>
            <p className="body mx-auto mt-5 max-w-[62ch]">{toolingHeading.support}</p>
          </BlurReveal>
        </div>

        {/* ------------------------------------------- the orbit (large screens) */}
        <div aria-hidden className="relative mt-16 hidden aspect-[16/6] w-full lg:block">
          <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-ink/[0.07]" />

          {tools.map((tool, index) => (
            <span key={tool.id} className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: `${tool.x}%`, top: `${tool.y}%` }}>
              <span className="block animate-float" style={{ animationDelay: `${index * 0.8}s` }}>
                <Bubble tool={tool} fixed />
              </span>
            </span>
          ))}

          <span className="pill absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 border border-ink/10 bg-panel shadow-lift">
            <span className="size-1.5 rounded-full bg-moss" />
            <span className="text-[0.85rem] text-ink">{toolingHeading.centre}</span>
          </span>
        </div>

        {/* ------------------------------------------ the cloud (small screens) */}
        <div aria-hidden className="mt-12 flex flex-wrap items-center justify-center gap-3 lg:hidden">
          {tools.map((tool, index) => (
            <span key={tool.id} className="animate-float" style={{ animationDelay: `${index * 0.6}s` }}>
              <Bubble tool={tool} />
            </span>
          ))}
        </div>

        {/* ------------------------------------------------- the accessible list */}
        <StaggerGroup className="mt-16 grid gap-x-8 gap-y-0 sm:grid-cols-2 lg:mt-20 lg:grid-cols-4">
          {tools.map((tool) => (
            <StaggerItem key={tool.id} className="rule flex items-start gap-3 py-5">
              <span className={cn("micro-xs grid size-8 shrink-0 place-items-center rounded-full", TONES[tool.tone])} aria-hidden>
                {tool.monogram}
              </span>
              <span className="min-w-0">
                <span className="block text-[0.9rem] font-medium">{tool.name}</span>
                <span className="mt-0.5 block text-[0.8rem] leading-snug text-ink-soft">{tool.note}</span>
              </span>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
