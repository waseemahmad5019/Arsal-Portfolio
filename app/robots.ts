import type { MetadataRoute } from "next";
import { profile } from "@/data/profile";

export default function robots(): MetadataRoute.Robots {
  const base = profile.seo.siteUrl.replace(/\/$/, "");

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
      },
    ],
    sitemap: `${base}/sitemap.xml`,
    host: base,
  };
}
