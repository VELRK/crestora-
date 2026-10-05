import React from "react";
import { sectionItems, useSite } from "../../services/SiteData.jsx";
import { Star, Quote } from "lucide-react";

export default function TestimonialsSection() {
  const site = useSite();
  const reviews = site.home?.googleReviews || {};
  const block = site.home?.testimonials;
  const testimonials = sectionItems(block) || [];
  const eyebrow = block?.eyebrow || "";
  const titleLead = block?.titleLead || "";
  const titleHighlight = block?.titleHighlight || "";
  const intro = block?.intro || "";
  return (
    <section className="testimonials-section">
      <div className="crestora-container">
        {/* Google Reviews Pill (Adissia Signature) */}


        {/* Section Heading */}
        <div className="section-header" style={{ color: "#ffffff" }}>
          <h5 style={{ color: "#dfb743" }}>{eyebrow}</h5>
          <h2 style={{ color: "#ffffff" }}>
            {titleLead} <span>{titleHighlight}</span>
          </h2>
          <p style={{ color: "rgba(255,255,255,0.75)" }}>
            {intro}
          </p>
        </div>

        {/* Testimonials Cards Grid */}
        <div className="testimonial-cards-grid">
          {testimonials.map((t) => (
            <div key={t.id} className="testimonial-card-item">
              <div>
                <div className="testi-stars-row">
                  {"★".repeat(t.rating)}
                </div>
                <p className="testi-quote-text">"{t.quote}"</p>
              </div>

              <div className="testi-author-row">
                <img src={t.avatar} alt={t.name} className="testi-avatar" />
                <div className="testi-author-info">
                  <h5>{t.name}</h5>
                  <p>{t.role} • {t.location}</p>
                  <span>{t.project}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
