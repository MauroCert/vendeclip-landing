import type { MetadataRoute } from 'next';
import { locales } from '@/i18n/config';
import { products } from '@/lib/product-pages';
import { resources } from '@/lib/resources';
import { languageAlternates, pageUrl, siteUrl } from '@/lib/seo/config';
export default function sitemap(): MetadataRoute.Sitemap {
  const pages = [
    {path: '', images: ['/media/lake-house.webp', '/media/ai-motion-reel-poster.jpg', '/media/magazine-poster.jpg']},
    ...['/product', '/pricing', '/examples', '/how-it-works', '/integrations', '/resources', '/privacy', '/terms', '/support'].map(path => ({path, images: [] as string[]})),
    ...products.map(product => ({path: `/product/${product.slug}`, images: [product.image]})),
    ...resources.map(resource => ({path: `/resources/${resource.slug}`, images: [resource.image]})),
  ];
  return pages.flatMap(({path, images}) => locales.map(locale => ({
    url: pageUrl(locale, path),
    alternates: { languages: languageAlternates(path) },
    ...(images.length ? { images: images.map(image => `${siteUrl}${image}`) } : {}),
  })));
}
