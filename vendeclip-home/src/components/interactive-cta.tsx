
import { useLocalizer } from "@/i18n/use-localizer";
import Link from "next/link";
import { Icon } from "./icon";

/** Adapted from Dillion Verma's Interactive Hover Button on 21st / Magic UI.
 * https://21st.dev/@dillionverma/components/interactive-hover-button
 * Uses the site's CSS and icons, with native link semantics and keyboard support.
 */
export function InteractiveCta({ href = "/sign-up", children = "Create your first video", className = "" }: { href?: string; children?: string; className?: string }) {
  const localize = useLocalizer();
  return localize(<Link href={href} className={`button interactive-cta ${className}`}>
    <span className="cta-default"><i aria-hidden="true" />{children}</span>
    <span className="cta-hover" aria-hidden="true">{children}<Icon name="arrow" /></span>
    <span className="cta-fill" aria-hidden="true" />
  </Link>);
}
