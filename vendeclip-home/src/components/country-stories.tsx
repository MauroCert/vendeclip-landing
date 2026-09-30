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

const sampleQuotes = [
  'For a property in {0}, I want the video to capture how the home feels—not just how many rooms it has.',
  'My next listing in {0} needs a story that feels personal, with my own voice and a consistent visual style.',
  'From the first photo to the final frame, I want my listings in {0} to feel considered and unmistakably mine.',
  'When I share a home in {0}, I want buyers to notice the light, the details, and the spaces they could make their own.',
  'For my listings in {0}, I want one clear story that works across social media and the property page.',
  'A home in {0} deserves more than a slideshow. I want to give its photos movement, atmosphere, and a familiar voice.',
];

export function CountryStories() {
  const localize = useLocalizer();
  const id = useId();
  const country = countryByLocale[localize.locale as Locale] ?? 'US';
  const profile = personas.find(person => person.country === country)!;
  const city = profile?.country === 'JP' && localize.locale !== 'ja' ? 'Tokyo' : profile?.city ?? '';
  const names = new Intl.DisplayNames([localize.locale], { type: 'region' });
  return <section className={`container ${styles.section}`} aria-labelledby={`${id}-title`}>
    <div className={styles.intro}>
      <div>
        <span className="eyebrow">{localize.text('LOCAL PERSPECTIVES')}</span>
        <h2 id={`${id}-title`}>{localize.text('Different places. A personal story.')}</h2>
        <p>{localize.text('Explore fictional examples of how property professionals could tell their stories around the world.')}</p>
      </div>
    </div>
    <article className={styles.card} key={profile.country}>
      <div className={styles.portrait}>
        <Image src={profile.image} alt={localize.text('AI-generated portrait of fictional professional {0}').replace('{0}', profile.name)} fill sizes="(max-width: 760px) 100vw, 400px" />
        <span className={styles.location}>{city} · {names.of(profile.country)}</span>
      </div>
      <div className={styles.story}>
        <span className={styles.disclosure}>{localize.text('Fictional example · AI-generated portrait')}</span>
        <blockquote>{localize.text(sampleQuotes[profile.quote]).replace('{0}', city)}</blockquote>
        <div className={styles.identity}>
          <strong>{profile.name}</strong>
          <span>{localize.text('Fictional real estate professional')} · {city}</span>
        </div>
        <p className={styles.note}>{localize.text('Illustrative sample, not a real customer review. The person and quote are fictional.')}</p>
      </div>
    </article>
  </section>;
}
