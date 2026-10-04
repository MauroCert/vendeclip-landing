import Link from "next/link";
import { useLocalizer } from "@/i18n/use-localizer";
import type { Locale } from "@/i18n/config";
import copy from "@/i18n/support-copy.json";
import { Icon } from "@/components/icon";
import { CookieSettingsButton } from "@/components/cookie-consent";

export const metadata = { title: "Support | VendeClip", description: "Help with your VendeClip account, credits, billing, video creation and ChatGPT connection." };

export default function SupportPage() {
  const localize = useLocalizer();
  const text = copy[localize.locale as Locale];
  return localize(<article className="support-page container">
    <header className="support-header">
      <span className="eyebrow">VendeClip / {text.support}</span>
      <h1>{text.title}</h1>
      <p>{text.intro}</p>
      <a className="support-contact" href="mailto:hola@vendeclip.com"><span>{text.contact}<strong>hola@vendeclip.com</strong></span><Icon name="arrow" /></a>
    </header>
    <div className="support-sections">
      <section><span className="support-section-icon"><Icon name="message" /></span><h2>{text.helpTitle}</h2><p>{text.help}</p></section>
      <section><span className="support-section-icon"><Icon name="sparkles" /></span><h2>{text.chatTitle}</h2><p>{text.chat}</p><p>{text.progress}</p></section>
    </div>
    <nav className="legal-utility-links" aria-label="Support"><Link href="/privacy">Privacy</Link><Link href="/terms">Terms</Link><CookieSettingsButton /></nav>
  </article>);
}
