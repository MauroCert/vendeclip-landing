
import { useLocalizer } from "@/i18n/use-localizer";
import Link from "next/link";
import { PageHero, PageCTA, PageFAQs } from "@/components/public-components";
import { ListingToVideo } from "@/components/listing-to-video";
import { Icon, type IconName } from "@/components/icon";
export const metadata = {
  title: "From a listing link to a property video | VendeClip",
};
const steps: [string, string, IconName, string][] = [
  [
    "Start with the property",
    "Paste the listing URL to bring in photos and the description, or add your own photos and property details.",
    "link",
    "ai-video",
  ],
  [
    "Bring each scene to life",
    "Create clips from the photos, choose the movement, and arrange the spaces in the order you want buyers to explore.",
    "sparkles",
    "ai-video",
  ],
  [
    "Give it your signature",
    "Choose a template, soundtrack, and narration. Add your brand and an optional presenter to make the story feel personal.",
    "palette",
    "branding",
  ],
  [
    "Review, share, and follow up",
    "Preview the final video, export for your channels, and share a branded property page with contact options.",
    "globe",
    "website",
  ],
];
export default function HowItWorksPage() {
  const localize = useLocalizer();
  return localize((
    <>
      <PageHero
        eyebrow="A SMALLER TO-DO LIST"
        title="You know the property. We’ll help tell the story."
        description="Your listing already has the raw material. Bring it into VendeClip and take it all the way to a complete video and property campaign."
      />
      <section className="container">
        <ListingToVideo />
      </section>
      <section className="page-section container workflow-explainer">
        {steps.map(([title, copy, icon, slug], index) => (
          <article key={title}>
            <span className="workflow-number">0{index + 1}</span>
            <Icon name={icon} />
            <div>
              <h2>{title}</h2>
              <p>{copy}</p>
              <Link href={`/product/${slug}`} className="text-link">
                Explore the tools <Icon name="arrow" />
              </Link>
            </div>
          </article>
        ))}
      </section>
      <PageFAQs
        items={[
          [
            "Can I upload photos without a listing URL?",
            "Yes. You can start from your own photos and add the property information yourself.",
          ],
          [
            "Can I choose my music and voice?",
            "Yes. Music, narration, style, and your optional presenter are part of the creation workflow. Available options depend on your plan.",
          ],
          [
            "Where can I share the result?",
            "Export for social channels or share a VendeClip property page. Visit integrations for the different sharing and upload options.",
          ],
        ]}
      />
      <PageCTA />
    </>
  ));
}
