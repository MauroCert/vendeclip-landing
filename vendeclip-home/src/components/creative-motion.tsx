"use client";
import { useLocalizer } from "@/i18n/use-localizer";


import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { Icon } from "./icon";

export function MotionControl() {
  const localize = useLocalizer();
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    document.documentElement.dataset.designMotion = paused ? "paused" : "playing";
    window.dispatchEvent(new Event("vendeclip:motion"));
    return () => { delete document.documentElement.dataset.designMotion; };
  }, [paused]);
  return localize(<button className="motion-control" onClick={() => setPaused(!paused)} aria-pressed={paused}>
    <Icon name={paused ? "play" : "pause"} /> {paused ? "Resume animation" : "Pause animation"}
  </button>);
}

export function CreativeCard({ children, index }: { children: ReactNode; index: number }) {
  const localize = useLocalizer();
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    let visible = false;
    const update = () => { element.dataset.inView = String(visible && !document.hidden); };
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; update(); }, { threshold: .1 });
    observer.observe(element);
    document.addEventListener("visibilitychange", update);
    return () => { observer.disconnect(); document.removeEventListener("visibilitychange", update); };
  }, []);
  return localize(<article ref={ref} className="creative-card" data-kind={index} onPointerMove={(event) => {
    if (event.pointerType !== "mouse") return;
    const box = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty("--pointer-x", `${event.clientX - box.left}px`);
    event.currentTarget.style.setProperty("--pointer-y", `${event.clientY - box.top}px`);
  }}>{children}</article>);
}

const heights = [18, 35, 58, 27, 48, 72, 40, 64, 30, 54, 78, 43, 61, 32, 48, 24, 57, 37, 69, 45, 25, 51, 34, 20];
export function FeatureVisual({ index }: { index: number }) {
  const localize = useLocalizer();
  return localize(<div className={`feature-art art-${index}`} aria-hidden="true">
    {index === 0 && <><span className="art-tag">YOUR VOICE, IN EVERY FRAME</span><div className="art-wave">{heights.map((h, i) => <i key={i} style={{ height: h, "--i": i } as CSSProperties} />)}</div><span className="art-bottom"><i className="record-dot" /> Voice preview <span>00:12</span></span></>}
    {index === 1 && <><div className="script-lines"><span>A home made for</span><strong>your next chapter.</strong><i /></div><div className="music-pill"><Icon name="music" /><span>Find the feeling</span><div className="tiny-wave">{[0,1,2,3,4].map(i=><i key={i} style={{"--i":i} as CSSProperties}/>)}</div></div></>}
    {index === 2 && <><div className="brand-sheet"><span>VILLA LUMA</span><strong>A place<br/>to call yours.</strong><div /></div><div className="brand-swatches"><i /><i /><i /><i /></div><span className="art-label">Your signature, everywhere.</span></>}
    {index === 3 && <><div className="photo-stack"><div /><div /><div /></div><span className="art-label">A new perspective.</span></>}
    {index === 4 && <><div className="format-shapes"><i>9:16</i><i>1:1</i><i>16:9</i></div><span className="art-label">One story. Every format.</span></>}
    {index === 5 && <><div className="mini-site"><div><i /><i /><i /></div><strong>Villa Luma</strong><span>Your next chapter starts here.</span><div className="mini-site-photo" /></div></>}
    {index === 6 && <><div className="inquiry-bubble"><Icon name="message" /><span>Is this home still available?</span></div><div className="inquiry-bubble reply"><Icon name="check" /><span>Let’s arrange a viewing.</span></div><span className="art-label">From watching to connecting.</span></>}
    {index === 7 && <><span className="art-tag">FOLLOW THE INTEREST</span><div className="art-chart">{[24,42,35,60,51,78,68,95].map((h,i)=><i key={i} style={{height:`${h}%`,"--i":i} as CSSProperties}/>)}</div><span className="art-label">See the bigger picture.</span></>}
    {index === 8 && <><div className="team-orbit"><i>ML</i><i>AL</i><i>JD</i><span><Icon name="layers" /></span></div><span className="art-label">One team. One shared vision.</span></>}
  </div>);
}
