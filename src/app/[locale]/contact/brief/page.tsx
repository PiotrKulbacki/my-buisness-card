import { getTranslations, setRequestLocale } from "next-intl/server";
import { BriefForm } from "@/components/contact/brief/BriefForm";
import { Reveal } from "@/components/motion/Reveal";
import { BackLink } from "@/components/ui/BackLink";
import { buildPageMetadata } from "@/lib/seo";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "brief" });
  return buildPageMetadata({
    locale,
    path: "/contact/brief",
    title: t("title"),
    description: t("lead"),
  });
}

export default async function BriefPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("brief");

  return (
    <section className="py-6 md:py-8">
      <Reveal>
        <p className="mb-4">
          <BackLink href="/contact">{t("backToContact")}</BackLink>
        </p>
        <h1 className="display text-4xl md:text-5xl lg:text-6xl">{t("title")}</h1>
        <p className="text-fg-muted mt-4 max-w-2xl">{t("lead")}</p>
      </Reveal>
      <Reveal delay={0.08} className="mt-8">
        <BriefForm />
      </Reveal>
    </section>
  );
}
