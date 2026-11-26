import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { absoluteLocaleUrl, getIndexableRoutes, hreflangLanguages } from "@/lib/seo";

/**
 * sitemap.xml - every public locale URL + xhtml hreflang alternates
 * (same map as page metadata / `buildPageMetadata`). `lastmod` is the hand-set date of the
 * last significant change; no `changefreq` / `priority` (ignored by Google and Bing).
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const routes = getIndexableRoutes();

  return routing.locales.flatMap((locale) =>
    routes.map((route) => ({
      url: absoluteLocaleUrl(locale, route.path),
      lastModified: route.lastModified,
      alternates: {
        languages: hreflangLanguages(route.path),
      },
    })),
  );
}
