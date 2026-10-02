import { getLocale } from 'next-intl/server';
import { getLocalizer } from '@/i18n/server';
import { products } from '@/lib/product-pages';
import { isLocale } from '@/i18n/config';
import { homeSeo } from '@/lib/seo/home-copy';
import { languageTag, pageUrl, siteUrl } from '@/lib/seo/config';
export async function HomeStructuredData() {
  const requested = await getLocale();
  const locale = isLocale(requested) ? requested : 'en';
  const url = pageUrl(locale);
  const localize = await getLocalizer();
  const graph = {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'Organization', '@id': `${siteUrl}/#organization`, name: 'VendeClip', url: siteUrl,
        logo: { '@type': 'ImageObject', url: `${siteUrl}/brand/vendeclip-logo.png` },
        sameAs: ['https://instagram.com/vendeclip', 'https://www.linkedin.com/company/vendeclip/'] },
      { '@type': 'WebSite', '@id': `${siteUrl}/#website`, name: 'VendeClip', url: siteUrl, publisher: { '@id': `${siteUrl}/#organization` } },
      { '@type': 'WebPage', '@id': `${url}#webpage`, url, name: homeSeo[locale].title, description: homeSeo[locale].description,
        mainEntity: { '@id': `${siteUrl}/#application` },
        inLanguage: languageTag(locale), isPartOf: { '@id': `${siteUrl}/#website` }, about: { '@id': `${siteUrl}/#organization` },
        primaryImageOfPage: { '@type': 'ImageObject', url: `${siteUrl}/media/lake-house.webp` } },
      { '@type': 'WebApplication', '@id': `${siteUrl}/#application`, name: 'VendeClip', url: siteUrl,
        applicationCategory: 'MultimediaApplication', operatingSystem: 'Web',
        description: homeSeo[locale].description,
        featureList: products.map(product => localize.text(product.name)),
        publisher: { '@id': `${siteUrl}/#organization` } },
    ],
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(graph).replace(/</g, '\\u003c')}} />;
}
