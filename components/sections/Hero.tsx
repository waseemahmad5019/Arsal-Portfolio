"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { profile } from "@/data/profile";
import { workspace } from "@/data/site";
import { scrollToTarget } from "@/components/providers/SmoothScrollProvider";
import WorkspaceMock from "@/components/hero/WorkspaceMock";
import { BlurReveal } from "@/components/ui/Reveal";
import { ButtonPill } from "@/components/ui/Surface";
import { MicroLabel } from "@/components/ui/Type";
import { ArrowDown, ArrowUpRight } from "@/components/ui/Icons";
import { img } from "@/lib/images";

/* Two photographs feather into the page from either edge, standing in for the
   reference's boulder cut-outs until real footage is dropped in. */
const SIDE_IMAGES = {
  left: "stone-ridge-left",
  right: "stone-ridge-right",
};

const EASE = [0.22, 1, 0.36, 1] as const;

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  // A gentle parallax: the stones drift up slightly slower than the copy.
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const stoneY = useTransform(scrollYProgress, [0, 1], ["0%", "14%"]);
  const copyY = useTransform(scrollYProgress, [0, 1], ["0%", "26%"]);
  const fade = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

  return (
    <section
      ref={sectionRef}
      id="home"
      aria-labelledby="hero-title"
      className="relative isolate overflow-hidden bg-gradient-to-b from-shell via-shell-2 to-shell-3"
    >
      {/* ---------------------------------------------------- living backdrop */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        {profile.hero.video ? (
          <video
            className="absolute inset-0 size-full animate-breathe object-cover opacity-90"
            src={profile.hero.video}
            poster={img(profile.hero.poster, 1600, 900)}
            autoPlay
            muted
            loop
            playsInline
          />
        ) : (
          <motion.div
            style={{ y: stoneY }}
            className="absolute -bottom-[4%] -left-[6%] hidden h-[96%] w-[50%] lg:block"
          >
            <div className="feather relative size-full">
              <Image
                src="/images/arsal-hero.jpg"
                alt="Arsal Waseem — Semantic SEO Executive"
                fill
                sizes="50vw"
                priority
                className="object-cover object-[50%_18%]"
              />
            </div>
          </motion.div>
        )}

        {/* Warm wash so the copy always clears the photography. */}
        <div className="absolute inset-x-0 top-0 h-[62%] bg-[radial-gradient(120%_90%_at_50%_-10%,rgba(255,255,255,0.85),transparent_70%)]" />
        <div className="absolute inset-x-0 bottom-0 h-[46%] bg-gradient-to-t from-shell-3 via-shell-3/70 to-transparent" />
      </div>

      <div className="wrap relative flex min-h-[100svh] flex-col pb-14 pt-[104px] sm:pb-16 lg:pb-20">
        {/* --------------------------------------------------------- the copy */}
        <motion.div style={{ y: copyY, opacity: fade }} className="mx-auto flex max-w-[760px] flex-1 flex-col items-center justify-center py-10 text-center">
          <BlurReveal delay={0.1} blur={8}>
            <MicroLabel tone="soft">{profile.hero.micro}</MicroLabel>
          </BlurReveal>

          <h1 id="hero-title" className="display mt-7 text-[clamp(2.3rem,6.4vw,4.7rem)]">
            <BlurReveal as="span" className="ghost block" delay={0.2}>
              {profile.hero.ghostLine}
            </BlurReveal>
            <BlurReveal as="span" className="block text-ink" delay={0.3}>
              {profile.hero.inkLine}
            </BlurReveal>
          </h1>

          <BlurReveal delay={0.45} blur={8}>
            <p className="mx-auto mt-7 max-w-[52ch] text-[1.0625rem] leading-relaxed text-ink-soft sm:text-lg">
              {profile.hero.intro}
            </p>
          </BlurReveal>

          <motion.div
            className="mt-9 flex flex-wrap items-center justify-center gap-3"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.6 }}
          >
            <ButtonPill variant="dark" size="lg" badge cursor="EMAIL" onClick={() => scrollToTarget("#contact")}>
              Start a conversation
            </ButtonPill>
            <ButtonPill variant="light" size="lg" cursor="WORK" onClick={() => scrollToTarget("#work")}>
              See the work
              <ArrowUpRight className="size-4" />
            </ButtonPill>
          </motion.div>
        </motion.div>

        {/* ------------------------------------------------- the product mock */}
        <div className="mt-auto">
          <WorkspaceMock className="mx-auto w-full max-w-[940px]" />

          <button
            type="button"
            onClick={() => scrollToTarget("#services")}
            className="micro mx-auto mt-6 flex items-center gap-2 text-ink-soft transition-colors hover:text-ink"
          >
            {profile.hero.scrollHint}
            <ArrowDown className="size-3.5" />
          </button>
        </div>
      </div>
    </section>
  );
}
