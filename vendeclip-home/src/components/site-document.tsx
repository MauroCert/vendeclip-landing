
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import clientKeys from "@/i18n/client-keys.json";
import { getLocalizer } from "@/i18n/server";
import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "@/app/globals.css";
import { PageMotion } from "@/components/page-motion";
import "@/app/public-pages.css";
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
  themeColor: "#ffffff",
  colorScheme: "light",
};
export const metadata: Metadata = {
  title: "VendeClip — Great properties deserve great videos",
  description:
    "Turn property photos into cinematic AI videos, branded reels, and complete listing campaigns. Real estate marketing for agents, teams, and brokerages.",
  robots: { index: false, follow: false },
};
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
      lang={locale === "en-gb" ? "en-GB" : locale}
      className={`${montreal.variable} ${editorial.variable}`}
      style={{ backgroundColor: "#ffffff" }}
    >
      <body style={{ backgroundColor: "#ffffff" }}><NextIntlClientProvider locale={locale} messages={clientMessages}>{children}<PageMotion /></NextIntlClientProvider></body>
    </html>
  ));
}
