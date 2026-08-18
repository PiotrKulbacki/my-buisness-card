import { NextResponse } from "next/server";
import { siteConfig } from "@/config/site";
import { getContactInbox, isEmailConfigured, sendTransactionalEmail } from "@/lib/brevo";
import { buildOwnerReplyEmail } from "@/lib/email/owner-reply";
import { getClientIp, rateLimit } from "@/lib/rate-limit";
import { verifyReplyToken } from "@/lib/reply-token";
import { replyPayloadSchema } from "@/lib/schemas/reply";

export async function POST(request: Request) {
  try {
    const limited = rateLimit(`reply:${getClientIp(request)}`);
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
    const parsed = replyPayloadSchema.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }

    if (parsed.data.website) {
      return NextResponse.json({ ok: true });
    }

    const token = verifyReplyToken(parsed.data.token);
    if (!token) {
      return NextResponse.json({ error: "Invalid token" }, { status: 400 });
    }

    const recipientLimit = rateLimit(`reply-to:${token.to.toLowerCase()}`);
    if (!recipientLimit.ok) {
      return NextResponse.json(
        { error: "Too many requests" },
        {
          status: 429,
          headers: { "Retry-After": String(recipientLimit.retryAfterSec) },
        },
      );
    }

    if (!isEmailConfigured()) {
      console.info("[reply]", { to: token.to, source: token.source, locale: token.locale });
      return NextResponse.json({ ok: true, mocked: true });
    }

    const mail = buildOwnerReplyEmail({ token, message: parsed.data.message });
    const inbox = getContactInbox();
    const result = await sendTransactionalEmail({
      to: token.to,
      subject: mail.subject,
      html: mail.html,
      text: mail.text,
      replyTo: {
        email: siteConfig.email,
        name: siteConfig.name,
      },
      bcc: inbox && inbox.toLowerCase() !== token.to.toLowerCase() ? inbox : undefined,
    });

    if (!result.ok) {
      return NextResponse.json({ error: "Failed to send" }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to send" }, { status: 500 });
  }
}
