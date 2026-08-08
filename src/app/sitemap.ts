import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { projects } from "@/content/projects";
import { routing } from "@/i18n/routing";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["", "/about", "/projects", "/path", "/contact", "/privacy", "/impressum"];
  const projectPaths = projects.map((project) => `/projects/${project.slug}`);

  return routing.locales.flatMap((locale) =>
    [...paths, ...projectPaths].map((path) => ({
      url: `${siteConfig.url}/${locale}${path}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: path === "" ? 1 : 0.7,
    })),
  );
}
