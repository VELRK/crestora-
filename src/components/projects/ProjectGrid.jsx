import React from "react";
import ProjectCard from "./ProjectCard";
import { Search, ChevronLeft, ChevronRight, RotateCcw } from "lucide-react";

export default function ProjectGrid({
  projects = [],
  favorites = new Set(),
  onToggleFavorite,
  onSelectProject,
  onBookSiteVisit,
  onResetFilters,
  currentPage = 1,
  totalPages = 1,
  onPageChange,
}) {
  if (projects.length === 0) {
    return (
      <div
        style={{
          background: "#ffffff",
          border: "1px solid #e2e8f0",
          padding: "60px 20px",
          textAlign: "center",
          borderRadius: "4px",
          marginBottom: "40px",
        }}
      >
        <div
          style={{
            width: "60px",
            height: "60px",
            borderRadius: "50%",
            background: "#f0f4fa",
            color: "#274f9a",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 16px",
          }}
        >
          <Search size={28} />
        </div>
        <h3 style={{ fontSize: "20px", fontWeight: "700", color: "#163057", marginBottom: "8px" }}>
          No Properties Found
        </h3>
        <p style={{ color: "#718096", fontSize: "14.5px", marginBottom: "20px" }}>
          We could not find any developments matching your current filter criteria.
        </p>
        <button
          type="button"
          className="crestora-btn crestora-btn-fill"
          onClick={onResetFilters}
          style={{ height: "42px", padding: "0 20px", fontSize: "13px" }}
        >
          <span className="btn-arrow-normal">↺</span>
          <span className="btn-text">RESET FILTERS</span>
          <span className="btn-arrow-hover">→</span>
        </button>
      </div>
    );
  }

  return (
    <>
      {/* Project Cards Grid */}
      <div className="projects-responsive-grid">
        {projects.map((project) => (
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

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="pagination-controls-row">
          <button
            type="button"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            style={{
              width: "42px",
              height: "42px",
              border: "1px solid #cbd5e1",
              background: "#ffffff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: currentPage === 1 ? "not-allowed" : "pointer",
              opacity: currentPage === 1 ? 0.4 : 1,
            }}
            aria-label="Previous Page"
          >
            <ChevronLeft size={18} />
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
            <button
              key={pageNum}
              type="button"
              onClick={() => onPageChange(pageNum)}
              style={{
                width: "42px",
                height: "42px",
                border: "1px solid",
                borderColor: currentPage === pageNum ? "#163057" : "#cbd5e1",
                background: currentPage === pageNum ? "#163057" : "#ffffff",
                color: currentPage === pageNum ? "#ffffff" : "#1e293b",
                fontWeight: "700",
                fontSize: "14px",
                cursor: "pointer",
              }}
            >
              {pageNum}
            </button>
          ))}

          <button
            type="button"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            style={{
              width: "42px",
              height: "42px",
              border: "1px solid #cbd5e1",
              background: "#ffffff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: currentPage === totalPages ? "not-allowed" : "pointer",
              opacity: currentPage === totalPages ? 0.4 : 1,
            }}
            aria-label="Next Page"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      )}
    </>
  );
}
