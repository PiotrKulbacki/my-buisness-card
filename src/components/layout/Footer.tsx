import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { siteConfig } from "@/config/site";

export async function Footer() {
  const t = await getTranslations("footer");
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-[var(--line)]">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-5 py-3 text-xs leading-none text-[var(--fg-muted)] md:px-8">
        <p className="truncate">
          © {year} {siteConfig.name}. {t("rights")}
        </p>
        <div className="flex shrink-0 gap-4">
          <Link className="focus-ring rounded hover:text-[var(--fg)]" href="/privacy">
            {t("privacy")}
          </Link>
          <Link className="focus-ring rounded hover:text-[var(--fg)]" href="/privacy">
            {t("personalData")}
          </Link>
        </div>
      </div>
    </footer>
  );
}
