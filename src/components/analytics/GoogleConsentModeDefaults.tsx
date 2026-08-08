import Script from "next/script";
import { GOOGLE_CONSENT_DEFAULT_DENIED } from "@/lib/google-consent";

/**
 * Consent Mode v2 defaults before any gtag/GA load (beforeInteractive).
 * Must run only when GA is enabled for this deploy.
 * App Router: beforeInteractive belongs in the root layout (not Pages `_document`).
 */
export function GoogleConsentModeDefaults() {
  const payload = JSON.stringify(GOOGLE_CONSENT_DEFAULT_DENIED);

  return (
    // eslint-disable-next-line @next/next/no-before-interactive-script-outside-document -- root App Router layout
    <Script
      id="google-consent-default"
      strategy="beforeInteractive"
      dangerouslySetInnerHTML={{
        __html: `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('consent', 'default', ${payload});
gtag('set', 'ads_data_redaction', true);
gtag('set', 'url_passthrough', true);
`,
      }}
    />
  );
}
