/**
 * ============================================================================
 *  SITE — every editorial block that is not personal data.
 *
 *  The page follows the structure of the reference design (see README): a
 *  workspace mock in the hero, three data-backed service tiles, a full-bleed
 *  work centrepiece, a connection diagram, a tooling orbit, a comparison panel,
 *  a live work log and a closing call to action.
 *
 *  Anything in [SQUARE BRACKETS] is a placeholder. Values marked
 *  "illustrative" are sample figures — see `disclaimer` at the bottom.
 * ============================================================================
 */

/* --------------------------------------------------------------------------- */
/*  HERO WORKSPACE MOCK                                                        */
/* --------------------------------------------------------------------------- */

/**
 * The hero dashboard. Every value here is ILLUSTRATIVE — it is a product-style
 * mock, not real analytics. Swap in a real screenshot when you have one.
 */
export const workspace = {
  name: "Waseem workspace",
  sub: "Private workspace",
  search: "Search a query, cluster or URL",
  nav: ["Overview", "Topical maps", "Keywords", "Briefs", "Audits", "Reports"],
  owner: { role: "Account owner", name: "Arsal Waseem" },
  primary: { label: "Total tracked queries", value: 48201, delta: "+6.4%" },
  legend: [
    { label: "Impressions", value: "1.24M", color: "#c89b5f" },
    { label: "Avg. position", value: "6.4", color: "#8fa05a" },
    { label: "CTR", value: "3.9%", color: "#a3a39e" },
  ],
  // Ascending bar series for the activity column.
  series: [18, 26, 22, 34, 30, 41, 38, 47, 44, 52, 58, 63],
  tooltip: "6,218",
  hint: "Scroll to explore",
};

/* --------------------------------------------------------------------------- */
/*  WHAT I DO — three data-backed tiles                                        */
/* --------------------------------------------------------------------------- */

export type PillarMock = {
  title: string;
  visual: "bars" | "metric" | "donut";
  /** The headline figure shown inside the glass card. */
  hero?: { label: string; value: string; note?: string };
  metrics?: { label: string; value: string }[];
  rows?: { label: string; value: string }[];
  series?: number[];
  donut?: { label: string; value: number; color: string }[];
  meter?: { value: number; label: string };
};

export type Pillar = {
  id: string;
  index: string;
  title: string;
  blurb: string;
  /** Diagonal gradient used as the tile's backdrop. */
  tile: { from: string; to: string };
  mock: PillarMock;
};

export const pillars: Pillar[] = [
  {
    id: "map",
    index: "01",
    title: "Map the topic",
    blurb:
      "Every entity, attribute and subtopic the topic actually needs — drawn as one structure before a single page gets written.",
    tile: { from: "#b9c0ca", to: "#8b96a4" },
    mock: {
      title: "Topical coverage",
      visual: "bars",
      metrics: [
        { label: "Entities", value: "1,240" },
        { label: "Added", value: "+318" },
        { label: "Clusters", value: "24" },
      ],
      series: [12, 18, 24, 21, 30, 36, 33, 44, 51, 48, 58, 66],
      rows: [
        { label: "Clusters", value: "24" },
        { label: "Subtopics", value: "318" },
        { label: "Still uncovered", value: "9" },
      ],
    },
  },
  {
    id: "brief",
    index: "02",
    title: "Write the brief",
    blurb:
      "The brief is the product. Intent, structure, entities to cover and the questions the page has to answer — in the order a reader meets them.",
    tile: { from: "#caa26c", to: "#7f5a2f" },
    mock: {
      title: "Brief health",
      visual: "metric",
      hero: { label: "Intent matched", value: "100%", note: "Checked against the live result page" },
      metrics: [
        { label: "Entities", value: "34" },
        { label: "Headings", value: "12" },
        { label: "Links", value: "18" },
      ],
      rows: [
        { label: "Schema defined", value: "FAQ + Article" },
        { label: "Internal links", value: "18" },
        { label: "Writer decisions left", value: "None" },
      ],
    },
  },
  {
    id: "signals",
    index: "03",
    title: "Watch the signals",
    blurb:
      "Search Console, rank data and crawl output read together, so the next piece of work is chosen from evidence instead of a hunch.",
    tile: { from: "#c5c5a6", to: "#83905a" },
    mock: {
      title: "Cluster coverage",
      visual: "donut",
      hero: { label: "Mapped and live", value: "78%", note: "Within the plan for this quarter" },
      donut: [
        { label: "Informational", value: 48, color: "#f5e2c1" },
        { label: "Commercial", value: 25, color: "#c89b5f" },
        { label: "Transactional", value: 19, color: "#8fa05a" },
        { label: "Navigational", value: 8, color: "#c9c8c2" },
      ],
      meter: { value: 0.78, label: "Coverage of the mapped cluster" },
    },
  },
];

export const pillarsHeading = {
  micro: "What I do",
  ghost: "Every signal,",
  ink: "one structure behind it",
  support:
    "Three passes, in this order. Map what the topic is made of, write the brief that turns it into pages, then let the data choose what happens next.",
};

/* --------------------------------------------------------------------------- */
/*  CONNECTIONS — the diagram + the three capabilities                         */
/* --------------------------------------------------------------------------- */

export const network = {
  micro: "How it connects",
  ghost: "One strategy.",
  ink: "Every layer connected.",
  core: "ARSAL CORE",
  caption: ["One source of truth", "A process that repeats", "Nothing left to guess"],
  nodes: [
    { id: "entities", label: "ENTITY MAPS", x: 24, y: 20, align: "right" as const },
    { id: "briefs", label: "BRIEFS", x: 76, y: 18, align: "left" as const },
    { id: "keywords", label: "KEYWORDS", x: 9, y: 54, align: "below" as const },
    { id: "onpage", label: "ON-PAGE", x: 30, y: 82, align: "below" as const },
    { id: "reporting", label: "REPORTING", x: 72, y: 84, align: "below" as const },
  ],
};

export type Capability = {
  id: string;
  title: string;
  blurb: string;
  /** Small monospace tag list. */
  tags: string[];
};

export const capabilities: Capability[] = [
  {
    id: "entities",
    title: "Entities & schema",
    blurb: "Structured data that says the same thing your copy says, in a form a machine can read.",
    tags: ["JSON-LD", "FAQ", "Organisation"],
  },
  {
    id: "catalogue",
    title: "Catalogue & listings",
    blurb: "Titles, attributes and descriptions tuned for marketplace search — built to hold past a few hundred rows.",
    tags: ["eBay", "Daraz", "Bulk sheets"],
  },
  {
    id: "operations",
    title: "Storefront operations",
    blurb: "Orders, inventory, returns and buyer messages handled calmly, with a report the client can read in a minute.",
    tags: ["Orders", "Returns", "Reporting"],
  },
];

export const capabilitiesHeading = {
  micro: "Core capabilities",
  title: "Built for every layer of your search presence",
};

/* --------------------------------------------------------------------------- */
/*  TOOLING — the orbiting monograms                                           */
/* --------------------------------------------------------------------------- */

export type Tool = {
  id: string;
  monogram: string;
  name: string;
  note: string;
  /** Bubble colour. */
  tone: "light" | "dark" | "butter" | "ochre" | "moss";
  /** Position as a percentage of the orbit box, and a size in px. */
  x: number;
  y: number;
  size: number;
  /** Defocused for depth, like the reference. */
  soft?: boolean;
};

export const tools: Tool[] = [
  { id: "semrush", monogram: "SE", name: "Semrush", note: "Competitor and keyword gap analysis", tone: "light", x: 6, y: 58, size: 46, soft: true },
  { id: "ahrefs", monogram: "AH", name: "Ahrefs", note: "Backlinks, rankings and topical data", tone: "dark", x: 19, y: 32, size: 38 },
  { id: "gsc", monogram: "SC", name: "Search Console", note: "Queries, impressions and coverage", tone: "butter", x: 32, y: 20, size: 52 },
  { id: "screamingfrog", monogram: "SF", name: "Screaming Frog", note: "Crawls that turn into a fix queue", tone: "ochre", x: 47, y: 56, size: 42 },
  { id: "keywordseverywhere", monogram: "KE", name: "Keywords Everywhere", note: "Volume and CPC while browsing", tone: "light", x: 61, y: 24, size: 36, soft: true },
  { id: "chatgpt", monogram: "GP", name: "ChatGPT", note: "Drafting, summarising and QA passes", tone: "moss", x: 74, y: 52, size: 50 },
  { id: "gemini", monogram: "GM", name: "Gemini", note: "Research and long-document reading", tone: "dark", x: 87, y: 30, size: 40 },
  { id: "claude", monogram: "CL", name: "Claude", note: "Structural edits on long briefs", tone: "butter", x: 95, y: 60, size: 44, soft: true },
];

export const toolingHeading = {
  micro: "Tooling",
  ghost: "Quietly connected",
  ink: "to the tools you already run",
  lead: "Eight tools. Used daily. Nothing outsourced.",
  support:
    "Search Console for what is actually happening, Semrush and Ahrefs for what is possible, Screaming Frog for what is broken, and the assistants for the parts of the work that are reading rather than deciding.",
  centre: "arsal — at the centre",
};

/* --------------------------------------------------------------------------- */
/*  COMPARISON                                                                 */
/* --------------------------------------------------------------------------- */

export const comparison = {
  micro: "Why me",
  ghost: "Built for compounding",
  ink: "not for quick wins",
  support:
    "Most SEO work is sold as a sprint and delivered as a report. This is the opposite: a structure that gets built once and keeps paying.",
  columns: { left: "Core capabilities", mine: "Working with me", theirs: "Typical agency" },
  rows: [
    { label: "One person, start to finish", mine: "yes", theirs: "partial" },
    { label: "Topical maps, not keyword lists", mine: "yes", theirs: "absent" },
    { label: "Briefs your writers can follow", mine: "yes", theirs: "partial" },
    { label: "Marketplace plus SEO experience", mine: "yes", theirs: "absent" },
    { label: "A reply within a working day", mine: "yes", theirs: "yes" },
  ],
  footer: { label: "Who you actually talk to", mine: "Me", theirs: "An account manager" },
};

/* --------------------------------------------------------------------------- */
/*  LIVE WORK LOG + CLOSING CALL TO ACTION                                     */
/* --------------------------------------------------------------------------- */

export type LogItem = {
  id: string;
  title: string;
  detail: string;
};

/** Illustrative examples of the shape of the work — not a live feed. */
export const liveLog: LogItem[] = [
  { id: "log-1", title: "Topical map updated", detail: "Nine new subtopics added to a health cluster" },
  { id: "log-2", title: "Brief shipped", detail: "Legal directory landing page, twelve headings" },
  { id: "log-3", title: "Crawl triaged", detail: "214 URLs reviewed, twelve flagged as priority" },
  { id: "log-4", title: "Listing refresh", detail: "Titles and item specifics rebuilt in bulk" },
  { id: "log-5", title: "Report sent", detail: "Weekly Search Console read, plain English" },
];

export const closing = {
  micro: "Start today",
  ghost: "Grow your",
  /** Sits between the two halves of the ghost line. */
  ghostTail: "visibility,",
  ink: "at a pace that holds",
  support:
    "Send me the domain and what you are trying to sell. You will get back the three things worth doing first — no deck, no retainer talk.",
};

export const liveLogHeading = {
  micro: "Live work log",
  live: "Live",
};

/* --------------------------------------------------------------------------- */
/*  SELECTED WORK                                                              */
/* --------------------------------------------------------------------------- */

export const workHeading = {
  micro: "Selected work",
  ghost: "Work that moved",
  ink: "a number that mattered",
  support:
    "Six projects where the structure came first and the results followed — a topical map, two storefront rebuilds, a brief system, an audit and a content cluster.",
  /** The bronze card's staged build. All figures are illustrative. */
  card: {
    counter: { value: "+2,410", label: "Queries mapped this year" },
    chip: "92",
    alert: { title: "Gap alert", body: "Nine subtopics in the legal cluster are still uncovered." },
    checklist: ["Map the entity gaps", "Brief the top twenty queries", "Link the cluster both ways", "Ship the schema"],
  },
};

/* --------------------------------------------------------------------------- */
/*  JOURNAL / ABOUT / CONTACT                                                  */
/* --------------------------------------------------------------------------- */

export const journalHeading = {
  micro: "Journal",
  ghost: "Notes on the",
  ink: "process, not the algorithm",
  support: "Short pieces about how the work actually gets built — the map, the brief, the crawl and the storefront.",
};

export const aboutHeading = {
  micro: "About",
  ghost: "The person",
  ink: "behind the structure",
};

export const contactHeading = {
  micro: "Contact",
  ghost: "Tell me what you are",
  ink: "trying to rank for",
  support:
    "Whether it is a topical map, a crawl nobody wants to read, or a catalogue that needs rewriting — send the URL and I will tell you honestly what I would do first.",
};

export const footerNote = {
  micro: "Availability",
  disclaimer:
    "Illustrative figures. Dashboard, chart and log values on this site are sample data from the design, not client results.",
};

/**
 * TODO — if you publish real numbers anywhere on this site, keep them
 * defensible. Every figure above is deliberately generic so nothing here can be
 * read as a client claim.
 */
