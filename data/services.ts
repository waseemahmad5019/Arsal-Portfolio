/**
 * "SIX MOODS" — services / specialities.
 * Six arch-topped cards. Labels are drawn from your CV; TODO: rewrite in your voice.
 */

export type Service = {
  id: string;
  /** Number shown on the card, e.g. "01". */
  index: string;
  title: string;
  blurb: string;
  /** Micro-label next to the coloured dot. */
  dot: string;
  accent: string;
  image: string;
  tags: string[];
};

export const services: Service[] = [
  {
    id: "topical-maps",
    index: "01",
    title: "Topical Maps",
    blurb: "Entity, attribute and subtopic architecture that builds topical authority instead of one-off pages.",
    dot: "Strategy",
    accent: "#3b3bdb",
    image: "topical-map-architecture",
    tags: ["Entities", "Clusters", "Internal links"],
  },
  {
    id: "semantic-briefs",
    index: "02",
    title: "Content Briefs",
    blurb: "Briefs that read like a plan, not a word count — intent, structure, and what to cover in what order.",
    dot: "Content",
    accent: "#ff3d8b",
    image: "editorial-brief-desk",
    tags: ["Intent", "Outline", "Schema"],
  },
  {
    id: "keyword-strategy",
    index: "03",
    title: "Keyword Strategy",
    blurb: "Research and prioritisation grounded in demand, difficulty and what the business actually sells.",
    dot: "Research",
    accent: "#c8501b",
    image: "keyword-research-notes",
    tags: ["SEMrush", "Ahrefs", "SERP"],
  },
  {
    id: "intent-analysis",
    index: "04",
    title: "Intent Analysis",
    blurb: "Reading the SERP before writing a word, so the format matches what searchers expect to land on.",
    dot: "Analysis",
    accent: "#24082c",
    image: "serp-intent-study",
    tags: ["SERP", "Competitors", "Depth"],
  },
  {
    id: "listings-catalog",
    index: "05",
    title: "Listings & Catalog",
    blurb: "Product titles, attributes and descriptions tuned for marketplace search — built to scale past a few hundred rows.",
    dot: "Commerce",
    accent: "#3b3bdb",
    image: "catalog-shelving-detail",
    tags: ["Titles", "Attributes", "Sheets"],
  },
  {
    id: "store-ops",
    index: "06",
    title: "Store Operations",
    blurb: "Orders, inventory, returns and buyer support handled calmly, with reporting the client can read in a minute.",
    dot: "Ops",
    accent: "#ff3d8b",
    image: "parcel-desk-orders",
    tags: ["Orders", "CX", "Reporting"],
  },
];

export const servicesHeadline = {
  micro: "Six Moods",
  line1: "What I",
  accent: "actually",
  line2: "do all day",
  note: "— six things, done properly",
};
