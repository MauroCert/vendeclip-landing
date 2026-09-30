
import { useLocalizer } from "@/i18n/use-localizer";
import { getLocalizer } from "@/i18n/server";
import { notFound } from "next/navigation";
import { products, productBySlug } from "@/lib/product-pages";
import { FeaturePage } from "@/components/public-components";
import { TemplatesPage } from "@/components/templates-page";
import { AnalyticsPage } from "@/components/analytics-page";
export function generateStaticParams() {
  return products.map((product) => ({ feature: product.slug }));
}
export const dynamicParams = false;
export async function generateMetadata({
  params,
}: {
  params: Promise<{ feature: string }>;
}) {
  const product = productBySlug((await params).feature);
  return {
    title: `${product?.name ?? "Product"} | VendeClip`,
    description: product?.description,
  };
}
export default async function Page({
  params,
}: {
  params: Promise<{ feature: string }>;
}) {
  const localize = await getLocalizer();
  const product = productBySlug((await params).feature);
  if (!product) notFound();
  if (product.slug === "templates") return localize(<TemplatesPage />);
  if (product.slug === "analytics") return localize(<AnalyticsPage />);
  return localize(<FeaturePage product={product} />);
}
