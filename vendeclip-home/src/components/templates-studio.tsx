"use client";
import { useLocalizer } from "@/i18n/use-localizer";


import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Icon } from "./icon";
import styles from "./templates-page.module.css";

const collection = [
  { id: "ai-motion-reel", name: "Cinematic", category: "Cinematic", number: "01", note: "Let the space do the talking.", title: "A sense of being there.", description: "Slow camera moves invite a closer look. Give the light, the proportions, and the view a moment of their own.", traits: ["Natural movement", "Room to breathe", "Property tours"] },
  { id: "magazine", name: "Editorial", category: "Editorial", number: "02", note: "Give the details a little drama.", title: "An eye for the details.", description: "A more composed way to tell the story. Typography and image-led layouts bring the character of a home into focus.", traits: ["Considered typography", "Visual storytelling", "Distinctive homes"] },
  { id: "carousel", name: "Carousel", category: "Social", number: "03", note: "One scene leads to the next.", title: "More of the whole story.", description: "Move through the spaces that matter, one after another. An easy rhythm for showing how a property comes together.", traits: ["Scene by scene", "A steady rhythm", "Social stories"] },
  { id: "slide-cards", name: "Slide cards", category: "Social", number: "04", note: "Make a confident entrance.", title: "A little more momentum.", description: "Layered cards and purposeful transitions keep the story moving. A lively introduction to a property worth a closer look.", traits: ["Layered composition", "A lively pace", "Social introductions"] },
] as const;
type CollectionItem = (typeof collection)[number];
const filters = ["All styles", "Cinematic", "Editorial", "Social"] as const;
const scenePositions = [0.08, 0.42, 0.74];
function timestamp(time: number) {
  return `${Math.floor(time / 60)}:${Math.floor(time % 60).toString().padStart(2, "0")}`;
}

export function TemplateCollection() {
  const localize = useLocalizer();
  const [selected, setSelected] = useState<CollectionItem>(collection[0]);
  const [filter, setFilter] = useState<(typeof filters)[number]>("All styles");
  const visible = collection.filter((item) => filter === "All styles" || item.category === filter);
  return localize((
    <section className={`container ${styles.collection}`} id="collection" aria-label="Explore video templates">
      <div className={styles.collectionTop}>
        <div className={styles.filters} role="group" aria-label="Filter template styles">
          {filters.map((item) => <button key={item} aria-pressed={filter === item} onClick={() => {
            setFilter(item);
            if (item !== "All styles" && selected.category !== item) setSelected(collection.find((template) => template.category === item)!);
          }}>{item}</button>)}
        </div>
        <span className={styles.collectionCount} role="status">{String(visible.length).padStart(2, "0")} {visible.length === 1 ? "style" : "styles"} to explore</span>
      </div>
      <div className={styles.collectionBody}>
        <div className={styles.styleIndex}>
          <span className={styles.kicker}>CHOOSE A POINT OF VIEW</span>
          <div className={styles.styleChoices} role="group" aria-label="Choose a template preview">
            {visible.map((item) => <button key={item.id} className={styles.styleChoice} aria-pressed={selected.id === item.id} aria-controls="template-preview" onClick={() => setSelected(item)}>
              <span className={styles.styleNumber}>{item.number}</span>
              <span className={styles.styleWords}><strong>{item.name}</strong><span>{item.note}</span></span>
              <Icon name="arrow" />
            </button>)}
          </div>
          <div className={styles.indexNote}><span className={styles.smallRule} /><p>The same starting point.<br />A different point of view.</p><span>Actual VendeClip previews</span></div>
        </div>
        <CollectionPlayer key={selected.id} item={selected} />
      </div>
      <div className={styles.collectionFoot}><span><Icon name="film" /> The collection, in motion</span><p>Template availability and customization options vary by plan.</p><Link href="/pricing">Explore plans <Icon name="arrow" /></Link></div>
    </section>
  ));
}

function CollectionPlayer({ item }: { item: CollectionItem }) {
  const localize = useLocalizer();
  const player = useRef<HTMLVideoElement>(null);
  const fullPlayer = useRef<HTMLVideoElement>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const userPaused = useRef(false);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const [elapsed, setElapsed] = useState(0);
  const [duration, setDuration] = useState(0);
  const [error, setError] = useState(false);
  const [fullError, setFullError] = useState(false);
  const source = `/media/${item.id}-preview.mp4`;

  useEffect(() => {
    const video = player.current;
    const fullVideo = fullPlayer.current;
    if (!video) return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let inView = false;
    // A cached video's metadata may arrive before React hydrates the page.
    // Read its current state as well as listening for later media events.
    const metadataFrame = window.requestAnimationFrame(() => {
      if (Number.isFinite(video.duration)) setDuration(video.duration);
    });
    function syncPlayback() {
      if (!video) return;
      if (inView && !document.hidden && !preference.matches && !userPaused.current && !dialog.current?.open) video.play().catch(() => {});
      else video.pause();
      if (document.hidden) fullVideo?.pause();
    }
    const observer = new IntersectionObserver(([entry]) => { inView = entry.isIntersecting; syncPlayback(); }, { threshold: 0.35 });
    observer.observe(video);
    preference.addEventListener("change", syncPlayback);
    document.addEventListener("visibilitychange", syncPlayback);
    return () => { observer.disconnect(); window.cancelAnimationFrame(metadataFrame); video.pause(); fullVideo?.pause(); preference.removeEventListener("change", syncPlayback); document.removeEventListener("visibilitychange", syncPlayback); };
  }, []);

  function togglePlayback() {
    const video = player.current;
    if (!video) return;
    if (video.paused) {
      userPaused.current = false;
      video.play().catch(() => setError(true));
    } else { userPaused.current = true; video.pause(); }
  }
  function seek(seconds: number) {
    if (player.current && duration > 0) {
      player.current.currentTime = Math.min(seconds, duration);
      setElapsed(seconds);
    }
  }
  function openFullVideo() {
    userPaused.current = true;
    player.current?.pause();
    dialog.current?.showModal();
    fullPlayer.current?.play().catch(() => {});
  }
  return localize((
    <div className={styles.preview} id="template-preview" aria-label={`${item.name} preview`}>
      <div className={styles.projector}>
        <div className={styles.previewTopline}><span>{item.number} / {item.name}</span><span>9:16</span></div>
        <div className={styles.videoWindow}>
          <video ref={player} src={source} poster={`/media/${item.id}-poster.jpg`} muted={muted} playsInline loop preload="metadata" aria-label={`${item.name} template video`} onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} onTimeUpdate={(event) => setElapsed(event.currentTarget.currentTime)} onLoadedMetadata={(event) => setDuration(event.currentTarget.duration)} onError={() => setError(true)} />
          <button className={styles.videoOverlay} onClick={togglePlayback} aria-label={`${playing ? "Pause" : "Play"} ${item.name} preview`}><span data-playing={playing}><Icon name={playing ? "pause" : "play"} /></span></button>
        </div>
        <div className={styles.transport}>
          <button onClick={togglePlayback} aria-label={`${playing ? "Pause" : "Play"} preview`}><Icon name={playing ? "pause" : "play"} /></button>
          <span className={styles.timecode}>{timestamp(elapsed)}</span>
          <input aria-label="Video playback position" aria-valuetext={`${timestamp(elapsed)} of ${timestamp(duration)}`} type="range" min="0" max={duration || 1} step="0.05" value={Math.min(elapsed, duration || 1)} disabled={!duration} onChange={(event) => seek(Number(event.target.value))} style={{ "--played": `${duration ? elapsed / duration * 100 : 0}%` } as CSSProperties} />
          <span className={styles.timecode}>{timestamp(duration)}</span>
          <button onClick={() => setMuted(!muted)} aria-label={muted ? "Unmute preview" : "Mute preview"}><Icon name={muted ? "muted" : "volume"} /></button>
        </div>
        {error && <p className={styles.error} role="alert">The preview couldn’t play. <a href={source}>Open the video</a>.</p>}
        <noscript><a href={source}>Watch the Cinematic video preview</a></noscript>
      </div>

      <div className={styles.previewStory}>
        <div className={styles.storyCopy}>
          <span className={styles.kicker}>A CLOSER LOOK / {item.number}</span>
          <h2>{item.title}</h2>
          <p>{item.description}</p>
          <ul>{item.traits.map((trait) => <li key={trait}>{trait}</li>)}</ul>
          <button className={styles.watchButton} onClick={openFullVideo}><span><Icon name="play" /></span>Watch the full preview <Icon name="arrow" /></button>
        </div>
        <div className={styles.sceneStrip}>
          <div><span>IN THE FRAME</span><span>01 — 03</span></div>
          <div className={styles.sceneFrames}>
            {scenePositions.map((position, index) => <button key={position} onClick={() => seek(duration * position)} disabled={!duration} aria-label={`Jump to scene ${index + 1} of ${item.name}`}><Image src={`/media/template-frames/${item.id}-${index + 1}.jpg`} alt="" width={240} height={426} /><span>0{index + 1}<Icon name="play" /></span></button>)}
          </div>
          <p>Small moments. A complete impression.</p>
        </div>
      </div>

      <dialog className={`video-dialog ${styles.previewDialog}`} ref={dialog} aria-label={`${item.name} full preview`} onClick={(event) => { if (event.target === event.currentTarget) dialog.current?.close(); }} onClose={() => fullPlayer.current?.pause()}>
        <div className="dialog-header"><div><span className={styles.kicker}>THE TEMPLATE COLLECTION / {item.number}</span><h2>{item.name}</h2></div><button className="icon-button" aria-label="Close preview" onClick={() => dialog.current?.close()}><Icon name="close" /></button></div>
        <video ref={fullPlayer} controls playsInline preload="none" src={source} poster={`/media/${item.id}-poster.jpg`} onError={() => setFullError(true)} />
        {fullError && <p role="alert" className={styles.error}>This preview couldn’t load. <a href={source}>Open the video directly</a>.</p>}
        <div className={styles.dialogFooter}><span>{item.note}</span><Link href="/sign-up">Make it yours <Icon name="arrow" /></Link></div>
      </dialog>
    </div>
  ));
}

const formats = [
  { name: "Portrait", ratio: "9:16", value: 9 / 16, channel: "For the full-screen scroll.", description: "Reels, stories, and vertical video. Let the property fill the screen.", icon: "instagram" },
  { name: "Square", ratio: "1:1", value: 1, channel: "A balanced place in the feed.", description: "A compact composition for a closer look as buyers browse their feed.", icon: "image" },
  { name: "Landscape", ratio: "16:9", value: 16 / 9, channel: "Room for the wider view.", description: "Website players and wider screens. Give the spaces a little more room.", icon: "youtube" },
] as const;

export function TemplateFormats() {
  const localize = useLocalizer();
  const [active, setActive] = useState<(typeof formats)[number]>(formats[0]);
  return localize((
    <section className={`container ${styles.formats}`} aria-labelledby="formats-heading">
      <div className={styles.formatsCopy} data-template-reveal>
        <span className={styles.kicker}>A CHANGE OF PERSPECTIVE</span>
        <h2 id="formats-heading">One story.<br />Every <em>screen.</em></h2>
        <p>From a full-screen reel to a place on your website. Choose the frame for where the story is going.</p>
        <div className={styles.formatChoices} role="group" aria-label="Preview video format">
          {formats.map((format) => <button key={format.name} aria-pressed={format.name === active.name} onClick={() => setActive(format)}><span className={styles.ratioIcon} style={{ aspectRatio: String(format.value) }} />{format.name}<span>{format.ratio}</span></button>)}
        </div>
        <div className={styles.formatCaption} key={active.name} aria-live="polite"><strong><Icon name={active.icon} />{active.channel}</strong><p>{active.description}</p></div>
      </div>
      <div className={styles.formatVisual} data-template-reveal>
        <div className={styles.formatRuler}><span>THE COASTAL COLLECTION</span><span>{active.ratio}</span></div>
        <div className={styles.formatStage}>
          <div className={styles.formatWindow} style={{ "--format-ratio": active.value } as CSSProperties}>
            <Image src="/media/products/coastal-living.webp" alt="Coastal living room shown in the selected video composition" fill sizes="(max-width: 700px) 90vw, 50vw" />
            <div className={styles.formatTypography}><span>YOUR AGENCY</span><h3>A slower<br />kind of Sunday.</h3><span>Come a little closer <Icon name="arrow" /></span></div>
          </div>
        </div>
        <div className={styles.formatBaseline}><span>{active.name} composition</span><span>Illustrative layout</span></div>
      </div>
    </section>
  ));
}

/** Keep all content visible before enhancement; animate each detail once. */
