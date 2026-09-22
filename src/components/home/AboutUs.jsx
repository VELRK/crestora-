import React from "react";
import { STATS_DATA } from "../../data/homeData";
import aboutImg from "../../assets/about/about.png";
import { ShieldCheck, CheckCircle2, Award, Users } from "lucide-react";

export default function AboutAdissia({ onExplore, onBookSiteVisit }) {
  return (
    <section id="about-crestora" className="about-crestora-section">
      <div className="crestora-container">
        {/* Intro 2-Column Grid */}
        <div className="about-intro-grid">
          {/* Text Column */}
          <div className="about-text-col">
            <h5>ABOUT US</h5>
            <h2>
              All About <span>Crestora Properties</span>
            </h2>
            <p>
              Crestora Properties develops <strong>DTCP and RERA-approved</strong> gated community villa plots and bespoke luxury residences across Coimbatore and Tamil Nadu's fastest growing corridors.
            </p>
            <p>
              Combining strategic locations, crystal-clear legal titles, and completely transparent documentation, we engineer spaces where families flourish, communities bond, and generational capital appreciation is assured.
            </p>

            <div className="about-features-row">
              <div className="about-feature-item">
                <CheckCircle2 className="feature-check-icon" size={18} />
                <span>100% DTCP & RERA Sanctioned</span>
              </div>
              <div className="about-feature-item">
                <CheckCircle2 className="feature-check-icon" size={18} />
                <span>Instant Patta Transfer & Registry</span>
              </div>
              <div className="about-feature-item">
                <CheckCircle2 className="feature-check-icon" size={18} />
                <span>100% Vasthu Compliant Layouts</span>
              </div>
              <div className="about-feature-item">
                <CheckCircle2 className="feature-check-icon" size={18} />
                <span>Approved by SBI, HDFC & ICICI</span>
              </div>
            </div>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
              <button
                type="button"
                className="crestora-btn crestora-btn-fill"
                onClick={onExplore}
              >
                <span className="btn-arrow-normal">→</span>
                <span className="btn-text">EXPLORE DEVELOPMENTS</span>
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
                src={aboutImg}
                alt="Crestora Properties Landmark Architecture"
              />
            </div>
            <div className="about-badge-floating">
              <h4>12+ YRS</h4>
              <p>Of Ethical Real Estate Leadership</p>
            </div>
          </div>
        </div>

        {/* 5-Column Stats Strip */}
        <div className="stats-strip-wrapper">
          {STATS_DATA.map((stat, idx) => (
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
