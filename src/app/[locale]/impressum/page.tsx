import { getTranslations, setRequestLocale } from "next-intl/server";
import { siteConfig } from "@/config/site";
import { Reveal } from "@/components/motion/Reveal";
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
    <section className="py-16 md:py-24">
      <Reveal>
        <h1 className="display text-4xl md:text-6xl">{t("title")}</h1>
        <p className="text-fg-muted mt-3 text-sm">{t("legalBasis")}</p>
        <div className="prose-like text-fg-muted mt-8 max-w-3xl space-y-6">
          <div className="space-y-1">
            <h2 className="text-fg text-lg font-medium">{t("providerHeading")}</h2>
            <p>{siteConfig.name}</p>
            <p>{t("entity")}</p>
            <p>
              {addressLine}
              <br />
              {country}
            </p>
          </div>
          <div className="space-y-1">
            <h2 className="text-fg text-lg font-medium">{t("contactHeading")}</h2>
            <p>
              {t("email")}:{" "}
              <a className="underline underline-offset-4" href={`mailto:${siteConfig.email}`}>
                {siteConfig.email}
              </a>
            </p>
            <p>
              {t("phone")}:{" "}
              <a className="underline underline-offset-4" href={`tel:${legal.phoneTel}`}>
                {legal.phoneDisplay}
              </a>
            </p>
          </div>
          <div className="space-y-1">
            <h2 className="text-fg text-lg font-medium">{t("vatHeading")}</h2>
            <p>{t("vatBody")}</p>
          </div>
          <div className="space-y-1">
            <h2 className="text-fg text-lg font-medium">{t("responsibleHeading")}</h2>
            <p>{t("responsibleBody", { name: siteConfig.name })}</p>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
