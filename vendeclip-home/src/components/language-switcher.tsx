'use client';
import { useLocale } from 'next-intl';
import { usePathname } from 'next/navigation';
import { locales, languageNames, isLocale } from '@/i18n/config';
import { useLocalizer } from '@/i18n/use-localizer';
import { Icon } from './icon';
export function LanguageSwitcher({ compact = false }: { compact?: boolean }) {
  const locale = useLocale();
  const pathname = usePathname();
  const localize = useLocalizer();
  return <label className={`language-switcher ${compact ? 'language-switcher-compact' : ''}`}>
    <Icon name="globe" />
    <span className="sr-only">{localize.text('Language')}</span>
    <select aria-label={localize.text('Language')} value={locale} onChange={event => {
      const parts = pathname.split('/').filter(Boolean);
      if (isLocale(parts[0] ?? '')) parts.shift();
      const destination = `/${event.target.value}${parts.length ? '/' + parts.join('/') : ''}${window.location.search}${window.location.hash}`;
      window.location.assign(destination);
    }}>
      {locales.map(code => <option key={code} value={code} lang={code}>{languageNames[code]}</option>)}
    </select>
  </label>;
}
