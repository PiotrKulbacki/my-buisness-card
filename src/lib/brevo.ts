import { readFileSync } from "node:fs";
import { join } from "node:path";

const BREVO_SEND_URL = "https://api.brevo.com/v3/smtp/email";

/** Inline logo Content-ID used in email HTML (`cid:pk-mark`). */
export const EMAIL_LOGO_CID = "pk-mark";

type ParsedSender = {
  name: string;
  email: string;
};

type InlineAttachment = {
  content: string;
  name: string;
  contentId: string;
};

function parseFromAddress(from: string): ParsedSender | null {
  const trimmed = from.trim();
  const angled = trimmed.match(/^(.*?)\s*<([^>]+)>$/);
  if (angled) {
    const email = angled[2]?.trim();
    if (!email) {
      return null;
    }
    return {
      name: angled[1]?.trim() || "Piotr Kulbacki",
      email,
    };
  }

  if (trimmed.includes("@")) {
    return { name: "Piotr Kulbacki", email: trimmed };
  }

  return null;
}

function getApiKey(): string | null {
  return process.env.BREVO_API_KEY?.trim() || null;
}

function getSender(): ParsedSender | null {
  const from = process.env.BREVO_FROM_EMAIL?.trim();
  if (!from) {
    return null;
  }
  return parseFromAddress(from);
}

let cachedLogoAttachment: InlineAttachment | null | undefined;

/** Square lime PK mark embedded via CID (works without a live domain). */
export function getEmailLogoAttachment(): InlineAttachment | null {
  if (cachedLogoAttachment !== undefined) {
    return cachedLogoAttachment;
  }

  try {
    const path = join(process.cwd(), "public/brand/email-mark.png");
    const content = readFileSync(path).toString("base64");
    cachedLogoAttachment = {
      content,
      name: "pk-mark.png",
      contentId: EMAIL_LOGO_CID,
    };
  } catch (error) {
    console.error("[brevo] failed to load email logo", error);
    cachedLogoAttachment = null;
  }

  return cachedLogoAttachment;
}

export function isEmailConfigured(): boolean {
  return Boolean(getApiKey() && getSender() && process.env.CONTACT_TO_EMAIL?.trim());
}

export function getContactInbox(): string | null {
  return process.env.CONTACT_TO_EMAIL?.trim() || null;
}

export async function sendTransactionalEmail(params: {
  to: string;
  subject: string;
  html: string;
  text: string;
  replyTo?: { email: string; name?: string };
}): Promise<{ ok: true } | { ok: false; error: string }> {
  const apiKey = getApiKey();
  const sender = getSender();

  if (!apiKey || !sender) {
    return { ok: false, error: "not_configured" };
  }

  const logo = getEmailLogoAttachment();

  try {
    const response = await fetch(BREVO_SEND_URL, {
      method: "POST",
      headers: {
        accept: "application/json",
        "api-key": apiKey,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        sender: {
          name: sender.name,
          email: sender.email,
        },
        to: [{ email: params.to }],
        subject: params.subject,
        htmlContent: params.html,
        textContent: params.text,
        ...(logo
          ? {
              attachment: [
                {
                  content: logo.content,
                  name: logo.name,
                  contentId: logo.contentId,
                },
              ],
            }
          : {}),
        ...(params.replyTo
          ? {
              replyTo: {
                email: params.replyTo.email,
                ...(params.replyTo.name ? { name: params.replyTo.name } : {}),
              },
            }
          : {}),
      }),
    });

    if (!response.ok) {
      const body = await response.text().catch(() => "");
      console.error("[brevo] send failed", response.status, body.slice(0, 500));
      return { ok: false, error: "send_failed" };
    }

    return { ok: true };
  } catch (error) {
    console.error("[brevo] send error", error);
    return { ok: false, error: "send_failed" };
  }
}
