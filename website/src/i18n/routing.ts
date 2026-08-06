import { defineRouting } from "next-intl/routing";

export const locales = ["pl", "en", "de", "es", "uk"] as const;
export type Locale = (typeof locales)[number];

export const routing = defineRouting({
  locales,
  defaultLocale: "en",
  localePrefix: "always",
  localeDetection: true,
});
