"use client";

import { useTranslations } from "next-intl";
import { Reveal } from "@/components/motion/Reveal";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { Portrait } from "@/components/ui/Portrait";
import { siteConfig } from "@/config/site";

export function LandingHero() {
  const t = useTranslations("landing");

  return (
    <section className="relative -my-6 flex h-(--site-landing-mobile-h) flex-col pt-5 pb-1 md:my-0 md:h-(--site-main-h) md:min-h-0 md:justify-center md:py-0">
      <div className="grid min-h-0 flex-1 grid-rows-[auto_minmax(0,1fr)] items-center gap-4 md:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] md:grid-rows-none md:gap-8">
        <Reveal>
          <p className="text-fg-muted mb-2 text-[10px] font-medium tracking-[0.22em] uppercase md:mb-5 md:text-xs">
            {t("welcome")}
          </p>
          <h1 className="display text-4xl font-medium md:text-7xl">
            <span className="text-fg block font-normal opacity-90">{siteConfig.firstName}</span>
            <span className="mt-0.5 block font-bold md:mt-1">{siteConfig.lastName}</span>
          </h1>
          <p className="text-accent-warm mt-3 flex items-center gap-2 text-sm font-medium md:mt-5 md:text-lg">
            <span aria-hidden>▶</span>
            {t("role")}
          </p>
          <p className="text-fg-muted mt-2 max-w-md text-sm leading-relaxed md:mt-4 md:text-base">
            {t("tagline")}
          </p>
          <SocialLinks className="mt-4 md:mt-8" />
        </Reveal>

        <Reveal delay={0.1} className="flex min-h-0 items-center justify-center md:block">
          <Portrait
            priority
            className="mx-auto aspect-3/4 h-(--portrait-mobile-h) w-auto max-w-full md:ml-auto md:h-auto md:max-h-full md:w-full md:max-w-none"
          />
        </Reveal>
      </div>
    </section>
  );
}
