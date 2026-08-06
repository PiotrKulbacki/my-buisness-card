"use client";

import { AnimatePresence } from "motion/react";
import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { projects, type ProjectCategory } from "@/content/projects";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { cn } from "@/lib/utils";

type Filter = "all" | ProjectCategory;

export function ProjectFilters() {
  const t = useTranslations("projects");
  const [filter, setFilter] = useState<Filter>("all");

  const filtered = useMemo(() => {
    if (filter === "all") return projects;
    return projects.filter((project) => project.category === filter);
  }, [filter]);

  const options: { id: Filter; label: string }[] = [
    { id: "all", label: t("filters.all") },
    { id: "websites", label: t("filters.websites") },
    { id: "apps", label: t("filters.apps") },
  ];

  return (
    <div>
      <div className="flex flex-wrap gap-2" role="tablist" aria-label="Project filters">
        {options.map((option) => (
          <button
            key={option.id}
            type="button"
            role="tab"
            aria-selected={filter === option.id}
            className={cn(
              "focus-ring rounded-full border px-4 py-2 text-sm transition-colors",
              filter === option.id
                ? "border-[var(--fg)] bg-[var(--fg)] text-[var(--bg)]"
                : "border-[var(--line)] bg-[var(--bg-elevated)] text-[var(--fg-muted)] hover:text-[var(--fg)]",
            )}
            onClick={() => setFilter(option.id)}
          >
            {option.label}
          </button>
        ))}
      </div>

      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        <AnimatePresence mode="popLayout">
          {filtered.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </AnimatePresence>
      </div>

      {filtered.length === 0 ? <p className="mt-8 text-[var(--fg-muted)]">{t("empty")}</p> : null}
    </div>
  );
}
