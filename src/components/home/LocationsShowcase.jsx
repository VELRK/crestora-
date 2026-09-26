import React from "react";
import { sectionItems, useSite } from "../../services/SiteData.jsx";

export default function LocationsShowcase({ onSelectLocation }) {
  const site = useSite();
  const block = site.home?.locations;
  const cities = sectionItems(block) || [];
  const eyebrow = block?.eyebrow || "";
  const titleLead = block?.titleLead || "";
  const titleHighlight = block?.titleHighlight || "";
  const intro = block?.intro || "";
  return (
    <section id="locations-section" className="locations-section">
      <div className="crestora-container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-badge-row">
            <span className="section-badge-pill">
              {eyebrow}
            </span>
          </div>
          <h2>
            {titleLead} <span>{titleHighlight}</span>
          </h2>
          <p>
            {intro}
          </p>
        </div>

        {/* Modern Rounded Card Grid (Matching Reference UI) */}
        <div className="locations-modern-grid">
          {cities.map((loc) => (
            <div
              key={loc.id}
              className={`location-modern-card ${loc.span === 2 ? "span-wide" : ""}`}
              onClick={() => onSelectLocation && onSelectLocation(loc.cityKey)}
              role="button"
              tabIndex={0}
              aria-label={`Explore properties in ${loc.name}`}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onSelectLocation && onSelectLocation(loc.cityKey);
                }
              }}
            >
              <div className="location-modern-img-wrap">
                <img src={loc.image} alt={loc.name} loading="lazy" />
              </div>
              <div className="location-modern-info">
                <h3 className="location-modern-title">{loc.name}</h3>
                <span className="location-modern-count">
                  {loc.count} {loc.count === 1 ? "Property" : "Properties"}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
