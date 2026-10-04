
import { useLocalizer } from "@/i18n/use-localizer";
import { InteractiveCta } from "./interactive-cta";
import { FeatureVisual } from "./creative-motion";
import { PresenterWalkthrough } from "./presenter-walkthrough";
import Image from "next/image";
import Link from "next/link";
import { Icon } from "./icon";
import { products, type ProductPage } from "@/lib/product-pages";
import {
  FeatureDemo,
  TemplateGallery,
  MusicLibrary,
} from "./public-interactions";
import { ListingToVideo } from "./listing-to-video";
export function PageHero({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: string;
  description: string;
  children?: React.ReactNode;
}) {
  const localize = useLocalizer();
  return localize((
    <section className="page-hero-shell">
      <div
      className={`page-hero container ${children ? "page-hero-split" : "page-hero-centered"}`}
    >
      <div className="page-hero-copy">
        <span className="eyebrow">{eyebrow}</span>
        <h1>{title}</h1>
        <p>{description}</p>
        <div className="page-hero-actions">
          <InteractiveCta>Start for free</InteractiveCta>
          <Link href="/examples" className="text-link">
            See real examples <Icon name="play" />
          </Link>
        </div>
        <span className="page-fineprint">
          Start for free · No credit card needed
        </span>
      </div>
      {children && <div className="page-hero-visual">{children}</div>}
      </div>
    </section>
  ));
}
export function PageCTA({
  title = "Your next listing deserves this.",
}: {
  title?: string;
}) {
  const localize = useLocalizer();
  return localize((
    <section className="page-cta container">
      <span className="eyebrow">MAKE YOUR NEXT MOVE</span>
      <h2>{title}</h2>
      <p>Bring the property. We’ll help you tell its story.</p>
      <InteractiveCta />
      <Link href="/pricing" className="text-link">
        Explore plans <Icon name="arrow" />
      </Link>
    </section>
  ));
}
export function ProductGrid({ items = products }: { items?: ProductPage[] }) {
  const localize = useLocalizer();
  return localize((
    <div className="product-grid">
      {items.map((product) => (
        <Link
          href={`/product/${product.slug}`}
          className="product-link-card"
          key={product.slug}
        >
          <FeatureVisual index={({ voiceover: 0, music: 1, captions: 1, branding: 2, "ai-video": 3, templates: 4, presenter: 8, website: 5, leads: 6, analytics: 7 } as Record<string, number>)[product.slug] ?? 3} />
          <span className="feature-icon"><Icon name={product.icon} /></span>
          <span className="product-card-category">{product.category}</span>
          <h3>{product.name}</h3>
          <p>{product.description}</p>
          <span className="text-link">
            Explore {product.name.toLowerCase()} <Icon name="arrow" />
          </span>
        </Link>
      ))}
    </div>
  ));
}
export function PageFAQs({ items }: { items: [string, string][] }) {
  const localize = useLocalizer();
  return localize((
    <section className="page-faq container">
      <div>
        <span className="eyebrow">GOOD QUESTIONS</span>
        <h2>A little more clarity.</h2>
        <a href="https://aprender.vendeclip.com" className="text-link">
          Visit the help center <Icon name="arrow" />
        </a>
      </div>
      <div className="faq-list">
        {items.map(([question, answer]) => (
          <details key={question}>
            <summary>
              {question}
              <Icon name="plus" />
            </summary>
            <p>{answer}</p>
          </details>
        ))}
      </div>
    </section>
  ));
}
export function FeaturePage({ product }: { product: ProductPage }) {
  const localize = useLocalizer();
  return localize((
    <>
      <PageHero
        eyebrow={product.name}
        title={product.title}
        description={product.description}
      >
        <FeatureDemo product={product} />
      </PageHero>
      {product.slug === "templates" && (
        <section className="page-section container">
          <div className="page-section-heading">
            <span className="eyebrow">FIND YOUR STYLE</span>
            <h2>Press play. Find your next look.</h2>
          </div>
          <TemplateGallery />
        </section>
      )}
      {product.slug === "music" && (
        <section className="page-section container" id="music-library">
          <div className="page-section-heading">
            <span className="eyebrow">FROM THE VENDECLIP LIBRARY</span>
            <h2>Listen to the possibilities.</h2>
            <p>Short previews of tracks available in VendeClip.</p>
          </div>
          <MusicLibrary />
        </section>
      )}
      <section className="page-section container">
        <div className="benefit-grid">
          {product.benefits.map(([title, copy], index) => (
            <article key={title}>
              <span className="benefit-number">0{index + 1}</span>
              <h3>{title}</h3>
              <p>{copy}</p>
            </article>
          ))}
        </div>
      </section>
      {product.slug === "presenter" ? (
        <PresenterWalkthrough />
      ) : product.slug === "ai-video" ? (
        <section className="page-section container">
          <div className="page-section-heading">
            <span className="eyebrow">SEE THE WHOLE PROCESS</span>
            <h2>One listing link. One complete story.</h2>
          </div>
          <ListingToVideo />
        </section>
      ) : (
        <section className="feature-story container">
          <div className="feature-story-image">
            <Image
              src={product.image}
              alt={`Property imagery for ${product.name.toLowerCase()}`}
              fill
              sizes="(max-width: 800px) 90vw, 45vw"
            />
          </div>
          <div>
            <span className="eyebrow">PART OF YOUR EVERYDAY WORKFLOW</span>
            <h2>From an idea to your next listing.</h2>
            <ol>
              {product.steps.map(([title, copy], index) => (
                <li key={title}>
                  <span>0{index + 1}</span>
                  <div>
                    <h3>{title}</h3>
                    <p>{copy}</p>
                  </div>
                </li>
              ))}
            </ol>
            <Link href="/how-it-works" className="text-link">
              See the complete workflow <Icon name="arrow" />
            </Link>
          </div>
        </section>
      )}
      <PageFAQs
        items={[
          [product.question, product.answer],
          [
            "Can I try VendeClip first?",
            "Yes. Start with the free plan to explore the workflow. Visit pricing for the current allowances and the features available in each plan.",
          ],
        ]}
      />
      <section className="page-section container">
        <div className="page-section-heading">
          <span className="eyebrow">BETTER TOGETHER</span>
          <h2>Keep the story going.</h2>
        </div>
        <ProductGrid
          items={products
            .filter(
              (p) =>
                p.slug !== product.slug &&
                (p.category === product.category || p.slug === "website"),
            )
            .slice(0, 3)}
        />
      </section>
      <PageCTA />
    </>
  ));
}
