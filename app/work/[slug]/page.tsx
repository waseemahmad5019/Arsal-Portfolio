import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProject, projects } from "@/data/projects";
import { profile } from "@/data/profile";
import ProjectShowcase from "@/components/work/ProjectShowcase";
import { Reveal } from "@/components/ui/Reveal";
import { MicroLabel } from "@/components/ui/Type";
import { ArrowLeft, ArrowRight, ArrowUpRight, Play } from "@/components/ui/Icons";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    return { title: "Project not found" };
  }

  const description = `${project.tagline}. ${project.description}`.slice(0, 158);

  return {
    title: project.title,
    description,
    alternates: { canonical: `/work/${project.slug}` },
    openGraph: {
      type: "article",
      title: `${project.title} — ${project.tagline}`,
      description,
      url: `/work/${project.slug}`,
    },
    twitter: { card: "summary_large_image", title: `${project.title} — ${project.tagline}`, description },
  };
}

export default async function WorkDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) notFound();

  const currentIndex = projects.findIndex((item) => item.slug === project.slug);
  const nextProject = projects[(currentIndex + 1) % projects.length];

  const workSchema = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.description,
    creator: { "@type": "Person", name: profile.name },
    dateCreated: project.year,
    about: project.category,
    keywords: project.stack.join(", "),
    url: `${profile.seo.siteUrl}/work/${project.slug}`,
  };

  return (
    <article className="bg-shell-2 pb-32 pt-24 sm:pt-28 lg:pb-24">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(workSchema) }} />

      {/* ----------------------------------------------------------- breadcrumb */}
      <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-10">
        <nav className="flex items-center gap-3" aria-label="Breadcrumb">
          <Link
            href="/"
            className="micro inline-flex items-center gap-2 text-ink/55 transition-colors hover:text-ink"
            data-cursor="BACK"
          >
            <ArrowLeft className="size-4" />
            All work
          </Link>
          <span aria-hidden className="text-ink/25">
            /
          </span>
          <Link href="/#work" className="micro text-ink/45 transition-colors hover:text-ink">
            Selected work
          </Link>
        </nav>
      </div>

      {/* -------------------------------------------------------------- header */}
      <div className="mx-auto mt-8 max-w-[1600px] px-4 sm:px-6 lg:px-10">
        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
          <Reveal>
            <ProjectShowcase project={project} />
          </Reveal>

          {/* ----------------------------------------------------- information */}
          <div className="lg:pt-6">
            <Reveal>
              <MicroLabel tone="soft">{project.category}</MicroLabel>
            </Reveal>

            <Reveal delay={0.06}>
              <h1 className="display mt-5 text-[clamp(2.6rem,8.5vw,6rem)] leading-[0.88]">
                {project.title.split(" ").slice(0, -1).join(" ")}{" "}
                <span className="inline-block" style={{ color: project.accent }}>
                  {project.title.split(" ").slice(-1)[0]}
                </span>
              </h1>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="mt-6 max-w-[52ch] text-[clamp(1.1rem,2.2vw,1.5rem)] leading-snug text-ink-2">
                {project.tagline}
              </p>
            </Reveal>

            <Reveal delay={0.14}>
              <p className="mt-6 max-w-[58ch] text-[1rem] leading-relaxed text-ink-soft">{project.description}</p>
            </Reveal>

            {/* metadata */}
            <Reveal delay={0.18}>
              <dl className="mt-10 grid grid-cols-2 gap-x-8 gap-y-6 border-t border-ink/15 pt-8 sm:grid-cols-4">
                {[
                  { label: "Client", value: project.client },
                  { label: "Role", value: project.role },
                  { label: "Year", value: project.year },
                  { label: "Duration", value: project.duration },
                ].map((item) => (
                  <div key={item.label}>
                    <dt className="micro text-ink-soft">{item.label}</dt>
                    <dd className="mt-2 text-[0.92rem] leading-snug">{item.value}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>

            {/* stack */}
            <Reveal delay={0.22}>
              <div className="mt-8">
                <p className="micro text-ink/45">Tech &amp; tools</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {project.stack.map((tech) => (
                    <span key={tech} className="chip text-ink-soft">
                      {tech}
                    </span>
                  ))}
                  <span className="chip text-ink-soft">{project.industry}</span>
                </div>
              </div>
            </Reveal>

            {/* actions */}
            <Reveal delay={0.26}>
              <div className="mt-9 flex flex-wrap items-center gap-3">
                <a
                  href={project.liveUrl}
                  className="pill pill-lg bg-ink text-shell transition-colors"
                  data-cursor="OPEN"
                >
                  Start a similar project
                  <ArrowRight className="size-4" />
                </a>
                <button
                  type="button"
                  id="walkthrough"
                  className="pill"
                  data-cursor="PLAY"
                >
                  <Play className="size-4" />
                  Watch walkthrough
                </button>
              </div>
            </Reveal>
          </div>
        </div>

        {/* -------------------------------------------------------- next project */}
        <div className="mt-20 border-t border-ink/15 pt-8">
          <Link href={`/work/${nextProject.slug}`} className="group flex items-center justify-between gap-6" data-cursor="NEXT">
            <span>
              <span className="micro block text-ink-soft">Next project</span>
              <span className="display mt-2 block text-[clamp(1.6rem,5vw,3.4rem)] leading-none transition-colors group-hover:text-ink-2">
                {nextProject.title}
              </span>
            </span>
            <span className="grid size-14 shrink-0 place-items-center rounded-full border border-ink/15 transition-all duration-500 group-hover:bg-ink group-hover:text-shell">
              <ArrowUpRight className="size-6" />
            </span>
          </Link>
        </div>
      </div>

      {/* -------------------------------------------------- sticky mobile CTA */}
      <div className="fixed inset-x-0 bottom-0 z-[200] border-t border-ink/10 bg-shell-2/95 p-3 backdrop-blur-xl lg:hidden">
        <a
          href={project.liveUrl}
          className="pill pill-lg w-full bg-ink text-shell"
          data-cursor="OPEN"
        >
          Start a similar project
          <ArrowRight className="size-4" />
        </a>
      </div>
    </article>
  );
}
