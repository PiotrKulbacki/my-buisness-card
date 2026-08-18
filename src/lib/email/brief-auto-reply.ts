import {
  EMAIL_BRAND,
  escapeHtml,
  inkCss,
  mutedParagraphHtml,
  quoteBoxHtml,
  wrapEmailHtml,
} from "@/lib/email/layout";
import { fillTemplate, getEmailMessages, resolveLocale } from "@/lib/email/messages";
import { buildBriefRows } from "@/lib/email/brief-inbox";
import { siteConfig } from "@/config/site";
import type { BriefPayload } from "@/lib/schemas/brief";

export function buildBriefAutoReplyEmail(params: BriefPayload): {
  subject: string;
  html: string;
  text: string;
} {
  const locale = resolveLocale(params.locale);
  const copy = getEmailMessages(locale);
  const subject = copy.briefAutoReply.subject;
  const greeting = fillTemplate(copy.briefAutoReply.greeting, { name: params.name });
  const signOff = fillTemplate(copy.briefAutoReply.signOff, { name: siteConfig.name });
  const summaryRows = buildBriefRows(params, locale);

  const text = [
    greeting,
    "",
    copy.briefAutoReply.body,
    "",
    copy.briefAutoReply.summaryLabel,
    ...summaryRows.map((row) => `${row.label}: ${row.value}`),
    "",
    signOff,
  ].join("\n");

  const bodyInk = inkCss(EMAIL_BRAND.text);
  const summaryHtml = summaryRows
    .map(
      (row) =>
        `<p style="margin:0 0 10px;${bodyInk}"><strong style="${bodyInk}">${escapeHtml(row.label)}:</strong><br /><span style="white-space:pre-wrap;${bodyInk}">${escapeHtml(row.value)}</span></p>`,
    )
    .join("");

  const bodyHtml = [
    `<p style="margin:0 0 16px;${bodyInk}">${escapeHtml(greeting)}</p>`,
    `<p style="margin:0 0 20px;${bodyInk}">${escapeHtml(copy.briefAutoReply.body)}</p>`,
    `<p style="margin:0 0 8px;${bodyInk}"><strong style="${bodyInk}">${escapeHtml(copy.briefAutoReply.summaryLabel)}</strong></p>`,
    quoteBoxHtml(summaryHtml),
    `<p style="margin:0;${bodyInk}">${escapeHtml(signOff).replaceAll("\n", "<br />")}</p>`,
    mutedParagraphHtml(copy.briefAutoReply.footerNote),
  ].join("");

  const html = wrapEmailHtml({
    locale,
    bodyHtml,
  });

  return { subject, html, text };
}
