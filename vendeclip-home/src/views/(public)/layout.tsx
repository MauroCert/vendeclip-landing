
import { useLocalizer } from "@/i18n/use-localizer";
import { Header } from "@/components/home-interactions";
import { SiteFooter } from "@/components/site-footer";
export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const localize = useLocalizer();
  return localize((
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Header />
      <main id="main" className="public-page">
        {children}
      </main>
      <SiteFooter />
    </>
  ));
}
