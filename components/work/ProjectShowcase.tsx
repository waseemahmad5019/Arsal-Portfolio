"use client";

import { useCallback, useRef, useState } from "react";
import Image from "next/image";
import type { Project } from "@/data/projects";
import { BLUR_DATA_URL, img, portrait } from "@/lib/images";
import { cn, clamp, pad } from "@/lib/utils";
import { ArrowLeft, ArrowRight, Drag } from "@/components/ui/Icons";

/**
 * Project showcase.
 *
 * A large frame inside a circular ring. Dragging horizontally tilts it in 3D
 * and spins the ring; releasing springs it back. The "Change look" strip swaps
 * between the project's screenshots, and the arrows step through them.
 */
export default function ProjectShowcase({ project }: { project: Project }) {
  const [index, setIndex] = useState(0);
  const [rotate, setRotate] = useState(0);
  const [dragging, setDragging] = useState(false);
  const dragState = useRef<{ id: number | null; startX: number }>({ id: null, startX: 0 });

  const shot = project.gallery[index];
  const total = project.gallery.length;

  const step = useCallback(
    (direction: 1 | -1) => setIndex((current) => (current + direction + total) % total),
    [total],
  );

  const onPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    dragState.current = { id: event.pointerId, startX: event.clientX };
    setDragging(true);
    event.currentTarget.setPointerCapture?.(event.pointerId);
  };

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (dragState.current.id !== event.pointerId) return;
    const dx = event.clientX - dragState.current.startX;
    setRotate(clamp(dx * 0.14, -38, 38));
  };

  const endDrag = (event: React.PointerEvent<HTMLDivElement>) => {
    if (dragState.current.id !== event.pointerId) return;
    const dx = event.clientX - dragState.current.startX;
    dragState.current = { id: null, startX: 0 };
    setDragging(false);
    setRotate(0);
    if (Math.abs(dx) > 70) step(dx < 0 ? 1 : -1);
  };

  return (
    <div className="flex flex-col gap-6 lg:flex-row lg:gap-8">
      {/* --------------------------------------------------- change-look strip */}
      <div className="order-2 flex flex-col gap-3 lg:order-1">
        <p className="micro text-ink-soft">Change look</p>
        <div className="no-scrollbar flex gap-3 overflow-x-auto pb-1 lg:flex-col lg:overflow-visible">
          {project.gallery.map((item, i) => (
            <button
              key={item.src}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Show ${item.label}`}
              aria-current={i === index}
              className={cn(
                "group relative size-[76px] shrink-0 overflow-hidden rounded-2xl ring-1 transition-all duration-400 sm:size-[88px]",
                i === index ? "ring-2 ring-offset-2 ring-offset-shell-3" : "ring-ink/12 hover:ring-ink/35",
              )}
              style={i === index ? ({ "--tw-ring-color": project.accent } as React.CSSProperties) : undefined}
            >
              <Image src={img(item.src, 240, 240)} alt="" fill sizes="88px" placeholder="blur" blurDataURL={BLUR_DATA_URL} className={cn("object-cover transition-opacity", i === index ? "opacity-100" : "opacity-60 group-hover:opacity-90")} />
            </button>
          ))}
        </div>
      </div>

      {/* ------------------------------------------------------------ showcase */}
      <div className="order-1 flex-1 lg:order-2">
        <div
          className="relative mx-auto aspect-square w-full max-w-[620px] select-none"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          data-cursor="DRAG"
          style={{ perspective: "1400px" }}
        >
          {/* circular ring with tick marks */}
          <svg
            aria-hidden
            viewBox="0 0 200 200"
            className={cn("absolute inset-0 size-full origin-center transition-transform duration-500", dragging ? "scale-[1.03]" : "scale-100")}
            style={{ transform: `rotate(${rotate * 0.6}deg)` }}
          >
            <circle cx="100" cy="100" r="96" fill="none" stroke="currentColor" strokeOpacity="0.14" strokeWidth="0.6" />
            <circle
              cx="100"
              cy="100"
              r="90"
              fill="none"
              stroke="currentColor"
              strokeOpacity="0.5"
              strokeWidth="0.8"
              strokeDasharray="1 6"
              style={{ transformOrigin: "center", animation: "spin-slow 60s linear infinite" }}
            />
            <circle
              cx="100"
              cy="100"
              r="78"
              fill="none"
              stroke={project.accent}
              strokeOpacity="0.55"
              strokeWidth="0.7"
              strokeDasharray="26 14"
              style={{ transformOrigin: "center", animation: "spin-slow 40s linear infinite reverse" }}
            />
          </svg>

          {/* the rotatable frame */}
          <div
            className={cn(
              "absolute inset-[12%] overflow-hidden rounded-[36px] bg-lavender shadow-[0_40px_80px_-40px_rgba(20,17,16,0.7)] transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]",
              dragging && "duration-100",
            )}
            style={{ transform: `rotateY(${rotate}deg) rotateZ(${rotate * 0.06}deg)` }}
          >
            {project.gallery.map((item, i) => (
              <Image
                key={item.src}
                src={portrait(item.src, 900)}
                alt={`${project.title} — ${item.label}`}
                fill
                sizes="(max-width: 1024px) 76vw, 42vw"
                placeholder="blur"
                blurDataURL={BLUR_DATA_URL}
                preload={i === 0}
                className={cn("object-cover transition-opacity duration-500", i === index ? "opacity-100" : "opacity-0")}
              />
            ))}

            <span className="micro absolute bottom-4 left-4 rounded-full bg-panel-fixed px-3 py-1.5 text-ink-fixed backdrop-blur-sm">{shot?.label}</span>
            <span className="micro absolute right-4 top-4 rounded-full bg-ink px-3 py-1.5 text-shell backdrop-blur-sm">
              {pad(index + 1)} / {pad(total)}
            </span>
          </div>

          {/* centre hint */}
          <span className="micro pointer-events-none absolute bottom-[6%] left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full bg-panel-fixed px-4 py-2.5 text-ink-fixed">
            <Drag className="size-3.5" />
            Drag to rotate
          </span>
        </div>

        {/* arrows */}
        <div className="mt-6 flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => step(-1)}
            className="grid size-12 place-items-center rounded-full border border-ink/15 transition-colors hover:bg-ink hover:text-shell"
            aria-label="Previous screenshot"
          >
            <ArrowLeft className="size-5" />
          </button>
          <span className="micro tabular-nums text-ink/50">
            {pad(index + 1)} / {pad(total)}
          </span>
          <button
            type="button"
            onClick={() => step(1)}
            className="grid size-12 place-items-center rounded-full border border-ink/15 transition-colors hover:bg-ink hover:text-shell"
            aria-label="Next screenshot"
          >
            <ArrowRight className="size-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
