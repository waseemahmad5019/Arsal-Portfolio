/**
 * JOURNAL — process writing, plus the numbered "Explore the Range" list that
 * sits beside the tilted card deck.
 */

export type Post = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  readTime: string;
  image: string;
  accent: string;
  bg: string;
  featured?: boolean;
};

export const posts: Post[] = [
  {
    id: "post-1",
    slug: "building-a-topical-map",
    title: "How I build a topical map from scratch",
    excerpt:
      "Start with what the business sells, not with a keyword tool. The map is a mirror of the offer before it's a mirror of the SERP.",
    date: "2026-08-12",
    category: "Process",
    readTime: "8 min",
    image: "journal-seo-notes",
    accent: "#3b3bdb",
    bg: "#f6f1e7",
    featured: true,
  },
  {
    id: "post-2",
    slug: "the-brief-is-the-product",
    title: "The brief is the product",
    excerpt:
      "A good brief removes decisions. If a writer has to guess, the brief failed — and so did the page that comes out of it.",
    date: "2026-07-02",
    category: "Craft",
    readTime: "6 min",
    image: "journal-seo-brief",
    accent: "#ff3d8b",
    bg: "#f8cbd9",
  },
  {
    id: "post-3",
    slug: "two-years-on-daraz",
    title: "What two years on Daraz taught me about search",
    excerpt:
      "Marketplace search is unforgiving and immediate. It taught me to write titles like a buyer reads them, not like a tool counts them.",
    date: "2026-05-21",
    category: "Commerce",
    readTime: "7 min",
    image: "journal-marketplace-work",
    accent: "#c8501b",
    bg: "#e8ddc9",
  },
  {
    id: "post-4",
    slug: "read-the-serp-first",
    title: "Read the SERP before you write a word",
    excerpt:
      "Format is a ranking factor you can copy from the top ten. Every brief I write opens with a paragraph about what the results actually look like.",
    date: "2026-04-03",
    category: "Method",
    readTime: "5 min",
    image: "journal-serp-analysis",
    accent: "#3b3bdb",
    bg: "#ded2f7",
  },
];

export const journalHeadline = {
  micro: "Latest Trends",
  line1: "Stories behind",
  line2: "the seams",
  support:
    "Notes on my process — how the maps get drawn, why the brief comes first, and what two years behind a storefront dashboard changed in how I think about search.",
  cta: "Discover now",
  deckLabel: "From the journal",
};

export type RangeItem = {
  index: string;
  from: string;
  to: string;
  count: string;
};

/** The numbered list on the right of the journal section. */
export const processRange: RangeItem[] = [
  { index: "01", from: "Topical Maps", to: "Site architecture", count: "24" },
  { index: "02", from: "Briefs", to: "Content", count: "40+" },
  { index: "03", from: "Audits", to: "Technical", count: "11" },
  { index: "04", from: "Listings", to: "Catalogue", count: "600+" },
  { index: "05", from: "Reporting", to: "Clients", count: "Daily" },
];

export const processRangeHeading = "Explore the Range";
