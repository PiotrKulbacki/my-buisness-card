import { getTranslations, setRequestLocale } from "next-intl/server";
import { siteConfig } from "@/config/site";
import { COOKIE_CONSENT_NAME, LOCALE_COOKIE_NAME } from "@/config/cookies";
import { Reveal } from "@/components/motion/Reveal";
import { buildPageMetadata } from "@/lib/seo";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "privacy" });
  return buildPageMetadata({
    locale,
    path: "/privacy",
    title: t("title"),
    description: t("intro"),
  });
}

export default async function PrivacyPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("privacy");
  const { legal } = siteConfig;
  const addressLine = `${legal.street}, ${legal.postalCode} ${legal.city}`;

  return (
    <section className="py-16 md:py-24">
      <Reveal>
        <h1 className="display text-4xl md:text-6xl">{t("title")}</h1>
        <p className="text-fg-muted mt-3 text-sm">{t("updated")}</p>
        <div className="prose-like text-fg-muted mt-8 max-w-3xl space-y-8">
          <p>{t("intro")}</p>

          <div className="space-y-2">
            <h2 className="text-fg text-lg font-medium">{t("controllerHeading")}</h2>
            <p>{t("controllerBody", { name: siteConfig.name })}</p>
            <p>
              {addressLine}
              <br />
              {locale === "de" ? legal.countryDe : legal.country}
            </p>
            <p>
              {t("contact")}:{" "}
              <a className="underline underline-offset-4" href={`mailto:${siteConfig.email}`}>
                {siteConfig.email}
              </a>
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="text-fg text-lg font-medium">{t("hostingHeading")}</h2>
            <p>{t("hostingBody")}</p>
          </div>

          <div className="space-y-2">
            <h2 className="text-fg text-lg font-medium">{t("formHeading")}</h2>
            <p>{t("formBody")}</p>
          </div>

          <div className="space-y-2">
            <h2 className="text-fg text-lg font-medium">{t("analyticsHeading")}</h2>
            <p>{t("analyticsBody")}</p>
          </div>

          <div id="cookies" className="scroll-mt-24 space-y-3">
            <h2 className="text-fg text-lg font-medium">{t("cookiesHeading")}</h2>
            <p>{t("cookiesBody")}</p>
            <ul className="list-disc space-y-2 pl-5">
              <li>
                <span className="text-fg font-medium">{LOCALE_COOKIE_NAME}</span>
                {" — "}
                {t("cookieLocale")}
              </li>
              <li>
                <span className="text-fg font-medium">{COOKIE_CONSENT_NAME}</span>
                {" — "}
                {t("cookieConsent")}
              </li>
              <li>
                <span className="text-fg font-medium">_ga / _ga_*</span>
                {" — "}
                {t("cookieGa")}
              </li>
            </ul>
            <p>{t("cookiesNoMarketing")}</p>
          </div>

          <div className="space-y-2">
            <h2 className="text-fg text-lg font-medium">{t("rightsHeading")}</h2>
            <p>{t("rightsBody")}</p>
          </div>

          <div className="space-y-2">
            <h2 className="text-fg text-lg font-medium">{t("complaintHeading")}</h2>
            <p>{t("complaintBody")}</p>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
