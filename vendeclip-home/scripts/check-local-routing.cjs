/* eslint-disable @typescript-eslint/no-require-imports -- This Node regression script uses CommonJS. */
const assert = require('node:assert/strict');
const base = process.env.TEST_BASE_URL || 'http://localhost:3000';
async function redirect(path, language, expected, cookie, country) {
  const response = await fetch(base + path, { redirect: 'manual', headers: { 'accept-language': language, ...(cookie ? {cookie} : {}), ...(country ? {'x-vercel-ip-country': country} : {}) } });
  assert.equal(response.status, 307, path);
  assert.equal(new URL(response.headers.get('location'), base).pathname + new URL(response.headers.get('location'), base).search, expected);
  assert.match(response.headers.get('cache-control'), /no-store/);
}
async function main() {
  const locales = ['en','en-gb','es','pt','it','fr','de','nl','pl','tr','ja'];
  for (const locale of locales) await redirect('/', locale, `/${locale}`);
  await redirect('/pricing?campaign=local', 'es-AR,es;q=0.9,en;q=0.8', '/es/pricing?campaign=local');
  await redirect('/product/presenter', 'pt-BR,en;q=0.5', '/pt/product/presenter');
  await redirect('/', 'es;q=0.4,ja-JP;q=0.9', '/ja');
  await redirect('/', 'ja;q=0,en;q=0.5', '/en');
  await redirect('/', 'zh-CN,ko;q=0.8', '/en');
  await redirect('/', 'ja', '/fr', 'vendeclip-language=fr');
  await redirect('/', 'ja', '/ja', 'vendeclip-language=invalid');
  for (const [country, locale] of [['US','en'],['GB','en-gb'],['AR','es'],['BR','pt'],['IT','it'],['FR','fr'],['DE','de'],['NL','nl'],['PL','pl'],['TR','tr'],['JP','ja']]) {
    await redirect('/?campaign=country', 'en-US,en;q=0.9', `/${locale}?campaign=country`, undefined, country);
  }
  await redirect('/', 'en', '/fr', 'vendeclip-language=fr', 'IT');
  await redirect('/', 'en', '/it', 'vendeclip-language=invalid', 'IT');
  await redirect('/', 'ja', '/ja', undefined, 'ZZ');
  const explicit = await fetch(base + '/fr', { redirect: 'manual', headers: { 'accept-language': 'ja', 'x-vercel-ip-country': 'IT', cookie: 'vendeclip-language=es' } });
  assert.equal(explicit.status, 200);
  assert.ok((await explicit.text()).includes('lang="fr"'));
  for (const locale of locales) {
    const home = await fetch(`${base}/${locale}`, {headers: {'x-vercel-ip-country': 'IT'}});
    assert.equal(home.status, 200);
    const homeHtml = await home.text();
    const dictionary = require(`../src/i18n/messages/${locale}.json`);
    // Check actual markup, excluding the serialized React payload.
    const markup = homeHtml.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '');
    for (const source of ['VendeClip in numbers', 'More stories. More possibilities.', 'videos created', 'real estate brokers using VendeClip', 'Where our customers work']) {
      assert.ok(markup.includes(dictionary[source]), `${locale}: landing translation missing for ${source}`);
    }
    assert.ok(markup.includes(`href="/${locale}/sign-up"`));
    assert.ok(markup.includes('id="how-it-works"'));
    assert.ok(markup.includes('id="features"'));
    assert.ok(markup.includes('id="faq"'));
    const response = await fetch(`${base}/${locale}/pricing`, {headers: {'x-vercel-ip-country': 'FR'}});
    assert.equal(response.status,200);
    const html = await response.text();
    assert.ok(html.includes(`lang="${locale === 'en-gb' ? 'en-GB' : locale}"`));
    assert.ok(!html.includes('id="pricing-country"'));
    assert.ok(html.includes(`href="/${locale}/sign-up"`));
  }
  for (const [country,currency] of [['FR','EUR'],['BR','BRL'],['JP','JPY'],['GB','GBP'],['AR','USD'],['DK','DKK'],['ZA','ZAR'],['TR','TRY'],['SG','SGD']]) {
    const html = await (await fetch(base + '/es/pricing?country=FR', {headers: {'x-vercel-ip-country': country}})).text();
    assert.ok(html.includes(`· <!-- -->${currency}`),`${country}: expected ${currency}`);
  }
  const fallback = await (await fetch(base + '/fr/pricing?country=JP')).text();
  assert.ok(fallback.includes('· <!-- -->USD'));
  const image = await fetch(base + '/media/people/jp.webp', { redirect: 'manual', headers: {'accept-language':'fr'} });
  assert.equal(image.status, 200);
  assert.match(image.headers.get('content-type'), /image/);
  console.log('Passed automatic language routing, explicit links, language preference, regional prices, asset bypass, and all 11 shared landing/pricing locales.');
}
main().catch(error => { console.error(error); process.exit(1); });
