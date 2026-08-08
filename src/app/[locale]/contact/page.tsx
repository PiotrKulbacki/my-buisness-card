import { getTranslations, setRequestLocale } from "next-intl/server";
import { ContactForm } from "@/components/contact/ContactForm";
import { Reveal } from "@/components/motion/Reveal";
import { siteConfig } from "@/config/site";
import { buildPageMetadata } from "@/lib/seo";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact" });
  return buildPageMetadata({
    locale,
    path: "/contact",
    title: t("title"),
    description: t("lead"),
  });
}

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("contact");

  return (
    <section className="flex min-h-0 flex-col py-6 md:h-(--site-main-h) md:justify-center md:overflow-y-auto md:py-6">
      <div className="grid w-full gap-8 md:grid-cols-[0.9fr_1.1fr] md:items-center md:gap-10">
        <Reveal>
          <h1 className="display text-4xl md:text-5xl lg:text-6xl">{t("title")}</h1>
          <p className="text-fg-muted mt-4">{t("lead")}</p>
          <dl className="mt-6 space-y-3 text-sm md:mt-8 md:space-y-4">
            <div>
              <dt className="text-fg-muted">{t("directEmail")}</dt>
              <dd>
                <a className="underline underline-offset-4" href={`mailto:${siteConfig.email}`}>
                  {siteConfig.email}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-fg-muted">{t("location")}</dt>
              <dd>{t("remote")}</dd>
            </div>
          </dl>
        </Reveal>
        <Reveal delay={0.08} className="min-w-0">
          <ContactForm />
        </Reveal>
      </div>
    </section>
  );
}
