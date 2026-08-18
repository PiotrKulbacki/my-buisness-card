import { escapeHtml, mutedParagraphHtml, wrapEmailHtml } from "@/lib/email/layout";
import { fillTemplate, getEmailMessages, resolveLocale } from "@/lib/email/messages";
import { siteConfig } from "@/config/site";
import type { ReplyTokenPayload } from "@/lib/schemas/reply";

export function buildOwnerReplyEmail(params: { token: ReplyTokenPayload; message: string }): {
  subject: string;
  html: string;
  text: string;
} {
  const locale = resolveLocale(params.token.locale);
  const copy = getEmailMessages(locale);
  const greeting = fillTemplate(copy.ownerReply.greeting, { name: params.token.name });
  const signOff = fillTemplate(copy.ownerReply.signOff, { name: siteConfig.name });
  const originalSubject =
    params.token.source === "brief" ? copy.briefAutoReply.subject : copy.autoReply.subject;
  const subject = fillTemplate(copy.ownerReply.subject, { originalSubject });

  const text = [greeting, "", params.message, "", signOff].join("\n");

  const bodyHtml = [
    `<p style="margin:0 0 16px;">${escapeHtml(greeting)}</p>`,
    `<p style="margin:0 0 20px;white-space:pre-wrap;">${escapeHtml(params.message)}</p>`,
    `<p style="margin:0;">${escapeHtml(signOff).replaceAll("\n", "<br />")}</p>`,
    mutedParagraphHtml(copy.ownerReply.footerNote),
  ].join("");

  return {
    subject,
    html: wrapEmailHtml({ locale, bodyHtml }),
    text,
  };
}
