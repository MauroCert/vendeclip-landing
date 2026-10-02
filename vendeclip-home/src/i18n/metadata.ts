import type { Metadata } from 'next';
import { getLocalizer } from './server';
import { isLocale } from './config';
import { homeSeo } from '@/lib/seo/home-copy';
import { isIndexable, languageAlternates, ogLocales, pageUrl, siteUrl } from '@/lib/seo/config';

export async function localizedMetadata(source: Metadata, path?: string): Promise<Metadata> {
  const localize = await getLocalizer();
  const locale = isLocale(localize.locale) ? localize.locale : 'en';
  const fallback = homeSeo[locale];
  const title = typeof source.title === 'string' ? localize.text(source.title) : fallback.title;
  const description = source.description ? localize.text(source.description) : fallback.description;
  const index = isIndexable && !/^\/(sign-in|sign-up|forgot-password)(?:\/|$)/.test(path ?? '');
  const url = pageUrl(locale, path);
  const image = { url: `${siteUrl}/api/og`, width: 1200, height: 630, alt: fallback.title };
  return {
    ...source,
    metadataBase: new URL(siteUrl), title, description,
    applicationName: 'VendeClip',
    ...(path !== undefined ? { alternates: { canonical: url, languages: languageAlternates(path) } } : {}),
    robots: { index, follow: true, ...(index ? { googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1 } } : {}) },
    openGraph: { type: 'website', siteName: 'VendeClip', title, description, url, locale: ogLocales[locale], alternateLocale: Object.values(ogLocales).filter(value => value !== ogLocales[locale]), images: [image] },
    twitter: { card: 'summary_large_image', title, description, images: [image] },
  };
}
