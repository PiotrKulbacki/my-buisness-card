import type { ZodError } from "zod";

type Translate = {
  (key: string): string;
  has: (key: string) => boolean;
};

export function validationMessageKey(error: ZodError): string {
  const issue = error.issues[0];
  if (!issue) return "validationError";
  const field = String(issue.path[0] ?? "");
  if (issue.code === "too_small") {
    if ("origin" in issue && issue.origin === "array") return `${field}Select`;
    return `${field}Min`;
  }
  if (issue.code === "too_big") return `${field}Max`;
  if (issue.code === "invalid_format") return `${field}Invalid`;
  if (issue.code === "invalid_value" || issue.code === "invalid_type") return `${field}Select`;
  return "validationError";
}

export function resolveValidationMessage(error: ZodError, t: Translate): string {
  const key = `validation.${validationMessageKey(error)}`;
  return t.has(key) ? t(key) : t("validationError");
}
