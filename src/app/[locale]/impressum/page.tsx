import { getTranslations, setRequestLocale } from "next-intl/server";
import { siteConfig } from "@/config/site";
import { Link } from "@/i18n/navigation";
import { LegalArticle, LegalSection } from "@/components/legal/LegalArticle";
import { buildPageMetadata } from "@/lib/seo";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "impressum" });
  return buildPageMetadata({
    locale,
    path: "/impressum",
    title: t("title"),
    description: t("legalBasis"),
  });
}

export default async function ImpressumPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("impressum");
  const { legal } = siteConfig;
  const addressLine = `${legal.street}, ${legal.postalCode} ${legal.city}`;
  const country = locale === "de" ? legal.countryDe : legal.country;

  return (
    <LegalArticle title={t("title")} subtitle={t("legalBasis")}>
      <LegalSection heading={t("providerHeading")}>
        <p>{siteConfig.name}</p>
        <p>{t("entity")}</p>
        <p>
          {addressLine}
          <br />
          {country}
        </p>
      </LegalSection>

      <LegalSection heading={t("businessHeading")}>
        <p>{t("businessBody")}</p>
      </LegalSection>

      <LegalSection heading={t("contactHeading")}>
        <p>
          {t("email")}:{" "}
          <a className="underline underline-offset-4" href={`mailto:${siteConfig.email}`}>
            {siteConfig.email}
          </a>
        </p>
        <p>
          {t("contactForm")}:{" "}
          <Link className="underline underline-offset-4" href="/contact">
            {t("contactFormLink")}
          </Link>
        </p>
      </LegalSection>

      <LegalSection heading={t("vatHeading")}>
        <p>{t("vatBody")}</p>
        {legal.vatId ? (
          <p>
            {t("vatId")}: {legal.vatId}
          </p>
        ) : null}
      </LegalSection>

      <LegalSection heading={t("registerHeading")}>
        <p>{t("registerBody")}</p>
      </LegalSection>

      <LegalSection heading={t("disputeHeading")}>
        <p>{t("disputeBody")}</p>
      </LegalSection>
    </LegalArticle>
  );
}
