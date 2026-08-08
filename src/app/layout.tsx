import type { ReactNode } from "react";
import { GoogleAnalyticsLoader } from "@/components/analytics/GoogleAnalyticsLoader";
import { GoogleConsentModeDefaults } from "@/components/analytics/GoogleConsentModeDefaults";

const gaMeasurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim() ?? "";
const enableGoogleAnalytics = process.env.NODE_ENV === "production" && gaMeasurementId.length > 0;

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <>
      {enableGoogleAnalytics ? <GoogleConsentModeDefaults /> : null}
      {children}
      {enableGoogleAnalytics ? <GoogleAnalyticsLoader gaId={gaMeasurementId} /> : null}
    </>
  );
}
