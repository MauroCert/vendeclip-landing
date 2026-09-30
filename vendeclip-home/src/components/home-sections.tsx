
import { CountryStories } from "./country-stories";
import { useLocalizer } from "@/i18n/use-localizer";
import Link from "next/link";
import { CreativeCard, FeatureVisual } from "./creative-motion";
import { InteractiveCta } from "./interactive-cta";
import { SiteFooter } from "./site-footer";
import Image from "next/image";
import { Icon, type IconName } from "./icon";
import { TemplateShowcase } from "./home-interactions";
import { LocalizedPresenter } from "./localized-presenter";
import { ListingToVideo } from "./listing-to-video";

const features: { icon: IconName; title: string; copy: string }[] = [
  {
    icon: "mic",
    title: "A voice that feels like you",
    copy: "Choose a voice and language, or clone your own voice for narration that sounds familiar.",
  },
  {
    icon: "music",
    title: "The right words. The right mood.",
    copy: "AI scripts, social captions, on-screen text, and background music bring your property story together.",
  },
  {
    icon: "palette",
    title: "Your brand, built in",
    copy: "Keep your logo, colors, typography, and contact details consistent across every listing.",
  },
  {
    icon: "image",
    title: "Photos with more possibilities",
    copy: "Explore AI photo edits, virtual staging, and renovation ideas before creating your next video.",
  },
  {
    icon: "layers",
    title: "Beyond the video",
    copy: "Create branded property flyers and social assets from the same listing information.",
  },
  {
    icon: "globe",
    title: "A home for your listings",
    copy: "Publish a branded website and shareable property pages with videos, details, and direct contact options.",
  },
  {
    icon: "message",
    title: "Turn interest into a conversation",
    copy: "Capture property inquiries through forms and WhatsApp, and keep leads organized by listing.",
  },
  {
    icon: "chart",
    title: "See what gets attention",
    copy: "Understand views, video plays, contact clicks, and inquiries with analytics for each property.",
  },
  {
    icon: "user",
    title: "Made for your whole team",
    copy: "Bring agents into a shared workspace, manage your listings, and keep the brokerage’s brand consistent.",
  },
];
const faqs = [
  [
    "Do I need video footage or editing experience?",
    "No. Start with property photos or import a supported listing link. VendeClip helps you choose a style, add movement and narration, and create the video. You can review and adjust your project before exporting.",
  ],
  [
    "Can I use my own brand and voice?",
    "Yes. Add your logo, colors, and contact details to your brand kit. Voice cloning and a personal AI presenter let you bring your own voice and image into property videos. Availability depends on your plan.",
  ],
  [
    "Where can I share my videos?",
    "Export your video for Instagram, TikTok, YouTube, Facebook, or WhatsApp. You can also publish a branded property page. Direct social scheduling and advertising are currently available only for enabled accounts.",
  ],
  [
    "Can I try VendeClip before choosing a plan?",
    "Yes. You can create an account without a credit card and explore the free video allowance. Export resolution, watermarks, AI features, and usage limits depend on your plan. Check the pricing page for current details.",
  ],
  [
    "Does it work for a real estate team?",
    "Yes. VendeClip supports team workspaces, shared branding, property projects, and lead management. Check the current plans to find the right fit for your agents and listing volume.",
  ],
];
export function HomeSections() {
  const localize = useLocalizer();
  return localize((
    <>
      <section className="section container workflow" id="how-it-works">
        <div className="section-heading centered">
          <span className="eyebrow">LESS BUSYWORK. MORE SHOWINGS.</span>
          <h2>
            You know the property.
            <br />
            We’ll help you tell its story.
          </h2>
          <p>From the photos on your phone to the feed of your next buyer.</p>
        </div>
        <div className="steps">
          <article>
            <div className="step-visual import-visual">
              <div className="import-url">
                <Icon name="link" />
                <span>Your property listing link</span>
                <span className="import-check">
                  <Icon name="check" />
                </span>
              </div>
              <div className="import-photos">
                {["costa-villa", "lake-house", "patagonia-retreat"].map(
                  (name) => (
                    <Image
                      key={name}
                      src={`/media/${name}.webp`}
                      width={130}
                      height={85}
                      alt=""
                    />
                  ),
                )}
              </div>
              <span className="mini-success">
                <Icon name="check" />
                Property details imported
              </span>
            </div>
            <div className="step-title">
              <span>01</span>
              <h3>Start with your listing</h3>
            </div>
            <p>
              Paste a property link or upload your photos. Bring your property
              details along, too.
            </p>
          </article>
          <article>
            <div className="step-visual style-visual">
              <div className="mini-style-card">
                <Image
                  src="/media/costa-villa.webp"
                  width={112}
                  height={115}
                  alt="Coastal property preview"
                />
                <div>
                  <span className="small-overline">MAKE IT YOURS</span>
                  <strong>The coastal collection</strong>
                  <div className="color-dots">
                    <i />
                    <i />
                    <i />
                    <i />
                  </div>
                  <span className="mini-style-label">
                    <Icon name="music" />
                    Music + voiceover
                  </span>
                </div>
              </div>
            </div>
            <div className="step-title">
              <span>02</span>
              <h3>Give it your signature</h3>
            </div>
            <p>
              Pick a template. Add motion, music, your brand, and a voice or
              presenter.
            </p>
          </article>
          <article>
            <div className="step-visual publish-visual">
              <span className="publish-check">
                <Icon name="check" />
              </span>
              <strong>Ready for its close-up.</strong>
              <div className="publish-icons">
                <Icon name="instagram" />
                <Icon name="tiktok" />
                <Icon name="youtube" />
                <Icon name="message" />
              </div>
            </div>
            <div className="step-title">
              <span>03</span>
              <h3>Put it out into the world</h3>
            </div>
            <p>
              Review, download, and share. Add a property page that gives buyers
              a way to reach you.
            </p>
          </article>
        </div>
      </section>
      <section className="feature-section" id="features">
        <div className="container">
          <div className="feature-intro">
            <div>
              <span className="eyebrow">
                FROM YOUR LISTING TO THEIR NEXT HOME.
              </span>
              <h2>
                One listing link.
                <br />A whole story in motion.
              </h2>
            </div>
            <p>
              Your photos and description become the starting point. Bring them
              to life with clips, music, your voice, and an optional avatar.
              Then bring it all together in one property video.
            </p>
          </div>
          <ListingToVideo />
          <div className="motion-feature-footer">
            <ul className="check-list">
              <li>
                <Icon name="check" /> Photos and details from your listing
              </li>
              <li>
                <Icon name="check" /> Clips, music, voice, and optional avatar
              </li>
              <li>
                <Icon name="check" /> Preview and refine before exporting
              </li>
            </ul>
            <Link href="/product/ai-video" className="text-link">
              Discover AI video <Icon name="arrow" />
            </Link>
          </div>
        </div>
      </section>
      <LocalizedPresenter />
      <section className="template-section">
        <div className="container">
          <TemplateShowcase />
        </div>
      </section>
      <section className="section container tools-section">
        <div className="section-heading centered">
          <span className="eyebrow">THE WHOLE PICTURE</span>
          <h2>
            One listing. Everything
            <br />
            you need to market it.
          </h2>
          <p>
            The creative tools and the follow-through, together in one place.
          </p>
        </div>
        <div className="features-grid creative-grid">
          {features.map((feature, index) => (
            <CreativeCard key={feature.title} index={index}>
              <FeatureVisual index={index} />
              <span className="feature-icon">
                <Icon name={feature.icon} />
              </span>
              <h3>{feature.title}</h3>
              <p>{feature.copy}</p>
            </CreativeCard>
          ))}
        </div>
        <p className="creative-preview-note">Illustrative previews of your creative toolkit.</p>
        <div className="export-strip">
          <div>
            <Icon name="download" />
            <p>
              <strong>Create once. Share wherever.</strong>
              <span>
                Portrait, square, and landscape formats. Ready for your social
                channels.
              </span>
            </p>
          </div>
          <Link href="/product" className="text-link">
            Explore the platform <Icon name="arrow" />
          </Link>
        </div>
      </section>
      <section className="broker-section container">
        <div>
          <span className="eyebrow">BUILT AROUND THE WAY YOU WORK</span>
          <h2>
            More time for people.
            <br />
            Less time making content.
          </h2>
          <p>
            For independent agents building their name. For teams launching the
            next listing. For brokerages that want every property to look its
            best.
          </p>
          <Link href="/pricing" className="button button-secondary">
            Find your plan <Icon name="arrow" />
          </Link>
        </div>
        <div className="broker-list">
          <article>
            <span className="feature-icon">
              <Icon name="user" />
            </span>
            <div>
              <h3>Independent agents</h3>
              <p>
                Give every listing a polished presence, without adding an editor
                to your team.
              </p>
            </div>
          </article>
          <article>
            <span className="feature-icon">
              <Icon name="layers" />
            </span>
            <div>
              <h3>Growing teams</h3>
              <p>
                Keep your content moving and your brand consistent across agents
                and listings.
              </p>
            </div>
          </article>
          <article>
            <span className="feature-icon">
              <Icon name="globe" />
            </span>
            <div>
              <h3>Established brokerages</h3>
              <p>
                Bring your marketing, property pages, and inquiries into a
                shared workflow.
              </p>
            </div>
          </article>
        </div>
      </section>
      <CountryStories />
      <section className="section container faq-section home-faq" id="faq">
        <div>
          <span className="eyebrow">GOOD QUESTIONS</span>
          <h2>
            A few things
            <br />
            you might be wondering.
          </h2>
          <a href="https://aprender.vendeclip.com" className="text-link">
            Visit the help center <Icon name="arrow" />
          </a>
        </div>
        <div className="faq-list">
          {faqs.map(([question, answer], index) => (
            <details key={question} open={index === 0}>
              <summary>
                <span className="faq-number" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                <span className="faq-question">{question}</span>
                <span className="faq-indicator"><Icon name="plus" /></span>
              </summary>
              <p>{answer}</p>
            </details>
          ))}
        </div>
      </section>
      <section className="final-cta container">
        <div className="cta-image">
          <Image
            src="/media/costa-villa.webp"
            fill
            sizes="(max-width: 760px) 100vw, 40vw"
            alt="Coastal villa overlooking a pool and the ocean"
          />
        </div>
        <div className="cta-copy">
          <span className="eyebrow">YOUR NEXT GREAT LISTING STARTS HERE</span>
          <h2>
            You bring the property.
            <br />
            We’ll bring it to life.
          </h2>
          <p>Your photos are already the start of something great.</p>
          <InteractiveCta />
          <span className="cta-note">
            <Icon name="check" />
            Start for free · No credit card needed
          </span>
        </div>
      </section>
      <SiteFooter />
    </>
  ));
}
