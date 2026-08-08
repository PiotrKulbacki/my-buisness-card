import { getTranslations } from "next-intl/server";
import { cv } from "@/content/cv";
import { siteConfig } from "@/config/site";
import { Reveal } from "@/components/motion/Reveal";
import { PhoneReveal } from "@/components/path/PhoneReveal";
import { CertificatesList } from "@/components/path/CertificatesList";
import { SocialLinks } from "@/components/ui/SocialLinks";
import type { Locale } from "@/i18n/routing";

type Props = {
  locale: Locale;
};

function Tag({ children }: { children: string }) {
  return (
    <li className="border-line bg-bg-elevated rounded-full border px-3 py-1.5 text-sm">
      {children}
    </li>
  );
}

export async function CvPage({ locale }: Props) {
  const t = await getTranslations("path");
  const loc = locale;

  const certificateItems = cv.certificates.map((cert) => ({
    id: cert.id,
    title: cert.title[loc],
    issuer: cert.issuer,
    period: cert.period[loc],
    fileUrls: cert.fileUrls ? [...cert.fileUrls] : undefined,
  }));

  return (
    <section className="py-6 md:py-8">
      <Reveal>
        <h1 className="display text-4xl md:text-6xl">{t("title")}</h1>
        <p className="text-fg-muted mt-4 max-w-2xl text-lg">{t("lead")}</p>
        <div className="mt-6 flex flex-col gap-2 text-sm">
          <a
            href={`mailto:${siteConfig.email}`}
            className="focus-ring text-fg decoration-line hover:text-accent w-fit rounded-lg underline underline-offset-4"
          >
            {siteConfig.email}
          </a>
          <PhoneReveal />
        </div>
        <div className="mt-4">
          <p className="text-fg-muted text-sm">
            {siteConfig.location.city}
            {siteConfig.location.remote ? ` · ${t("remote")}` : null}
          </p>
          <SocialLinks className="mt-3" keys={["linkedin", "github"]} />
        </div>
      </Reveal>

      <Reveal delay={0.04}>
        <h2 className="display mt-14 text-2xl md:text-3xl">{t("summary")}</h2>
        <p className="text-fg-muted mt-4 max-w-3xl text-base leading-relaxed">{cv.summary[loc]}</p>
      </Reveal>

      <Reveal delay={0.06}>
        <h2 className="display mt-14 text-2xl md:text-3xl">{t("skills")}</h2>
        <div className="mt-6 space-y-6">
          {cv.skillGroups.map((group) => (
            <div key={group.id}>
              <h3 className="text-accent text-sm font-medium tracking-wide">
                {t(`skillGroups.${group.labelKey}`)}
              </h3>
              <ul className="mt-3 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <Tag key={item}>{item}</Tag>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Reveal>

      <Reveal delay={0.08}>
        <h2 className="display mt-14 text-2xl md:text-3xl">{t("softSkills")}</h2>
        <ul className="mt-4 flex flex-wrap gap-2">
          {cv.softSkills[loc].map((skill) => (
            <Tag key={skill}>{skill}</Tag>
          ))}
        </ul>
      </Reveal>

      <Reveal delay={0.1}>
        <h2 className="display mt-14 text-2xl md:text-3xl">{t("projects")}</h2>
        <p className="text-fg-muted mt-2 max-w-2xl text-sm">{t("projectsNote")}</p>
        <ul className="mt-6 space-y-4">
          {cv.projects.map((project) => (
            <li key={project.id} className="border-line border-b pb-4 last:border-b-0 last:pb-0">
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <h3 className="text-lg font-semibold">{project.title}</h3>
                {project.courseBadge ? (
                  <span className="border-accent/30 bg-accent/10 text-accent rounded-full border px-2.5 py-0.5 text-xs">
                    {t("courseBadge")}
                  </span>
                ) : null}
                {project.liveUrl ? (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="focus-ring text-fg-muted decoration-line hover:text-accent rounded-lg text-sm underline underline-offset-4"
                  >
                    {t("live")}
                  </a>
                ) : null}
              </div>
              <p className="text-fg-muted mt-2 text-sm leading-relaxed">{project.summary[loc]}</p>
            </li>
          ))}
        </ul>
      </Reveal>

      <div className="mt-14 grid gap-12 lg:grid-cols-[1.25fr_0.75fr]">
        <Reveal>
          <h2 className="display text-2xl md:text-3xl">{t("experience")}</h2>
          <ol className="border-line relative mt-8 space-y-8 border-l pl-6">
            {cv.experience.map((item) => (
              <li key={item.id} className="relative">
                <span
                  aria-hidden
                  className="bg-accent absolute top-1.5 left-[-1.91rem] size-2.5 rounded-full"
                />
                <h3 className="text-lg font-semibold">{item.role[loc]}</h3>
                <div className="mt-1 flex flex-wrap items-baseline justify-between gap-2">
                  <p className="text-fg-muted text-sm">
                    {typeof item.org === "string" ? item.org : item.org[loc]}
                    {item.location ? ` · ${item.location[loc]}` : null}
                  </p>
                  <span className="text-fg-muted shrink-0 text-sm">{item.period[loc]}</span>
                </div>
                <ul className="text-fg-muted mt-3 list-disc space-y-1.5 pl-5 text-sm leading-relaxed">
                  {item.points[loc].map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </Reveal>

        <div className="space-y-10">
          <Reveal delay={0.05}>
            <h2 className="display text-2xl md:text-3xl">{t("education")}</h2>
            <div className="mt-5 space-y-5">
              {cv.education.map((item) => (
                <article
                  key={item.id}
                  className="border-line border-t pt-5 first:border-t-0 first:pt-0"
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="font-semibold">{item.title[loc]}</h3>
                    <span className="text-fg-muted text-sm">{item.period[loc]}</span>
                  </div>
                  <p className="text-fg-muted mt-1 text-sm">
                    {typeof item.org === "string" ? item.org : item.org[loc]}
                    {item.kind?.[loc] ? ` · ${item.kind[loc]}` : null}
                  </p>
                  {item.blurb ? (
                    <p className="text-fg-muted mt-3 text-sm leading-relaxed">{item.blurb[loc]}</p>
                  ) : null}
                  <p className="text-fg-muted mt-2 text-sm leading-relaxed">{item.detail[loc]}</p>
                </article>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <h2 className="display text-2xl md:text-3xl">{t("certificates")}</h2>
            <CertificatesList items={certificateItems} />
          </Reveal>

          <Reveal delay={0.1}>
            <h2 className="display text-2xl md:text-3xl">{t("languages")}</h2>
            <ul className="mt-4 space-y-2">
              {cv.languages.map((lang) => (
                <li key={lang.id} className="flex items-baseline justify-between gap-3 text-sm">
                  <span className="font-medium">{lang.name[loc]}</span>
                  <span className="text-fg-muted">{lang.level[loc]}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
