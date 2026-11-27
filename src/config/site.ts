import en from "../../messages/en.json";

export const siteConfig = {
  name: "Piotr Kulbacki",
  firstName: "Piotr",
  lastName: "Kulbacki",
  shortName: "P",
  /** EN `jobTitle` (single source: `messages/*.json` → `person`); printed on the OG card and logo lockups. */
  role: en.person.jobTitle,
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://piotrkulbacki.com",
  email: "kontakt@piotrkulbacki.com",
  /** Hero / main portrait */
  portraitSrc: "/portrait.png",
  portraitEnabled: true,
  /**
   * Sidebar circular avatar - drop a separate crop at `public/avatar.png`
   * and set avatarEnabled to true. Until then a placeholder ring is shown.
   */
  avatarSrc: "/avatar.png",
  avatarEnabled: true,
  /**
   * Brand logos in `public/brand/` (trimmed UI assets + masters).
   * See `docs/Brand_Logo.md`.
   */
  brand: {
    mark: "/brand/ui-mark.png",
    lockupHorizontal: "/brand/ui-lockup-horizontal.png",
    lockupStacked: "/brand/ui-lockup-stacked.png",
    /** PK left + Piotr / Kulbacki / role on 3 lines */
    lockupSide: "/brand/ui-lockup-side.png",
    /** Square mark for Google Organization.logo (min. 112×112) */
    googleLogo: "/brand/google-120.png",
    /** Static OG/Twitter card (1200×630). WhatsApp requires a `.png` URL. */
    shareOg: "/og.jpg",
  },
  location: {
    city: "Berlin",
    remote: true,
  },
  /**
   * Legal / Impressum (§ 5 DDG) - Einzelunternehmen, Kleinunternehmer (§ 19 UStG).
   * Gewerbe name is the natural person (no separate trade name).
   * USt-IdNr. from NEXT_PUBLIC_UST_IDNR when issued; Steuernummer must not be published.
   */
  legal: {
    street: "Bendastr. 11",
    postalCode: "12051",
    city: "Berlin",
    country: "Germany",
    countryDe: "Deutschland",
    entity: "Einzelunternehmen",
    vatId: process.env.NEXT_PUBLIC_UST_IDNR?.trim() ?? "",
    /** Berlin supervisory authority (privacy page). */
    dpa: {
      name: "Berliner Beauftragte für Datenschutz und Informationsfreiheit",
      street: "Alt-Moabit 59-61",
      postalCode: "10555",
      city: "Berlin",
      url: "https://www.datenschutz-berlin.de",
    },
  },
  social: {
    linkedin: "https://www.linkedin.com/in/it-piotr-kulbacki",
    facebook: "https://www.facebook.com/profile.php?id=61568507043528",
    github: "https://github.com/PiotrKulbacki",
    instagram: "https://www.instagram.com/piotr.kulbacki/",
    tiktok: "https://www.tiktok.com/@piotr_kulbacki_youtube",
    youtube: "https://www.youtube.com/@kulbackipiotr",
  },
  /**
   * JSON-LD identity shared with cavunio.com, dokiero.com and lyamo.eu
   * (standard: ebook-shop `docs/seo-encje.md`). Fixed production values
   * (not env-based): the `@id`s must stay exactly as the brand sites reference them.
   */
  identity: {
    personId: "https://piotrkulbacki.com/#person",
    personUrl: "https://piotrkulbacki.com/",
    websiteId: "https://piotrkulbacki.com/#website",
    websiteUrl: "https://piotrkulbacki.com/",
    businessId: "https://piotrkulbacki.com/#business",
    /** One `url` for `#business` in every locale: the page the Google profile links to. */
    businessUrl: "https://piotrkulbacki.com/de/services",
    /** Languages the person speaks (not the site's locales). */
    knowsLanguage: ["pl", "de", "en"],
    homeLocation: "Berlin",
    /** Home page `ProfilePage.dateCreated` (first commit of the site). */
    profileCreated: "2026-08-06T07:50:11+02:00",
  },
  /** Own brands - linked on the home page and listed as `Person.brand` in JSON-LD. */
  brands: [
    {
      id: "https://cavunio.com/#cavunio",
      type: "OnlineStore",
      name: "Cavunio",
      url: "https://cavunio.com/",
    },
    {
      id: "https://dokiero.com/#dokiero",
      type: "OnlineBusiness",
      name: "Dokiero",
      url: "https://dokiero.com/",
    },
    {
      id: "https://lyamo.eu/#lyamo",
      type: "OnlineBusiness",
      name: "Lyamo",
      url: "https://lyamo.eu/",
    },
  ],
  /**
   * Local business ("Piotr Kulbacki", Google Business Profile) - NAP must match the
   * profile word for word. Phone is shown only on the services page.
   */
  business: {
    telephone: "+49 1573 5166871",
    googleMapsUrl: "https://maps.google.com/?cid=6497189699195385071",
  },
  stack: [
    "TypeScript",
    "Next.js",
    "React Native / Expo",
    "Node.js",
    "PostgreSQL",
    "Supabase",
    "Stripe",
    "REST APIs",
    "Tailwind",
    "i18n",
    "AI integrations",
    "Git / GitHub",
    "Vercel",
  ],
} as const;

export type SiteConfig = typeof siteConfig;
