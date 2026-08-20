/** Ordered AGB section keys — copy lives in messages/{locale}.json under agb.sections. */
export const AGB_SECTION_KEYS = [
  "scope",
  "clients",
  "conclusion",
  "offers",
  "services",
  "clientDuties",
  "materials",
  "changes",
  "revisions",
  "extras",
  "fees",
  "payments",
  "acceptance",
  "ip",
  "thirdParties",
  "contentLiability",
  "liability",
  "withdrawal",
  "final",
] as const;

export type AgbSectionKey = (typeof AGB_SECTION_KEYS)[number];
