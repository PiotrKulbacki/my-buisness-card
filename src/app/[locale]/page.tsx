import { setRequestLocale, getTranslations } from "next-intl/server";
import { LandingHero } from "@/components/home/LandingHero";
import { HomeJsonLd } from "@/components/seo/JsonLd";
import { siteConfig } from "@/config/site";
import { buildPageMetadata } from "@/lib/seo";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "person" });
  return buildPageMetadata({
    locale,
    path: "",
    absoluteTitle: `${siteConfig.name} - ${t("jobTitle")}`,
    description: t("description"),
  });
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <LandingHero />
      <HomeJsonLd />
    </>
  );
}
