import {
  COOKIE_CONSENT_NAME,
  COOKIE_CONSENT_VERSION,
  COOKIE_MAX_AGE_SECONDS,
  type CookieConsentValue,
} from "@/config/cookies";
import { updateGoogleConsentMode } from "@/lib/google-consent";

export const COOKIE_SETTINGS_EVENT = "pk:open-cookie-settings";
export const COOKIE_CONSENT_CHANGE_EVENT = "pk:cookie-consent-change";

export function parseConsentCookie(raw: string | undefined | null): CookieConsentValue | null {
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as Partial<CookieConsentValue>;
    if (
      typeof parsed.version !== "number" ||
      typeof parsed.analytics !== "boolean" ||
      typeof parsed.updatedAt !== "string"
    ) {
      return null;
    }
    if (parsed.version !== COOKIE_CONSENT_VERSION) return null;
    return {
      version: parsed.version,
      analytics: parsed.analytics,
      updatedAt: parsed.updatedAt,
    };
  } catch {
    return null;
  }
}

export function readConsentFromDocument(): CookieConsentValue | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${COOKIE_CONSENT_NAME}=`));
  if (!match) return null;
  const value = decodeURIComponent(match.slice(COOKIE_CONSENT_NAME.length + 1));
  return parseConsentCookie(value);
}

export function writeConsentCookie(analytics: boolean): CookieConsentValue {
  const value: CookieConsentValue = {
    version: COOKIE_CONSENT_VERSION,
    analytics,
    updatedAt: new Date().toISOString(),
  };
  const encoded = encodeURIComponent(JSON.stringify(value));
  const secure =
    typeof window !== "undefined" && window.location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${COOKIE_CONSENT_NAME}=${encoded}; Path=/; Max-Age=${COOKIE_MAX_AGE_SECONDS}; SameSite=Lax${secure}`;
  cachedConsentSnapshot = value;
  // Consent Mode v2 update before GA mounts / after revoke
  updateGoogleConsentMode(analytics);
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event(COOKIE_CONSENT_CHANGE_EVENT));
  }
  return value;
}

export function openCookieSettings() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event(COOKIE_SETTINGS_EVENT));
}

export function subscribeConsent(onStoreChange: () => void) {
  if (typeof window === "undefined") return () => {};
  window.addEventListener(COOKIE_CONSENT_CHANGE_EVENT, onStoreChange);
  return () => window.removeEventListener(COOKIE_CONSENT_CHANGE_EVENT, onStoreChange);
}

/** Stable reference for useSyncExternalStore — new object each read causes infinite loop. */
let cachedConsentSnapshot: CookieConsentValue | null = null;

function consentEquals(a: CookieConsentValue | null, b: CookieConsentValue | null) {
  if (a === b) return true;
  if (!a || !b) return false;
  return a.version === b.version && a.analytics === b.analytics && a.updatedAt === b.updatedAt;
}

export function getConsentSnapshot() {
  const next = readConsentFromDocument();
  const stable =
    next === null
      ? null
      : consentEquals(cachedConsentSnapshot, next)
        ? cachedConsentSnapshot
        : next;
  cachedConsentSnapshot = stable;
  return stable;
}

export function getConsentServerSnapshot(): CookieConsentValue | null {
  return null;
}
