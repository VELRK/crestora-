import React from "react";
import { POPULAR_CITIES } from "../../data/homeData";

export default function PopularCities({ onSelectCity }) {
  return (
    <section id="popular-cities-section" className="home-section popular-cities-section">
      <div className="ul-container">
        {/* Section Header */}
        <div className="section-header-center text-center">
          <div className="section-pill">STRATEGIC GROWTH CORRIDORS</div>
          <h2 className="section-title">
            Explore Prime <span className="gold-text">Coimbatore Locations</span>
          </h2>
          <p className="section-description">
            Browse DTCP and RERA-approved plotted developments across Coimbatore's highest-appreciation residential and IT growth corridors.
          </p>
        </div>

        {/* Cities/Localities Grid */}
        <div className="cities-grid">
          {POPULAR_CITIES.map((city) => (
            <div
              key={city.id}
              className="city-card"
              onClick={() => onSelectCity(city.cityKey)}
              role="button"
              tabIndex={0}
            >
              <div className="city-card-img-wrapper">
                <img src={city.image} alt={city.name} loading="lazy" />
                <div className="city-card-overlay"></div>
              </div>

              <div className="city-card-content">
                <span className="city-properties-count">
                  {city.count} Plots Available
                </span>
                <h3 className="city-name">{city.name}</h3>
                <span className="city-state">{city.state}</span>
                {city.highlight && (
                  <p className="city-highlight-note">{city.highlight}</p>
                )}
              </div>

              <div className="city-arrow-pill">
                <span>→</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
