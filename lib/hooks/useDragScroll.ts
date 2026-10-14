"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type UseDragScrollResult<T extends HTMLElement> = {
  ref: React.RefObject<T | null>;
  dragging: boolean;
  /** 0 → 1 progress through the scrollable range. */
  progress: number;
  atStart: boolean;
  atEnd: boolean;
  scrollByPage: (direction: 1 | -1) => void;
  scrollToIndex: (index: number) => void;
};

/**
 * Pointer-drag scrolling with momentum, layered on top of a real overflow
 * container. Keeping the native scroller means keyboard, screen readers and
 * touch all work for free — we only add the mouse-drag feel.
 */
export function useDragScroll<T extends HTMLElement>(itemSelector = "[data-drag-item]"): UseDragScrollResult<T> {
  const ref = useRef<T>(null);
  const [dragging, setDragging] = useState(false);
  const [progress, setProgress] = useState(0);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);
  const draggedRef = useRef(false);
  const momentumRef = useRef(0);

  const sync = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setProgress(max > 0 ? el.scrollLeft / max : 0);
    setAtStart(el.scrollLeft <= 2);
    setAtEnd(el.scrollLeft >= max - 2);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let pointerId: number | null = null;
    let startX = 0;
    let startScroll = 0;
    let lastX = 0;
    let lastTime = 0;
    let velocity = 0;

    const stopMomentum = () => {
      if (momentumRef.current) {
        cancelAnimationFrame(momentumRef.current);
        momentumRef.current = 0;
      }
    };

    const onDown = (event: PointerEvent) => {
      // Touch and pen use native scrolling; only mouse drag is emulated.
      if (event.pointerType !== "mouse" || event.button !== 0) return;
      const target = event.target as HTMLElement | null;
      // Let interactive controls (arrows, selectable chips) keep their clicks.
      if (target?.closest("button, a, input, [data-no-drag]")) return;

      stopMomentum();
      pointerId = event.pointerId;
      startX = event.clientX;
      startScroll = el.scrollLeft;
      lastX = event.clientX;
      lastTime = performance.now();
      velocity = 0;
      draggedRef.current = false;
      setDragging(true);
      el.setPointerCapture?.(event.pointerId);
    };

    const onMove = (event: PointerEvent) => {
      if (pointerId === null || event.pointerId !== pointerId) return;
      const dx = event.clientX - startX;
      if (Math.abs(dx) > 4) draggedRef.current = true;
      el.scrollLeft = startScroll - dx;

      const now = performance.now();
      const dt = now - lastTime || 16;
      velocity = (event.clientX - lastX) / dt;
      lastX = event.clientX;
      lastTime = now;
    };

    const endDrag = (event: PointerEvent) => {
      if (pointerId === null || event.pointerId !== pointerId) return;
      pointerId = null;
      setDragging(false);
      el.releasePointerCapture?.(event.pointerId);

      // Momentum: keep gliding, decaying by 6% per frame.
      let v = velocity * 16;
      if (Math.abs(v) < 1) return;
      const glide = () => {
        v *= 0.94;
        el.scrollLeft -= v;
        if (Math.abs(v) > 0.4) {
          momentumRef.current = requestAnimationFrame(glide);
        } else {
          momentumRef.current = 0;
        }
      };
      momentumRef.current = requestAnimationFrame(glide);
    };

    // Swallow the click that follows a drag so cards don't navigate.
    const onClickCapture = (event: MouseEvent) => {
      if (!draggedRef.current) return;
      event.preventDefault();
      event.stopPropagation();
      draggedRef.current = false;
    };

    el.addEventListener("pointerdown", onDown);
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerup", endDrag);
    el.addEventListener("pointercancel", endDrag);
    el.addEventListener("click", onClickCapture, true);
    el.addEventListener("scroll", sync, { passive: true });
    window.addEventListener("resize", sync);

    sync();

    return () => {
      stopMomentum();
      el.removeEventListener("pointerdown", onDown);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerup", endDrag);
      el.removeEventListener("pointercancel", endDrag);
      el.removeEventListener("click", onClickCapture, true);
      el.removeEventListener("scroll", sync);
      window.removeEventListener("resize", sync);
    };
  }, [sync]);

  const scrollToIndex = useCallback(
    (index: number) => {
      const el = ref.current;
      if (!el) return;
      const items = Array.from(el.querySelectorAll<HTMLElement>(itemSelector));
      const item = items[Math.max(0, Math.min(index, items.length - 1))];
      if (!item) return;
      el.scrollTo({ left: item.offsetLeft - el.offsetLeft, behavior: "smooth" });
    },
    [itemSelector],
  );

  const scrollByPage = useCallback((direction: 1 | -1) => {
    const el = ref.current;
    if (!el) return;
    el.scrollBy({ left: direction * el.clientWidth * 0.82, behavior: "smooth" });
  }, []);

  return { ref, dragging, progress, atStart, atEnd, scrollByPage, scrollToIndex };
}
