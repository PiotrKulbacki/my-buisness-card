"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { locales, type Locale } from "@/i18n/routing";
import { cn } from "@/lib/utils";

const labels: Record<Locale, string> = {
  pl: "Polski",
  en: "English",
  de: "Deutsch",
  es: "Español",
  uk: "Українська",
};

export function LanguageSwitcher({ className }: { className?: string }) {
  const t = useTranslations("nav");
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();

  return (
    <label className={cn("inline-flex items-center gap-2 text-sm", className)}>
      <span className="sr-only">{t("language")}</span>
      <select
        className="focus-ring rounded-full border border-[var(--line)] bg-[var(--bg-elevated)] px-3 py-2 text-sm"
        value={locale}
        aria-label={t("language")}
        onChange={(event) => {
          router.replace(pathname, { locale: event.target.value as Locale });
        }}
      >
        {locales.map((code) => (
          <option key={code} value={code}>
            {labels[code]}
          </option>
        ))}
      </select>
    </label>
  );
}
