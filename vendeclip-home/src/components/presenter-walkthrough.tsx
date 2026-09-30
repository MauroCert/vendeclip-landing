"use client";
import { useLocalizer } from "@/i18n/use-localizer";


import { useId, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Icon } from "./icon";
import styles from "./presenter-walkthrough.module.css";

const steps = [
  {
    title: "Choose who tells the story",
    copy: "Start with your own image and voice, or choose an AI avatar. Your presenter gives the property a familiar face.",
    label: "YOUR PRESENTER",
    heading: "A personal introduction",
    detail: "Set up your image and voice in the presenter workflow. You can reuse your presenter for the next listing.",
  },
  {
    title: "Give your presenter a script",
    copy: "Introduce yourself, highlight what makes the property special, and finish with a clear next step for the viewer.",
    label: "EXAMPLE SCRIPT",
    heading: "Make the first few words count.",
    detail: "“Hi, I’m Alex. Welcome to this bright, modern home with space to unwind and entertain. Let’s take a look inside. Contact me to book a viewing.”",
  },
  {
    title: "Bring it into your property video",
    copy: "Combine your introduction with the listing’s clips and soundtrack. Review the narration and property details before sharing.",
    label: "EXAMPLE VIDEO STRUCTURE",
    heading: "Your face. Their next home.",
    detail: "Open with your presenter, show the property, then invite the viewer to book a viewing. Keep the introduction short so the home takes center stage.",
  },
];

export function PresenterWalkthrough() {
  const localize = useLocalizer();
  const [active, setActive] = useState(0);
  const id = useId();
  const step = steps[active];

  return localize((
    <section className={`section container ${styles.section}`} id="your-presenter" aria-labelledby={`${id}-heading`}>
      <div className={styles.visual}>
        <div className={styles.image}>
          <Image src="/media/presenter.webp" alt="Illustrative AI presenter outside a modern home" fill sizes="(max-width: 800px) 90vw, 45vw" />
          <span className={styles.badge}><Icon name="sparkles" /> YOUR PRESENTER · EXAMPLE</span>
        </div>
        <div className={styles.preview} id={`${id}-preview`} aria-live="polite" aria-atomic="true">
          <span className="eyebrow">{step.label}</span>
          <h3>{step.heading}</h3>
          <p>{step.detail}</p>
          {active === 2 && <div className={styles.sequence}><span>Introduction</span><Icon name="arrow" /><span>Property tour</span><Icon name="arrow" /><span>Contact</span></div>}
        </div>
        <div className={styles.controls}>
          <span>Step {active + 1} of {steps.length} · Illustrated walkthrough</span>
          <button type="button" onClick={() => setActive((active + 1) % steps.length)} aria-controls={`${id}-preview`}>
            {active === 2 ? "Start again" : "Next step"}<Icon name="arrow" />
          </button>
        </div>
      </div>
      <div className={styles.copy}>
        <span className="eyebrow">HOW TO USE YOUR PRESENTER</span>
        <h2 id={`${id}-heading`}>Be the face.<br />Let the home shine.</h2>
        <p>Add a personal introduction to your listing video using your image and voice, or an AI avatar. Explore a simple example, step by step.</p>
        <div className={styles.steps} aria-label="Walkthrough steps">
          {steps.map((item, index) => (
            <button type="button" key={item.title} aria-pressed={active === index} aria-controls={`${id}-preview`} onClick={() => setActive(index)}>
              <span className={styles.number}>0{index + 1}</span>
              <span><strong>{item.title}</strong><span className={styles.description}>{item.copy}</span></span>
            </button>
          ))}
        </div>
        <Link href="/sign-up" className="text-link">Create your first video <Icon name="arrow" /></Link>
        <small>Illustrative example. Presenter and voice features vary by plan.</small>
      </div>
    </section>
  ));
}
