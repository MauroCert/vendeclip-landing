
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import clientKeys from "@/i18n/client-keys.json";
import { getLocalizer } from "@/i18n/server";
import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "@/app/globals.css";
import { PageMotion } from "@/components/page-motion";
import { CookieConsent } from "@/components/cookie-consent";
import "@/app/public-pages.css";
import "@/app/brand-theme.css";
const montreal = localFont({
  src: [
    { path: "../fonts/montreal-400.woff2", weight: "400", style: "normal" },
    { path: "../fonts/montreal-400-italic.woff2", weight: "400", style: "italic" },
    { path: "../fonts/montreal-500.woff2", weight: "500", style: "normal" },
    { path: "../fonts/montreal-700.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-montreal",
  display: "swap",
});
const editorial = localFont({
  src: [
    { path: "../fonts/editorial-400.woff2", weight: "400", style: "normal" },
    { path: "../fonts/editorial-400-italic.woff2", weight: "400", style: "italic" },
    { path: "../fonts/editorial-700.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-editorial",
  display: "swap",
});
export const viewport: Viewport = {
  themeColor: "#faf9f5",
  colorScheme: "light",
};
export const metadata: Metadata = {};
export default async function SiteDocument({
  children, locale,
}: Readonly<{ children: React.ReactNode; locale: string }>) {
  const localize = await getLocalizer();
  const messages = await getMessages();
  const copy = messages.copy as Record<string, string>;
  const clientMessages = {copy: Object.fromEntries(clientKeys.map(key => {
    const encoded = encodeURIComponent(key).replace(/\./g, "%2E");
    return [encoded, copy[encoded]];
  }).filter(([, value]) => value !== undefined))};
  return localize((
    <html
      // Browser extensions can add root attributes before React hydrates.
      // Limit suppression to this element; descendants retain hydration checks.
      suppressHydrationWarning
      lang={locale === "en-gb" ? "en-GB" : locale}
      className={`${montreal.variable} ${editorial.variable}`}
      style={{ backgroundColor: "var(--background)" }}
    >
      <body style={{ backgroundColor: "var(--background)" }}><NextIntlClientProvider locale={locale} messages={clientMessages}>{children}<PageMotion /><CookieConsent /></NextIntlClientProvider></body>
    </html>
  ));
}
