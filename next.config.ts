import type { NextConfig } from "next";

/**
 * Remote images are served from Picsum (royalty-free, Unsplash-sourced, deterministic
 * per seed) so the site looks finished with real photography before you drop in your
 * own files. Swap `lib/images.ts` -> `img()` for local assets in /public/images and
 * you can delete this block.
 */
const nextConfig: NextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  images: {
    formats: ["image/avif", "image/webp"],
    // Next 16 requires an explicit allowlist; ArchImage opts into a slightly
    // higher quality than the default 75 for the editorial crops.
    qualities: [75, 78],
    remotePatterns: [
      { protocol: "https", hostname: "picsum.photos" },
      { protocol: "https", hostname: "fastly.picsum.photos" },
    ],
  },
  async headers() {
    return [
      {
        source: "/resume.pdf",
        headers: [
          { key: "Cache-Control", value: "public, max-age=3600, must-revalidate" },
          { key: "Content-Disposition", value: 'inline; filename="Arsal-Waseem-CV.pdf"' },
        ],
      },
    ];
  },
};

export default nextConfig;
