import React, { useState, useMemo } from "react";
import { useSite, projectMatchesCategory, projectIsExclusive } from "../../services/SiteData.jsx";
import { formatINR } from "../../services/api";
import { ProjectCardSkeleton } from "../common/ShimmerSkeletons";
import "./ExclusiveProjectsPage.css";
import {
  Sparkles,
  ShieldCheck,
  Award,
  MapPin,
  Search,
  Grid,
  List,
  ChevronDown,
  X,
  Phone,
  MessageCircle,
  CheckCircle2,
  Calendar,
  Building2,
  ArrowRight,
  Compass,
  Home,
  Star,
  Trees,
} from "lucide-react";

export default function ExclusiveProjectsPage({
  projects = [],
  onSelectProject,
  onBookSiteVisit,
  onNavigate,
  showToast: _showToast,
}) {
  const site = useSite();
  const settings = site.settings || {};
  const phone = settings.phone || "+91 91590 66666";
  const phoneTel = settings.phone_tel || "+919159066666";
  const defaultWhatsapp =
    settings.whatsapp ||
    "https://wa.me/919159066666?text=Hi%20Crestora%20Properties,%20I%20am%20interested%20in%20your%20exclusive%20projects.";

  // Filter States
  const [searchQuery, setSearchQuery] = useState("");
  const [collectionFilter, setCollectionFilter] = useState("all"); // 'all' | 'flagship' | 'villas' | 'plots' | 'townships' | 'commercial'
  const [corridorFilter, setCorridorFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all"); // 'all' | 'ongoing' | 'upcoming' | 'completed'
  const [budgetFilter, setBudgetFilter] = useState("all"); // 'all' | 'under-50' | '50-100' | 'above-100'
  const [sortBy, setSortBy] = useState("curated"); // 'curated' | 'price-desc' | 'price-asc' | 'rating'
  const [viewMode, setViewMode] = useState("grid"); // 'grid' | 'ledger'

  // Filter ONLY projects marked as exclusive (exclusive: true / isExclusive: true)
  const exclusiveProjectsOnly = useMemo(() => {
    return (projects || []).filter(
      (p) =>
        p.exclusive === true ||
        p.exclusive === 1 ||
        p.exclusive === "1" ||
        p.exclusive === "true" ||
        p.isExclusive === true ||
        p.isExclusive === 1 ||
        p.isExclusive === "1" ||
        p.isExclusive === "true" ||
        p.is_exclusive === 1 ||
        p.is_exclusive === "1" ||
        p.is_exclusive === true
    );
  }, [projects]);

  // Extract distinct corridors from the exclusive project list
  const availableCorridors = useMemo(() => {
    const set = new Map();
    exclusiveProjectsOnly.forEach((p) => {
      const key = p.locality || p.city;
      const name = p.cityName || (p.location ? p.location.split(",")[0].trim() : "");
      if (key && name && !set.has(key)) {
        set.set(key, name);
      }
    });
    return Array.from(set.entries()).map(([value, label]) => ({ value, label }));
  }, [exclusiveProjectsOnly]);

  // Compute filtered & sorted exclusive projects
  const filteredProjects = useMemo(() => {
    let list = [...exclusiveProjectsOnly];

    // 1. Search Query Filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter((p) => {
        const titleMatch = (p.title || p.projectName || "").toLowerCase().includes(q);
        const locMatch = (p.location || "").toLowerCase().includes(q);
        const localityMatch = (p.locality || "").toLowerCase().includes(q);
        const taglineMatch = (p.tagline || "").toLowerCase().includes(q);
        const typeMatch = (p.typeName || "").toLowerCase().includes(q);
        const descMatch = (p.description || "").toLowerCase().includes(q);
        return titleMatch || locMatch || localityMatch || taglineMatch || typeMatch || descMatch;
      });
    }

    // 2. Collection Filter
    if (collectionFilter === "flagship") {
      list = list.filter((p) => projectIsExclusive(p) || (p.price && p.price >= 6000000));
    } else if (collectionFilter === "villas") {
      list = list.filter((p) => projectMatchesCategory(p, "villa"));
    } else if (collectionFilter === "plots") {
      list = list.filter((p) => projectMatchesCategory(p, "plots"));
    } else if (collectionFilter === "townships") {
      list = list.filter((p) => projectMatchesCategory(p, "gated-community"));
    } else if (collectionFilter === "commercial") {
      list = list.filter(
        (p) => projectMatchesCategory(p, "commercial") || projectMatchesCategory(p, "farmlands")
      );
    }

    // 3. Corridor / Locality Filter
    if (corridorFilter !== "all") {
      list = list.filter((p) => p.locality === corridorFilter || p.city === corridorFilter);
    }

    // 4. Status Filter
    if (statusFilter !== "all") {
      list = list.filter((p) => (p.status || "").toLowerCase() === statusFilter.toLowerCase());
    }

    // 6. Sorting
    if (sortBy === "rating") {
      list.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    } else if (sortBy === "title-asc") {
      list.sort((a, b) => (a.title || "").localeCompare(b.title || ""));
    } else {
      // 'curated': prioritize flagship/featured
      list.sort((a, b) => {
        const aScore = projectIsExclusive(a) ? 3 : 0;
        const bScore = projectIsExclusive(b) ? 3 : 0;
        if (aScore !== bScore) return bScore - aScore;
        return (a.title || "").localeCompare(b.title || "");
      });
    }

    return list;
  }, [exclusiveProjectsOnly, searchQuery, collectionFilter, corridorFilter, statusFilter, budgetFilter, sortBy]);

  // Reset all filters helper
  const handleResetFilters = () => {
    setSearchQuery("");
    setCollectionFilter("all");
    setCorridorFilter("all");
    setStatusFilter("all");
    setBudgetFilter("all");
    setSortBy("curated");
  };

  const hasActiveFilters =
    searchQuery.trim() !== "" ||
    collectionFilter !== "all" ||
    corridorFilter !== "all" ||
    statusFilter !== "all" ||
    budgetFilter !== "all" ||
    sortBy !== "curated";

  // Helper for project-specific WhatsApp inquiry URL
  const getProjectWhatsAppUrl = (p) => {
    const text = encodeURIComponent(
      `Hello Crestora Properties, I am interested in your exclusive project "${p.title}" located in ${p.location}. Please share the luxury brochure, master plan, and available inventory.`
    );
    return `https://wa.me/${phoneTel.replace(/[^0-9]/g, "") || "919159066666"}?text=${text}`;
  };

  return (
    <div className="exclusive-page-wrapper">
      {/* =========================================================================
          1. PRESTIGE HERO MASTHEAD
          ========================================================================= */}
      <section className="exclusive-hero-masthead">
        <div className="exclusive-hero-pattern" />
        <div className="exclusive-hero-glow" />

        <div className="crestora-container">
          {/* Top Breadcrumb Navigation */}
          <div className="exclusive-breadcrumb-row">
            <div className="exclusive-breadcrumbs">
              <button
                type="button"
                className="exclusive-breadcrumb-link"
                onClick={() => onNavigate && onNavigate("home")}
              >
                Home
              </button>
              <span className="exclusive-breadcrumb-sep">/</span>
              <button
                type="button"
                className="exclusive-breadcrumb-link"
                onClick={() => onNavigate && onNavigate("projects")}
              >
                Projects
              </button>
              <span className="exclusive-breadcrumb-sep">/</span>
              <span className="exclusive-breadcrumb-curr">Exclusive Projects</span>
            </div>

            <a href={`tel:${phoneTel}`} className="exclusive-vip-direct-pill">
              <span className="exclusive-vip-dot" />
              <span>VIP Concierge: {phone}</span>
            </a>
          </div>


        </div>
      </section>

      {/* =========================================================================
          2. PRO FILTER & CONTROL SUITE (Sticky Bar)
          ========================================================================= */}
      <section className="exclusive-control-bar">
        <div className="crestora-container">
          <div className="exclusive-filter-container">
            {/* Top Row: Search + Corridors + Status + Sort + View */}
            <div className="exclusive-filter-row-top">
              {/* Search Box */}
              <div className="exclusive-search-box">
                <Search size={16} className="exclusive-search-icon" />
                <input
                  type="text"
                  placeholder="Search exclusive enclaves, corridors, or keywords..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="exclusive-search-input"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="exclusive-search-clear"
                    title="Clear search"
                  >
                    <X size={14} />
                  </button>
                )}
              </div>

              {/* Secondary Select Dropdowns */}
              <div className="exclusive-dropdown-group">
                {/* Prime Corridor Select */}
                <div className="exclusive-select-wrap">
                  <select
                    value={corridorFilter}
                    onChange={(e) => setCorridorFilter(e.target.value)}
                    className="exclusive-select"
                  >
                    <option value="all">All Prime Corridors</option>
                    {availableCorridors.map((c) => (
                      <option key={c.value} value={c.value}>
                        {c.label}
                      </option>
                    ))}
                  </select>
                  <ChevronDown size={14} className="exclusive-select-icon" />
                </div>

                {/* Status Select */}
                <div className="exclusive-select-wrap">
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="exclusive-select"
                  >
                    <option value="all">All Development Statuses</option>
                    <option value="ongoing">Ongoing Signature</option>
                    <option value="upcoming">Upcoming Pre-Launch</option>
                    <option value="completed">Completed Landmarks</option>
                  </select>
                  <ChevronDown size={14} className="exclusive-select-icon" />
                </div>

                {/* Sort By */}
                <div className="exclusive-select-wrap">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="exclusive-select"
                  >
                    <option value="curated">Curated Collection</option>
                    <option value="rating">Highest Rated</option>
                    <option value="title-asc">Project Name (A-Z)</option>
                  </select>
                  <ChevronDown size={14} className="exclusive-select-icon" />
                </div>

                {/* View Switcher */}
                <div className="exclusive-view-switch" aria-label="Layout view switcher">
                  <button
                    type="button"
                    className={`exclusive-view-btn ${viewMode === "grid" ? "active" : ""}`}
                    onClick={() => setViewMode("grid")}
                    title="Grid Showcase View"
                  >
                    <Grid size={16} />
                  </button>
                  <button
                    type="button"
                    className={`exclusive-view-btn ${viewMode === "ledger" ? "active" : ""}`}
                    onClick={() => setViewMode("ledger")}
                    title="Architectural Ledger List View"
                  >
                    <List size={16} />
                  </button>
                </div>
              </div>
            </div>

            {/* Bottom Row: Collection Filter Tabs & Results Count */}
            <div className="exclusive-tabs-row">
              <div className="exclusive-collection-pills">
                <button
                  type="button"
                  className={`exclusive-pill-btn ${collectionFilter === "all" ? "active" : ""}`}
                  onClick={() => setCollectionFilter("all")}
                >
                  <span>All Exclusive</span>
                  <span className="exclusive-pill-count">{exclusiveProjectsOnly.length}</span>
                </button>

                <button
                  type="button"
                  className={`exclusive-pill-btn ${collectionFilter === "flagship" ? "active" : ""}`}
                  onClick={() => setCollectionFilter("flagship")}
                >
                  <Star size={12} />
                  <span>Flagship &amp; Featured</span>
                </button>

                <button
                  type="button"
                  className={`exclusive-pill-btn ${collectionFilter === "villas" ? "active" : ""}`}
                  onClick={() => setCollectionFilter("villas")}
                >
                  <Home size={12} />
                  <span>Luxury Villas</span>
                </button>

                <button
                  type="button"
                  className={`exclusive-pill-btn ${collectionFilter === "plots" ? "active" : ""}`}
                  onClick={() => setCollectionFilter("plots")}
                >
                  <Compass size={12} />
                  <span>Villa Plots</span>
                </button>

                <button
                  type="button"
                  className={`exclusive-pill-btn ${collectionFilter === "townships" ? "active" : ""}`}
                  onClick={() => setCollectionFilter("townships")}
                >
                  <Building2 size={12} />
                  <span>Integrated Townships</span>
                </button>

                <button
                  type="button"
                  className={`exclusive-pill-btn ${collectionFilter === "commercial" ? "active" : ""}`}
                  onClick={() => setCollectionFilter("commercial")}
                >
                  <Trees size={12} />
                  <span>Commercial &amp; Farmlands</span>
                </button>
              </div>

              {/* Counter & Reset */}
              <div className="exclusive-results-info">
                <span>
                  Showing <strong className="exclusive-results-bold">{filteredProjects.length}</strong> of{" "}
                  {exclusiveProjectsOnly.length} Exclusive Enclaves
                </span>
                {hasActiveFilters && (
                  <button
                    type="button"
                    onClick={handleResetFilters}
                    className="exclusive-reset-filters-btn"
                  >
                    Reset All Filters
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          3. MAIN EXCLUSIVE PROJECTS SHOWCASE
          ========================================================================= */}
      <section className="exclusive-content-section">
        <div className="crestora-container">
          {/* If Loading or No Results */}
          {!site.ready && filteredProjects.length === 0 ? (
            <div className={viewMode === "grid" ? "exclusive-grid-layout" : "exclusive-list-layout"}>
              {[1, 2, 3, 4, 5, 6].map((idx) => (
                <ProjectCardSkeleton key={idx} viewMode={viewMode === "grid" ? "grid" : "list"} />
              ))}
            </div>
          ) : filteredProjects.length === 0 ? (
            <div className="exclusive-empty-state">
              <div className="exclusive-empty-icon">
                <Search size={32} />
              </div>
              <h3 className="exclusive-empty-title">No Matching Exclusive Projects</h3>
              <p className="exclusive-empty-desc">
                We couldn't find any exclusive developments matching your selected filters. Reset
                your parameters or connect directly with our Coimbatore land acquisition desk.
              </p>
              <button
                type="button"
                onClick={handleResetFilters}
                className="exclusive-btn-visit"
                style={{ margin: "0 auto", display: "inline-flex" }}
              >
                Reset All Filters
              </button>
            </div>
          ) : viewMode === "grid" ? (
            /* ================= GRID VIEW ================= */
            <div className="exclusive-grid-layout">
              {filteredProjects.map((p) => {
                const displayPrice = p.priceDisplay || formatINR(p.price);
                const statusLabel =
                  p.status === "upcoming"
                    ? "Pre-Launch"
                    : p.status === "completed"
                      ? "Completed"
                      : "Ongoing";

                // Format plot / land size
                const sizeText = p.area || (p.sqft ? `${p.sqft} sq.ft` : "1,200 - 3,500 sq.ft");
                const unitsText = p.totalUnits || (p.plots ? `${p.plots} Plots` : "Gated Enclave");
                const locationDisplay = p.cityName
                  ? `${p.cityName} • ${p.location ? p.location.split(",")[0].trim() : ""}`
                  : p.location || "Coimbatore, Tamil Nadu";

                return (
                  <article key={p.id} className="exclusive-card" data-project-id={p.id}>
                    {/* Media Image Box */}
                    <div
                      className="exclusive-card-media"
                      onClick={() => onSelectProject && onSelectProject(p)}
                    >
                      <img
                        src={p.image}
                        alt={p.title}
                        loading="lazy"
                        className="exclusive-card-img"
                      />
                      <div className="exclusive-card-gradient" />

                      {/* Top Badges */}
                      <div className="exclusive-media-top">
                        <span className="exclusive-ribbon-tag">
                          <Sparkles size={11} />
                          <span>{p.tag || "EXCLUSIVE"}</span>
                        </span>

                        <span
                          className={`exclusive-status-badge status-${p.status || "ongoing"}`}
                        >
                          {statusLabel}
                        </span>
                      </div>

                      {/* Bottom Approval Strip (if available) */}
                      {(p.reraNumber || p.dtcpNumber || p.approval) && (
                        <div className="exclusive-media-bottom">
                          <div className="exclusive-media-price">
                            <span className="exclusive-media-price-label">Approval Status</span>
                            <span className="exclusive-media-price-val" style={{ fontSize: "12px", letterSpacing: "0.5px" }}>
                              {p.reraNumber ? `RERA: ${p.reraNumber}` : p.dtcpNumber ? `DTCP: ${p.dtcpNumber}` : p.approval}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Card Body */}
                    <div className="exclusive-card-body">
                      {/* Meta: Type + Location */}
                      <div className="exclusive-card-meta">
                        <span className="exclusive-type-pill">
                          {p.typeName || p.category || "Residential"}
                        </span>
                        <span className="exclusive-loc-text">
                          <MapPin size={12} color="#c59b27" />
                          <span>{locationDisplay}</span>
                        </span>
                      </div>

                      {/* Title & Tagline */}
                      <h3
                        className="exclusive-card-title"
                        onClick={() => onSelectProject && onSelectProject(p)}
                      >
                        {p.title}
                      </h3>
                      {p.tagline ? (
                        <p className="exclusive-card-tagline">
                          {p.tagline}
                        </p>
                      ) : p.description ? (
                        <p className="exclusive-card-tagline">
                          {p.description}
                        </p>
                      ) : null}

                      {/* Specs Grid: Render only fields present in API */}
                      <div className="exclusive-specs-grid">
                        {(p.area || p.sqft) && (
                          <div className="exclusive-spec-item">
                            <span className="exclusive-spec-lbl">Plot / Unit Area</span>
                            <span className="exclusive-spec-val">{p.area || `${p.sqft} sq.ft`}</span>
                          </div>
                        )}
                        {(p.totalUnits || p.plots) && (
                          <div className="exclusive-spec-item">
                            <span className="exclusive-spec-lbl">Total Inventory</span>
                            <span className="exclusive-spec-val">{p.totalUnits || `${p.plots} Units`}</span>
                          </div>
                        )}
                        {p.bhk && (
                          <div className="exclusive-spec-item">
                            <span className="exclusive-spec-lbl">Configuration</span>
                            <span className="exclusive-spec-val">{p.bhk}</span>
                          </div>
                        )}
                        {p.locality && (
                          <div className="exclusive-spec-item">
                            <span className="exclusive-spec-lbl">Corridor Spine</span>
                            <span className="exclusive-spec-val">
                              {p.locality.toUpperCase()}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Amenity Highlights */}
                      {/* {p.amenities && p.amenities.length > 0 && (
                        <div className="exclusive-amenities-row">
                          {p.amenities.slice(0, 3).map((amenity, idx) => (
                            <span key={idx} className="exclusive-amenity-chip">
                              <span className="exclusive-amenity-dot" />
                              <span>{amenity}</span>
                            </span>
                          ))}
                        </div>
                      )} */}

                      {/* DTCP & RERA Approvals Tag */}
                      {/* <div className="exclusive-approvals-row">
                        <span className="exclusive-approval-tag">
                          <CheckCircle2 size={13} />
                          <span>{p.badge || "DTCP & RERA Approved"}</span>
                        </span>
                        {p.reraNumber && (
                          <span style={{ fontSize: "10.5px", color: "#64748b" }}>
                            RERA: {p.reraNumber}
                          </span>
                        )}
                      </div> */}

                      {/* Action Buttons */}
                      <div className="exclusive-actions-row">
                        <button
                          type="button"
                          className="exclusive-btn-details"
                          onClick={() => onSelectProject && onSelectProject(p)}
                        >
                          <span>VIEW DETAILS</span>
                          <ArrowRight size={13} />
                        </button>

                        <button
                          type="button"
                          className="exclusive-btn-visit"
                          onClick={() => onBookSiteVisit && onBookSiteVisit(p)}
                        >
                          <Calendar size={13} />
                          <span>ENQUIRE NOW</span>
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            /* ================= ARCHITECTURAL LEDGER / LIST VIEW ================= */
            <div className="exclusive-ledger-layout">
              {filteredProjects.map((p) => {
                const displayPrice = p.priceDisplay || formatINR(p.price);
                const statusLabel =
                  p.status === "upcoming"
                    ? "Pre-Launch"
                    : p.status === "completed"
                      ? "Completed"
                      : "Ongoing";
                const sizeText = p.area || (p.sqft ? `${p.sqft} sq.ft` : "1,200 - 3,500 sq.ft");
                const unitsText = p.totalUnits || (p.plots ? `${p.plots} Plots` : "Gated Enclave");

                return (
                  <article key={p.id} className="exclusive-ledger-card" data-project-id={p.id}>
                    {/* Media Column */}
                    <div
                      className="exclusive-ledger-media"
                      onClick={() => onSelectProject && onSelectProject(p)}
                    >
                      <img
                        src={p.image}
                        alt={p.title}
                        loading="lazy"
                        className="exclusive-card-img"
                      />
                      <div className="exclusive-card-gradient" />

                      <div className="exclusive-media-top">
                        <span className="exclusive-ribbon-tag">
                          <Sparkles size={11} />
                          <span>{p.tag || "EXCLUSIVE"}</span>
                        </span>
                      </div>

                      <div className="exclusive-media-bottom">
                        <span className={`exclusive-status-badge status-${p.status || "ongoing"}`}>
                          {statusLabel}
                        </span>
                      </div>
                    </div>

                    {/* Middle Info Column */}
                    <div className="exclusive-ledger-content">
                      <div className="exclusive-card-meta">
                        <span className="exclusive-type-pill">
                          {p.typeName || p.category || "Villa Plots"}
                        </span>
                        <span className="exclusive-loc-text">
                          <MapPin size={12} color="#c59b27" />
                          <span>{p.location}</span>
                        </span>
                      </div>

                      <h3
                        className="exclusive-card-title"
                        style={{ fontSize: "21px", marginBottom: "8px" }}
                        onClick={() => onSelectProject && onSelectProject(p)}
                      >
                        {p.title}
                      </h3>

                      <p className="exclusive-card-tagline" style={{ WebkitLineClamp: 2 }}>
                        {p.description || p.tagline}
                      </p>

                      {/* Specs */}
                      <div className="exclusive-specs-grid" style={{ maxWidth: "520px" }}>
                        {(p.area || p.sqft) && (
                          <div className="exclusive-spec-item">
                            <span className="exclusive-spec-lbl">Plot / Unit Area</span>
                            <span className="exclusive-spec-val">{p.area || `${p.sqft} sq.ft`}</span>
                          </div>
                        )}
                        {(p.totalUnits || p.plots) && (
                          <div className="exclusive-spec-item">
                            <span className="exclusive-spec-lbl">Inventory Size</span>
                            <span className="exclusive-spec-val">{p.totalUnits || `${p.plots} Units`}</span>
                          </div>
                        )}
                        {p.bhk && (
                          <div className="exclusive-spec-item">
                            <span className="exclusive-spec-lbl">Configuration</span>
                            <span className="exclusive-spec-val">{p.bhk}</span>
                          </div>
                        )}
                        {(p.reraNumber || p.dtcpNumber || p.badge || p.approval) && (
                          <div className="exclusive-spec-item">
                            <span className="exclusive-spec-lbl">Approvals</span>
                            <span className="exclusive-spec-val" style={{ color: "#059669" }}>
                              {p.reraNumber ? `RERA: ${p.reraNumber}` : p.dtcpNumber ? `DTCP: ${p.dtcpNumber}` : p.badge || p.approval}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Amenities */}
                      {p.amenities && p.amenities.length > 0 && (
                        <div className="exclusive-amenities-row">
                          {p.amenities.slice(0, 4).map((a, i) => (
                            <span key={i} className="exclusive-amenity-chip">
                              <span className="exclusive-amenity-dot" />
                              <span>{a}</span>
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Right Action Column */}
                    <div className="exclusive-ledger-aside">
                      <div className="exclusive-ledger-actions">
                        <button
                          type="button"
                          className="exclusive-btn-visit"
                          onClick={() => onBookSiteVisit && onBookSiteVisit(p)}
                        >
                          <Calendar size={13} />
                          <span>BOOK VIP SITE VISIT</span>
                        </button>

                        <button
                          type="button"
                          className="exclusive-btn-details"
                          onClick={() => onSelectProject && onSelectProject(p)}
                        >
                          <span>VIEW SPECIFICATIONS</span>
                          <ArrowRight size={13} />
                        </button>

                        <a
                          href={getProjectWhatsAppUrl(p)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="exclusive-advisor-wa-btn"
                          style={{ padding: "8px 12px", fontSize: "12px" }}
                        >
                          <MessageCircle size={14} />
                          <span>Instant WhatsApp Brochure</span>
                        </a>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}

          {/* =========================================================================
              4. VIP PRIVATE ADVISORY & NRI CONCIERGE STRIP
              ========================================================================= */}
          <div className="exclusive-concierge-strip">
            <div>
              <div className="exclusive-concierge-eyebrow">
                <Sparkles size={13} />
                <span>PRIVATE CLIENT GROUP &amp; NRI CONCIERGE</span>
              </div>
              <h3 className="exclusive-concierge-title">
                Bespoke Land Advisory &amp; VIP Site Inspection Service
              </h3>
              <p className="exclusive-concierge-desc">
                For high-net-worth families, NRI investors, and corporate leaders seeking custom villa
                plots, off-market enclaves, or private chauffeur-driven airport pickups for project
                inspections across Coimbatore.
              </p>

              <div className="exclusive-concierge-perks">
                <div className="exclusive-perk-item">
                  <CheckCircle2 size={16} className="exclusive-perk-icon" />
                  <span>Complimentary Private Chauffeur Site Visit</span>
                </div>
                <div className="exclusive-perk-item">
                  <CheckCircle2 size={16} className="exclusive-perk-icon" />
                  <span>4K Drone Video Walkthroughs for NRIs</span>
                </div>
                <div className="exclusive-perk-item">
                  <CheckCircle2 size={16} className="exclusive-perk-icon" />
                  <span>Direct Encumbrance &amp; Title Verification</span>
                </div>
                <div className="exclusive-perk-item">
                  <CheckCircle2 size={16} className="exclusive-perk-icon" />
                  <span>0% Brokerage • 100% Direct Developer Pricing</span>
                </div>
              </div>
            </div>

            {/* Right Action Card */}
            <div className="exclusive-concierge-card">
              <div className="exclusive-advisor-title">Direct Senior Advisory Line</div>
              <div className="exclusive-advisor-subtitle">Immediate Response Guaranteed</div>

              <div className="exclusive-concierge-btns">
                <a href={`tel:${phoneTel}`} className="exclusive-advisor-call-btn">
                  <Phone size={15} />
                  <span>Call VIP Desk: {phone}</span>
                </a>

                <a
                  href={defaultWhatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="exclusive-advisor-wa-btn"
                >
                  <MessageCircle size={15} />
                  <span>Chat on WhatsApp (Priority)</span>
                </a>
              </div>
            </div>
          </div>

          {/* =========================================================================
              5. THE CRESTORA EXCLUSIVITY PILLARS
              ========================================================================= */}
          <div className="exclusive-pillars-section">
            <div className="exclusive-pillars-header">
              <h3 className="exclusive-pillars-title">The Crestora Exclusivity Standard</h3>
              <p className="exclusive-pillars-sub">
                Every development in our signature collection adheres to our four uncompromised
                benchmarks of legal title clarity, structural engineering, and strategic appreciation.
              </p>
            </div>

            <div className="exclusive-pillars-grid">
              <div className="exclusive-pillar-card">
                <div className="exclusive-pillar-icon-box">
                  <ShieldCheck size={22} />
                </div>
                <h4 className="exclusive-pillar-title">100% Legal Title Integrity</h4>
                <p className="exclusive-pillar-desc">
                  Every project is backed by mandatory DTCP sanctions, TN RERA registration, and
                  comprehensive legal audits by senior advocates with immediate patta issuance.
                </p>
              </div>

              <div className="exclusive-pillar-card">
                <div className="exclusive-pillar-icon-box">
                  <Compass size={22} />
                </div>
                <h4 className="exclusive-pillar-title">Prime Arterial Corridors</h4>
                <p className="exclusive-pillar-desc">
                  Strictly positioned along high-growth spines such as Avinashi Road, the upcoming
                  elevated bypass, IT corridors, and tranquil Western Ghats foothill sanctuaries.
                </p>
              </div>

              <div className="exclusive-pillar-card">
                <div className="exclusive-pillar-icon-box">
                  <Award size={22} />
                </div>
                <h4 className="exclusive-pillar-title">Plug-and-Play Infrastructure</h4>
                <p className="exclusive-pillar-desc">
                  40ft and 30ft wide blacktop avenues, underground electricity, individual water
                  lines, rainwater percolation, and architectural entrance arches pre-installed.
                </p>
              </div>

              <div className="exclusive-pillar-card">
                <div className="exclusive-pillar-icon-box">
                  <Home size={22} />
                </div>
                <h4 className="exclusive-pillar-title">Crestora Build Companion</h4>
                <p className="exclusive-pillar-desc">
                  End-to-end turnkey architectural design, vastu compliance, structural plan
                  approvals, and verified construction supervision tailored for your dream residence.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
