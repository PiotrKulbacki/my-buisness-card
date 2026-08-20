import { getTranslations, setRequestLocale } from "next-intl/server";
import { siteConfig } from "@/config/site";
import { LegalArticle, LegalParagraphs, LegalSection } from "@/components/legal/LegalArticle";
import { buildPageMetadata } from "@/lib/seo";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "widerruf" });
  return buildPageMetadata({
    locale,
    path: "/widerruf",
    title: t("title"),
    description: t("intro"),
  });
}

export default async function WiderrufPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("widerruf");
  const { legal } = siteConfig;
  const addressLine = `${legal.street}, ${legal.postalCode} ${legal.city}`;
  const country = locale === "de" ? legal.countryDe : legal.country;

  return (
    <LegalArticle title={t("title")} subtitle={t("updated")}>
      <p>{t("intro")}</p>

      <LegalSection heading={t("instructionHeading")}>
        <LegalParagraphs text={t("instructionBody")} />
      </LegalSection>

      <LegalSection heading={t("earlyStartHeading")}>
        <LegalParagraphs text={t("earlyStartBody")} />
      </LegalSection>

      <LegalSection heading={t("formHeading")}>
        <p>{t("formIntro")}</p>
        <div className="border-line bg-bg-elevated mt-4 space-y-3 rounded-2xl border p-5 text-sm leading-relaxed">
          <p>
            {t("formTo")}
            <br />
            {siteConfig.name}
            <br />
            {addressLine}
            <br />
            {country}
            <br />
            {siteConfig.email}
          </p>
          <p className="whitespace-pre-wrap">{t("formTemplate")}</p>
        </div>
      </LegalSection>
    </LegalArticle>
  );
}
