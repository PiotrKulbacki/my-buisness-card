import { EMAIL_BRAND, escapeHtml, mutedParagraphHtml, wrapEmailHtml } from "@/lib/email/layout";
import { fillTemplate, getEmailMessages, resolveLocale } from "@/lib/email/messages";

export type ContactInboxEmailParams = {
  name: string;
  email: string;
  phone?: string;
  message: string;
  locale?: string | null;
};

export function buildContactInboxEmail(params: ContactInboxEmailParams): {
  subject: string;
  html: string;
  text: string;
} {
  const locale = resolveLocale(params.locale);
  const copy = getEmailMessages(locale);
  const subject = fillTemplate(copy.inbox.subject, { name: params.name });
  const replyUrl = `mailto:${encodeURIComponent(params.email)}`;

  const textLines = [
    copy.inbox.title,
    "",
    `${copy.inbox.nameLabel}: ${params.name}`,
    `${copy.inbox.emailLabel}: ${params.email}`,
  ];
  if (params.phone) {
    textLines.push(`${copy.inbox.phoneLabel}: ${params.phone}`);
  }
  textLines.push("", `${copy.inbox.messageLabel}:`, params.message);

  const bodyParts = [
    `<h2 style="margin:0 0 20px;font-size:18px;font-weight:700;color:${EMAIL_BRAND.text};">${escapeHtml(copy.inbox.title)}</h2>`,
    `<p style="margin:0 0 8px;"><strong>${escapeHtml(copy.inbox.nameLabel)}:</strong> ${escapeHtml(params.name)}</p>`,
    `<p style="margin:0 0 8px;"><strong>${escapeHtml(copy.inbox.emailLabel)}:</strong> ${escapeHtml(params.email)}</p>`,
  ];
  if (params.phone) {
    bodyParts.push(
      `<p style="margin:0 0 8px;"><strong>${escapeHtml(copy.inbox.phoneLabel)}:</strong> ${escapeHtml(params.phone)}</p>`,
    );
  }
  bodyParts.push(
    `<p style="margin:16px 0 8px;"><strong>${escapeHtml(copy.inbox.messageLabel)}:</strong></p>`,
    `<p style="margin:0;white-space:pre-wrap;">${escapeHtml(params.message)}</p>`,
    mutedParagraphHtml(copy.inbox.replyHint),
  );

  const html = wrapEmailHtml({
    locale,
    bodyHtml: bodyParts.join(""),
    cta: { label: copy.inbox.cta, url: replyUrl },
  });

  return { subject, html, text: textLines.join("\n") };
}
