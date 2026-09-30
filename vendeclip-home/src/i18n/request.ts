import { getRequestConfig } from 'next-intl/server';
import { isLocale } from './config';
export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = requested && isLocale(requested) ? requested : 'en';
  const dictionary = (await import(`./messages/${locale}.json`)).default;
  // The copy map is consumed directly, allowing punctuation in source keys.
  return { locale, messages: { copy: Object.fromEntries(Object.entries(dictionary).map(([key, value]) => [encodeURIComponent(key).replace(/\./g, "%2E"), value])) }, timeZone: 'UTC' };
});
