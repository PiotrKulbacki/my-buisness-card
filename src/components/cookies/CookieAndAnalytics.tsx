"use client";

import { Analytics } from "@vercel/analytics/react";
import { useSyncExternalStore } from "react";
import { CookieConsent } from "@/components/cookies/CookieConsent";
import {
  getConsentServerSnapshot,
  getConsentSnapshot,
  subscribeConsent,
} from "@/lib/cookie-consent";

export function CookieAndAnalytics() {
  const consent = useSyncExternalStore(
    subscribeConsent,
    getConsentSnapshot,
    getConsentServerSnapshot,
  );

  return (
    <>
      <CookieConsent />
      {consent?.analytics ? <Analytics /> : null}
    </>
  );
}
