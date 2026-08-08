import { NextResponse } from "next/server";
import { z } from "zod";
import { siteConfig } from "@/config/site";
import { getContactInbox, isEmailConfigured, sendTransactionalEmail } from "@/lib/brevo";
import { buildContactAutoReplyEmail } from "@/lib/email/contact-auto-reply";
import { buildContactInboxEmail } from "@/lib/email/contact-inbox";
import { getClientIp, rateLimit } from "@/lib/rate-limit";
import { isTurnstileConfigured, verifyTurnstileToken } from "@/lib/turnstile";
import { locales } from "@/i18n/routing";

const schema = z.object({
  name: z.string().min(2).max(80),
  email: z.string().email(),
  phone: z.string().max(40).optional(),
  message: z.string().min(10).max(4000),
  website: z.string().optional(),
  locale: z.enum(locales).optional(),
  turnstileToken: z.string().optional(),
});

export async function POST(request: Request) {
  try {
    const limited = rateLimit(`contact:${getClientIp(request)}`);
    if (!limited.ok) {
      return NextResponse.json(
        { error: "Too many requests" },
        {
          status: 429,
          headers: { "Retry-After": String(limited.retryAfterSec) },
        },
      );
    }

    const json = await request.json();
    const parsed = schema.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }

    if (parsed.data.website) {
      return NextResponse.json({ ok: true });
    }

    if (isTurnstileConfigured()) {
      const captcha = await verifyTurnstileToken(parsed.data.turnstileToken, request);
      if (!captcha.ok) {
        return NextResponse.json({ error: "Captcha failed" }, { status: 400 });
      }
    }

    if (!isEmailConfigured()) {
      console.info("[contact]", {
        name: parsed.data.name,
        email: parsed.data.email,
        phone: parsed.data.phone,
        locale: parsed.data.locale,
      });
      return NextResponse.json({
        ok: true,
        mocked: true,
      });
    }

    const inbox = getContactInbox();
    if (!inbox) {
      return NextResponse.json({ error: "Failed to send" }, { status: 500 });
    }

    const inboxMail = buildContactInboxEmail({
      name: parsed.data.name,
      email: parsed.data.email,
      phone: parsed.data.phone,
      message: parsed.data.message,
      locale: parsed.data.locale,
    });

    const inboxResult = await sendTransactionalEmail({
      to: inbox,
      subject: inboxMail.subject,
      html: inboxMail.html,
      text: inboxMail.text,
      replyTo: {
        email: parsed.data.email,
        name: parsed.data.name,
      },
    });

    if (!inboxResult.ok) {
      return NextResponse.json({ error: "Failed to send" }, { status: 500 });
    }

    const autoReply = buildContactAutoReplyEmail({
      name: parsed.data.name,
      message: parsed.data.message,
      locale: parsed.data.locale,
    });

    const autoReplyResult = await sendTransactionalEmail({
      to: parsed.data.email,
      subject: autoReply.subject,
      html: autoReply.html,
      text: autoReply.text,
      replyTo: {
        email: siteConfig.email,
        name: siteConfig.name,
      },
    });

    if (!autoReplyResult.ok) {
      console.error("[contact] auto-reply failed", autoReplyResult.error);
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to send" }, { status: 500 });
  }
}
