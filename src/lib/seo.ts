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
  changeFrequency: "weekly" | "monthly" | "yearly";
  priority: number;
};

/** Public pages listed in sitemap (one entry per locale + hreflang). */
export function getIndexableRoutes(): IndexableRoute[] {
  const staticRoutes: IndexableRoute[] = [
    { path: "", changeFrequency: "weekly", priority: 1 },
    { path: "/about", changeFrequency: "monthly", priority: 0.8 },
    { path: "/projects", changeFrequency: "weekly", priority: 0.9 },
    { path: "/path", changeFrequency: "monthly", priority: 0.8 },
    { path: "/contact", changeFrequency: "monthly", priority: 0.8 },
    { path: "/privacy", changeFrequency: "yearly", priority: 0.3 },
    { path: "/impressum", changeFrequency: "yearly", priority: 0.3 },
  ];

  const projectRoutes: IndexableRoute[] = projects.map((project) => ({
    path: `/projects/${project.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...projectRoutes];
}

/** Shared brand OG/Twitter card (logo lockup) — same graphic for every public URL. */
export function brandShareImage(locale: string) {
  const code = (
    routing.locales.includes(locale as Locale) ? locale : routing.defaultLocale
  ) as Locale;
  return {
    url: `${getSiteOrigin()}/${code}/opengraph-image`,
    width: 1200,
    height: 630,
    alt: `${siteConfig.name} — ${siteConfig.role}`,
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
  const shareImage = brandShareImage(locale);

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
