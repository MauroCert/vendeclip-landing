// Keep the public site's cookie names, values, lifetime and integration events.
export const CONSENT_COOKIE = "vc_cookie_consent";
export const ADS_COOKIE = "vc_ads_consent_v1";
export const CONSENT_MAX_AGE = 60 * 60 * 24 * 180;
export const CONSENT_EVENT = "vendeclip:analytics-consent-changed";
export const SETTINGS_EVENT = "vendeclip:open-cookie-settings";

export function readCookie(name: string) {
  if (typeof document === "undefined") return null;
  const entry = document.cookie.split(";").map(value => value.trim()).find(value => value.startsWith(`${name}=`));
  return entry?.slice(name.length + 1) ?? null;
}

export function hasPrivacySignal() {
  return typeof navigator !== "undefined" && (navigator as Navigator & {globalPrivacyControl?: boolean}).globalPrivacyControl === true;
}

export function analyticsAllowed() {
  return !hasPrivacySignal() && readCookie(CONSENT_COOKIE) === "1";
}

export function adsAllowed(now = Date.now()) {
  const value = readCookie(ADS_COOKIE);
  if (hasPrivacySignal() || !value || !/^1\.\d{10,13}$/.test(value)) return false;
  const timestamp = Number(value.slice(2));
  return timestamp > 0 && timestamp <= now && now - timestamp < CONSENT_MAX_AGE * 1000;
}

export function saveConsent(analytics: boolean, advertising: boolean) {
  const blocked = hasPrivacySignal();
  analytics = analytics && !blocked;
  advertising = advertising && !blocked;
  const suffix = `; Path=/; Max-Age=${CONSENT_MAX_AGE}; SameSite=Lax${location.protocol === "https:" ? "; Secure" : ""}`;
  const previousAds = adsAllowed() ? readCookie(ADS_COOKIE) : null;
  document.cookie = `${CONSENT_COOKIE}=${analytics ? "1" : "0"}${suffix}`;
  document.cookie = `${ADS_COOKIE}=${advertising ? previousAds ?? `1.${Date.now()}` : "0"}${suffix}`;
  // Remove optional identifiers on withdrawal, without touching language or session cookies.
  const optional = (key: string) => (!analytics && (key.startsWith("ph_") || key === "vc_acquisition")) || (!advertising && (key.startsWith("_gcl_") || key.startsWith("vc_ads_")));
  for (const entry of document.cookie.split(";")) {
    const key = entry.trim().split("=")[0];
    if (key === ADS_COOKIE || !optional(key)) continue;
    const host = location.hostname.split(".");
    const domains = ["", ...host.map((_, i) => `; Domain=${host.slice(i).join(".")}`)];
    for (const domain of domains) document.cookie = `${key}=; Path=/; Max-Age=0; SameSite=Lax${domain}`;
  }
  try {
    for (const storage of [localStorage, sessionStorage]) {
      for (const key of Object.keys(storage)) if (optional(key)) storage.removeItem(key);
    }
  } catch { /* Storage can be unavailable in private or restricted browsers. */ }
  window.dispatchEvent(new CustomEvent(CONSENT_EVENT, {detail: {choice: analytics ? "accepted" : "declined", analytics, advertising}}));
}

export function openCookieSettings() {
  window.dispatchEvent(new Event(SETTINGS_EVENT));
}
