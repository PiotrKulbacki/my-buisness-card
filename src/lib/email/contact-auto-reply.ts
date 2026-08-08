import { EMAIL_BRAND, escapeHtml, mutedParagraphHtml, wrapEmailHtml } from "@/lib/email/layout";
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

  const bodyHtml = [
    `<p style="margin:0 0 16px;">${escapeHtml(greeting)}</p>`,
    `<p style="margin:0 0 20px;">${escapeHtml(copy.autoReply.body)}</p>`,
    `<p style="margin:0 0 8px;"><strong>${escapeHtml(copy.autoReply.messageLabel)}</strong></p>`,
    `<p style="margin:0 0 20px;padding:14px 16px;background:#f7f7f7;border-radius:10px;border:1px solid ${EMAIL_BRAND.border};white-space:pre-wrap;">${escapeHtml(params.message)}</p>`,
    `<p style="margin:0;">${escapeHtml(signOff)}</p>`,
    mutedParagraphHtml(copy.autoReply.footerNote),
  ].join("");

  const html = wrapEmailHtml({
    locale,
    bodyHtml,
  });

  return { subject, html, text };
}
