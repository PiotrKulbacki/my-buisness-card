import { getTranslations, setRequestLocale } from "next-intl/server";
import { ProjectFilters } from "@/components/projects/ProjectFilters";
import { Reveal } from "@/components/motion/Reveal";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "projects" });
  return { title: t("title"), description: t("lead") };
}

export default async function ProjectsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("projects");

  return (
    <section className="py-16 md:py-24">
      <Reveal>
        <h1 className="display text-4xl md:text-6xl">{t("title")}</h1>
        <p className="mt-4 max-w-2xl text-[var(--fg-muted)]">{t("lead")}</p>
      </Reveal>
      <div className="mt-10">
        <ProjectFilters />
      </div>
    </section>
  );
}
