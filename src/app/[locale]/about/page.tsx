import { getTranslations, setRequestLocale } from "next-intl/server";
import { AboutIntro } from "@/components/about/AboutIntro";
import { buildPageMetadata } from "@/lib/seo";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });
  const person = await getTranslations({ locale, namespace: "person" });
  return buildPageMetadata({
    locale,
    path: "/about",
    title: t("title"),
    description: person("description"),
  });
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <AboutIntro />;
}
