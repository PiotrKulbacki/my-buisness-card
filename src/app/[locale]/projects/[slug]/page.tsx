import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { getProject, projects } from "@/content/projects";
import { ProjectDetail } from "@/components/projects/ProjectDetail";
import type { Locale } from "@/i18n/routing";
import { routing } from "@/i18n/routing";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    projects.map((project) => ({ locale, slug: project.slug })),
  );
}

export async function generateMetadata({ params }: Props) {
  const { locale, slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  const loc = locale as Locale;
  return {
    title: project.title[loc],
    description: project.summary[loc],
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const project = getProject(slug);
  if (!project) notFound();

  const t = await getTranslations("projects");
  const loc = locale as Locale;

  return (
    <ProjectDetail
      project={project}
      locale={loc}
      labels={{
        back: t("back"),
        courseBadge: t("courseBadge"),
        tech: t("tech"),
        links: t("links"),
        live: t("live"),
        notLive: t("notLive"),
        repo: t("repo"),
        gallery: t("gallery"),
      }}
    />
  );
}
