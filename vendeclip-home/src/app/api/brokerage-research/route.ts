import { readFile } from 'node:fs/promises';
import path from 'node:path';

// Local research review only. Never expose an unconfirmed customer catalog in production.
export async function GET() {
  if (process.env.NODE_ENV !== 'development') return new Response(null, { status: 404 });
  const html = await readFile(path.join(process.cwd(), '../outputs/brokerage-research/gallery.html'), 'utf8');
  return new Response(html, { headers: {
    'Content-Type': 'text/html; charset=utf-8',
    'Cache-Control': 'private, no-store',
    'X-Robots-Tag': 'noindex, nofollow',
    'Content-Security-Policy': "default-src 'none'; img-src data:; style-src 'unsafe-inline'; script-src 'unsafe-inline'; base-uri 'none'; frame-ancestors 'none'",
  } });
}
