export const siteConfig = {
  name: "Piotr Kulbacki",
  firstName: "Piotr",
  lastName: "Kulbacki",
  shortName: "P",
  role: "Software Engineer",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://piotrkulbacki.com",
  email: "it.piotr.kulbacki@gmail.com",
  /** Hero / main portrait */
  portraitSrc: "/portrait.png",
  portraitEnabled: true,
  /**
   * Sidebar circular avatar — drop a separate crop at `public/avatar.png`
   * and set avatarEnabled to true. Until then a placeholder ring is shown.
   */
  avatarSrc: "/avatar.png",
  avatarEnabled: true,
  location: {
    city: "Berlin",
    remote: true,
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
