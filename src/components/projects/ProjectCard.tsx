"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { Project } from "@/content/projects";
import type { Locale } from "@/i18n/routing";

export function ProjectCard({ project }: { project: Project }) {
  const t = useTranslations("projects");
  const locale = useLocale() as Locale;

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.98 }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="group border-line bg-bg-elevated overflow-hidden rounded-3xl border shadow-sm"
    >
      <Link href={`/projects/${project.slug}`} className="focus-ring block">
        <div
          className="relative aspect-16/10 overflow-hidden"
          style={project.coverSrc ? undefined : { background: project.coverGradient }}
        >
          {project.coverSrc ? (
            <Image
              src={project.coverSrc}
              alt={project.title[locale]}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 40vw"
            />
          ) : null}
          <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/20" />
          <div className="absolute inset-x-0 bottom-0 translate-y-4 p-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
            <div className="flex flex-wrap gap-2">
              {project.tech.slice(0, 4).map((tech) => (
                <span
                  key={tech}
                  className="rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-medium text-black"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="space-y-2 p-5">
          <div className="text-fg-muted flex items-center justify-between gap-3 text-xs">
            <span className="tracking-wider uppercase">{t(`filters.${project.category}`)}</span>
            <span>{project.year}</span>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-xl font-semibold">{project.title[locale]}</h3>
            {project.courseProject ? (
              <span className="border-accent/30 bg-accent/10 text-accent rounded-full border px-2.5 py-0.5 text-xs">
                {t("courseBadge")}
              </span>
            ) : null}
          </div>
          <p className="text-fg-muted text-sm">{project.summary[locale]}</p>
          <span className="inline-flex pt-2 text-sm font-medium underline-offset-4 group-hover:underline">
            {t("viewProject")}
          </span>
        </div>
      </Link>
    </motion.article>
  );
}
