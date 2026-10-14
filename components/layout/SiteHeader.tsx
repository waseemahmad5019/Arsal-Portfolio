"use client";

import { useCallback, useEffect, useState } from "react";
import Navbar from "@/components/layout/Navbar";
import SearchOverlay from "@/components/layout/SearchOverlay";

/** Owns the search overlay so the navbar button and ⌘K share one instance. */
export default function SiteHeader() {
  const [searchOpen, setSearchOpen] = useState(false);

  const openSearch = useCallback(() => setSearchOpen(true), []);
  const closeSearch = useCallback(() => setSearchOpen(false), []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setSearchOpen((open) => !open);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <Navbar onOpenSearch={openSearch} />
      <SearchOverlay open={searchOpen} onClose={closeSearch} />
    </>
  );
}
