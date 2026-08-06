import { setRequestLocale } from "next-intl/server";
import { LandingHero } from "@/components/home/LandingHero";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <LandingHero />;
}
