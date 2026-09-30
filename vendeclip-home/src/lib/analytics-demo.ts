/** Illustrative event counts for the public design preview, not customer data. */
export type AnalyticsDay = {
  date: string;
  views: number;
  plays: number;
  completions: number;
  whatsapp: number;
  inquiries: number;
  contacts: number;
};
export type ChartMetric = "views" | "plays" | "contacts";
export type DemoProperty = {
  id: string;
  name: string;
  kind: string;
  image: string;
  alt: string;
  generated: boolean;
  days: AnalyticsDay[];
};

const dailyViews = [
  36, 42, 39, 51, 63, 54, 47, 44, 48, 61, 52, 69, 76, 58, 51,
  57, 46, 64, 73, 82, 67, 63, 69, 78, 62, 81, 93, 75, 68, 74,
  52, 61, 58, 75, 86, 69, 63, 57, 72, 81, 74, 97, 105, 82, 71,
  67, 84, 92, 78, 104, 116, 95, 87, 93, 108, 121, 102, 134, 117, 106,
];

function makeDays(scale: number, offset: number, playRate: number): AnalyticsDay[] {
  return dailyViews.map((base, index) => {
    const date = new Date(Date.UTC(2026, 6, 11 + index)).toISOString().slice(0, 10);
    const views = Math.max(1, Math.round(base * scale + ((index * 7 + offset) % 17) - 8));
    const plays = Math.floor(views * (playRate + (index % 5) * .018));
    const completions = Math.floor(plays * (.57 + (index % 4) * .035));
    const whatsapp = Math.floor(views * (.026 + ((index + offset) % 4) * .007));
    const inquiries = Math.floor(views * (.015 + ((index + offset) % 3) * .006));
    return { date, views, plays, completions, whatsapp, inquiries, contacts: whatsapp + inquiries };
  });
}

export const demoProperties: DemoProperty[] = [
  { id: "olive-house", name: "The Olive House", kind: "Coastal retreat", image: "/media/analytics/olive-house.webp", alt: "Illustrative contemporary coastal house with a pool and olive trees", generated: true, days: makeDays(1, 3, .58) },
  { id: "city-terrace", name: "The City Terrace", kind: "City apartment", image: "/media/analytics/city-terrace.webp", alt: "Illustrative sunlit apartment opening onto a planted city terrace", generated: true, days: makeDays(.79, 8, .71) },
  { id: "lake-house", name: "The Lake House", kind: "Waterside living", image: "/media/lake-house.webp", alt: "Lake house from the VendeClip property image collection", generated: false, days: makeDays(.61, 13, .64) },
];

export function getPeriod(property: DemoProperty, length: number) {
  return {
    current: property.days.slice(-length),
    previous: property.days.slice(-length * 2, -length),
  };
}
export function total(days: AnalyticsDay[], key: keyof Omit<AnalyticsDay, "date">) {
  return days.reduce((sum, day) => sum + day[key], 0);
}
export function percent(numerator: number, denominator: number, locale = "en-US") {
  return denominator ? new Intl.NumberFormat(locale, {style: "percent", minimumFractionDigits: 1, maximumFractionDigits: 1}).format(numerator / denominator) : new Intl.NumberFormat(locale, {style: "percent", minimumFractionDigits: 1}).format(0);
}
export function shortDate(value: string, locale = "en-US") {
  return new Date(`${value}T12:00:00Z`).toLocaleDateString(locale, { month: "short", day: "numeric", timeZone: "UTC" });
}
export function chartScale(values: number[]) {
  const peak = Math.max(1, ...values);
  const roughStep = peak / 4;
  const magnitude = 10 ** Math.floor(Math.log10(roughStep));
  const step = Math.max(1, Math.ceil([1, 2, 2.5, 5, 10].map((value) => value * magnitude).find((value) => value >= roughStep) ?? magnitude * 10));
  return { max: step * 4, ticks: [0, step, step * 2, step * 3, step * 4] };
}
