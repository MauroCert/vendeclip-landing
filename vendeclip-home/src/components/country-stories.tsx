'use client';
import Image from 'next/image';
import { useId } from 'react';
import type { Locale } from '@/i18n/config';
import { useLocalizer } from '@/i18n/use-localizer';
import personas from '@/lib/country-personas.json';
import styles from './country-stories.module.css';

const countryByLocale: Record<Locale, string> = {
  en: 'US', 'en-gb': 'GB', es: 'ES', pt: 'BR', it: 'IT',
  fr: 'FR', de: 'DE', nl: 'NL', pl: 'PL', tr: 'TR', ja: 'JP',
};

export function CountryStories() {
  const localize = useLocalizer();
  const id = useId();
  const country = countryByLocale[localize.locale as Locale] ?? 'US';
  const profile = personas.find(person => person.country === country)!;
  const city = profile?.country === 'JP' && localize.locale !== 'ja' ? 'Tokyo' : profile?.city ?? '';
  const names = new Intl.DisplayNames([localize.locale], { type: 'region' });
  return <section id="markets" className={`container ${styles.section}`} aria-labelledby={`${id}-title`}>
    <div className={styles.intro}>
      <div>
        <span className="eyebrow">{localize.text('FOR PROPERTY PROFESSIONALS')}</span>
        <h2 id={`${id}-title`}>{localize.text('Your market. Your way of working.')}</h2>
        <p>{localize.text('From a single listing to a growing portfolio, bring your property stories together.')}</p>
      </div>
    </div>
    <article className={styles.card} key={profile.country}>
      <div className={styles.portrait}>
        <Image src={profile.image} alt="" fill sizes="(max-width: 760px) 100vw, 400px" />
        <span className={styles.location}>{city} · {names.of(profile.country)}</span>
      </div>
      <div className={styles.story}>
        <h3 className={styles.useCaseTitle}>{localize.text('A workflow for your next listing.')}</h3>
        <div className={styles.workflows}>
          {[
            ['Independent agents', 'Turn property photos into a video with your voice, brand, and contact details.'],
            ['Growing teams', 'Give every listing a consistent style, from the first clip to the final export.'],
            ['Property marketing', 'Bring video and property details together on a shareable listing page.'],
          ].map(([title, description]) => <div className={styles.workflow} key={title}>
            <h4>{localize.text(title)}</h4>
            <p>{localize.text(description)}</p>
          </div>)}
        </div>
      </div>
    </article>
  </section>;
}
