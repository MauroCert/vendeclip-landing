
import { useLocalizer } from "@/i18n/use-localizer";
import type { ReactNode } from "react";
import Link from "next/link";
import { CookieSettingsButton } from "./cookie-consent";
export interface LegalSection {
  title: string;
  body?: ReactNode;
  items?: Array<string | ReactNode>;
}
interface LegalPageProps {
  eyebrow: string;
  title: string;
  description: string;
  effectiveDate: string;
  documentNotice?: string;
  sections: LegalSection[];
}
const sectionId = (title: string) =>
  title
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
export function LegalPage({
  eyebrow,
  title,
  description,
  effectiveDate,
  documentNotice,
  sections,
}: LegalPageProps) {
  const localize = useLocalizer();
  return localize((
    <article lang="es" className="legal-document container">
      <header>
        <span className="eyebrow">{eyebrow}</span>
        <h1>{title}</h1>
        <p>{description}</p>
        <span>Fecha de vigencia: {effectiveDate}</span>
        {documentNotice && <p className="legal-notice">{documentNotice}</p>}
      </header>
      <nav aria-label="Contenido del documento">
        <h2>Contenido</h2>
        <ol>
          {sections.map((section) => (
            <li key={section.title}>
              <a href={`#${sectionId(section.title)}`}>{section.title}</a>
            </li>
          ))}
        </ol>
      </nav>
      {sections.map((section, index) => (
        <section key={section.title} id={sectionId(section.title)}>
          <h2>
            {index + 1}. {section.title}
          </h2>
          {section.body && <div>{section.body}</div>}
          {section.items && (
            <ul>
              {section.items.map((item, itemIndex) => (
                <li key={itemIndex}>{item}</li>
              ))}
            </ul>
          )}
        </section>
      ))}
      <aside>
        <h2>Contacto legal</h2>
        <p>
          Para consultas sobre estos documentos, escribinos a{" "}
          <a href="mailto:hola@vendeclip.com">hola@vendeclip.com</a>.
        </p>
        <div className="legal-utility-links"><Link href="/support">Support</Link><Link href="/privacy">Privacy</Link><Link href="/terms">Terms</Link><CookieSettingsButton /></div>
      </aside>
    </article>
  ));
}
