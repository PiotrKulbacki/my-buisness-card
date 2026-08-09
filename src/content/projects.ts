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
    slug: "ai-document",
    category: "apps",
    year: 2026,
    tech: ["Next.js", "TypeScript", "AI", "i18n", "Vercel"],
    liveUrl: "https://aidocument.eu/pl",
    coverGradient: "linear-gradient(135deg, #0F172A 0%, #1D4ED8 45%, #38BDF8 100%)",
    gallery: [
      {
        caption: {
          pl: "Panel spraw",
          en: "Cases dashboard",
          de: "Akten-Dashboard",
          es: "Panel de trámites",
          uk: "Панель справ",
        },
        gradient: "linear-gradient(135deg, #0F172A, #1D4ED8)",
      },
      {
        caption: {
          pl: "Asystent AI",
          en: "AI assistant",
          de: "KI-Assistent",
          es: "Asistente de IA",
          uk: "AI-асистент",
        },
        gradient: "linear-gradient(150deg, #1E3A8A, #38BDF8)",
      },
      {
        caption: {
          pl: "Terminy i przypomnienia",
          en: "Deadlines & reminders",
          de: "Fristen & Erinnerungen",
          es: "Plazos y recordatorios",
          uk: "Терміни та нагадування",
        },
        gradient: "linear-gradient(120deg, #0C4A6E, #7DD3FC)",
      },
    ],
    title: {
      pl: "AI Document",
      en: "AI Document",
      de: "AI Document",
      es: "AI Document",
      uk: "AI Document",
    },
    summary: {
      pl: "Asystent spraw urzędowych — AI wyjaśnia pisma, generuje odpowiedzi z podpisem, terminy i przypomnienia.",
      en: "Official-document assistant — AI explains letters, drafts replies with signature, deadlines and reminders.",
      de: "Assistent für Behördensachen — KI erklärt Schreiben, erstellt Antworten mit Unterschrift, Fristen und Erinnerungen.",
      es: "Asistente de trámites — la IA explica documentos, genera respuestas con firma, plazos y recordatorios.",
      uk: "Асистент офіційних справ — AI пояснює листи, генерує відповіді з підписом, терміни та нагадування.",
    },
    body: {
      pl: "AI Document prowadzi sprawy urzędowe od pierwszego skanu do odpowiedzi: wgrywasz pismo (PDF lub zdjęcie), AI wyjaśnia treść po ludzku, wyciąga kwoty i terminy, pomaga przygotować odpowiedź z podpisem odręcznym na ekranie oraz ustawia przypomnienia e-mail i wpisy w kalendarzu. Produkt działa w około 30 językach i obsługuje pisma z krajów UE oraz UK, Szwajcarii i Norwegii.",
      en: "AI Document takes official paperwork from first scan to reply: upload a letter (PDF or photo), AI explains it in plain language, extracts amounts and deadlines, helps draft a response with on-screen handwritten signature, and sets email reminders plus calendar events. The product runs in about 30 languages and covers documents from EU countries plus the UK, Switzerland and Norway.",
      de: "AI Document begleitet Behördensachen vom ersten Scan bis zur Antwort: Schreiben hochladen (PDF oder Foto), KI erklärt den Inhalt verständlich, extrahiert Beträge und Fristen, hilft bei der Antwort mit Handunterschrift am Bildschirm und setzt E-Mail-Erinnerungen sowie Kalendereinträge. Das Produkt läuft in rund 30 Sprachen und deckt Schreiben aus der EU sowie UK, Schweiz und Norwegen ab.",
      es: "AI Document lleva los trámites oficiales del primer escaneo a la respuesta: subes un escrito (PDF o foto), la IA lo explica en lenguaje claro, extrae importes y plazos, ayuda a redactar la respuesta con firma manuscrita en pantalla y configura recordatorios por email y eventos de calendario. El producto funciona en unos 30 idiomas y cubre documentos de la UE más Reino Unido, Suiza y Noruega.",
      uk: "AI Document веде офіційні справи від першого скану до відповіді: завантажуєш лист (PDF або фото), AI пояснює зміст простою мовою, витягує суми й терміни, допомагає підготувати відповідь з рукописним підписом на екрані та налаштовує email-нагадування й події в календарі. Продукт працює приблизно 30 мовами й охоплює документи з країн ЄС, а також UK, Швейцарії та Норвегії.",
    },
  },
  {
    slug: "lyamo",
    category: "apps",
    featured: true,
    year: 2026,
    tech: [
      "Next.js",
      "Expo",
      "TypeScript",
      "Turborepo",
      "Prisma",
      "Tailwind CSS",
      "Stripe",
      "Supabase",
      "i18n",
    ],
    liveUrl: "https://lyamo.eu/",
    coverSrc: "/projects/lyamo/01-dashboard.png",
    coverGradient: "linear-gradient(135deg, #0B1F17 0%, #1FA97A 45%, #C8F542 100%)",
    gallery: [
      {
        src: "/projects/lyamo/02-category-donut.png",
        caption: {
          pl: "Wydatki wg kategorii — donut z legendą i filtrem bieżącego okresu",
          en: "Expenses by category — donut chart with legend and current-period filter",
          de: "Ausgaben nach Kategorie — Donut-Chart mit Legende und Periodenfilter",
          es: "Gastos por categoría — donut con leyenda y filtro del periodo actual",
          uk: "Витрати за категоріями — donut з легендою та фільтром поточного періоду",
        },
      },
      {
        src: "/projects/lyamo/03-scanner-archive.png",
        caption: {
          pl: "Skaner OCR paragonów (limity miesięczne) i archiwum dokumentów z podglądem",
          en: "Receipt OCR scanner (monthly quotas) and document archive with preview",
          de: "Beleg-OCR-Scanner (Monatskontingente) und Dokumentarchiv mit Vorschau",
          es: "Escáner OCR de tickets (cuotas mensuales) y archivo de documentos con vista previa",
          uk: "OCR-сканер чеків (місячні ліміти) та архів документів з переглядом",
        },
      },
      {
        src: "/projects/lyamo/04-ai-chat.png",
        caption: {
          pl: "Asystent finansowy AI — pytania o budżet, kategorie i wpływ zakupów do wypłaty",
          en: "AI finance assistant — questions about budget, categories and purchase impact until payday",
          de: "KI-Finanzassistent — Fragen zu Budget, Kategorien und Kaufwirkung bis zum Zahltag",
          es: "Asistente financiero IA — preguntas sobre presupuesto, categorías e impacto hasta la nómina",
          uk: "Фінансовий AI-асистент — питання про бюджет, категорії та вплив покупок до зарплати",
        },
      },
      {
        src: "/projects/lyamo/05-transactions-split.png",
        caption: {
          pl: "Historia transakcji i split paragonu — jeden zakup rozbity na kilka kategorii",
          en: "Transaction history and receipt split — one purchase broken into multiple categories",
          de: "Transaktionshistorie und Beleg-Split — ein Kauf auf mehrere Kategorien",
          es: "Historial de transacciones y split del ticket — una compra en varias categorías",
          uk: "Історія транзакцій і split чека — одна покупка на кілька категорій",
        },
      },
      {
        src: "/projects/lyamo/06-chart-filters.png",
        caption: {
          pl: "Interaktywny wykres — włączanie/wyłączanie kategorii oraz zakres dat (7 dni, dziś, własny)",
          en: "Interactive chart — toggle categories and date ranges (7 days, today, custom)",
          de: "Interaktives Diagramm — Kategorien ein-/ausblenden und Datumsbereiche (7 Tage, heute, custom)",
          es: "Gráfico interactivo — activar/ocultar categorías y rangos de fechas (7 días, hoy, personalizado)",
          uk: "Інтерактивний графік — увімкнення/вимкнення категорій і діапазони дат (7 днів, сьогодні, власний)",
        },
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
      pl: "Aplikacja do finansów osobistych — web + mobile, budżet, OCR, czat AI i subskrypcje Stripe.",
      en: "Personal finance app — web + mobile, budgeting, OCR, AI chat and Stripe subscriptions.",
      de: "Persönliche Finanz-App — Web + Mobile, Budget, OCR, KI-Chat und Stripe-Abos.",
      es: "App de finanzas personales — web + móvil, presupuesto, OCR, chat IA y suscripciones Stripe.",
      uk: "Додаток особистих фінансів — web + mobile, бюджет, OCR, AI-чат і підписки Stripe.",
    },
    body: {
      pl: "Lyamo to mój flagowy produkt do zarządzania finansami osobistymi — aplikacja web (Next.js) i mobile (Expo) w jednym monorepo Turborepo ze współdzielonymi schematami Zod, i18n (EN/DE/PL/ES) i logiką domenową. Dashboard pokazuje sumę wydatków w cyklu rozliczeniowym, budżet miesięczny, średnie dzienne, limity kategorii, spostrzeżenia AI oraz interaktywny donut z filtrami okresu. Skaner OCR odczytuje paragony i faktury (z miesięcznymi limitami skanów), zapisuje je w archiwum dokumentów i tworzy transakcje — w tym split jednego zakupu na kilka kategorii. Asystent finansowy AI odpowiada na pytania o budżet, kategorie i wpływ planowanych wydatków do wypłaty (z disclaimerem, że to nie porada finansowa). Billing opiera się o Stripe jako bezpieczną płatność kartą: plany Free / PRO / Premium z limitami AI, portal klienta i kody rabatowe. Stack: TypeScript strict, Prisma, Tailwind, Supabase Storage, rate limiting i architektura feature-driven gotowa pod skalę — ten sam poziom jakości przenoszę do projektów klientów.",
      en: "Lyamo is my flagship personal-finance product — a web app (Next.js) and mobile app (Expo) in one Turborepo monorepo with shared Zod schemas, i18n (EN/DE/PL/ES) and domain logic. The dashboard shows cycle spend totals, monthly budget, daily averages, category limits, AI insights and an interactive donut with period filters. The OCR scanner reads receipts and invoices (with monthly scan quotas), stores them in a document archive and creates transactions — including splitting one purchase across categories. The AI finance assistant answers questions about budget, categories and how planned purchases affect spending until payday (with a disclaimer that tips are not financial advice). Billing uses Stripe for secure card payments: Free / PRO / Premium plans with AI quotas, customer portal and promo codes. Stack: TypeScript strict, Prisma, Tailwind, Supabase Storage, rate limiting and a feature-driven architecture built to scale — the same quality bar I bring to client work.",
      de: "Lyamo ist mein Flagship für persönliche Finanzen — Web-App (Next.js) und Mobile-App (Expo) in einem Turborepo-Monorepo mit geteilten Zod-Schemas, i18n (EN/DE/PL/ES) und Domänenlogik. Das Dashboard zeigt Periodensummen, Monatsbudget, Tagesmittelwerte, Kategorie-Limits, KI-Insights und einen interaktiven Donut mit Periodenfiltern. Der OCR-Scanner liest Belege und Rechnungen (mit Monatskontingenten), speichert sie im Dokumentarchiv und erzeugt Transaktionen — inklusive Split eines Kaufs auf mehrere Kategorien. Der KI-Finanzassistent beantwortet Fragen zu Budget, Kategorien und Kaufwirkung bis zum Zahltag (mit Hinweis: keine Finanzberatung). Billing über Stripe für sichere Kartenzahlungen: Pläne Free / PRO / Premium mit KI-Limits, Kundenportal und Rabattcodes. Stack: TypeScript strict, Prisma, Tailwind, Supabase Storage, Rate Limiting und feature-driven Architektur — dieselbe Qualität wie in Kundenprojekten.",
      es: "Lyamo es mi producto estrella de finanzas personales — app web (Next.js) y móvil (Expo) en un monorepo Turborepo con esquemas Zod compartidos, i18n (EN/DE/PL/ES) y lógica de dominio. El dashboard muestra el gasto del ciclo, presupuesto mensual, medias diarias, límites por categoría, insights de IA y un donut interactivo con filtros de periodo. El escáner OCR lee tickets y facturas (con cuotas mensuales), los guarda en el archivo de documentos y crea transacciones — incluido el split de una compra en varias categorías. El asistente financiero IA responde sobre presupuesto, categorías e impacto de compras hasta la nómina (con aviso de que no es asesoramiento financiero). El billing usa Stripe para pagos con tarjeta seguros: planes Free / PRO / Premium con cuotas de IA, portal de cliente y códigos promo. Stack: TypeScript strict, Prisma, Tailwind, Supabase Storage, rate limiting y arquitectura feature-driven lista para escalar — el mismo nivel que llevo a proyectos de clientes.",
      uk: "Lyamo — мій флагманський продукт особистих фінансів: web (Next.js) і mobile (Expo) в одному monorepo Turborepo зі спільними Zod-схемами, i18n (EN/DE/PL/ES) і доменною логікою. Dashboard показує суму витрат у циклі, місячний бюджет, середні денні, ліміти категорій, AI-інсайти та інтерактивний donut з фільтрами періоду. OCR-сканер читає чеки й рахунки (з місячними лімітами), зберігає їх в архіві документів і створює транзакції — зокрема split однієї покупки на кілька категорій. Фінансовий AI-асистент відповідає на питання про бюджет, категорії та вплив запланованих витрат до зарплати (з дисклеймером, що це не фінансова порада). Billing через Stripe як безпечну оплату карткою: плани Free / PRO / Premium з лімітами AI, клієнтський портал і промокоди. Стек: TypeScript strict, Prisma, Tailwind, Supabase Storage, rate limiting і feature-driven архітектура під масштаб — той самий рівень якості, що й у клієнтських проєктах.",
    },
  },
  {
    slug: "wc26-predictor",
    category: "websites",
    year: 2026,
    tech: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Supabase",
      "Server Actions",
      "API-Football",
      "Zod",
      "Vercel",
    ],
    liveUrl: "https://wc26-predictor-zapraszam.vercel.app/",
    coverSrc: "/projects/wc26-predictor/01-home.png",
    coverGradient: "linear-gradient(135deg, #020617 0%, #1E3A8A 45%, #7C3AED 100%)",
    gallery: [
      {
        src: "/projects/wc26-predictor/02-dashboard.png",
        caption: {
          pl: "Dashboard gracza — drzewko turniejowe, zakłady długoterminowe, Dream Team i terminarze faz",
          en: "Player dashboard — tournament bracket, long-term bets, Dream Team and phase schedules",
          de: "Spieler-Dashboard — Turnierbaum, Langzeitwetten, Dream Team und Phasen-Termine",
          es: "Panel del jugador — cuadro del torneo, apuestas a largo plazo, Dream Team y calendarios",
          uk: "Дашборд гравця — турнірна сітка, довгострокові ставки, Dream Team і розклади фаз",
        },
      },
      {
        src: "/projects/wc26-predictor/03-bracket.png",
        caption: {
          pl: "Drzewko pucharowe — faza 1/16 i 1/8, wyniki z API (dogrywki i karne)",
          en: "Knockout bracket — round of 32 and 16, API results (extra time and penalties)",
          de: "K.o.-Baum — Sechzehntel- und Achtelfinale, API-Ergebnisse (Verlängerung und Elfmeter)",
          es: "Cuadro eliminatorio — dieciseisavos y octavos, resultados API (prórroga y penaltis)",
          uk: "Плей-офф сітка — 1/16 і 1/8, результати з API (овертайм і пенальті)",
        },
      },
      {
        src: "/projects/wc26-predictor/04-match-receipt.png",
        caption: {
          pl: "Karta meczu po rozliczeniu — oś wydarzeń, rachunek punktowy, passa i Joker",
          en: "Settled match card — event timeline, points receipt, streak bonus and Joker",
          de: "Abgerechnete Matchkarte — Ereigniszeitleiste, Punktebeleg, Serie und Joker",
          es: "Tarjeta de partido liquidada — línea de eventos, recibo de puntos, racha y Joker",
          uk: "Картка матчу після розрахунку — стрічка подій, чек балів, серія та Joker",
        },
      },
      {
        src: "/projects/wc26-predictor/05-group-standings.png",
        caption: {
          pl: "Tabele grup — status zakończenia, awanse i wyniki meczów zsynchronizowane z API",
          en: "Group tables — completion status, qualifiers and match results synced from the API",
          de: "Gruppentabellen — Abschlussstatus, Aufsteiger und API-synchronisierte Ergebnisse",
          es: "Tablas de grupos — estado final, clasificados y resultados sincronizados con la API",
          uk: "Таблиці груп — статус завершення, вихід далі та результати з API",
        },
      },
      {
        src: "/projects/wc26-predictor/06-dream-team.png",
        caption: {
          pl: "Dream Team w karcie meczu — punkty za występy wybranych zawodników wśród graczy",
          en: "Dream Team on the match card — points for selected players’ performances among contestants",
          de: "Dream Team in der Matchkarte — Punkte für Auftritte gewählter Spieler im Vergleich",
          es: "Dream Team en la tarjeta del partido — puntos por rendimiento de jugadores elegidos",
          uk: "Dream Team у картці матчу — бали за виступи обраних гравців серед учасників",
        },
      },
      {
        src: "/projects/wc26-predictor/07-outrights.png",
        caption: {
          pl: "Zakłady specjalne — mistrz, król strzelców, MVP i rozliczenie fazy pucharowej",
          en: "Special bets — champion, top scorer, MVP and knockout-phase settlement",
          de: "Spezialwetten — Weltmeister, Torschützenkönig, MVP und K.o.-Abrechnung",
          es: "Apuestas especiales — campeón, máximo goleador, MVP y liquidación de eliminatorias",
          uk: "Спеціальні ставки — чемпіон, найкращий бомбардир, MVP і розрахунок плей-офф",
        },
      },
    ],
    title: {
      pl: "WC26 Predictor",
      en: "WC26 Predictor",
      de: "WC26 Predictor",
      es: "WC26 Predictor",
      uk: "WC26 Predictor",
    },
    summary: {
      pl: "Typer MŚ 2026 — typy na żywo, zakłady ryzykowne, Dream Team, drzewko turniejowe i ranking.",
      en: "WC 2026 predictor — live tips, risky bets, Dream Team, tournament bracket and leaderboard.",
      de: "WM-2026-Tippspiel — Live-Tipps, Risikowetten, Dream Team, Turnierbaum und Rangliste.",
      es: "Predictor del Mundial 2026 — tipster en vivo, apuestas de riesgo, Dream Team, cuadro y ranking.",
      uk: "Типер ЧС-2026 — ставки наживо, ризиковані купони, Dream Team, сітка та рейтинг.",
    },
    body: {
      pl: "WC26 Predictor to aplikacja do typowania wyników Mistrzostw Świata 2026 zbudowana wokół grywalizacji: dokładny wynik (+3), trend zwycięzcy (+1), nagroda pocieszenia za gole jednej drużyny, zakłady ryzykowne (obie strzelą, karny, czerwona kartka) z ujemnymi punktami za błąd, taktyczny Joker ×2 oraz bonusy passy (Ogień). Po meczu widać rachunek punktowy i wyniki innych graczy; na żywo działa oś wydarzeń i Pub Kibica. Osobne moduły to drzewko turniejowe (tabele grup i faza pucharowa z API-Football), zakłady długoterminowe (mistrz, król strzelców, MVP) oraz Dream Team — jeden skład na turniej z punktacją za występy. Stack: Next.js (App Router) + TypeScript + Tailwind, Supabase (Auth/PostgreSQL), Server Actions i silnik rozliczeń, Zod, deploy na Vercel.",
      en: "WC26 Predictor is a World Cup 2026 tipping app built around gamification: exact score (+3), correct winner trend (+1), consolation for one side’s goals, high-risk side bets (BTTS, penalty, red card) with negative points on misses, a tactical Joker ×2 and streak bonuses (Fire). After each match you get a points receipt and peers’ results; live play adds an event timeline and a fan chat pub. Separate modules cover the tournament bracket (group tables and knockout fed by API-Football), long-term outrights (champion, top scorer, MVP) and Dream Team — one locked squad for the tournament scored on performances. Stack: Next.js (App Router) + TypeScript + Tailwind, Supabase (Auth/PostgreSQL), Server Actions and a settlement engine, Zod, deployed on Vercel.",
      de: "WC26 Predictor ist ein Tippspiel zur WM 2026 mit Gamification: exakter Score (+3), richtiger Siegertrend (+1), Trostpunkte für Tore einer Seite, Risikowetten (Beide treffen, Elfmeter, Rot) mit Minuspunkten bei Fehlern, taktischer Joker ×2 und Serien-Boni (Feuer). Nach dem Spiel erscheinen Punktebeleg und Ergebnisse anderer; live gibt es Ereigniszeitleiste und Fan-Chat. Weitere Module: Turnierbaum (Gruppentabellen und K.o. via API-Football), Langzeitwetten (Weltmeister, Torschützenkönig, MVP) und Dream Team — ein Turnierkader mit Punkten für Auftritte. Stack: Next.js (App Router) + TypeScript + Tailwind, Supabase (Auth/PostgreSQL), Server Actions und Abrechnungs-Engine, Zod, Deploy auf Vercel.",
      es: "WC26 Predictor es una app de tipster del Mundial 2026 centrada en gamificación: marcador exacto (+3), tendencia de ganador (+1), consuelo por goles de un equipo, apuestas de riesgo (ambos marcan, penalti, tarjeta roja) con puntos negativos si fallas, Joker táctico ×2 y bonos de racha (Fuego). Tras el partido ves el recibo de puntos y resultados de otros; en vivo hay línea de eventos y chat de aficionados. Módulos aparte: cuadro del torneo (tablas de grupos y eliminatorias vía API-Football), apuestas a largo plazo (campeón, máximo goleador, MVP) y Dream Team — una plantilla para el torneo con puntos por rendimiento. Stack: Next.js (App Router) + TypeScript + Tailwind, Supabase (Auth/PostgreSQL), Server Actions y motor de liquidación, Zod, deploy en Vercel.",
      uk: "WC26 Predictor — застосунок для прогнозів ЧС-2026 з гейміфікацією: точний рахунок (+3), тренд переможця (+1), бонус за голи однієї команди, ризиковані ставки (обидві заб’ють, пенальті, червона) з мінусом за помилку, тактичний Joker ×2 і бонуси серії (Вогонь). Після матчу — чек балів і результати інших; наживо — стрічка подій і чат уболівальників. Окремі модулі: турнірна сітка (таблиці груп і плей-офф з API-Football), довгострокові ставки (чемпіон, бомбардир, MVP) та Dream Team — один склад на турнір із балами за виступи. Стек: Next.js (App Router) + TypeScript + Tailwind, Supabase (Auth/PostgreSQL), Server Actions і рушій розрахунків, Zod, деплой на Vercel.",
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
