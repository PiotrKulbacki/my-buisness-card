import { siteConfig } from "@/config/site";
import { EMAIL_LOGO_CID } from "@/lib/brevo";
import { fillTemplate, getEmailMessages, resolveLocale } from "@/lib/email/messages";
import type { Locale } from "@/i18n/routing";

export const EMAIL_BRAND = {
  void: "#050505",
  surface: "#121212",
  text: "#1a1a1a",
  muted: "#6b6b6b",
  accent: "#c8f542",
  accentInk: "#0a0a0a",
  pageBg: "#f0f0f0",
  white: "#ffffff",
  border: "#e4e4e4",
  wordmark: "#f5f5f5",
} as const;

export function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

export function getSiteUrl(): string {
  return (process.env.NEXT_PUBLIC_SITE_URL ?? siteConfig.url).replace(/\/$/, "");
}

type WrapEmailHtmlParams = {
  locale: Locale;
  bodyHtml: string;
  cta?: { label: string; url: string };
};

/**
 * Shared PK transactional email chrome: dark header + brand mark, body, optional CTA, footer.
 */
export function wrapEmailHtml(params: WrapEmailHtmlParams): string {
  const { locale, bodyHtml, cta } = params;
  const copy = getEmailMessages(locale);
  const brand = escapeHtml(siteConfig.name);
  const siteUrl = getSiteUrl();
  const siteUrlEscaped = escapeHtml(siteUrl);
  /** Inline CID — domain may not be live yet; HTTP URL would break in Gmail. */
  const markUrl = `cid:${EMAIL_LOGO_CID}`;
  const contactEmail = escapeHtml(siteConfig.email);
  const fontSans = "system-ui,-apple-system,'Segoe UI',sans-serif";
  const resolvedLocale = resolveLocale(locale);

  const ctaBlock = cta
    ? `
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin:28px 0 8px;">
        <tr>
          <td align="left">
            <table role="presentation" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td align="center" style="border-radius:10px;background:${EMAIL_BRAND.accent};">
                  <a href="${escapeHtml(cta.url)}"
                     style="display:inline-block;padding:14px 28px;font-family:${fontSans};font-size:14px;font-weight:600;line-height:1.2;color:${EMAIL_BRAND.accentInk};text-decoration:none;border-radius:10px;">
                    ${escapeHtml(cta.label)}
                  </a>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    `
    : "";

  const headerHtml = `
    <a href="${siteUrlEscaped}" style="text-decoration:none;">
      <table role="presentation" cellpadding="0" cellspacing="0" border="0">
        <tr>
          <td style="vertical-align:middle;padding-right:12px;line-height:0;">
            <img
              src="${markUrl}"
              width="40"
              height="40"
              alt="${brand}"
              style="display:block;width:40px;height:40px;border:0;outline:none;text-decoration:none;border-radius:10px;"
            />
          </td>
          <td style="vertical-align:middle;font-family:${fontSans};font-size:18px;font-weight:700;letter-spacing:-0.02em;color:${EMAIL_BRAND.wordmark};">
            ${brand}
          </td>
        </tr>
      </table>
    </a>
  `;

  const footerLead = escapeHtml(fillTemplate(copy.layout.footerLead, { name: siteConfig.name }));

  return `
<!DOCTYPE html>
<html lang="${resolvedLocale}">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${brand}</title>
</head>
<body style="margin:0;padding:0;background:${EMAIL_BRAND.pageBg};">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:${EMAIL_BRAND.pageBg};">
    <tr>
      <td align="center" style="padding:32px 16px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:560px;background:${EMAIL_BRAND.white};border-radius:12px;overflow:hidden;border:1px solid ${EMAIL_BRAND.border};">
          <tr>
            <td style="background:${EMAIL_BRAND.void};padding:24px 28px;border-bottom:2px solid ${EMAIL_BRAND.accent};">
              ${headerHtml}
            </td>
          </tr>
          <tr>
            <td style="padding:32px 28px;font-family:${fontSans};font-size:16px;line-height:1.55;color:${EMAIL_BRAND.text};">
              ${bodyHtml}
              ${ctaBlock}
            </td>
          </tr>
          <tr>
            <td style="padding:20px 28px 28px;border-top:1px solid ${EMAIL_BRAND.border};font-family:${fontSans};font-size:13px;line-height:1.5;color:${EMAIL_BRAND.muted};text-align:center;">
              <p style="margin:0 0 4px;">${footerLead}</p>
              <p style="margin:0;">
                <a href="mailto:${contactEmail}" style="color:${EMAIL_BRAND.text};text-decoration:underline;">${contactEmail}</a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}

export function mutedParagraphHtml(text: string, marginTop = 24): string {
  return `<p style="margin:${marginTop}px 0 0;font-size:14px;color:${EMAIL_BRAND.muted};">${escapeHtml(text)}</p>`;
}
