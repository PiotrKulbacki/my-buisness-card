"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import { z } from "zod";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/Button";

const schema = z.object({
  name: z.string().min(2).max(80),
  email: z.string().email(),
  message: z.string().min(10).max(4000),
  website: z.string().optional(),
});

export function ContactForm() {
  const t = useTranslations("contact");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function onSubmit(formData: FormData) {
    setStatus("loading");
    const payload = {
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      message: String(formData.get("message") ?? ""),
      website: String(formData.get("website") ?? ""),
    };

    const parsed = schema.safeParse(payload);
    if (!parsed.success) {
      setStatus("error");
      return;
    }

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      if (!response.ok) throw new Error("Request failed");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  return (
    <form action={onSubmit} className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <label className="block space-y-2 text-sm">
          <span>{t("name")}</span>
          <input
            required
            name="name"
            disabled={status === "loading"}
            className="focus-ring w-full rounded-2xl border border-[var(--line)] bg-[var(--bg-elevated)] px-4 py-3"
          />
        </label>
        <label className="block space-y-2 text-sm">
          <span>{t("email")}</span>
          <input
            required
            type="email"
            name="email"
            disabled={status === "loading"}
            className="focus-ring w-full rounded-2xl border border-[var(--line)] bg-[var(--bg-elevated)] px-4 py-3"
          />
        </label>
      </div>
      <label className="block space-y-2 text-sm">
        <span>{t("message")}</span>
        <textarea
          required
          name="message"
          rows={6}
          disabled={status === "loading"}
          className="focus-ring w-full resize-y rounded-2xl border border-[var(--line)] bg-[var(--bg-elevated)] px-4 py-3"
        />
      </label>
      {/* Honeypot */}
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
      <Button type="submit" disabled={status === "loading"} className="min-w-40">
        {status === "loading" ? t("sending") : t("submit")}
      </Button>
      {status === "success" ? (
        <p role="status" className="text-sm text-[var(--success)]">
          {t("success")}
        </p>
      ) : null}
      {status === "error" ? (
        <p role="alert" className="text-sm text-[var(--danger)]">
          {t("error")}
        </p>
      ) : null}
    </form>
  );
}
