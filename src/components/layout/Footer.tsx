import { getTranslations } from "next-intl/server";
import { BrandLogo } from "@/components/brand/BrandLogo";
import { CookieSettingsButton } from "@/components/cookies/CookieSettingsButton";
import { Link } from "@/i18n/navigation";
import { siteConfig } from "@/config/site";

export async function Footer() {
  const t = await getTranslations("footer");
  const year = new Date().getFullYear();

  return (
    <footer className="border-line mt-auto shrink-0 border-t py-3 md:h-(--site-footer-h) md:py-0">
      <div className="text-fg-muted mx-auto flex h-full max-w-5xl flex-col items-center gap-2.5 px-5 text-xs leading-none md:flex-row md:items-center md:justify-between md:gap-4 md:px-8">
        <div className="flex min-w-0 items-center justify-center gap-2.5">
          <Link href="/" className="focus-ring shrink-0 rounded" aria-label={siteConfig.name}>
            <BrandLogo variant="mark" decorative sizes="16px" className="h-4 w-auto" />
          </Link>
          <p className="flex items-center truncate leading-none">
            © {year} {siteConfig.name}. {t("rights")}
          </p>
        </div>
        <div className="flex shrink-0 items-center justify-center gap-3 md:gap-4">
          <Link className="focus-ring hover:text-fg rounded" href="/impressum">
            {t("impressum")}
          </Link>
          <Link className="focus-ring hover:text-fg rounded" href="/privacy">
            {t("privacy")}
          </Link>
          <CookieSettingsButton className="focus-ring hover:text-fg cursor-pointer rounded" />
        </div>
      </div>
    </footer>
  );
}
