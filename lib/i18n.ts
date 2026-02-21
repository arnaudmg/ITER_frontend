export const locales = ["fr", "en", "es"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "fr";

export function getLocaleFromPath(pathname: string): Locale {
  const seg = pathname.split("/")[1];
  if (seg === "en" || seg === "es") return seg;
  return "fr";
}

export function getLocalePath(locale: Locale, path: string): string {
  if (locale === "fr") return path;
  return `/${locale}${path}`;
}

export function getAlternateUrls(path: string): Record<Locale, string> {
  const base = "https://www.iteradvisors.com";
  return {
    fr: `${base}${path}`,
    en: `${base}/en${path === "/" ? "/" : path}`,
    es: `${base}/es${path === "/" ? "/" : path}`,
  };
}
