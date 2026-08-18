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

/**
 * Hex for Outlook/desktop, rgba for Gmail iOS. Gmail dark mode inverts hex `color`
 * (paper PNG stays light → ghost text) but leaves rgba alone, so type stays black.
 */
export function inkCss(hex: string): string {
  const r = Number.parseInt(hex.slice(1, 3), 16);
  const g = Number.parseInt(hex.slice(3, 5), 16);
  const b = Number.parseInt(hex.slice(5, 7), 16);
  const rgba = `rgba(${r},${g},${b},1)`;
  return `color:${hex};color:${rgba};-webkit-text-fill-color:${hex};-webkit-text-fill-color:${rgba};`;
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
 * Shared PK transactional email chrome: light canvas + light card, void header, optional CTA.
 *
 * Paper/void/accent PNGs keep fills stable in Gmail iOS. Body type uses hex + rgba (`inkCss`)
 * so dark-mode inversion cannot bleach text on the light paper.
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
  const paperUrl = escapeHtml(`${assetBase}/brand/email-paper.png`);
  const accentUrl = escapeHtml(`${assetBase}/brand/email-accent.png`);
  const contactEmail = escapeHtml(siteConfig.email);
  const fontSans = "system-ui,-apple-system,'Segoe UI',sans-serif";
  const resolvedLocale = resolveLocale(locale);
  const headerFill = `background-color:${EMAIL_BRAND.void};background-image:url('${voidUrl}');background-repeat:repeat;`;
  const paperFill = `background-color:${EMAIL_BRAND.card};background-image:url('${paperUrl}');background-repeat:repeat;`;
  const ctaFill = `background-color:${EMAIL_BRAND.accent};background-image:linear-gradient(${EMAIL_BRAND.accent},${EMAIL_BRAND.accent});background-image:url('${accentUrl}');background-repeat:repeat;`;
  const ctaText = inkCss(EMAIL_BRAND.accentInk);
  const bodyInk = inkCss(EMAIL_BRAND.text);
  const mutedInk = inkCss(EMAIL_BRAND.muted);

  const ctaBlock = cta
    ? `
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin:28px 0 8px;">
        <tr>
          <td align="left">
            <table role="presentation" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td class="email-cta" align="center" bgcolor="${EMAIL_BRAND.accent}" background="${accentUrl}" style="border-radius:10px;${ctaFill}">
                  <a href="${escapeHtml(cta.url)}"
                     class="email-cta-label"
                     style="display:inline-block;padding:14px 28px;font-family:${fontSans};font-size:14px;font-weight:600;line-height:1.2;${ctaText}text-decoration:none;border-radius:10px;${ctaFill}">
                    <span class="email-cta-label" style="${ctaText}font-weight:600;">${escapeHtml(cta.label)}</span>
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
    :root { color-scheme: light; supported-color-schemes: light; }
    .email-ink, .email-ink p, .email-ink h2, .email-ink strong, .email-ink span, .email-ink div,
    .email-paper, .email-paper p, .email-quote, .email-quote p, .email-quote strong, .email-quote span {
      color: ${EMAIL_BRAND.text} !important;
      color: rgba(23,23,23,1) !important;
      -webkit-text-fill-color: ${EMAIL_BRAND.text} !important;
      -webkit-text-fill-color: rgba(23,23,23,1) !important;
    }
    .email-muted {
      color: ${EMAIL_BRAND.muted} !important;
      color: rgba(115,115,115,1) !important;
      -webkit-text-fill-color: ${EMAIL_BRAND.muted} !important;
      -webkit-text-fill-color: rgba(115,115,115,1) !important;
    }
    .email-cta-label, .email-cta-label span {
      color: ${EMAIL_BRAND.accentInk} !important;
      color: rgba(10,10,10,1) !important;
      -webkit-text-fill-color: ${EMAIL_BRAND.accentInk} !important;
      -webkit-text-fill-color: rgba(10,10,10,1) !important;
    }
    @media (prefers-color-scheme: dark) {
      .email-canvas { background-color: ${EMAIL_BRAND.pageBg} !important; }
      .email-card, .email-paper { background-color: ${EMAIL_BRAND.card} !important; }
      .email-header { background-color: ${EMAIL_BRAND.void} !important; }
      .email-ink, .email-ink p, .email-ink h2, .email-ink strong, .email-ink span, .email-ink div,
      .email-paper, .email-paper p, .email-quote, .email-quote p, .email-body {
        color: ${EMAIL_BRAND.text} !important;
        color: rgba(23,23,23,1) !important;
        -webkit-text-fill-color: ${EMAIL_BRAND.text} !important;
        -webkit-text-fill-color: rgba(23,23,23,1) !important;
      }
      .email-cta { background-color: ${EMAIL_BRAND.accent} !important; }
      .email-cta-label, .email-cta-label span {
        background-color: ${EMAIL_BRAND.accent} !important;
        color: ${EMAIL_BRAND.accentInk} !important;
        color: rgba(10,10,10,1) !important;
        -webkit-text-fill-color: ${EMAIL_BRAND.accentInk} !important;
        -webkit-text-fill-color: rgba(10,10,10,1) !important;
      }
    }
    [data-ogsc] .email-ink, [data-ogsc] .email-ink p, [data-ogsc] .email-ink h2, [data-ogsc] .email-ink strong,
    [data-ogsc] .email-ink span, [data-ogsc] .email-ink div, [data-ogsc] .email-paper, [data-ogsc] .email-paper p,
    [data-ogsc] .email-quote, [data-ogsc] .email-quote p, [data-ogsb] .email-ink, [data-ogsb] .email-ink p,
    [data-ogsb] .email-ink h2, [data-ogsb] .email-paper, [data-ogsb] .email-quote {
      color: ${EMAIL_BRAND.text} !important;
      color: rgba(23,23,23,1) !important;
      -webkit-text-fill-color: ${EMAIL_BRAND.text} !important;
      -webkit-text-fill-color: rgba(23,23,23,1) !important;
    }
    [data-ogsc] .email-cta-label, [data-ogsc] .email-cta-label span,
    [data-ogsb] .email-cta-label, [data-ogsb] .email-cta-label span {
      color: ${EMAIL_BRAND.accentInk} !important;
      color: rgba(10,10,10,1) !important;
      -webkit-text-fill-color: ${EMAIL_BRAND.accentInk} !important;
      -webkit-text-fill-color: rgba(10,10,10,1) !important;
    }
  </style>
</head>
<body class="email-canvas" bgcolor="${EMAIL_BRAND.pageBg}" style="margin:0;padding:0;background:${EMAIL_BRAND.pageBg};">
  <table class="email-canvas" role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="${EMAIL_BRAND.pageBg}" style="background:${EMAIL_BRAND.pageBg};">
    <tr>
      <td class="email-canvas" align="center" bgcolor="${EMAIL_BRAND.pageBg}" style="padding:32px 16px;background:${EMAIL_BRAND.pageBg};">
        <table class="email-card" role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="${EMAIL_BRAND.card}" style="max-width:560px;background:${EMAIL_BRAND.card};border-radius:12px;overflow:hidden;border:1px solid ${EMAIL_BRAND.border};">
          <tr>
            <td class="email-header" bgcolor="${EMAIL_BRAND.void}" background="${voidUrl}" style="${headerFill}padding:22px 28px;border-bottom:2px solid ${EMAIL_BRAND.accent};">
              ${headerHtml}
            </td>
          </tr>
          <tr>
            <td class="email-paper email-body" bgcolor="${EMAIL_BRAND.card}" background="${paperUrl}" style="${paperFill}padding:32px 28px;font-family:${fontSans};font-size:16px;line-height:1.55;${bodyInk}">
              <div class="email-ink" style="${bodyInk}">
              ${bodyHtml}
              </div>
              ${ctaBlock}
            </td>
          </tr>
          <tr>
            <td class="email-paper" bgcolor="${EMAIL_BRAND.card}" background="${paperUrl}" style="${paperFill}padding:20px 28px 28px;border-top:1px solid ${EMAIL_BRAND.border};font-family:${fontSans};font-size:13px;line-height:1.5;text-align:center;${mutedInk}">
              <p class="email-muted" style="margin:0 0 4px;${mutedInk}">${footerLead}</p>
              <p style="margin:0;">
                <a href="mailto:${contactEmail}" style="${bodyInk}text-decoration:underline;">${contactEmail}</a>
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
  return `<p class="email-muted" style="margin:${marginTop}px 0 0;font-size:14px;${inkCss(EMAIL_BRAND.muted)}">${escapeHtml(text)}</p>`;
}

export function quoteBoxHtml(innerHtml: string): string {
  const quoteUrl = escapeHtml(`${getEmailAssetBaseUrl()}/brand/email-quote.png`);
  const fill = `background-color:${EMAIL_BRAND.quoteBg};background-image:url('${quoteUrl}');background-repeat:repeat;`;
  return `<div class="email-quote" style="margin:0 0 20px;padding:14px 16px;${fill}border-radius:10px;border:1px solid ${EMAIL_BRAND.border};${inkCss(EMAIL_BRAND.text)}">${innerHtml}</div>`;
}
