
import { useLocalizer } from "@/i18n/use-localizer";
import { getLocalizer } from "@/i18n/server";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { resources } from "@/lib/resources";
import { Icon } from "@/components/icon";
import { PageCTA } from "@/components/public-components";
export function generateStaticParams() {
  return resources.map((resource) => ({ article: resource.slug }));
}
export const dynamicParams = false;
export async function generateMetadata({
  params,
}: {
  params: Promise<{ article: string }>;
}) {
  const { article } = await params;
  const selected = resources.find((r) => r.slug === article);
  return { title: `${selected?.title ?? "Resources"} | VendeClip` };
}
export default async function ResourcePage({
  params,
}: {
  params: Promise<{ article: string }>;
}) {
  const localize = await getLocalizer();
  const { article } = await params;
  const resource = resources.find((r) => r.slug === article);
  if (!resource) notFound();
  return localize((
    <>
      <article className="resource-article container">
        <Link href="/resources" className="text-link">
          <Icon name="arrow" className="back-arrow" /> All resources
        </Link>
        <header>
          <span className="eyebrow">
            {resource.category} · A VENDECLIP GUIDE
          </span>
          <h1>{resource.title}</h1>
          <p>{resource.intro}</p>
        </header>
        <div className="article-image">
          <Image
            src={resource.image}
            alt="Example property"
            fill
            sizes="(max-width: 800px) 90vw, 800px"
          />
        </div>
        <div className="article-body">
          {resource.sections.map(([title, copy]) => (
            <section key={title}>
              <h2>{title}</h2>
              <p>{copy}</p>
            </section>
          ))}
          <aside>
            <h2>Before you move on</h2>
            <ul>
              {resource.checklist.map((item) => (
                <li key={item}>
                  <Icon name="check" />
                  {item}
                </li>
              ))}
            </ul>
            <Link href={`/product/${resource.related}`} className="text-link">
              Explore the tools <Icon name="arrow" />
            </Link>
          </aside>
        </div>
      </article>
      <PageCTA />
    </>
  ));
}
