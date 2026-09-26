import React from "react";
import { formatINR } from "../../services/api";
import {
  MapPin,
  Heart,
  Check,
} from "lucide-react";

export default function ProjectCard({
  project,
  isFavorite = false,
  onToggleFavorite,
  onSelectProject,
  onBookSiteVisit,
  viewMode = "grid",
}) {
  if (!project) return null;

  const {
    id,
    title,
    location,
    locality,
    price,
    priceDisplay,
    pricePerSqft,
    image,
    area,
    totalUnits,
    typeName,
    status,
  } = project;

  const displayPrice = priceDisplay || formatINR(price);
  const statusText =
    status === "upcoming"
      ? "Pre-Launch"
      : status === "completed"
      ? "Completed"
      : "Ongoing";

  // Derive values matching the reference image layout
  const displayTitle = (title || "").toUpperCase();

  const displayConfig =
    project.configuration ||
    (project.category === "villa"
      ? `${project.beds || 3}, ${Number(project.beds || 3) + 1} BHK Villas`
      : project.category === "farmlands"
      ? "Hillside Farmlands & Cottages"
      : project.category === "commercial"
      ? "Commercial & Retail Frontage"
      : "2, 3, 4 BHK");

  const displayPlotSize =
    project.plotSize ||
    (area ? area.replace(/sq\.?ft/i, "Sq.Ft.") : "760 - 4203 Sq.Ft.");

  const displayPossession =
    project.possession ||
    (status === "completed"
      ? "Ready to Move"
      : status === "upcoming"
      ? "Pre-Launch"
      : "Ready to Move");

  const displayType =
    project.typeLabel ||
    (project.category === "plots"
      ? "Plots"
      : project.category === "villa"
      ? "Villas"
      : project.typeName || "Plots");

  const displayUnits = totalUnits || "225 Plots";

  const locShort = locality
    ? locality.charAt(0).toUpperCase() + locality.slice(1)
    : location
    ? location.split(",")[0].trim()
    : "Coimbatore";

  const cityShort = project.cityName || "Coimbatore";

  const displaySubtitle =
    project.subtitle ||
    (project.category === "plots"
      ? `Residential Land / Plot, 2, 3, 4 BHK Villas in ${locShort}, ${cityShort}`
      : `${typeName || "Luxury Residential"}, ${displayConfig} in ${locShort}, ${cityShort}`);

  // =========================================================================
  // 1. LIST VIEW MODE (Horizontal Card matching user's reference image 1-to-1)
  // =========================================================================
  if (viewMode === "list") {
    return (
      <article className="portal-list-card" data-project-id={id}>
        {/* Left Media Visual */}
        <div
          className="plc-media-wrap"
          onClick={() => onSelectProject && onSelectProject(project)}
        >
          <img
            src={image}
            alt={title}
            loading="lazy"
            className="plc-thumb-img"
          />
          <div className="plc-media-gradient"></div>

          {/* Top Badges */}
          <div className="plc-media-top">
            <span className={`cpc-status-pill status-${status || "ongoing"}`}>
              <span className="cpc-status-dot"></span>
              {statusText}
            </span>

            <button
              type="button"
              className={`cpc-wishlist-btn ${isFavorite ? "is-fav" : ""}`}
              onClick={(e) => {
                e.stopPropagation();
                onToggleFavorite && onToggleFavorite(id);
              }}
              aria-label={isFavorite ? "Remove from wishlist" : "Add to wishlist"}
              title={isFavorite ? "Saved in Wishlist" : "Save Property"}
            >
              <Heart
                size={16}
                fill={isFavorite ? "#dfb743" : "none"}
                color={isFavorite ? "#dfb743" : "#163057"}
                strokeWidth={2.2}
              />
            </button>
          </div>

          {/* Bottom Price Tag over image */}
          <div className="plc-media-bottom">
            <span className="plc-price-badge">
              {displayPrice} <small>Onwards</small>
            </span>
          </div>
        </div>

        {/* Right Content Section (Exact Match to User Reference Image) */}
        <div className="plc-content">
          {/* Top Title & RERA Row */}
          <div className="plc-header-row">
            <h3
              className="plc-title"
              onClick={() => onSelectProject && onSelectProject(project)}
              title={title}
            >
              {displayTitle}
            </h3>

            <span className="plc-rera-badge">
              <Check size={13} strokeWidth={2.6} className="plc-check-icon" />
              <span>RERA APPROVED</span>
            </span>
          </div>

          {/* Location Line with Pin */}
          <div className="plc-location-row">
            <MapPin size={15} className="plc-pin-icon" />
            <span className="plc-location-text">{location}</span>
          </div>

          {/* Subtitle / Description */}
          <div className="plc-subtitle-text">
            {displaySubtitle}
          </div>

          {/* Divider 1 */}
          <div className="plc-divider"></div>

          {/* Dual Column Specs: CONFIGURATION & PLOT SIZE */}
          <div className="plc-specs-row">
            <div className="plc-spec-col">
              <span className="plc-spec-label">CONFIGURATION</span>
              <span className="plc-spec-value">{displayConfig}</span>
            </div>

            <div className="plc-spec-vdivider"></div>

            <div className="plc-spec-col">
              <span className="plc-spec-label">PLOT SIZE</span>
              <span className="plc-spec-value">{displayPlotSize}</span>
            </div>
          </div>

          {/* Divider 2 */}
          <div className="plc-divider"></div>

          {/* Bottom Meta & Action Row */}
          <div className="plc-bottom-row">
            <div className="plc-meta-pills">
              <span className="plc-meta-item">
                <span className="plc-meta-lbl">Possession:</span> {displayPossession}
              </span>
              <span className="plc-dot-sep">•</span>
              <span className="plc-meta-item">
                <span className="plc-meta-lbl">Type:</span> {displayType}
              </span>
              <span className="plc-dot-sep">•</span>
              <span className="plc-meta-item">
                <span className="plc-meta-lbl">Units:</span> {displayUnits}
              </span>
            </div>

            <button
              type="button"
              className="plc-btn-details"
              onClick={() => onSelectProject && onSelectProject(project)}
              aria-label={`View details for ${title}`}
            >
              <span className="plc-btn-text">VIEW DETAILS</span>
              <span className="plc-btn-arrow">→</span>
            </button>
          </div>
        </div>
      </article>
    );
  }

  // =========================================================================
  // 2. GRID VIEW MODE (Vertical Card also using clean Reference UI Layout)
  // =========================================================================
  return (
    <article className="classic-project-card" data-project-id={id}>
      {/* 1. Media Visual Header */}
      <div
        className="cpc-media-wrap"
        onClick={() => onSelectProject && onSelectProject(project)}
      >
        <img
          src={image}
          alt={title}
          loading="lazy"
          className="cpc-thumb-img"
        />
        <div className="cpc-media-gradient"></div>

        {/* Top Badges Row */}
        <div className="cpc-top-bar">
          <span className={`cpc-status-pill status-${status || "ongoing"}`}>
            <span className="cpc-status-dot"></span>
            {statusText}
          </span>

          <button
            type="button"
            className={`cpc-wishlist-btn ${isFavorite ? "is-fav" : ""}`}
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite && onToggleFavorite(id);
            }}
            aria-label={isFavorite ? "Remove from wishlist" : "Add to wishlist"}
            title={isFavorite ? "Saved in Wishlist" : "Save Property"}
          >
            <Heart
              size={16}
              fill={isFavorite ? "#dfb743" : "none"}
              color={isFavorite ? "#dfb743" : "#163057"}
              strokeWidth={2.2}
            />
          </button>
        </div>

        {/* Bottom Price on Media */}
        <div className="cpc-bottom-media-bar">
          <span className="cpc-media-price">
            {displayPrice} <small>Onwards</small>
          </span>
          {pricePerSqft && (
            <span className="cpc-media-sqft">
              ₹{Number(pricePerSqft).toLocaleString("en-IN")}/sq.ft
            </span>
          )}
        </div>
      </div>

      {/* 2. Card Content Body (Clean reference-styled layout) */}
      <div className="cpc-body">
        {/* Title and Green RERA badge row */}
        <div className="cpc-header-row">
          <h3
            className="cpc-title"
            onClick={() => onSelectProject && onSelectProject(project)}
            title={title}
          >
            {displayTitle}
          </h3>

          <span className="plc-rera-badge">
            <Check size={12} strokeWidth={2.6} className="plc-check-icon" />
            <span>RERA APPROVED</span>
          </span>
        </div>

        {/* Location with Pin */}
        <div className="cpc-location-info">
          <MapPin size={14} className="plc-pin-icon" />
          <span className="cpc-location-text">{location}</span>
        </div>

        {/* Subtitle */}
        <p className="cpc-subtitle-text" title={displaySubtitle}>
          {displaySubtitle}
        </p>

        {/* Divider 1 */}
        <div className="plc-divider"></div>

        {/* Dual Specs (CONFIGURATION & PLOT SIZE) */}
        <div className="plc-specs-row">
          <div className="plc-spec-col">
            <span className="plc-spec-label">CONFIGURATION</span>
            <span className="plc-spec-value">{displayConfig}</span>
          </div>

          <div className="plc-spec-vdivider"></div>

          <div className="plc-spec-col">
            <span className="plc-spec-label">PLOT SIZE</span>
            <span className="plc-spec-value">{displayPlotSize}</span>
          </div>
        </div>

        {/* Divider 2 */}
        <div className="plc-divider"></div>

        {/* Possession, Type & Units */}
        <div className="cpc-meta-bottom-line">
          <span><strong>Possession:</strong> {displayPossession}</span>
          <span>•</span>
          <span><strong>Type:</strong> {displayType}</span>
          <span>•</span>
          <span><strong>Units:</strong> {displayUnits}</span>
        </div>

        {/* Action Button Row */}
        <div className="cpc-actions-row">
          <button
            type="button"
            className="plc-btn-details"
            style={{ width: "100%", justifyContent: "center" }}
            onClick={() => onSelectProject && onSelectProject(project)}
            aria-label={`View details for ${title}`}
          >
            <span className="plc-btn-text">VIEW DETAILS</span>
            <span className="plc-btn-arrow">→</span>
          </button>
        </div>
      </div>
    </article>
  );
}

