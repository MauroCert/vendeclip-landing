
import { useLocalizer } from "@/i18n/use-localizer";
import Link from "next/link";
import { InteractiveCta } from "./interactive-cta";
import { Icon } from "./icon";
import { TemplateCollection, TemplateFormats } from "./templates-studio";
import styles from "./templates-page.module.css";

const details = [
  ["Start with the property.", "The light in the living room. The view from the terrace. Bring in your listing photos and details, then choose a style that gives them room."],
  ["Put your name on it.", "Your logo, colors, and contact details belong in the story. Keep a consistent signature, even when every property feels different."],
  ["Find its rhythm.", "Pair the visuals with music and narration. Preview the sequence, refine the details, and share a video that feels considered from beginning to end."],
];

export function TemplatesPage() {
  const localize = useLocalizer();
  return localize((
    <div className={styles.page}>
      <nav className={`container ${styles.breadcrumb}`} aria-label="Breadcrumb">
        <Link href="/product">Product</Link><span aria-hidden="true">/</span><span>Templates</span>
      </nav>

      <section className={`container ${styles.hero}`}>
        <div className={styles.heroLabel}><span className={styles.kicker}>THE TEMPLATE COLLECTION</span><span className={styles.edition}>Four ways to tell the story</span></div>
        <div className={styles.heroGrid}>
          <h1>A home has character.<br />{" "}Your video should, <em>too.</em></h1>
          <div className={styles.heroAside}>
            <p>A quiet tour. A bold introduction. A closer look at the details. Find a style that feels right for your listing.</p>
            <a href="#collection" className={styles.underlinedLink}>Explore the collection <Icon name="arrow" /></a>
          </div>
        </div>
      </section>

      <TemplateCollection />

      <section className={`container ${styles.craft}`} aria-labelledby="craft-heading">
        <div className={styles.sectionHeading} data-template-reveal>
          <span className={styles.kicker}>FROM A STYLE TO YOUR STORY</span>
          <h2 id="craft-heading">A template gives it shape.<br />You give it <em>character.</em></h2>
        </div>
        <div className={styles.craftRows}>
          {details.map(([title, description], index) => (
            <article className={styles.craftRow} key={title} data-template-reveal>
              <span className={styles.rowNumber}>0{index + 1}</span>
              <h3>{title}</h3>
              <p>{description}</p>
            </article>
          ))}
        </div>
        <Link href="/how-it-works" className={styles.underlinedLink}>See how a listing becomes a video <Icon name="arrow" /></Link>
      </section>

      <TemplateFormats />

      <section className={`container ${styles.faq}`} aria-labelledby="template-questions">
        <div data-template-reveal>
          <span className={styles.kicker}>A FEW PRACTICAL THINGS</span>
          <h2 id="template-questions">Before you<br /><em>press play.</em></h2>
          <a className={styles.underlinedLink} href="https://aprender.vendeclip.com">Visit the help center <Icon name="arrow" /></a>
        </div>
        <div className={styles.questions}>
          {[
            ["Can I make a template match my agency?", "Yes. Add your logo, brand colors, and contact details, then use your own property photos and copy. Templates provide the visual starting point; the listing and branding are yours."],
            ["Can I add music, a voice, or a presenter?", "Yes. Music, narration, and an optional presenter can become part of the finished video. The available voices, presenter features, and template options vary by plan."],
            ["Are these actual VendeClip videos?", "Yes. The four collection previews are videos from VendeClip’s template library. They show the style in motion, using example property content."],
            ["Can I try it before choosing a plan?", "Yes. Start with the free plan to explore the workflow. Check pricing for the current video allowances, watermark rules, and features included in each plan."],
          ].map(([question, answer]) => (
            <details key={question} data-template-reveal>
              <summary>{question}<span><Icon name="plus" /></span></summary>
              <p>{answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className={`container ${styles.closing}`} data-template-reveal>
        <span className={styles.kicker}>YOUR PROPERTY. YOUR POINT OF VIEW.</span>
        <div className={styles.closingMain}>
          <h2>Make the next one <em>yours.</em></h2>
          <Link href="/sign-up" className={styles.roundCta} aria-label="Start creating your first video"><Icon name="arrow" /></Link>
        </div>
        <div className={styles.closingBottom}>
          <Link href="/sign-up" className={styles.underlinedLink}>Create your first video <Icon name="arrow" /></Link>
          <span>Start for free · No credit card needed</span>
        </div>
        <nav className={styles.continueLinks} aria-label="More creative tools">
          <Link href="/product/branding"><span>ADD YOUR SIGNATURE</span><strong>Branding <Icon name="arrow" /></strong></Link>
          <Link href="/product/music"><span>SET THE MOOD</span><strong>Music <Icon name="arrow" /></strong></Link>
          <Link href="/pricing"><span>FIND YOUR FIT</span><strong>Plans & pricing <Icon name="arrow" /></strong></Link>
        </nav>
      </section>
    </div>
  ));
}
