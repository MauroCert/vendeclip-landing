import { CountryStories } from "@/components/country-stories";

import { getLocalizer } from "@/i18n/server";
import { visitorCountry } from "@/lib/visitor-country";
import { headers } from "next/headers";
import { currencyForCountry } from "@/lib/regional-pricing";
import Link from "next/link";
import { Icon } from "@/components/icon";
import { PageHero, PageFAQs, PageCTA } from "@/components/public-components";
import { PricingCards } from "@/components/public-interactions";
export const metadata = {
  title: "Pricing for agents, teams, and brokerages | VendeClip",
  description: "Try your first videos for free. Choose more room to create when your property portfolio—and your ambition—grows.",
};
export default async function PricingPage() {
  const [localize, requestHeaders] = await Promise.all([getLocalizer(), headers()]);
  const currency = currencyForCountry(visitorCountry(requestHeaders) || 'US');
  return localize((
    <>
      <PageHero
        eyebrow="PLANS THAT GROW WITH YOU"
        title="Start with your next listing."
        description="Try your first videos for free. Choose more room to create when your property portfolio—and your ambition—grows."
      />
      <section className="container">
        <PricingCards currency={currency} />
      </section>
      <section className="pricing-custom container">
        <div>
          <span className="eyebrow">A BIGGER OPERATION?</span>
          <h2>Let’s find your fit.</h2>
          <p>
            For brokerages with more properties, larger teams, or a different
            way of working.
          </p>
        </div>
        <a className="text-link" href="https://vendeclip.com/en/pricing">
          Explore custom plans <Icon name="arrow" />
        </a>
      </section>
      <section className="pricing-workflow container" aria-labelledby="pricing-workflow-title">
        <div className="pricing-workflow-heading">
          <div>
            <span className="eyebrow">A CLEAR STARTING POINT</span>
            <h2 id="pricing-workflow-title">One workflow. From photos to publish.</h2>
          </div>
          <Link className="text-link" href="/product">
            Explore every feature <Icon name="arrow" />
          </Link>
        </div>
        <ol className="pricing-workflow-steps">
          {[
            ["Create the story", "Bring in your listing, make clips, and choose the sound and style."],
            ["Make it yours", "Add the brand, words, and contact details that make the video yours."],
            ["Review the result", "See the final video before sharing it with your next buyer."],
          ].map(([title, copy], index) => (
            <li key={title}>
              <div className="pricing-workflow-step-mark" aria-hidden="true">
                <span className="pricing-workflow-icon"><Icon name={index === 0 ? "image" : index === 1 ? "palette" : "play"} /></span>
                <span className="pricing-workflow-number">0{index + 1}</span>
                <span className="pricing-workflow-connector"><Icon name="arrow" /></span>
              </div>
              <h3>{title}</h3>
              <p>{copy}</p>
            </li>
          ))}
        </ol>
      </section>
      <CountryStories />
      <PageFAQs
        items={[
          [
            "Can I start without paying?",
            "Yes. The Free plan includes 2 total videos, with a watermark. No credit card is needed to get started.",
          ],
          [
            "What counts as a video?",
            "Each final property video you generate counts as a video. Its clips, music, narration, and branding are part of the creation workflow.",
          ],
          [
            "How does yearly billing work?",
            "The yearly option shows an equivalent monthly amount and the total annual payment. Check the current plan terms before purchasing.",
          ],
          [
            "Can I change my plan later?",
            "You can manage your subscription in your VendeClip account. Current billing and cancellation terms are available on the live pricing page.",
          ],
          [
            "Are presenter features included?",
            "The presenter is available on paid plans. The app explains plan requirements before recording or uploading your voice.",
          ],
        ]}
      />
      <PageCTA title="Your first video is a good place to start." />
    </>
  ));
}
