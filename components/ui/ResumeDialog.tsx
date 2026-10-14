"use client";

import { cn } from "@/lib/utils";

type ResumeModalProps = {
  /** Native dialogs are controlled imperatively, so we expose a ref-like API. */
  id?: string;
  title?: string;
  src?: string;
  className?: string;
};

/**
 * Full-screen CV viewer. Built on the native <dialog> element so focus trapping,
 * Escape-to-close and the inert background all come from the platform.
 *
 * Usage: give the dialog an id and call `show()` on it from any button, e.g.
 *   document.getElementById("resume-dialog")?.showModal()
 */
export function ResumeDialog({ id = "resume-dialog", title = "Résumé", src = "/resume.pdf", className }: ResumeModalProps) {
  return (
    <dialog
      id={id}
      className={cn(
        "z-[500] m-0 h-full max-h-none w-full max-w-none bg-night/98 p-0 text-on-photo backdrop:bg-night/80",
        "open:flex open:flex-col",
        className,
      )}
      aria-label={`${title} viewer`}
    >
      <div className="flex items-center justify-between gap-4 border-b border-white/12 px-4 py-3 sm:px-6">
        <p className="micro text-on-photo-soft">{title} — Arsal Waseem</p>
        <div className="flex items-center gap-2">
          <a href={src} download className="pill bg-butter text-ink-fixed" data-cursor="DOWNLOAD">
            Download
          </a>
          <button
            type="button"
            className="pill text-on-photo"
            onClick={(event) => (event.currentTarget.closest("dialog") as HTMLDialogElement | null)?.close()}
          >
            Close
          </button>
        </div>
      </div>
      <div className="min-h-0 flex-1 bg-shell-3">
        <iframe src={src} title={`${title} preview`} className="h-full w-full" />
      </div>
    </dialog>
  );
}

export function openResumeDialog(id = "resume-dialog") {
  const dialog = document.getElementById(id) as HTMLDialogElement | null;
  if (!dialog) return;
  if (typeof dialog.showModal === "function") dialog.showModal();
  else window.open("/resume.pdf", "_blank", "noopener");
}
