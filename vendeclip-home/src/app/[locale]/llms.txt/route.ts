import { isLocale, locales } from '@/i18n/config';
import { guideResponse, llmGuide } from '@/lib/seo/llms';
export const dynamic = 'force-static';
export const dynamicParams = false;
export function generateStaticParams() { return locales.map(locale => ({locale})); }
export async function GET(_request: Request, {params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  if (!isLocale(locale)) return new Response('Not found', {status: 404});
  return guideResponse(await llmGuide(locale), locale);
}
