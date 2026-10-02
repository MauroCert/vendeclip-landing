
import { useLocalizer } from "@/i18n/use-localizer";
import { PageHero, PageCTA } from "@/components/public-components";
import { TemplateGallery } from "@/components/public-interactions";
export const metadata = { title: "Real property video examples | VendeClip",
  description: "Real clips. Real exports. Explore different ways to turn property photos into videos people want to watch.",
};
export default function ExamplesPage() {
  const localize = useLocalizer();
  return localize((
    <>
      <PageHero
        eyebrow="MADE WITH VENDECLIP"
        title="See what your listing could become."
        description="Real clips. Real exports. Explore different ways to turn property photos into videos people want to watch."
      />
      <section className="container page-section example-feature">
        <div>
          <span className="eyebrow">THE COMPLETE STORY</span>
          <h2>A home by the lagoon.</h2>
          <p>
            From the first impression to the spaces inside. Watch a complete
            VendeClip property video, with its original sound.
          </p>
          <span className="page-fineprint">
            Los Alisos · Nordelta · Original VendeClip export
          </span>
        </div>
        <video
          src="/media/listing-demo/final-video.mp4"
          poster="/media/listing-demo/exterior.jpg"
          controls
          playsInline
          preload="none"
          aria-label="Complete property video: a home by the lagoon"
        />
      </section>
      <section className="page-section container">
        <div className="page-section-heading">
          <span className="eyebrow">MORE WAYS TO TELL IT</span>
          <h2>Find a style that feels like you.</h2>
        </div>
        <TemplateGallery />
      </section>
      <PageCTA />
    </>
  ));
}
