import { getTranslations, setRequestLocale } from "next-intl/server";
import { siteConfig } from "@/config/site";
import { COOKIE_CONSENT_NAME, LOCALE_COOKIE_NAME } from "@/config/cookies";
import { LegalArticle, LegalParagraphs, LegalSection } from "@/components/legal/LegalArticle";
import { buildPageMetadata } from "@/lib/seo";

type Props = {
  params: Promise<{ locale: string }>;
};

const RIGHT_KEYS = [
  "rightsAccess",
  "rightsRectification",
  "rightsErasure",
  "rightsRestriction",
  "rightsPortability",
  "rightsObjection",
  "rightsWithdraw",
  "rightsComplaint",
] as const;

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "privacy" });
  return buildPageMetadata({
    locale,
    path: "/privacy",
    title: t("title"),
    description: t("intro"),
  });
}

export default async function PrivacyPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("privacy");
  const { legal } = siteConfig;
  const addressLine = `${legal.street}, ${legal.postalCode} ${legal.city}`;
  const country = locale === "de" ? legal.countryDe : legal.country;
  const { dpa } = legal;

  return (
    <LegalArticle title={t("title")} subtitle={t("updated")}>
      <p>{t("intro")}</p>

      <LegalSection heading={t("controllerHeading")}>
        <p>{t("controllerBody", { name: siteConfig.name })}</p>
        <p>
          {addressLine}
          <br />
          {country}
        </p>
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
      </LegalSection>

      <LegalSection heading={t("mapHeading")}>
        <p>{t("mapIntro")}</p>
      </LegalSection>

      <LegalSection heading={t("hostingHeading")}>
        <LegalParagraphs text={t("hostingBody")} />
      </LegalSection>

      <LegalSection heading={t("turnstileHeading")}>
        <LegalParagraphs text={t("turnstileBody")} />
      </LegalSection>

      <LegalSection heading={t("formHeading")}>
        <LegalParagraphs text={t("formBody")} />
      </LegalSection>

      <LegalSection heading={t("briefHeading")}>
        <LegalParagraphs text={t("briefBody")} />
      </LegalSection>

      <LegalSection heading={t("emailHeading")}>
        <LegalParagraphs text={t("emailBody")} />
      </LegalSection>

      <LegalSection heading={t("analyticsHeading")}>
        <LegalParagraphs text={t("analyticsBody")} />
      </LegalSection>

      <LegalSection heading={t("recipientsHeading")}>
        <LegalParagraphs text={t("recipientsBody")} />
      </LegalSection>

      <LegalSection heading={t("transfersHeading")}>
        <LegalParagraphs text={t("transfersBody")} />
      </LegalSection>

      <LegalSection heading={t("retentionHeading")}>
        <LegalParagraphs text={t("retentionBody")} />
      </LegalSection>

      <div id="cookies" className="scroll-mt-24 space-y-3">
        <h2 className="text-fg text-lg font-medium">{t("cookiesHeading")}</h2>
        <p>{t("cookiesBody")}</p>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <span className="text-fg font-medium">{LOCALE_COOKIE_NAME}</span>
            {" — "}
            {t("cookieLocale")}
          </li>
          <li>
            <span className="text-fg font-medium">{COOKIE_CONSENT_NAME}</span>
            {" — "}
            {t("cookieConsent")}
          </li>
          <li>
            <span className="text-fg font-medium">_ga / _ga_*</span>
            {" — "}
            {t("cookieGa")}
          </li>
        </ul>
        <p>{t("cookiesNoMarketing")}</p>
      </div>

      <LegalSection heading={t("rightsHeading")}>
        <p>{t("rightsIntro")}</p>
        <ul className="list-disc space-y-1 pl-5">
          {RIGHT_KEYS.map((key) => (
            <li key={key}>{t(key)}</li>
          ))}
        </ul>
      </LegalSection>

      <LegalSection heading={t("complaintHeading")}>
        <p>{t("complaintBody")}</p>
        <p>
          {dpa.name}
          <br />
          {dpa.street}
          <br />
          {dpa.postalCode} {dpa.city}
        </p>
        <p>
          <a
            className="underline underline-offset-4"
            href={dpa.url}
            rel="noopener noreferrer"
            target="_blank"
          >
            {dpa.url.replace(/^https:\/\//, "")}
          </a>
        </p>
      </LegalSection>
    </LegalArticle>
  );
}
