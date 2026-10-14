"use client";

import { motion, type Variants } from "framer-motion";
import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

/* ---------------------------------------------------------------------------
 * BlurReveal — the signature move of the reference design.
 *
 * Every block of copy and every card enters slightly low, fully transparent and
 * defocused, then resolves to sharp over about a second. Staggered per element
 * rather than per section, which is what gives each block its own build-up.
 *
 * The blur stays under reduced motion (it is a focus change, not movement) while
 * `MotionConfig reducedMotion="user"` in MotionProvider strips the translate.
 * ------------------------------------------------------------------------- */

type BlurRevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** Blur radius in px at the start of the reveal. */
  blur?: number;
  y?: number;
  duration?: number;
  as?: ElementType;
  once?: boolean;
};

export function BlurReveal({
  children,
  className,
  delay = 0,
  blur = 10,
  y = 16,
  duration = 0.95,
  as = "div",
  once = true,
}: BlurRevealProps) {
  const Tag = motion[as as keyof typeof motion] as typeof motion.div;

  return (
    <Tag
      className={className}
      initial={{ opacity: 0, filter: `blur(${blur}px)`, y }}
      whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
      viewport={{ once, margin: "-12% 0px -12% 0px" }}
      transition={{ duration, ease: EASE, delay }}
    >
      {children}
    </Tag>
  );
}

/* --------------------------------------------------------------- plain fade */

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  as?: ElementType;
  once?: boolean;
};

/** Fade and lift, without the defocus. Used for chrome and dense lists. */
export function Reveal({ children, className, delay = 0, y = 20, as = "div", once = true }: RevealProps) {
  const Tag = motion[as as keyof typeof motion] as typeof motion.div;
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "-10% 0px -10% 0px" }}
      transition={{ duration: 0.75, ease: EASE, delay }}
    >
      {children}
    </Tag>
  );
}

/* -------------------------------------------------- masked line-by-line rise */

const lineVariants: Variants = {
  hidden: { y: "115%" },
  visible: (delay: number) => ({
    y: "0%",
    transition: { duration: 0.9, ease: EASE, delay },
  }),
};

type RevealLinesProps = {
  lines: ReactNode[];
  className?: string;
  lineClassName?: string;
  stagger?: number;
  delay?: number;
};

export function RevealLines({ lines, className, lineClassName, stagger = 0.09, delay = 0 }: RevealLinesProps) {
  return (
    <motion.span
      className={cn("block", className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-8% 0px" }}
    >
      {lines.map((line, index) => (
        <span key={index} className={cn("block overflow-hidden", lineClassName)}>
          <motion.span className="block" variants={lineVariants} custom={delay + index * stagger}>
            {line}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}

/* ------------------------------------------------------- staggered container */

const groupVariants: Variants = {
  hidden: {},
  visible: (stagger: number) => ({ transition: { staggerChildren: stagger } }),
};

const itemVariants: Variants = {
  hidden: { opacity: 0, filter: "blur(8px)", y: 14 },
  visible: { opacity: 1, filter: "blur(0px)", y: 0, transition: { duration: 0.8, ease: EASE } },
};

type StaggerGroupProps = {
  children: ReactNode;
  className?: string;
  stagger?: number;
  as?: ElementType;
};

/** Wrap a row of cards so each child resolves slightly after the one before it. */
export function StaggerGroup({ children, className, stagger = 0.12, as = "div" }: StaggerGroupProps) {
  const Tag = motion[as as keyof typeof motion] as typeof motion.div;
  return (
    <Tag className={className} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-10% 0px" }} variants={groupVariants} custom={stagger}>
      {children}
    </Tag>
  );
}

export function StaggerItem({ children, className, as = "div" }: { children: ReactNode; className?: string; as?: ElementType }) {
  const Tag = motion[as as keyof typeof motion] as typeof motion.div;
  return (
    <Tag className={className} variants={itemVariants}>
      {children}
    </Tag>
  );
}
