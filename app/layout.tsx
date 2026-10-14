import type { Metadata, Viewport } from "next";
import { Instrument_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";

import { profile } from "@/data/profile";
import ThemeProvider, { paletteInitScript } from "@/components/providers/ThemeProvider";
import SmoothScrollProvider from "@/components/providers/SmoothScrollProvider";
import IntroProvider from "@/components/providers/IntroProvider";
import MotionProvider from "@/components/providers/MotionProvider";
import SiteHeader from "@/components/layout/SiteHeader";
import Footer from "@/components/layout/Footer";
import CustomCursor from "@/components/layout/CustomCursor";
import { ResumeDialog } from "@/components/ui/ResumeDialog";

/* ------------------------------------------------------------------ fonts */

// One neo-grotesque for everything — headlines, body, buttons, panel UI.
const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-instrument",
  display: "swap",
});

// Letter-spaced monospace for every micro-label, nav item and legal line.
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains",
  display: "swap",
});

/* --------------------------------------------------------------- metadata */

const { seo } = profile;

export const metadata: Metadata = {
  metadataBase: new URL(seo.siteUrl),
  title: {
    default: seo.defaultTitle,
    template: seo.titleTemplate,
  },
  description: seo.description,
  keywords: [...seo.keywords],
  authors: [{ name: profile.name, url: seo.siteUrl }],
  creator: profile.name,
  publisher: profile.name,
  applicationName: `${profile.name} — Portfolio`,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: seo.siteUrl,
    siteName: `${profile.name} — Portfolio`,
    title: seo.defaultTitle,
    description: seo.description,
    locale: "en_GB",
  },
  twitter: {
    card: "summary_large_image",
    title: seo.defaultTitle,
    description: seo.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
    apple: [{ url: "/icon.svg" }],
  },
  category: "technology",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fafafa" },
    { media: "(prefers-color-scheme: dark)", color: "#131312" },
  ],
  colorScheme: "light",
};

/* ------------------------------------------------------------------ schema */

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  givenName: profile.firstName,
  jobTitle: profile.jobTitle,
  description: seo.description,
  url: seo.siteUrl,
  image: `${seo.siteUrl}${profile.profileImage}`,
  email: `mailto:${profile.email}`,
  telephone: profile.phoneHref,
  address: {
    "@type": "PostalAddress",
    addressLocality: profile.city,
    addressCountry: "PK",
  },
  worksFor: {
    "@type": "Organization",
    name: "Rank Brilliance",
  },
  // Career history, newest first.
  hasOccupation: profile.experience
    .filter((role) => role.published)
    .map((role) => ({
      "@type": "Occupation",
      name: role.role,
      description: role.summary,
      occupationLocation: { "@type": "Place", name: role.location },
      estimatedSalary: undefined,
      hiringOrganization: { "@type": "Organization", name: role.company },
    })),
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Hailey College of Banking and Finance, University of the Punjab",
  },
  knowsAbout: [
    "Semantic SEO",
    "Topical map development",
    "Content brief creation",
    "Keyword research",
    "Search intent analysis",
    "Marketplace operations",
    "Product listing optimisation",
  ],
  sameAs: [profile.linkedin].filter((url) => url.startsWith("http")),
};

/* ------------------------------------------------------------------ layout */

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB" data-palette="studio" suppressHydrationWarning className={`${instrumentSans.variable} ${jetbrainsMono.variable}`}>
      <head>
        {/* Applies the saved palette before paint so there is no colour flash. */}
        <script dangerouslySetInnerHTML={{ __html: paletteInitScript }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }} />
      </head>
      <body className="bg-shell font-sans text-ink antialiased">
        <MotionProvider>
          <ThemeProvider>
            <IntroProvider>
              <SmoothScrollProvider>
                <SiteHeader />
                <main id="main" className="relative">
                  {children}
                </main>
                <Footer />
                <CustomCursor />
                <ResumeDialog />
              </SmoothScrollProvider>
            </IntroProvider>
          </ThemeProvider>
        </MotionProvider>
      </body>
    </html>
  );
}
