"use client";

import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { profile } from "@/data/profile";
import { PALETTES, useTheme } from "@/components/providers/ThemeProvider";
import { scrollToTarget } from "@/components/providers/SmoothScrollProvider";
import LocalTime from "@/components/ui/LocalTime";
import { ButtonPill } from "@/components/ui/Surface";
import { openResumeDialog } from "@/components/ui/ResumeDialog";
import { cn } from "@/lib/utils";
import { Close, Download, Menu, Palette, Search } from "@/components/ui/Icons";

/* The little arc-and-dot mark that sits before the wordmark. */
function ArcMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeLinecap="round" className={className} aria-hidden focusable="false">
      <path
        d="M6.2 18.5c.4-6.2 4.5-10.2 10-10.2 5.5 0 9.6 4 10 10.2"
        strokeWidth="2"
        opacity="0.4"
      />
      <path
        d="M5.8 20.2c1.4-6.8 5.6-11.2 11.4-11.2 5.8 0 10 4.4 11.4 11.2"
        strokeWidth="1.8"
      />
      <circle cx="8.5" cy="20.5" r="1.8" fill="currentColor" stroke="none" />
      <circle cx="6.8" cy="17.8" r="1" fill="currentColor" stroke="none" opacity="0.6" />
    </svg>
  );
}

type NavbarProps = {
  onOpenSearch: () => void;
};

export default function Navbar({ onOpenSearch }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("#home");
  const { index: paletteIndex, cycle } = useTheme();

  /* --- the header flips from translucent light to solid ink on first scroll */
  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        setScrolled(window.scrollY > 32);
        raf = 0;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  /* --- highlight the section currently in view ------------------------- */
  useEffect(() => {
    const ids = [...profile.nav, ...profile.footerNav].map((item) => item.href.replace("#", ""));
    const sections = Array.from(new Set(ids))
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(`#${visible.target.id}`);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.25, 0.5, 1] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  /* --- lock the page while the mobile drawer is open ------------------- */
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    document.documentElement.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  const go = useCallback((href: string) => {
    setMenuOpen(false);
    scrollToTarget(href);
  }, []);

  const onDark = scrolled;

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[400] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-sm focus:text-shell"
      >
        Skip to content
      </a>

      <header
        className={cn(
          "fixed inset-x-0 top-0 z-[300] transition-[background-color,color,backdrop-filter] duration-700 ease-out",
          onDark ? "bg-night text-on-photo" : "bg-shell/70 text-ink backdrop-blur-md",
        )}
      >
        <nav className="wrap flex h-[72px] items-center justify-between gap-4" aria-label="Primary">
          {/* ------------------------------------------------- wordmark */}
          <a
            href="#home"
            onClick={(event) => {
              event.preventDefault();
              go("#home");
            }}
            className="flex shrink-0 items-center gap-2.5"
            data-cursor="TOP"
            aria-label={`${profile.name} — home`}
          >
            <ArcMark className="size-[22px]" />
            <span className="text-[1.02rem] font-medium tracking-[0.12em] uppercase">{profile.wordmarkLower}</span>
          </a>

          {/* ------------------------------------------------- centre links */}
          <ul className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-7 lg:flex">
            {profile.nav.map((item) => {
              const isActive = active === item.href;
              return (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={(event) => {
                      event.preventDefault();
                      go(item.href);
                    }}
                    className={cn(
                      "micro text-[0.7rem] transition-opacity duration-300",
                      onDark ? "text-on-photo" : "text-ink",
                      isActive ? "opacity-100" : "opacity-55 hover:opacity-100",
                    )}
                    aria-current={isActive ? "true" : undefined}
                  >
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>

          {/* ------------------------------------------------- utilities */}
          <div className="flex shrink-0 items-center gap-1.5">
            <div className={cn("hidden md:flex")} aria-hidden="true"></div>

            <button
              type="button"
              onClick={onOpenSearch}
              className={cn(
                "grid size-9 place-items-center rounded-full transition-colors",
                onDark ? "text-on-photo-soft hover:bg-white/10 hover:text-on-photo" : "text-ink-soft hover:bg-ink/[0.06] hover:text-ink",
              )}
              aria-label="Search projects, services and journal"
              title="Search"
            >
              <Search className="size-[18px]" />
            </button>

            <button
              type="button"
              onClick={cycle}
              className={cn(
                "hidden size-9 place-items-center rounded-full transition-colors md:grid",
                onDark ? "text-on-photo-soft hover:bg-white/10 hover:text-on-photo" : "text-ink-soft hover:bg-ink/[0.06] hover:text-ink",
              )}
              aria-label={`Change colour palette (current: ${PALETTES[paletteIndex]?.label})`}
              title={`Palette: ${PALETTES[paletteIndex]?.label}`}
            >
              <Palette className="size-[18px]" />
            </button>

            <motion.div
              className={cn("hidden md:flex", !scrolled && "pointer-events-none")}
              animate={{ opacity: scrolled ? 1 : 0, y: scrolled ? 0 : -6 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              initial={{ opacity: 0, y: -6 }}
              aria-hidden={!scrolled}
            >
              <ButtonPill
                variant={onDark ? "light" : "dark"}
                size="md"
                cursor="CV"
                onClick={() => openResumeDialog()}
                title="Preview résumé"
              >
                <Download className="size-4" />
                Résumé
              </ButtonPill>
            </motion.div>

            <ButtonPill variant={onDark ? "light" : "dark"} badge cursor="SAY HI" onClick={() => go("#contact")} className="hidden sm:inline-flex">
              Hire me
            </ButtonPill>

            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              className={cn(
                "grid size-9 place-items-center rounded-full transition-colors",
                onDark ? "text-on-photo hover:bg-white/10" : "text-ink hover:bg-ink/[0.06]",
              )}
              aria-label="Open menu"
              aria-expanded={menuOpen}
            >
              <Menu className="size-5" />
            </button>
          </div>
        </nav>
      </header>

      {/* ------------------------------------------------------ mobile drawer */}
      {menuOpen ? (
        <motion.div
          className="fixed inset-0 z-[350] bg-night text-on-photo lg:hidden"
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
        >
          <div className="wrap flex h-full flex-col pb-10 pt-[18px]">
            <div className="flex h-9 items-center justify-between">
              <span className="micro text-on-photo-soft">Menu</span>
              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                className="grid size-9 place-items-center rounded-full border border-white/20"
                aria-label="Close menu"
              >
                <Close className="size-4" />
              </button>
            </div>

            <ul className="mt-12 flex flex-col">
              {[...profile.nav, ...profile.footerNav].map((item, i) => (
                <motion.li
                  key={item.href}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.06 + i * 0.04, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="border-b border-white/10"
                >
                  <a
                    href={item.href}
                    onClick={(event) => {
                      event.preventDefault();
                      go(item.href);
                    }}
                    className="display block py-4 text-[clamp(1.75rem,9vw,2.6rem)]"
                  >
                    {item.label}
                  </a>
                </motion.li>
              ))}
            </ul>

            <div className="mt-auto flex flex-col gap-4">
              <div className="flex flex-wrap items-center gap-2">
                <ButtonPill variant="light" badge cursor="SAY HI" onClick={() => go("#contact")}>
                  Hire me
                </ButtonPill>
                <ButtonPill variant="photo" cursor="CV" onClick={() => openResumeDialog()}>
                  <Download className="size-4" />
                  Résumé
                </ButtonPill>
                <ButtonPill
                  variant="photo"
                  onClick={cycle}
                  aria-label={`Change colour palette (current: ${PALETTES[paletteIndex]?.label})`}
                >
                  <Palette className="size-4" />
                  {PALETTES[paletteIndex]?.label}
                </ButtonPill>
              </div>
              <p className="micro text-on-photo-soft">{profile.availability}</p>
            </div>
          </div>
        </motion.div>
      ) : null}
    </>
  );
}
