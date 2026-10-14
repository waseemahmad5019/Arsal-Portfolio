import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Merge conditional class names, resolving conflicting Tailwind utilities. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Clamp a number between a min and a max. */
export function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

/** Map a value from one range to another, clamped to the output range. */
export function mapRange(value: number, inMin: number, inMax: number, outMin: number, outMax: number) {
  if (inMax - inMin === 0) return outMin;
  const t = clamp((value - inMin) / (inMax - inMin), 0, 1);
  return outMin + t * (outMax - outMin);
}

/** Linear interpolation — used by the custom cursor and scroll-driven parallax. */
export function lerp(from: number, to: number, amount: number) {
  return from + (to - from) * amount;
}

/** "01" → 1, "12" → 12. Used by the numbered captions and range lists. */
export function pad(index: number, length = 2) {
  return String(index).padStart(length, "0");
}

/** Zero-padded counter that wraps, for carousels. */
export function wrap(index: number, length: number) {
  return ((index % length) + length) % length;
}
