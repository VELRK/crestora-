import React from "react";
import { sectionItems, useSite } from "../../services/SiteData.jsx";
import { TESTIMONIALS_DATA } from "../../data/homeData";

export default function TestimonialsSection() {
  const site = useSite();
  const block = site.home?.testimonials;
  const rawTestimonials = sectionItems(block) || TESTIMONIALS_DATA;
  const testimonials = rawTestimonials.map((t) => {
    let quote = t.quote || "";
    if (quote.toLowerCase().includes("california")) {
      quote =
        "Looking for a premium DTCP-approved plot in Coimbatore felt daunting until I spoke with Crestora Properties. Their transparency, legal documentation clarity, and swift registration gave me absolute confidence. Highly recommended!";
    }
    return { ...t, quote };
  });
  const eyebrow = block?.eyebrow || "";
  const titleLead = block?.titleLead || "";
  const titleHighlight = block?.titleHighlight || "";
  const intro = block?.intro || "";

  return (
    <section className="testimonials-section">
      <div className="crestora-container">
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
                  {"★".repeat(t.rating || 5)}
                </div>
                <p className="testi-quote-text">"{t.quote}"</p>
              </div>

              <div className="testi-author-row">
                <div className="testi-author-info">
                  <h5>Customer</h5>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
