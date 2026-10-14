"use client";

import Image from "next/image";
import { posts } from "@/data/posts";
import { journalHeading } from "@/data/site";
import { BlurReveal, StaggerGroup, StaggerItem } from "@/components/ui/Reveal";
import { MicroLabel, TwoTone } from "@/components/ui/Type";
import { BLUR_DATA_URL, img } from "@/lib/images";

/** Fixed locale + UTC so the server and client render the same string. */
const dateFormatter = new Intl.DateTimeFormat("en-GB", {
  day: "2-digit",
  month: "short",
  year: "numeric",
  timeZone: "UTC",
});

export default function Journal() {
  const [featured, ...rest] = posts;

  return (
    <section id="journal" aria-labelledby="journal-title" className="relative bg-shell py-20 sm:py-24 lg:py-28">
      <div className="wrap">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-end">
          <TwoTone id="journal-title" micro={journalHeading.micro} boxedMicro ghost={journalHeading.ghost} ink={journalHeading.ink} size="md" />
          <BlurReveal delay={0.25}>
            <p className="body max-w-[44ch] lg:pb-2">{journalHeading.support}</p>
          </BlurReveal>
        </div>

        <div className="mt-14 grid gap-12 sm:mt-16 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:gap-14">
          {/* ------------------------------------------------------- the feature */}
          <BlurReveal blur={9}>
            <article className="group">
              <div className="tile relative aspect-[16/11] overflow-hidden">
                <Image
                  src={img(featured.image, 1200, 830)}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 600px, 92vw"
                  quality={78}
                  placeholder="blur"
                  blurDataURL={BLUR_DATA_URL}
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
                <span className="chip absolute left-4 top-4 border-transparent bg-panel-fixed text-ink-fixed backdrop-blur-md">
                  {featured.category}
                </span>
              </div>

              <MicroLabel tone="soft" className="mt-5">
                {dateFormatter.format(new Date(featured.date))} · {featured.readTime} read
              </MicroLabel>
              <h3 className="display-sm mt-3 text-[clamp(1.3rem,2.7vw,1.75rem)]">{featured.title}</h3>
              <p className="mt-3 max-w-[52ch] text-[0.92rem] leading-relaxed text-ink-soft">{featured.excerpt}</p>
            </article>
          </BlurReveal>

          {/* ---------------------------------------------------------- the list */}
          <StaggerGroup className="lg:pt-2">
            {rest.map((post) => (
              <StaggerItem key={post.id}>
                <article className="rule flex items-start justify-between gap-6 py-6">
                  <div className="min-w-0">
                    <MicroLabel tone="soft">
                      {dateFormatter.format(new Date(post.date))} · {post.category}
                    </MicroLabel>
                    <h3 className="mt-3 text-[1.03rem] font-medium leading-snug">{post.title}</h3>
                    <p className="mt-2 max-w-[56ch] text-[0.86rem] leading-relaxed text-ink-soft">{post.excerpt}</p>
                  </div>
                  <span className="micro-xs shrink-0 pt-1 text-ink-soft">{post.readTime}</span>
                </article>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </div>
    </section>
  );
}
