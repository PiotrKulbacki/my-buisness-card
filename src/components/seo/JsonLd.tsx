import { siteConfig } from "@/config/site";

export function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        name: siteConfig.name,
        url: siteConfig.url,
      },
      {
        "@type": "Person",
        name: siteConfig.name,
        url: siteConfig.url,
        email: siteConfig.email,
        jobTitle: siteConfig.role,
        sameAs: Object.values(siteConfig.social),
      },
    ],
  };

  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  );
}
