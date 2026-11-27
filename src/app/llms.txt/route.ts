import en from "../../../messages/en.json";
import { siteConfig } from "@/config/site";
import { projects } from "@/content/projects";
import { absoluteLocaleUrl, getSiteOrigin } from "@/lib/seo";

export const dynamic = "force-static";

// English URL of a public page.
const page = (path = "") => absoluteLocaleUrl("en", path);

// /llms.txt (llmstxt.org): a short Markdown summary for AI assistants. Same entity links as
// the JSON-LD (ebook-shop `docs/seo-encje.md`, sections 4 and 8.5); copy from `messages/en.json`.
export function GET() {
  const { identity, legal, social, business } = siteConfig;
  const body = [
    `# ${siteConfig.name}`,
    "",
    `> ${en.person.description}`,
    "",
    `- Role: ${en.person.jobTitle}. Based in ${legal.city}, ${legal.country}; sole trader (${legal.entity}).`,
    `- Own brands (separate products): ${siteConfig.brands.map((b) => `${b.name} (${b.url})`).join(", ")}.`,
    `- Contact: ${siteConfig.email}, [contact form](${page("/contact")}).`,
    `- Profiles: ${Object.values(social).join(", ")}.`,
    `- Google Business Profile: ${business.googleMapsUrl}`,
    "",
    "## Services",
    "",
    `${en.services.lead} Details and phone: ${identity.businessUrl}`,
    "",
    ...en.services.groups.map((g) => `- ${g.name}: ${g.items.join(", ")}.`),
    "",
    "## Projects",
    "",
    ...projects.map(
      (p) =>
        `- [${p.title.en}](${page(`/projects/${p.slug}`)}): ${p.summary.en}${p.liveUrl ? ` Live: ${p.liveUrl}` : ""}`,
    ),
    "",
    "## Pages",
    "",
    `- [Home](${page()})`,
    `- [About and CV](${page("/about")})`,
    `- [Services](${page("/services")})`,
    `- [Projects](${page("/projects")})`,
    `- [Contact](${page("/contact")})`,
    `- [Imprint](${page("/impressum")})`,
    `- [Privacy policy](${page("/privacy")})`,
    `- Other languages (pl, de, es, uk): ${getSiteOrigin()}/sitemap.xml`,
    "",
  ].join("\n");

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
