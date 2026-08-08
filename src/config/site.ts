export const siteConfig = {
  name: "Piotr Kulbacki",
  firstName: "Piotr",
  lastName: "Kulbacki",
  shortName: "P",
  role: "Software Engineer",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://piotrkulbacki.com",
  email: "kontakt@piotrkulbacki.com",
  /** Hero / main portrait */
  portraitSrc: "/portrait.png",
  portraitEnabled: true,
  /**
   * Sidebar circular avatar — drop a separate crop at `public/avatar.png`
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
    /** Square lime mark for transactional emails (CID embed) */
    emailMark: "/brand/email-mark.png",
  },
  location: {
    city: "Berlin",
    remote: true,
  },
  /**
   * Legal / Impressum (§ 5 DDG) — Einzelunternehmen, Kleinunternehmer (§ 19 UStG).
   * USt-IdNr. only if issued; Steuernummer must not be published.
   */
  legal: {
    street: "Bendastr. 11",
    postalCode: "12051",
    city: "Berlin",
    country: "Germany",
    countryDe: "Deutschland",
    phoneDisplay: "+49 157 35166871",
    phoneTel: "+4915735166871",
    entity: "Einzelunternehmen",
  },
  social: {
    linkedin: "https://www.linkedin.com/in/it-piotr-kulbacki",
    facebook: "https://facebook.com/",
    github: "https://github.com/PiotrKulbacki?tab=repositories",
    instagram: "https://instagram.com/",
    youtube: "https://youtube.com/",
  },
  product: {
    name: "Lyamo",
    url: "https://lyamo.app",
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
