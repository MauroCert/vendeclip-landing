
import { useLocalizer } from "@/i18n/use-localizer";
import Link from "next/link";
import { InteractiveCta } from "./interactive-cta";
import Image from "next/image";
import { Icon } from "./icon";
import { AnalyticsExplorer } from "./analytics-explorer";
import { demoProperties, getPeriod, percent, total } from "@/lib/analytics-demo";
import styles from "./analytics-page.module.css";

export function AnalyticsPage() {
  const localize = useLocalizer();
  const city = demoProperties[1];
  const cityDays = getPeriod(city, 30).current;
  const olive = demoProperties[0];
  const oliveDays = getPeriod(olive, 30).current;
  return localize((
    <div className={styles.page}>
      <nav className={`container ${styles.breadcrumb}`} aria-label="Breadcrumb"><Link href="/product">Product</Link><span aria-hidden="true">/</span><span>Analytics</span></nav>
      <section className={`container ${styles.hero}`}>
        <span className={styles.kicker}>EVERY LISTING TELLS A STORY</span>
        <div className={styles.heroGrid}>
          <h1>See what gets attention.<br />{" "}Know where to <em>focus.</em></h1>
          <div><p>See which properties get viewed, which videos get watched, and where buyers take the next step.</p><Link className={styles.textLink} href="/sign-up">Start with your next listing <Icon name="arrow" /></Link></div>
        </div>
      </section>

      <AnalyticsExplorer />

      <section className={`container ${styles.visualStories}`} aria-labelledby="signals-title">
        <div className={styles.sectionHeading} data-analytics-reveal><span className={styles.kicker}>PUT A PROPERTY TO THE NUMBERS</span><h2 id="signals-title">Less guesswork.<br />A clearer <em>picture.</em></h2><p>See the listing behind the activity, then decide what deserves your attention.</p></div>
        <div className={styles.storyGrid}>
          <article className={styles.pictureStory} data-analytics-reveal>
            <div className={styles.storyImage}><Image src={city.image} alt={city.alt} fill sizes="(max-width: 760px) 90vw, 52vw" /><span className={styles.imageLabel}>THE CITY TERRACE</span><div className={styles.photoMetric}><Icon name="play" /><div><strong>{percent(total(cityDays, "completions"), total(cityDays, "plays"))}</strong><span>Video completion rate</span></div><span>Sample</span></div></div>
            <div className={styles.storyCaption}><span>01 / BEYOND THE PLAY BUTTON</span><h3>Did they stay for the tour?</h3><p>Compare video starts with completed views. Get a clearer read on how your property story holds attention.</p><Link href="/product/ai-video" className={styles.textLink}>Explore AI video <Icon name="arrow" /></Link></div>
          </article>
          <article className={`${styles.pictureStory} ${styles.offsetStory}`} data-analytics-reveal>
            <div className={styles.storyImage}><Image src={olive.image} alt={olive.alt} fill sizes="(max-width: 760px) 90vw, 40vw" /><span className={styles.imageLabel}>THE OLIVE HOUSE</span><div className={styles.photoMetric}><Icon name="message" /><div><strong>{total(oliveDays, "contacts")}</strong><span>Contact actions</span></div><span>Sample</span></div></div>
            <div className={styles.storyCaption}><span>02 / FROM INTEREST TO CONTACT</span><h3>Which listing starts a conversation?</h3><p>See WhatsApp clicks and submitted inquiries alongside property views. Put your next follow-up in context.</p><Link href="/product/leads" className={styles.textLink}>Explore leads <Icon name="arrow" /></Link></div>
          </article>
        </div>
        <p className={styles.imageNote}>Illustrative property images and sample activity, August 10–September 8, 2026.</p>
      </section>

      <section className={`container ${styles.questions}`} aria-labelledby="analytics-questions">
        <div data-analytics-reveal><span className={styles.kicker}>THE DETAILS THAT MATTER</span><h2 id="analytics-questions">A little more <em>clarity.</em></h2></div>
        <div>{[
          ["What does VendeClip measure?", "Activity on your VendeClip property pages: page views, video starts, completed videos, WhatsApp clicks, and submitted inquiries. Review the activity over time and listing by listing."],
          ["Are these numbers from a real account?", "No. This is an interactive example using sample event counts and illustrative listings. Choose a property, period, or metric to explore how the reporting works."],
          ["Does this include Instagram or other social analytics?", "This view focuses on your VendeClip property pages. Social platforms have their own reporting, and connected publishing features vary by account."],
        ].map(([question, answer]) => <details key={question} data-analytics-reveal><summary>{question}<Icon name="plus" /></summary><p>{answer}</p></details>)}</div>
      </section>

      <section className={`container ${styles.closing}`} data-analytics-reveal>
        <div className={styles.closingImage}><Image src={olive.image} alt="Architectural detail of the illustrative Olive House" fill sizes="(max-width: 700px) 90vw, 35vw" /></div>
        <div><span className={styles.kicker}>YOUR NEXT LISTING, WITH MORE INSIGHT</span><h2>Give it a story.<br />See where it <em>leads.</em></h2><InteractiveCta /><span className={styles.fineprint}>Start for free · No credit card needed</span></div>
      </section>
    </div>
  ));
}
