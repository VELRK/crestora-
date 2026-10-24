import React, { useRef, useState, useEffect } from "react";
import { sectionItems, useSite } from "../../services/SiteData.jsx";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function CategoriesShowcase({ onSelectCategory }) {
  const site = useSite();
  const block = site.home?.categories;
  const categories = sectionItems(block) || [];
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const eyebrow = block?.eyebrow || "PROPERTY CATEGORIES";
  const titleLead = block?.titleLead || "Explore by";
  const titleHighlight = block?.titleHighlight || "Category";
  const intro =
    block?.intro ||
    "Curated residential plots, luxury villas, eco farmlands, and commercial developments across prime corridors.";

  const updateScrollState = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  };

  useEffect(() => {
    updateScrollState();
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);
    return () => {
      el.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, [categories]);

  const handleScroll = (direction) => {
    if (!scrollRef.current) return;
    const scrollAmount = scrollRef.current.clientWidth * 0.75;
    scrollRef.current.scrollBy({
      left: direction === "next" ? scrollAmount : -scrollAmount,
      behavior: "smooth",
    });
  };

  if (!categories.length) return null;

  return (
    <section id="categories-section" className="categories-section">
      <div className="crestora-container">
        {/* Section Header with Navigation Arrows */}
        <div className="categories-header-row">
          <div className="section-header">
            <h5>{eyebrow}</h5>
            <h2>
              {titleLead} <span>{titleHighlight}</span>
            </h2>
            <p>{intro}</p>
          </div>

          <div className="categories-nav-arrows">
            <button
              type="button"
              className={`categories-nav-btn ${!canScrollLeft ? "disabled" : ""}`}
              onClick={() => handleScroll("prev")}
              disabled={!canScrollLeft}
              aria-label="Previous categories"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              type="button"
              className={`categories-nav-btn ${!canScrollRight ? "disabled" : ""}`}
              onClick={() => handleScroll("next")}
              disabled={!canScrollRight}
              aria-label="Next categories"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Categories Responsive Scroll Track (Web & Mobile) */}
        <div
          ref={scrollRef}
          className="categories-scroll-track"
          role="region"
          aria-label="Property Categories"
        >
          {categories.map((cat, idx) => {
            const title = cat.title || cat.categoryName || "Category";
            return (
              <div
                key={cat.id || cat.categoryKey || idx}
                className="category-classic-card"
                onClick={() => onSelectCategory && onSelectCategory(cat.categoryKey)}
                role="button"
                tabIndex={0}
                aria-label={`Explore ${title}`}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    onSelectCategory && onSelectCategory(cat.categoryKey);
                  }
                }}
              >
                <div className="category-classic-img-wrap">
                  <img src={cat.image} alt={title} loading="lazy" />
                  <div className="category-classic-overlay" />
                </div>

                <div className="category-classic-content">
                  <h3 className="category-classic-title">{title}</h3>
                  <div className="category-classic-accent-line" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

