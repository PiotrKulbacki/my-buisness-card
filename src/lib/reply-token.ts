import { createHmac, timingSafeEqual } from "node:crypto";
import { siteConfig } from "@/config/site";
import { replyTokenPayloadSchema, type ReplyTokenPayload } from "@/lib/schemas/reply";

const TOKEN_TTL_MS = 90 * 24 * 60 * 60 * 1000;
const REPLY_PAGE_LOCALE = "pl";

function getSigningKey(): string | null {
  return process.env.REPLY_FORM_SECRET?.trim() || process.env.BREVO_API_KEY?.trim() || null;
}

function getOrigin(): string {
  return (process.env.NEXT_PUBLIC_SITE_URL ?? siteConfig.url).replace(/\/$/, "");
}

function sign(payloadJson: string, key: string): string {
  return createHmac("sha256", key).update(payloadJson).digest("base64url");
}

function signaturesMatch(left: string, right: string): boolean {
  const a = Buffer.from(left);
  const b = Buffer.from(right);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

export function signReplyToken(params: Omit<ReplyTokenPayload, "v" | "exp">): string | null {
  const key = getSigningKey();
  if (!key) return null;

  const payload: ReplyTokenPayload = {
    v: 1,
    ...params,
    exp: Math.floor((Date.now() + TOKEN_TTL_MS) / 1000),
  };
  const encoded = Buffer.from(JSON.stringify(payload), "utf8").toString("base64url");
  return `${encoded}.${sign(encoded, key)}`;
}

export function verifyReplyToken(token: string | undefined | null): ReplyTokenPayload | null {
  if (!token) return null;
  const key = getSigningKey();
  if (!key) return null;

  const dot = token.lastIndexOf(".");
  if (dot <= 0) return null;

  const encoded = token.slice(0, dot);
  const given = token.slice(dot + 1);
  const expected = sign(encoded, key);
  if (!signaturesMatch(given, expected)) return null;

  try {
    const parsed: unknown = JSON.parse(Buffer.from(encoded, "base64url").toString("utf8"));
    const payload = replyTokenPayloadSchema.safeParse(parsed);
    if (!payload.success) return null;
    if (payload.data.exp * 1000 <= Date.now()) return null;
    return payload.data;
  } catch {
    return null;
  }
}

export function buildReplyFormUrl(token: string): string {
  return `${getOrigin()}/${REPLY_PAGE_LOCALE}/reply?t=${encodeURIComponent(token)}`;
}

export function resolveInboxReplyUrl(params: Omit<ReplyTokenPayload, "v" | "exp">): string {
  const token = signReplyToken(params);
  if (!token) return `mailto:${encodeURIComponent(params.to)}`;
  return buildReplyFormUrl(token);
}
