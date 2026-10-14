"use client";

import { useSyncExternalStore } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

function subscribe(onChange: () => void) {
  const media = window.matchMedia(QUERY);
  media.addEventListener("change", onChange);
  return () => media.removeEventListener("change", onChange);
}

const getSnapshot = () => window.matchMedia(QUERY).matches;

/** Assume motion is off on the server so first paint and hydration always agree. */
const getServerSnapshot = () => true;

/**
 * Reads the visitor's motion preference as an external store rather than from
 * inside an effect. That keeps mount free of cascading renders and gives SSR a
 * stable answer: the server (and the hydrating client) see "reduced", then the
 * real preference is picked up straight after.
 */
export function usePrefersReducedMotion() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
