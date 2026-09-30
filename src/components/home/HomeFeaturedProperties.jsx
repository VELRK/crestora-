import React from "react";
import ProjectCard from "../projects/ProjectCard";
import { useSite } from "../../services/SiteData.jsx";
import { ArrowRight } from "lucide-react";

export default function HomeFeaturedProperties({
  featuredProjects = [],
  onSelectProject,
  onBookSiteVisit,
  onViewAll,
}) {
  const site = useSite();
  const copy = site.home?.featured || {};

  // Display top 5 property projects
  const allProjects = site.projects || [];
  const popularOrFeatured = featuredProjects.length > 0 ? featuredProjects : allProjects;
  let displayProjects = popularOrFeatured.slice(0, 5);

  if (displayProjects.length < 5 && allProjects.length > displayProjects.length) {
    const existingIds = new Set(displayProjects.map((p) => p.id));
    const extra = allProjects.filter((p) => !existingIds.has(p.id));
    displayProjects = [...displayProjects, ...extra].slice(0, 5);
  }

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

        {/* Top 5 Featured Cards Grid */}
        <div className="properties-responsive-grid">
          {displayProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onSelectProject={onSelectProject}
              onBookSiteVisit={onBookSiteVisit}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
