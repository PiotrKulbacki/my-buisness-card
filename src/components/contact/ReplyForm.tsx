"use client";

import { useTranslations } from "next-intl";
import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/Button";
import { replyPayloadSchema } from "@/lib/schemas/reply";

const fieldClassName =
  "border-line bg-bg-elevated w-full rounded-2xl border px-4 py-3 text-base transition-[border-color,box-shadow] focus-visible:border-accent focus-visible:shadow-[0_0_0_3px_color-mix(in_oklab,var(--accent)_35%,transparent)] focus-visible:outline-none disabled:opacity-60";

type ReplyFormProps = {
  token: string;
  recipientName: string;
  recipientEmail: string;
};

export function ReplyForm({ token, recipientName, recipientEmail }: ReplyFormProps) {
  const t = useTranslations("reply");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [website, setWebsite] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);

    const parsed = replyPayloadSchema.safeParse({
      token,
      message,
      website: website || undefined,
    });
    if (!parsed.success) {
      toast.error(t("validationError"));
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/reply", {
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
        toast.error(body?.error === "Invalid token" ? t("invalid") : t("validationError"));
        return;
      }

      if (!response.ok) throw new Error("Request failed");
      toast.success(t("success"));
      setMessage("");
    } catch {
      toast.error(t("error"));
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="relative max-w-3xl space-y-4 p-1.5 md:p-2">
      <div className="border-line bg-bg-elevated space-y-1 rounded-2xl border px-4 py-3 text-sm">
        <p className="text-fg-muted">{t("toLabel")}</p>
        <p>
          {recipientName} <span className="text-fg-muted">({recipientEmail})</span>
        </p>
      </div>
      <label className="flex flex-col gap-3 text-sm">
        <span className="leading-none">
          {t("message")}
          <span className="ml-0.5 text-red-500" aria-hidden="true">
            *
          </span>
        </span>
        <textarea
          name="message"
          rows={10}
          required
          disabled={loading}
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          className={`${fieldClassName} resize-y`}
          aria-required
        />
      </label>
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        value={website}
        onChange={(event) => setWebsite(event.target.value)}
        className="absolute left-[-9999px] h-0 w-0 opacity-0"
        aria-hidden
      />
      <Button type="submit" loading={loading} className="min-w-44">
        {loading ? t("sending") : t("submit")}
      </Button>
    </form>
  );
}
