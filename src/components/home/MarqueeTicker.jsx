import React from "react";

export default function MarqueeTicker() {
  const items = [
    { text: "THINK REAL ESTATE", highlight: false },
    { text: "THINK CRESTORA PROPERTIES", highlight: true },
    { text: "DTCP & RERA APPROVED", highlight: false },
    { text: "BUILDING TRUST • CREATING VALUE", highlight: true },
    { text: "PRIME CORRIDORS & CLEAR TITLES", highlight: false },
    { text: "1,500+ LUXURY PLOTS & VILLAS", highlight: true },
    { text: "100% VASTHU COMPLIANT LAYOUTS", highlight: false },
  ];

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
