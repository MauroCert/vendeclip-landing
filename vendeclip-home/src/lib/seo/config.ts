import { locales, type Locale } from '@/i18n/config';

export const siteUrl = 'https://vendeclip.com';
// Vercel previews must never compete with the production domain in search.
export const isIndexable = process.env.VERCEL_ENV
  ? process.env.VERCEL_ENV === 'production'
  : process.env.NODE_ENV === 'production';
export const languageTag = (locale: string) => locale === 'en-gb' ? 'en-GB' : locale;
export const pageUrl = (locale: string, path = '') => `${siteUrl}/${locale}${path}`;
export function languageAlternates(path = '') {
  return Object.fromEntries([
    ...locales.map(locale => [languageTag(locale), pageUrl(locale, path)]),
    ['x-default', pageUrl('en', path)],
  ]);
}
export const ogLocales: Record<Locale, string> = {
  en: 'en_US', 'en-gb': 'en_GB', es: 'es_ES', pt: 'pt_BR', it: 'it_IT',
  fr: 'fr_FR', de: 'de_DE', nl: 'nl_NL', pl: 'pl_PL', tr: 'tr_TR', ja: 'ja_JP',
};
