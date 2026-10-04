import { LanguageSwitcher } from "./language-switcher";
import { CookieSettingsButton } from "./cookie-consent";

import { useLocalizer } from "@/i18n/use-localizer";
import Link from "next/link";
import Image from "next/image";
import { Icon, Logo, type IconName } from "./icon";
import { products } from "@/lib/product-pages";
// Destinations match the current VendeClip landing footer; four are platform roots.
const socialLinks: {name: string; icon: IconName; href: string}[] = [
  {name: "Instagram", icon: "instagram", href: "https://instagram.com/vendeclip"},
  {name: "TikTok", icon: "tiktok", href: "https://tiktok.com"},
  {name: "YouTube", icon: "youtube", href: "https://youtube.com"},
  {name: "WhatsApp", icon: "whatsapp", href: "https://whatsapp.com"},
  {name: "Facebook", icon: "facebook", href: "https://facebook.com"},
  {name: "LinkedIn", icon: "linkedin", href: "https://www.linkedin.com/company/vendeclip/"},
];
export function SiteFooter() {
  const localize = useLocalizer();
  return localize((
    <footer className="container footer site-footer" id="site-footer">
      <div className="footer-invitation">
        <h2>Every property has a story.<br /><em>Make yours worth watching.</em></h2>
        <Link href="/sign-up" className="footer-create">Start for free <Icon name="arrow" /></Link>
      </div>
      <div className="footer-top">
        <div className="footer-brand">
          <Logo />
          <p>
            Every property has a story.
            <br />
            Make yours worth watching.
          </p>
          <div className="footer-socials">
            {socialLinks.map(({name, icon, href}) => <a key={name} href={href} aria-label={name} title={name} target="_blank" rel="noopener noreferrer"><Icon name={icon} /></a>)}
          </div>
        </div>
        <div>
          <h3>Create & personalize</h3>
          {products
            .filter((p) => p.category !== "Publish & grow")
            .map((p) => (
              <Link key={p.slug} href={`/product/${p.slug}`}>
                {p.name}
              </Link>
            ))}
        </div>
        <div>
          <h3>Publish & grow</h3>
          {products
            .filter((p) => p.category === "Publish & grow")
            .map((p) => (
              <Link key={p.slug} href={`/product/${p.slug}`}>
                {p.name}
              </Link>
            ))}
          <Link href="/integrations">Integrations</Link>
          <Link href="/pricing">Pricing</Link>
        </div>
        <div>
          <h3>Explore VendeClip</h3>
          <Link href="/resources">Resources</Link>
          <a href={`/${localize.locale}#markets`}>Markets</a>
          <Link href="/examples">Video examples</Link>
          <Link href="/how-it-works">How it works</Link>
          <a href="https://aprender.vendeclip.com">Help center</a>
          <Link href="/support">Support</Link>
          <Link href="/sign-up">
            Create an account <Icon name="arrow" />
          </Link>
          <Link href="/sign-in">Sign in</Link>
        </div>
      </div>
      <div className="footer-newsletter">
        <div><h3>Newsletter</h3><p>Get tips and updates to sell more with video.</p></div>
        <a href={`https://vendeclip.com/${localize.locale}#newsletter-email`}>Subscribe on VendeClip <Icon name="arrow" /></a>
      </div>
      <div className="footer-wordmark" aria-hidden="true"><Image src="/brand/vendeclip-wordmark.svg" alt="" width={647} height={150} sizes="(max-width: 760px) 90vw, 80vw" className="footer-wordmark-image" unoptimized /><i>↗</i></div>
      <div className="footer-bottom">
        <span>
          © {new Date().getFullYear()} VendeClip. All rights reserved.
        </span>
        <div>
          <Link href="/privacy">Privacy</Link>
          <Link href="/terms">Terms</Link>
          <CookieSettingsButton />
          <LanguageSwitcher />
        </div>
      </div>
    </footer>
  ));
}
