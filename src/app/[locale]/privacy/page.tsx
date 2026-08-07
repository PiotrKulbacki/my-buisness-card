import { getTranslations, setRequestLocale } from "next-intl/server";
import { siteConfig } from "@/config/site";
import { Reveal } from "@/components/motion/Reveal";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "privacy" });
  return { title: t("title") };
}

export default async function PrivacyPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("privacy");

  return (
    <section className="py-16 md:py-24">
      <Reveal>
        <h1 className="display text-4xl md:text-6xl">{t("title")}</h1>
        <p className="text-fg-muted mt-3 text-sm">{t("updated")}</p>
        <div className="prose-like text-fg-muted mt-8 max-w-3xl space-y-4">
          <p>{t("intro")}</p>
          <p>{t("controller")}</p>
          <p>{t("form")}</p>
          <p>{t("analytics")}</p>
          <p>{t("rights")}</p>
          <p>
            {t("contact")}
            <a className="underline underline-offset-4" href={`mailto:${siteConfig.email}`}>
              {siteConfig.email}
            </a>
          </p>
        </div>
      </Reveal>
    </section>
  );
}
