"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/Button";

const schema = z.object({
  name: z.string().min(2).max(80),
  email: z.string().email(),
  phone: z.string().max(40).optional(),
  message: z.string().min(10).max(4000),
  website: z.string().optional(),
});

function RequiredMark() {
  return (
    <span className="ml-0.5 text-red-500" aria-hidden="true">
      *
    </span>
  );
}

export function ContactForm() {
  const t = useTranslations("contact");
  const [loading, setLoading] = useState(false);

  async function onSubmit(formData: FormData) {
    setLoading(true);
    const phone = String(formData.get("phone") ?? "").trim();
    const payload = {
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      phone: phone || undefined,
      message: String(formData.get("message") ?? ""),
      website: String(formData.get("website") ?? ""),
    };

    const parsed = schema.safeParse(payload);
    if (!parsed.success) {
      toast.error(t("validationError"));
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

      if (!response.ok) throw new Error("Request failed");
      toast.success(t("success"));
      (document.getElementById("contact-form") as HTMLFormElement | null)?.reset();
    } catch {
      toast.error(t("error"));
    } finally {
      setLoading(false);
    }
  }

  return (
    <form id="contact-form" action={onSubmit} className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <label className="flex flex-col gap-3 text-sm">
          <span className="leading-none">
            {t("name")}
            <RequiredMark />
          </span>
          <input
            required
            name="name"
            autoComplete="name"
            disabled={loading}
            className="focus-ring w-full rounded-2xl border border-[var(--line)] bg-[var(--bg-elevated)] px-4 py-3"
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
            className="focus-ring w-full rounded-2xl border border-[var(--line)] bg-[var(--bg-elevated)] px-4 py-3"
          />
        </label>
      </div>
      <label className="flex flex-col gap-3 text-sm">
        <span className="leading-none">
          {t("phone")}
          <span className="ml-1 text-[var(--fg-muted)]">({t("optional")})</span>
        </span>
        <input
          type="tel"
          name="phone"
          autoComplete="tel"
          disabled={loading}
          className="focus-ring w-full rounded-2xl border border-[var(--line)] bg-[var(--bg-elevated)] px-4 py-3"
        />
      </label>
      <label className="flex flex-col gap-3 text-sm">
        <span className="leading-none">
          {t("message")}
          <RequiredMark />
        </span>
        <textarea
          required
          name="message"
          rows={6}
          disabled={loading}
          className="focus-ring w-full resize-y rounded-2xl border border-[var(--line)] bg-[var(--bg-elevated)] px-4 py-3"
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
      <p className="text-sm text-[var(--fg-muted)]">
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
