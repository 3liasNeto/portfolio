import { htmlLang, type Locale } from "../../i18n";

// Dates are stored as YYYY-MM-DD; format them at noon UTC so no time zone shifts the day
const toDate = (date: string) => new Date(`${date}T12:00:00Z`);

export const formatDate = (date: string, lang: Locale) =>
  new Intl.DateTimeFormat(htmlLang[lang], {
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(toDate(date));

export const formatMonth = (date: string, lang: Locale) =>
  new Intl.DateTimeFormat(htmlLang[lang], { month: "long", year: "numeric", timeZone: "UTC" }).format(
    toDate(date),
  );
