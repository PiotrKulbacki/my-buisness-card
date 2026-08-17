import { z } from "zod";
import { locales } from "@/i18n/routing";

export const projectTypes = ["website", "app", "other"] as const;
export const goalOptions = [
  "clients",
  "services",
  "sales",
  "inquiries",
  "image",
  "portfolio",
  "bookings",
  "opsPanel",
  "informing",
  "other",
] as const;
export const pageOptions = [
  "home",
  "about",
  "offer",
  "work",
  "pricing",
  "reviews",
  "faq",
  "blog",
  "gallery",
  "contact",
  "form",
  "map",
  "other",
] as const;
export const appFeatureOptions = [
  "auth",
  "clientPanel",
  "payments",
  "cms",
  "bookings",
  "newsletter",
  "search",
  "api",
  "other",
  "unsure",
] as const;
export const scopeExtraOptions = ["other", "unsure"] as const;
export const materialOptions = ["yes", "partial", "no"] as const;
export const rebuildOptions = ["yes", "no", "unsure"] as const;
export const existingNeedOptions = ["keepContent", "migrate", "urls"] as const;
export const languageOptions = ["pl", "en", "de", "es", "uk", "other"] as const;
export const translationOptions = ["yes", "partial", "no"] as const;
export const integrationOptions = [
  "maps",
  "analytics",
  "social",
  "payments",
  "crmNewsletter",
  "other",
] as const;

export const BRIEF_STEP_COUNT = 6;

function blankToUndefined(value: unknown) {
  if (typeof value !== "string") return value;
  const trimmed = value.trim();
  return trimmed.length === 0 ? undefined : trimmed;
}

const optionalText = (max: number) =>
  z.preprocess(blankToUndefined, z.string().max(max).optional());

export const briefPayloadSchema = z.object({
  name: z.string().trim().min(2).max(80),
  company: optionalText(120),
  email: z.string().trim().email(),
  phone: optionalText(40),
  currentWebsite: optionalText(500),
  projectType: z.enum(projectTypes),
  goals: z.array(z.enum(goalOptions)).min(1),
  goalDescription: z.string().trim().min(10).max(4000),
  pages: z.array(z.enum(pageOptions)).default([]),
  appFeatures: z.array(z.enum(appFeatureOptions)).default([]),
  scopeExtra: z.array(z.enum(scopeExtraOptions)).default([]),
  scopeNotes: optionalText(4000),
  hasLogo: z.enum(materialOptions).optional(),
  hasPhotos: z.enum(materialOptions).optional(),
  hasCopy: z.enum(materialOptions).optional(),
  inspiration: optionalText(4000),
  rebuild: z.enum(rebuildOptions).optional(),
  existingNeeds: z.array(z.enum(existingNeedOptions)).default([]),
  existingNotes: optionalText(4000),
  languages: z.array(z.enum(languageOptions)).default([]),
  translations: z.enum(translationOptions).optional(),
  integrations: z.array(z.enum(integrationOptions)).default([]),
  timeline: optionalText(500),
  website: z.string().optional(),
  locale: z.enum(locales).optional(),
  turnstileToken: z.string().optional(),
});

export type BriefPayload = z.infer<typeof briefPayloadSchema>;

export type BriefDraftValues = {
  name: string;
  company: string;
  email: string;
  phone: string;
  currentWebsite: string;
  projectType: (typeof projectTypes)[number] | "";
  goals: (typeof goalOptions)[number][];
  goalDescription: string;
  pages: (typeof pageOptions)[number][];
  appFeatures: (typeof appFeatureOptions)[number][];
  scopeExtra: (typeof scopeExtraOptions)[number][];
  scopeNotes: string;
  hasLogo: (typeof materialOptions)[number] | "";
  hasPhotos: (typeof materialOptions)[number] | "";
  hasCopy: (typeof materialOptions)[number] | "";
  inspiration: string;
  rebuild: (typeof rebuildOptions)[number] | "";
  existingNeeds: (typeof existingNeedOptions)[number][];
  existingNotes: string;
  languages: (typeof languageOptions)[number][];
  translations: (typeof translationOptions)[number] | "";
  timeline: string;
  integrations: (typeof integrationOptions)[number][];
  website: string;
};

export const emptyBriefDraft = (): BriefDraftValues => ({
  name: "",
  company: "",
  email: "",
  phone: "",
  currentWebsite: "",
  projectType: "",
  goals: [],
  goalDescription: "",
  pages: [],
  appFeatures: [],
  scopeExtra: [],
  scopeNotes: "",
  hasLogo: "",
  hasPhotos: "",
  hasCopy: "",
  inspiration: "",
  rebuild: "",
  existingNeeds: [],
  existingNotes: "",
  languages: [],
  translations: "",
  integrations: [],
  timeline: "",
  website: "",
});

export const briefStep1Schema = z.object({
  name: z.string().trim().min(2).max(80),
  email: z.string().trim().email(),
  projectType: z.enum(projectTypes),
});

export const briefStep2Schema = z.object({
  goals: z.array(z.enum(goalOptions)).min(1),
  goalDescription: z.string().trim().min(10).max(4000),
});

export function hasCurrentWebsite(values: Pick<BriefDraftValues, "currentWebsite">) {
  return Boolean(values.currentWebsite.trim());
}

export function draftToPayload(
  values: BriefDraftValues,
  extras: { locale?: (typeof locales)[number]; turnstileToken?: string },
) {
  return {
    name: values.name,
    company: values.company,
    email: values.email,
    phone: values.phone,
    currentWebsite: values.currentWebsite,
    projectType: values.projectType || undefined,
    goals: values.goals,
    goalDescription: values.goalDescription,
    pages: values.pages,
    appFeatures: values.appFeatures,
    scopeExtra: values.scopeExtra,
    scopeNotes: values.scopeNotes,
    hasLogo: values.hasLogo || undefined,
    hasPhotos: values.hasPhotos || undefined,
    hasCopy: values.hasCopy || undefined,
    inspiration: values.inspiration,
    rebuild: values.rebuild || undefined,
    existingNeeds: values.existingNeeds,
    existingNotes: values.existingNotes,
    languages: values.languages,
    translations: values.translations || undefined,
    integrations: values.integrations,
    timeline: values.timeline,
    website: values.website,
    locale: extras.locale,
    turnstileToken: extras.turnstileToken,
  };
}

export function isBriefDraftDirty(values: BriefDraftValues) {
  return (
    values.name.trim() !== "" ||
    values.company.trim() !== "" ||
    values.email.trim() !== "" ||
    values.phone.trim() !== "" ||
    values.currentWebsite.trim() !== "" ||
    values.projectType !== "" ||
    values.goals.length > 0 ||
    values.goalDescription.trim() !== "" ||
    values.pages.length > 0 ||
    values.appFeatures.length > 0 ||
    values.scopeExtra.length > 0 ||
    values.scopeNotes.trim() !== "" ||
    values.hasLogo !== "" ||
    values.hasPhotos !== "" ||
    values.hasCopy !== "" ||
    values.inspiration.trim() !== "" ||
    values.rebuild !== "" ||
    values.existingNeeds.length > 0 ||
    values.existingNotes.trim() !== "" ||
    values.languages.length > 0 ||
    values.translations !== "" ||
    values.integrations.length > 0 ||
    values.timeline.trim() !== ""
  );
}
