import { isLocale, type Locale } from './config';

/** Match supported browser languages in quality order, including regional variants. */
export function detectLocale(acceptLanguage: string | null, preference?: string, country?: string): Locale {
  if (preference && isLocale(preference)) return preference;
  const languages = (acceptLanguage ?? '').split(',').map((entry, index) => {
    const [tag, ...parameters] = entry.trim().toLowerCase().split(';');
    const quality = parameters.find(parameter => parameter.trim().startsWith('q='));
    const q = quality ? Number(quality.trim().slice(2)) : 1;
    return { tag, q, index };
  }).filter(item => Number.isFinite(item.q) && item.q > 0 && item.q <= 1)
    .sort((a, b) => b.q - a.q || a.index - b.index);
  for (const { tag } of languages) {
    if (isLocale(tag)) return tag;
    const base = tag.split('-')[0];
    if (isLocale(base)) return base;
  }
  return countryLocales[country ?? ''] ?? 'en';
}

// Used only when neither saved preference nor browser languages are supported.
const countryLocales: Record<string, Locale> = {
  US: 'en', GB: 'en-gb', IE: 'en-gb', AU: 'en-gb', NZ: 'en-gb',
  AR: 'es', BO: 'es', CL: 'es', CO: 'es', CR: 'es', DO: 'es', EC: 'es',
  ES: 'es', GT: 'es', HN: 'es', MX: 'es', NI: 'es', PA: 'es', PE: 'es',
  PY: 'es', SV: 'es', UY: 'es', VE: 'es', BR: 'pt', PT: 'pt',
  FR: 'fr', DE: 'de', AT: 'de', IT: 'it', NL: 'nl', PL: 'pl', TR: 'tr', JP: 'ja',
};
