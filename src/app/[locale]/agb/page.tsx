import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { LegalArticle, LegalParagraphs, LegalSection } from "@/components/legal/LegalArticle";
import { AGB_SECTION_KEYS } from "@/content/legal";
import { buildPageMetadata } from "@/lib/seo";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "agb" });
  return buildPageMetadata({
    locale,
    path: "/agb",
    title: t("title"),
    description: t("intro"),
  });
}

export default async function AgbPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("agb");

  return (
    <LegalArticle title={t("title")} subtitle={t("updated")}>
      <p>{t("intro")}</p>
      <p className="text-fg font-medium">{t("model")}</p>

      {AGB_SECTION_KEYS.map((key) => (
        <LegalSection key={key} heading={t(`sections.${key}.heading`)}>
          <LegalParagraphs text={t(`sections.${key}.body`)} />
          {key === "withdrawal" ? (
            <p>
              <Link href="/widerruf" className="underline underline-offset-4">
                {t("withdrawalLink")}
              </Link>
            </p>
          ) : null}
        </LegalSection>
      ))}
    </LegalArticle>
  );
}
