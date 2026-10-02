"use client";
import { useLocalizer } from "@/i18n/use-localizer";


import Image from "next/image";
import { useId, useState, type CSSProperties, type PointerEvent } from "react";
import { Icon } from "./icon";
import { chartScale, demoProperties, getPeriod, percent as basePercent, shortDate as baseShortDate, total, type AnalyticsDay, type ChartMetric } from "@/lib/analytics-demo";
import styles from "./analytics-page.module.css";

const metrics = { views: "Page views", plays: "Video plays", contacts: "Contact actions" } as const;


export function AnalyticsExplorer() {
  const localize = useLocalizer();
  const number = (value: number) => value.toLocaleString(localize.locale);
  const shortDate = (value: string) => baseShortDate(value, localize.locale);
  const percent = (a: number, b: number) => basePercent(a, b, localize.locale);
  const rangeLabel = (days: AnalyticsDay[]) => `${shortDate(days[0].date)} – ${shortDate(days.at(-1)!.date)}`;
  const [propertyId, setPropertyId] = useState(demoProperties[0].id);
  const [length, setLength] = useState(30);
  const [metric, setMetric] = useState<ChartMetric>("views");
  const property = demoProperties.find((item) => item.id === propertyId)!;
  const { current, previous } = getPeriod(property, length);
  const views = total(current, "views");
  const plays = total(current, "plays");
  const completions = total(current, "completions");
  const contacts = total(current, "contacts");
  const whatsapp = total(current, "whatsapp");
  const inquiries = total(current, "inquiries");

  return localize((
    <section className={`container ${styles.explorer}`} aria-labelledby="insights-title">
      <div className={styles.explorerHeader}>
        <div><Icon name="chart" /><h2 id="insights-title">Property insights</h2><span className={styles.sampleBadge}>Interactive example</span></div>
        <p>Choose a property to explore its activity.</p>
      </div>
      <div className={styles.propertySelector} role="group" aria-label="Choose a sample listing">
        {demoProperties.map((item, index) => <button key={item.id} aria-pressed={item.id === propertyId} aria-controls="property-report" onClick={() => setPropertyId(item.id)}>
          <div className={styles.propertyImage}><Image src={item.image} alt={item.alt} fill sizes="(max-width: 650px) 72vw, 31vw" priority={index === 0} /><span className={styles.selectionMark}><Icon name={item.id === propertyId ? "check" : "arrow"} /></span></div>
          <div className={styles.propertyCaption}><div><span>{item.kind}</span><strong>{item.name}</strong></div><span>0{index + 1}</span></div>
        </button>)}
      </div>
      <div id="property-report" className={styles.report}>
        <div className={styles.reportHeading}>
          <div><span className={styles.kicker}>THE ACTIVITY BEHIND THE LISTING</span><h3>{property.name}</h3></div>
          <div className={styles.periodControls}><span>{rangeLabel(current)}, 2026</span><div role="group" aria-label="Sample reporting period">{[7, 30].map((days) => <button key={days} aria-pressed={length === days} onClick={() => setLength(days)}>{days} days</button>)}</div></div>
        </div>
        <div className={styles.stats} key={`${propertyId}-${length}`}>
          <div><span>Page views</span><strong>{number(views)}</strong><p>Visits to the property page</p></div>
          <div><span>Video plays</span><strong>{number(plays)}</strong><p>{percent(plays, views)} play-to-view ratio</p></div>
          <div><span>Completed videos</span><strong>{number(completions)}</strong><p>{percent(completions, plays)} completion rate</p></div>
          <div><span>Contact actions</span><strong>{number(contacts)}</strong><p>{whatsapp} WhatsApp · {inquiries} inquiries</p></div>
        </div>
        <div className={styles.reportBody}>
          <div className={styles.chartPanel}>
            <div className={styles.chartHeading}><div><h4>Interest over time</h4><p>Daily activity · {length}-day periods</p></div><div className={styles.metricTabs} role="group" aria-label="Chart metric">{(Object.keys(metrics) as ChartMetric[]).map((key) => <button key={key} aria-pressed={key === metric} onClick={() => setMetric(key)}>{key === "views" ? "Views" : key === "plays" ? "Plays" : "Contacts"}</button>)}</div></div>
            <ActivityChart key={`${propertyId}-${length}-${metric}`} current={current} previous={previous} metric={metric} />
          </div>
          <aside className={styles.breakdown} aria-label="Selected listing activity breakdown">
            <span className={styles.kicker}>A CLOSER LOOK</span><h4>From views to contact.</h4>
            <div className={styles.activityBars}>{[["Page views", views], ["Video plays", plays], ["Completed videos", completions], ["Contact actions", contacts]].map(([label, value]) => <div key={label}><div><span>{label}</span><strong>{number(Number(value))}</strong></div><div className={styles.barTrack}><span key={`${propertyId}-${length}`} style={{ "--bar-width": `${Number(value) / views * 100}%` } as CSSProperties} /></div></div>)}</div>
            <div className={styles.contactsDetail}><span>THE NEXT STEP</span><div><Icon name="message" /><span>WhatsApp clicks</span><strong>{whatsapp}</strong></div><div><Icon name="text" /><span>Submitted inquiries</span><strong>{inquiries}</strong></div></div>
            <div className={styles.contactRate}><strong>{percent(contacts, views)}</strong><div><span>Contact-to-view ratio</span><p>Contact actions ÷ page views</p></div></div>
          </aside>
        </div>
        <div className={styles.reportNote}><span><Icon name="globe" /> VendeClip property-page activity</span><p>Sample data. Counts are events, not unique people, and can include repeat activity.</p></div>
      </div>
    </section>
  ));
}

const W = 760, H = 310, LEFT = 50, RIGHT = 23, TOP = 34, BOTTOM = 39;
function ActivityChart({ current, previous, metric }: { current: AnalyticsDay[]; previous: AnalyticsDay[]; metric: ChartMetric }) {
  const localize = useLocalizer();
  const number = (value: number) => value.toLocaleString(localize.locale);
  const shortDate = (value: string) => baseShortDate(value, localize.locale);
  const percent = (a: number, b: number) => basePercent(a, b, localize.locale);
  const rangeLabel = (days: AnalyticsDay[]) => `${shortDate(days[0].date)} – ${shortDate(days.at(-1)!.date)}`;
  const [active, setActive] = useState(current.length - 1);
  const [comparison, setComparison] = useState(true);
  const id = useId().replace(/:/g, "");
  const currentValues = current.map((day) => day[metric]);
  const previousValues = previous.map((day) => day[metric]);
  const scale = chartScale([...currentValues, ...(comparison ? previousValues : [])]);
  const x = (index: number) => LEFT + index / Math.max(1, current.length - 1) * (W - LEFT - RIGHT);
  const y = (value: number) => TOP + (1 - value / scale.max) * (H - TOP - BOTTOM);
  const points = (values: number[]) => values.map((value, index) => `${x(index)},${y(value)}`).join(" ");
  const line = points(currentValues);
  const labels = Array.from(new Set([0, Math.round((current.length - 1) / 4), Math.round((current.length - 1) / 2), Math.round((current.length - 1) * .75), current.length - 1]));
  const currentTotal = total(current, metric);
  const previousTotal = total(previous, metric);
  const change = previousTotal ? (currentTotal - previousTotal) / previousTotal * 100 : 0;
  const peak = currentValues.indexOf(Math.max(...currentValues));
  const tooltipX = Math.max(LEFT, Math.min(W - RIGHT - 112, x(active) - 56));
  function inspect(event: PointerEvent<SVGSVGElement>) {
    const bounds = event.currentTarget.getBoundingClientRect();
    const position = ((event.clientX - bounds.left) / bounds.width * W - LEFT) / (W - LEFT - RIGHT);
    setActive(Math.max(0, Math.min(current.length - 1, Math.round(position * (current.length - 1)))));
  }
  return localize((
    <div className={styles.chart}>
      <div className={styles.chartSummary}><div><strong>{number(currentTotal)}</strong><span>{metrics[metric].toLowerCase()}</span></div><span className={styles.periodChange}>{change >= 0 ? "+" : ""}{change.toLocaleString(localize.locale, {minimumFractionDigits: 1, maximumFractionDigits: 1})}% <span>vs previous period</span></span></div>
      <div className={styles.chartLegend}><span><i />{rangeLabel(current)}</span><label><input type="checkbox" checked={comparison} onChange={(event) => setComparison(event.target.checked)} /><i />{rangeLabel(previous)}<span className="sr-only"> Show previous period</span></label></div>
      <div className={styles.chartScroller}>
        <svg className={styles.plot} viewBox={`0 0 ${W} ${H}`} role="img" aria-labelledby={`${id}-title ${id}-description`} onPointerMove={inspect} onPointerDown={inspect}>
          <title id={`${id}-title`}>{`${localize.text(metrics[metric])} — ${rangeLabel(current)}`}</title>
          <desc id={`${id}-description`}>Sample daily event counts. Solid line: selected period. {comparison ? "Dashed line: previous period, aligned by day within the period." : "Previous period is hidden."} Use the day slider or data table below for exact values.</desc>
          <defs><linearGradient id={`${id}-area`} x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stopColor="#2b625e" stopOpacity=".09" /><stop offset="100%" stopColor="#2b625e" stopOpacity="0" /></linearGradient></defs>
          {scale.ticks.map((tick) => <g key={tick}><line x1={LEFT} x2={W - RIGHT} y1={y(tick)} y2={y(tick)} stroke="#e7e7e2" strokeDasharray={tick ? "3 5" : undefined} /><text x={LEFT - 13} y={y(tick) + 5} textAnchor="end" className={styles.axisLabel}>{number(tick)}</text></g>)}
          <text x={LEFT} y={16} className={styles.axisLabel}>{metrics[metric]} / day</text>
          <polygon points={`${LEFT},${H - BOTTOM} ${line} ${W - RIGHT},${H - BOTTOM}`} fill={`url(#${id}-area)`} />
          {comparison && <polyline points={points(previousValues)} fill="none" stroke="#9b9e9a" strokeWidth="2" strokeDasharray="5 5" strokeLinejoin="round" />}
          <polyline key={metric} className={styles.currentLine} points={line} pathLength="1" fill="none" stroke="#2b625e" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
          {labels.map((index) => <text key={index} x={x(index)} y={H - 10} textAnchor={index === 0 ? "start" : index === current.length - 1 ? "end" : "middle"} className={styles.axisLabel}>{shortDate(current[index].date)}</text>)}
          <line x1={x(active)} x2={x(active)} y1={TOP} y2={H - BOTTOM} stroke="#b7bbb6" strokeDasharray="3 4" />
          {comparison && <circle cx={x(active)} cy={y(previousValues[active])} r="4" fill="#ffffff" stroke="#9b9e9a" strokeWidth="2" />}
          <circle cx={x(active)} cy={y(currentValues[active])} r="5" fill="#ffffff" stroke="#2b625e" strokeWidth="2.5" />
          <g transform={`translate(${tooltipX},${Math.max(TOP + 3, y(currentValues[active]) - 52)})`} aria-hidden="true"><rect width="112" height="36" rx="5" fill="#ffffff" stroke="#dcded9" /><text x="10" y="23" className={styles.tooltipDate}>{shortDate(current[active].date)}</text><text x="102" y="23" textAnchor="end" className={styles.tooltipValue}>{currentValues[active]}</text></g>
        </svg>
      </div>
      <div className={styles.dayControl}>
        <button aria-label="Previous day" disabled={active === 0} onClick={() => setActive(active - 1)}><Icon name="arrow" /></button>
        <input type="range" min="0" max={current.length - 1} step="1" value={active} onChange={(event) => setActive(Number(event.target.value))} aria-label="Inspect a day in the chart" aria-valuetext={`${shortDate(current[active].date)}: ${currentValues[active]} ${metrics[metric].toLowerCase()}`} />
        <button aria-label="Next day" disabled={active === current.length - 1} onClick={() => setActive(active + 1)}><Icon name="arrow" /></button>
        <span>Explore each day</span>
      </div>
      <div className={styles.dayDetail} aria-live="polite" aria-atomic="true"><div><span>{shortDate(current[active].date)}, 2026</span><strong>{currentValues[active]} <span>{metrics[metric].toLowerCase()}</span></strong></div>{comparison && <div><span>Compared with {shortDate(previous[active].date)}</span><strong>{previousValues[active]} <span>{metrics[metric].toLowerCase()}</span></strong></div>}</div>
      <div className={styles.chartFoot}><span>Peak: <strong>{currentValues[peak]}</strong> on {shortDate(current[peak].date)}</span><span>Daily average: <strong>{(currentTotal / current.length).toLocaleString(localize.locale, {minimumFractionDigits: 1, maximumFractionDigits: 1})}</strong></span></div>
      <details className={styles.dataTable}><summary>View the daily numbers <Icon name="chevron" /></summary><div><table><caption>Sample {metrics[metric].toLowerCase()}, aligned by day in each period.</caption><thead><tr><th scope="col">Selected date</th><th scope="col">Events</th><th scope="col">Previous date</th><th scope="col">Events</th></tr></thead><tbody>{current.map((day, index) => <tr key={day.date}><th scope="row">{shortDate(day.date)}</th><td>{day[metric]}</td><td>{shortDate(previous[index].date)}</td><td>{previous[index][metric]}</td></tr>)}</tbody></table></div></details>
    </div>
  ));
}
