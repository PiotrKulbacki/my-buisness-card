import type { Metadata } from "next";
import { routing, type Locale } from "@/i18n/routing";

const ogLocales: Record<Locale, string> = {
  pl: "pl_PL",
  en: "en_US",
  de: "de_DE",
  es: "es_ES",
  uk: "uk_UA",
};

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
  const path = options.path ?? "";
  const normalizedPath = path === "/" ? "" : path;
  const pathname = `/${locale}${normalizedPath}`;

  const languages = Object.fromEntries(
    routing.locales.map((code) => [code, `/${code}${normalizedPath}`]),
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
        "x-default": `/${routing.defaultLocale}${normalizedPath}`,
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
    },
    twitter: {
      card: "summary_large_image",
      ...(options.absoluteTitle
        ? { title: options.absoluteTitle }
        : options.title
          ? { title: options.title }
          : {}),
      description: options.description,
    },
  };
}
