import { getLocale, getTranslations } from "next-intl/server";
import { siteConfig } from "@/config/site";
import { absoluteLocaleUrl, getSiteOrigin } from "@/lib/seo";

/** Home page structured data: Person (shared `@id` with the brand sites), ProfilePage, WebSite. */
export async function JsonLd() {
  const locale = await getLocale();
  const t = await getTranslations("meta");
  const { identity } = siteConfig;
  const person = { "@id": identity.personId };

  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": identity.personId,
        name: siteConfig.name,
        url: identity.personUrl,
        image: `${getSiteOrigin()}${siteConfig.portraitSrc}`,
        email: siteConfig.email,
        jobTitle: siteConfig.role,
        sameAs: Object.values(siteConfig.social),
        brand: siteConfig.brands.map((brand) => ({
          "@type": "Brand",
          "@id": brand.id,
          name: brand.name,
          url: brand.url,
        })),
      },
      {
        "@type": "ProfilePage",
        "@id": identity.profileId,
        url: absoluteLocaleUrl(locale),
        inLanguage: locale,
        mainEntity: person,
      },
      {
        "@type": "WebSite",
        "@id": identity.websiteId,
        name: siteConfig.name,
        url: identity.websiteUrl,
        description: t("description"),
        inLanguage: locale,
        publisher: person,
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      // Escape "<" so no string in the payload can close the script tag.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
