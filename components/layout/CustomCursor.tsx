"use client";

import { useEffect, useRef } from "react";

/**
 * Lime circle that trails the pointer with easing and reads its label from the
 * nearest `[data-cursor]` ancestor — e.g. `data-cursor="DRAG"`.
 *
 * Only mounts for fine pointers on devices that support hover, and stays out of
 * the way entirely for reduced-motion users (the native cursor is restored).
 */
export default function CustomCursor() {
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ring = ringRef.current;
    const dot = dotRef.current;
    const label = labelRef.current;
    if (!fine || reduce || !ring || !dot || !label) return;

    document.documentElement.dataset.cursor = "on";

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;
    let dotX = mouseX;
    let dotY = mouseY;
    let raf = 0;
    let visible = false;
    let pressed = false;

    const render = () => {
      // The ring eases; the dot tracks almost exactly so precision is never lost.
      ringX += (mouseX - ringX) * 0.16;
      ringY += (mouseY - ringY) * 0.16;
      dotX += (mouseX - dotX) * 0.55;
      dotY += (mouseY - dotY) * 0.55;

      const scale = pressed ? 0.86 : 1;
      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) scale(${scale})`;
      dot.style.transform = `translate3d(${dotX}px, ${dotY}px, 0)`;

      raf = window.requestAnimationFrame(render);
    };

    const show = () => {
      if (visible) return;
      visible = true;
      ring.style.opacity = "1";
      dot.style.opacity = "1";
    };

    const hide = () => {
      visible = false;
      ring.style.opacity = "0";
      dot.style.opacity = "0";
    };

    const onMove = (event: PointerEvent) => {
      mouseX = event.clientX;
      mouseY = event.clientY;
      show();
    };

    const onOver = (event: PointerEvent) => {
      const target = (event.target as HTMLElement | null)?.closest<HTMLElement>("[data-cursor]");
      const text = target?.dataset.cursor?.trim();

      if (text && text !== "true") {
        label.textContent = text;
        ring.dataset.active = "true";
      } else if (target) {
        label.textContent = "";
        ring.dataset.active = "true";
      } else {
        ring.dataset.active = "false";
        label.textContent = "";
      }
    };

    const onDown = () => {
      pressed = true;
    };
    const onUp = () => {
      pressed = false;
    };

    ring.style.opacity = "0";
    dot.style.opacity = "0";
    raf = window.requestAnimationFrame(render);

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerover", onOver, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    window.addEventListener("pointerup", onUp, { passive: true });
    document.addEventListener("mouseleave", hide);
    window.addEventListener("blur", hide);

    return () => {
      window.cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onOver);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      document.removeEventListener("mouseleave", hide);
      window.removeEventListener("blur", hide);
      delete document.documentElement.dataset.cursor;
    };
  }, []);

  return (
    <div className="cursor-layer" aria-hidden="true">
      <div ref={ringRef} className="cursor-ring" data-active="false">
        <span ref={labelRef} className="cursor-label" />
      </div>
      <div ref={dotRef} className="cursor-dot" />
    </div>
  );
}
