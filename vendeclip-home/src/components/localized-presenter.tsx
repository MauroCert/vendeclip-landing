import { headers } from 'next/headers';
import { getLocale } from 'next-intl/server';
import { visitorCountry } from '@/lib/visitor-country';
import { presenterImage } from '@/lib/presenter-image';
import { PresenterWalkthrough } from './presenter-walkthrough';

export async function LocalizedPresenter() {
  const [requestHeaders, locale] = await Promise.all([headers(), getLocale()]);
  return <PresenterWalkthrough imageSrc={presenterImage(visitorCountry(requestHeaders), locale)} />;
}
