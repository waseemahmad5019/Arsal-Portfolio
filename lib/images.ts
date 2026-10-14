/**
 * Single source of truth for imagery.
 *
 * Everything routes through `img()` so the whole site can be re-pointed at your own
 * photography in one place. Replace the body of `img()` with e.g.
 *
 *   return `/images/${seed}.jpg`;
 *
 * once your files live in /public/images, then delete the `images.remotePatterns`
 * block from next.config.ts.
 */
export function img(seed: string, width: number, height: number): string {
  const safe = seed.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  return `https://picsum.photos/seed/${safe}/${width}/${height}`;
}

/** Portrait crop helper (4:5-ish), the most common shape on the site. */
export function portrait(seed: string, width = 900) {
  return img(seed, width, Math.round(width * 1.25));
}

/** Tall editorial crop for the lookbook and slider. */
export function editorial(seed: string, width = 900) {
  return img(seed, width, Math.round(width * 1.45));
}

const BLUR_SVG =
  '<svg xmlns="http://www.w3.org/2000/svg" width="8" height="10"><rect width="8" height="10" fill="#EAEAE8"/></svg>';

/** Neutral cream shimmer used as `blurDataURL` across next/image instances. */
export const BLUR_DATA_URL = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(BLUR_SVG)}`;

/** Arch shapes reused by next/image wrappers and plain divs. */
export const ARCH_RADIUS = "999px 999px 22px 22px";

/* ------------------------------------------------------------------ *
 * Hero image sequence (optional feature).
 * Drop 91 frames into /public/sequence/0001.webp … 0091.webp, set
 * `hero.sequence.enabled = true` in data/profile.ts and the hero swaps
 * from a still image to a cursor-scrubbed frame sequence.
 * ------------------------------------------------------------------ */
export const SEQUENCE_FRAME_COUNT = 91;

export function sequenceFrame(index: number): string {
  const n = String(Math.min(Math.max(index, 0), SEQUENCE_FRAME_COUNT - 1) + 1).padStart(4, "0");
  return `/sequence/${n}.webp`;
}
