const fs = require('fs');
const assert = require('assert/strict');
const locales=['en','en-gb','es','pt','it','fr','de','nl','pl','tr','ja'];
const source=JSON.parse(fs.readFileSync('src/i18n/messages/en.json'));
const placeholders=s=>(s.match(/\{\d+\}/g)||[]).sort();
let messages=0;
for(const locale of locales){
 const dictionary=JSON.parse(fs.readFileSync(`src/i18n/messages/${locale}.json`));
 for(const key of Object.keys(source)){
  assert.equal(typeof dictionary[key],'string',`${locale}: missing ${key}`);
  assert.ok(dictionary[key].trim(),`${locale}: empty ${key}`);
  assert.deepEqual(placeholders(dictionary[key]),placeholders(key),`${locale}: broken placeholders ${key}`);
  assert.ok(!/ZXQ|QXZ|▁/i.test(dictionary[key]),`${locale}: corrupt model output ${key}`);
  messages++;
 }
 const home=fs.readFileSync(`out/${locale}.html`,'utf8');
 assert.ok(home.includes(`lang="${locale==='en-gb'?'en-GB':locale}"`),`${locale}: document language`);
 const pricing=fs.readFileSync(`out/${locale}/pricing.html`,'utf8');
 assert.ok(pricing.includes(`href="/${locale}/sign-up"`),`${locale}: signup link`);
 assert.ok(pricing.includes(`href="/${locale}/product/templates"`),`${locale}: template link`);
 for(const route of ['examples','how-it-works','integrations','pricing','privacy','product','resources','sign-in','sign-up','forgot-password','terms'])assert.ok(fs.existsSync(`out/${locale}/${route}.html`),`${locale}: missing ${route}`);
}
console.log(`Verified ${locales.length} locale dictionaries (${messages} messages), document languages, page exports, and navigation links.`);
