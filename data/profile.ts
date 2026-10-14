/**
 * ============================================================================
 *  PROFILE — the single source of truth for identity, copy and contact.
 *  Everything on the site reads from here. Edit this file and the whole
 *  portfolio updates (nav, hero, timeline, stats, footer, JSON-LD, metadata).
 *
 *  Anything wrapped in [SQUARE BRACKETS] is a placeholder for you to fill in.
 *  Lines marked TODO are decisions I made for you and are easy to change.
 * ============================================================================
 */

export type NavItem = { label: string; href: string };

export type Experience = {
  id: string;
  company: string;
  role: string;
  duration: string;
  period: string;
  location: string;
  summary: string;
  bullets: string[];
  stack: string[];
  accent: string;
  ghost: string;
  /** TODO: set to true to publish; used for entries you may not want live yet. */
  published: boolean;
};

export type Stat = {
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
  /** Render the value as-is (e.g. a year) instead of animating a count-up. */
  plain?: boolean;
};

export const profile = {
  /* ---------------------------------------------------------------- identity */
  name: "Arsal Malik",
  firstName: "Arsal",
  wordmark: "ARSAL MALIK",
  /** Lowercase lockup used by the sticky header, in the style of the reference. */
  wordmarkLower: "arsal malik",
  // TODO: your preferred job title as it should appear publicly.
  jobTitle: "Semantic SEO Executive",
  jobTitleLong: "Semantic SEO Executive & E-commerce Operations Specialist",
  tagline: "Semantic SEO · Marketplace Ops",
  shortTagline: "SEO × Commerce",
  location: "Lahore, Pakistan",
  city: "Lahore",
  country: "Pakistan",
  availability: "Open to full-time roles & freelance projects",

  // TODO: 3–4 sentences. Drafted only from what your CV states.
  bio: [
    "I'm a Semantic SEO Executive at Rank Brilliance, where I build topical maps and semantic content briefs that help a site earn genuine topical authority instead of chasing isolated keywords.",
    "Before this I spent two years running Daraz and eBay storefronts remotely — product research, SEO-tuned listings, inventory, returns and buyer support.",
  ],
  bioExtra:
    "I'm studying for a BBA (Hons) at Hailey College of Banking and Finance, and I like problems that sit exactly where search intent meets commercial reality.",

  profileImage: "/images/profile.jpg",
  resumeUrl: "/resume.pdf",
  resumeLabel: "Download Résumé",

  /* ------------------------------------------------------------------ contact */
  email: "malikarsalma79@gmail.com",
  phoneDisplay: "0309 2017768",
  phoneHref: "+923092017768",
  whatsapp: "https://wa.me/923092017768",
  // TODO: replace with your real profile URL.
  linkedin: "https://www.linkedin.com/in/arsal-malik-2a29683a6/",
  timeZone: "Asia/Karachi",

  /* --------------------------------------------------------------------- nav */
  // Centre links, per the brief. `footer` links add the extra anchors.
  nav: [
    { label: "Home", href: "#home" },
    { label: "Services", href: "#services" },
    { label: "Work", href: "#work" },
    { label: "Journal", href: "#journal" },
    { label: "About", href: "#about" },
  ] as NavItem[],

  footerNav: [
    { label: "Experience", href: "#experience" },
    { label: "Capabilities", href: "#capabilities" },
    { label: "Tooling", href: "#tooling" },
    { label: "Contact", href: "#contact" },
  ] as NavItem[],

  /* -------------------------------------------------------------------- hero */
  hero: {
    micro: "Search, grown slowly",
    /** Line one — rendered in ghost grey. */
    ghostLine: "Topical authority,",
    /** Line two — rendered in near-black. */
    inkLine: "built one brief at a time",
    intro:
      "I map the topics a business should own, then write the briefs that turn them into pages people actually find. Semantic SEO and marketplace operations, from Lahore.",
    scrollHint: "Scroll to explore",
    /**
     * Optional living footage for the hero — the reference site loops a nature
     * clip behind its dashboard. Drop an mp4 into /public and set the path here,
     * e.g. "/videos/ridge.mp4". While empty the hero uses the still below.
     */
    video: "", // TODO
    poster: "hero-stone-ridge",
  },

  /* ------------------------------------------------------------------- stats */
  stats: [
    { value: 2, suffix: "+", label: "Years running Daraz & eBay stores" },
    { value: 8, suffix: "", label: "SEO tools in my daily stack" },
    { value: 3, suffix: "", label: "Industries — health, law, legal directories" },
    { value: 2026, suffix: "", label: "Joined Rank Brilliance as SEO Executive", plain: true },
  ] as Stat[],

  /* -------------------------------------------------------------- experience */
  experience: [
    {
      id: "rank-brilliance",
      company: "Rank Brilliance",
      role: "Semantic SEO Executive / SEO Brief Creator",
      duration: "Present",
      period: "April 2026 — Present",
      location: "Lahore, Pakistan",
      summary: "Topical authority, semantic content strategy and brief creation for client sites.",
      // Drafted directly from the CV's listed responsibilities. TODO: edit freely.
      bullets: [
        "Build topical maps that group entities, attributes and subtopics into a crawlable authority structure.",
        "Write semantic content briefs that translate search intent into a structure writers can actually follow.",
        "Run keyword, SERP and competitor analysis to prioritise what gets optimised next.",
      ],
      stack: ["SEMrush", "Ahrefs", "Google Search Console", "Screaming Frog", "Schema"],
      accent: "#3b3bdb",
      ghost: "SEO",
      published: true,
    },
    {
      id: "mti-holdings",
      company: "MTI Holdings",
      role: "Digital Marketing Intern",
      duration: "6 weeks",
      period: "16 Feb 2026 — 30 Mar 2026",
      location: "Lahore, Pakistan",
      summary: "First agency-side exposure to campaign work and reporting.",
      // TODO: [BULLET 1] / [BULLET 2] / [BULLET 3] — your CV lists no detail here.
      bullets: ["[BULLET 1 — what you owned at MTI Holdings]", "[BULLET 2 — a tool or process you ran]", "[BULLET 3 — a result or output you shipped]"],
      stack: ["Reporting", "Content", "Social"],
      accent: "#c8501b",
      ghost: "MTI",
      published: true,
    },
    {
      id: "daraz-ebay",
      company: "Daraz & eBay (Freelance)",
      role: "Marketplace Virtual Assistant",
      duration: "2 years",
      period: "2023 — 2025",
      location: "Remote",
      summary: "Remote storefront operations across two marketplaces, end to end.",
      bullets: [
        "Created product listings with SEO-optimised titles and descriptions.",
        "Ran product research and competitor analysis to find what would actually sell.",
        "Handled order processing, inventory, returns, refunds and buyer queries.",
        "Supported store optimisation to improve visibility and sales performance.",
        "Reported daily progress to clients; worked in eBay Seller Hub, Zink Analytics and Google Sheets.",
      ],
      stack: ["eBay Seller Hub", "Zink Analytics", "Google Sheets", "Listing SEO"],
      accent: "#ff3d8b",
      ghost: "Daraz",
      published: true,
    },
    /**
     * TODO — enable if you want a Walmart entry on the timeline. Your CV does not
     * mention Walmart, so it ships unpublished to keep the site truthful.
     */
    {
      id: "walmart",
      company: "Walmart",
      role: "[ROLE TITLE]",
      duration: "[DURATION]",
      period: "[START — END]",
      location: "[LOCATION]",
      summary: "[ONE-LINE SUMMARY]",
      bullets: ["[BULLET 1]", "[BULLET 2]", "[BULLET 3]"],
      stack: ["[TOOL]"],
      accent: "#3b3bdb",
      ghost: "Walmart",
      published: false,
    },
  ] as Experience[],

  experienceHeadline: {
    micro: "Experience",
    ghost: "Three roles,",
    ink: "one throughline",
    support: "Newest first, from agency-side semantic SEO back to the storefronts it all started on.",
  },

  /* -------------------------------------------------------------------- about */
  about: {
    // TODO: rewrite in your own voice — this is drafted from your CV.
    paragraphs: [
      "I'm Arsal Waseem, a semantic SEO executive based in Lahore. I work on the layer that comes before writing: what a topic is actually made of, which entities a page has to answer for, and how those pages link into something a search engine can read as authority.",
      "I came to SEO through marketplaces. Two years running Daraz and eBay storefronts taught me to read demand out of listing data before touching a keyword tool — and everything I do now starts the same way, with what people are already searching for.",
    ],
    facts: [
      { label: "Based in", value: "Lahore, Pakistan" },
      { label: "Focus", value: "Semantic SEO · Topical authority" },
      { label: "Industries", value: "Health · Law · Legal directories" },
      { label: "Education", value: "BBA (Hons), Hailey College of Banking & Finance" },
      { label: "Languages", value: "English · Urdu" },
    ],
  },

  /* ---------------------------------------------------------------------- seo */
  seo: {
    titleTemplate: "%s — Arsal Waseem",
    defaultTitle: "Arsal Malik — Semantic SEO Executive",
    description:
      "Portfolio of Arsal Waseem, a Semantic SEO Executive in Lahore. Topical maps, semantic content briefs, keyword strategy and e-commerce marketplace operations across Daraz and eBay.",
    keywords: [
      "Arsal Waseem",
      "Semantic SEO Executive",
      "SEO brief creator",
      "topical map development",
      "marketplace virtual assistant",
      "Daraz",
      "eBay",
      "Lahore SEO",
    ],
    siteUrl: "https://arsalwaseem.vercel.app", // TODO: your production domain
    ogAlt: "Arsal Malik — Semantic SEO Executive based in Lahore",
  },
} as const;

export type Profile = typeof profile;
