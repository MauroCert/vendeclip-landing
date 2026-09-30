import Image from "next/image";
import { getLocalizer } from "@/i18n/server";
import { headers } from "next/headers";
import { visitorCountry } from "@/lib/visitor-country";

// Customer affiliations confirmed by the site owner on 2026-09-29.
// These are agent workplaces, not corporate partnerships or country rankings.
const brokerages = [
  { name: "Compass", file: "compass.svg", countries: ["US"] },
  { name: "Berkshire Hathaway HomeServices", file: "berkshire-hathaway.svg", countries: ["US", "CA", "MX", "ES", "PT", "DE"] },
  { name: "RE/MAX", file: "remax.svg", countries: [] },
  { name: "SAFTI", file: "safti.svg", countries: ["FR"] },
];

export async function CustomerBrokerages() {
  const [localize, requestHeaders] = await Promise.all([getLocalizer(), headers()]);
  const country = visitorCountry(requestHeaders);
  // Market presence determines relevance, not a claim about local customer counts.
  const relevant = country
    ? brokerages.filter(brand => !brand.countries.length || brand.countries.includes(country))
    : brokerages;
  return localize(
    <section className="customer-brokerages container" aria-labelledby="customer-brokerages-heading">
      <span className="eyebrow">REAL ESTATE PROFESSIONALS. REAL CONNECTIONS.</span>
      <h2 id="customer-brokerages-heading">Where our customers work</h2>
      <p>Used by individual agents at these real estate brands.</p>
      <div className="customer-brokerage-logos" style={{ gridTemplateColumns: `repeat(${Math.min(relevant.length, 2)}, minmax(0, 1fr))`, maxWidth: relevant.length === 1 ? 360 : undefined, marginInline: "auto" }}>
        {relevant.map(({ name, file }) => (
          <div className="customer-brokerage-logo" key={file}>
            <Image src={`/media/brokerages/${file}`} alt={name} width={220} height={76} />
          </div>
        ))}
      </div>
    </section>,
  );
}
