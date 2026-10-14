"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { profile } from "@/data/profile";
import { workspace } from "@/data/site";
import { Bars } from "@/components/ui/DataViz";
import Counter from "@/components/ui/Counter";
import { BLUR_DATA_URL, img } from "@/lib/images";
import { cn } from "@/lib/utils";
import { ArrowDown, ChevronDown, Search } from "@/components/ui/Icons";

/**
 * The hero's product mock: an SEO workspace instead of the reference's wealth
 * dashboard — same anatomy (a dark glass sidebar, a white panel, a big ticking
 * figure, a legend row, an activity chart, a scroll cue).
 *
 * Purely decorative, so it is hidden from assistive tech; the same information
 * is available as real copy in the sections below.
 */
export default function WorkspaceMock({ className }: { className?: string }) {
  return (
    <motion.div
      className={cn("panel relative overflow-hidden bg-panel shadow-soft ring-1 ring-ink/[0.07]", className)}
      initial={{ opacity: 0, filter: "blur(14px)", y: 40 }}
      animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
      transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.35 }}
      aria-hidden="true"
    >
      <div className="grid sm:grid-cols-[196px_1fr]">
        {/* ------------------------------------------------------- sidebar */}
        <div className="relative hidden overflow-hidden sm:block">
          <Image src={img("workspace-sidebar-abstract", 420, 900)} alt="" fill sizes="200px" className="object-cover" />
          <div className="absolute inset-0 bg-[#1d1d1b]/72 backdrop-blur-[2px]" />
          <div className="relative p-4 text-on-photo">
            <div className="flex items-center gap-2">
              <span className="grid size-6 place-items-center rounded-full bg-white/15">
                <ChevronDown className="size-3 rotate-180" />
              </span>
              <span className="min-w-0">
                <span className="block truncate text-[0.8rem] font-medium leading-tight">{workspace.name}</span>
                <span className="micro-xs block text-on-photo-soft">{workspace.sub}</span>
              </span>
            </div>

            <div className="mt-4 flex items-center gap-2 rounded-[8px] bg-white/10 px-2.5 py-2">
              <Search className="size-3.5 shrink-0 text-on-photo-soft" />
              <span className="truncate text-[0.7rem] text-on-photo-soft">{workspace.search}</span>
            </div>

            <ul
              className="mt-4 flex flex-col gap-0.5"
              style={{ maskImage: "linear-gradient(to bottom, #000 70%, transparent)", WebkitMaskImage: "linear-gradient(to bottom, #000 70%, transparent)" }}
            >
              {workspace.nav.map((item, index) => (
                <li key={item}>
                  <span
                    className={cn(
                      "flex items-center gap-2.5 rounded-[8px] px-2.5 py-[7px] text-[0.78rem]",
                      index === 0 ? "bg-white/18 font-medium text-on-photo" : "text-on-photo-soft",
                    )}
                  >
                    <span aria-hidden className={cn("size-1.5 rounded-full", index === 0 ? "bg-on-photo" : "bg-white/35")} />
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* -------------------------------------------------- main panel */}
        <div className="bg-panel p-4 sm:p-6">
          <div className="flex items-start justify-between gap-4">
            <div className="flex min-w-0 items-center gap-3">
              <span className="relative size-9 shrink-0 overflow-hidden rounded-full ring-1 ring-ink/10">
                <Image src={profile.profileImage} alt="" fill sizes="36px" placeholder="blur" blurDataURL={BLUR_DATA_URL} className="object-cover" />
              </span>
              <span className="min-w-0">
                <span className="micro-xs block text-ink-soft">{workspace.owner.role}</span>
                <span className="mt-1 block truncate text-[0.9rem] font-medium">{workspace.owner.name}</span>
              </span>
            </div>

            {/* Decorative switch — mirrors the reference's toggle. */}
            <span className="relative mt-1 h-5 w-9 shrink-0 rounded-full bg-ink/85">
              <span className="absolute right-0.5 top-0.5 size-4 rounded-full bg-panel" />
            </span>
          </div>

          <div className="mt-6">
            <p className="micro-xs text-ink-soft">{workspace.primary.label}</p>
            <div className="mt-2 flex flex-wrap items-center gap-3">
              <p className="display-sm text-[clamp(1.6rem,4.4vw,2.35rem)] tabular-nums">
                <Counter value={workspace.primary.value} />
              </p>
              <span className="chip border-transparent bg-butter text-ink">{workspace.primary.delta}</span>
            </div>
          </div>

          <ul className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2">
            {workspace.legend.map((item) => (
              <li key={item.label} className="flex items-center gap-2">
                <span aria-hidden className="size-1.5 rounded-full" style={{ background: item.color }} />
                <span className="text-[0.8rem] font-medium tabular-nums">{item.value}</span>
                <span className="text-[0.75rem] text-ink-soft">{item.label}</span>
              </li>
            ))}
          </ul>

          <div className="relative mt-6">
            <Bars data={workspace.series} height={92} />
            <span className="absolute -top-1 right-1 rounded-[6px] bg-ink px-2 py-1 text-[0.65rem] font-medium tabular-nums text-shell">
              {workspace.tooltip}
            </span>
          </div>

          <div className="rule mt-5 flex items-center justify-center gap-2 pt-4">
            <span className="micro-xs text-ink-soft">{workspace.hint}</span>
            <ArrowDown className="size-3.5 text-ink-soft" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
