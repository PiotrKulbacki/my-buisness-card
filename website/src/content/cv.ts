export type CvLocale = "pl" | "en" | "de" | "es" | "uk";

export type CvExperience = {
  role: Record<CvLocale, string>;
  org: string;
  period: string;
  points: Record<CvLocale, string[]>;
};

export const cv = {
  skills: [
    "TypeScript",
    "Next.js",
    "React Native / Expo",
    "Node.js",
    "PostgreSQL",
    "UI / UX",
    "i18n",
    "SEO",
    "Product design",
    "System architecture",
  ],
  education: {
    title: {
      pl: "Informatyka / Engineering",
      en: "Computer Science / Engineering",
      de: "Informatik / Engineering",
      es: "Informática / Engineering",
      uk: "Інформатика / Engineering",
    } as Record<CvLocale, string>,
    detail: {
      pl: "Studia techniczne + ciągła praktyka produktowa.",
      en: "Technical studies + ongoing product practice.",
      de: "Technisches Studium + laufende Produktpraxis.",
      es: "Estudios técnicos + práctica continua de producto.",
      uk: "Технічна освіта + постійна продуктова практика.",
    } as Record<CvLocale, string>,
  },
  experience: [
    {
      role: {
        pl: "Founder & Product Engineer",
        en: "Founder & Product Engineer",
        de: "Founder & Product Engineer",
        es: "Founder & Product Engineer",
        uk: "Founder & Product Engineer",
      },
      org: "Lyamo",
      period: "2025 — present",
      points: {
        pl: [
          "Budowa monorepo web + mobile",
          "i18n, billing, AI features, analytics",
          "Architektura i jakość end-to-end",
        ],
        en: [
          "Building web + mobile monorepo",
          "i18n, billing, AI features, analytics",
          "End-to-end architecture and quality",
        ],
        de: [
          "Aufbau Web + Mobile Monorepo",
          "i18n, Billing, KI-Features, Analytics",
          "End-to-end Architektur und Qualität",
        ],
        es: [
          "Construcción monorepo web + móvil",
          "i18n, billing, features IA, analytics",
          "Arquitectura y calidad end-to-end",
        ],
        uk: [
          "Побудова monorepo web + mobile",
          "i18n, billing, AI features, analytics",
          "Архітектура та якість end-to-end",
        ],
      },
    },
    {
      role: {
        pl: "Freelance Web & App Engineer",
        en: "Freelance Web & App Engineer",
        de: "Freelance Web & App Engineer",
        es: "Freelance Web & App Engineer",
        uk: "Freelance Web & App Engineer",
      },
      org: "Clients · Remote",
      period: "2023 — present",
      points: {
        pl: [
          "Strony firmowe i landingi z SEO",
          "Aplikacje webowe i panele operacyjne",
          "Design systems i motion UX",
        ],
        en: [
          "Company sites and SEO landings",
          "Web apps and ops dashboards",
          "Design systems and motion UX",
        ],
        de: [
          "Firmenwebsites und SEO-Landings",
          "Web-Apps und Ops-Dashboards",
          "Design Systems und Motion UX",
        ],
        es: [
          "Webs corporativas y landings SEO",
          "Apps web y dashboards operativos",
          "Design systems y motion UX",
        ],
        uk: [
          "Корпоративні сайти та SEO-лендинги",
          "Вебдодатки та ops-dashboardи",
          "Design systems і motion UX",
        ],
      },
    },
  ] satisfies CvExperience[],
};
