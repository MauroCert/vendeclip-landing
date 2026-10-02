
import { useLocalizer } from "@/i18n/use-localizer";
import Image from "next/image";
import Link from "next/link";
import { PageHero, PageCTA } from "@/components/public-components";
import { Icon } from "@/components/icon";
import { resources } from "@/lib/resources";
export const metadata = {
  title: "Resources for real estate video marketing | VendeClip",
  description: "Practical ideas for creating property videos, publishing with context, and turning attention into a conversation.",
};
export default function ResourcesPage() {
  const localize = useLocalizer();
  return localize((
    <>
      <PageHero
        eyebrow="THE VENDECLIP PLAYBOOK"
        title="A little inspiration. A better next listing."
        description="Practical ideas for creating property videos, publishing with context, and turning attention into a conversation."
      />
      <section className="resource-grid container">
        {resources.map((resource) => (
          <Link
            href={`/resources/${resource.slug}`}
            className="resource-card"
            key={resource.slug}
          >
            <div>
              <Image
                src={resource.image}
                alt="Property used to illustrate the guide"
                fill
                sizes="(max-width: 700px) 90vw, 30vw"
              />
            </div>
            <span className="eyebrow">{resource.category}</span>
            <h2>{resource.title}</h2>
            <p>{resource.intro}</p>
            <span className="text-link">
              Read the guide <Icon name="arrow" />
            </span>
          </Link>
        ))}
      </section>
      <section className="help-callout container">
        <div>
          <span className="eyebrow">A QUESTION ABOUT THE PRODUCT?</span>
          <h2>Find your next step.</h2>
          <p>
            Explore the complete workflow or visit the help center for product
            tutorials and answers.
          </p>
        </div>
        <div>
          <Link href="/how-it-works" className="button button-outline">
            How it works <Icon name="arrow" />
          </Link>
          <a href="https://aprender.vendeclip.com" className="text-link">
            Open the help center <Icon name="arrow" />
          </a>
        </div>
      </section>
      <PageCTA />
    </>
  ));
}
