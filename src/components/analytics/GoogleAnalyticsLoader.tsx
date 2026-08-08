"use client";

import { GoogleAnalytics } from "@next/third-parties/google";
import { useLayoutEffect, useSyncExternalStore } from "react";
import { updateGoogleConsentMode } from "@/lib/google-consent";
import {
  getConsentServerSnapshot,
  getConsentSnapshot,
  subscribeConsent,
} from "@/lib/cookie-consent";

type Props = {
  gaId: string;
};

/**
 * Loads official GA4 only after analytics consent.
 * Syncs Google Consent Mode v2 (`analytics_storage`) before GA scripts run.
 */
export function GoogleAnalyticsLoader({ gaId }: Props) {
  const consent = useSyncExternalStore(
    subscribeConsent,
    getConsentSnapshot,
    getConsentServerSnapshot,
  );
  const analyticsGranted = Boolean(gaId && consent?.analytics);

  useLayoutEffect(() => {
    if (!gaId) return;
    // Keep Consent Mode in sync (granted only when banner accepted analytics).
    updateGoogleConsentMode(Boolean(consent?.analytics));
  }, [gaId, consent?.analytics]);

  if (!analyticsGranted) {
    return null;
  }

  return <GoogleAnalytics gaId={gaId} />;
}
