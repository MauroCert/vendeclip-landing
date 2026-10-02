import { NextRequest, NextResponse } from 'next/server';
import { isLocale } from './i18n/config';
import { visitorCountry } from './lib/visitor-country';
import { detectLocale } from './i18n/detect-locale';
import { siteUrl } from './lib/seo/config';

export function proxy(request: NextRequest) {
  const first = request.nextUrl.pathname.split('/')[1];
  // An explicit locale URL always wins, including links shared with another visitor.
  if (isLocale(first)) {
    const response = NextResponse.next();
    response.headers.append('Link', `<${siteUrl}/${first}/llms.txt>; rel="describedby"; type="text/plain"`);
    return response;
  }
  const locale = detectLocale(request.headers.get('accept-language'), request.cookies.get('vendeclip-language')?.value, visitorCountry(request.headers));
  const destination = request.nextUrl.clone();
  destination.pathname = `/${locale}${destination.pathname === '/' ? '' : destination.pathname}`;
  const response = NextResponse.redirect(destination, 307);
  response.headers.set('Vary', 'Accept-Language, Cookie, X-Vercel-IP-Country');
  response.headers.set('Cache-Control', 'private, no-store');
  return response;
}

export const config = {
  matcher: ['/((?!api(?:/|$)|_next(?:/|$)|media(?:/|$)|fonts(?:/|$)|images(?:/|$)|brand(?:/|$)|.*\\..*).*)'],
};
