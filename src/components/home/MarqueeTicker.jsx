import React from "react";
import { useSite } from "../../services/SiteData.jsx";

export default function MarqueeTicker() {
  const site = useSite();
  const items = Array.isArray(site.home?.ticker) ? site.home.ticker : [];
  if (!items.length) return null;

  // Repeat items for seamless infinite scroll
  const displayItems = [...items, ...items, ...items, ...items];

  return (
    <div className="marquee-ticker-section" aria-hidden="true">
      <div className="marquee-track">
        {displayItems.map((item, idx) => (
          <div className="marquee-item" key={idx}>
            <span className={`marquee-text ${item.highlight ? "marquee-gold" : ""}`}>
              {item.text}
            </span>
            <span className="marquee-dot"></span>
          </div>
        ))}
      </div>
    </div>
  );
}
