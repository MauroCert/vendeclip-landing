"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { useLocale } from "next-intl";
import Link from "next/link";
import { localizedHref, type Locale } from "@/i18n/config";
import copy from "@/i18n/cookie-copy.json";
import { ADS_COOKIE, CONSENT_COOKIE, CONSENT_EVENT, SETTINGS_EVENT, adsAllowed, analyticsAllowed, hasPrivacySignal, openCookieSettings, readCookie, saveConsent } from "@/lib/cookie-consent";
import styles from "./cookie-consent.module.css";

function subscribe(listener: () => void) {
  window.addEventListener(CONSENT_EVENT, listener);
  window.addEventListener("focus", listener);
  return () => { window.removeEventListener(CONSENT_EVENT, listener); window.removeEventListener("focus", listener); };
}
function snapshot() { return `${readCookie(CONSENT_COOKIE)}:${readCookie(ADS_COOKIE)}:${hasPrivacySignal()}`; }

function CookieMark() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5Z"/><path d="M8 8h.01M7 14h.01M12 12h.01M11 17h.01M16 16h.01" strokeWidth="3" strokeLinecap="round"/></svg>;
}

export function CookieSettingsButton() {
  const locale = useLocale() as Locale;
  return <button type="button" className={styles.footerButton} onClick={openCookieSettings}>{copy[locale].settings}</button>;
}

// Original styling inspired by 21st.dev's Cookie Banner and category-control patterns.
// No tracking SDK is loaded here; future integrations must use the consent helpers.
export function CookieConsent() {
  const locale = useLocale() as Locale;
  const text = copy[locale];
  const current = useSyncExternalStore(subscribe, snapshot, () => "server");
  const dialog = useRef<HTMLDialogElement>(null);
  const returnFocus = useRef<HTMLElement | null>(null);
  const [analytics, setAnalytics] = useState(false);
  const [advertising, setAdvertising] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const blocked = current !== "server" && hasPrivacySignal();
  const hasChoice = current !== "server" && ["0", "1"].includes(readCookie(CONSENT_COOKIE) ?? "");

  useEffect(() => {
    function open() {
      returnFocus.current = document.activeElement as HTMLElement | null;
      setAnalytics(analyticsAllowed());
      setAdvertising(adsAllowed());
      setExpanded(true);
      dialog.current?.showModal();
    }
    window.addEventListener(SETTINGS_EVENT, open);
    return () => window.removeEventListener(SETTINGS_EVENT, open);
  }, []);

  function close() {
    dialog.current?.close();
    setExpanded(false);
    returnFocus.current?.focus();
  }

  function save(analytics: boolean, advertising: boolean) {
    saveConsent(analytics, advertising);
    close();
  }

  return <>
    {current !== "server" && !hasChoice && !blocked && !expanded && <section className={styles.banner} aria-labelledby="cookie-banner-title" aria-describedby="cookie-banner-description">
      <div className={styles.bannerHeading}><span className={styles.mark}><CookieMark /></span><span className={styles.kicker}>VendeClip · {text.privacy}</span></div>
      <h2 id="cookie-banner-title">{text.title}</h2>
      <p id="cookie-banner-description">{text.description}</p>
      <div className={styles.actions}>
        <button type="button" onClick={() => save(false, false)}>{text.decline}</button>
        <button type="button" onClick={() => save(true, false)}>{text.accept}</button>
      </div>
      <div className={styles.links}><button type="button" onClick={openCookieSettings}>{text.settings}<span aria-hidden="true"> ↗</span></button><Link href={localizedHref("/privacy", locale)}>{text.privacy}</Link></div>
    </section>}

    <dialog ref={dialog} className={styles.dialog} aria-labelledby="cookie-settings-title" aria-describedby="cookie-settings-description" onCancel={event => { event.preventDefault(); close(); }} onClose={() => setExpanded(false)}>
      <div className={styles.dialogHeading}><span className={styles.mark}><CookieMark /></span><button type="button" className={styles.close} aria-label={text.close} onClick={close}>×</button></div>
      <span className={styles.kicker}>VendeClip · {text.settings}</span>
      <h2 id="cookie-settings-title">{text.title}</h2>
      <p id="cookie-settings-description">{text.description}</p>
      {blocked && <p className={styles.signal} role="status">{text.gpc}</p>}
      <div className={styles.categories}>
        <div className={styles.category}><div><h3>{text.necessary}</h3><p>{text.necessaryDescription}</p></div><span className={styles.always}>{text.always}</span></div>
        <label className={styles.category}><span><strong>{text.analytics}</strong><span className={styles.detail}>{text.analyticsDescription}</span></span><input type="checkbox" role="switch" checked={analytics && !blocked} disabled={blocked} onChange={event => setAnalytics(event.target.checked)} aria-label={text.analytics} /></label>
        <label className={styles.category}><span><strong>{text.advertising}</strong><span className={styles.detail}>{text.adsDescription}</span></span><input type="checkbox" role="switch" checked={advertising && !blocked} disabled={blocked} onChange={event => setAdvertising(event.target.checked)} aria-label={text.advertising} /></label>
      </div>
      <p className={styles.retention}>{text.retention} <Link href={localizedHref("/privacy", locale)}>{text.privacy} ↗</Link></p>
      <div className={styles.actions}><button type="button" onClick={() => save(false, false)}>{text.decline}</button><button type="button" className={styles.primary} onClick={() => save(analytics, advertising)}>{text.save}</button></div>
    </dialog>
  </>;
}
