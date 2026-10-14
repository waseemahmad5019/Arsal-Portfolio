# Arsal Waseem — Portfolio

A single-page, editorial-fashion portfolio for **Arsal Waseem**, Semantic SEO Executive
and e-commerce operations specialist. Built with Next.js (App Router), TypeScript,
Tailwind CSS v4, Framer Motion, GSAP ScrollTrigger and Lenis.

Every piece of copy, every link and every number lives in `data/`, so the whole site can
be re-skinned without touching a component.

---

## Quick start

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm run start      # serve the production build
npm run lint       # eslint (flat config)
```

Node 20+ recommended (developed on Node 24). No environment variables are required to
run the site as shipped.

> **Memory note.** The production build runs on Turbopack, which spawns helper
> processes. On a machine that is low on memory, avoid setting
> `NODE_OPTIONS=--max-old-space-size=…` to a large value — every spawned subprocess
> inherits it and the build can abort with `Zone Allocation failed`. The default heap
> is fine.

---

## Project structure

```
app/
  layout.tsx            fonts, metadata, Person JSON-LD, provider nesting
  page.tsx              the 15 home-page sections, in order
  globals.css           the whole design system (tokens, palettes, motion helpers)
  work/[slug]/page.tsx  project detail template (generateStaticParams)
  api/contact/route.ts  contact form endpoint (validation only — see below)
  sitemap.ts robots.ts opengraph-image.tsx icon.svg not-found.tsx
components/
  sections/             the 15 home-page sections
  layout/               Navbar, Footer, SearchOverlay, CustomCursor, ContactForm
  providers/            Theme (palette), Intro curtain, Smooth scroll, MotionConfig
  ui/                   primitives: headings, marquee, ghost text, counter, arch image…
  work/                 ProjectShowcase — the drag-to-rotate detail view
data/                   profile.ts, projects.ts, services.ts, posts.ts, site.ts
lib/                    images.ts (imagery), gsap.ts, utils.ts, hooks/
public/                 images/profile.jpg, resume.pdf (the only real local assets)
```

---

## Where to edit things

| What you want to change | File |
| --- | --- |
| Name, title, bio, contact details, nav, stats | `data/profile.ts` |
| Timeline / experience entries | `data/profile.ts` → `experience` |
| Projects, work rail, feature, lookbook, categories | `data/projects.ts` |
| The six skill cards ("Six moods") | `data/services.ts` |
| Journal posts | `data/posts.ts` |
| Colours, type scale, palettes, cursor | `app/globals.css` |
| Page title / description / keywords | `data/profile.ts` → `seo` |

### Placeholders to fill in

Search the repo for `[` and `TODO`. The short list:

1. **`data/profile.ts` → `linkedin`** — currently `"[LINKEDIN URL]"`. Until it starts with
   `http`, the UI falls back to the contact section instead of a broken link. Once set, it
   is also emitted in the Person JSON-LD `sameAs` array.
2. **`data/profile.ts` → `experience` → `mti-holdings` → `bullets`** — three
   `[BULLET …]` placeholders, because the source CV lists no detail for that internship.
3. **`data/profile.ts` → `seo.siteUrl`** — set this to the production domain. It feeds
   `metadataBase`, canonical URLs, `sitemap.xml`, `robots.txt` and the OG image.
4. **`data/profile.ts` → `experience` → `walmart`** — ships **unpublished**
   (`published: false`) because the CV does not mention Walmart. Fill in the fields and
   flip `published: true` to put it on the timeline. Unpublished entries are excluded
   from both the page and the JSON-LD.
5. **`data/profile.ts` → `bio` / `jobTitle` / `hero.typing`** — drafted from the CV.
   Rewrite in your own voice.
6. **`data/services.ts`** and **`data/projects.ts`** — the six cards and the project
   entries were drafted from the CV. Replace the copy, and point each project at a real
   case study.
7. **`app/api/contact/route.ts`** — the form validates the payload and returns `ok`,
   but nothing is sent anywhere yet. Add a provider call at the `TODO`.

---

## Imagery

All photography is currently remote, deterministic [Picsum](https://picsum.photos)
imagery so the layout looks finished with real photos before you have your own. It all
funnels through **one function**:

```ts
// lib/images.ts
export function img(seed: string, width: number, height: number): string { … }
```

To switch to your own files:

1. Put your images in `public/images/` (e.g. `public/images/hero.jpg`).
2. Change the body of `img()` to return `` `/images/${seed}.jpg` `` (the seed is already
   slugified).
3. Delete the `images.remotePatterns` block from `next.config.ts`.

The only real local assets today are `public/images/profile.jpg` (the round navbar badge
and the arch portrait in the About block) and `public/resume.pdf`.

### Optional hero image sequence

`components/ui/SequenceScrubber.tsx` can turn the hero arch into a cursor-scrubbed frame
sequence. It is **disabled** by default (`profile.hero.sequence.enabled = false`), and it
falls back to a still arch image if a frame fails to load.

To enable: drop 91 frames (`0001.webp` … `0091.webp`) into `public/sequence/`, then set
`enabled: true` in `data/profile.ts`. Frame count is `SEQUENCE_FRAME_COUNT` in
`lib/images.ts`.

---

## Résumé / CV

* `public/resume.pdf` is served with inline `Content-Disposition` via `next.config.ts`.
* The hero offers **Download Résumé** and **View my CV** (the latter opens an in-page
  dialog with an `<iframe>` preview).
* Replace `public/resume.pdf` to update both, and update `profile.resumeLabel` if you
  want different wording.

---

## Design system

`app/globals.css` holds everything:

* **Palettes.** Three runtime palettes — `studio`, `dusk`, `noir` — applied as
  `data-palette` on `<html>`, overriding the `--color-*` tokens from `@theme`. The choice
  is written to `localStorage` and re-applied before first paint by an inline script in
  `app/layout.tsx`, so there is no flash of the wrong theme.
* **Type.** Anton (condensed display), Instrument Serif (italic accent word), Inter
  (body), all via `next/font`.
* **Helpers.** `.display`, `.offset-text` (coloured heading shadow), `.serif-accent`,
  `.micro` (tracked uppercase label), `.ghost` (giant outlined drift text), `.arch`,
  `.grain`, `.pill`, `.chip`, `.tilted`, plus marquee/caret/float keyframes.
* **Custom cursor.** `components/layout/CustomCursor.tsx` — a lime disc with easing and
  contextual labels (`DRAG` / `VIEW` / `PLAY` via `data-cursor`). It only mounts for
  fine-pointer devices with motion enabled.
* **Drag instead of a slider library.** Horizontal rails use
  `lib/hooks/useDragScroll.ts` layered over a real `overflow-x` container, so keyboard
  and trackpad scrolling still work.

---

## Accessibility

* One `<h1>`; sections are labelled and use `<section aria-labelledby>`.
* The animated headline keeps a `sr-only` copy of the full sentence.
* Reduced motion is respected everywhere: `MotionConfig reducedMotion="user"`, the
  `usePrefersReducedMotion` hook, and `prefers-reduced-motion` overrides in CSS. Lenis
  smoothing is skipped entirely, the typewriter/counters render their final values, and
  the intro curtain does not play.
* Visible focus states, a skip link, `Escape` handling, and `aria-modal` on the search
  dialog and overlays.
* The custom cursor never replaces the real one — it hides on touch.

---

## SEO

* `metadata` / Open Graph / Twitter cards from `data/profile.ts` → `seo`.
* Generated `sitemap.xml` and `robots.txt` (`app/sitemap.ts`, `app/robots.ts`).
* Generated Open Graph image via `next/og` (`app/opengraph-image.tsx`).
* `Person` JSON-LD with `hasOccupation` built from the published experience entries.
* `next/image` with AVIF + WebP, explicit `sizes`, and a shared cream blur placeholder.

---

## Deploying to Vercel

1. Push the repository to GitHub/GitLab.
2. Import it at [vercel.com/new](https://vercel.com/new) — the defaults are correct
   (build `npm run build`, output handled by the framework preset).
3. Before the first production deploy, set `seo.siteUrl` in `data/profile.ts` to the real
   domain so canonical URLs, the sitemap and the OG image point at the right host.
4. Add your domain under **Settings → Domains**, then redeploy.

The contact API route runs as a Node serverless function. If you add a provider
(Resend, Postmark, Formspree…), set its key as an environment variable in
**Settings → Environment Variables** and read it from `process.env` in the route.

---

## Gotchas worth knowing

* **Do not remove the `turbopack.rules` block from `next.config.ts`.** Tailwind v4 is
  wired in through `@tailwindcss/turbopack`; without it `@theme` fails to resolve and the
  site renders unstyled.
* Next 16 makes `params` a `Promise` — pages `await` it.
* Anything rendered in `app/layout.tsx` is a server component. Components with event
  handlers (`ResumeDialog`, for example) must carry `"use client"`, or prerendering fails
  with *"Event handlers cannot be passed to Client Component props."*
