import { getTranslations, setRequestLocale } from "next-intl/server";
import { ContactForm } from "@/components/contact/ContactForm";
import { Reveal } from "@/components/motion/Reveal";
import { siteConfig } from "@/config/site";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact" });
  return { title: t("title"), description: t("lead") };
}

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("contact");

  return (
    <section className="flex min-h-[calc(100svh-8rem)] flex-col justify-center py-10 md:min-h-[calc(100svh-5rem)] md:py-16">
      <div className="grid w-full gap-12 md:grid-cols-[0.9fr_1.1fr] md:items-center">
        <Reveal>
          <h1 className="display text-4xl md:text-6xl">{t("title")}</h1>
          <p className="mt-4 text-[var(--fg-muted)]">{t("lead")}</p>
          <dl className="mt-8 space-y-4 text-sm">
            <div>
              <dt className="text-[var(--fg-muted)]">{t("directEmail")}</dt>
              <dd>
                <a className="underline underline-offset-4" href={`mailto:${siteConfig.email}`}>
                  {siteConfig.email}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-[var(--fg-muted)]">{t("location")}</dt>
              <dd>{t("remote")}</dd>
            </div>
          </dl>
        </Reveal>
        <Reveal delay={0.08}>
          <ContactForm />
        </Reveal>
      </div>
    </section>
  );
}
