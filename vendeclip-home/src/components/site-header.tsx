"use client";

import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useLocalizer } from "@/i18n/use-localizer";
import { isLocale } from "@/i18n/config";
import { products } from "@/lib/product-pages";
import { Icon, Logo, type IconName } from "./icon";
import { LanguageSwitcher } from "./language-switcher";
import styles from "./site-header.module.css";

type Panel = "product" | "resources";
const resources: {title: string; href: string; icon: IconName}[] = [
  {title: "Resources", href: "/resources", icon: "text"},
  {title: "How it works", href: "/how-it-works", icon: "layers"},
  {title: "Real video examples", href: "/examples", icon: "play"},
  {title: "Integrations", href: "/integrations", icon: "link"},
  {title: "Help center", href: "https://aprender.vendeclip.com", icon: "globe"},
  {title: "Support", href: "/support", icon: "message"},
];

function ProductLinks({compact = false, path}: {compact?: boolean; path: string}) {
  const localize = useLocalizer();
  return localize(<div className={`${styles.productGroups} ${compact ? styles.compact : ""}`}>
    {(["Create & personalize", "Publish & grow"] as const).map((category, index) => <div key={category} className={styles.group}>
      <p className={styles.groupTitle}>{category}</p>
      <div className={index === 0 ? styles.createGrid : styles.growGrid}>
        {products.filter(product => index === 0 ? product.category !== "Publish & grow" : product.category === "Publish & grow").map(product => <Link key={product.slug} href={`/product/${product.slug}`} className={styles.productLink} aria-current={path === `/product/${product.slug}` ? "page" : undefined}>
          <span className={styles.productIcon}><Icon name={product.icon} /></span>
          <span><strong>{product.name}</strong>{!compact && <small>{product.title}</small>}</span>
        </Link>)}
      </div>
    </div>)}
  </div>);
}

// Adapted navigation structure from 21st.dev's Navbar with Dropdowns.
// Floating surface, product cards and transitions use VendeClip's own design system.
export function Header() {
  const localize = useLocalizer();
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);
  if (isLocale(segments[0] ?? "")) segments.shift();
  const path = `/${segments.join("/")}`;
  const [selection, setSelection] = useState<{panel: Panel; pathname: string} | null>(null);
  const panel = selection?.pathname === pathname ? selection.panel : null;
  const root = useRef<HTMLElement>(null);
  const dropdown = useRef<HTMLDivElement>(null);
  const productTrigger = useRef<HTMLButtonElement>(null);
  const resourceTrigger = useRef<HTMLButtonElement>(null);
  const mobileTrigger = useRef<HTMLButtonElement>(null);
  const drawer = useRef<HTMLDialogElement>(null);
  const previousOverflow = useRef<string | null>(null);

  function closeMobile() {
    drawer.current?.close();
    mobileTrigger.current?.setAttribute("aria-expanded", "false");
    if (previousOverflow.current !== null) {
      document.body.style.overflow = previousOverflow.current;
      previousOverflow.current = null;
    }
  }

  useEffect(() => {
    function dismiss(event: PointerEvent) {
      if (!root.current?.contains(event.target as Node)) setSelection(null);
    }
    function closeOnNavigation(event: MouseEvent) {
      // Capture runs before the home page's auth-link interceptor, so auth links
      // also close the mobile drawer before opening the account dialog.
      const target = event.target instanceof Element ? event.target.closest("a[href]") : null;
      if (target && root.current?.contains(target)) { setSelection(null); closeMobile(); }
    }
    const desktop = window.matchMedia("(min-width: 1081px)");
    const resize = () => { setSelection(null); if (desktop.matches) closeMobile(); };
    document.addEventListener("pointerdown", dismiss);
    document.addEventListener("click", closeOnNavigation, true);
    desktop.addEventListener("change", resize);
    return () => {
      document.removeEventListener("pointerdown", dismiss);
      document.removeEventListener("click", closeOnNavigation, true);
      desktop.removeEventListener("change", resize);
      if (previousOverflow.current !== null) document.body.style.overflow = previousOverflow.current;
    };
  }, []);

  function toggle(next: Panel) { setSelection(panel === next ? null : {panel: next, pathname}); }
  function keyboardOpen(event: KeyboardEvent<HTMLButtonElement>, next: Panel) {
    if (event.key !== "ArrowDown") return;
    event.preventDefault();
    setSelection({panel: next, pathname});
    requestAnimationFrame(() => dropdown.current?.querySelector<HTMLAnchorElement>("a")?.focus());
  }
  const resourceActive = resources.some(item => item.href === path || (item.href === "/resources" && path.startsWith("/resources/")));

  return localize(<header ref={root} className={`header ${styles.header}`} onKeyDown={event => {
    if (event.key === "Escape" && panel) {
      event.preventDefault();
      (panel === "product" ? productTrigger : resourceTrigger).current?.focus();
      setSelection(null);
    }
  }} onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setSelection(null); }}>
    <div className={styles.bar}>
      <Logo />
      <nav className={styles.desktopNav} aria-label="Main navigation">
        <button ref={productTrigger} type="button" aria-expanded={panel === "product"} aria-controls="desktop-navigation-panel" className={styles.navItem} data-active={panel === "product" || path.startsWith("/product") && path !== "/product/templates"} onClick={() => toggle("product")} onKeyDown={event => keyboardOpen(event, "product")}>
          Product <Icon name="chevron" />
        </button>
        <Link className={styles.navItem} data-active={path === "/product/templates"} aria-current={path === "/product/templates" ? "page" : undefined} href="/product/templates">Templates</Link>
        <Link className={styles.navItem} data-active={path === "/pricing"} aria-current={path === "/pricing" ? "page" : undefined} href="/pricing">Pricing</Link>
        <button ref={resourceTrigger} type="button" aria-expanded={panel === "resources"} aria-controls="desktop-navigation-panel" className={styles.navItem} data-active={panel === "resources" || resourceActive} onClick={() => toggle("resources")} onKeyDown={event => keyboardOpen(event, "resources")}>
          Resources <Icon name="chevron" />
        </button>
      </nav>
      <div className={styles.actions}>
        <Link className={styles.login} href="/sign-in">Log in</Link>
        <Link className={styles.cta} href="/sign-up">Start for free <span><Icon name="arrow" /></span></Link>
        <button ref={mobileTrigger} type="button" className={styles.mobileToggle} aria-label="Open menu" aria-expanded="false" aria-controls="mobile-navigation" onClick={() => {
          setSelection(null);
          previousOverflow.current = document.body.style.overflow;
          document.body.style.overflow = "hidden";
          drawer.current?.showModal();
          mobileTrigger.current?.setAttribute("aria-expanded", "true");
        }}><span /><span /></button>
      </div>
    </div>

    <div id="desktop-navigation-panel" ref={dropdown} className={`${styles.dropdown} ${panel === "resources" ? styles.resourcePanel : ""}`} hidden={!panel}>
      {panel === "product" && <>
        <div className={styles.productPanel}>
          <ProductLinks path={path} />
          <Link href="/product" className={styles.featureCard}>
            <Image src="/media/costa-villa.webp" alt="" fill sizes="240px" />
            <span className={styles.featureCopy}><small>Explore VendeClip</small><strong>The whole listing, in one place.</strong><span className={styles.featureArrow}><Icon name="arrow" /></span></span>
          </Link>
        </div>
        <div className={styles.panelFooter}><Link href="/how-it-works"><Icon name="layers" />How it works</Link><Link href="/examples">Real video examples <Icon name="arrow" /></Link></div>
      </>}
      {panel === "resources" && <><div className={styles.resourceGrid}>{resources.map(item => <Link key={item.href} href={item.href} className={styles.resourceLink} aria-current={path === item.href ? "page" : undefined}><span className={styles.productIcon}><Icon name={item.icon} /></span><span>{item.title}</span><Icon name="arrow" /></Link>)}</div><div className={styles.panelFooter}><span>Explore VendeClip</span><Link href="/resources">Resources <Icon name="arrow" /></Link></div></>}
    </div>

    <dialog ref={drawer} id="mobile-navigation" className={styles.drawer} aria-label="Main navigation" onCancel={event => { event.preventDefault(); closeMobile(); }} onClose={closeMobile} onClick={event => { if (event.target === event.currentTarget) closeMobile(); }}>
      <div className={styles.drawerInner}>
        <div className={styles.drawerHeader}><Logo /><button type="button" className={styles.closeButton} aria-label="Close menu" onClick={closeMobile}><Icon name="close" /></button></div>
        <nav aria-label="Main navigation" className={styles.mobileNav}>
          <details className={styles.mobileProducts}><summary>Product <Icon name="plus" /></summary><ProductLinks path={path} compact /><Link href="/product" className={styles.allProducts}>Explore VendeClip <Icon name="arrow" /></Link></details>
          <Link className={styles.mobileMainLink} href="/product/templates" aria-current={path === "/product/templates" ? "page" : undefined}>Templates <Icon name="arrow" /></Link>
          <Link className={styles.mobileMainLink} href="/pricing" aria-current={path === "/pricing" ? "page" : undefined}>Pricing <Icon name="arrow" /></Link>
          <p className={styles.groupTitle}>Resources</p>
          <div className={styles.mobileResources}>{resources.map(item => <Link key={item.href} href={item.href} aria-current={path === item.href ? "page" : undefined}><Icon name={item.icon} />{item.title}</Link>)}</div>
        </nav>
        <div className={styles.drawerFooter}><div className={styles.mobileAuth}><Link className={styles.login} href="/sign-in">Log in</Link><Link className={styles.cta} href="/sign-up">Start for free <span><Icon name="arrow" /></span></Link></div><LanguageSwitcher /></div>
      </div>
    </dialog>
  </header>);
}
