import React from "react";
import { sectionItems, useSite } from "../../services/SiteData.jsx";

export default function WhyChooseUs({ onExplore, onBookSiteVisit }) {
  const site = useSite();
  const features = sectionItems(site.home?.whyChoose) || site.home?.whyChoose?.features || [];
  return (
    <section className="adissia-why-us-section">
      <div className="ul-container">
        <div className="why-us-grid">
          {/* Left Text & Features */}
          <div className="why-us-content-col">
            <div className="section-pill">WHY ADISSIA</div>
            <h2 className="section-title">
              Why Invest with <span className="gold-text">Adissia Developers</span>?
            </h2>
            <p className="section-description">
              With over 12+ delivered landmarks and 1,200+ satisfied plot owners in Coimbatore, Adissia represents trust, quality infrastructure, and long-term land security.
            </p>

            <div className="why-features-cards-grid">
              {features.map((f) => (
                <div key={f.id} className="adissia-feature-card">
                  <div className="feature-card-header">
                    <span className="feature-icon-badge">✦</span>
                    <h4>{f.title}</h4>
                  </div>
                  <p>{f.description || f.desc}</p>
                </div>
              ))}
            </div>

            <div className="why-us-btns">
              <button
                type="button"
                className="adissia-btn adissia-btn-gold"
                onClick={onExplore}
              >
                <span>VIEW ALL PROJECTS</span>
                <span className="btn-arrow-hover">→</span>
              </button>

              <button
                type="button"
                className="adissia-btn adissia-btn-outline-gold"
                onClick={onBookSiteVisit}
              >
                <span>BOOK FREE SITE VISIT</span>
                <span className="btn-arrow-hover">→</span>
              </button>
            </div>
          </div>

          {/* Right Visual Image */}
          <div className="why-us-visual-col d-none d-lg-block">
            <div className="why-us-image-card">
              <img
                src="https://cdn.sanity.io/images/hxiv51wl/production/896ee8efe4a681f3058d53747295962d9c51b2eb-1920x1000.jpg"
                alt="Adissia Gated Community"
                className="why-us-main-img"
                loading="lazy"
              />
              <div className="why-us-stats-floating-badge">
                <span className="floating-badge-num">100%</span>
                <span className="floating-badge-lbl">Clear Title Guarantee</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
