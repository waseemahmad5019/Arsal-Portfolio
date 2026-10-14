"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, registerGsap, ScrollTrigger } from "@/lib/gsap";

let lenis: Lenis | null = null;

type ScrollTarget = string | number | HTMLElement;

export type ScrollOptions = {
  offset?: number;
  duration?: number;
  immediate?: boolean;
};

/**
 * Shared smooth-scroll entry point. Every in-page anchor and "back to top"
 * goes through here so behaviour stays consistent and reduced-motion users
 * fall back to native scrolling without Lenis ever mounting.
 */
export function scrollToTarget(target: ScrollTarget, options: ScrollOptions = {}) {
  const { offset = -72, duration = 1.15, immediate = false } = options;

  if (lenis) {
    lenis.scrollTo(target, { offset, duration, immediate });
    return;
  }

  if (typeof window === "undefined") return;

  let el: HTMLElement | null = null;
  if (typeof target === "string") el = document.querySelector<HTMLElement>(target);
  else if (target instanceof HTMLElement) el = target;

  if (el) {
    const top = el.getBoundingClientRect().top + window.scrollY + offset;
    window.scrollTo({ top, behavior: immediate ? "auto" : "smooth" });
  } else if (typeof target === "number") {
    window.scrollTo({ top: target, behavior: immediate ? "auto" : "smooth" });
  }
}

export function scrollToTop(options: ScrollOptions = {}) {
  if (lenis) {
    lenis.scrollTo(0, { duration: 1.2, ...options });
    return;
  }
  window.scrollTo({ top: 0, behavior: "smooth" });
}

/** Stops the page behind modals and overlays. */
export function setScrollLocked(locked: boolean) {
  if (lenis) {
    if (locked) lenis.stop();
    else lenis.start();
  }
  document.documentElement.style.overflow = locked ? "hidden" : "";
}

export default function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    registerGsap();

    const instance = new Lenis({
      duration: 1.05,
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.6,
      // Native smooth scrolling is left to Lenis; anchor jumps are handled in JS.
    });

    lenis = instance;

    const onScroll = () => ScrollTrigger.update();
    instance.on("scroll", onScroll);

    const raf = (time: number) => instance.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    // Section heights settle after fonts and images land — refresh once more.
    const refresh = () => ScrollTrigger.refresh();
    const timer = window.setTimeout(refresh, 600);
    document.fonts?.ready.then(refresh).catch(() => {});

    return () => {
      window.clearTimeout(timer);
      gsap.ticker.remove(raf);
      instance.off("scroll", onScroll);
      instance.destroy();
      lenis = null;
    };
  }, []);

  return <>{children}</>;
}
