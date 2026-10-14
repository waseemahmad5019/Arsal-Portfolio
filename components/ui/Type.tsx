import type { ElementType, ReactNode } from "react";
import Image from "next/image";
import { BlurReveal } from "@/components/ui/Reveal";
import { img } from "@/lib/images";
import { cn } from "@/lib/utils";

/* ---------------------------------------------------------------------------
 * MicroLabel — the letter-spaced monospace caption used for every eyebrow,
 * nav item, table header and legal line in the reference design.
 * ------------------------------------------------------------------------- */

type MicroLabelProps = {
  children: ReactNode;
  /** Draws the hairline pill around it (the "INTEGRATIONS" badge). */
  boxed?: boolean;
  tone?: "ink" | "soft" | "photo";
  className?: string;
  as?: ElementType;
};

export function MicroLabel({ children, boxed = false, tone = "soft", className, as: Tag = "span" }: MicroLabelProps) {
  return (
    <Tag
      className={cn(
        "inline-flex items-center gap-2",
        boxed ? "micro rounded-full px-3.5 py-2" : "micro",
        tone === "photo" ? "text-on-photo-soft" : tone === "ink" ? "text-ink" : "text-ink-soft",
        className,
      )}
    >
      {boxed ? (
        <>
          <span aria-hidden className="h-3 w-px" style={{ background: "currentColor", opacity: 0.4 }} />
          {children}
          <span aria-hidden className="h-3 w-px" style={{ background: "currentColor", opacity: 0.4 }} />
        </>
      ) : (
        children
      )}
    </Tag>
  );
}

/** Small filled dot + label, with an optional slow pulse (the "● LIVE" chip). */
export function DotLabel({ children, color = "var(--color-moss)", pulse = false, tone = "soft", className }: { children: ReactNode; color?: string; pulse?: boolean; tone?: "ink" | "soft" | "photo"; className?: string }) {
  return (
    <span className={cn("micro inline-flex items-center gap-2", tone === "photo" ? "text-on-photo-soft" : tone === "ink" ? "text-ink" : "text-ink-soft", className)}>
      <span
        aria-hidden
        className={cn("size-1.5 shrink-0 rounded-full", pulse && "animate-pulse")}
        style={{ background: color }}
      />
      {children}
    </span>
  );
}

/* ---------------------------------------------------------------------------
 * TwoTone — the typographic signature of the reference: line one in ghost
 * grey, line two in near-black, tight leading, sentence case, no uppercase.
 * ------------------------------------------------------------------------- */

const SIZES = {
  sm: "text-[clamp(1.55rem,4.1vw,2.5rem)]",
  md: "text-[clamp(1.95rem,5.4vw,3.8rem)]",
  lg: "text-[clamp(2.3rem,6.9vw,5.2rem)]",
  xl: "text-[clamp(2.45rem,7.6vw,5.9rem)]",
} as const;

type TwoToneProps = {
  micro?: string;
  boxedMicro?: boolean;
  ghost: ReactNode;
  ink: ReactNode;
  size?: keyof typeof SIZES;
  align?: "left" | "center";
  tone?: "page" | "photo";
  as?: ElementType;
  id?: string;
  className?: string;
  /** Base delay for the staggered line reveals. */
  delay?: number;
};

export function TwoTone({
  micro,
  boxedMicro = false,
  ghost,
  ink,
  size = "lg",
  align = "left",
  tone = "page",
  as: Tag = "h2",
  id,
  className,
  delay = 0,
}: TwoToneProps) {
  const ghostTone = tone === "photo" ? "text-on-photo-soft" : "ghost";
  const inkTone = tone === "photo" ? "text-on-photo" : "text-ink";

  return (
    <div className={cn(align === "center" && "flex flex-col items-center text-center", className)}>
      {micro ? (
        <BlurReveal delay={delay} blur={6}>
          <MicroLabel boxed={boxedMicro} tone={tone === "photo" ? "photo" : "soft"} className="hairline border">
            {micro}
          </MicroLabel>
        </BlurReveal>
      ) : null}

      <Tag id={id} className={cn("display", SIZES[size], micro && "mt-6")}>
        <BlurReveal as="span" className={cn("block", ghostTone)} delay={delay + (micro ? 0.08 : 0)}>
          {ghost}
        </BlurReveal>
        <BlurReveal as="span" className={cn("block", inkTone)} delay={delay + (micro ? 0.16 : 0.08)}>
          {ink}
        </BlurReveal>
      </Tag>
    </div>
  );
}

/* ---------------------------------------------------------------------------
 * InlineImage — a photograph sitting inside a line of type, the detail from
 * the reference's closing call to action.
 * ------------------------------------------------------------------------- */

export function InlineImage({ seed, alt = "", className }: { seed: string; alt?: string; className?: string }) {
  return (
    <span
      className={cn(
        "relative mx-[0.26em] inline-block h-[0.72em] w-[1.75em] -translate-y-[0.04em] overflow-hidden rounded-full align-middle",
        className,
      )}
    >
      <Image src={img(seed, 480, 220)} alt={alt} fill sizes="180px" className="object-cover" />
    </span>
  );
}
