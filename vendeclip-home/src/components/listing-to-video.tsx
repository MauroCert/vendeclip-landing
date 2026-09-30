"use client";
import { useLocalizer } from "@/i18n/use-localizer";


import Image from "next/image";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Icon } from "./icon";

const scenes = [
  { id: "10-pool-garden", name: "Pool & garden" },
  { id: "01-exterior", name: "The first impression" },
  { id: "02-entry", name: "A warm welcome" },
  { id: "03-living", name: "Room to live" },
  { id: "04-kitchen", name: "The heart of the home" },
  { id: "05-dining", name: "Gather together" },
  { id: "06-primary-bedroom", name: "A place to unwind" },
  { id: "07-primary-bathroom", name: "Everyday calm" },
  { id: "09-covered-terrace", name: "Life outdoors" },
];
const stages = [
  "Your listing",
  "Photos + details",
  "Create clips",
  "Make it yours",
  "Your video",
];
const durations = [1500, 2200, 4500, 3800];
const status = [
  "Start with a listing link, or upload your own photos like this demo.",
  "Your photos and property description, brought together.",
  "Each photo becomes a clip with its own camera movement.",
  "Clips, music, voice, and an optional presenter. One complete edit.",
  "Your listing is ready for its audience.",
];
const waveform = [
  22, 42, 65, 35, 80, 56, 30, 70, 100, 46, 64, 36, 83, 56, 25, 62, 90, 40, 65,
  32, 70, 50, 85, 30,
];

function Waveform({ voice = false }: { voice?: boolean }) {
  const localize = useLocalizer();
  return localize((
    <div
      className={`studio-wave ${voice ? "studio-wave-voice" : ""}`}
      aria-hidden="true"
    >
      {waveform.map((height, index) => (
        <i
          key={index}
          style={
            {
              "--bar-height": `${height}%`,
              "--bar-delay": `${index * 45}ms`,
            } as CSSProperties
          }
        />
      ))}
    </div>
  ));
}

export function ListingToVideo() {
  const localize = useLocalizer();
  const root = useRef<HTMLDivElement>(null);
  const player = useRef<HTMLVideoElement>(null);
  const clips = useRef<(HTMLVideoElement | null)[]>([]);
  const playhead = useRef<HTMLDivElement>(null);
  const remaining = useRef([...durations]);
  const [stage, setStage] = useState(0);
  const [run, setRun] = useState(0);
  const [visible, setVisible] = useState(false);
  const [reducedMotion, setReducedMotion] = useState<boolean | null>(null);
  const [paused, setPaused] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const [manualPlayback, setManualPlayback] = useState(false);
  const [failed, setFailed] = useState(false);
  const ready = stage === 4;
  const active = visible && !paused && reducedMotion === false;

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => {
      setReducedMotion(preference.matches);
      if (preference.matches) setStage(4);
    };
    let inViewport = false;
    const updateVisibility = () => setVisible(inViewport && !document.hidden);
    const observer = new IntersectionObserver(
      ([entry]) => {
        inViewport = entry.isIntersecting;
        updateVisibility();
      },
      { threshold: 0.15 },
    );
    updatePreference();
    if (root.current) observer.observe(root.current);
    preference.addEventListener("change", updatePreference);
    document.addEventListener("visibilitychange", updateVisibility);
    return () => {
      observer.disconnect();
      preference.removeEventListener("change", updatePreference);
      document.removeEventListener("visibilitychange", updateVisibility);
    };
  }, []);

  useEffect(() => {
    if (!active || ready) return;
    const timeLeft = remaining.current;
    const started = performance.now();
    const timer = window.setTimeout(() => setStage(stage + 1), timeLeft[stage]);
    return () => {
      window.clearTimeout(timer);
      timeLeft[stage] = Math.max(
        0,
        timeLeft[stage] - (performance.now() - started),
      );
    };
  }, [active, ready, stage, run]);

  useEffect(() => {
    const previews = clips.current.filter(
      (video): video is HTMLVideoElement => video !== null,
    );
    previews.forEach((video) => {
      if (active && stage >= 2 && stage < 4) video.play().catch(() => {});
      else video.pause();
    });
    return () => previews.forEach((video) => video.pause());
  }, [active, stage]);

  useEffect(() => {
    const video = player.current;
    if (!video) return;
    let cancelled = false;
    if (
      ready &&
      visible &&
      !paused &&
      !failed &&
      (reducedMotion === false || manualPlayback)
    ) {
      video.play().catch(() => {
        if (!cancelled) setPaused(true);
      });
    } else video.pause();
    return () => {
      cancelled = true;
      video.pause();
    };
  }, [ready, visible, paused, failed, reducedMotion, manualPlayback, run]);

  function goToStage(index: number) {
    player.current?.pause();
    if (player.current) player.current.currentTime = 0;
    if (playhead.current) playhead.current.style.left = "0%";
    remaining.current = [...durations];
    setManualPlayback(false);
    setPaused(false);
    setStage(index);
    setRun((value) => value + 1);
  }

  function togglePlayback() {
    if (!ready) setPaused((value) => !value);
    else if (playing) setPaused(true);
    else {
      if (player.current?.ended) player.current.currentTime = 0;
      setPaused(false);
      setManualPlayback(true);
      player.current?.play().catch((error: DOMException) => {
        if (error.name !== "AbortError") setPaused(true);
      });
    }
  }

  return localize((
    <div
      ref={root}
      className="transformation-demo listing-studio listing-studio-landscape"
      id="listing-to-video"
      data-stage={stage}
      data-active={active}
    >
      <div className="studio-heading">
        <div className="studio-brand">
          <Image src="/icon.svg" width={28} height={28} alt="" />
          <span>
            Your listing. <strong>Everything comes together.</strong>
          </span>
        </div>
        <span className="studio-example-label">Made with VendeClip · Villa Luma</span>
      </div>
      <nav
        className="studio-stages"
        aria-label="Explore the video creation workflow"
      >
        {stages.map((name, index) => (
          <button
            key={name}
            onClick={() => goToStage(index)}
            aria-current={stage === index ? "step" : undefined}
            data-complete={stage > index}
          >
            <span>
              {stage > index ? <Icon name="check" /> : `0${index + 1}`}
            </span>
            {name}
            <i aria-hidden="true" />
          </button>
        ))}
      </nav>

      <div className="studio-workspace">
        <div className="studio-source">
          <div className="studio-panel-heading">
            <Icon name="link" />
            <h3>Your listing</h3>
          </div>
          <div className="studio-url">
            <span>Villa Luma · Uploaded photos</span>
            <Icon name={stage > 0 ? "check" : "arrow"} />
          </div>
          <div className="studio-imported" data-visible={stage >= 1}>
            <div className="studio-import-label">
              <span>Your property photos</span>
              <span>9 selected photos</span>
            </div>
            <div className="studio-photo-grid">
              {scenes.map((scene, index) => (
                <div
                  key={scene.id}
                  style={
                    { "--item-delay": `${index * 130}ms` } as CSSProperties
                  }
                >
                  <Image
                    src={`/media/villa-luma/${scene.id}.png`}
                    alt={`${scene.name}: fictional Villa Luma property photo`}
                    fill
                    sizes="(max-width: 650px) 27vw, 100px"
                  />
                  <span>0{index + 1}</span>
                </div>
              ))}
            </div>
            <div className="studio-description">
              <span>
                <Icon name="text" /> Property description
              </span>
              <h4>Villa Luma · Jardín de Olivos</h4>
              <p>
                A fictional Mediterranean home with an open kitchen,
                sunlit interiors, a covered terrace, and a private pool.
              </p>
              <div>
                <span>4 bedrooms</span>
                <span>3 bathrooms</span>
                <span>320 m²</span>
              </div>
            </div>
          </div>
          <p className="studio-source-note">
            <Icon name="check" /> Fictional property · 9 photos brought to life.
          </p>
        </div>

        <div className="studio-edit">
          <div className="studio-panel-heading">
            <Icon name="layers" />
            <h3>The creative part</h3>
            <span className="studio-panel-state">
              {stage < 2
                ? "Your workspace"
                : stage === 2
                  ? "Bringing photos to life"
                  : stage === 3
                    ? "Putting it all together"
                    : "Ready to share"}
            </span>
          </div>
          <div className="studio-clips" data-visible={stage >= 2}>
            {scenes.map((scene, index) => (
              <div
                className="studio-clip"
                key={scene.id}
                style={{ "--item-delay": `${index * 160}ms` } as CSSProperties}
              >
                <video
                  ref={(element) => {
                    clips.current[index] = element;
                  }}
                  src={`/media/villa-luma/${scene.id}-clip.mp4`}
                  poster={`/media/villa-luma/${scene.id}.png`}
                  muted
                  playsInline
                  loop
                  preload="none"
                  aria-label={`${scene.name}: clip preview`}
                />
                <span>
                  <Icon name="play" /> {scene.name}
                </span>
                <i className="studio-clip-scan" aria-hidden="true" />
              </div>
            ))}
          </div>
          <div className="studio-ingredients" data-visible={stage >= 3}>
            <div className="studio-ingredient">
              <Icon name="music" />
              <div>
                <strong>Music</strong>
                <span>Set the mood</span>
              </div>
              <Icon name="check" />
            </div>
            <div className="studio-ingredient">
              <Icon name="mic" />
              <div>
                <strong>Voiceover</strong>
                <span>Tell the story</span>
              </div>
              <Icon name="check" />
            </div>
            <div className="studio-ingredient studio-avatar">
              <Image
                src="/media/presenter.webp"
                width={32}
                height={32}
                alt="Example AI presenter"
              />
              <div>
                <strong>Avatar</strong>
                <span>Optional presenter</span>
              </div>
              <Icon name="plus" />
            </div>
          </div>
          <div className="studio-timeline" data-visible={stage >= 2}>
            <div className="studio-timeline-heading">
              <span>Your video, coming together</span>
              <span>9 clips · 16:9</span>
            </div>
            <div className="studio-track">
              <Icon name="film" />
              <div className="studio-timeline-scenes">
                {scenes.map((scene, index) => (
                  <div key={scene.id}>
                    <Image
                      src={`/media/villa-luma/${scene.id}.png`}
                      alt=""
                      fill
                      sizes="100px"
                    />
                    <span>0{index + 1}</span>
                  </div>
                ))}
              </div>
            </div>
            <div
              className="studio-track studio-audio-track"
              data-visible={stage >= 3}
            >
              <Icon name="music" />
              <div>
                <span>Music</span>
                <Waveform />
              </div>
            </div>
            <div
              className="studio-track studio-audio-track studio-narration-track"
              data-visible={stage >= 3}
            >
              <Icon name="mic" />
              <div>
                <span>Voiceover</span>
                <Waveform voice />
              </div>
            </div>
            <div
              className="studio-track studio-presenter-track"
              data-visible={stage >= 3}
            >
              <Icon name="user" />
              <div>
                <span>+ Add your presenter</span>
                <span>Optional</span>
              </div>
            </div>
            <div className="studio-playhead-area" aria-hidden="true">
              <div className="studio-playhead" ref={playhead} />
            </div>
          </div>
        </div>

        <div className="studio-result">
          <div className="studio-panel-heading">
            <Icon name="sparkles" />
            <h3>The final video</h3>
          </div>
          <div className="studio-phone" data-ready={ready}>
            <video
              ref={player}
              src="/media/villa-luma/final-video.mp4"
              poster="/media/villa-luma/01-exterior.png"
              muted={muted}
              playsInline
              preload="none"
              aria-label="Finished VendeClip property video: Villa Luma · Jardín de Olivos"
              onPlay={() => setPlaying(true)}
              onPause={() => setPlaying(false)}
              onEnded={() => setPaused(true)}
              onError={() => setFailed(true)}
              onTimeUpdate={() => {
                const video = player.current;
                if (
                  playhead.current &&
                  video &&
                  Number.isFinite(video.duration) &&
                  video.duration > 0
                )
                  playhead.current.style.left = `${Math.min(100, (video.currentTime / video.duration) * 100)}%`;
              }}
            />
            <div className="studio-result-cover">
              <Image src="/icon.svg" alt="" width={40} height={40} />
              <span>
                {stage >= 3
                  ? "A whole story. One video."
                  : "Your next great listing video."}
              </span>
              <div className="studio-export-progress">
                <i />
              </div>
            </div>
            {ready && !playing && !failed && (
              <button
                className="studio-play-result"
                onClick={togglePlayback}
                aria-label="Play the finished video"
              >
                <Icon name="play" />
              </button>
            )}
            {ready && (
              <button
                className="studio-sound"
                onClick={() => setMuted((value) => !value)}
                aria-label={muted ? "Unmute video" : "Mute video"}
              >
                <Icon name={muted ? "muted" : "volume"} />
                {muted ? "Sound on" : "Mute"}
              </button>
            )}
          </div>
          <p className="studio-result-caption">
            <Icon name={ready ? "check" : "film"} />
            {ready
              ? "Villa Luma · 36-second video"
              : "Clips + sound + your signature"}
          </p>
        </div>
      </div>
      <div className="studio-controls">
        <p role="status">
          <span />
          {failed ? "The example video couldn’t load." : status[stage]}
        </p>
        <div>
          <button
            onClick={togglePlayback}
            disabled={failed || (reducedMotion === true && !ready)}
          >
            <Icon
              name={
                ready ? (playing ? "pause" : "play") : paused ? "play" : "pause"
              }
            />
            {ready
              ? playing
                ? "Pause video"
                : "Play video"
              : paused
                ? "Resume"
                : "Pause"}
          </button>
          <button onClick={() => goToStage(0)}>
            <Icon name="replay" />
            Replay story
          </button>
        </div>
      </div>
      <div className="studio-footnote">
        <span>
          Illustrated workflow with fictional Villa Luma property photory. Final video: an
          actual VendeClip export.
        </span>
        <span>Voice and presenter options vary by plan.</span>
      </div>
      {failed && (
        <p className="media-error">
          <a href="/media/villa-luma/final-video.mp4">
            Open the video directly
          </a>
          .
        </p>
      )}
    </div>
  ));
}
