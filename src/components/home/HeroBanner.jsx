import React, { useState, useEffect } from "react";
import { HERO_SLIDES } from "../../data/homeData";
import { MapPin, Sparkles } from "lucide-react";

export default function HeroBanner({
  onNavigateToProjects,
  onBookSiteVisit,
}) {
  const [currentIdx, setCurrentIdx] = useState(0);

  // Auto slide transition every 7 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  const activeSlide = HERO_SLIDES[currentIdx];

  return (
    <section className="hero-section" id="home">
      {/* Background slide images with Ken Burns zoom */}
      <div className="hero-slider-bg">
        {HERO_SLIDES.map((slide, idx) => (
          <div
            key={slide.id}
            className={`hero-slide-item ${idx === currentIdx ? "active" : ""}`}
            style={{ backgroundImage: `url(${slide.bgImage})` }}
            aria-hidden={idx !== currentIdx}
          />
        ))}
      </div>

      {/* Dark luxury gradient overlay */}
      <div className="hero-overlay"></div>

      {/* Left Vertical Indicator */}
      <div className="hero-slider-nav" aria-label="Slider navigation">
        {HERO_SLIDES.map((slide, idx) => (
          <button
            key={slide.id}
            type="button"
            className={`hero-nav-item ${idx === currentIdx ? "active" : ""}`}
            onClick={() => setCurrentIdx(idx)}
            aria-label={`Go to slide ${idx + 1}`}
          >
            <span className="hero-nav-track"></span>
            <span className="hero-nav-number">0{idx + 1}</span>
          </button>
        ))}
      </div>

      {/* Main Hero Content */}
      <div className="crestora-container hero-content-inner">
        <div className="hero-text-block">
          {/* Subtitle Badge */}
          <div className="hero-subtitle-badge">
            <Sparkles size={14} color="#dfb743" />
            <span>{activeSlide.subtitle}</span>
          </div>

          {/* Classic Luxury Headline */}
          <h1 className="hero-title">
            Finest <span className="gold-word">{activeSlide.titleHighlight1}</span>
            <br />
            in the most Promising <span>{activeSlide.titleHighlight2}</span>
          </h1>

          {/* Description */}
          <p className="hero-desc">{activeSlide.description}</p>

          {/* Action Buttons */}
          <div className="hero-btn-group">
            <button
              type="button"
              className="crestora-btn crestora-btn-fill"
              onClick={onNavigateToProjects}
            >
              <span className="btn-arrow-normal">→</span>
              <span className="btn-text">EXPLORE PROJECTS</span>
              <span className="btn-arrow-hover">→</span>
            </button>

            <button
              type="button"
              className="crestora-btn crestora-btn-white"
              onClick={() => onBookSiteVisit && onBookSiteVisit(activeSlide)}
            >
              <span className="btn-arrow-normal">✓</span>
              <span className="btn-text">BOOK SITE VISIT</span>
              <span className="btn-arrow-hover">→</span>
            </button>
          </div>
        </div>
      </div>

      {/* Slide Project Pill at Bottom Right */}
      <div className="hero-project-pill">
        <div>
          <div className="hero-pill-price">{activeSlide.price}</div>
          <div className="hero-pill-title">{activeSlide.projectName}</div>
          <div className="hero-pill-loc" style={{ display: "flex", alignItems: "center", gap: "4px", marginTop: "2px" }}>
            <MapPin size={11} color="#dfb743" />
            {activeSlide.location}
          </div>
        </div>
        <button
          type="button"
          onClick={() => onBookSiteVisit && onBookSiteVisit(activeSlide)}
          style={{
            background: "#c59b27",
            color: "#ffffff",
            border: "none",
            padding: "8px 14px",
            fontSize: "11px",
            fontWeight: "700",
            letterSpacing: "1px",
            textTransform: "uppercase",
            cursor: "pointer",
          }}
        >
          View
        </button>
      </div>
    </section>
  );
}
