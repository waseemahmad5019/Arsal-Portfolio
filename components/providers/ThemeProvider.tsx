"use client";

import { createContext, useCallback, useContext, useLayoutEffect, useMemo, useSyncExternalStore } from "react";

export const PALETTES = [
  { id: "studio", label: "Studio", swatch: "#78552f" },
  { id: "linen", label: "Linen", swatch: "#e2c69f" },
  { id: "dusk", label: "Dusk", swatch: "#131312" },
] as const;

export type PaletteId = (typeof PALETTES)[number]["id"];

const STORAGE_KEY = "aw-palette";
const DEFAULT_PALETTE: PaletteId = "studio";

/* ------------------------------------------------------------------ store
 * The active palette lives on <html data-palette>, written before first paint
 * by the inline script below. Treating the DOM as the source of truth means
 * React never has to "catch up" in a mount effect: it subscribes to the same
 * value the browser already painted with.
 * ------------------------------------------------------------------------- */

const listeners = new Set<() => void>();

function subscribe(onChange: () => void) {
  listeners.add(onChange);
  return () => listeners.delete(onChange);
}

function isPaletteId(value: string | undefined): value is PaletteId {
  return Boolean(value) && PALETTES.some((entry) => entry.id === value);
}

function getSnapshot(): PaletteId {
  const current = document.documentElement.dataset.palette;
  return isPaletteId(current) ? current : DEFAULT_PALETTE;
}

const getServerSnapshot = () => DEFAULT_PALETTE;

function readStoredPalette(): PaletteId | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEY) ?? undefined;
    return isPaletteId(stored) ? stored : null;
  } catch {
    return null;
  }
}

type ThemeContextValue = {
  palette: PaletteId;
  index: number;
  cycle: () => void;
  setPalette: (id: PaletteId) => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

export const paletteInitScript = `(function(){try{var p=localStorage.getItem('${STORAGE_KEY}');if(p&&['studio','linen','dusk'].indexOf(p)>-1){document.documentElement.dataset.palette=p}}catch(e){}})();`;

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const palette = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  // React's Strict Mode remount in development resets <html> to the attributes
  // it manages from JSX, wiping the value the inline script wrote. Re-assert the
  // saved palette before paint; this never runs in production.
  useLayoutEffect(() => {
    const stored = readStoredPalette();
    if (!stored || document.documentElement.dataset.palette === stored) return;
    document.documentElement.dataset.palette = stored;
    listeners.forEach((notify) => notify());
  }, []);

  const setPalette = useCallback((id: PaletteId) => {
    document.documentElement.dataset.palette = id;
    try {
      localStorage.setItem(STORAGE_KEY, id);
    } catch {
      /* storage can be blocked — the attribute on <html> still applies */
    }
    listeners.forEach((notify) => notify());
  }, []);

  const index = Math.max(0, PALETTES.findIndex((entry) => entry.id === palette));

  const cycle = useCallback(() => {
    const next = PALETTES[(index + 1) % PALETTES.length];
    setPalette(next.id);
  }, [index, setPalette]);

  const value = useMemo(() => ({ palette, index, cycle, setPalette }), [palette, index, cycle, setPalette]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used inside <ThemeProvider>");
  return ctx;
}
