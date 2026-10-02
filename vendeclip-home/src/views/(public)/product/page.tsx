
import { useLocalizer } from "@/i18n/use-localizer";
import { PageHero, ProductGrid, PageCTA } from "@/components/public-components";
import { ListingToVideo } from "@/components/listing-to-video";
import { products } from "@/lib/product-pages";
export const metadata = {
  title: "The complete real estate video platform | VendeClip",
  description: "Create the video, give it your signature, and turn interest into a conversation. Everything your property story needs, together.",
};
export default function ProductPage() {
  const localize = useLocalizer();
  return localize((
    <>
      <PageHero
        eyebrow="THE VENDECLIP PLATFORM"
        title="One listing. A world of possibilities."
        description="Create the video, give it your signature, and turn interest into a conversation. Everything your property story needs, together."
      />
      <section className="container">
        <ListingToVideo />
      </section>
      {(["Create", "Personalize", "Publish & grow"] as const).map(
        (category, index) => (
          <section className="page-section container" key={category}>
            <div className="page-section-heading">
              <span className="eyebrow">
                0{index + 1} · {category}
              </span>
              <h2>
                {
                  [
                    "Make them stop and look.",
                    "Make it unmistakably yours.",
                    "Make the next connection.",
                  ][index]
                }
              </h2>
            </div>
            <ProductGrid
              items={products.filter(
                (product) => product.category === category,
              )}
            />
          </section>
        ),
      )}
      <PageCTA />
    </>
  ));
}
