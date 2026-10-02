import assert from 'node:assert/strict';
const base = process.env.TEST_BASE_URL || 'http://localhost:3000';
const production = process.env.TEST_INDEXABLE === 'true';
const origin = 'https://vendeclip.com';
const locales = ['en','en-gb','es','pt','it','fr','de','nl','pl','tr','ja'];
const xmlResponse = await fetch(`${base}/sitemap.xml`);
assert.equal(xmlResponse.status, 200);
const xml = await xmlResponse.text();
assert.ok(xml.includes('xmlns:xhtml='));
assert.ok(xml.includes('xmlns:image='));
const urls = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map(match => match[1]);
assert.equal(new Set(urls).size, urls.length, 'Duplicate sitemap URLs');
assert.ok(urls.every(url => url.startsWith(origin + '/')));
assert.ok(!urls.some(url => /sign-in|sign-up|forgot-password/.test(url)));
const entries = [...xml.matchAll(/<url>([\s\S]*?)<\/url>/g)].map(match => match[1]);
for (const entry of entries) {
  const url = entry.match(/<loc>(.*?)<\/loc>/)[1];
  assert.ok(entry.includes(`href="${url}"`), 'Missing self alternate');
  assert.equal((entry.match(/<xhtml:link/g) || []).length, 12);
}
const robots = await (await fetch(`${base}/robots.txt`)).text();
assert.ok(robots.includes(`${origin}/sitemap.xml`));
assert.match(robots, production ? /Allow: \// : /Disallow: \//);
const routes = [
  ...locales.map(locale => `/${locale}`),
  ...urls.filter(url => url.startsWith(`${origin}/it/`)).map(url => url.slice(origin.length)),
  '/it/sign-in', '/it/sign-up', '/it/forgot-password',
];
let cursor = 0;
await Promise.all(Array.from({length: 4}, async () => {
  while (cursor < routes.length) {
    const path = routes[cursor++];
    const response = await fetch(base + path, {headers: {'User-Agent': 'Googlebot'}});
    assert.equal(response.status, 200, path);
    const html = await response.text();
    assert.ok(html.includes(`<link rel="canonical" href="${origin}${path}"`), `${path}: canonical`);
    assert.equal((html.match(/hreflang="/gi) || []).length, 12, `${path}: alternates`);
    assert.ok(/<title>[^<]+<\/title>/.test(html), `${path}: title`);
    assert.ok(/name="description" content="[^"]+"/.test(html), `${path}: description`);
    assert.ok(html.includes('name="twitter:card" content="summary_large_image"'));
    const auth = /sign-in|sign-up|forgot-password/.test(path);
    assert.ok(html.includes(`name="robots" content="${production && !auth ? 'index' : 'noindex'}, follow"`), `${path}: robots`);
    if (locales.some(locale => path === `/${locale}`)) {
      assert.equal((html.match(/<h1\b/g) || []).length, 1, `${path}: H1`);
      const json = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
      assert.ok(json, `${path}: structured data`);
      assert.equal(JSON.parse(json[1])['@graph'][2].url, origin + path);
      assert.ok(/srcset=/i.test(html), `${path}: responsive images`);
    }
  }
}));
const image = await fetch(`${base}/api/og`);
assert.equal(image.status, 200);
assert.match(image.headers.get('content-type'), /image\/png/);
const bytes = Buffer.from(await image.arrayBuffer());
assert.equal(bytes.readUInt32BE(16), 1200);
assert.equal(bytes.readUInt32BE(20), 630);
const optimized = await fetch(`${base}/_next/image?url=%2Fbrand%2Fvendeclip-logo.png&w=384&q=75`, {headers:{Accept:'image/webp'}});
assert.equal(optimized.status, 200);
assert.match(optimized.headers.get('content-type'), /image\/webp/);
console.log(`SEO checks passed: ${urls.length} sitemap URLs, ${routes.length} rendered routes, 11 locales, canonical/hreflang, robots, JSON-LD, social image and responsive image optimization.`);
