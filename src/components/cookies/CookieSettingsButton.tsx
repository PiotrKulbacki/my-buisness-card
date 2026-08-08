"use client";

import { useTranslations } from "next-intl";
import { openCookieSettings } from "@/lib/cookie-consent";

export function CookieSettingsButton({ className }: { className?: string }) {
  const t = useTranslations("footer");

  return (
    <button type="button" className={className} onClick={() => openCookieSettings()}>
      {t("cookies")}
    </button>
  );
}
