"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { usePrefersReducedMotion } from "@/lib/hooks/usePrefersReducedMotion";

type CounterProps = {
  value: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  /** Renders the number as-is without counting up (e.g. a year). */
  plain?: boolean;
  className?: string;
};

/** Scroll-triggered count-up used by the stats strip. */
export default function Counter({ value, prefix = "", suffix = "", duration = 1500, plain = false, className }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });
  const reduce = usePrefersReducedMotion();
  const [counted, setCounted] = useState(0);

  // Years and reduced-motion visitors skip the animation entirely — the final
  // number is derived rather than written into state from an effect body.
  const settled = plain || reduce;

  useEffect(() => {
    if (!inView || settled) return;

    let raf = 0;
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      // easeOutExpo — fast out of the gate, settles gently on the number.
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCounted(Math.round(eased * value));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, settled, value, duration]);

  const display = settled ? value : counted;

  return (
    <span ref={ref} className={className}>
      {prefix}
      {display.toLocaleString("en-US")}
      {suffix}
    </span>
  );
}
