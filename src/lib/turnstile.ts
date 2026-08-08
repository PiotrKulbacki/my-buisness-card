import { getClientIp } from "@/lib/rate-limit";

type TurnstileVerifyResult = { ok: true } | { ok: false; error: string };

export function isTurnstileConfigured(): boolean {
  return Boolean(process.env.TURNSTILE_SECRET_KEY?.trim());
}

export function getTurnstileSiteKey(): string | null {
  return process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY?.trim() || null;
}

/**
 * Verifies a Turnstile token with Cloudflare.
 * When TURNSTILE_SECRET_KEY is unset (local mock), returns ok without calling Cloudflare.
 */
export async function verifyTurnstileToken(
  token: string | undefined,
  request: Request,
): Promise<TurnstileVerifyResult> {
  const secret = process.env.TURNSTILE_SECRET_KEY?.trim();
  if (!secret) {
    return { ok: true };
  }

  if (!token?.trim()) {
    return { ok: false, error: "missing_token" };
  }

  try {
    const body = new URLSearchParams({
      secret,
      response: token.trim(),
      remoteip: getClientIp(request),
    });

    const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      body,
    });

    if (!response.ok) {
      console.error("[turnstile] siteverify HTTP", response.status);
      return { ok: false, error: "verify_failed" };
    }

    const data = (await response.json()) as { success?: boolean };
    if (!data.success) {
      return { ok: false, error: "invalid_token" };
    }

    return { ok: true };
  } catch (error) {
    console.error("[turnstile] verify error", error);
    return { ok: false, error: "verify_failed" };
  }
}
