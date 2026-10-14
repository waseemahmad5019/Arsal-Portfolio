"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

/* Deterministic mock data visuals. No chart library, no randomness — every
   shape is derived from the numbers passed in, so server and client agree. */

/* ------------------------------------------------------------------ bars */

type BarsProps = {
  data: number[];
  className?: string;
  /** CSS colour for the fill. */
  color?: string;
  height?: number;
};

/** Rounded ascending bars — the hero workspace's activity column. */
export function Bars({ data, className, color = "color-mix(in oklab, var(--color-ink) 20%, transparent)", height = 76 }: BarsProps) {
  const max = Math.max(...data, 1);

  return (
    <div className={cn("flex items-end gap-[3px]", className)} style={{ height }} aria-hidden="true">
      {data.map((value, index) => {
        const ratio = Math.max(value / max, 0.06);
        return (
          <motion.span
            key={index}
            className="flex-1 rounded-[3px]"
            style={{ background: color }}
            initial={{ height: "6%" }}
            whileInView={{ height: `${Math.round(ratio * 100)}%` }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: index * 0.018 }}
          />
        );
      })}
    </div>
  );
}

/* ----------------------------------------------------------------- trend */

type TrendProps = {
  data: number[];
  className?: string;
  stroke?: string;
  fill?: string;
  /** Draws the line on scroll instead of rendering it flat. */
  draw?: boolean;
};

/**
 * Cream polyline over a 45° hatch fill, drawn progressively. The reference uses
 * this on its bronze card; the moving chip is positioned by the parent.
 */
export function Trend({ data, className, stroke = "var(--color-parchment)", fill = "color-mix(in oklab, var(--color-parchment) 34%, transparent)", draw = true }: TrendProps) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const span = max - min || 1;
  const step = 100 / Math.max(data.length - 1, 1);

  const points = data.map((value, index) => {
    const x = index * step;
    const y = 34 - ((value - min) / span) * 26;
    return `${x.toFixed(2)},${y.toFixed(2)}`;
  });

  const line = `M ${points.join(" L ")}`;
  const area = `${line} L 100,40 L 0,40 Z`;

  return (
    <svg viewBox="0 0 100 40" preserveAspectRatio="none" className={cn("h-full w-full", className)} aria-hidden="true">
      <defs>
        <pattern id="hatch" width="4" height="4" patternTransform="rotate(45)" patternUnits="userSpaceOnUse">
          <line x1="0" y1="0" x2="0" y2="4" stroke={fill} strokeWidth="1.6" />
        </pattern>
      </defs>

      <motion.path
        d={area}
        fill="url(#hatch)"
        initial={draw ? { opacity: 0 } : false}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-10% 0px" }}
        transition={{ duration: 0.9, ease: "easeOut", delay: 0.45 }}
      />
      <motion.path
        d={line}
        fill="none"
        stroke={stroke}
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
        initial={draw ? { pathLength: 0 } : false}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true, margin: "-10% 0px" }}
        transition={{ duration: 1.5, ease: [0.4, 0, 0.2, 1] }}
      />
    </svg>
  );
}

/* --------------------------------------------------------------- donut */

type DonutProps = {
  segments: { value: number; color: string }[];
  className?: string;
  thickness?: number;
};

export function Donut({ segments, className, thickness = 12 }: DonutProps) {
  const total = segments.reduce((sum, segment) => sum + segment.value, 0) || 1;
  const stops = segments
    .reduce<{ current: number; stops: string[] }>((acc, segment) => {
      const start = (acc.current / total) * 100;
      acc.current += segment.value;
      const end = (acc.current / total) * 100;
      acc.stops.push(`${segment.color} ${start}% ${end}%`);
      return acc;
    }, { current: 0, stops: [] })
    .stops
    .join(", ");

  return (
    <div
      className={cn("rounded-full", className)}
      style={{
        background: `conic-gradient(${stops})`,
        // Punch the middle out with a radial mask so no extra element is needed.
        maskImage: `radial-gradient(closest-side, transparent calc(100% - ${thickness}px), #000 calc(100% - ${thickness}px))`,
        WebkitMaskImage: `radial-gradient(closest-side, transparent calc(100% - ${thickness}px), #000 calc(100% - ${thickness}px))`,
      }}
      aria-hidden="true"
    />
  );
}

/* --------------------------------------------------------------- meter */

export function Meter({ value, className, color = "var(--color-moss)", track = "color-mix(in oklab, var(--color-ink) 12%, transparent)" }: { value: number; className?: string; color?: string; track?: string }) {
  return (
    <div className={cn("h-1.5 w-full overflow-hidden rounded-full", className)} style={{ background: track }} aria-hidden="true">
      <motion.span
        className="block h-full rounded-full"
        style={{ background: color }}
        initial={{ width: "0%" }}
        whileInView={{ width: `${Math.round(Math.min(Math.max(value, 0), 1) * 100)}%` }}
        viewport={{ once: true, margin: "-10% 0px" }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
      />
    </div>
  );
}
