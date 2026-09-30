
import { useLocalizer } from "@/i18n/use-localizer";
import Link from "next/link";
import { PageHero, PageCTA, PageFAQs } from "@/components/public-components";
import { Icon, type IconName } from "@/components/icon";
export const metadata = {
  title: "Social sharing and integrations | VendeClip",
};
const channels: [string, IconName, string, string][] = [
  [
    "Instagram",
    "instagram",
    "Native sharing",
    "A vertical video and a caption, ready for the feed. Sharing options depend on your device.",
  ],
  [
    "TikTok",
    "tiktok",
    "Guided upload",
    "Download your video, prepare the caption, and continue uploading in TikTok.",
  ],
  [
    "YouTube Shorts",
    "youtube",
    "Guided upload",
    "Bring together the video, title, and description for your next Short.",
  ],
  [
    "WhatsApp",
    "message",
    "Share a property link",
    "Send a property page with context and an easy next step for the buyer.",
  ],
  [
    "Facebook",
    "facebook",
    "Share a property link",
    "Give your audience a shareable destination with the video and listing details.",
  ],
  [
    "Your website",
    "globe",
    "Branded property pages",
    "Keep your listing collection, videos, and contact options together.",
  ],
];
export default function IntegrationsPage() {
  const localize = useLocalizer();
  return localize((
    <>
      <PageHero
        eyebrow="WHERE YOUR NEXT BUYER SCROLLS"
        title="One property. Every right channel."
        description="Finish the video with the file, caption, and property link you need. Choose the next step for each platform and keep the campaign moving."
      />
      <section className="channel-hero container">
        <span className="feature-icon">
          <Icon name="film" />
        </span>
        <div className="channel-line" />
        <div className="channel-orbit">
          {channels.map(([name, icon]) => (
            <div key={name}>
              <Icon name={icon} />
              <span>{name}</span>
            </div>
          ))}
        </div>
      </section>
      <section className="page-section container">
        <div className="page-section-heading">
          <span className="eyebrow">READY FOR THE NEXT STEP</span>
          <h2>Choose where the story goes.</h2>
        </div>
        <div className="product-grid">
          {channels.map(([name, icon, mode, copy]) => (
            <article className="product-link-card" key={name}>
              <span className="feature-icon">
                <Icon name={icon} />
              </span>
              <span className="product-card-category">{mode}</span>
              <h3>{name}</h3>
              <p>{copy}</p>
              <Link
                href={
                  name === "Your website"
                    ? "/product/website"
                    : "/product/captions"
                }
                className="text-link"
              >
                Prepare your campaign <Icon name="arrow" />
              </Link>
            </article>
          ))}
        </div>
      </section>
      <section className="page-section container">
        <div className="page-section-heading">
          <span className="eyebrow">A FRAME THAT FITS</span>
          <h2>Make room for every screen.</h2>
        </div>
        <div className="format-cards">
          {[
            ["9:16", "Portrait", "Reels, TikTok, and Shorts"],
            ["1:1", "Square", "Social feeds"],
            ["16:9", "Landscape", "YouTube, websites, and presentations"],
          ].map(([ratio, title, copy]) => (
            <article key={ratio}>
              <div
                className="format-outline"
                style={{ aspectRatio: ratio.replace(":", "/") }}
              >
                {ratio}
              </div>
              <h3>{title}</h3>
              <p>{copy}</p>
            </article>
          ))}
        </div>
      </section>
      <PageFAQs
        items={[
          [
            "Does VendeClip publish automatically to every channel?",
            "Sharing differs by platform. Some destinations support a prepared sharing link or the device’s native share menu; others require you to upload the file. Connected publishing and scheduling depend on account availability.",
          ],
          [
            "Can I share just the property page?",
            "Yes. A public property link gives buyers a place to watch the video, explore the details, and contact you.",
          ],
        ]}
      />
      <PageCTA title="Make your next listing ready to travel." />
    </>
  ));
}
