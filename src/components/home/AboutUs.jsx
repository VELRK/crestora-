import React from "react";
import { sectionItems, useSite } from "../../services/SiteData.jsx";
import aboutImg from "../../assets/about/about.png";
import { ShieldCheck, CheckCircle2, Award, Users } from "lucide-react";

export default function AboutAdissia({ onExplore, onBookSiteVisit, onReadMore }) {
  const site = useSite();
  const stats = sectionItems(site.home?.stats) || [];
  const strip = site.home?.aboutStrip || {};
  const imageSrc = strip.image || aboutImg;
  const paragraphs = strip.paragraphs || [];
  const features = strip.features || [];
  const title = strip.title || "";
  const titleHighlight = strip.titleHighlight || "";
  const titleLead = title.replace(titleHighlight, "").trim();
  return (
    <section id="about-crestora" className="about-crestora-section">
      <div className="crestora-container">
        {/* Intro 2-Column Grid */}
        <div className="about-intro-grid">
          {/* Text Column */}
          <div className="about-text-col">
            <h5>{strip.eyebrow || ""}</h5>
            <h2>
              {titleLead} <span>{titleHighlight}</span>
            </h2>
            {paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}

            <div className="about-features-row">
              {features.map((feature) => (
                <div className="about-feature-item" key={typeof feature === "string" ? feature : feature.title}>
                  <CheckCircle2 className="feature-check-icon" size={18} />
                  <span>{typeof feature === "string" ? feature : feature.title}</span>
                </div>
              ))}
            </div>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
              <button
                type="button"
                className="crestora-btn crestora-btn-fill"
                onClick={onExplore}
              >
                <span className="btn-arrow-normal">→</span>
                <span className="btn-text">EXPLORE ALL PROJECTS</span>
                <span className="btn-arrow-hover">→</span>
              </button>

              <button
                type="button"
                className="crestora-btn crestora-btn-gold"
                onClick={onReadMore}
              >
                <span className="btn-arrow-normal">★</span>
                <span className="btn-text">OUR HERITAGE & STORY</span>
                <span className="btn-arrow-hover">→</span>
              </button>

              <button
                type="button"
                className="crestora-btn crestora-btn-outline"
                onClick={onBookSiteVisit}
              >
                <span className="btn-arrow-normal">✓</span>
                <span className="btn-text">BOOK SITE VISIT</span>
                <span className="btn-arrow-hover">→</span>
              </button>
            </div>
          </div>

          {/* Visual Column with Classic Arch */}
          <div className="about-visual-col">
            <div className="about-visual-arch">
              <img
                src={imageSrc}
                alt="Crestora Properties Landmark Architecture"
              />
            </div>
            <div className="about-badge-floating">
              <h4>{strip.badgeValue || "6+ YRS"}</h4>
              <p>{strip.badgeText || "Of Ethical Real Estate Leadership"}</p>
            </div>
          </div>
        </div>

        {/* 5-Column Stats Strip */}
        <div className="stats-strip-wrapper">
          {stats.map((stat, idx) => (
            <div key={idx} className="stat-col">
              <div className="stat-number">
                {stat.value}
                <span className="stat-plus">{stat.suffix}</span>
              </div>
              <div className="stat-title">{stat.label}</div>
              <div className="stat-sub">{stat.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
