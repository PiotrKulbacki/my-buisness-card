import { NextResponse } from "next/server";
import { siteConfig } from "@/config/site";
import { getContactInbox, isEmailConfigured, sendTransactionalEmail } from "@/lib/brevo";
import { buildBriefAutoReplyEmail } from "@/lib/email/brief-auto-reply";
import { buildBriefInboxEmail } from "@/lib/email/brief-inbox";
import { getClientIp, rateLimit } from "@/lib/rate-limit";
import { briefPayloadSchema } from "@/lib/schemas/brief";
import { isTurnstileConfigured, verifyTurnstileToken } from "@/lib/turnstile";

export async function POST(request: Request) {
  try {
    const limited = rateLimit(`brief:${getClientIp(request)}`);
    if (!limited.ok) {
      return NextResponse.json(
        { error: "Too many requests" },
        {
          status: 429,
          headers: { "Retry-After": String(limited.retryAfterSec) },
        },
      );
    }

    const json: unknown = await request.json();
    const parsed = briefPayloadSchema.safeParse(json);
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
      console.info("[brief]", {
        name: parsed.data.name,
        email: parsed.data.email,
        projectType: parsed.data.projectType,
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

    const inboxMail = buildBriefInboxEmail(parsed.data);
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

    const autoReply = buildBriefAutoReplyEmail(parsed.data);
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
      console.error("[brief] auto-reply failed", autoReplyResult.error);
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to send" }, { status: 500 });
  }
}
