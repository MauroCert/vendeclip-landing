import { getLocale, getMessages } from 'next-intl/server';
import { createLocalizer, type Dictionary } from './localize';
export async function getLocalizer() {
  const [locale, messages] = await Promise.all([getLocale(), getMessages()]);
  return createLocalizer(messages.copy as unknown as Dictionary, locale);
}
