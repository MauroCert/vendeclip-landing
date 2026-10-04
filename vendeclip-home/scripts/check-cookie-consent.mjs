import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';

// Exercise the real browser helpers with cookie/storage semantics and a fixed clock.
const now = 1_800_000_000_000;
const jar = new Map();
const writes = [];
const events = [];
const storage = () => ({setItem(key, value) {this[key] = value;}, removeItem(key) {delete this[key];}});
const context = {
  exports: {},
  location: {protocol: 'https:', hostname: 'vendeclip.com'},
  navigator: {globalPrivacyControl: false},
  document: {
    get cookie() {return [...jar].map(([key, value]) => `${key}=${value}`).join('; ');},
    set cookie(value) {
      writes.push(value);
      const [pair] = value.split(';');
      const i = pair.indexOf('=');
      const key = pair.slice(0, i);
      if (value.includes('Max-Age=0')) jar.delete(key);
      else jar.set(key, pair.slice(i + 1));
    },
  },
  localStorage: storage(), sessionStorage: storage(),
  window: {dispatchEvent(event) {events.push(event);}},
  CustomEvent: class {constructor(type, options) {this.type = type; this.detail = options.detail;}},
  Date: class extends Date {static now() {return now;}},
};
const source = readFileSync(new URL('../src/lib/cookie-consent.ts', import.meta.url), 'utf8');
vm.runInNewContext(ts.transpileModule(source, {compilerOptions: {module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020}}).outputText, context);
const consent = context.exports;
assert.equal(consent.analyticsAllowed(), false);
assert.equal(consent.adsAllowed(), false);
jar.set('vc_cookie_consent', 'unexpected');
assert.equal(consent.analyticsAllowed(), false);
consent.saveConsent(true, false);
assert.equal(consent.analyticsAllowed(), true);
assert.equal(consent.adsAllowed(), false);
assert.ok(writes.some(value => value.includes('Max-Age=15552000; SameSite=Lax; Secure')));
consent.saveConsent(false, true);
assert.equal(consent.analyticsAllowed(), false);
assert.equal(consent.adsAllowed(), true);
for (const value of [`1.${now + 1}`, `1.${now - 15_552_000_000}`, '1.bad', '1']) {
  jar.set('vc_ads_consent_v1', value);
  assert.equal(consent.adsAllowed(), false, `Invalid ad consent accepted: ${value}`);
}
jar.set('vc_cookie_consent', '1');
jar.set('vc_ads_consent_v1', `1.${now}`);
context.navigator.globalPrivacyControl = true;
assert.equal(consent.analyticsAllowed(), false);
assert.equal(consent.adsAllowed(), false);
consent.saveConsent(true, true);
assert.equal(jar.get('vc_cookie_consent'), '0');
assert.equal(jar.get('vc_ads_consent_v1'), '0');
context.navigator.globalPrivacyControl = false;
jar.set('vendeclip-language', 'es');
jar.set('session', 'necessary');
for (const key of ['ph_test', '_gcl_aw', 'vc_acquisition']) jar.set(key, 'optional');
context.localStorage.setItem('ph_test', 'optional');
context.sessionStorage.setItem('vc_ads_pending_checkout', 'optional');
consent.saveConsent(false, false);
assert.equal(jar.get('vendeclip-language'), 'es');
assert.equal(jar.get('session'), 'necessary');
for (const key of ['ph_test', '_gcl_aw', 'vc_acquisition']) assert.equal(jar.has(key), false);
assert.equal(context.localStorage.ph_test, undefined);
assert.equal(context.sessionStorage.vc_ads_pending_checkout, undefined);
assert.equal(events.at(-1).type, 'vendeclip:analytics-consent-changed');
assert.equal(events.at(-1).detail.choice, 'declined');
assert.equal(events.at(-1).detail.advertising, false);
console.log('Cookie consent verified: defaults, legacy values, independent choices, expiry, GPC, withdrawal, secure persistence and integration events.');
