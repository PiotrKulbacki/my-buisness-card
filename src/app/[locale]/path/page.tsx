import { getTranslations, setRequestLocale } from "next-intl/server";
import { CvPage } from "@/components/path/CvPage";
import type { Locale } from "@/i18n/routing";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "path" });
  return { title: t("title"), description: t("lead") };
}

export default async function PathPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <CvPage locale={locale as Locale} />;
}
