import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";
import { getClientIp, rateLimit } from "@/lib/rate-limit";

const schema = z.object({
  name: z.string().min(2).max(80),
  email: z.string().email(),
  phone: z.string().max(40).optional(),
  message: z.string().min(10).max(4000),
  website: z.string().optional(),
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

    const apiKey = process.env.RESEND_API_KEY;
    const to = process.env.CONTACT_TO_EMAIL;

    const phoneLine = parsed.data.phone ? `Phone: ${parsed.data.phone}\n` : "";
    const text = `From: ${parsed.data.name} <${parsed.data.email}>\n${phoneLine}\n${parsed.data.message}`;

    if (!apiKey || !to) {
      console.info("[contact]", parsed.data);
      return NextResponse.json({
        ok: true,
        mocked: true,
      });
    }

    const resend = new Resend(apiKey);
    await resend.emails.send({
      from: process.env.CONTACT_FROM_EMAIL ?? "Portfolio <onboarding@resend.dev>",
      to,
      replyTo: parsed.data.email,
      subject: `Portfolio contact from ${parsed.data.name}`,
      text,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to send" }, { status: 500 });
  }
}
