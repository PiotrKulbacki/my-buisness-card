export type CvLocale = "pl" | "en" | "de" | "es" | "uk";

type Localized = Record<CvLocale, string>;
type LocalizedList = Record<CvLocale, string[]>;

export type CvExperience = {
  id: string;
  role: Localized;
  org: string | Localized;
  location?: Localized;
  period: Localized;
  points: LocalizedList;
};

export type CvEducation = {
  id: string;
  title: Localized;
  org: string | Localized;
  period: Localized;
  kind?: Localized;
  detail: Localized;
  blurb?: Localized;
};

export type CvCertificate = {
  id: string;
  title: Localized;
  issuer?: string;
  period: Localized;
  /** Public paths under /certificates/… */
  fileUrls?: string[];
};

export type CvProject = {
  id: string;
  title: string;
  summary: Localized;
  liveUrl?: string;
  courseBadge?: boolean;
};

export type CvSkillGroup = {
  id: string;
  labelKey: "frontend" | "backend" | "ai" | "payments" | "quality" | "deploy" | "product";
  items: string[];
};

export const cv = {
  summary: {
    pl: "Full Stack Software Engineer — buduję niezawodne aplikacje webowe end-to-end, własne produkty SaaS i AI oraz komercyjne strony internetowe. Łączę nowoczesny frontend (React, TypeScript, Next.js) z solidnym backendem, jakością kodu (TDD, Zod, Vitest) i wdrożeniami produkcyjnymi.",
    en: "Full Stack Software Engineer — I build reliable end-to-end web apps, own SaaS and AI products, and commercial websites. I combine modern frontend (React, TypeScript, Next.js) with solid backends, code quality (TDD, Zod, Vitest), and production deployments.",
    de: "Full Stack Software Engineer — ich baue zuverlässige End-to-End-Web-Apps, eigene SaaS- und KI-Produkte sowie kommerzielle Websites. Moderner Frontend (React, TypeScript, Next.js), solides Backend, Codequalität (TDD, Zod, Vitest) und produktive Deployments.",
    es: "Full Stack Software Engineer — construyo apps web end-to-end fiables, productos SaaS e IA propios y webs comerciales. Combino frontend moderno (React, TypeScript, Next.js) con backends sólidos, calidad de código (TDD, Zod, Vitest) y despliegues en producción.",
    uk: "Full Stack Software Engineer — будую надійні end-to-end вебзастосунки, власні SaaS і AI продукти та комерційні сайти. Поєдную сучасний frontend (React, TypeScript, Next.js) із солідним бекендом, якістю коду (TDD, Zod, Vitest) і продакшен-деплоями.",
  } satisfies Localized,

  skillGroups: [
    {
      id: "frontend",
      labelKey: "frontend",
      items: [
        "Next.js",
        "React",
        "TypeScript",
        "JavaScript",
        "HTML5",
        "CSS3",
        "Tailwind CSS",
        "React Native / Expo",
      ],
    },
    {
      id: "backend",
      labelKey: "backend",
      items: [
        "Node.js",
        "Supabase",
        "PostgreSQL",
        "Prisma",
        "REST API",
        "Authentication",
        "RLS",
        "Python",
        "Flask",
        "SQLite",
      ],
    },
    {
      id: "ai",
      labelKey: "ai",
      items: ["OpenAI API", "AI-powered apps", "Prompt engineering", "AI document processing"],
    },
    {
      id: "payments",
      labelKey: "payments",
      items: ["Stripe", "Stripe Checkout", "Stripe Webhooks"],
    },
    {
      id: "quality",
      labelKey: "quality",
      items: ["TDD", "Vitest", "React Testing Library", "Zod", "React Hook Form", "Git / GitHub"],
    },
    {
      id: "deploy",
      labelKey: "deploy",
      items: ["Vercel", "Docker", "Domains & hosting"],
    },
    {
      id: "product",
      labelKey: "product",
      items: [
        "Responsive design",
        "SEO",
        "i18n",
        "System architecture",
        "SaaS product design",
        "Performance",
      ],
    },
  ] satisfies CvSkillGroup[],

  softSkills: {
    pl: [
      "Rozwiązywanie problemów",
      "Współpraca w zespole",
      "Komunikacja",
      "Szybka adaptacja do nowych technologii",
      "Elastyczność i szybka nauka",
      "Samodzielność i inicjatywa",
      "Myślenie krytyczne",
      "Dbałość o detale",
    ],
    en: [
      "Problem-solving",
      "Collaboration & teamwork",
      "Communication",
      "Quickly adapts to new technologies",
      "Adaptability & fast learning",
      "Self-motivation & initiative",
      "Critical thinking",
      "Attention to detail",
    ],
    de: [
      "Problemlösung",
      "Zusammenarbeit im Team",
      "Kommunikation",
      "Schnelle Anpassung an neue Technologien",
      "Anpassungsfähigkeit & schnelles Lernen",
      "Eigenmotivation & Initiative",
      "Kritisches Denken",
      "Sorgfalt für Details",
    ],
    es: [
      "Resolución de problemas",
      "Colaboración en equipo",
      "Comunicación",
      "Rápida adaptación a nuevas tecnologías",
      "Adaptabilidad y aprendizaje rápido",
      "Automotivación e iniciativa",
      "Pensamiento crítico",
      "Atención al detalle",
    ],
    uk: [
      "Розв’язання проблем",
      "Командна співпраця",
      "Комунікація",
      "Швидка адаптація до нових технологій",
      "Гнучкість і швидке навчання",
      "Самомотивація та ініціатива",
      "Критичне мислення",
      "Увага до деталей",
    ],
  } satisfies LocalizedList,

  projects: [
    {
      id: "movieweb",
      title: "MovieWeb App",
      courseBadge: true,
      summary: {
        pl: "Platforma filmowa z kontem użytkownika: wyszukiwanie tytułów, lista ulubionych, szczegóły opisów i okładek.",
        en: "Movie platform with user accounts: search titles, manage a favorites list, and view details with posters.",
        de: "Filmplattform mit Benutzerkonto: Titelsuche, Favoritenliste sowie Detailansichten mit Postern.",
        es: "Plataforma de cine con cuenta de usuario: búsqueda de títulos, lista de favoritos y fichas con pósters.",
        uk: "Кіноплатформа з акаунтом: пошук назв, список улюблених, деталі описів і обкладинок.",
      },
    },
    {
      id: "sportclub",
      title: "Sport Club PowerPlay",
      courseBadge: true,
      summary: {
        pl: "Zarządzanie kursami sportowymi: panel admina (kursy, klasy, harmonogram) i uczestnika (zapisy / wypisy, usuwanie konta).",
        en: "Sports course management: admin panel (courses, classes, schedule) and participant panel (join / leave, delete account).",
        de: "Sportkurs-Verwaltung: Admin-Panel (Kurse, Klassen, Plan) und Teilnehmer-Panel (an-/abmelden, Konto löschen).",
        es: "Gestión de cursos deportivos: panel admin (cursos, clases, horario) y participante (alta / baja, borrar cuenta).",
        uk: "Керування спортивними курсами: панель адміна (курси, класи, розклад) і учасника (запис / відпис, видалення акаунта).",
      },
    },
    {
      id: "lyamo",
      title: "Lyamo",
      liveUrl: "https://lyamo.eu/",
      summary: {
        pl: "Aplikacja do finansów osobistych (web + mobile): monorepo, i18n, billing, AI/OCR i architektura pod skalę.",
        en: "Personal finance app (web + mobile): monorepo, i18n, billing, AI/OCR and scale-ready architecture.",
        de: "Persönliche Finanz-App (Web + Mobile): Monorepo, i18n, Billing, KI/OCR und skalierbare Architektur.",
        es: "App de finanzas personales (web + móvil): monorepo, i18n, billing, IA/OCR y arquitectura lista para escalar.",
        uk: "Додаток особистих фінансів (web + mobile): monorepo, i18n, billing, AI/OCR і архітектура під масштаб.",
      },
    },
    {
      id: "ai-document",
      title: "AI Document",
      liveUrl: "https://aidocument.eu/pl",
      summary: {
        pl: "Asystent spraw urzędowych: AI generuje pisma z podpisem odręcznym, dodaje terminy do kalendarza i przypomina e-mailem.",
        en: "Official-document assistant: AI drafts letters with handwritten signature, calendar events and email reminders.",
        de: "Assistent für Behördensachen: KI erstellt Schreiben mit Handunterschrift, Kalendertermine und E-Mail-Erinnerungen.",
        es: "Asistente de trámites: la IA genera escritos con firma manuscrita, eventos de calendario y recordatorios por email.",
        uk: "Асистент офіційних справ: AI генерує листи з рукописним підписом, події в календарі та email-нагадування.",
      },
    },
    {
      id: "ak-gebaeudeservice",
      title: "AK Gebäudeservice",
      liveUrl: "https://www.akgebaeudeservice.com/",
      summary: {
        pl: "Komercyjna strona firmowa end-to-end — od projektu po wdrożenie, konfigurację domeny i hosting.",
        en: "Commercial company website end-to-end — from design to deploy, domain setup and hosting.",
        de: "Kommerzielle Firmenwebsite end-to-end — von Design bis Deploy, Domain und Hosting.",
        es: "Web corporativa comercial de extremo a extremo — del diseño al deploy, dominio y hosting.",
        uk: "Комерційний корпоративний сайт end-to-end — від дизайну до деплою, домену та хостингу.",
      },
    },
    {
      id: "wc26-predictor",
      title: "WC26 Predictor",
      liveUrl: "https://wc26-predictor-zapraszam.vercel.app/",
      summary: {
        pl: "Aplikacja wokół predykcji i zaangażowania fanów przy Mistrzostwach Świata 2026.",
        en: "App around predictions and fan engagement for the 2026 World Cup.",
        de: "App rund um Predictions und Fan-Engagement zur WM 2026.",
        es: "App de predicciones y engagement de fans para el Mundial 2026.",
        uk: "Додаток навколо прогнозів і залучення фанатів до ЧС-2026.",
      },
    },
  ] satisfies CvProject[],

  experience: [
    {
      id: "independent-practice",
      role: {
        pl: "Inżynier oprogramowania — działalność gospodarcza",
        en: "Software Engineer — independent practice",
        de: "Software Engineer — selbstständige Tätigkeit",
        es: "Ingeniero de software — actividad independiente",
        uk: "Інженер програмного забезпечення — власна діяльність",
      },
      org: {
        pl: "Własna działalność",
        en: "Self-employed",
        de: "Selbstständig",
        es: "Autónomo",
        uk: "Власна діяльність",
      },
      period: {
        pl: "2025 — obecnie",
        en: "2025 — present",
        de: "2025 — heute",
        es: "2025 — presente",
        uk: "2025 — дотепер",
      },
      points: {
        pl: [
          "Dalsze zdobywanie doświadczenia jako Full Stack Software Engineer",
          "Otwarcie i prowadzenie własnej działalności — produkty cyfrowe oraz realizacje dla klientów",
          "Projektowanie i wdrażanie aplikacji webowych end-to-end (architektura, jakość, produkcja)",
        ],
        en: [
          "Continued growth as a Full Stack Software Engineer",
          "Established and run an independent practice — digital products and client deliveries",
          "Designing and shipping end-to-end web applications (architecture, quality, production)",
        ],
        de: [
          "Weiterer Kompetenzaufbau als Full Stack Software Engineer",
          "Aufbau und Führung einer selbstständigen Tätigkeit — digitale Produkte und Kundenprojekte",
          "Konzeption und Umsetzung von Web-Apps end-to-end (Architektur, Qualität, Produktion)",
        ],
        es: [
          "Continuo desarrollo como Full Stack Software Engineer",
          "Apertura y gestión de actividad independiente — productos digitales y entregas a clientes",
          "Diseño y despliegue de aplicaciones web end-to-end (arquitectura, calidad, producción)",
        ],
        uk: [
          "Подальший розвиток як Full Stack Software Engineer",
          "Відкриття та ведення власної діяльності — цифрові продукти й клієнтські реалізації",
          "Проєктування та впровадження вебзастосунків end-to-end (архітектура, якість, продакшен)",
        ],
      },
    },
    {
      id: "webeet",
      role: {
        pl: "Web developer — staż",
        en: "Web developer — internship",
        de: "Web developer — Praktikum",
        es: "Web developer — prácticas",
        uk: "Web developer — стажування",
      },
      org: "webeet.io",
      location: {
        pl: "Remote",
        en: "Remote",
        de: "Remote",
        es: "Remoto",
        uk: "Remote",
      },
      period: {
        pl: "sie 2025 — wrz 2025",
        en: "Aug 2025 — Sep 2025",
        de: "Aug 2025 — Sep 2025",
        es: "ago 2025 — sep 2025",
        uk: "сер 2025 — вер 2025",
      },
      points: {
        pl: [
          "Praktyki na zakończenie kursu programowania — rozwój kluczowych modułów frontendowych w React i TypeScript",
          "TDD dla AuthForm — pokrycie unit i integration (Vitest, React Testing Library)",
          "Walidacja Zod w krytycznych flow oraz refaktoryzacja testów pod wzorce BDD",
        ],
        en: [
          "Internship at the end of the programming course — critical frontend modules in React and TypeScript",
          "TDD for AuthForm — unit and integration coverage (Vitest, React Testing Library)",
          "Zod validation on critical flows and test refactors toward BDD patterns",
        ],
        de: [
          "Praktikum am Ende des Programmierkurses — kritische Frontend-Module mit React und TypeScript",
          "TDD für AuthForm — Unit- und Integrationstests (Vitest, React Testing Library)",
          "Zod-Validierung in kritischen Flows und Test-Refactors Richtung BDD",
        ],
        es: [
          "Prácticas al final del curso de programación — módulos frontend críticos en React y TypeScript",
          "TDD para AuthForm — cobertura unit e integration (Vitest, React Testing Library)",
          "Validación Zod en flujos críticos y refactor de tests hacia patrones BDD",
        ],
        uk: [
          "Стажування наприкінці курсу програмування — критичні frontend-модулі на React і TypeScript",
          "TDD для AuthForm — unit та integration покриття (Vitest, React Testing Library)",
          "Валідація Zod у критичних flow та рефакторинг тестів під BDD",
        ],
      },
    },
    {
      id: "masterschool-bootcamp",
      role: {
        pl: "Kurs programowania — Software Engineering Bootcamp",
        en: "Programming course — Software Engineering Bootcamp",
        de: "Programmierkurs — Software Engineering Bootcamp",
        es: "Curso de programación — Software Engineering Bootcamp",
        uk: "Курс програмування — Software Engineering Bootcamp",
      },
      org: "Masterschool",
      location: {
        pl: "100% online (remote)",
        en: "100% online (remote)",
        de: "100% online (remote)",
        es: "100% online (remoto)",
        uk: "100% online (remote)",
      },
      period: {
        pl: "lip 2024 — wrz 2025",
        en: "Jul 2024 — Sep 2025",
        de: "Jul 2024 — Sep 2025",
        es: "jul 2024 — sep 2025",
        uk: "лип 2024 — вер 2025",
      },
      points: {
        pl: [
          "Intensywny bootcamp Software Engineering (Masterschool) — fundamenty Pythona, JavaScript, React, Node i Git",
          "Wprowadzenie do baz danych i SQL, HTML/CSS oraz metod pracy (Agile / Waterfall)",
          "Podstawy architektury oprogramowania, UI i pracy projektowej w zespole",
        ],
        en: [
          "Intensive Software Engineering bootcamp (Masterschool) — Python, JavaScript, React, Node and Git fundamentals",
          "Intro to databases and SQL, HTML/CSS and delivery methods (Agile / Waterfall)",
          "Software architecture basics, UI fundamentals and team project work",
        ],
        de: [
          "Intensives Software-Engineering-Bootcamp (Masterschool) — Grundlagen in Python, JavaScript, React, Node und Git",
          "Einführung in Datenbanken und SQL, HTML/CSS sowie Arbeitsmethoden (Agile / Waterfall)",
          "Grundlagen der Softwarearchitektur, UI und projektbezogener Teamarbeit",
        ],
        es: [
          "Bootcamp intensivo de Software Engineering (Masterschool) — fundamentos de Python, JavaScript, React, Node y Git",
          "Introducción a bases de datos y SQL, HTML/CSS y métodos de trabajo (Agile / Waterfall)",
          "Bases de arquitectura de software, UI y trabajo de proyecto en equipo",
        ],
        uk: [
          "Інтенсивний Software Engineering bootcamp (Masterschool) — основи Python, JavaScript, React, Node та Git",
          "Вступ до баз даних і SQL, HTML/CSS і методів роботи (Agile / Waterfall)",
          "Основи архітектури ПЗ, UI та командної проєктної роботи",
        ],
      },
    },
    {
      id: "elpron",
      role: {
        pl: "Systemy elektryczne i zaopatrzenie",
        en: "Electrical systems & supply",
        de: "Elektrische Systeme und Versorgung",
        es: "Sistemas eléctricos y aprovisionamiento",
        uk: "Електричні системи та постачання",
      },
      org: "Elpron GmbH",
      location: {
        pl: "Berlin-Brandenburg",
        en: "Berlin-Brandenburg",
        de: "Berlin-Brandenburg",
        es: "Berlín-Brandeburgo",
        uk: "Berlin-Brandenburg",
      },
      period: {
        pl: "lip 2016 — lip 2024",
        en: "Jul 2016 — Jul 2024",
        de: "Jul 2016 — Jul 2024",
        es: "jul 2016 — jul 2024",
        uk: "лип 2016 — лип 2024",
      },
      points: {
        pl: [
          "Optymalizacja logistyki materiałów — ok. 30% mniej opóźnień dostaw",
          "Precyzyjne instalacje systemów (trasowanie kabli, wiercenia) wg specyfikacji",
          "Diagnostyka i prewencyjne utrzymanie — ok. 40% niższe koszty napraw",
          "Szkolenie nowych pracowników oraz kontrola jakości i zgodności z procedurami",
        ],
        en: [
          "Optimized material logistics — ~30% fewer delivery delays",
          "Precise system installations (cable routing, core drilling) to spec",
          "Diagnostics and preventive maintenance — ~40% lower repair costs",
          "Mentored new hires and enforced quality / compliance standards",
        ],
        de: [
          "Optimierte Materiallogistik — ca. 30 % weniger Lieferverzögerungen",
          "Präzise Systeminstallationen (Kabelverlegung, Kernbohrungen) nach Spezifikation",
          "Diagnose und vorbeugende Wartung — ca. 40 % niedrigere Reparaturkosten",
          "Einarbeitung neuer Mitarbeitender sowie Qualitäts- und Compliance-Kontrolle",
        ],
        es: [
          "Optimización de logística de materiales — ~30 % menos retrasos de entrega",
          "Instalaciones precisas (tendido de cables, perforaciones) según especificación",
          "Diagnóstico y mantenimiento preventivo — ~40 % menos costes de reparación",
          "Formación de nuevos empleados y control de calidad / cumplimiento",
        ],
        uk: [
          "Оптимізація логістики матеріалів — ~30 % менше затримок поставок",
          "Точні інсталяції систем (прокладка кабелів, свердління) за специфікацією",
          "Діагностика та превентивне обслуговування — ~40 % нижчі витрати на ремонт",
          "Навчання нових співробітників і контроль якості / compliance",
        ],
      },
    },
    {
      id: "zal",
      role: {
        pl: "Pomocnik elektryka",
        en: "Electrician's assistant",
        de: "Elektrikerhelfer",
        es: "Ayudante de electricista",
        uk: "Помічник електрика",
      },
      org: "ZAL Berlin Brandenburg",
      location: {
        pl: "Berlin",
        en: "Berlin",
        de: "Berlin",
        es: "Berlín",
        uk: "Berlin",
      },
      period: {
        pl: "wrz 2015 — mar 2016",
        en: "Sep 2015 — Mar 2016",
        de: "Sep 2015 — Mär 2016",
        es: "sep 2015 — mar 2016",
        uk: "вер 2015 — бер 2016",
      },
      points: {
        pl: [
          "Instalacja i konfiguracja systemów sterowania elektrycznego",
          "Prace przy napędach i automatyzacji — diagnostyka oraz optymalizacja",
          "Praca z układami DC/AC i structured troubleshooting",
        ],
        en: [
          "Installed and configured electrical control systems",
          "Drive and automation work — diagnostics and optimization",
          "Hands-on DC/AC systems with structured troubleshooting",
        ],
        de: [
          "Installation und Konfiguration elektrischer Steuerungssysteme",
          "Arbeit an Antrieben und Automatisierung — Diagnose und Optimierung",
          "Praxis mit DC/AC-Systemen und strukturiertem Troubleshooting",
        ],
        es: [
          "Instalación y configuración de sistemas de control eléctrico",
          "Trabajo en accionamientos y automatización — diagnóstico y optimización",
          "Sistemas DC/AC con troubleshooting estructurado",
        ],
        uk: [
          "Встановлення та конфігурація систем електричного керування",
          "Робота з приводами та автоматизацією — діагностика й оптимізація",
          "Практика з системами DC/AC і структурованим troubleshooting",
        ],
      },
    },
    {
      id: "self-employed-renovation",
      role: {
        pl: "Remonty mieszkań",
        en: "Apartment renovations",
        de: "Wohnungsrenovierungen",
        es: "Reformas de pisos",
        uk: "Ремонт квартир",
      },
      org: {
        pl: "Własna działalność",
        en: "Self-employed",
        de: "Selbstständig",
        es: "Autónomo",
        uk: "Власна діяльність",
      },
      period: {
        pl: "2012 — 2014",
        en: "2012 — 2014",
        de: "2012 — 2014",
        es: "2012 — 2014",
        uk: "2012 — 2014",
      },
      points: {
        pl: [
          "Remonty mieszkań we własnej działalności",
          "Podłogi, sufity podwieszane, kafelkowanie, szpachlowanie i prace wykończeniowe",
        ],
        en: [
          "Apartment renovations as a self-employed contractor",
          "Floors, suspended ceilings, tiling, plastering and finishing work",
        ],
        de: [
          "Wohnungsrenovierungen in eigener Selbstständigkeit",
          "Böden, abgehängte Decken, Fliesenlegen, Spachteln und Ausbauarbeiten",
        ],
        es: [
          "Reformas de pisos como autónomo",
          "Suelos, techos suspendidos, alicatado, enlucido y acabados",
        ],
        uk: [
          "Ремонт квартир у власній діяльності",
          "Підлоги, підвісні стелі, плитка, шпаклювання та оздоблювальні роботи",
        ],
      },
    },
    {
      id: "lm-wind-power",
      role: {
        pl: "Pracownik produkcji",
        en: "Production worker",
        de: "Produktionsmitarbeiter",
        es: "Operario de producción",
        uk: "Працівник виробництва",
      },
      org: "LM Wind Power",
      period: {
        pl: "2010 — 2012",
        en: "2010 — 2012",
        de: "2010 — 2012",
        es: "2010 — 2012",
        uk: "2010 — 2012",
      },
      points: {
        pl: [
          "Praca na produkcji łopat do turbin wiatrowych",
          "Praca w procesie produkcyjnym zgodnie z procedurami jakości i BHP",
        ],
        en: [
          "Production work on wind turbine blades",
          "Followed quality and safety procedures on the production line",
        ],
        de: [
          "Produktion von Rotorblättern für Windkraftanlagen",
          "Arbeit im Fertigungsprozess nach Qualitäts- und Sicherheitsvorgaben",
        ],
        es: [
          "Producción de palas para turbinas eólicas",
          "Trabajo en línea según procedimientos de calidad y seguridad",
        ],
        uk: [
          "Виробництво лопатей для вітрових турбін",
          "Робота на лінії згідно з процедурами якості та БЖД",
        ],
      },
    },
    {
      id: "renovation-helper",
      role: {
        pl: "Prace remontowe mieszkań",
        en: "Apartment renovation work",
        de: "Wohnungsrenovierungsarbeiten",
        es: "Trabajos de reforma de pisos",
        uk: "Ремонтні роботи в квартирах",
      },
      org: {
        pl: "Remonty / budownictwo",
        en: "Renovation / construction",
        de: "Renovierung / Bau",
        es: "Reformas / construcción",
        uk: "Ремонт / будівництво",
      },
      period: {
        pl: "2008 — 2010",
        en: "2008 — 2010",
        de: "2008 — 2010",
        es: "2008 — 2010",
        uk: "2008 — 2010",
      },
      points: {
        pl: [
          "Prace przy remontach mieszkań",
          "Szpachlowanie, malowanie, kafelkowanie i inne prace wykończeniowe",
        ],
        en: [
          "Hands-on apartment renovation work",
          "Plastering, painting, tiling and other finishing tasks",
        ],
        de: [
          "Mitarbeit bei Wohnungsrenovierungen",
          "Spachteln, Streichen, Fliesenlegen und weitere Ausbauarbeiten",
        ],
        es: ["Trabajos en reformas de pisos", "Enlucido, pintura, alicatado y otros acabados"],
        uk: [
          "Робота на ремонтах квартир",
          "Шпаклювання, фарбування, плитка та інші оздоблювальні роботи",
        ],
      },
    },
  ] satisfies CvExperience[],

  education: [
    {
      id: "masterschool",
      title: {
        pl: "Software Engineering",
        en: "Software Engineering",
        de: "Software Engineering",
        es: "Software Engineering",
        uk: "Software Engineering",
      },
      org: "Masterschool",
      period: {
        pl: "lip 2024 — wrz 2025",
        en: "Jul 2024 — Sep 2025",
        de: "Jul 2024 — Sep 2025",
        es: "jul 2024 — sep 2025",
        uk: "лип 2024 — вер 2025",
      },
      kind: {
        pl: "Intensywny program szkoleniowy (14 miesięcy)",
        en: "Intensive training program (14 months)",
        de: "Intensives Trainingsprogramm (14 Monate)",
        es: "Programa intensivo de formación (14 meses)",
        uk: "Інтенсивна навчальна програма (14 місяців)",
      },
      detail: {
        pl: "Python, aplikacje webowe, OOP, bazy danych, SQL, Linux, Flask, HTML, CSS, JavaScript, React, Docker.",
        en: "Python, web applications, OOP, databases, SQL, Linux, Flask, HTML, CSS, JavaScript, React, Docker.",
        de: "Python, Webanwendungen, OOP, Datenbanken, SQL, Linux, Flask, HTML, CSS, JavaScript, React, Docker.",
        es: "Python, aplicaciones web, OOP, bases de datos, SQL, Linux, Flask, HTML, CSS, JavaScript, React, Docker.",
        uk: "Python, вебзастосунки, OOP, бази даних, SQL, Linux, Flask, HTML, CSS, JavaScript, React, Docker.",
      },
      blurb: {
        pl: "Udział w Masterschool — globalnej sieci szkół zainicjowanej przez liderów branży tech. Immersyjny program online przygotowujący do roli software engineera poprzez intensywną praktykę i projekty.",
        en: "Part of Masterschool — a global school network initiated by industry tech leaders. An immersive online program preparing for a software engineering role through intensive practice and projects.",
        de: "Teil von Masterschool — einem globalen Schulnetzwerk, initiiert von Tech-Leadern der Branche. Immersives Online-Programm auf dem Weg zum Software Engineer durch intensive Praxis und Projekte.",
        es: "Parte de Masterschool — una red global de escuelas impulsada por líderes tech. Programa online inmersivo orientado al rol de software engineer mediante práctica intensiva y proyectos.",
        uk: "Участь у Masterschool — глобальній мережі шкіл, ініційованій лідерами tech-індустрії. Імерсивна онлайн-програма до ролі software engineer через інтенсивну практику та проєкти.",
      },
    },
    {
      id: "zal-electrician",
      title: {
        pl: "Pomocnik elektryka",
        en: "Electrician's assistant",
        de: "Elektrikerhelfer",
        es: "Ayudante de electricista",
        uk: "Помічник електрика",
      },
      org: "ZAL Berlin Brandenburg",
      period: {
        pl: "wrz 2015 — mar 2016",
        en: "Sep 2015 — Mar 2016",
        de: "Sep 2015 — Mär 2016",
        es: "sep 2015 — mar 2016",
        uk: "вер 2015 — бер 2016",
      },
      kind: {
        pl: "Umschulung / kurs zawodowy",
        en: "Umschulung / vocational course",
        de: "Umschulung / berufliche Qualifizierung",
        es: "Umschulung / curso profesional",
        uk: "Umschulung / професійний курс",
      },
      detail: {
        pl: "Szkolenie i praktyka na stanowisku pomocnika elektryka — systemy sterowania, instalacje oraz diagnostyka.",
        en: "Training and practice as an electrician's assistant — control systems, installations and diagnostics.",
        de: "Ausbildung und Praxis als Elektrikerhelfer — Steuerungssysteme, Installationen und Diagnose.",
        es: "Formación y práctica como ayudante de electricista — sistemas de control, instalaciones y diagnóstico.",
        uk: "Навчання та практика на посаді помічника електрика — системи керування, інсталяції та діагностика.",
      },
    },
    {
      id: "telecom-college",
      title: {
        pl: "Technik usług pocztowych i telekomunikacyjnych",
        en: "Technician of postal and telecommunications services",
        de: "Techniker für Post- und Telekommunikationsdienstleistungen",
        es: "Técnico de servicios postales y de telecomunicaciones",
        uk: "Технік поштових і телекомунікаційних послуг",
      },
      org: {
        pl: "Technikum Łączności",
        en: "Technikum Łączności (Technical School of Telecommunications)",
        de: "Technikum Łączności (technische Fachschule für Nachrichtentechnik)",
        es: "Technikum Łączności (escuela técnica de telecomunicaciones)",
        uk: "Technikum Łączności (технікум зв’язку)",
      },
      period: {
        pl: "wrz 2004 — maj 2008",
        en: "Sep 2004 — May 2008",
        de: "Sep 2004 — Mai 2008",
        es: "sep 2004 — may 2008",
        uk: "вер 2004 — тра 2008",
      },
      detail: {
        pl: "Sieci telekomunikacyjne i struktura poczty, logistyka systemów pocztowych, komunikacja i dokumentacja.",
        en: "Telecommunications networks and postal structure, postal systems logistics, communication and documentation.",
        de: "Telekommunikationsnetze und Poststruktur, Logistik von Postsystemen, Kommunikation und Dokumentation.",
        es: "Redes de telecomunicaciones y estructura postal, logística de sistemas postales, comunicación y documentación.",
        uk: "Телеком-мережі та структура пошти, логістика поштових систем, комунікація та документація.",
      },
    },
  ] satisfies CvEducation[],

  certificates: [
    {
      id: "web-dev-internship",
      title: {
        pl: "Web developer (staż)",
        en: "Web developer (Internship)",
        de: "Webentwickler (Praktikum)",
        es: "Desarrollador web (prácticas)",
        uk: "Web developer (стажування)",
      },
      period: {
        pl: "sie 2025 — wrz 2025",
        en: "Aug 2025 — Sep 2025",
        de: "Aug 2025 — Sep 2025",
        es: "ago 2025 — sep 2025",
        uk: "сер 2025 — вер 2025",
      },
      fileUrls: ["/certificates/internship-webeet.pdf"],
    },
    {
      id: "se-web-dev",
      title: {
        pl: "Inżynieria oprogramowania — tworzenie aplikacji webowych",
        en: "Software Engineering — Web Development",
        de: "Software Engineering — Webentwicklung",
        es: "Ingeniería de software — desarrollo web",
        uk: "Інженерія програмного забезпечення — веброзробка",
      },
      period: {
        pl: "lip 2024 — wrz 2025",
        en: "Jul 2024 — Sep 2025",
        de: "Jul 2024 — Sep 2025",
        es: "jul 2024 — sep 2025",
        uk: "лип 2024 — вер 2025",
      },
      fileUrls: ["/certificates/software-engineering-web-development.pdf"],
    },
    {
      id: "learn-react",
      title: {
        pl: "Nauka React",
        en: "Learn React",
        de: "React lernen",
        es: "Aprende React",
        uk: "Вивчення React",
      },
      issuer: "Scrimba",
      period: {
        pl: "cze 2025",
        en: "Jun 2025",
        de: "Jun 2025",
        es: "jun 2025",
        uk: "чер 2025",
      },
      fileUrls: ["/certificates/learn-react.pdf"],
    },
    {
      id: "ai-engineering",
      title: {
        pl: "Wprowadzenie do inżynierii AI",
        en: "Intro to AI Engineering",
        de: "Einführung in AI Engineering",
        es: "Introducción a la ingeniería de IA",
        uk: "Вступ до AI-інженерії",
      },
      issuer: "Scrimba",
      period: {
        pl: "cze 2025",
        en: "Jun 2025",
        de: "Jun 2025",
        es: "jun 2025",
        uk: "чер 2025",
      },
      fileUrls: ["/certificates/intro-to-ai-engineering.pdf"],
    },
    {
      id: "learn-html-css",
      title: {
        pl: "Nauka HTML i CSS",
        en: "Learn HTML and CSS",
        de: "HTML und CSS lernen",
        es: "Aprende HTML y CSS",
        uk: "Вивчення HTML і CSS",
      },
      issuer: "Scrimba",
      period: {
        pl: "sie 2025",
        en: "Aug 2025",
        de: "Aug 2025",
        es: "ago 2025",
        uk: "сер 2025",
      },
      fileUrls: ["/certificates/learn-html-and-css.pdf"],
    },
    {
      id: "git-github",
      title: {
        pl: "Wprowadzenie do Git i GitHub",
        en: "Introduction to Git and GitHub",
        de: "Einführung in Git und GitHub",
        es: "Introducción a Git y GitHub",
        uk: "Вступ до Git і GitHub",
      },
      issuer: "Udemy",
      period: {
        pl: "paź 2022",
        en: "Oct 2022",
        de: "Okt 2022",
        es: "oct 2022",
        uk: "жов 2022",
      },
    },
    {
      id: "js-az",
      title: {
        pl: "Kompletny kurs programowania JavaScript od A do Z",
        en: "Complete JavaScript Programming Course from A to Z",
        de: "Vollständiger JavaScript-Programmierkurs von A bis Z",
        es: "Curso completo de programación JavaScript de la A a la Z",
        uk: "Повний курс програмування JavaScript від А до Я",
      },
      issuer: "Udemy",
      period: {
        pl: "wrz 2022",
        en: "Sep 2022",
        de: "Sep 2022",
        es: "sep 2022",
        uk: "вер 2022",
      },
      fileUrls: ["/certificates/javascript-complete-en.pdf"],
    },
    {
      id: "fe-intensive",
      title: {
        pl: "Front-end zaawansowany w 15 dni",
        en: "Advanced front-end in 15 days",
        de: "Fortgeschrittenes Front-end in 15 Tagen",
        es: "Front-end avanzado en 15 días",
        uk: "Просунутий front-end за 15 днів",
      },
      issuer: "Udemy",
      period: {
        pl: "cze 2022",
        en: "Jun 2022",
        de: "Jun 2022",
        es: "jun 2022",
        uk: "чер 2022",
      },
      fileUrls: ["/certificates/piotr-kulbacki-pl.pdf"],
    },
    {
      id: "web-15-days",
      title: {
        pl: "Web developer od podstaw w 15 dni",
        en: "Web developer from scratch in 15 days",
        de: "Webentwickler von Grund auf in 15 Tagen",
        es: "Desarrollador web desde cero en 15 días",
        uk: "Web developer з нуля за 15 днів",
      },
      issuer: "Udemy",
      period: {
        pl: "cze 2022",
        en: "Jun 2022",
        de: "Jun 2022",
        es: "jun 2022",
        uk: "чер 2022",
      },
      fileUrls: ["/certificates/piotr-kulbacki-en.pdf"],
    },
    {
      id: "umschulung-electrician",
      title: {
        pl: "Umschulung — pomocnik elektryka (ZAL)",
        en: "Umschulung — electrician's assistant (ZAL)",
        de: "Umschulung — Elektrikerhelfer (ZAL)",
        es: "Umschulung — ayudante de electricista (ZAL)",
        uk: "Umschulung — помічник електрика (ZAL)",
      },
      issuer: "ZAL Berlin Brandenburg",
      period: {
        pl: "wrz 2015 — mar 2016",
        en: "Sep 2015 — Mar 2016",
        de: "Sep 2015 — Mär 2016",
        es: "sep 2015 — mar 2016",
        uk: "вер 2015 — бер 2016",
      },
      fileUrls: ["/certificates/umschulung-1.pdf", "/certificates/umschulung-2.pdf"],
    },
    {
      id: "diploma-postal-telecom",
      title: {
        pl: "Dyplom — technik usług pocztowych i telekomunikacyjnych",
        en: "Diploma — technician of postal and telecommunications services",
        de: "Diplom — Techniker für Post- und Telekommunikationsdienstleistungen",
        es: "Diploma — técnico de servicios postales y de telecomunicaciones",
        uk: "Диплом — технік поштових і телекомунікаційних послуг",
      },
      issuer: "Okręgowa Komisja Egzaminacyjna w Poznaniu",
      period: {
        pl: "sie 2008",
        en: "Aug 2008",
        de: "Aug 2008",
        es: "ago 2008",
        uk: "сер 2008",
      },
      fileUrls: [
        "/certificates/diploma-technik-uslug.png",
        "/certificates/diploma-supplement-pl.png",
        "/certificates/diploma-supplement-en.png",
      ],
    },
  ] satisfies CvCertificate[],

  languages: [
    {
      id: "pl",
      name: {
        pl: "Polski",
        en: "Polish",
        de: "Polnisch",
        es: "Polaco",
        uk: "Польська",
      },
      level: {
        pl: "Ojczysty",
        en: "Native",
        de: "Muttersprache",
        es: "Nativo",
        uk: "Рідна",
      },
    },
    {
      id: "de",
      name: {
        pl: "Niemiecki",
        en: "German",
        de: "Deutsch",
        es: "Alemán",
        uk: "Німецька",
      },
      level: {
        pl: "C1",
        en: "C1",
        de: "C1",
        es: "C1",
        uk: "C1",
      },
    },
    {
      id: "en",
      name: {
        pl: "Angielski",
        en: "English",
        de: "Englisch",
        es: "Inglés",
        uk: "Англійська",
      },
      level: {
        pl: "A2",
        en: "A2",
        de: "A2",
        es: "A2",
        uk: "A2",
      },
    },
  ],
} as const;
