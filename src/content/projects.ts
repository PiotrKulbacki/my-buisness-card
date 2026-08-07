import type { Locale } from "@/i18n/routing";

/**
 * Project screenshots: `public/projects/<slug>/NN-name.ext`
 * (+ optional mirrors in `docs/assets/projects/<slug>/`).
 * Cover (`coverSrc`) must NOT be repeated as the first gallery tile —
 * see `docs/Projects_Section.md` (layout + sharpness rules).
 */

export type ProjectCategory = "websites" | "apps";

export type LocalizedString = Record<Locale, string>;

export type ProjectGalleryItem = {
  /** Runtime path under `/public`, e.g. `/projects/movieweb/01-home.png` */
  src?: string;
  /** Fallback visual when no screenshot is available */
  gradient?: string;
  caption: LocalizedString;
};

export type Project = {
  slug: string;
  category: ProjectCategory;
  featured?: boolean;
  courseProject?: boolean;
  year: number;
  tech: string[];
  liveUrl?: string;
  repoUrl?: string;
  /** Cover image path under `/public` when available */
  coverSrc?: string;
  coverGradient: string;
  gallery: ProjectGalleryItem[];
  title: LocalizedString;
  summary: LocalizedString;
  body: LocalizedString;
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
      {
        caption: {
          pl: "Dashboard",
          en: "Dashboard",
          de: "Dashboard",
          es: "Dashboard",
          uk: "Dashboard",
        },
        gradient: "linear-gradient(135deg, #0B1F17, #1FA97A)",
      },
      {
        caption: {
          pl: "Mobile",
          en: "Mobile",
          de: "Mobile",
          es: "Móvil",
          uk: "Mobile",
        },
        gradient: "linear-gradient(160deg, #102820, #C8F542)",
      },
      {
        caption: {
          pl: "Insights",
          en: "Insights",
          de: "Insights",
          es: "Insights",
          uk: "Insights",
        },
        gradient: "linear-gradient(120deg, #163828, #4ADE80)",
      },
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
    slug: "ak-gebaeudeservice",
    category: "websites",
    year: 2026,
    tech: ["React", "Vite", "Tailwind CSS", "Framer Motion", "React Router", "Vercel"],
    liveUrl: "https://www.akgebaeudeservice.com/",
    coverSrc: "/projects/ak-gebaeudeservice/01-home.png",
    coverGradient: "linear-gradient(135deg, #020617 0%, #064E3B 50%, #34D399 100%)",
    gallery: [
      {
        src: "/projects/ak-gebaeudeservice/02-services.png",
        caption: {
          pl: "Siatka usług — dozorca, sprzątanie, zima, usuwanie graffiti i więcej",
          en: "Services grid — caretaker, cleaning, winter service, graffiti removal and more",
          de: "Leistungsraster — Hausmeister, Reinigung, Winterdienst, Graffiti und mehr",
          es: "Cuadrícula de servicios — conserjería, limpieza, invierno, graffiti y más",
          uk: "Сітка послуг — догляд за будівлею, прибирання, зима, графіті та інше",
        },
      },
      {
        src: "/projects/ak-gebaeudeservice/07-service-modal.png",
        caption: {
          pl: "Modal szczegółów usługi — opis oferty i CTA „Poproś o ofertę”",
          en: "Service details modal — offer copy and “Request a quote” CTA",
          de: "Service-Detailmodal — Angebotsbeschreibung und CTA „Angebot anfordern”",
          es: "Modal de detalle del servicio — oferta y CTA „Solicitar presupuesto”",
          uk: "Модаль деталей послуги — опис оферти та CTA «Запитати пропозицію»",
        },
      },
      {
        src: "/projects/ak-gebaeudeservice/03-ak-standard.png",
        caption: {
          pl: "AK-Standard — „Nieruchomość na autopilocie” i cztery filary wartości",
          en: "AK-Standard — “Property on autopilot” and four value pillars",
          de: "AK-Standard — „Immobilie auf Autopilot” und vier Werte-Säulen",
          es: "AK-Standard — “Inmueble en piloto automático” y cuatro pilares",
          uk: "AK-Standard — «Нерухомість на автопілоті» та чотири стовпи цінності",
        },
      },
      {
        src: "/projects/ak-gebaeudeservice/05-philosophie.png",
        caption: {
          pl: "Filozofia — standard jakości „sprawa szefa” i twarz firmy",
          en: "Philosophy — “owner’s priority” quality standard and company face",
          de: "Philosophie — Qualitätsstandard „Chefsache” und Gesicht der Firma",
          es: "Filosofía — estándar de calidad „asunto del jefe” y rostro de la empresa",
          uk: "Філософія — стандарт якості «справа власника» і обличчя компанії",
        },
      },
      {
        src: "/projects/ak-gebaeudeservice/06-promises.png",
        caption: {
          pl: "O nas — obietnice: zaangażowanie, kontakt, sprzęt, dostępność 24/7",
          en: "About us — promises: engagement, direct contact, equipment, 24/7 availability",
          de: "Über uns — Versprechen: Engagement, Direktkontakt, Ausrüstung, 24/7",
          es: "Sobre nosotros — promesas: compromiso, contacto, equipo, 24/7",
          uk: "Про нас — обіцянки: залученість, контакт, обладнання, 24/7",
        },
      },
      {
        src: "/projects/ak-gebaeudeservice/04-contact.png",
        caption: {
          pl: "Formularz kontaktowy — wybór usługi, załączniki i wysyłka oferty",
          en: "Contact form — service picker, file attachments and quote request",
          de: "Kontaktformular — Servicewahl, Anhänge und Angebotsanfrage",
          es: "Formulario de contacto — servicio, adjuntos y solicitud de presupuesto",
          uk: "Форма контакту — вибір послуги, вкладення та запит оферти",
        },
      },
    ],
    title: {
      pl: "AK Gebäudeservice",
      en: "AK Gebäudeservice",
      de: "AK Gebäudeservice",
      es: "AK Gebäudeservice",
      uk: "AK Gebäudeservice",
    },
    summary: {
      pl: "Komercyjna strona firmowa usług opieki nad nieruchomościami w Berlinie — od projektu po domenę i hosting.",
      en: "Commercial company site for Berlin facility services — from design to domain and hosting.",
      de: "Kommerzielle Firmenwebsite für Hausmeisterservice Berlin — von Design bis Domain und Hosting.",
      es: "Web corporativa de servicios de mantenimiento en Berlín — del diseño al dominio y hosting.",
      uk: "Комерційний сайт послуг догляду за нерухомістю в Берліні — від дизайну до домену та хостингу.",
    },
    body: {
      pl: "Strona dla Arasim & Kedzierski Gebäudeservice (Berlin): ciemny UI z emerald accent, hero na pełną szerokość, siatka usług (dozorca budynku, sprzątanie biur, sprzątanie po budowie, zieleń, graffiti, zimowe odśnieżanie, opróżnianie mieszkań, okna, malowanie, drobne naprawy, montaż, silikon) z modalami szczegółów, sekcja AK-Standard, Filozofia oraz formularz kontaktowy z załącznikami. Stack: React + Vite + Tailwind + Framer Motion + React Router; wdrożenie na Vercel z podpiętą domeną akgebaeudeservice.com — end-to-end od UI po hosting.",
      en: "Website for Arasim & Kedzierski Gebäudeservice (Berlin): dark UI with emerald accents, full-bleed hero, services grid (caretaker, office cleaning, post-construction cleaning, outdoor care, graffiti, winter service, clear-outs, windows, painting, minor repairs, assembly, silicone) with detail modals, AK-Standard section, Philosophy page and a contact form with attachments. Stack: React + Vite + Tailwind + Framer Motion + React Router; deployed on Vercel with the live domain akgebaeudeservice.com — end-to-end from UI to hosting.",
      de: "Website für Arasim & Kedzierski Gebäudeservice (Berlin): dunkles UI mit Emerald-Akzenten, Full-Bleed-Hero, Leistungsraster (Hausmeister, Büroreinigung, Bauendreinigung, Außenanlagen, Graffiti, Winterdienst, Entrümpelung, Fenster, Malerarbeiten, Kleinreparaturen, Montage, Silikon) mit Detailmodals, AK-Standard, Philosophie und Kontaktformular mit Anhängen. Stack: React + Vite + Tailwind + Framer Motion + React Router; Deploy auf Vercel mit Domain akgebaeudeservice.com — end-to-end von UI bis Hosting.",
      es: "Web para Arasim & Kedzierski Gebäudeservice (Berlín): UI oscura con acentos esmeralda, hero a sangre completa, rejilla de servicios (conserjería, limpieza de oficinas, post-obra, exteriores, graffiti, invierno, vaciado, ventanas, pintura, reparaciones, montaje, silicona) con modales, sección AK-Standard, Filosofía y formulario de contacto con adjuntos. Stack: React + Vite + Tailwind + Framer Motion + React Router; deploy en Vercel con el dominio akgebaeudeservice.com — de extremo a extremo.",
      uk: "Сайт для Arasim & Kedzierski Gebäudeservice (Берлін): темний UI з emerald-акцентами, full-bleed hero, сітка послуг (догляд за будівлею, офісне прибирання, післябудівельне, озеленення, графіті, зимовий сервіс, розчищення, вікна, малярні, дрібний ремонт, монтаж, силікон) з модалями, секція AK-Standard, Філософія та контактна форма з вкладеннями. Стек: React + Vite + Tailwind + Framer Motion + React Router; деплой на Vercel з доменом akgebaeudeservice.com — end-to-end від UI до хостингу.",
    },
  },
  {
    slug: "brand-site-system",
    category: "websites",
    year: 2025,
    tech: ["Next.js", "Tailwind", "Motion", "SEO"],
    coverGradient: "linear-gradient(135deg, #111827 0%, #2563EB 50%, #93C5FD 100%)",
    gallery: [
      {
        caption: {
          pl: "Hero",
          en: "Hero",
          de: "Hero",
          es: "Hero",
          uk: "Hero",
        },
        gradient: "linear-gradient(135deg, #111827, #2563EB)",
      },
      {
        caption: {
          pl: "Projekty",
          en: "Projects",
          de: "Projekte",
          es: "Proyectos",
          uk: "Проєкти",
        },
        gradient: "linear-gradient(150deg, #1E3A8A, #60A5FA)",
      },
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
    slug: "movieweb",
    category: "apps",
    courseProject: true,
    year: 2025,
    tech: ["Python", "Flask", "SQLAlchemy", "Flask-Migrate", "SQLite", "OMDb API", "Jinja2"],
    repoUrl: "https://github.com/PiotrKulbacki/movieweb_app",
    coverSrc: "/projects/movieweb/01-home.png",
    coverGradient: "linear-gradient(135deg, #0F172A 0%, #1E3A5F 45%, #38BDF8 100%)",
    gallery: [
      {
        src: "/projects/movieweb/02-users.png",
        caption: {
          pl: "Lista użytkowników z awatarami i usuwaniem",
          en: "User list with avatars and delete",
          de: "Benutzerliste mit Avataren und Löschen",
          es: "Lista de usuarios con avatares y eliminación",
          uk: "Список користувачів з аватарами та видаленням",
        },
      },
      {
        src: "/projects/movieweb/05-add-user.png",
        caption: {
          pl: "Formularz nowego użytkownika — wybór awatara i nazwa",
          en: "Add new user form — avatar picker and name",
          de: "Formular für neuen Nutzer — Avatar-Auswahl und Name",
          es: "Formulario de nuevo usuario — avatar y nombre",
          uk: "Форма нового користувача — вибір аватара та ім’я",
        },
      },
      {
        src: "/projects/movieweb/03-collection.png",
        caption: {
          pl: "Kolekcja filmów użytkownika — karty z plakatem, reżyserem, rokiem i oceną (CRUD)",
          en: "User movie collection cards with poster/director/year/rating CRUD",
          de: "Filmkollektion des Nutzers — Karten mit Poster/Regisseur/Jahr/Bewertung (CRUD)",
          es: "Colección de películas del usuario — tarjetas con póster/director/año/valoración (CRUD)",
          uk: "Колекція фільмів користувача — картки з постером/режисером/роком/рейтингом (CRUD)",
        },
      },
      {
        src: "/projects/movieweb/04-details.png",
        caption: {
          pl: "Modal szczegółów filmu — fabuła i obsada z OMDb",
          en: "Movie details modal — plot & cast from OMDb",
          de: "Film-Detailmodal — Handlung und Besetzung von OMDb",
          es: "Modal de detalles — trama y reparto desde OMDb",
          uk: "Модаль деталей фільму — сюжет і акторський склад з OMDb",
        },
      },
    ],
    title: {
      pl: "MovieWeb App",
      en: "MovieWeb App",
      de: "MovieWeb App",
      es: "MovieWeb App",
      uk: "MovieWeb App",
    },
    summary: {
      pl: "Aplikacja filmowa z kontami użytkowników, kolekcją filmów i danymi z OMDb — projekt kursowy.",
      en: "Movie app with user accounts, collections and OMDb data — a course project.",
      de: "Film-App mit Benutzerkonten, Sammlungen und OMDb-Daten — Kursprojekt.",
      es: "App de cine con cuentas de usuario, colecciones y datos de OMDb — proyecto de curso.",
      uk: "Кінододаток з акаунтами, колекціями та даними OMDb — навчальний проєкт.",
    },
    body: {
      pl: "MovieWeb to aplikacja Flask do zarządzania użytkownikami i ich kolekcjami filmów. Backend oparty o SQLAlchemy i SQLite z migracjami Flask-Migrate; szczegóły filmów (fabuła, obsada, plakaty) pochodzą z OMDb API. Front to Jinja2 z HTML/CSS/JS — CRUD użytkowników i filmów, lista z awatarami oraz modal szczegółów.",
      en: "MovieWeb is a Flask app for managing users and their movie collections. The backend uses SQLAlchemy and SQLite with Flask-Migrate; movie details (plot, cast, posters) come from the OMDb API. The front end is Jinja2 with HTML/CSS/JS — user and movie CRUD, an avatar list, and a details modal.",
      de: "MovieWeb ist eine Flask-App zur Verwaltung von Nutzern und ihren Filmsammlungen. Backend mit SQLAlchemy und SQLite plus Flask-Migrate; Filmdetails (Handlung, Besetzung, Poster) kommen von der OMDb-API. Frontend: Jinja2 mit HTML/CSS/JS — CRUD für Nutzer und Filme, Avatar-Liste und Detailmodal.",
      es: "MovieWeb es una app Flask para gestionar usuarios y sus colecciones de películas. Backend con SQLAlchemy y SQLite más Flask-Migrate; los detalles (trama, reparto, pósters) vienen de la API OMDb. Frontend Jinja2 con HTML/CSS/JS — CRUD de usuarios y películas, lista con avatares y modal de detalles.",
      uk: "MovieWeb — Flask-додаток для керування користувачами та їхніми колекціями фільмів. Бекенд на SQLAlchemy і SQLite з Flask-Migrate; деталі фільмів (сюжет, актори, постери) з OMDb API. Фронт — Jinja2 з HTML/CSS/JS: CRUD користувачів і фільмів, список з аватарами та модаль деталей.",
    },
  },
  {
    slug: "sportclub",
    category: "apps",
    courseProject: true,
    year: 2025,
    tech: ["React", "Vite", "Tailwind CSS", "Python", "Flask", "JWT", "SQLAlchemy", "SQLite"],
    repoUrl: "https://github.com/PiotrKulbacki/SportClub",
    coverSrc: "/projects/sportclub/01-home.png",
    coverGradient: "linear-gradient(135deg, #000046 0%, #1CB5E0 55%, #FE892A 100%)",
    gallery: [
      {
        src: "/projects/sportclub/02-auth.png",
        caption: {
          pl: "Logowanie i rejestracja — JWT, role admin / uczestnik",
          en: "Login & register — JWT auth with admin / participant roles",
          de: "Login & Registrierung — JWT mit Rollen Admin / Teilnehmer",
          es: "Login y registro — JWT con roles admin / participante",
          uk: "Вхід і реєстрація — JWT з ролями admin / учасник",
        },
      },
      {
        src: "/projects/sportclub/03-admin-dashboard.png",
        caption: {
          pl: "Panel admina — kursy, limity miejsc, dodawanie / edycja / usuwanie",
          en: "Admin dashboard — courses, spot limits, add / edit / delete",
          de: "Admin-Dashboard — Kurse, Platzlimits, Hinzufügen / Bearbeiten / Löschen",
          es: "Panel de admin — cursos, cupos, añadir / editar / eliminar",
          uk: "Панель адміна — курси, ліміти місць, додавання / редагування / видалення",
        },
      },
      {
        src: "/projects/sportclub/04-admin-forms.png",
        caption: {
          pl: "Formularze admina — nowy kurs oraz klasa (dzień, godzina, lokalizacja, trener, miejsca)",
          en: "Admin forms — new course and class (day, time, location, trainer, spots)",
          de: "Admin-Formulare — neuer Kurs und Klasse (Tag, Zeit, Ort, Trainer, Plätze)",
          es: "Formularios de admin — curso y clase (día, hora, ubicación, entrenador, plazas)",
          uk: "Форми адміна — новий курс і клас (день, час, локація, тренер, місця)",
        },
      },
      {
        src: "/projects/sportclub/05-admin-classes.png",
        caption: {
          pl: "Harmonogram klas i lista uczestników — podgląd zapisanych członków",
          en: "Class schedule and member list — view enrolled participants",
          de: "Klassenplan und Teilnehmerliste — eingeschriebene Mitglieder",
          es: "Horario de clases y lista de miembros — participantes inscritos",
          uk: "Розклад класів і список учасників — записані члени",
        },
      },
      {
        src: "/projects/sportclub/06-user-join.png",
        caption: {
          pl: "Panel użytkownika — przegląd kursów i dołączanie do konkretnej klasy",
          en: "User dashboard — browse courses and join a specific class",
          de: "Nutzer-Dashboard — Kurse ansehen und einer Klasse beitreten",
          es: "Panel de usuario — ver cursos y unirse a una clase",
          uk: "Панель користувача — перегляд курсів і приєднання до класу",
        },
      },
      {
        src: "/projects/sportclub/07-enrolled.png",
        caption: {
          pl: "Zapisane zajęcia — wypisanie z klasy i usuwanie konta",
          en: "Enrolled classes — leave a class and delete account",
          de: "Eingeschriebene Kurse — Klasse verlassen und Konto löschen",
          es: "Clases inscritas — salir de una clase y eliminar cuenta",
          uk: "Записані заняття — вихід із класу та видалення акаунта",
        },
      },
    ],
    title: {
      pl: "Sport Club PowerPlay",
      en: "Sport Club PowerPlay",
      de: "Sport Club PowerPlay",
      es: "Sport Club PowerPlay",
      uk: "Sport Club PowerPlay",
    },
    summary: {
      pl: "Zarządzanie kursami sportowymi: panel admina i uczestnika, zapisy na klasy — projekt kursowy.",
      en: "Sports course management: admin & participant panels, class join/leave — a course project.",
      de: "Sportkurs-Verwaltung: Admin- & Teilnehmer-Panels, An-/Abmeldung — Kursprojekt.",
      es: "Gestión de cursos deportivos: paneles admin y participante, altas/bajas — proyecto de curso.",
      uk: "Керування спортивними курсами: панелі адміна й учасника, запис/відпис — навчальний проєкт.",
    },
    body: {
      pl: "PowerPlay to full-stack aplikacja klubu sportowego. Admin tworzy kursy dyscyplin, dodaje kolejne klasy gdy limit miejsc się wyczerpie, ustawia harmonogram (miejsce, czas, trener) i może wszystko edytować. Użytkownik widzi dostępne kursy, dołącza do klasy lub się wypisuje oraz może usunąć konto. Backend: Flask + JWT + SQLAlchemy/SQLite; frontend: React (Vite) + Tailwind z chronionymi trasami wg roli.",
      en: "PowerPlay is a full-stack sports club app. Admins create discipline courses, add extra classes when spot limits fill up, set schedules (location, time, trainer) and edit everything. Users browse courses, join or leave classes, and can delete their account. Backend: Flask + JWT + SQLAlchemy/SQLite; frontend: React (Vite) + Tailwind with role-protected routes.",
      de: "PowerPlay ist eine Full-Stack-Sportclub-App. Admins legen Disziplin-Kurse an, fügen bei ausgebuchten Limits weitere Klassen hinzu, setzen den Plan (Ort, Zeit, Trainer) und bearbeiten alles. Nutzer sehen Kurse, treten Klassen bei oder verlassen sie und können ihr Konto löschen. Backend: Flask + JWT + SQLAlchemy/SQLite; Frontend: React (Vite) + Tailwind mit rollengeschützten Routen.",
      es: "PowerPlay es una app full-stack de club deportivo. El admin crea cursos por disciplina, añade clases extra al llenarse el cupo, define horario (lugar, hora, entrenador) y edita todo. El usuario ve cursos, se une o sale de una clase y puede borrar su cuenta. Backend: Flask + JWT + SQLAlchemy/SQLite; frontend: React (Vite) + Tailwind con rutas protegidas por rol.",
      uk: "PowerPlay — full-stack додаток спортклубу. Адмін створює курси дисциплін, додає класи при вичерпанні місць, налаштовує розклад (локація, час, тренер) і все редагує. Користувач бачить курси, приєднується або виходить із класу та може видалити акаунт. Бекенд: Flask + JWT + SQLAlchemy/SQLite; фронт: React (Vite) + Tailwind із захистом маршрутів за роллю.",
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
