"use client";

import { useTranslations } from "next-intl";
import { Reveal } from "@/components/motion/Reveal";
import { Portrait } from "@/components/ui/Portrait";
import { siteConfig } from "@/config/site";

export function AboutIntro() {
  const t = useTranslations("about");

  return (
    <section className="py-6 md:py-8">
      <div className="grid items-start gap-8 md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] md:gap-10">
        <div>
          <Reveal>
            <h1 className="display text-4xl md:text-6xl">{t("title")}</h1>
            <p className="text-fg-muted mt-4 max-w-xl text-lg md:mt-5">{t("lead")}</p>
            <p className="text-fg-muted mt-4 max-w-xl leading-relaxed md:mt-5">{t("bio")}</p>
          </Reveal>

          <Reveal delay={0.08} className="mt-8 md:mt-10">
            <h2 className="display text-2xl md:text-3xl">{t("buildingTitle")}</h2>
            <p className="text-fg-muted mt-3 max-w-xl">{t("buildingBody")}</p>
            <ul className="text-fg-muted mt-4 space-y-2 text-sm md:mt-5">
              <li className="flex gap-2">
                <span className="text-accent">▸</span>
                {t("buildingItems.product")}
              </li>
              <li className="flex gap-2">
                <span className="text-accent">▸</span>
                {t("buildingItems.websites")}
              </li>
              <li className="flex gap-2">
                <span className="text-accent">▸</span>
                {t("buildingItems.apps")}
              </li>
            </ul>
          </Reveal>

          <Reveal delay={0.12} className="mt-8 md:mt-10">
            <h2 className="display text-2xl md:text-3xl">{t("techTitle")}</h2>
            <ul className="mt-4 flex flex-wrap gap-2">
              {siteConfig.stack.map((tech) => (
                <li
                  key={tech}
                  className="border-line bg-bg-elevated rounded-full border px-3 py-1.5 text-sm"
                >
                  {tech}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal delay={0.1} className="md:sticky md:top-8">
          <Portrait className="aspect-3/4 w-full" />
        </Reveal>
      </div>
    </section>
  );
}
