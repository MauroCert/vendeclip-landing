import { LanguageSwitcher } from "./language-switcher";

import { useLocalizer } from "@/i18n/use-localizer";
import Link from "next/link";
import { Icon, Logo } from "./icon";
import { products } from "@/lib/product-pages";
export function SiteFooter() {
  const localize = useLocalizer();
  return localize((
    <footer className="container footer site-footer">
      <div className="footer-top">
        <div className="footer-brand">
          <Logo />
          <p>
            Every property has a story.
            <br />
            Make yours worth watching.
          </p>
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
          <Link href="/examples">Video examples</Link>
          <Link href="/how-it-works">How it works</Link>
          <a href="https://aprender.vendeclip.com">Help center</a>
          <Link href="/sign-up">
            Create an account <Icon name="arrow" />
          </Link>
          <Link href="/sign-in">Sign in</Link>
        </div>
      </div>
      <div className="footer-bottom">
        <span>
          © {new Date().getFullYear()} VendeClip. All rights reserved.
        </span>
        <div>
          <Link href="/privacy">Privacy</Link>
          <Link href="/terms">Terms</Link>
          <LanguageSwitcher />
        </div>
      </div>
    </footer>
  ));
}
