"use client";

import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { Button } from "@/components/ui/Button";

export function ContactBriefCta() {
  const t = useTranslations("brief");
  const router = useRouter();

  return (
    <div className="border-line bg-bg-elevated mt-8 space-y-3 rounded-2xl border p-4 md:mt-10">
      <h2 className="display text-xl md:text-2xl">{t("ctaTitle")}</h2>
      <p className="text-fg-muted text-sm leading-relaxed">{t("ctaBody")}</p>
      <Button type="button" className="min-w-44" onClick={() => router.push("/contact/brief")}>
        {t("ctaButton")}
      </Button>
    </div>
  );
}
