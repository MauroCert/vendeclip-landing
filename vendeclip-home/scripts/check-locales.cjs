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

}
console.log(`Verified ${locales.length} locale dictionaries (${messages} messages).`);
