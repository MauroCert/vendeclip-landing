export const locales = ['en', 'en-gb', 'es', 'pt', 'it', 'fr', 'de', 'nl', 'pl', 'tr', 'ja'] as const;
export type Locale = (typeof locales)[number];
export const languageNames: Record<Locale, string> = { en: 'English (US)', 'en-gb': 'English (UK)', es: 'Español', pt: 'Português', it: 'Italiano', fr: 'Français', de: 'Deutsch', nl: 'Nederlands', pl: 'Polski', tr: 'Türkçe', ja: '日本語' };
export const isLocale = (value: string): value is Locale => locales.includes(value as Locale);
export function localizedHref(href: string, locale: string) {
  if (href.startsWith('https://vendeclip.com/en/')) return href.replace('https://vendeclip.com/en/', `https://vendeclip.com/${locale}/`);
  if (!href.startsWith('/') || href.startsWith('//') || /^\/(?:_next|media|fonts|images|favicon)/.test(href)) return href;
  const first = href.split(/[/?#]/)[1];
  if (isLocale(first)) return href;
  return `/${locale}${href === '/' ? '' : href}`;
}
