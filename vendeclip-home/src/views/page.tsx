
import { useLocalizer } from "@/i18n/use-localizer";
import { InteractiveCta } from "@/components/interactive-cta";
import { Header, VideoCard } from "@/components/home-interactions";
import { HomeSections } from "@/components/home-sections";
import { CustomerBrokerages } from "@/components/customer-brokerages";
import { Icon } from "@/components/icon";
export default function Home() {
  const localize = useLocalizer();
  return localize((
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Header />
      <main id="main">
        <section className="hero container">
          <div className="hero-copy">
            <a className="eyebrow-pill" href="#features">
              <Icon name="sparkles" /> Your next listing, reimagined{" "}
              <Icon name="arrow" />
            </a>
            <h1 className="cinematic-title" aria-label="Great properties deserve great videos.">
              <span className="title-line" aria-hidden="true"><span>Great properties deserve</span></span>
              <span className="title-line title-emphasis" aria-hidden="true"><span>great videos.</span></span>
            </h1>
            <p>
              Turn the photos you already have into videos buyers want to watch.
              <br className="desktop-break" /> Your brand. Your voice. Ready in
              minutes.
            </p>
            <div className="hero-actions">
              <InteractiveCta />
              <a href="#how-it-works" className="button button-secondary">
                <Icon name="play" /> See how it works
              </a>
            </div>
            <div className="hero-notes">
              <span>
                <Icon name="check" /> Start for free
              </span>
              <span>
                <Icon name="check" /> No credit card needed
              </span>
            </div>
          </div>
          <div className="hero-gallery" id="showcase">
            <VideoCard
              title="A different kind of home tour."
              label="CINEMATIC AI MOTION"
              poster="/media/lake-house.webp"
              video="/media/lake-house.mp4"
              large
              autoplay
              priority
            />
            <VideoCard
              title="Stop the scroll."
              priority
              label="BRANDED REELS"
              poster="/media/ai-motion-reel-poster.jpg"
              video="/media/ai-motion-reel-preview.mp4"
            />
            <VideoCard
              title="Set the scene."
              priority
              label="EDITORIAL STORIES"
              poster="/media/magazine-poster.jpg"
              video="/media/magazine-preview.mp4"
            />
          </div>
          <div className="gallery-foot">
            <span>
              <Icon name="sparkles" /> Real examples. Created with VendeClip.
            </span>
            <a href="#features">
              Meet your new creative team <Icon name="arrow" />
            </a>
          </div>
        </section>
        <section className="platforms container">
          <p>Made for the places your next buyer scrolls.</p>
          <div>
            <span>
              <Icon name="instagram" />
              Instagram Reels
            </span>
            <span>
              <Icon name="tiktok" />
              TikTok
            </span>
            <span>
              <Icon name="youtubeshorts" />
              YouTube Shorts
            </span>
            <span>
              <Icon name="youtube" />
              YouTube
            </span>
            <span>
              <Icon name="facebook" />
              Facebook
            </span>
            <span>
              <Icon name="whatsapp" />
              WhatsApp
            </span>
          </div>
        </section>
        <CustomerBrokerages />
        <HomeSections />
      </main>
    </>
  ));
}
