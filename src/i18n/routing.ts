import { defineRouting } from "next-intl/routing";
import { COOKIE_MAX_AGE_SECONDS, LOCALE_COOKIE_NAME } from "@/config/cookies";

export const locales = ["pl", "en", "de", "es", "uk"] as const;
export type Locale = (typeof locales)[number];

export const routing = defineRouting({
  locales,
  defaultLocale: "en",
  localePrefix: "always",
  localeDetection: true,
  localeCookie: {
    name: LOCALE_COOKIE_NAME,
    maxAge: COOKIE_MAX_AGE_SECONDS,
    sameSite: "lax",
    path: "/",
  },
});
