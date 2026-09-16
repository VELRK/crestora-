import React, { useState } from "react";
import { CITY_SPOTLIGHT, POPULAR_CITIES } from "../../data/homeData";
import whyCbeImg from "../../assets/whycbe.png";

import { MapPin, ArrowRight } from "lucide-react";

export default function WhyCoimbatore({ onExploreProjects, onSelectLocation }) {
  const [activeCityKey, setActiveCityKey] = useState("coimbatore");
  const cityData = CITY_SPOTLIGHT[activeCityKey] || CITY_SPOTLIGHT.coimbatore;

  return (
    <section id="city-locations-section" className="city-spotlight-section">
      <div className="crestora-container">
        {/* City Switcher Chips */}
        <div className="city-tabs-switcher">
          <button
            type="button"
            className={`city-tab-chip ${activeCityKey === "coimbatore" ? "active" : ""}`}
            onClick={() => setActiveCityKey("coimbatore")}
          >
            COIMBATORE SPOTLIGHT
          </button>
          <button
            type="button"
            className={`city-tab-chip ${activeCityKey === "chennai" ? "active" : ""}`}
            onClick={() => setActiveCityKey("chennai")}
          >
            CHENNAI SPOTLIGHT
          </button>
        </div>

        {/* Section Heading */}
        <div className="section-header">
          <h5>{cityData.badge}</h5>
          <h2>
            {cityData.title.split(" ")[0]} <span>{cityData.title.split(" ").slice(1).join(" ")}</span>
          </h2>
          <p>{cityData.subtitle}</p>
        </div>

        {/* Adissia Signature 3-Column City Layout */}
        <div className="city-3col-layout">
          {/* Left Column (3 Points with Right Accent Border) */}
          <div className="city-left-col">
            {cityData.leftPoints.map((pt, idx) => (
              <div key={idx} className="city-info-box">
                <h4>{pt.title}</h4>
                <p>{pt.desc}</p>
              </div>
            ))}
          </div>

          {/* Center Column: Landmark Architectural Visual */}
          <div className="city-center-visual">
            <img src={whyCbeImg} alt={cityData.title} />
          </div>

          {/* Right Column (3 Points with Left Accent Border) */}
          <div className="city-right-col">
            {cityData.rightPoints.map((pt, idx) => (
              <div key={idx} className="city-info-box">
                <h4>{pt.title}</h4>
                <p>{pt.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Growth Corridors Location Explorer */}
        <div style={{ marginTop: "40px", textAlign: "center" }}>
          <h4 style={{ fontSize: "16px", fontWeight: "700", textTransform: "uppercase", letterSpacing: "1.5px", color: "#163057", marginBottom: "20px" }}>
            Explore Properties by High-Growth Corridors
          </h4>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "12px" }}>
            {POPULAR_CITIES.map((corridor) => (
              <button
                key={corridor.id}
                type="button"
                onClick={() => onSelectLocation ? onSelectLocation(corridor.cityKey) : onExploreProjects()}
                style={{
                  background: "#f8fafc",
                  border: "1px solid #cbd5e1",
                  padding: "10px 20px",
                  borderRadius: "4px",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  fontSize: "13.5px",
                  fontWeight: "600",
                  color: "#1e293b",
                  cursor: "pointer",
                  transition: "all 0.25s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "#274f9a";
                  e.currentTarget.style.color = "#274f9a";
                  e.currentTarget.style.background = "#ffffff";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "#cbd5e1";
                  e.currentTarget.style.color = "#1e293b";
                  e.currentTarget.style.background = "#f8fafc";
                }}
              >
                <MapPin size={14} color="#274f9a" />
                <span>{corridor.name}</span>
                <span style={{ fontSize: "11.5px", color: "#718096" }}>({corridor.count} Units)</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
