import {
  EMAIL_BRAND,
  escapeHtml,
  inkCss,
  mutedParagraphHtml,
  quoteBoxHtml,
  wrapEmailHtml,
} from "@/lib/email/layout";
import { fillTemplate, getEmailMessages, resolveLocale } from "@/lib/email/messages";
import { siteConfig } from "@/config/site";

export type ContactAutoReplyEmailParams = {
  name: string;
  message: string;
  locale?: string | null;
};

export function buildContactAutoReplyEmail(params: ContactAutoReplyEmailParams): {
  subject: string;
  html: string;
  text: string;
} {
  const locale = resolveLocale(params.locale);
  const copy = getEmailMessages(locale);
  const subject = copy.autoReply.subject;
  const greeting = fillTemplate(copy.autoReply.greeting, { name: params.name });
  const signOff = fillTemplate(copy.autoReply.signOff, { name: siteConfig.name });

  const text = [
    greeting,
    "",
    copy.autoReply.body,
    "",
    copy.autoReply.messageLabel,
    params.message,
    "",
    signOff,
  ].join("\n");

  const bodyInk = inkCss(EMAIL_BRAND.text);
  const bodyHtml = [
    `<p style="margin:0 0 16px;${bodyInk}">${escapeHtml(greeting)}</p>`,
    `<p style="margin:0 0 20px;${bodyInk}">${escapeHtml(copy.autoReply.body)}</p>`,
    `<p style="margin:0 0 8px;${bodyInk}"><strong style="${bodyInk}">${escapeHtml(copy.autoReply.messageLabel)}</strong></p>`,
    quoteBoxHtml(
      `<p style="margin:0;white-space:pre-wrap;${bodyInk}">${escapeHtml(params.message)}</p>`,
    ),
    `<p style="margin:0;${bodyInk}">${escapeHtml(signOff)}</p>`,
    mutedParagraphHtml(copy.autoReply.footerNote),
  ].join("");

  const html = wrapEmailHtml({
    locale,
    bodyHtml,
  });

  return { subject, html, text };
}
