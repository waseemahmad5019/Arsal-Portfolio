"use client";

import { createContext, useContext, useEffect, useMemo, useSyncExternalStore } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { profile } from "@/data/profile";

type IntroContextValue = {
  /** True once the intro curtain has finished (or was skipped). */
  done: boolean;
};

const IntroContext = createContext<IntroContextValue>({ done: true });

export function useIntro() {
  return useContext(IntroContext);
}

const SESSION_KEY = "aw-intro-played";

/* ------------------------------------------------------------------ store
 * Whether the curtain should play depends on sessionStorage and the motion
 * preference — neither exists on the server. Modelling it as an external store
 * means the server (and the hydrating client) render "no curtain", then the
 * real answer arrives straight after hydration, with no mount-effect writes.
 * ------------------------------------------------------------------------- */

const listeners = new Set<() => void>();

/** Cleared for the rest of the session once the curtain has run. */
let playedThisSession = false;

function subscribe(onChange: () => void) {
  listeners.add(onChange);
  return () => listeners.delete(onChange);
}

let motionQuery: MediaQueryList | null = null;

function prefersReducedMotion() {
  if (!motionQuery) motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  return motionQuery.matches;
}

function getSnapshot() {
  if (playedThisSession) return false;
  if (prefersReducedMotion()) return false;
  try {
    return sessionStorage.getItem(SESSION_KEY) !== "1";
  } catch {
    return false;
  }
}

const getServerSnapshot = () => false;

function markPlayed() {
  playedThisSession = true;
  try {
    sessionStorage.setItem(SESSION_KEY, "1");
  } catch {
    /* private mode can refuse storage — the intro simply replays next time */
  }
  listeners.forEach((notify) => notify());
}

export default function IntroProvider({ children }: { children: React.ReactNode }) {
  // Starts false so the site is never hidden from crawlers or no-JS visitors;
  // the store decides whether to play the animation at all.
  const playing = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const done = !playing;

  useEffect(() => {
    if (!playing) return;

    document.documentElement.style.overflow = "hidden";
    const timer = window.setTimeout(() => {
      document.documentElement.style.overflow = "";
      markPlayed();
    }, 2050);

    return () => {
      window.clearTimeout(timer);
      document.documentElement.style.overflow = "";
    };
  }, [playing]);

  // Only a curtain that actually ran claims the session — writing the marker on
  // mount would cancel the very intro we are about to play.
  const letters = useMemo(() => profile.wordmark.split(""), []);

  const value = useMemo(() => ({ done }), [done]);

  return (
    <IntroContext.Provider value={value}>
      {children}

      <AnimatePresence>
        {playing ? (
          <motion.div
            className="fixed inset-0 z-[600] grid place-items-center bg-shell"
            initial={{ clipPath: "inset(0% 0% 0% 0%)" }}
            exit={{ clipPath: "inset(0% 0% 100% 0%)" }}
            transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1], delay: 0.1 }}
            aria-hidden="true"
          >
            <div className="flex flex-col items-center px-6">
              <span className="display flex text-[clamp(2.1rem,10vw,6.5rem)] tracking-[0.02em]">
                {letters.map((letter, index) => (
                  <motion.span
                    key={`${letter}-${index}`}
                    className="inline-block"
                    initial={{ y: "115%", opacity: 0 }}
                    animate={{ y: "0%", opacity: 1 }}
                    transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1], delay: 0.1 + index * 0.035 }}
                  >
                    {letter === " " ? "\u00A0" : letter}
                  </motion.span>
                ))}
              </span>

              <motion.span
                className="micro mt-5 text-ink-soft"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.95, duration: 0.6 }}
              >
                {profile.tagline}
              </motion.span>

              <motion.span
                className="mt-10 block h-px bg-ink/15"
                initial={{ width: 0 }}
                animate={{ width: 180 }}
                transition={{ delay: 0.4, duration: 1.3, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </IntroContext.Provider>
  );
}
