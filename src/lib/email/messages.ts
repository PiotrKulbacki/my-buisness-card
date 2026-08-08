import { routing, type Locale } from "@/i18n/routing";
import de from "../../../messages/de.json";
import en from "../../../messages/en.json";
import es from "../../../messages/es.json";
import pl from "../../../messages/pl.json";
import uk from "../../../messages/uk.json";

type EmailMessages = (typeof en)["email"];

const catalogs: Record<Locale, EmailMessages> = {
  en: en.email,
  pl: pl.email,
  de: de.email,
  es: es.email,
  uk: uk.email,
};

export function resolveLocale(locale?: string | null): Locale {
  if (locale && (routing.locales as readonly string[]).includes(locale)) {
    return locale as Locale;
  }
  return routing.defaultLocale;
}

export function getEmailMessages(locale?: string | null): EmailMessages {
  return catalogs[resolveLocale(locale)];
}

export function fillTemplate(template: string, vars: Record<string, string>): string {
  return Object.entries(vars).reduce(
    (acc, [key, value]) => acc.replaceAll(`{${key}}`, value),
    template,
  );
}
