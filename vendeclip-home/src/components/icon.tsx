
import { useLocalizer } from "@/i18n/use-localizer";
import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";

const paths = {
  arrow: "M5 12h14m-6-6 6 6-6 6",
  play: "m9 5 11 7-11 7Z",
  pause: "M8 5v14M16 5v14",
  replay: "M3 10a9 9 0 1 1 2 8M3 4v6h6",
  text: "M4 5h16M4 10h16M4 15h12M4 20h9",
  volume: "M3 9h4l5-4v14l-5-4H3ZM16 8a6 6 0 0 1 0 8m3-11a10 10 0 0 1 0 14",
  muted: "M3 9h4l5-4v14l-5-4H3Zm13 0 5 6m0-6-5 6",
  check: "m5 12 4 4L19 6",
  plus: "M12 5v14M5 12h14",
  close: "m6 6 12 12M6 18 18 6",
  chevron: "m8 10 4 4 4-4",
  sparkles:
    "m12 3 2.6 6.4L21 12l-6.4 2.6L12 21l-2.6-6.4L3 12l6.4-2.6L12 3ZM21 2v4m-2-2h4",
  link: "m10 13 4-4M8 16l-1 1a4 4 0 0 1-6-6l4-4a4 4 0 0 1 6 0m2 1 1-1a4 4 0 0 1 6 6l-4 4a4 4 0 0 1-6 0",
  film: "M4 3h16v18H4zM4 8h16M4 16h16M8 3v18M16 3v18",
  mic: "M9 4a3 3 0 0 1 6 0v8a3 3 0 0 1-6 0Zm-3 7v1a6 6 0 0 0 12 0v-1M12 18v4m-4 0h8",
  music: "M9 18V5l11-2v13M9 5v4l11-2M9 18a3 3 0 1 1-3-3h3m11 1a3 3 0 1 1-3-3h3",
  image: "M3 3h18v18H3zM3 17l6-6 5 5 3-3 4 4M16 7h.01",
  layers: "m12 3 10 5-10 5L2 8ZM2 12l10 5 10-5M2 16l10 5 10-5",
  globe:
    "M21 12A9 9 0 1 1 3 12a9 9 0 0 1 18 0ZM3 12h18M12 3c5 5 5 13 0 18-5-5-5-13 0-18Z",
  chart: "M4 3v17h17M8 15l4-5 4 2 5-7",
  message: "M21 11a9 9 0 0 1-9 9H4l-3 2 1-7a9 9 0 1 1 19-4ZM7 10h10M7 14h6",
  user: "M16 6a4 4 0 1 1-8 0 4 4 0 0 1 8 0ZM4 22v-3a8 8 0 0 1 16 0v3",
  palette:
    "M12 3a9 9 0 1 0 0 18h1a2 2 0 0 0 0-4 2 2 0 0 1 0-4h4a4 4 0 0 0 4-4c0-3-4-6-9-6ZM7 9h.01M11 6h.01M16 7h.01M6 14h.01",
  download: "M12 3v12m-5-5 5 5 5-5M4 16v5h16v-5",
  menu: "M4 6h16M4 12h16M4 18h16",
  instagram:
    "M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4ZM16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0ZM17 7h.01",
  youtube:
    "M5 5h14a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3V8a3 3 0 0 1 3-3Zm5 4 5 3-5 3Z",
  tiktok: "M14 3v12a5 5 0 1 1-5-5M14 3c1 4 3 5 7 5",
  facebook: "M14 22V12h4l1-5h-5V5a2 2 0 0 1 2-2h3M8 12h6",
} as const;
export type IconName = keyof typeof paths;
export function Icon({
  name,
  className = "",
  style,
}: {
  name: IconName;
  className?: string;
  style?: CSSProperties;
}) {
  const localize = useLocalizer();
  return localize((
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
      style={style}
    >
      <path d={paths[name]} />
    </svg>
  ));
}
export function Logo() {
  const localize = useLocalizer();
  return localize((
    <Link href="/" className="logo" aria-label="VendeClip home">
      <Image
        src="/brand/vendeclip-logo.png"
        alt="VendeClip"
        width={1200}
        height={300}
        className="brand-logo"
        priority
      />
    </Link>
  ));
}
