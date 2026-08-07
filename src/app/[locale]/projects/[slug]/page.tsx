import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Link } from "@/i18n/navigation";
import { getProject, projects } from "@/content/projects";
import { Reveal } from "@/components/motion/Reveal";
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
    <article className="py-16 md:py-24">
      <Reveal>
        <Link href="/projects" className="text-fg-muted hover:text-fg text-sm">
          ← {t("back")}
        </Link>
        <p className="text-fg-muted mt-6 text-xs tracking-[0.18em] uppercase">
          {project.category} · {project.year}
        </p>
        <h1 className="display mt-3 text-4xl md:text-6xl">{project.title[loc]}</h1>
        <p className="text-fg-muted mt-5 max-w-2xl text-lg">{project.summary[loc]}</p>
      </Reveal>

      <Reveal delay={0.1} className="mt-10">
        <div
          className="border-line aspect-[16/9] overflow-hidden rounded-[28px] border"
          style={{ background: project.coverGradient }}
        />
      </Reveal>

      <div className="mt-12 grid gap-10 md:grid-cols-[1.4fr_0.6fr]">
        <Reveal>
          <p className="text-fg-muted text-base leading-relaxed md:text-lg">{project.body[loc]}</p>
        </Reveal>
        <Reveal delay={0.08}>
          <div className="border-line bg-bg-elevated space-y-6 rounded-[24px] border p-6">
            <div>
              <h2 className="text-sm font-semibold tracking-wide uppercase">{t("tech")}</h2>
              <ul className="mt-3 flex flex-wrap gap-2">
                {project.tech.map((tech) => (
                  <li key={tech} className="border-line rounded-full border px-3 py-1 text-sm">
                    {tech}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-sm font-semibold tracking-wide uppercase">{t("links")}</h2>
              <div className="mt-3 flex flex-col gap-2 text-sm">
                {project.liveUrl ? (
                  <a className="underline underline-offset-4" href={project.liveUrl}>
                    {t("live")}
                  </a>
                ) : null}
                {project.repoUrl ? (
                  <a className="underline underline-offset-4" href={project.repoUrl}>
                    {t("repo")}
                  </a>
                ) : null}
              </div>
            </div>
          </div>
        </Reveal>
      </div>

      <Reveal className="mt-12">
        <h2 className="display text-2xl md:text-3xl">{t("gallery")}</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {project.gallery.map((item) => (
            <div
              key={item.label}
              className="border-line aspect-[4/3] overflow-hidden rounded-[20px] border"
              style={{ background: item.gradient }}
              title={item.label}
            />
          ))}
        </div>
      </Reveal>
    </article>
  );
}
