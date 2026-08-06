export type ProjectCategory = "websites" | "apps";

export type Project = {
  slug: string;
  category: ProjectCategory;
  featured?: boolean;
  year: number;
  tech: string[];
  liveUrl?: string;
  repoUrl?: string;
  coverGradient: string;
  gallery: { label: string; gradient: string }[];
  title: Record<"pl" | "en" | "de" | "es" | "uk", string>;
  summary: Record<"pl" | "en" | "de" | "es" | "uk", string>;
  body: Record<"pl" | "en" | "de" | "es" | "uk", string>;
};

export const projects: Project[] = [
  {
    slug: "lyamo",
    category: "apps",
    featured: true,
    year: 2026,
    tech: ["Next.js", "Expo", "TypeScript", "Turborepo", "Prisma", "i18n"],
    liveUrl: "https://lyamo.app",
    coverGradient: "linear-gradient(135deg, #0B1F17 0%, #1FA97A 45%, #C8F542 100%)",
    gallery: [
      { label: "Dashboard", gradient: "linear-gradient(135deg, #0B1F17, #1FA97A)" },
      { label: "Mobile", gradient: "linear-gradient(160deg, #102820, #C8F542)" },
      { label: "Insights", gradient: "linear-gradient(120deg, #163828, #4ADE80)" },
    ],
    title: {
      pl: "Lyamo",
      en: "Lyamo",
      de: "Lyamo",
      es: "Lyamo",
      uk: "Lyamo",
    },
    summary: {
      pl: "Aplikacja do finansów osobistych — web + mobile, wielowalutowość i AI.",
      en: "Personal finance app — web + mobile, multi-currency and AI.",
      de: "Persönliche Finanz-App — Web + Mobile, Multi-Währung und KI.",
      es: "App de finanzas personales — web + móvil, multi-divisa e IA.",
      uk: "Додаток особистих фінансів — web + mobile, multi-currency та AI.",
    },
    body: {
      pl: "Lyamo to mój flagowy produkt: monorepo (web Next.js + mobile Expo + shared packages), i18n od dnia 1, agregacje finansowe, OCR i architektura gotowa pod skalę. Case study pokazuje jakość, którą przenoszę też do projektów klientów.",
      en: "Lyamo is my flagship product: monorepo (Next.js web + Expo mobile + shared packages), i18n from day one, financial aggregations, OCR and scale-ready architecture. This case study shows the quality bar I bring to client work too.",
      de: "Lyamo ist mein Flagship: Monorepo (Next.js Web + Expo Mobile + Shared Packages), i18n ab Tag 1, Finanzaggregationen, OCR und skalierbare Architektur.",
      es: "Lyamo es mi producto estrella: monorepo (Next.js + Expo + packages compartidos), i18n desde el día 1, agregaciones financieras, OCR y arquitectura lista para escalar.",
      uk: "Lyamo — мій флагман: monorepo (Next.js + Expo + shared packages), i18n з першого дня, фінансові агрегації, OCR і архітектура готова до масштабу.",
    },
  },
  {
    slug: "brand-site-system",
    category: "websites",
    year: 2025,
    tech: ["Next.js", "Tailwind", "Motion", "SEO"],
    coverGradient: "linear-gradient(135deg, #111827 0%, #2563EB 50%, #93C5FD 100%)",
    gallery: [
      { label: "Hero", gradient: "linear-gradient(135deg, #111827, #2563EB)" },
      { label: "Projects", gradient: "linear-gradient(150deg, #1E3A8A, #60A5FA)" },
    ],
    title: {
      pl: "System stron marki",
      en: "Brand website system",
      de: "Marken-Website-System",
      es: "Sistema de web de marca",
      uk: "Система сайту бренду",
    },
    summary: {
      pl: "Szablon doświadczeń marki: performance, motion i wielojęzyczność.",
      en: "Brand experience system: performance, motion and multilingual UX.",
      de: "Markenerlebnis-System: Performance, Motion und Mehrsprachigkeit.",
      es: "Sistema de experiencia de marca: rendimiento, motion y multidioma.",
      uk: "Система бренд-досвіду: performance, motion і багатомовність.",
    },
    body: {
      pl: "Zestaw wzorców dla stron firmowych: hero jako jedna kompozycja, filtrowane portfolio, i18n i SEO tech (sitemap, schema, OG).",
      en: "A pattern kit for company sites: single-composition heroes, filterable portfolio, i18n and SEO tech (sitemap, schema, OG).",
      de: "Pattern-Kit für Firmenwebsites: Hero als eine Komposition, filterbares Portfolio, i18n und SEO-Technik.",
      es: "Kit de patrones para webs corporativas: hero como una composición, portfolio filtrable, i18n y SEO técnico.",
      uk: "Набір патернів для корпоративних сайтів: hero як одна композиція, фільтроване портфоліо, i18n і SEO tech.",
    },
  },
  {
    slug: "ops-dashboard",
    category: "apps",
    year: 2025,
    tech: ["TypeScript", "React", "Node", "Postgres"],
    coverGradient: "linear-gradient(135deg, #1C1917 0%, #F59E0B 55%, #FEF3C7 100%)",
    gallery: [
      { label: "Overview", gradient: "linear-gradient(135deg, #1C1917, #F59E0B)" },
      { label: "Reports", gradient: "linear-gradient(145deg, #292524, #FBBF24)" },
    ],
    title: {
      pl: "Dashboard operacyjny",
      en: "Operations dashboard",
      de: "Operations-Dashboard",
      es: "Dashboard operativo",
      uk: "Операційний dashboard",
    },
    summary: {
      pl: "Panel do monitorowania procesów i KPI z naciskiem na czytelność.",
      en: "Ops panel for process and KPI monitoring with clarity-first UI.",
      de: "Ops-Panel für Prozesse und KPIs mit klarer UI.",
      es: "Panel ops para procesos y KPIs con UI clara.",
      uk: "Ops-панель для процесів і KPI з чітким UI.",
    },
    body: {
      pl: "Aplikacja wewnętrzna: role, raporty, alerty i widoki dzienne. Priorytetem była szybkość odczytu danych i responsywność.",
      en: "Internal app: roles, reports, alerts and daily views. Priority: fast data scanning and responsiveness.",
      de: "Interne App: Rollen, Reports, Alerts und Tagesviews. Priorität: schnelles Scannen und Responsiveness.",
      es: "App interna: roles, informes, alertas y vistas diarias. Prioridad: lectura rápida y responsividad.",
      uk: "Внутрішній додаток: ролі, звіти, алерти та денні views. Пріоритет — швидке зчитування даних.",
    },
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

export function getProjectsByCategory(category: ProjectCategory | "all"): Project[] {
  if (category === "all") return projects;
  return projects.filter((project) => project.category === category);
}
