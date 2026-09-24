import React from "react";
import ProjectCard from "../projects/ProjectCard";
import { useSite } from "../../services/SiteData.jsx";
import { ArrowRight } from "lucide-react";

export default function HomeFeaturedProperties({
  featuredProjects = [],
  favorites = new Set(),
  onToggleFavorite,
  onSelectProject,
  onBookSiteVisit,
  onViewAll,
}) {
  const site = useSite();
  const copy = site.home?.featured || {};
  return (
    <section className="comTitle" style={{ background: "#ffffff", padding: "80px 0" }}>
      <div className="crestora-container">
        {/* Header with Title and 'View All' */}
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: "20px", marginBottom: "45px" }}>
          <div>
            <div className="section-subtitle-badge">{copy.eyebrow || "PRESTIGIOUS PROJECTS"}</div>
            <h2 className="section-title" style={{ margin: 0 }}>
              {copy.titleLead || "Featured Prime"} <span>{copy.titleHighlight || "Residences & Plots"}</span>
            </h2>
          </div>

          <button
            type="button"
            className="crestora-btn crestora-btn-outline"
            style={{ height: "44px", padding: "0 20px", fontSize: "13px" }}
            onClick={onViewAll}
          >
            <span className="btn-arrow-normal">→</span>
            <span className="btn-text">{copy.buttonText || "VIEW ALL PROJECTS"}</span>
            <span className="btn-arrow-hover">→</span>
          </button>
        </div>

        {/* 3 Featured Cards Grid */}
        <div className="properties-responsive-grid">
          {featuredProjects.slice(0, 3).map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              isFavorite={favorites.has(project.id)}
              onToggleFavorite={onToggleFavorite}
              onSelectProject={onSelectProject}
              onBookSiteVisit={onBookSiteVisit}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
