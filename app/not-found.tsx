import Link from "next/link";
import { profile } from "@/data/profile";
import { ArrowRight } from "@/components/ui/Icons";

export default function NotFound() {
  return (
    <section className="grid min-h-[80svh] place-items-center bg-cream px-4 py-32">
      <div className="mx-auto max-w-2xl text-center">
        <span className="micro text-ink/50">404 — off the rail</span>
        <h1 className="display mt-5 text-[clamp(3rem,14vw,9rem)] leading-[0.85]">
          Nothing <span className="serif-accent offset-text" style={{ "--offset-color": "var(--color-burnt)" } as React.CSSProperties}>here</span>
        </h1>
        <p className="mx-auto mt-6 max-w-md text-[1rem] leading-relaxed text-ink/65">
          That page has moved or never existed. The work is all still on the home page.
        </p>
        <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <Link href="/" className="pill pill-lg bg-ink text-cream transition-colors hover:bg-indigo" data-cursor="HOME">
            Back to the portfolio
            <ArrowRight className="size-4" />
          </Link>
          <a href={`mailto:${profile.email}`} className="pill pill-lg border border-ink/20 transition-colors hover:bg-ink hover:text-cream">
            Email {profile.firstName}
          </a>
        </div>
      </div>
    </section>
  );
}
