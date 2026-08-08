/** First-party cookies used by this portfolio site. Keep in sync with privacy copy. */

export const COOKIE_CONSENT_NAME = "pk_cookie_consent";
export const LOCALE_COOKIE_NAME = "NEXT_LOCALE";

/** Consent cookie + locale preference: 1 year */
export const COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24 * 365;

export const COOKIE_CONSENT_VERSION = 1;

export type CookieConsentValue = {
  version: number;
  analytics: boolean;
  updatedAt: string;
};

export const cookieInventory = [
  {
    name: LOCALE_COOKIE_NAME,
    category: "necessary" as const,
    maxAgeDays: 365,
  },
  {
    name: COOKIE_CONSENT_NAME,
    category: "necessary" as const,
    maxAgeDays: 365,
  },
] as const;
