import { useLocale, useMessages } from 'next-intl';
import { createLocalizer, type Dictionary } from './localize';
export function useLocalizer() {
  const messages = useMessages();
  const locale = useLocale();
  return createLocalizer(messages.copy as unknown as Dictionary, locale);
}
