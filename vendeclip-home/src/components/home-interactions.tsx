"use client";
import { useLocalizer } from "@/i18n/use-localizer";


import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Icon } from "./icon";

export { Header } from "./site-header";

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
