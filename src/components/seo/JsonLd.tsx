import { getLocale, getTranslations } from "next-intl/server";
import { siteConfig } from "@/config/site";
import { getSiteOrigin } from "@/lib/seo";

export async function JsonLd() {
  const locale = await getLocale();
  const t = await getTranslations("meta");
  const origin = getSiteOrigin();
  const organizationId = `${origin}/#organization`;
  const personId = `${origin}/#person`;
  const websiteId = `${origin}/#website`;
  const logoUrl = `${origin}${siteConfig.brand.googleLogo}`;
  const imageUrl = `${origin}${siteConfig.portraitSrc}`;
  const sameAs = Object.values(siteConfig.social);

  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": organizationId,
        name: siteConfig.name,
        url: origin,
        logo: {
          "@type": "ImageObject",
          url: logoUrl,
          contentUrl: logoUrl,
          width: 120,
          height: 120,
        },
        image: logoUrl,
        email: siteConfig.email,
        telephone: siteConfig.legal.phoneTel,
        address: {
          "@type": "PostalAddress",
          streetAddress: siteConfig.legal.street,
          postalCode: siteConfig.legal.postalCode,
          addressLocality: siteConfig.legal.city,
          addressCountry: "DE",
        },
        sameAs,
        founder: { "@id": personId },
      },
      {
        "@type": "Person",
        "@id": personId,
        name: siteConfig.name,
        url: origin,
        image: imageUrl,
        email: siteConfig.email,
        jobTitle: siteConfig.role,
        sameAs,
        worksFor: { "@id": organizationId },
      },
      {
        "@type": "WebSite",
        "@id": websiteId,
        name: siteConfig.name,
        url: origin,
        description: t("description"),
        inLanguage: locale,
        publisher: { "@id": organizationId },
        author: { "@id": personId },
      },
    ],
  };

  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  );
}
