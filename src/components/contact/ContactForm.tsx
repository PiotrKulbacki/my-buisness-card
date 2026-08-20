"use client";

import { Turnstile, type TurnstileInstance } from "@marsidev/react-turnstile";
import { useLocale, useTranslations } from "next-intl";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { Link, useRouter } from "@/i18n/navigation";
import { Button } from "@/components/ui/Button";
import { locales } from "@/i18n/routing";
import { resolveValidationMessage } from "@/lib/form-validation";
import { contactPayloadSchema } from "@/lib/schemas/contact";

/**
 * text-base (16px) prevents iOS focus zoom. Focus ring via box-shadow;
 * parent form padding leaves room so the ring is not clipped.
 */
const fieldClassName =
  "border-line bg-bg-elevated w-full rounded-2xl border px-4 py-3 text-base transition-[border-color,box-shadow] focus-visible:border-accent focus-visible:shadow-[0_0_0_3px_color-mix(in_oklab,var(--accent)_35%,transparent)] focus-visible:outline-none disabled:opacity-60";

function RequiredMark() {
  return (
    <span className="ml-0.5 text-red-500" aria-hidden="true">
      *
    </span>
  );
}

export function ContactForm() {
  const t = useTranslations("contact");
  const locale = useLocale();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const turnstileRef = useRef<TurnstileInstance | null>(null);
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY?.trim() || null;

  async function onSubmit(formData: FormData) {
    setLoading(true);
    const phone = String(formData.get("phone") ?? "").trim();
    const payload = {
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      phone: phone || undefined,
      message: String(formData.get("message") ?? ""),
      website: String(formData.get("website") ?? ""),
      locale: locales.includes(locale as (typeof locales)[number])
        ? (locale as (typeof locales)[number])
        : undefined,
      turnstileToken: turnstileToken ?? undefined,
    };

    if (siteKey && !turnstileToken) {
      toast.error(t("captchaError"));
      setLoading(false);
      return;
    }

    const parsed = contactPayloadSchema.safeParse(payload);
    if (!parsed.success) {
      toast.error(resolveValidationMessage(parsed.error, t));
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });

      if (response.status === 429) {
        toast.error(t("rateLimited"));
        return;
      }

      if (response.status === 400) {
        const body = (await response.json().catch(() => null)) as { error?: string } | null;
        if (body?.error === "Captcha failed") {
          toast.error(t("captchaError"));
          turnstileRef.current?.reset();
          setTurnstileToken(null);
          return;
        }
        toast.error(t("validationError"));
        return;
      }

      if (!response.ok) throw new Error("Request failed");
      toast.success(t("success"));
      turnstileRef.current?.reset();
      setTurnstileToken(null);
      router.push("/");
    } catch {
      toast.error(t("error"));
    } finally {
      setLoading(false);
    }
  }

  return (
    <form id="contact-form" action={onSubmit} className="space-y-4 p-1.5 md:p-2">
      <div className="grid gap-4 md:grid-cols-2">
        <label className="flex flex-col gap-3 text-sm">
          <span className="leading-none">
            {t("name")}
            <RequiredMark />
            <span className="text-fg-muted ml-1">({t("validation.nameHint")})</span>
          </span>
          <input
            required
            name="name"
            autoComplete="name"
            disabled={loading}
            className={fieldClassName}
          />
        </label>
        <label className="flex flex-col gap-3 text-sm">
          <span className="leading-none">
            {t("email")}
            <RequiredMark />
          </span>
          <input
            required
            type="email"
            name="email"
            autoComplete="email"
            disabled={loading}
            className={fieldClassName}
          />
        </label>
      </div>
      <label className="flex flex-col gap-3 text-sm">
        <span className="leading-none">
          {t("phone")}
          <span className="text-fg-muted ml-1">({t("optional")})</span>
        </span>
        <input
          type="tel"
          name="phone"
          autoComplete="tel"
          disabled={loading}
          className={fieldClassName}
        />
      </label>
      <label className="flex flex-col gap-3 text-sm">
        <span className="leading-none">
          {t("message")}
          <RequiredMark />
          <span className="text-fg-muted ml-1">({t("validation.messageHint")})</span>
        </span>
        <textarea
          required
          name="message"
          rows={6}
          disabled={loading}
          className={`${fieldClassName} resize-y`}
        />
      </label>
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        className="absolute left-[-9999px] h-0 w-0 opacity-0"
        aria-hidden
      />
      {siteKey ? (
        <div className="w-full min-w-0 [&_iframe]:max-w-full">
          <Turnstile
            ref={turnstileRef}
            siteKey={siteKey}
            options={{ theme: "dark", size: "flexible" }}
            onSuccess={setTurnstileToken}
            onExpire={() => setTurnstileToken(null)}
            onError={() => setTurnstileToken(null)}
          />
        </div>
      ) : null}
      <p className="text-fg-muted text-sm">{t("noContractNote")}</p>
      <p className="text-fg-muted text-sm">
        {t("privacyNote")}{" "}
        <Link href="/privacy" className="underline underline-offset-4">
          {t("privacyLink")}
        </Link>
        .
      </p>
      <Button type="submit" loading={loading} className="min-w-44">
        {loading ? t("sending") : t("submit")}
      </Button>
    </form>
  );
}
