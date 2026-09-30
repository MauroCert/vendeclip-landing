import SiteDocument, { metadata as sourceMetadata, viewport } from '@/components/site-document';
import { setRequestLocale } from 'next-intl/server';
import { locales, isLocale } from '@/i18n/config';
import { localizedMetadata } from '@/i18n/metadata';
import { notFound } from 'next/navigation';
export { viewport };
export const dynamicParams = false;
export function generateStaticParams() { return locales.map(locale => ({locale})); }
export async function generateMetadata({params}: {params: Promise<{locale?: string}>}) {
 const locale = (await params).locale ?? 'en'; setRequestLocale(locale);
 return localizedMetadata(sourceMetadata);
}
export default async function Layout({children, params}: {children: React.ReactNode; params: Promise<{locale?: string}>}) {
 const locale = (await params).locale ?? 'en';
 if (!isLocale(locale)) notFound();
 setRequestLocale(locale);
 return <SiteDocument locale={locale}>{children}</SiteDocument>;
}
