"use client";

import { useTranslations } from "next-intl";
import { Reveal } from "@/components/motion/Reveal";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { Portrait } from "@/components/ui/Portrait";
import { siteConfig } from "@/config/site";

export function LandingHero() {
  const t = useTranslations("landing");

  return (
    <section className="relative flex min-h-[calc(100svh-3.5rem)] items-center py-10 md:min-h-svh md:py-0">
      <div className="grid w-full items-center gap-10 md:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] md:gap-8">
        <Reveal>
          <p className="mb-5 text-xs font-medium tracking-[0.22em] text-[var(--fg-muted)] uppercase">
            {t("welcome")}
          </p>
          <h1 className="display text-5xl font-medium md:text-7xl">
            <span className="block font-normal text-[var(--fg)] opacity-90">
              {siteConfig.firstName}
            </span>
            <span className="mt-1 block font-bold">{siteConfig.lastName}</span>
          </h1>
          <p className="mt-5 flex items-center gap-2 text-base font-medium text-[var(--accent-warm)] md:text-lg">
            <span aria-hidden>▶</span>
            {t("role")}
          </p>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-[var(--fg-muted)] md:text-base">
            {t("tagline")}
          </p>
          <SocialLinks className="mt-8" />
        </Reveal>

        <Reveal delay={0.1}>
          <Portrait
            priority
            className="mx-auto aspect-[3/4] w-full max-w-md md:ml-auto md:max-w-none"
          />
        </Reveal>
      </div>
    </section>
  );
}
