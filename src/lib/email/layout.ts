import { siteConfig } from "@/config/site";
import { fillTemplate, getEmailMessages, resolveLocale } from "@/lib/email/messages";
import type { Locale } from "@/i18n/routing";

export const EMAIL_BRAND = {
  void: "#050505",
  surface: "#f5f5f5",
  text: "#171717",
  muted: "#737373",
  accent: "#c8f542",
  accentInk: "#0a0a0a",
  pageBg: "#f4f4f5",
  card: "#f5f5f5",
  quoteBg: "#ececec",
  white: "#ffffff",
  border: "#e5e5e5",
  wordmark: "#f5f5f5",
} as const;

/** Display size for horizontal lockup in email header (source ~1065×272). */
const EMAIL_LOCKUP_WIDTH = 280;
const EMAIL_LOCKUP_HEIGHT = 72;

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

/**
 * Public base for email `<img>` assets. Defaults to the live site URL.
 * Override with EMAIL_ASSET_BASE_URL only if assets are hosted elsewhere.
 */
export function getEmailAssetBaseUrl(): string {
  return (
    process.env.EMAIL_ASSET_BASE_URL?.trim() ||
    process.env.NEXT_PUBLIC_SITE_URL?.trim() ||
    siteConfig.url
  ).replace(/\/$/, "");
}

type WrapEmailHtmlParams = {
  locale: Locale;
  bodyHtml: string;
  cta?: { label: string; url: string };
};

/**
 * Light canvas + light card, black header, optional lime CTA.
 * Body uses bgcolor only (no paper tile): Gmail iOS inverts fill and type together,
 * so text stays readable. Header/CTA tiles are not inverted.
 */
export function wrapEmailHtml(params: WrapEmailHtmlParams): string {
  const { locale, bodyHtml, cta } = params;
  const copy = getEmailMessages(locale);
  const brand = escapeHtml(siteConfig.name);
  const siteUrl = getSiteUrl();
  const siteUrlEscaped = escapeHtml(siteUrl);
  const assetBase = getEmailAssetBaseUrl();
  const lockupUrl = escapeHtml(`${assetBase}${siteConfig.brand.lockupHorizontal}`);
  const voidUrl = escapeHtml(`${assetBase}/brand/email-void.png`);
  const accentUrl = escapeHtml(`${assetBase}/brand/email-accent.png`);
  const contactEmail = escapeHtml(siteConfig.email);
  const fontSans = "system-ui,-apple-system,'Segoe UI',sans-serif";
  const resolvedLocale = resolveLocale(locale);
  const headerFill = `background-color:${EMAIL_BRAND.void};background-image:url('${voidUrl}');background-repeat:repeat;`;
  const ctaFill = `background-color:${EMAIL_BRAND.accent};background-image:url('${accentUrl}');background-repeat:repeat;`;

  const ctaBlock = cta
    ? `
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin:28px 0 8px;">
        <tr>
          <td align="left">
            <table role="presentation" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td align="center" bgcolor="${EMAIL_BRAND.accent}" background="${accentUrl}" style="border-radius:10px;${ctaFill}">
                  <a href="${escapeHtml(cta.url)}"
                     class="email-cta-label"
                     style="display:inline-block;padding:14px 28px;font-family:${fontSans};font-size:14px;font-weight:600;line-height:1.2;color:${EMAIL_BRAND.accentInk};text-decoration:none;border-radius:10px;${ctaFill}">
                    <span class="email-cta-label" style="color:${EMAIL_BRAND.accentInk};-webkit-text-fill-color:${EMAIL_BRAND.accentInk};">${escapeHtml(cta.label)}</span>
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
    <a href="${siteUrlEscaped}" style="text-decoration:none;display:inline-block;line-height:0;">
      <img
        src="${lockupUrl}"
        width="${EMAIL_LOCKUP_WIDTH}"
        height="${EMAIL_LOCKUP_HEIGHT}"
        alt="${brand}"
        style="display:block;width:${EMAIL_LOCKUP_WIDTH}px;max-width:100%;height:auto;border:0;outline:none;text-decoration:none;background-color:${EMAIL_BRAND.void};"
      />
    </a>
  `;

  const footerLead = escapeHtml(fillTemplate(copy.layout.footerLead, { name: siteConfig.name }));

  return `
<!DOCTYPE html>
<html lang="${resolvedLocale}">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="color-scheme" content="light" />
  <meta name="supported-color-schemes" content="light" />
  <title>${brand}</title>
  <style>
    .email-cta-label { color: ${EMAIL_BRAND.accentInk} !important; -webkit-text-fill-color: ${EMAIL_BRAND.accentInk} !important; }
    [data-ogsc] .email-cta-label { color: ${EMAIL_BRAND.accentInk} !important; -webkit-text-fill-color: ${EMAIL_BRAND.accentInk} !important; }
  </style>
</head>
<body bgcolor="${EMAIL_BRAND.pageBg}" style="margin:0;padding:0;background:${EMAIL_BRAND.pageBg};">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="${EMAIL_BRAND.pageBg}" style="background:${EMAIL_BRAND.pageBg};">
    <tr>
      <td align="center" bgcolor="${EMAIL_BRAND.pageBg}" style="padding:32px 16px;background:${EMAIL_BRAND.pageBg};">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="${EMAIL_BRAND.card}" style="max-width:560px;background:${EMAIL_BRAND.card};border-radius:12px;overflow:hidden;border:1px solid ${EMAIL_BRAND.border};">
          <tr>
            <td bgcolor="${EMAIL_BRAND.void}" background="${voidUrl}" style="${headerFill}padding:22px 28px;border-bottom:2px solid ${EMAIL_BRAND.accent};">
              ${headerHtml}
            </td>
          </tr>
          <tr>
            <td bgcolor="${EMAIL_BRAND.card}" style="padding:32px 28px;font-family:${fontSans};font-size:16px;line-height:1.55;color:${EMAIL_BRAND.text};background:${EMAIL_BRAND.card};">
              ${bodyHtml}
              ${ctaBlock}
            </td>
          </tr>
          <tr>
            <td bgcolor="${EMAIL_BRAND.card}" style="padding:20px 28px 28px;border-top:1px solid ${EMAIL_BRAND.border};font-family:${fontSans};font-size:13px;line-height:1.5;color:${EMAIL_BRAND.muted};text-align:center;background:${EMAIL_BRAND.card};">
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

export function quoteBoxHtml(innerHtml: string): string {
  return `<div style="margin:0 0 20px;padding:14px 16px;background:${EMAIL_BRAND.quoteBg};border-radius:10px;border:1px solid ${EMAIL_BRAND.border};">${innerHtml}</div>`;
}
