"use client";

import { useTranslations } from "next-intl";
import { Reveal } from "@/components/motion/Reveal";
import { Portrait } from "@/components/ui/Portrait";
import { siteConfig } from "@/config/site";

export function AboutIntro() {
  const t = useTranslations("about");

  return (
    <section className="py-10 md:py-16">
      <div className="grid items-start gap-10 md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
        <div>
          <Reveal>
            <p className="text-xs tracking-[0.2em] text-[var(--fg-muted)] uppercase">
              {t("eyebrow")}
            </p>
            <h1 className="display mt-3 text-4xl md:text-6xl">{t("title")}</h1>
            <p className="mt-5 max-w-xl text-lg text-[var(--fg-muted)]">{t("lead")}</p>
            <p className="mt-5 max-w-xl leading-relaxed text-[var(--fg-muted)]">{t("bio")}</p>
          </Reveal>

          <Reveal delay={0.08} className="mt-10">
            <h2 className="display text-2xl md:text-3xl">{t("buildingTitle")}</h2>
            <p className="mt-3 max-w-xl text-[var(--fg-muted)]">{t("buildingBody")}</p>
            <ul className="mt-5 space-y-2 text-sm text-[var(--fg-muted)]">
              <li className="flex gap-2">
                <span className="text-[var(--accent)]">▸</span>
                {t("buildingItems.product")}
              </li>
              <li className="flex gap-2">
                <span className="text-[var(--accent)]">▸</span>
                {t("buildingItems.websites")}
              </li>
              <li className="flex gap-2">
                <span className="text-[var(--accent)]">▸</span>
                {t("buildingItems.apps")}
              </li>
            </ul>
          </Reveal>

          <Reveal delay={0.12} className="mt-10">
            <h2 className="display text-2xl md:text-3xl">{t("techTitle")}</h2>
            <ul className="mt-4 flex flex-wrap gap-2">
              {siteConfig.stack.map((tech) => (
                <li
                  key={tech}
                  className="rounded-full border border-[var(--line)] bg-[var(--bg-elevated)] px-3 py-1.5 text-sm"
                >
                  {tech}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal delay={0.1} className="md:sticky md:top-8">
          <Portrait className="aspect-[3/4] w-full" />
        </Reveal>
      </div>
    </section>
  );
}
