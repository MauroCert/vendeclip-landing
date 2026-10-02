"use client";
import { useLocalizer } from "@/i18n/use-localizer";


import Image from "next/image";
import Link from "next/link";
import { products } from "@/lib/product-pages";
import { useEffect, useRef, useState } from "react";
import { Icon, Logo } from "./icon";

export function Header() {
  const localize = useLocalizer();
  const [open, setOpen] = useState(false);
  const menu = useRef<HTMLDetailsElement>(null);
  useEffect(() => {
    function dismiss(event: PointerEvent) {
      if (menu.current && !menu.current.contains(event.target as Node))
        menu.current.open = false;
    }
    function escape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        if (menu.current) menu.current.open = false;
        setOpen(false);
      }
    }
    document.addEventListener("pointerdown", dismiss);
    document.addEventListener("keydown", escape);
    return () => {
      document.removeEventListener("pointerdown", dismiss);
      document.removeEventListener("keydown", escape);
    };
  }, []);
  function closeMenu() {
    setOpen(false);
    if (menu.current) menu.current.open = false;
  }
  return localize((
    <header className="header">
      <div className="container nav">
        <Logo />
        <nav
          className={open ? "nav-links is-open" : "nav-links"}
          aria-label="Main navigation"
          id="main-navigation"
        >
          <details className="product-nav" ref={menu}>
            <summary>
              Product <Icon name="chevron" />
            </summary>
            <div className="product-menu">
              <Link
                href="/product"
                className="product-menu-intro"
                onClick={closeMenu}
              >
                <strong>The whole listing, in one place.</strong>
                <span>
                  Explore VendeClip <Icon name="arrow" />
                </span>
              </Link>
              <div className="product-menu-grid">
                {products.map((product) => (
                  <Link
                    key={product.slug}
                    href={`/product/${product.slug}`}
                    onClick={closeMenu}
                  >
                    <Icon name={product.icon} />
                    <span>{product.name}</span>
                  </Link>
                ))}
              </div>
              <div className="product-menu-bottom">
                <Link href="/how-it-works" onClick={closeMenu}>
                  How it works <Icon name="arrow" />
                </Link>
                <Link href="/examples" onClick={closeMenu}>
                  Real video examples <Icon name="play" />
                </Link>
              </div>
            </div>
          </details>
          <Link href="/product/templates" onClick={closeMenu}>
            Templates
          </Link>
          <Link href="/pricing" onClick={closeMenu}>
            Pricing
          </Link>
          <Link href="/resources" onClick={closeMenu}>
            Resources
          </Link>
        </nav>
        <div className="nav-actions">
          <Link className="login-link" href="/sign-in">
            Log in
          </Link>
          <Link className="button button-small" href="/sign-up">
            Start creating <Icon name="arrow" />
          </Link>
          <button
            className="menu-toggle"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="main-navigation"
            onClick={() => setOpen(!open)}
          >
            <Icon name={open ? "close" : "menu"} />
          </button>
        </div>
      </div>
    </header>
  ));
}

export function VideoCard({
  title,
  label,
  poster,
  posterAlt,
  video,
  large = false,
  autoplay = false,
  priority = false,
}: {
  title: string;
  label: string;
  poster: string;
  posterAlt?: string;
  video: string;
  large?: boolean;
  autoplay?: boolean;
  priority?: boolean;
}) {
  const localize = useLocalizer();
  const dialog = useRef<HTMLDialogElement>(null);
  const background = useRef<HTMLVideoElement>(null);
  const player = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const userPaused = useRef(false);
  const [error, setError] = useState(false);
  useEffect(() => {
    const element = background.current;
    if (!element || !autoplay) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !motion.matches && !userPaused.current)
          element.play().catch(() => {});
        else element.pause();
      },
      { threshold: 0.2 },
    );
    const onPreference = () => {
      if (motion.matches) element.pause();
    };
    observer.observe(element);
    motion.addEventListener("change", onPreference);
    return () => {
      observer.disconnect();
      motion.removeEventListener("change", onPreference);
    };
  }, [autoplay]);
  function openVideo() {
    userPaused.current = true;
    background.current?.pause();
    dialog.current?.showModal();
    player.current?.play().catch(() => {});
  }
  return localize((
    <>
      <article className={`video-card ${large ? "video-card-large" : ""}`}>
        <Image
          src={poster}
          alt={posterAlt ?? title}
          fill
          sizes={
            large
              ? "(max-width: 700px) 92vw, 54vw"
              : "(max-width: 700px) 72vw, 23vw"
          }
          priority={priority}
        />
        {autoplay && (
          <video
            ref={background}
            src={video}
            poster={poster}
            muted
            playsInline
            loop
            preload="none"
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
            aria-hidden="true"
            tabIndex={-1}
          />
        )}
        <div className="video-shade" />
        <span className="video-badge">
          <span className="status-dot" />
          Made with VendeClip
        </span>
        <button
          className="video-open"
          onClick={openVideo}
          aria-label={`Watch ${title}`}
        >
          <span className="play-circle">
            <Icon name="play" />
          </span>
        </button>
        <div className="video-caption">
          <div>
            <span>{label}</span>
            <h2>{title}</h2>
          </div>
          <span className="format-tag">{large ? "16:9" : "9:16"}</span>
        </div>
        {autoplay && (
          <button
            className="ambient-toggle"
            aria-label={
              playing ? "Pause background video" : "Play background video"
            }
            onClick={() => {
              const el = background.current;
              if (!el) return;
              userPaused.current = playing;
              if (playing) el.pause();
              else el.play().catch(() => {});
            }}
          >
            <Icon name={playing ? "pause" : "play"} />
          </button>
        )}
      </article>
      <dialog
        className="video-dialog"
        ref={dialog}
        aria-label={title}
        onClick={(e) => {
          if (e.target === e.currentTarget) dialog.current?.close();
        }}
        onClose={() => player.current?.pause()}
      >
        <div className="dialog-header">
          <div>
            <span className="eyebrow">MADE WITH VENDECLIP</span>
            <h2>{title}</h2>
          </div>
          <button
            className="icon-button"
            onClick={() => dialog.current?.close()}
            aria-label="Close video"
          >
            <Icon name="close" />
          </button>
        </div>
        <video
          ref={player}
          src={video}
          poster={poster}
          controls
          playsInline
          preload="none"
          onError={() => setError(true)}
        />
        {error && (
          <p className="media-error">
            This video couldn’t load.{" "}
            <a href={video}>Open the video directly</a>.
          </p>
        )}
        <p className="dialog-note">
          An example from the VendeClip video library.{" "}
          <Link href="/sign-up">
            Create your own <Icon name="arrow" />
          </Link>
        </p>
      </dialog>
    </>
  ));
}

const templates = [
  {
    id: "ai-motion-reel",
    name: "Cinematic",
    subtitle: "Give every room a sense of movement.",
    description:
      "Gentle camera moves turn your listing photos into an inviting property tour.",
    format: "AI motion reel",
    icon: "sparkles" as const,
  },
  {
    id: "magazine",
    name: "Editorial",
    subtitle: "A little more character. A lot more impact.",
    description:
      "Thoughtful typography and clean layouts put the details of your property in the spotlight.",
    format: "Magazine style",
    icon: "layers" as const,
  },
  {
    id: "carousel",
    name: "Carousel",
    subtitle: "Tell the whole story, one scene at a time.",
    description:
      "Highlight the spaces, features, and small details that make a property feel like home.",
    format: "Social carousel",
    icon: "image" as const,
  },
  {
    id: "slide-cards",
    name: "Slide cards",
    subtitle: "Make the first impression count.",
    description:
      "A lively sequence of property photos, composed for the pace of social media.",
    format: "Slide card reel",
    icon: "film" as const,
  },
];
export function TemplateShowcase() {
  const localize = useLocalizer();
  const [selected, setSelected] = useState(0);
  const current = templates[selected];
  return localize((
    <div className="template-showcase">
      <div className="template-copy">
        <span className="eyebrow">ALWAYS YOUR STYLE</span>
        <h2>
          Different properties.
          <br />
          Same great impression.
        </h2>
        <p>
          From a city apartment to a coastal escape, find a look that feels
          right for your listing.
        </p>
        <div
          className="template-picker"
          role="group"
          aria-label="Choose a video template"
        >
          {templates.map((template, index) => (
            <button
              key={template.id}
              aria-pressed={index === selected}
              onClick={() => setSelected(index)}
            >
              <Icon name={template.icon} />
              {template.name}
              <Icon name={index === selected ? "check" : "arrow"} />
            </button>
          ))}
        </div>
        <Link href="/product/templates" className="text-link">
          Explore all templates <Icon name="arrow" />
        </Link>
      </div>
      <div className="template-stage">
        <div className="template-annotation" key={`copy-${current.id}`}>
          <span className="small-overline">YOUR LISTING, ELEVATED</span>
          <h3>{current.subtitle}</h3>
          <p>{current.description}</p>
          <span className="template-format">
            <Icon name="film" />
            {current.format}
          </span>
        </div>
        <div className="template-phone" key={current.id}>
          <VideoCard
            title={current.name}
            label="TEMPLATE PREVIEW"
            poster={`/media/${current.id}-poster.jpg`}
            video={`/media/${current.id}-preview.mp4`}
          />
        </div>
        <div className="template-detail">
          <Icon name="check" />
          Your logo, colors, and contact details
        </div>
      </div>
    </div>
  ));
}
