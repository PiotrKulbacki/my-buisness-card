import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { absoluteLocaleUrl, getIndexableRoutes, hreflangLanguages } from "@/lib/seo";

/**
 * sitemap.xml — every public locale URL + xhtml hreflang alternates
 * (same map as page metadata / `buildPageMetadata`).
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const routes = getIndexableRoutes();

  return routing.locales.flatMap((locale) =>
    routes.map((route) => ({
      url: absoluteLocaleUrl(locale, route.path),
      lastModified,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
      alternates: {
        languages: hreflangLanguages(route.path),
      },
    })),
  );
}
