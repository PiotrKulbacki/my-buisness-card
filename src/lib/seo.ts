import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { projects } from "@/content/projects";
import { routing, type Locale } from "@/i18n/routing";

const ogLocales: Record<Locale, string> = {
  pl: "pl_PL",
  en: "en_US",
  de: "de_DE",
  es: "es_ES",
  uk: "uk_UA",
};

export function getSiteOrigin(): string {
  return (process.env.NEXT_PUBLIC_SITE_URL ?? siteConfig.url).replace(/\/$/, "");
}

/** Path without locale prefix, e.g. "" | "/about" | "/projects/lyamo" */
export function normalizeSitePath(path = ""): string {
  if (!path || path === "/") return "";
  return path.startsWith("/") ? path : `/${path}`;
}

export function localePathname(locale: string, path = ""): string {
  return `/${locale}${normalizeSitePath(path)}`;
}

export function absoluteLocaleUrl(locale: string, path = ""): string {
  return `${getSiteOrigin()}${localePathname(locale, path)}`;
}

/** Absolute hreflang map aligned with page `alternates.languages` (+ x-default → EN). */
export function hreflangLanguages(path = ""): Record<string, string> {
  const languages = Object.fromEntries(
    routing.locales.map((code) => [code, absoluteLocaleUrl(code, path)]),
  );
  return {
    ...languages,
    "x-default": absoluteLocaleUrl(routing.defaultLocale, path),
  };
}

export type IndexableRoute = {
  path: string;
  /** Last significant change of content, structured data or links (ISO 8601); set by hand. */
  lastModified: string;
};

/** Date of the person/services update (home, about, services). */
const ENTITY_UPDATE = "2026-11-26T23:30:00+01:00";
/** Last site-wide content edit (punctuation pass, #3). */
const CONTENT_UPDATE = "2026-10-20T13:53:07+02:00";

/** Public pages listed in sitemap (one entry per locale + hreflang). */
export function getIndexableRoutes(): IndexableRoute[] {
  const staticRoutes: IndexableRoute[] = [
    { path: "", lastModified: ENTITY_UPDATE },
    { path: "/about", lastModified: ENTITY_UPDATE },
    { path: "/services", lastModified: ENTITY_UPDATE },
    { path: "/projects", lastModified: CONTENT_UPDATE },
    { path: "/path", lastModified: CONTENT_UPDATE },
    { path: "/contact", lastModified: CONTENT_UPDATE },
    { path: "/contact/brief", lastModified: CONTENT_UPDATE },
    { path: "/privacy", lastModified: CONTENT_UPDATE },
    { path: "/impressum", lastModified: CONTENT_UPDATE },
    { path: "/agb", lastModified: CONTENT_UPDATE },
    { path: "/widerruf", lastModified: CONTENT_UPDATE },
  ];

  const projectRoutes: IndexableRoute[] = projects.map((project) => ({
    path: `/projects/${project.slug}`,
    lastModified: CONTENT_UPDATE,
  }));

  return [...staticRoutes, ...projectRoutes];
}

/** `lastModified` of one indexable route (e.g. `ProfilePage.dateModified` for ""). */
export function routeLastModified(path: string): string | undefined {
  return getIndexableRoutes().find((route) => route.path === normalizeSitePath(path))?.lastModified;
}

/** Shared brand OG/Twitter card - static `/og.png` (WhatsApp needs a file extension). */
export function brandShareImage() {
  const url = `${getSiteOrigin()}${siteConfig.brand.shareOg}`;
  return {
    url,
    secureUrl: url,
    width: 1200,
    height: 630,
    alt: `${siteConfig.name} - ${siteConfig.role}`,
    type: "image/png" as const,
  };
}

/** Path without locale prefix, e.g. "" | "/about" | "/projects/lyamo" */
export function buildPageMetadata(options: {
  locale: string;
  path?: string;
  title?: string;
  description: string;
  /** When true, title is the document title as-is (home). Otherwise uses layout template. */
  absoluteTitle?: string;
}): Metadata {
  const locale = (
    routing.locales.includes(options.locale as Locale) ? options.locale : routing.defaultLocale
  ) as Locale;
  const normalizedPath = normalizeSitePath(options.path);
  const pathname = localePathname(locale, normalizedPath);
  const shareImage = brandShareImage();

  const languages = Object.fromEntries(
    routing.locales.map((code) => [code, localePathname(code, normalizedPath)]),
  );

  return {
    ...(options.absoluteTitle
      ? { title: { absolute: options.absoluteTitle } }
      : options.title
        ? { title: options.title }
        : {}),
    description: options.description,
    alternates: {
      canonical: pathname,
      languages: {
        ...languages,
        "x-default": localePathname(routing.defaultLocale, normalizedPath),
      },
    },
    openGraph: {
      ...(options.absoluteTitle
        ? { title: options.absoluteTitle }
        : options.title
          ? { title: options.title }
          : {}),
      description: options.description,
      url: pathname,
      locale: ogLocales[locale],
      type: "website",
      images: [shareImage],
    },
    twitter: {
      card: "summary_large_image",
      ...(options.absoluteTitle
        ? { title: options.absoluteTitle }
        : options.title
          ? { title: options.title }
          : {}),
      description: options.description,
      images: [shareImage.url],
    },
  };
}
