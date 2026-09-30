"use client";
import { useCountry } from "@/i18n/use-country";
import { useLocalizer } from "@/i18n/use-localizer";

import { regionalPrices, pricingCountries, currencyForCountry } from "@/lib/regional-pricing";
import Image from "next/image";
import { InteractiveCta } from "./interactive-cta";
import Link from "next/link";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Icon } from "./icon";
import { VideoCard } from "./home-interactions";
import type { ProductPage } from "@/lib/product-pages";

const exampleVideos = [
  {
    id: "ai-motion-reel",
    title: "Cinematic",
    label: "Natural movement. A lasting impression.",
    category: "Cinematic",
  },
  {
    id: "magazine",
    title: "Editorial",
    label: "A little more character.",
    category: "Editorial",
  },
  {
    id: "carousel",
    title: "Carousel",
    label: "Every detail gets its moment.",
    category: "Social",
  },
  {
    id: "slide-cards",
    title: "Slide cards",
    label: "Made for the scroll.",
    category: "Social",
  },
];
export function TemplateGallery() {
  const localize = useLocalizer();
  const [filter, setFilter] = useState("All styles");
  return localize((
    <>
      <div
        className="pill-filters"
        role="group"
        aria-label="Filter video styles"
      >
        {["All styles", "Cinematic", "Editorial", "Social"].map((item) => (
          <button
            key={item}
            aria-pressed={filter === item}
            onClick={() => setFilter(item)}
          >
            {item}
          </button>
        ))}
      </div>
      <div className="example-grid">
        {exampleVideos
          .filter((item) => filter === "All styles" || item.category === filter)
          .map((item) => (
            <div key={item.id}>
              <VideoCard
                title={item.title}
                label={item.label}
                poster={`/media/${item.id}-poster.jpg`}
                video={`/media/${item.id}-preview.mp4`}
              />
              <p>{item.label}</p>
            </div>
          ))}
      </div>
      <p className="page-fineprint">
        Actual VendeClip template previews. Available styles and options vary by
        plan.
      </p>
    </>
  ));
}
const musicTracks = [
  {
    id: "coastal-light",
    title: "Coastal Light",
    mood: "Warm · Airy · Inviting",
  },
  {
    id: "quiet-luxury",
    title: "Quiet Luxury",
    mood: "Calm · Refined · Spacious",
  },
  {
    id: "modern-move",
    title: "Modern Move",
    mood: "Confident · Contemporary · Upbeat",
  },
];
export function MusicLibrary() {
  const localize = useLocalizer();
  const audio = useRef<HTMLAudioElement>(null);
  const [active, setActive] = useState<string | null>(null);
  const [playing, setPlaying] = useState(false);
  const [error, setError] = useState("");
  useEffect(() => {
    const player = audio.current;
    return () => player?.pause();
  }, []);
  function play(id: string) {
    const player = audio.current;
    if (!player) return;
    if (active === id && playing) {
      player.pause();
      return;
    }
    setError("");
    if (active !== id) {
      player.src = `/media/products/${id}.mp3`;
      setActive(id);
    }
    player
      .play()
      .catch(() => setError("This preview couldn’t play. Please try again."));
  }
  return localize((
    <div className="music-library">
      <audio
        ref={audio}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={() => setPlaying(false)}
        onError={() => setError("This preview couldn’t load.")}
      />
      {musicTracks.map((track, index) => (
        <div
          className="music-track"
          key={track.id}
          data-playing={active === track.id && playing}
        >
          <button
            onClick={() => play(track.id)}
            aria-label={`${active === track.id && playing ? "Pause" : "Play"} ${track.title}`}
          >
            <Icon name={active === track.id && playing ? "pause" : "play"} />
          </button>
          <div>
            <strong>{track.title}</strong>
            <span>{track.mood}</span>
          </div>
          <div className="track-wave" aria-hidden="true">
            {Array.from({ length: 32 }, (_, i) => (
              <i
                key={i}
                style={{
                  height: `${18 + ((i * 17 + index * 13) % 65)}%`,
                  animationDelay: `${i * 30}ms`,
                }}
              />
            ))}
          </div>
          <span className="track-duration">0:20</span>
        </div>
      ))}
      {error && (
        <p role="alert" className="media-error">
          {error}
        </p>
      )}
    </div>
  ));
}
const captions = {
  Instagram:
    "A home that brings the outdoors in. Explore bright living spaces, a garden, and a pool by the lagoon. Ready for a closer look? Get in touch to arrange a viewing.\n\n#PropertyTour #WaterfrontHome #RealEstate",
  WhatsApp:
    "Hi! Here’s a property you might like: a home by the lagoon, with a garden, pool, and bright living spaces. Take a look at the video and let me know if you’d like to arrange a viewing.",
  YouTube:
    "Tour a home by the lagoon in Nordelta. See the living spaces, garden, and pool, then get in touch for more property details or to arrange a viewing.",
};
export function FeatureDemo({ product }: { product: ProductPage }) {
  const localize = useLocalizer();
  const [platform, setPlatform] = useState<keyof typeof captions>("Instagram");
  const [copied, setCopied] = useState(false);
  const [tone, setTone] = useState("Warm");
  const [color, setColor] = useState("#191919");
  async function copy() {
    try {
      await navigator.clipboard.writeText(localize.text(captions[platform]));
      setCopied(true);
    } catch {
      setCopied(false);
    }
  }
  if (product.slug === "ai-video")
    return localize((
      <div className="feature-video-demo">
        <video
          src="/media/costa-villa.mp4"
          poster={product.image}
          controls
          muted
          playsInline
          preload="none"
          aria-label="Cinematic AI property video"
        />
        <span className="demo-floating-label">
          <Icon name="sparkles" /> From a listing photo to a moving scene
        </span>
      </div>
    ));
  if (product.slug === "templates")
    return localize((
      <div className="template-hero-collage">
        <Image
          src="/media/magazine-poster.jpg"
          alt="Editorial video template"
          width={270}
          height={480}
        />
        <Image
          src="/media/ai-motion-reel-poster.jpg"
          alt="Cinematic video template"
          width={270}
          height={480}
        />
        <span className="demo-floating-label">
          Your listing. Your kind of story.
        </span>
      </div>
    ));
  if (product.slug === "music")
    return localize((
      <div className="music-hero">
        <div className="music-hero-image">
          <Image
            src={product.image}
            alt="Coastal living room"
            fill
            sizes="45vw"
          />
          <span>
            <Icon name="music" /> Find the feeling.
          </span>
        </div>
        <Link href="#music-library" className="music-demo-link">
          Explore the soundtrack library <Icon name="arrow" />
        </Link>
      </div>
    ));
  if (product.slug === "captions")
    return localize((
      <div className="demo-panel caption-demo">
        <div className="demo-panel-top">
          <Icon name="text" />
          <span>The words behind the video</span>
          <span className="sample-tag">Example</span>
        </div>
        <div
          className="pill-filters"
          role="group"
          aria-label="Caption destination"
        >
          {Object.keys(captions).map((item) => (
            <button
              key={item}
              aria-pressed={platform === item}
              onClick={() => {
                setPlatform(item as keyof typeof captions);
                setCopied(false);
              }}
            >
              {item}
            </button>
          ))}
        </div>
        <p className="caption-copy" key={platform}>{captions[platform]}</p>
        <button className="button button-small" onClick={copy}>
          <Icon name="text" />
          {copied ? "Copied" : "Copy caption"}
        </button>
        <span className="sr-only" role="status">
          {copied ? "Caption copied to clipboard" : ""}
        </span>
      </div>
    ));
  if (product.slug === "voiceover")
    return localize((
      <div className="demo-panel voice-demo">
        <div className="voice-demo-image">
          <Image
            src={product.image}
            alt="Terrace with a city view"
            fill
            sizes="45vw"
          />
        </div>
        <div className="voice-demo-body">
          <span className="eyebrow">SCRIPT PREVIEW</span>
          <div
            className="pill-filters"
            role="group"
            aria-label="Narration tone"
          >
            {["Warm", "Editorial", "Direct"].map((item) => (
              <button
                key={item}
                aria-pressed={tone === item}
                onClick={() => setTone(item)}
              >
                {item}
              </button>
            ))}
          </div>
          <blockquote key={tone}>
            {tone === "Warm"
              ? "“Imagine mornings out here. Open skies, room to breathe, and a city full of possibilities just beyond your door.”"
              : tone === "Editorial"
                ? "“An open-air retreat above the city. Considered spaces, natural light, and a terrace that becomes an extension of home.”"
                : "“Explore this city property with a private terrace and bright living spaces. Get in touch to arrange a viewing.”"}
          </blockquote>
          <span>
            <Icon name="mic" /> Your script. Your choice of voice.
          </span>
        </div>
      </div>
    ));
  if (product.slug === "branding")
    return localize((
      <div
        className="brand-demo"
        style={{ "--demo-brand": color } as CSSProperties}
      >
        <div className="brand-demo-image">
          <Image
            src={product.image}
            alt="Example branded coastal property"
            fill
            sizes="45vw"
          />
          <div>
            <span>YOUR AGENCY</span>
            <strong>The coastal collection</strong>
            <span>Find your next home →</span>
          </div>
        </div>
        <div className="brand-demo-controls">
          <span>Try a signature color</span>
          <div role="group" aria-label="Preview brand color">
            {["#191919", "#1c4762", "#774032", "#356450"].map(
              (value, index) => (
                <button
                  key={value}
                  style={{ background: value }}
                  aria-label={
                    ["Charcoal", "Navy", "Terracotta", "Forest"][index]
                  }
                  aria-pressed={color === value}
                  onClick={() => setColor(value)}
                >
                  {color === value && <Icon name="check" />}
                </button>
              ),
            )}
          </div>
        </div>
      </div>
    ));
  if (product.slug === "presenter")
    return localize((
      <div className="presenter-page-demo">
        <Image
          src={product.image}
          alt="Example AI real estate presenter"
          fill
          sizes="45vw"
        />
        <div className="presenter-page-caption">
          <span className="eyebrow">YOUR PERSONAL INTRODUCTION</span>
          <h3>“Let me show you around.”</h3>
          <span>
            <Icon name="mic" /> Your image + your voice
          </span>
        </div>
      </div>
    ));
  if (product.slug === "website")
    return localize((
      <div className="demo-panel website-demo">
        <div className="demo-browser">
          <i />
          <i />
          <i />
          <span>your-agency.example</span>
        </div>
        <div className="website-demo-image">
          <Image
            src={product.image}
            alt="Example property website"
            fill
            sizes="45vw"
          />
          <span>Find a place to call home.</span>
        </div>
        <div className="website-demo-body">
          <span className="eyebrow">YOUR AGENCY · PROPERTY COLLECTION</span>
          <h3>A little closer to your next home.</h3>
          <p>Property video. Full details. A direct conversation.</p>
          <Link href="/examples" className="text-link">
            Explore property videos <Icon name="arrow" />
          </Link>
        </div>
      </div>
    ));
  if (product.slug === "leads")
    return localize((
      <div className="demo-panel leads-demo">
        <div className="demo-panel-top">
          <Icon name="message" />
          <span>Every inquiry has a story</span>
          <span className="sample-tag">Sample data</span>
        </div>
        {[
          ["AL", "Alex", "Lake House", "Interested in a viewing"],
          ["JM", "Jamie", "Costa Villa", "Asked for more details"],
          ["SR", "Sam", "Patagonia Retreat", "Sent a property inquiry"],
        ].map(([initials, name, property, note]) => (
          <div className="lead-demo-row" key={initials}>
            <span>{initials}</span>
            <div>
              <strong>{name}</strong>
              <span>
                {property} · {note}
              </span>
            </div>
            <Icon name="message" />
          </div>
        ))}
        <p className="demo-panel-note">
          The person, the property, and the next conversation.
        </p>
      </div>
    ));
  return localize((
    <div className="demo-panel analytics-demo">
      <div className="demo-panel-top">
        <Icon name="chart" />
        <span>Property activity</span>
        <span className="sample-tag">Sample data</span>
      </div>
      <div className="analytics-numbers">
        <div>
          <span>Page views</span>
          <strong>248</strong>
        </div>
        <div>
          <span>Video plays</span>
          <strong>156</strong>
        </div>
        <div>
          <span>Inquiries</span>
          <strong>8</strong>
        </div>
      </div>
      <div
        className="analytics-bars"
        role="img"
        aria-label="Illustrative property page activity across seven days"
      >
        {[28, 43, 32, 68, 52, 91, 74].map((value, index) => (
          <div key={index}>
            <i style={{ height: `${value}%` }} />
            <span>{new Intl.DateTimeFormat(localize.locale, { weekday: "narrow", timeZone: "UTC" }).format(new Date(Date.UTC(2026, 8, 7 + index)))}</span>
          </div>
        ))}
      </div>
      <p className="demo-panel-note">
        Follow views through to meaningful interest.
      </p>
    </div>
  ));
}
export function PricingCards() {
  const localize = useLocalizer();
  const [yearly, setYearly] = useState(false);
  const [country, selectCountry] = useCountry();
  const currency = currencyForCountry(country);
  const regionNames = new Intl.DisplayNames([localize.locale], { type: "region" });
  const countries = pricingCountries.map(code => ({ code, name: regionNames.of(code) ?? code }))
    .sort((a, b) => a.name.localeCompare(b.name, localize.locale));
  const plans = [
    {
      name: "Essential",
      videos: 3,
      edits: 15,
      description: "A consistent presence for your next listings.",
      details: [
        "1080p exports without a watermark",
        "Up to 20 AI clips per video",
        "Videos up to 60 seconds",
        "Your presenter on paid plans",
      ],
    },
    {
      name: "Growth",
      videos: 10,
      edits: 80,
      description: "More room for a growing property portfolio.",
      details: [
        "Everything in Essential",
        "Image uploads up to 25 MB",
        "Priority human support",
        "More monthly video capacity",
      ],
    },
    {
      name: "Pro",
      videos: 20,
      edits: 200,
      description: "For teams making every listing count.",
      details: [
        "Everything in Growth",
        "Dedicated account support",
        "Faster video processing",
        "More AI photo editing capacity",
      ],
    },
  ];
  return localize((
    <>
      <div className="pricing-region">
        <label htmlFor="pricing-country">Billing country</label>
        <select id="pricing-country" value={country} onChange={event => selectCountry(event.target.value)}>
          <option value="" disabled>Choose your country</option>
          {countries.map(({ code, name }) => <option key={code} value={code}>{name}</option>)}
        </select>
        <p>Choose your billing country to see local prices. Your language stays the same.</p>
      </div>
      <div
        className="billing-switch"
        role="group"
        aria-label="Billing interval"
      >
        <button aria-pressed={!yearly} onClick={() => setYearly(false)}>
          Monthly
        </button>
        <button aria-pressed={yearly} onClick={() => setYearly(true)}>
          Yearly <span>Save about 20%</span>
        </button>
      </div>
      <div className="pricing-grid">
        {plans.map((plan, index) => (
          <article
            key={plan.name}
            className={index === 1 ? "plan-card plan-featured" : "plan-card"}
          >
            {index === 1 && (
              <span className="plan-ribbon">For growing teams</span>
            )}
            <h2>{plan.name}</h2>
            <p>{plan.description}</p>
            <div className="plan-price" key={String(yearly)}>
              <strong>
                {country ? new Intl.NumberFormat(localize.locale, { style: "currency", currency, minimumFractionDigits: yearly ? 2 : 0, maximumFractionDigits: 2 }).format(yearly ? regionalPrices[currency][index].annual / 12 : regionalPrices[currency][index].monthly) : "—"}
              </strong>
              <span>/ month</span>
            </div>
            <span className="plan-billing">
              {country ? <>{yearly ? `${new Intl.NumberFormat(localize.locale, { style: "currency", currency, maximumFractionDigits: 0 }).format(regionalPrices[currency][index].annual)} billed yearly` : "Billed monthly"} · {currency}</> : "Choose your country"}
            </span>
            <InteractiveCta className={index === 1 ? "" : "cta-outline"}>Get started</InteractiveCta>
            <strong className="plan-allocation">
              {plan.videos} videos per month
            </strong>
            <ul>
              {[`${plan.edits} AI photo edits per month`, ...plan.details].map(
                (detail) => (
                  <li key={detail}>
                    <Icon name="check" />
                    {detail}
                  </li>
                ),
              )}
            </ul>
          </article>
        ))}
      </div>
      <div className="free-plan">
        <div>
          <span className="eyebrow">START AT YOUR OWN PACE</span>
          <h3>Try it free. Find your flow.</h3>
          <p>
            2 total videos, up to 30 seconds, with a watermark. No credit card
            required.
          </p>
        </div>
        <Link href="/sign-up" className="button button-outline">
          Start free <Icon name="arrow" />
        </Link>
      </div>
      <p className="page-fineprint pricing-note">
        Prices depend on your billing country. Confirm taxes and final pricing on VendeClip.{" "}
        <a href="https://vendeclip.com/en/pricing">
          See current regional pricing and plan terms on VendeClip.
        </a>
      </p>
    </>
  ));
}
