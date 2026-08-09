"use client";

import { motion, useReducedMotion } from "motion/react";
import { useTranslations } from "next-intl";
import { useCallback, useState } from "react";
import { Link } from "@/i18n/navigation";
import type { Project } from "@/content/projects";
import type { Locale } from "@/i18n/routing";
import { ProjectGallery } from "@/components/projects/ProjectGallery";
import { ProjectImageLightbox } from "@/components/projects/ProjectImageLightbox";

const EASE = [0.22, 1, 0.36, 1] as const;

export type ProjectDetailLabels = {
  back: string;
  courseBadge: string;
  tech: string;
  links: string;
  live: string;
  notLive: string;
  repo: string;
  gallery: string;
};

type ProjectDetailProps = {
  project: Project;
  locale: Locale;
  labels: ProjectDetailLabels;
};

export function ProjectDetail({ project, locale, labels }: ProjectDetailProps) {
  const t = useTranslations("projects");
  const reduce = useReducedMotion();
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const closeLightbox = useCallback(() => setLightboxOpen(false), []);

  return (
    <article className="pt-4 pb-8 md:pt-8 md:pb-16">
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 18 }}
        animate={reduce ? undefined : { opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: EASE }}
      >
        <Link href="/projects" className="text-fg-muted hover:text-fg text-sm">
          ← {labels.back}
        </Link>
        <p className="text-fg-muted mt-2 text-xs tracking-[0.18em] uppercase md:mt-4">
          {t(`filters.${project.category}`)} · {project.year}
        </p>
        <div className="mt-1.5 flex flex-wrap items-center gap-3 md:mt-2">
          <h1 className="display text-3xl md:text-5xl lg:text-6xl">{project.title[locale]}</h1>
          {project.courseProject ? (
            <span className="border-accent/30 bg-accent/10 text-accent rounded-full border px-3 py-1 text-xs">
              {labels.courseBadge}
            </span>
          ) : null}
        </div>
        <p className="text-fg-muted mt-3 max-w-2xl text-base md:mt-4 md:text-lg">
          {project.summary[locale]}
        </p>
      </motion.div>

      <motion.div
        className="mt-5 md:mt-6"
        initial={reduce ? false : { opacity: 0, y: 28 }}
        animate={reduce ? undefined : { opacity: 1, y: 0 }}
        transition={{ duration: 0.65, delay: 0.1, ease: EASE }}
      >
        <div
          className="border-line bg-bg-elevated mx-auto max-w-3xl overflow-hidden rounded-[20px] border md:rounded-[28px]"
          style={project.coverSrc ? undefined : { background: project.coverGradient }}
        >
          {project.coverSrc ? (
            <button
              type="button"
              className="focus-ring block w-full cursor-pointer text-left"
              aria-label={t("expandImage")}
              onClick={() => setLightboxOpen(true)}
            >
              {/* eslint-disable-next-line @next/next/no-img-element -- cover must stay sharp like lightbox */}
              <img
                src={project.coverSrc}
                alt={project.title[locale]}
                width={1050}
                height={674}
                className="h-auto max-h-[min(42dvh,26rem)] w-full object-contain"
              />
            </button>
          ) : (
            <div className="aspect-video w-full" />
          )}
        </div>
      </motion.div>

      <div className="mt-6 grid gap-8 md:mt-8 md:grid-cols-[1.4fr_0.6fr] md:gap-10">
        <motion.p
          className="text-fg-muted text-base leading-relaxed md:text-lg"
          initial={reduce ? false : { opacity: 0, y: 20 }}
          animate={reduce ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.18, ease: EASE }}
        >
          {project.body[locale]}
        </motion.p>

        <motion.div
          className="border-line bg-bg-elevated space-y-6 rounded-3xl border p-6"
          initial={reduce ? false : { opacity: 0, y: 20 }}
          animate={reduce ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.26, ease: EASE }}
        >
          <div>
            <h2 className="text-sm font-semibold tracking-wide uppercase">{labels.tech}</h2>
            <ul className="mt-3 flex flex-wrap gap-2">
              {project.tech.map((tech) => (
                <li key={tech} className="border-line rounded-full border px-3 py-1 text-sm">
                  {tech}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-sm font-semibold tracking-wide uppercase">{labels.links}</h2>
            <div className="mt-3 flex flex-col gap-2 text-sm">
              {project.liveUrl ? (
                <a className="underline underline-offset-4" href={project.liveUrl}>
                  {labels.live}
                </a>
              ) : (
                <span className="text-fg-muted">{labels.notLive}</span>
              )}
              {project.repoUrl ? (
                <a
                  className="underline underline-offset-4"
                  href={project.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {labels.repo}
                </a>
              ) : null}
            </div>
          </div>
        </motion.div>
      </div>

      <ProjectGallery items={project.gallery} locale={locale} title={labels.gallery} />

      {project.coverSrc ? (
        <ProjectImageLightbox
          src={lightboxOpen ? project.coverSrc : null}
          alt={project.title[locale]}
          closeLabel={t("closeImage")}
          onClose={closeLightbox}
        />
      ) : null}
    </article>
  );
}
