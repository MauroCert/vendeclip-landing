"use client";
import { useLocalizer } from "@/i18n/use-localizer";


import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { MotionControl } from "./creative-motion";

const revealSelectors = [
  "main h1:not(.cinematic-title)",
  ".page-hero-copy > p", ".page-hero-actions", ".page-hero-visual",
  ".plan-card", ".free-plan", ".pricing-custom", ".channel-hero",
  ".format-cards > article", ".example-grid > div", ".example-feature",
  ".resource-article header > p", ".article-image", ".article-body > section",
  ".legal-document header > p", ".legal-document > nav", ".legal-document > section",
  ".auth-form-wrap > p", ".auth-form", ".auth-visual", ".auth-result",
  "[data-template-reveal]", "[data-analytics-reveal]",
  ".platforms > p",
  ".page-section-heading",
  ".product-link-card",
  ".benefit-grid > article",
  ".feature-story",
  ".resource-card",
  ".workflow-explainer > article",
  ".page-cta",
  ".platforms > div > span",
  ".section-heading",
  ".steps > article",
  ".feature-intro",
  ".transformation-demo",
  ".presenter-visual",
  ".presenter-copy",
  ".template-copy",
  ".template-stage",
  ".features-grid > article",
  ".export-strip",
  ".broker-section > div",
  ".faq-section > div:first-child",
  ".faq-list > details",
  ".final-cta",
  ".footer-top > div",
].join(", ");

/** Progressive enhancement: content remains visible without JavaScript or motion. */
export function PageMotion() {
  const localize = useLocalizer();
  const pathname = usePathname();
  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const root = document.documentElement;
    const header = document.querySelector<HTMLElement>(".header");
    const animations = new Set<Animation>();
    let observer: IntersectionObserver | undefined;
    let frame = 0;
    let previewObserver: IntersectionObserver | undefined;
    let mutationObserver: MutationObserver | undefined;
    const tracked = new WeakSet<Element>();
    const blocked = () => preference.matches || root.dataset.designMotion === "paused";
    const previewSelectors = ".feature-art, .page-hero-visual, .channel-hero, .format-cards, .auth-visual";
    function trackContent() {
      document.querySelectorAll<HTMLElement>(revealSelectors).forEach(element => {
        if (!element.classList.contains("is-revealed") && !blocked()) observer?.observe(element);
      });
      document.querySelectorAll<HTMLElement>(previewSelectors).forEach(element => {
        if (!tracked.has(element)) { tracked.add(element); previewObserver?.observe(element); }
      });
    }
    function visibility() { root.dataset.motionHidden = String(document.hidden); }


    function updateHeader() {
      frame = 0;
      header?.classList.toggle("is-scrolled", window.scrollY > 24);
    }
    function onScroll() {
      if (!frame) frame = window.requestAnimationFrame(updateHeader);
    }
    function enableMotion() {
      observer?.disconnect();
      animations.forEach((animation) => animation.cancel());
      animations.clear();
      root.classList.toggle("motion-enabled", !blocked());
      if (
        blocked() ||
        !("IntersectionObserver" in window) ||
        !("animate" in Element.prototype)
      )
        return;

      observer = new IntersectionObserver(
        (entries) => {
          const visible = entries
            .filter((entry) => entry.isIntersecting)
            .sort(
              (a, b) => a.boundingClientRect.top - b.boundingClientRect.top,
            );
          visible.forEach((entry, index) => {
            const element = entry.target as HTMLElement;
            observer?.unobserve(element);
            element.classList.add("is-revealed");
            const isTitle = element.tagName === "H1";
            const isReading = !!element.closest(".legal-document, .article-body");
            const animation = element.animate(
              [
                { opacity: 0, transform: `translateY(${isReading ? 8 : isTitle ? 30 : 24}px)`, filter: isTitle ? "blur(5px)" : "blur(0px)" },
                { opacity: 1, transform: "translateY(0)", filter: "blur(0px)" },
              ],
              {
                duration: 800,
                delay: (index % 3) * 80,
                easing: "cubic-bezier(0.22, 1, 0.36, 1)",
                fill: "backwards",
              },
            );
            animations.add(animation);
            animation.onfinish = () => animations.delete(animation);
          });
        },
        { threshold: 0.08, rootMargin: "0px 0px -24px 0px" },
      );
      trackContent();
    }

    if ("IntersectionObserver" in window) previewObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => { (entry.target as HTMLElement).dataset.motionActive = String(entry.isIntersecting); });
    }, { threshold: .08 });
    mutationObserver = new MutationObserver(trackContent);
    mutationObserver.observe(document.body, { childList: true, subtree: true });
    enableMotion();
    trackContent();
    visibility();
    updateHeader();
    window.addEventListener("vendeclip:motion", enableMotion);
    document.addEventListener("visibilitychange", visibility);
    preference.addEventListener("change", enableMotion);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      observer?.disconnect();
      previewObserver?.disconnect();
      mutationObserver?.disconnect();
      window.removeEventListener("vendeclip:motion", enableMotion);
      document.removeEventListener("visibilitychange", visibility);
      delete root.dataset.motionHidden;
      animations.forEach((animation) => animation.cancel());
      window.cancelAnimationFrame(frame);
      root.classList.remove("motion-enabled");
      header?.classList.remove("is-scrolled");
      preference.removeEventListener("change", enableMotion);
      window.removeEventListener("scroll", onScroll);
    };
  }, [pathname]);
  return localize(<div className="site-motion-control"><MotionControl /></div>);
}
