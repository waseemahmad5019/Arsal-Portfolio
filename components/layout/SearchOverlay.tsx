"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { profile } from "@/data/profile";
import { projects } from "@/data/projects";
import { posts } from "@/data/posts";
import { services } from "@/data/services";
import { scrollToTarget } from "@/components/providers/SmoothScrollProvider";
import { cn } from "@/lib/utils";
import { ArrowRight, Search } from "@/components/ui/Icons";

type SearchEntry = {
  id: string;
  title: string;
  meta: string;
  group: string;
  href: string;
  /** In-page anchors scroll; routes navigate. */
  anchor: boolean;
  keywords: string;
};

type SearchOverlayProps = {
  open: boolean;
  onClose: () => void;
};

/**
 * The panel is mounted only while the overlay is open, so every open starts a
 * fresh session — no effect has to reset the query or the highlighted row.
 */
export default function SearchOverlay({ open, onClose }: SearchOverlayProps) {
  return (
    <AnimatePresence>
      {open ? <SearchPanel key="search-panel" onClose={onClose} /> : null}
    </AnimatePresence>
  );
}

function SearchPanel({ onClose }: { onClose: () => void }) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [cursor, setCursor] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const index = useMemo<SearchEntry[]>(() => {
    const sections: SearchEntry[] = [
      ...profile.nav.map((item) => ({
        id: `section-${item.href}`,
        title: item.label,
        meta: "Section",
        group: "Sections",
        href: item.href,
        anchor: true,
        keywords: `section ${item.label}`,
      })),
      ...profile.footerNav.map((item) => ({
        id: `section-${item.href}`,
        title: item.label,
        meta: "Section",
        group: "Sections",
        href: item.href,
        anchor: true,
        keywords: `section ${item.label}`,
      })),
    ];

    const projectEntries: SearchEntry[] = projects.map((project) => ({
      id: `project-${project.slug}`,
      title: project.title,
      meta: `${project.category} · ${project.year}`,
      group: "Work",
      href: `/work/${project.slug}`,
      anchor: false,
      keywords: `${project.title} ${project.tagline} ${project.category} ${project.stack.join(" ")} ${project.industry}`,
    }));

    const postEntries: SearchEntry[] = posts.map((post) => ({
      id: `post-${post.slug}`,
      title: post.title,
      meta: `${post.category} · ${post.readTime}`,
      group: "Journal",
      href: "#journal",
      anchor: true,
      keywords: `${post.title} ${post.excerpt} ${post.category}`,
    }));

    const serviceEntries: SearchEntry[] = services.map((service) => ({
      id: `service-${service.id}`,
      title: service.title,
      meta: `${service.dot} · Service`,
      group: "Services",
      href: "#services",
      anchor: true,
      keywords: `${service.title} ${service.blurb} ${service.tags.join(" ")}`,
    }));

    return [...sections, ...projectEntries, ...postEntries, ...serviceEntries];
  }, []);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return index.filter((entry) => entry.group === "Sections").concat(index.slice(0, 6));
    return index
      .filter((entry) => entry.keywords.toLowerCase().includes(q) || entry.title.toLowerCase().includes(q))
      .slice(0, 12);
  }, [index, query]);

  // Focus the field as soon as the panel exists, and hold the page still behind it.
  useEffect(() => {
    inputRef.current?.focus();
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key === "ArrowDown") {
        event.preventDefault();
        setCursor((c) => (results.length ? (c + 1) % results.length : 0));
      }
      if (event.key === "ArrowUp") {
        event.preventDefault();
        setCursor((c) => (results.length ? (c - 1 + results.length) % results.length : 0));
      }
      if (event.key === "Enter") {
        const hit = results[cursor];
        if (!hit) return;
        event.preventDefault();
        onClose();
        if (hit.anchor) scrollToTarget(hit.href);
        else router.push(hit.href);
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [results, cursor, onClose, router]);

  const activate = (entry: SearchEntry) => {
    onClose();
    if (entry.anchor) scrollToTarget(entry.href);
    else router.push(entry.href);
  };

  return (
    <motion.div
      className="fixed inset-0 z-[360] bg-ink/70 backdrop-blur-md"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Search"
    >
      <motion.div
        className="mx-auto mt-[12vh] w-[min(680px,92vw)] overflow-hidden rounded-3xl bg-cream shadow-2xl"
        initial={{ y: -24, opacity: 0, scale: 0.98 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: -16, opacity: 0, scale: 0.99 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-center gap-3 border-b border-ink/10 px-5 py-4">
          <Search className="size-5 shrink-0 text-ink/45" />
          <input
            ref={inputRef}
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setCursor(0);
            }}
            placeholder="Search projects, services, journal…"
            className="w-full bg-transparent text-[0.98rem] outline-none placeholder:text-ink/40"
            aria-label="Search query"
            aria-controls="search-results"
            aria-activedescendant={results[cursor] ? `search-${results[cursor].id}` : undefined}
          />
          <kbd className="hidden rounded-md border border-ink/15 px-1.5 py-0.5 text-[0.62rem] font-medium text-ink/50 sm:block">ESC</kbd>
        </div>

        <ul id="search-results" role="listbox" aria-label="Search results" className="max-h-[52vh] overflow-y-auto p-2">
          {results.length === 0 ? (
            <li className="px-4 py-10 text-center text-sm text-ink/50">
              Nothing matched “{query}”. Try “topical”, “eBay” or “audit”.
            </li>
          ) : (
            results.map((entry, i) => (
              <li key={entry.id} role="option" aria-selected={i === cursor} id={`search-${entry.id}`}>
                <button
                  type="button"
                  onMouseEnter={() => setCursor(i)}
                  onClick={() => activate(entry)}
                  className={cn(
                    "flex w-full items-center justify-between gap-4 rounded-2xl px-4 py-3 text-left transition-colors",
                    i === cursor ? "bg-ink text-shell" : "hover:bg-ink/[0.05]",
                  )}
                >
                  <span className="min-w-0">
                    <span className="block truncate text-[0.95rem] font-medium">{entry.title}</span>
                    <span className={cn("micro mt-1 block", i === cursor ? "text-shell/70" : "text-ink-soft")}>{entry.meta}</span>
                  </span>
                  <span className="flex shrink-0 items-center gap-2">
                    <span className={cn("micro", i === cursor ? "text-shell/70" : "text-ink-soft/70")}>{entry.group}</span>
                    <ArrowRight className="size-4 opacity-60" />
                  </span>
                </button>
              </li>
            ))
          )}
        </ul>

        <div className="flex items-center justify-between gap-3 border-t border-ink/10 px-5 py-3">
          <span className="micro text-ink/40">↑ ↓ to move · ↵ to open</span>
          <button type="button" onClick={onClose} className="micro text-ink/50 hover:text-ink">
            Close
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
