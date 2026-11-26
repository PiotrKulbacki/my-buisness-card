import { getLocale, getTranslations } from "next-intl/server";
import { siteConfig } from "@/config/site";
import { routing } from "@/i18n/routing";
import { absoluteLocaleUrl, getSiteOrigin, routeLastModified } from "@/lib/seo";

/**
 * Structured data per the shared standard (ebook-shop `docs/seo-encje.md`, sections 1.1, 5.1, 13.3):
 * one `@graph` per page, every `@id` with the same `@type` on all four sites.
 */
const { identity } = siteConfig;

const personRef = {
  "@type": "Person",
  "@id": identity.personId,
  name: siteConfig.name,
  url: identity.personUrl,
};

const businessRef = {
  "@type": "LocalBusiness",
  "@id": identity.businessId,
  name: siteConfig.name,
  url: identity.businessUrl,
};

function JsonLdScript({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      // Escape "<" so no string in the payload can close the script tag.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

/** Home page (entity home of the person): ProfilePage, Person, WebSite + reference to the local business. */
export async function HomeJsonLd() {
  const locale = await getLocale();
  const t = await getTranslations("person");
  const pageUrl = absoluteLocaleUrl(locale);

  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfilePage",
        "@id": `${pageUrl}#profile`,
        url: pageUrl,
        inLanguage: locale,
        dateCreated: identity.profileCreated,
        dateModified: routeLastModified(""),
        mainEntity: { "@id": identity.personId },
        isPartOf: { "@id": identity.websiteId },
      },
      {
        "@type": "Person",
        "@id": identity.personId,
        name: siteConfig.name,
        url: identity.personUrl,
        image: `${getSiteOrigin()}${siteConfig.portraitSrc}`,
        description: t("description"),
        jobTitle: t("jobTitle"),
        knowsAbout: t.raw("knowsAbout") as string[],
        knowsLanguage: identity.knowsLanguage,
        homeLocation: { "@type": "Place", name: identity.homeLocation },
        brand: siteConfig.brands.map((brand) => ({
          "@type": brand.type,
          "@id": brand.id,
          name: brand.name,
          url: brand.url,
        })),
        sameAs: Object.values(siteConfig.social),
      },
      {
        "@type": "WebSite",
        "@id": identity.websiteId,
        name: siteConfig.name,
        url: identity.websiteUrl,
        inLanguage: routing.locales,
        publisher: { "@id": identity.personId },
      },
      businessRef,
    ],
  };

  return <JsonLdScript data={data} />;
}

export type ServiceGroup = { name: string; items: string[] };

/** Services page (entity home of the local business, Google Business Profile "Piotr Kulbacki"). */
export async function ServicesJsonLd() {
  const t = await getTranslations("services");
  const groups = t.raw("groups") as ServiceGroup[];

  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        ...businessRef,
        address: {
          "@type": "PostalAddress",
          addressLocality: "Berlin",
          addressRegion: "Berlin",
          addressCountry: "DE",
        },
        telephone: siteConfig.business.telephone,
        areaServed: [
          { "@type": "City", name: "Berlin" },
          { "@type": "State", name: "Brandenburg" },
        ],
        hasOfferCatalog: groups.map((group) => ({
          "@type": "OfferCatalog",
          name: group.name,
          itemListElement: group.items.map((item) => ({
            "@type": "Offer",
            itemOffered: { "@type": "Service", name: item },
          })),
        })),
        founder: personRef,
        sameAs: [siteConfig.business.googleMapsUrl],
      },
    ],
  };

  return <JsonLdScript data={data} />;
}
