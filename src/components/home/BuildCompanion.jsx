import React from "react";
import { BUILD_COMPANION_DATA, NRI_SERVICES } from "../../data/homeData";
import whyCbeImg from "../../assets/be.png";
import { CheckCircle2, Shield, Compass, PhoneCall } from "lucide-react";

export default function BuildCompanion({ onBookSiteVisit }) {
  return (
    <section id="build-companion-section" className="build-companion-section">
      <div className="crestora-container">
        {/* Main Build Companion 2-Col Grid */}
        <div className="build-companion-grid">
          {/* Left Column Visual */}
          <div className="build-image-wrapper">
            <img
              src={whyCbeImg}
              alt="Crestora Build Companion"
              loading="lazy"
            />
          </div>

          {/* Right Column Text */}
          <div>
            <div className="section-subtitle-badge">
              {BUILD_COMPANION_DATA.subtitle}
            </div>
            <h2 className="section-title">
              Crestora <span>Build Companion</span>
            </h2>

            <p className="build-lead-text">{BUILD_COMPANION_DATA.lead}</p>

            {BUILD_COMPANION_DATA.paragraphs.map((p, idx) => (
              <p key={idx} style={{ color: "#4a5568", lineHeight: "1.75", marginBottom: "14px" }}>
                {p}
              </p>
            ))}

            {/* 4 Feature Cards */}
            <div className="build-features-grid">
              {BUILD_COMPANION_DATA.features.map((feat, idx) => (
                <div key={idx} className="build-feature-card">
                  <h6>{feat.title}</h6>
                  <p>{feat.desc}</p>
                </div>
              ))}
            </div>

            <button
              type="button"
              className="crestora-btn crestora-btn-fill"
              onClick={onBookSiteVisit}
            >
              <span className="btn-arrow-normal">✓</span>
              <span className="btn-text">TALK TO A BUILD SPECIALIST</span>
              <span className="btn-arrow-hover">→</span>
            </button>
          </div>
        </div>

        {/* NRI Corner Callout Card */}
        <div className="nri-callout-card">
          <div className="nri-text-col">
            <span style={{ color: "#dfb743", fontSize: "12px", fontWeight: "700", letterSpacing: "1.5px", textTransform: "uppercase" }}>
              {NRI_SERVICES.subtitle}
            </span>
            <h3 style={{ fontFamily: "Montserrat, sans-serif", fontSize: "clamp(26px, 3.5vw, 38px)", fontWeight: "300", letterSpacing: "-1px", margin: "8px 0 16px" }}>
              Crestora for <span style={{ fontWeight: "700", color: "#dfb743" }}>NRI Investors</span>
            </h3>
            <p style={{ color: "rgba(255,255,255,0.85)", fontSize: "16px", lineHeight: "1.7", marginBottom: "20px" }}>
              {NRI_SERVICES.paragraphs[0]}
            </p>
            <p style={{ color: "rgba(255,255,255,0.75)", fontSize: "14.5px", lineHeight: "1.7", marginBottom: "24px" }}>
              {NRI_SERVICES.paragraphs[1]}
            </p>
            <button
              type="button"
              className="crestora-btn crestora-btn-gold"
              onClick={onBookSiteVisit}
            >
              <span className="btn-arrow-normal">→</span>
              <span className="btn-text">REQUEST NRI VIRTUAL TOUR</span>
              <span className="btn-arrow-hover">→</span>
            </button>
          </div>

          <div className="nri-visual-col">
            <img
              src="https://cdn.sanity.io/images/hxiv51wl/production/ec15717a06c499f74e8bc6305a2d5e89ea070d09-450x450.png"
              alt="NRI Remote Assistance"
              className="nri-circle-img"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
