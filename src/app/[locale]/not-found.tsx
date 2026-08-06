import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export default async function NotFound() {
  const t = await getTranslations("notFound");

  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4 py-24 text-center">
      <h1 className="display text-5xl">404</h1>
      <p className="text-[var(--fg-muted)]">{t("title")}</p>
      <Link
        href="/"
        className="rounded-full bg-[var(--accent)] px-5 py-3 text-sm font-medium text-[var(--accent-ink)]"
      >
        {t("home")}
      </Link>
    </div>
  );
}
