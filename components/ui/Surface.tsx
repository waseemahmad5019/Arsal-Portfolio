import type { ButtonHTMLAttributes, ReactNode } from "react";
import { ArrowRight, Check } from "@/components/ui/Icons";
import { cn } from "@/lib/utils";

/* ---------------------------------------------------------------------------
 * ButtonPill — every button in the reference is a fully rounded pill, and the
 * primary one carries a circular badge holding the arrow.
 * ------------------------------------------------------------------------- */

type PillVariant = "dark" | "light" | "ghost" | "photo";

const VARIANTS: Record<PillVariant, string> = {
  dark: "bg-ink text-shell hover:bg-ink-2",
  light: "bg-panel text-ink hairline border hover:bg-panel-2",
  ghost: "text-ink-soft hover:text-ink",
  photo: "glass-photo text-on-photo hover:bg-white/30",
};

const BADGE: Record<PillVariant, string> = {
  dark: "bg-shell text-ink",
  light: "bg-ink text-shell",
  ghost: "bg-ink/10 text-ink",
  photo: "bg-on-photo text-ink",
};

type PillProps = {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: PillVariant;
  /** Adds the circular badge with the arrow, as on "→ Open app". */
  badge?: boolean;
  size?: "md" | "lg";
  className?: string;
  /** Value for the custom cursor's `data-cursor` label. */
  cursor?: string;
  download?: boolean;
  type?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
  "aria-label"?: string;
  /** Renders the label for assistive tech only (icon buttons). */
  title?: string;
};

export function ButtonPill({ children, href, onClick, variant = "dark", badge = false, size = "md", className, cursor, download, type = "button", title, ...rest }: PillProps) {
  const classes = cn("pill group", size === "lg" && "pill-lg", VARIANTS[variant], className);

  const inner = (
    <>
      {badge ? (
        <span
          aria-hidden
          className={cn(
            "grid size-6 shrink-0 place-items-center rounded-full transition-transform duration-500 group-hover:translate-x-0.5",
            BADGE[variant],
          )}
        >
          <ArrowRight className="size-3.5" />
        </span>
      ) : null}
      {children}
    </>
  );

  if (href) {
    return (
      <a href={href} className={classes} data-cursor={cursor} download={download} title={title} aria-label={rest["aria-label"]} onClick={onClick ? (event) => { event.preventDefault(); onClick(); } : undefined}>
        {inner}
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes} data-cursor={cursor} title={title} aria-label={rest["aria-label"]}>
      {inner}
    </button>
  );
}

/* ---------------------------------------------------------------------------
 * Hairline rows — the reference builds almost every panel from label/value rows
 * separated by a 1px rule at 12% ink.
 * ------------------------------------------------------------------------- */

export function DataRow({ label, value, tone = "ink", className }: { label: ReactNode; value: ReactNode; tone?: "ink" | "soft" | "photo"; className?: string }) {
  return (
    <div className={cn("rule flex items-center justify-between gap-4 py-3 text-sm", className)}>
      <span className={tone === "photo" ? "text-on-photo-soft" : "text-ink-soft"}>{label}</span>
      <span className={cn("tabular-nums", tone === "photo" ? "text-on-photo" : "text-ink")}>{value}</span>
    </div>
  );
}

/** Cream circular tick + label — the reference's staged checklist. */
export function CheckRow({ children, color = "var(--color-butter)", tone = "page", className }: { children: ReactNode; color?: string; tone?: "page" | "photo"; className?: string }) {
  return (
    <div className={cn("flex items-center gap-3 text-sm", className)}>
      <span aria-hidden className="grid size-5 shrink-0 place-items-center rounded-full" style={{ background: color, color: "var(--color-ink-fixed)" }}>
        <Check className="size-3" />
      </span>
      <span className={tone === "photo" ? "text-on-photo-soft" : "text-ink-2"}>{children}</span>
    </div>
  );
}

/* ---------------------------------------------------------------------------
 * Cards
 * ------------------------------------------------------------------------- */

export function FloatCard({ children, className, tone = "page" }: { children: ReactNode; className?: string; tone?: "page" | "photo" }) {
  return (
    <div className={cn("float p-4", tone === "photo" ? "glass-photo text-on-photo" : "glass text-ink", className)}>{children}</div>
  );
}

/** Big numeral with a micro caption underneath — used across the data panels. */
export function Metric({ label, value, sub, tone = "ink", className }: { label: string; value: ReactNode; sub?: ReactNode; tone?: "ink" | "soft" | "photo"; className?: string }) {
  return (
    <div className={className}>
      <p className={cn("micro-xs", tone === "photo" ? "text-on-photo-soft" : "text-ink-soft")}>{label}</p>
      <p className={cn("display-sm mt-2 tabular-nums", tone === "photo" ? "text-on-photo" : "text-ink", "text-[clamp(1.35rem,2.6vw,1.9rem)]")}>{value}</p>
      {sub ? <p className={cn("mt-1 text-xs", tone === "photo" ? "text-on-photo-soft" : "text-ink-soft")}>{sub}</p> : null}
    </div>
  );
}
