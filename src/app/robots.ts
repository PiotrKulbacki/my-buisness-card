import type { MetadataRoute } from "next";
import { getSiteOrigin } from "@/lib/seo";

/**
 * robots.txt — allow public pages; keep API private.
 * Sitemap URL matches `src/app/sitemap.ts` (`/sitemap.xml`).
 */
export default function robots(): MetadataRoute.Robots {
  const origin = getSiteOrigin();

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/*/reply"],
      },
    ],
    sitemap: `${origin}/sitemap.xml`,
    host: origin,
  };
}
