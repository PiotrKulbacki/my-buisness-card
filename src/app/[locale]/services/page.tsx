import { getTranslations, setRequestLocale } from "next-intl/server";
import { Reveal } from "@/components/motion/Reveal";
import { ServicesJsonLd, type ServiceGroup } from "@/components/seo/JsonLd";
import { siteConfig } from "@/config/site";
import { Link } from "@/i18n/navigation";
import { buildPageMetadata } from "@/lib/seo";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "services" });
  return buildPageMetadata({
    locale,
    path: "/services",
    title: t("title"),
    description: t("lead"),
  });
}

/** Local business page - same name, area and phone as the Google Business Profile (NAP). */
export default async function ServicesPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("services");
  const groups = t.raw("groups") as ServiceGroup[];
  const { telephone, googleMapsUrl } = siteConfig.business;

  return (
    <section className="py-6 md:py-8">
      <Reveal>
        <h1 className="display text-4xl md:text-6xl">{t("title")}</h1>
        <p className="text-fg-muted mt-4 max-w-2xl text-lg md:mt-5">{t("lead")}</p>
      </Reveal>

      <div className="mt-8 grid gap-8 md:mt-10 md:grid-cols-3 md:gap-6">
        {groups.map((group, index) => (
          <Reveal key={group.name} delay={0.04 * (index + 1)}>
            <h2 className="display text-2xl">{group.name}</h2>
            <ul className="text-fg-muted mt-4 space-y-2 text-sm">
              {group.items.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="text-accent" aria-hidden>
                    ▸
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.16} className="border-line mt-10 border-t pt-6 md:mt-12">
        <dl className="grid gap-4 text-sm sm:grid-cols-2">
          <div>
            <dt className="text-fg-muted">{t("areaLabel")}</dt>
            <dd>{t("area")}</dd>
          </div>
          <div>
            <dt className="text-fg-muted">{t("phoneLabel")}</dt>
            <dd>
              <a
                className="focus-ring rounded underline underline-offset-4"
                href={`tel:${telephone.replace(/\s/g, "")}`}
              >
                {telephone}
              </a>
            </dd>
          </div>
        </dl>
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <Link
            href="/contact"
            className="focus-ring bg-accent text-accent-ink inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-medium transition-[filter] hover:brightness-95"
          >
            {t("contactCta")}
          </Link>
          <a
            href={googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="focus-ring border-line text-fg hover:border-fg inline-flex items-center justify-center rounded-full border px-5 py-3 text-sm font-medium transition-colors"
          >
            {t("mapsLink")}
          </a>
        </div>
      </Reveal>

      <ServicesJsonLd />
    </section>
  );
}
