import { locales, languageNames, type Locale } from '@/i18n/config';
import { createLocalizer } from '@/i18n/localize';
import { products } from '@/lib/product-pages';
import { resources } from '@/lib/resources';
import { homeSeo } from './home-copy';
import { isIndexable, languageTag, pageUrl, siteUrl } from './config';

// Plain-text guides reuse the same product data and translations as the HTML pages.
// They are summaries, not separate marketing pages or bot-specific HTML.
export async function llmGuide(locale: Locale, full = false) {
  const dictionary = (await import(`@/i18n/messages/${locale}.json`)).default;
  const encoded = Object.fromEntries(Object.entries(dictionary).map(([key, value]) => [encodeURIComponent(key), value])) as Record<string, string>;
  const t = createLocalizer(encoded, locale).text;
  const link = (label: string, path: string) => `[${t(label)}](${pageUrl(locale, path)})`;
  const lines = [
    '# VendeClip', '', `> ${homeSeo[locale].description}`, '',
    `${languageNames[locale]} · ${languageTag(locale)}`, '',
    `${link('VendeClip home', '')}`, '',
    `## ${t('Explore VendeClip')}`, '',
    ...[
      ['Product', '/product'], ['Pricing', '/pricing'], ['How it works', '/how-it-works'],
      ['Video examples', '/examples'], ['Integrations', '/integrations'],
      ['Resources', '/resources'], ['Support', '/support'], ['Privacy', '/privacy'], ['Terms', '/terms'],
    ].map(([label, path]) => `- ${link(label, path)}`), '',
    `## ${t('Product')}`, '',
    ...products.flatMap(product => [
      `- ${link(product.name, `/product/${product.slug}`)}: ${t(product.description)}`,
      ...(full ? ['', ...product.benefits.map(([title, detail]) => `  - ${t(title)}: ${t(detail)}`), '', `  **${t(product.question)}** ${t(product.answer)}`, ''] : []),
    ]), '',
    `## ${t('Resources')}`, '',
    ...resources.flatMap(resource => [
      `- ${link(resource.title, `/resources/${resource.slug}`)}: ${t(resource.intro)}`,
      ...(full ? ['', ...resource.sections.map(([title, detail]) => `  - ${t(title)}: ${t(detail)}`), ''] : []),
    ]), '',
    `## ${t('Language')}`, '',
    ...locales.map(code => `- [${languageNames[code]}](${pageUrl(code)}): [llms.txt](${pageUrl(code, '/llms.txt')})`), '',
    '## Site index', '',
    `- [Sitemap](${siteUrl}/sitemap.xml)`,
    `- [Extended English product and resource guide](${siteUrl}/llms-full.txt)`, '',
  ];
  return lines.join('\n');
}

export function guideResponse(text: string, locale: Locale) {
  return new Response(text, {headers: {
    'Content-Type': 'text/plain; charset=utf-8',
    'Content-Language': languageTag(locale),
    'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    // Keep these supporting representations out of ordinary search results.
    'X-Robots-Tag': 'noindex, follow',
    Link: `<${pageUrl(locale)}>; rel="canonical", <${siteUrl}/llms.txt>; rel="describedby"`,
    ...(!isIndexable ? {'Cache-Control': 'private, no-store'} : {}),
  }});
}
