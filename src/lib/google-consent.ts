/**
 * Google Consent Mode v2 helpers (no CMP).
 * Defaults are denied; analytics_storage is granted only after banner accept.
 * Ads-related signals stay denied (this site does not run ads).
 */

export type GoogleConsentState = "granted" | "denied";

export type GoogleConsentSettings = {
  analytics_storage: GoogleConsentState;
  ad_storage: GoogleConsentState;
  ad_user_data: GoogleConsentState;
  ad_personalization: GoogleConsentState;
};

/** Default before any user choice — required by Consent Mode v2 + RODO. */
export const GOOGLE_CONSENT_DEFAULT_DENIED = {
  analytics_storage: "denied",
  ad_storage: "denied",
  ad_user_data: "denied",
  ad_personalization: "denied",
  wait_for_update: 500,
} as const;

export function consentSettingsFromAnalyticsChoice(
  analyticsGranted: boolean,
): GoogleConsentSettings {
  return {
    analytics_storage: analyticsGranted ? "granted" : "denied",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
  };
}

function ensureGtagStub() {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  if (typeof window.gtag !== "function") {
    window.gtag = function gtag(...args: unknown[]) {
      window.dataLayer!.push(args);
    };
  }
}

/** Call after the user accepts or rejects analytics (and on return visits). */
export function updateGoogleConsentMode(analyticsGranted: boolean) {
  if (typeof window === "undefined") return;
  ensureGtagStub();
  window.gtag!("consent", "update", consentSettingsFromAnalyticsChoice(analyticsGranted));
}

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}
