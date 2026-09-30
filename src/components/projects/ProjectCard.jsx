import React from "react";
import { formatINR } from "../../services/api";
import {
  MapPin,
  Check,
} from "lucide-react";

export default function ProjectCard({
  project,
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

  const displayConfig = project.bhk || project.configuration || "";

  const displayPlotSize =
    project.plotSize ||
    (area ? area.replace(/sq\.?ft/i, "Sq.Ft.") : "");

  const displayPossession = project.possession || "";

  const displayType =
    project.typeLabel ||
    project.typeName ||
    (project.category === "plots" || project.type === "plots"
      ? "Villa Plots"
      : project.category === "villa" || project.type === "villa"
      ? "Luxury Villas"
      : project.category === "plots-villas" || project.category === "plots_villas"
      ? "Plots & Villas"
      : project.category === "farmlands" || project.type === "farmlands"
      ? "Hillside Farmlands"
      : project.category === "commercial" || project.type === "commercial"
      ? "Commercial Lands"
      : project.category === "gated-community" || project.type === "gated-community"
      ? "Integrated Townships"
      : project.category ? String(project.category).charAt(0).toUpperCase() + String(project.category).slice(1) : "Residential");

  const displayUnits = totalUnits || (project.plots ? `${project.plots} Plots` : "");

  const locShort = locality
    ? locality.charAt(0).toUpperCase() + locality.slice(1)
    : location
    ? location.split(",")[0].trim()
    : "Coimbatore";

  const cityShort = project.cityName || "Coimbatore";

  const displaySubtitle =
    project.subtitle ||
    project.tagline ||
    project.description ||
    (displayType ? `${displayType} in ${locShort}, ${cityShort}` : "");

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
          <div className="plc-media-top" style={{ display: "flex", gap: "6px", alignItems: "center", width: "100%", justifyContent: "space-between" }}>
            <span className={`cpc-status-pill status-${status || "ongoing"}`}>
              <span className="cpc-status-dot"></span>
              {statusText}
            </span>
            {displayType && (
              <span className="cpc-type-pill" style={{
                background: "rgba(15, 23, 42, 0.8)",
                backdropFilter: "blur(4px)",
                color: "#ffffff",
                padding: "3px 9px",
                borderRadius: "20px",
                fontSize: "10.5px",
                fontWeight: "600",
                letterSpacing: "0.4px",
                border: "1px solid rgba(255, 255, 255, 0.2)"
              }}>
                {displayType}
              </span>
            )}
          </div>

          {/* Bottom Approval Tag over image */}
          {(project.reraNumber || project.dtcpNumber || project.badge) && (
            <div className="plc-media-bottom">
              <span className="plc-price-badge" style={{ fontSize: "11px", fontWeight: "700" }}>
                {project.reraNumber ? `RERA: ${project.reraNumber}` : project.dtcpNumber ? `DTCP: ${project.dtcpNumber}` : project.badge}
              </span>
            </div>
          )}
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

            {(project.reraNumber || project.approval?.includes("RERA") || project.badge?.includes("RERA")) && (
              <span className="plc-rera-badge">
                <Check size={13} strokeWidth={2.6} className="plc-check-icon" />
                <span>RERA APPROVED</span>
              </span>
            )}
          </div>

          {/* Location Line with Pin */}
          <div className="plc-location-row">
            <MapPin size={15} className="plc-pin-icon" />
            <span className="plc-location-text">{location}</span>
          </div>

          {/* Subtitle / Description */}
          {displaySubtitle && (
            <div className="plc-subtitle-text">
              {displaySubtitle}
            </div>
          )}

          {/* Dual Column Specs: CONFIGURATION & PLOT SIZE (only if available) */}
          {(displayConfig || displayPlotSize) && (
            <>
              <div className="plc-divider"></div>
              <div className="plc-specs-row">
                {displayConfig && (
                  <div className="plc-spec-col">
                    <span className="plc-spec-label">CONFIGURATION</span>
                    <span className="plc-spec-value">{displayConfig}</span>
                  </div>
                )}

                {displayConfig && displayPlotSize && <div className="plc-spec-vdivider"></div>}

                {displayPlotSize && (
                  <div className="plc-spec-col">
                    <span className="plc-spec-label">PLOT SIZE</span>
                    <span className="plc-spec-value">{displayPlotSize}</span>
                  </div>
                )}
              </div>
            </>
          )}

          {/* Divider */}
          <div className="plc-divider"></div>

          {/* Bottom Meta & Action Row */}
          <div className="plc-bottom-row">
            <div className="plc-meta-pills">
              {displayPossession && (
                <span className="plc-meta-item">
                  <span className="plc-meta-lbl">Possession:</span> {displayPossession}
                </span>
              )}
              {displayPossession && displayType && <span className="plc-dot-sep">•</span>}
              {displayType && (
                <span className="plc-meta-item">
                  <span className="plc-meta-lbl">Type:</span> {displayType}
                </span>
              )}
              {(displayPossession || displayType) && displayUnits && <span className="plc-dot-sep">•</span>}
              {displayUnits && (
                <span className="plc-meta-item">
                  <span className="plc-meta-lbl">Units:</span> {displayUnits}
                </span>
              )}
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
        <div className="cpc-top-bar" style={{ display: "flex", gap: "6px", alignItems: "center", width: "100%", justifyContent: "space-between" }}>
          <span className={`cpc-status-pill status-${status || "ongoing"}`}>
            <span className="cpc-status-dot"></span>
            {statusText}
          </span>
          {displayType && (
            <span className="cpc-type-pill" style={{
              background: "rgba(15, 23, 42, 0.8)",
              backdropFilter: "blur(4px)",
              color: "#ffffff",
              padding: "3px 9px",
              borderRadius: "20px",
              fontSize: "10.5px",
              fontWeight: "600",
              letterSpacing: "0.4px",
              border: "1px solid rgba(255, 255, 255, 0.2)"
            }}>
              {displayType}
            </span>
          )}
        </div>

        {/* Bottom Approval on Media (if available) */}
        {(project.reraNumber || project.dtcpNumber || project.badge) && (
          <div className="cpc-bottom-media-bar">
            <span className="cpc-media-price" style={{ fontSize: "11px", fontWeight: "700" }}>
              {project.reraNumber ? `RERA: ${project.reraNumber}` : project.dtcpNumber ? `DTCP: ${project.dtcpNumber}` : project.badge}
            </span>
          </div>
        )}
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

          {(project.reraNumber || project.approval?.includes("RERA") || project.badge?.includes("RERA")) && (
            <span className="plc-rera-badge">
              <Check size={12} strokeWidth={2.6} className="plc-check-icon" />
              <span>RERA APPROVED</span>
            </span>
          )}
        </div>

        {/* Location with Pin */}
        <div className="cpc-location-info">
          <MapPin size={14} className="plc-pin-icon" />
          <span className="cpc-location-text">{location}</span>
        </div>

        {/* Subtitle */}
        {displaySubtitle && (
          <p className="cpc-subtitle-text" title={displaySubtitle}>
            {displaySubtitle}
          </p>
        )}

        {/* Dual Specs (CONFIGURATION & PLOT SIZE) - only if present */}
        {(displayConfig || displayPlotSize) && (
          <>
            <div className="plc-divider"></div>
            <div className="plc-specs-row">
              {displayConfig && (
                <div className="plc-spec-col">
                  <span className="plc-spec-label">CONFIGURATION</span>
                  <span className="plc-spec-value">{displayConfig}</span>
                </div>
              )}

              {displayConfig && displayPlotSize && <div className="plc-spec-vdivider"></div>}

              {displayPlotSize && (
                <div className="plc-spec-col">
                  <span className="plc-spec-label">PLOT SIZE</span>
                  <span className="plc-spec-value">{displayPlotSize}</span>
                </div>
              )}
            </div>
          </>
        )}

        {/* Divider */}
        <div className="plc-divider"></div>

        {/* Possession, Type & Units */}
        {(displayPossession || displayType || displayUnits) && (
          <div className="cpc-meta-bottom-line">
            {displayPossession && <span><strong>Possession:</strong> {displayPossession}</span>}
            {displayPossession && displayType && <span>•</span>}
            {displayType && <span><strong>Type:</strong> {displayType}</span>}
            {(displayPossession || displayType) && displayUnits && <span>•</span>}
            {displayUnits && <span><strong>Units:</strong> {displayUnits}</span>}
          </div>
        )}

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

