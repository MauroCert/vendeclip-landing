/** Vercel supplies this header in production; the override is local development only. */
export function visitorCountry(requestHeaders: { get(name: string): string | null }): string | undefined {
  const detected = requestHeaders.get('x-vercel-ip-country')?.trim().toUpperCase();
  if (detected && /^[A-Z]{2}$/.test(detected)) return detected;
  const preview = process.env.NODE_ENV === 'development'
    ? (process.env.DEV_VISITOR_COUNTRY || process.env.DEV_PRICING_COUNTRY)?.trim().toUpperCase()
    : undefined;
  return preview && /^[A-Z]{2}$/.test(preview) ? preview : undefined;
}
