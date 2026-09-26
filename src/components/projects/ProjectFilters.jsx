import React from "react";
import { useSite } from "../../services/SiteData.jsx";
import { Search, RotateCcw, Filter, LayoutGrid, List } from "lucide-react";

export default function ProjectFilters({
  filters,
  onFilterChange,
  onResetFilters,
  totalCount,
  filteredCount,
  sortBy,
  onSortChange,
  viewMode = "list",
  onViewModeChange,
}) {
  const site = useSite();
  const propertyTypes = site.filters?.propertyTypes || [];
  const locations = site.filters?.localities || [];
  const maxPrices = site.filters?.budgets || [];
  const sortOptions = site.filters?.sortOptions || [];
  const statuses = site.filters?.statuses || [];
  const handleInputChange = (field, value) => {
    onFilterChange({
      ...filters,
      [field]: value,
    });
  };

  const hasActiveFilters =
    (filters.keyword && filters.keyword !== "") ||
    (filters.type && filters.type !== "all") ||
    (filters.location && filters.location !== "all") ||
    (filters.maxPrice && filters.maxPrice !== "all") ||
    (filters.status && filters.status !== "all");

  return (
    <div className="project-filters-card">
      {/* Top Filter Bar */}
      <div className="project-filters-grid">
        {/* Keyword Search */}
        <div style={{ position: "relative" }}>
          <Search size={16} color="#718096" style={{ position: "absolute", left: "14px", top: "15px" }} />
          <input
            type="text"
            placeholder="Search by name, road..."
            className="crestora-input"
            style={{ paddingLeft: "38px" }}
            value={filters.keyword || ""}
            onChange={(e) => handleInputChange("keyword", e.target.value)}
          />
        </div>

        {/* Location Dropdown */}
        <div>
          <select
            className="crestora-input"
            value={filters.location || "all"}
            onChange={(e) => handleInputChange("location", e.target.value)}
          >
            <option value="all">All Prime Locations</option>
            {locations.filter((l) => l.value !== "all").map((loc) => (
              <option key={loc.id} value={loc.value}>
                {loc.label}
              </option>
            ))}
          </select>
        </div>

        {/* Category / Type */}
        <div>
          <select
            className="crestora-input"
            value={filters.type || "all"}
            onChange={(e) => handleInputChange("type", e.target.value)}
          >
            {propertyTypes.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
        </div>

        {/* Budget Max */}
        <div>
          <select
            className="crestora-input"
            value={filters.maxPrice || "all"}
            onChange={(e) => handleInputChange("maxPrice", e.target.value)}
          >
            {maxPrices.map((p) => (
              <option key={p.label} value={p.value}>
                {p.label}
              </option>
            ))}
          </select>
        </div>

        {/* Status */}
        <div>
          <select
            className="crestora-input"
            value={filters.status || "all"}
            onChange={(e) => handleInputChange("status", e.target.value)}
          >
            <option value="all">All Stages</option>
            {statuses.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Filter Stats & Reset Row */}
      <div className="filter-stats-reset-row">
        <div style={{ fontSize: "14px", color: "#4a5568" }}>
          Showing <strong style={{ color: "#163057" }}>{filteredCount}</strong> of{" "}
          <strong>{totalCount}</strong> projects in Coimbatore
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
          {/* Sort By */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{ fontSize: "13px", color: "#718096" }}>Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value)}
              style={{
                height: "36px",
                border: "1px solid #cbd5e1",
                background: "#ffffff",
                padding: "0 10px",
                fontSize: "13px",
                borderRadius: "2px",
                color: "#1e293b",
              }}
            >
              {sortOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          {/* View Mode Toggle */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              border: "1px solid #cbd5e1",
              borderRadius: "3px",
              overflow: "hidden",
            }}
          >
            <button
              type="button"
              onClick={() => onViewModeChange && onViewModeChange("list")}
              style={{
                height: "36px",
                padding: "0 13px",
                border: "none",
                background: viewMode === "list" ? "#163057" : "#ffffff",
                color: viewMode === "list" ? "#ffffff" : "#475569",
                display: "flex",
                alignItems: "center",
                gap: "6px",
                fontSize: "12.5px",
                fontWeight: "700",
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
              title="List View (Classic Portal)"
            >
              <List size={15} />
              <span>List</span>
            </button>
            <button
              type="button"
              onClick={() => onViewModeChange && onViewModeChange("grid")}
              style={{
                height: "36px",
                padding: "0 13px",
                border: "none",
                borderLeft: "1px solid #cbd5e1",
                background: viewMode === "grid" ? "#163057" : "#ffffff",
                color: viewMode === "grid" ? "#ffffff" : "#475569",
                display: "flex",
                alignItems: "center",
                gap: "6px",
                fontSize: "12.5px",
                fontWeight: "700",
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
              title="Grid View (3 Columns)"
            >
              <LayoutGrid size={14} />
              <span>Grid</span>
            </button>
          </div>

          {/* Reset Filters */}
          {hasActiveFilters && (
            <button
              type="button"
              onClick={onResetFilters}
              style={{
                background: "#fee2e2",
                border: "1px solid #fca5a5",
                color: "#b91c1c",
                padding: "6px 14px",
                fontSize: "12px",
                fontWeight: "700",
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                borderRadius: "2px",
                cursor: "pointer",
              }}
            >
              <RotateCcw size={12} />
              <span>Reset Filters</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
