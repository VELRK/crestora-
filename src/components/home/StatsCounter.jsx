import React from "react";
import { sectionItems, useSite } from "../../services/SiteData.jsx";
import { useCountUp } from "../../hooks/useCountUp";

function StatItem({ item }) {
  const { count, ref } = useCountUp(item.number, 2000);

  let formattedNumber = `${count}${item.suffix}`;
  if (item.displayTarget) {
    if (item.number >= 1000) {
      formattedNumber = `${count.toLocaleString("en-IN")}${item.suffix}`;
    } else {
      formattedNumber = `${count} ${item.suffix}`.trim();
    }
  }

  return (
    <div ref={ref} className="stat-counter-card">
      <div className="stat-number-display">{formattedNumber}</div>
      <div className="stat-label-title">{item.label}</div>
      <p className="stat-subtext-descr">{item.subtext}</p>
    </div>
  );
}

export default function StatsCounter() {
  const site = useSite();
  const stats = sectionItems(site.home?.stats) || [];
  return (
    <section className="home-section stats-counter-section">
      <div className="ul-container">
        <div className="stats-counter-banner">
          <div className="stats-cards-grid">
            {stats.map((item) => (
              <StatItem key={item.id} item={item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
