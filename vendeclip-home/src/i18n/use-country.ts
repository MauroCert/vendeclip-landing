'use client';
import { useSyncExternalStore } from 'react';
import { pricingCountries } from '@/lib/regional-pricing';
const storageKey = 'vendeclip-pricing-country';
const changed = 'vendeclip-country-changed';
function readCountry() {
  const requested = new URLSearchParams(window.location.search).get('country');
  let saved: string | null = null;
  try { saved = localStorage.getItem(storageKey); } catch { /* Storage is optional. */ }
  return [requested, saved].find(value => value && pricingCountries.includes(value)) ?? '';
}
function subscribe(listener: () => void) {
  window.addEventListener(changed, listener);
  window.addEventListener('storage', listener);
  window.addEventListener('popstate', listener);
  return () => {
    window.removeEventListener(changed, listener);
    window.removeEventListener('storage', listener);
    window.removeEventListener('popstate', listener);
  };
}
function chooseCountry(country: string) {
  if (!pricingCountries.includes(country)) return;
  try { localStorage.setItem(storageKey, country); } catch { /* Storage is optional. */ }
  const url = new URL(window.location.href);
  url.searchParams.set('country', country);
  window.history.replaceState(null, '', url);
  window.dispatchEvent(new Event(changed));
}
export function useCountry() {
  const country = useSyncExternalStore(subscribe, readCountry, () => '');
  return [country, chooseCountry] as const;
}
