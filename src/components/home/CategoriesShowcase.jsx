import React from "react";
import { sectionItems, useSite } from "../../services/SiteData.jsx";
import { ArrowRight } from "lucide-react";

export default function CategoriesShowcase({ onSelectCategory }) {
  const site = useSite();
  const block = site.home?.categories;
  const categories = sectionItems(block) || [];
  const eyebrow = block?.eyebrow || "PROPERTY CATEGORIES";
  const titleLead = block?.titleLead || "Explore by";
  const titleHighlight = block?.titleHighlight || "Category";
  const intro = block?.intro || "Curated residential plots, luxury villas, eco farmlands, and commercial developments across prime corridors.";
  return (
    <section id="categories-section" className="categories-section">
      <div className="crestora-container">
        <div className="section-header">
          <h5>{eyebrow}</h5>
          <h2>
            {titleLead} <span>{titleHighlight}</span>
          </h2>
          <p>
            {intro}
          </p>
        </div>

        <div className="categories-classic-grid">
          {categories.map((cat, idx) => (
            <div
              key={cat.id}
              className="category-classic-card"
              onClick={() => onSelectCategory && onSelectCategory(cat.categoryKey)}
              role="button"
              tabIndex={0}
              aria-label={`Explore ${cat.categoryName}`}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onSelectCategory && onSelectCategory(cat.categoryKey);
                }
              }}
            >
              <div className="category-classic-img-wrap">
                <img src={cat.image} alt={cat.categoryName} loading="lazy" />
                <div className="category-classic-overlay" />
                <span className="category-classic-index">{String(idx + 1).padStart(2, "0")}</span>
              </div>

              <div className="category-classic-content">
                <span className="category-classic-tag">{cat.categoryName}</span>
                <h3 className="category-classic-title">{cat.title}</h3>

                <div className="category-classic-footer">
                  <span className="category-classic-count">{cat.plotsCount}</span>
                  <span className="category-classic-btn">
                    <span>Explore</span>
                    <ArrowRight size={14} className="category-btn-arrow" />
                  </span>
                </div>
              </div>

              <div className="category-classic-bottom-line" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

