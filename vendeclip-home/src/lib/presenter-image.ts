import { isLocale, type Locale } from '@/i18n/config';

// Creative market variants, not a claim that one appearance represents a population.
const markets: Record<string, Locale> = {
  US: 'en', GB: 'en-gb', IE: 'en-gb',
  ES: 'es', AR: 'es', BO: 'es', CL: 'es', CO: 'es', CR: 'es', DO: 'es',
  EC: 'es', GT: 'es', HN: 'es', MX: 'es', NI: 'es', PA: 'es', PE: 'es',
  PY: 'es', SV: 'es', UY: 'es', VE: 'es',
  BR: 'pt', PT: 'pt', FR: 'fr', DE: 'de', AT: 'de', IT: 'it',
  NL: 'nl', PL: 'pl', TR: 'tr', JP: 'ja',
};

export function presenterImage(country: string | undefined, locale: string): string {
  const market = markets[country ?? ''] ?? (isLocale(locale) ? locale : 'en');
  return `/media/presenters/${market}.png`;
}
