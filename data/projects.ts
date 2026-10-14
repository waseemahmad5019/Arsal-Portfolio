/**
 * PROJECTS — selected work, the "New Work" rail, the dark feature case study,
 * the lookbook gallery and the full-screen slider chapters.
 *
 * `projects[]` powers both the draggable carousel and the /work/[slug] template,
 * so adding one entry gives you a card, a route and a sitemap entry.
 */

export type Project = {
  slug: string;
  title: string;
  tagline: string;
  year: string;
  category: string;
  /** Section background / card tint. */
  bg: string;
  accent: string;
  cover: string;
  /** Screenshots cycled by the "Change look" strip on the detail page. */
  gallery: { src: string; label: string }[];
  description: string;
  client: string;
  role: string;
  duration: string;
  industry: string;
  stack: string[];
  badges: string[];
  /** Rock-solid external link. TODO: point at real case studies. */
  liveUrl: string;
  walkthroughUrl: string;
};

export const projects: Project[] = [
  {
    slug: "topical-authority-map",
    title: "Topical Authority Map",
    tagline: "A whole site, re-drawn as one map",
    year: "2026",
    category: "SEO Strategy",
    bg: "#f6f1e7",
    accent: "#3b3bdb",
    cover: "topical-authority-map-cover",
    gallery: [
      { src: "topical-map-spread-01", label: "Entity map" },
      { src: "topical-map-spread-02", label: "Cluster sheet" },
      { src: "topical-map-spread-03", label: "Internal links" },
      { src: "topical-map-spread-04", label: "Priority order" },
    ],
    description:
      "Mapped a full client domain into entities, attributes and subtopics so every new page had a defined home in the structure. The map became the brief, the internal-linking plan and the content calendar in one artefact.",
    client: "Rank Brilliance client",
    role: "Semantic SEO Executive",
    duration: "Ongoing",
    industry: "Legal directories",
    stack: ["SEMrush", "Ahrefs", "Google Search Console", "Google Sheets"],
    badges: ["Featured"],
    liveUrl: "#",
    walkthroughUrl: "#",
  },
  {
    slug: "daraz-store-rebuild",
    title: "Daraz Store Rebuild",
    tagline: "Listings rebuilt around search",
    year: "2024",
    category: "E-commerce Ops",
    bg: "#f8cbd9",
    accent: "#ff3d8b",
    cover: "daraz-store-rebuild-cover",
    gallery: [
      { src: "daraz-rebuild-01", label: "Home rewrite" },
      { src: "daraz-rebuild-02", label: "Title patterns" },
      { src: "daraz-rebuild-03", label: "Attribute pass" },
      { src: "daraz-rebuild-04", label: "Order flow" },
    ],
    description:
      "Took an under-performing remote storefront and rebuilt it listing by listing — clearer titles, complete attributes, consistent imagery notes and a repeatable QA pass before anything went live.",
    client: "Freelance client",
    role: "Marketplace Virtual Assistant",
    duration: "6 months",
    industry: "General merchandise",
    stack: ["Daraz Seller Centre", "Google Sheets", "Listing SEO"],
    badges: ["Client Favourite"],
    liveUrl: "#",
    walkthroughUrl: "#",
  },
  {
    slug: "ebay-listing-engine",
    title: "eBay Listing Engine",
    tagline: "Titles and attributes that scale",
    year: "2024",
    category: "Listings & SEO",
    bg: "#e8ddc9",
    accent: "#c8501b",
    cover: "ebay-listing-engine-cover",
    gallery: [
      { src: "ebay-engine-01", label: "Title formula" },
      { src: "ebay-engine-02", label: "Item specifics" },
      { src: "ebay-engine-03", label: "Bulk upload" },
      { src: "ebay-engine-04", label: "Performance view" },
    ],
    description:
      "A repeatable listing formula: keyword-led titles, fully completed item specifics and a spreadsheet workflow so several hundred SKUs stayed consistent while volume grew.",
    client: "Freelance clients",
    role: "Marketplace Virtual Assistant",
    duration: "8 months",
    industry: "Marketplace retail",
    stack: ["eBay Seller Hub", "Zink Analytics", "Google Sheets"],
    badges: ["Award"],
    liveUrl: "#",
    walkthroughUrl: "#",
  },
  {
    slug: "semantic-brief-library",
    title: "Semantic Brief Library",
    tagline: "One brief system, many writers",
    year: "2026",
    category: "Content Systems",
    bg: "#ded2f7",
    accent: "#3b3bdb",
    cover: "semantic-brief-library-cover",
    gallery: [
      { src: "brief-library-01", label: "Brief template" },
      { src: "brief-library-02", label: "Intent block" },
      { src: "brief-library-03", label: "Schema notes" },
      { src: "brief-library-04", label: "Writer notes" },
    ],
    description:
      "Standardised how briefs are written so a distributed writing team produces consistent, semantically complete pages — intent first, structure second, word count last.",
    client: "Rank Brilliance client",
    role: "SEO Brief Creator",
    duration: "Ongoing",
    industry: "Health",
    stack: ["SEMrush", "ChatGPT", "Claude", "Schema"],
    badges: ["Featured"],
    liveUrl: "#",
    walkthroughUrl: "#",
  },
  {
    slug: "legal-directory-audit",
    title: "Legal Directory Audit",
    tagline: "Crawl, entities, then order of work",
    year: "2026",
    category: "Technical Audit",
    bg: "#f3e19a",
    accent: "#24082c",
    cover: "legal-directory-audit-cover",
    gallery: [
      { src: "legal-audit-01", label: "Crawl output" },
      { src: "legal-audit-02", label: "Issue triage" },
      { src: "legal-audit-03", label: "Entity gaps" },
      { src: "legal-audit-04", label: "Fix queue" },
    ],
    description:
      "A full crawl and entity-gap review of a legal directory, turned into a triaged fix queue so the dev team always knew the single next thing worth doing.",
    client: "Rank Brilliance client",
    role: "Semantic SEO Executive",
    duration: "5 weeks",
    industry: "Legal",
    stack: ["Screaming Frog", "Google Search Console", "Ahrefs"],
    badges: [],
    liveUrl: "#",
    walkthroughUrl: "#",
  },
  {
    slug: "health-content-cluster",
    title: "Health Content Cluster",
    tagline: "Depth over volume in a medical niche",
    year: "2026",
    category: "Content Strategy",
    bg: "#d9f26b",
    accent: "#24082c",
    cover: "health-content-cluster-cover",
    gallery: [
      { src: "health-cluster-01", label: "Cluster map" },
      { src: "health-cluster-02", label: "Entity sheet" },
      { src: "health-cluster-03", label: "Brief set" },
      { src: "health-cluster-04", label: "Coverage view" },
    ],
    description:
      "Built a topical cluster for a health client where accuracy mattered more than speed — fewer pages, each one covering its intent completely, internally linked back to a hub.",
    client: "Rank Brilliance client",
    role: "Semantic SEO Executive",
    duration: "Ongoing",
    industry: "Health",
    stack: ["SEMrush", "Google Search Console", "Keywords Everywhere"],
    badges: ["Client Favourite"],
    liveUrl: "#",
    walkthroughUrl: "#",
  },
];

export const workHeadline = {
  micro: "Selected Work",
  line1: "Cut to be",
  accent: "remembered",
  ghost: "SIGNATURES",
  support: "Six projects, dragged into view. Tilted, stacked, and ordered by how much I learned building them.",
};

/* -------------------------------------------------------------------------- */
/*  NEW WORK RAIL                                                             */
/* -------------------------------------------------------------------------- */

export type RailProject = {
  id: string;
  slug: string;
  title: string;
  kicker: string;
  bg: string;
  accent: string;
  image: string;
  fresh: boolean;
  favourite: boolean;
  role: string;
  stack: string[];
  summary: string;
  liveUrl: string;
};

export const railProjects: RailProject[] = [
  {
    id: "rail-01",
    slug: "topical-authority-map",
    title: "Authority Map",
    kicker: "Legal directory · 2026",
    bg: "#ded2f7",
    accent: "#3b3bdb",
    image: "rail-authority-map",
    fresh: true,
    favourite: true,
    role: "Semantic SEO Executive",
    summary: "One domain, redrawn as entities, clusters and a linking plan.",
    stack: ["SEMrush", "Ahrefs", "GSC"],
    liveUrl: "#",
  },
  {
    id: "rail-02",
    slug: "daraz-store-rebuild",
    title: "Daraz Rebuild",
    kicker: "Marketplace · 2024",
    bg: "#f8cbd9",
    accent: "#ff3d8b",
    image: "rail-daraz-rebuild",
    fresh: true,
    favourite: false,
    role: "Marketplace Virtual Assistant",
    summary: "Listing-by-listing rebuild of a remote storefront.",
    stack: ["Daraz", "Sheets", "Listing SEO"],
    liveUrl: "#",
  },
  {
    id: "rail-03",
    slug: "ebay-listing-engine",
    title: "Listing Engine",
    kicker: "Marketplace · 2024",
    bg: "#e8ddc9",
    accent: "#c8501b",
    image: "rail-listing-engine",
    fresh: false,
    favourite: true,
    role: "Marketplace Virtual Assistant",
    summary: "A title and attribute formula that survives scale.",
    stack: ["eBay", "Zink", "Sheets"],
    liveUrl: "#",
  },
  {
    id: "rail-04",
    slug: "semantic-brief-library",
    title: "Brief Library",
    kicker: "Content systems · 2026",
    bg: "#f3e19a",
    accent: "#24082c",
    image: "rail-brief-library",
    fresh: true,
    favourite: false,
    role: "SEO Brief Creator",
    summary: "A brief template a whole writing team can follow.",
    stack: ["Schema", "Claude", "Semrush"],
    liveUrl: "#",
  },
  {
    id: "rail-05",
    slug: "legal-directory-audit",
    title: "Directory Audit",
    kicker: "Technical · 2026",
    bg: "#d9f26b",
    accent: "#24082c",
    image: "rail-directory-audit",
    fresh: false,
    favourite: true,
    role: "Semantic SEO Executive",
    summary: "Crawl, triage, and a fix queue in priority order.",
    stack: ["Screaming Frog", "GSC", "Ahrefs"],
    liveUrl: "#",
  },
  {
    id: "rail-06",
    slug: "health-content-cluster",
    title: "Health Cluster",
    kicker: "Content · 2026",
    bg: "#ded2f7",
    accent: "#3b3bdb",
    image: "rail-health-cluster",
    fresh: true,
    favourite: false,
    role: "Semantic SEO Executive",
    summary: "Fewer pages, each one covering its intent completely.",
    stack: ["SEMrush", "Keywords Everywhere"],
    liveUrl: "#",
  },
];

/* -------------------------------------------------------------------------- */
/*  DARK FEATURE CASE STUDY                                                   */
/* -------------------------------------------------------------------------- */

export type MiniFeature = {
  id: string;
  badge: string;
  badgeTone: string;
  title: string;
  meta: string;
  accent: string;
  image: string;
  href: string;
};

export const feature = {
  micro: "The Feature",
  line1: "The map that",
  accent: "moved",
  line2: "the whole site",
  body: "One artefact, three jobs: it told writers what to cover, told developers what to link, and told the client what to expect next. This is the project I'd show first.",
  primary: {
    title: "Topical Authority Map",
    meta: "Senior-friendly walkthrough · 6 min read",
    image: "feature-topical-map",
    href: "/work/topical-authority-map",
  },
  minis: [
    {
      id: "mini-1",
      badge: "Featured",
      badgeTone: "#d9f26b",
      title: "Semantic Brief Library",
      meta: "Content systems · 2026",
      accent: "#3b3bdb",
      image: "mini-brief-library",
      href: "/work/semantic-brief-library",
    },
    {
      id: "mini-2",
      badge: "Award",
      badgeTone: "#ff3d8b",
      title: "eBay Listing Engine",
      meta: "Marketplace ops · 2024",
      accent: "#c8501b",
      image: "mini-listing-engine",
      href: "/work/ebay-listing-engine",
    },
    {
      id: "mini-3",
      badge: "Client Favourite",
      badgeTone: "#f3e19a",
      title: "Daraz Store Rebuild",
      meta: "E-commerce ops · 2024",
      accent: "#ff3d8b",
      image: "mini-daraz-rebuild",
      href: "/work/daraz-store-rebuild",
    },
  ] as MiniFeature[],
};

/* -------------------------------------------------------------------------- */
/*  LOOKBOOK GALLERY                                                          */
/* -------------------------------------------------------------------------- */

export type LookbookShot = {
  index: string;
  caption: string;
  sub: string;
  accent: string;
  image: string;
};

export const lookbook: LookbookShot[] = [
  {
    index: "01",
    caption: "Topical Tailoring",
    sub: "Structure cut to fit the subject",
    accent: "#ff3d8b",
    image: "lookbook-topical-tailoring",
  },
  {
    index: "02",
    caption: "Intent, Pressed",
    sub: "Format follows the SERP",
    accent: "#3b3bdb",
    image: "lookbook-intent-pressed",
  },
  {
    index: "03",
    caption: "Catalog Hours",
    sub: "Hundreds of rows, one voice",
    accent: "#c8501b",
    image: "lookbook-catalog-hours",
  },
];

/* -------------------------------------------------------------------------- */
/*  FULL-SCREEN SLIDER — project chapters                                     */
/* -------------------------------------------------------------------------- */

export type Chapter = {
  id: string;
  title: string;
  /** Editorial chapter name shown in huge serif type. */
  display: string;
  subtitle: string;
  bg: string;
  accent: string;
  image: string;
  slug: string;
  stack: string[];
};

export const chapters: Chapter[] = [
  {
    id: "ch-1",
    title: "Topical Authority Map",
    display: "First Light",
    subtitle: "Where every page gets a defined home",
    bg: "#24082c",
    accent: "#d9f26b",
    image: "chapter-first-light",
    slug: "topical-authority-map",
    stack: ["Entities", "Clusters", "Internal links"],
  },
  {
    id: "ch-2",
    title: "Semantic Brief Library",
    display: "Gallery Hours",
    subtitle: "Briefs a whole team can follow",
    bg: "#3b3bdb",
    accent: "#f3e19a",
    image: "chapter-gallery-hours",
    slug: "semantic-brief-library",
    stack: ["Intent", "Outline", "Schema"],
  },
  {
    id: "ch-3",
    title: "eBay Listing Engine",
    display: "Quiet Signal",
    subtitle: "Titles that survive scale",
    bg: "#c8501b",
    accent: "#f6f1e7",
    image: "chapter-quiet-signal",
    slug: "ebay-listing-engine",
    stack: ["Titles", "Attributes", "Sheets"],
  },
  {
    id: "ch-4",
    title: "Health Content Cluster",
    display: "Full Bloom",
    subtitle: "Depth over volume in a medical niche",
    bg: "#ff3d8b",
    accent: "#141110",
    image: "chapter-full-bloom",
    slug: "health-content-cluster",
    stack: ["Coverage", "Accuracy", "Hub links"],
  },
  {
    id: "ch-5",
    title: "Legal Directory Audit",
    display: "Evening Edit",
    subtitle: "A triaged queue the devs can act on",
    bg: "#141110",
    accent: "#ff3d8b",
    image: "chapter-evening-edit",
    slug: "legal-directory-audit",
    stack: ["Crawl", "Triage", "Fixes"],
  },
];

export const sliderCopy = {
  micro: "The Lookbook",
  hint: "Drag, scroll, or use the arrow keys to explore.",
  cta: "View project",
};

/* -------------------------------------------------------------------------- */
/*  CATEGORIES — "Edits for every occasion"                                   */
/* -------------------------------------------------------------------------- */

export type Category = {
  id: string;
  title: string;
  line: string;
  count: string;
  accent: string;
  image: string;
  /** Tailwind-ish height token so the four cards sit at different heights. */
  size: "sm" | "md" | "lg" | "xl";
};

export const categories: Category[] = [
  {
    id: "startups",
    title: "Startups",
    line: "One person wearing five hats. I make the SEO hat fit.",
    count: "12 projects",
    accent: "#3b3bdb",
    image: "category-startups",
    size: "md",
  },
  {
    id: "agencies",
    title: "Agencies",
    line: "White-label briefs, maps and audits that land on time.",
    count: "9 projects",
    accent: "#ff3d8b",
    image: "category-agencies",
    size: "xl",
  },
  {
    id: "ecommerce",
    title: "E-commerce",
    line: "Listings, catalogues and storefronts that read well and rank well.",
    count: "15 projects",
    accent: "#c8501b",
    image: "category-ecommerce",
    size: "sm",
  },
  {
    id: "personal-brands",
    title: "Personal Brands",
    line: "You, written clearly — so the right people find you first.",
    count: "7 projects",
    accent: "#24082c",
    image: "category-personal-brands",
    size: "lg",
  },
];

export const categoriesHeadline = {
  micro: "Edits for every occasion",
  line1: "Built for",
  accent: "your",
  line2: "kind of business",
};

/** Helper used by the detail page and sitemap. */
export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}
