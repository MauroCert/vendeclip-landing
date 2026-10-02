import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
const base = process.env.TEST_BASE_URL || 'http://localhost:3000';
const locales = ['en','en-gb','es','pt','it','fr','de','nl','pl','tr','ja'];
const bots = ['OAI-SearchBot','Claude-SearchBot','PerplexityBot'];
const root = await fetch(`${base}/llms.txt`, {redirect:'manual',headers:{'accept-language':'ja','x-vercel-ip-country':'IT'}});
assert.equal(root.status,200);
const index = await root.text();
assert.ok(index.startsWith('# VendeClip\n\n> '));
const full = await (await fetch(`${base}/llms-full.txt`)).text();
assert.ok(full.length > index.length);
for(const locale of locales) {
  const response = await fetch(`${base}/${locale}/llms.txt`, {redirect:'manual',headers:{cookie:'vendeclip-language=fr'}});
  assert.equal(response.status,200);
  assert.match(response.headers.get('content-type'),/text\/plain; charset=utf-8/);
  assert.equal(response.headers.get('content-language'),locale==='en-gb'?'en-GB':locale);
  const body = await response.text();
  assert.ok(body.startsWith('# VendeClip'));
  assert.ok(body.includes(`https://vendeclip.com/${locale}/product/ai-video`));
  assert.ok(index.includes(`https://vendeclip.com/${locale}/llms.txt`));
  const dictionary = JSON.parse(await readFile(`src/i18n/messages/${locale}.json`,'utf8'));
  assert.ok(body.includes(dictionary['AI video']));
  assert.ok(!/<html|<script/.test(body));
}
const htmlByBot = [];
for(const bot of bots) {
  const response = await fetch(`${base}/it`,{headers:{'user-agent':bot,'x-vercel-ip-country':'US'}});
  assert.equal(response.status,200);
  const html = await response.text();
  assert.ok(response.headers.get('link')?.includes('rel="describedby"'));
  assert.ok(response.headers.get('link')?.includes('https://vendeclip.com/it/llms.txt'));
  const schema = JSON.parse(html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1]);
  const application = schema['@graph'].find(node => node['@type']==='WebApplication');
  assert.equal(application.name,'VendeClip');
  assert.equal(application.featureList.length,10);
  htmlByBot.push(html.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/)[1]);
}
assert.equal(new Set(htmlByBot).size,1,'Bots should receive the same visible content');
const invalid = await fetch(`${base}/xx/llms.txt`,{redirect:'manual'});
assert.equal(invalid.status,404);
console.log('AI discovery checks passed: root/extended guides, all 11 translations, invalid locale handling, discovery links, application schema and identical content for 3 search crawlers.');
