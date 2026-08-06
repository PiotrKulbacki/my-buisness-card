import { getTranslations, setRequestLocale } from "next-intl/server";
import { cv } from "@/content/cv";
import { Reveal } from "@/components/motion/Reveal";
import type { Locale } from "@/i18n/routing";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "path" });
  return { title: t("title"), description: t("lead") };
}

export default async function PathPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("path");
  const loc = locale as Locale;

  return (
    <section className="py-16 md:py-24">
      <Reveal>
        <p className="text-xs tracking-[0.2em] text-[var(--fg-muted)] uppercase">{t("eyebrow")}</p>
        <h1 className="display mt-3 text-4xl md:text-6xl">{t("title")}</h1>
        <p className="mt-4 max-w-2xl text-lg text-[var(--fg-muted)]">{t("lead")}</p>
      </Reveal>

      <div className="mt-14 grid gap-10 md:grid-cols-[1.2fr_0.8fr]">
        <Reveal>
          <h2 className="display text-2xl md:text-3xl">{t("experience")}</h2>
          <div className="mt-6 space-y-6">
            {cv.experience.map((item) => (
              <article
                key={`${item.org}-${item.period}`}
                className="rounded-[20px] border border-[var(--line)] bg-[var(--bg-elevated)] p-5"
              >
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="text-lg font-semibold">{item.role[loc]}</h3>
                  <span className="text-sm text-[var(--fg-muted)]">{item.period}</span>
                </div>
                <p className="mt-1 text-sm text-[var(--fg-muted)]">{item.org}</p>
                <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-[var(--fg-muted)]">
                  {item.points[loc].map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </Reveal>

        <div className="space-y-8">
          <Reveal delay={0.05}>
            <h2 className="display text-2xl md:text-3xl">{t("skills")}</h2>
            <ul className="mt-4 flex flex-wrap gap-2">
              {cv.skills.map((skill) => (
                <li
                  key={skill}
                  className="rounded-full border border-[var(--line)] bg-[var(--bg-elevated)] px-3 py-1.5 text-sm"
                >
                  {skill}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="display text-2xl md:text-3xl">{t("education")}</h2>
            <div className="mt-4 rounded-[20px] border border-[var(--line)] bg-[var(--bg-elevated)] p-5">
              <p className="font-medium">{cv.education.title[loc]}</p>
              <p className="mt-2 text-sm text-[var(--fg-muted)]">{cv.education.detail[loc]}</p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
