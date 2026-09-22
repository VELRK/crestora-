import React from "react";
import { formatINR } from "../../services/mockupApi";
import {
  MapPin,
  Heart,
  ShieldCheck,
  Compass,
  Sparkles,
} from "lucide-react";

export default function ProjectCard({
  project,
  isFavorite = false,
  onToggleFavorite,
  onSelectProject,
  onBookSiteVisit,
}) {
  if (!project) return null;

  const {
    id,
    title,
    location,
    price,
    priceDisplay,
    pricePerSqft,
    tag,
    badge,
    image,
    area,
    totalArea,
    totalUnits,
    typeName,
    status,
    highlights,
  } = project;

  const displayPrice = priceDisplay || formatINR(price);
  const statusText =
    status === "upcoming"
      ? "Pre-Launch"
      : status === "completed"
      ? "Completed"
      : "Ongoing";

  // Derive key highlight
  const firstHighlight =
    tag || (highlights && highlights[0]) || "DTCP & RERA Approved";

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
              size={17}
              fill={isFavorite ? "#dfb743" : "none"}
              color={isFavorite ? "#dfb743" : "#163057"}
              strokeWidth={2.2}
            />
          </button>
        </div>

        {/* Bottom Badges Row Over Image */}
        <div className="cpc-bottom-media-bar">
          <div className="cpc-approval-tag">
            <ShieldCheck size={13} className="cpc-gold-shield" />
            <span>{badge || "DTCP & RERA Approved"}</span>
          </div>

          <span className="cpc-type-chip">{typeName || "Villa Plots"}</span>
        </div>
      </div>

      {/* 2. Card Content Body */}
      <div className="cpc-body">
        {/* Locality & Vasthu Marker */}
        <div className="cpc-meta-row">
          <div className="cpc-location-info">
            <MapPin size={14} className="cpc-loc-pin" />
            <span className="cpc-location-text">{location}</span>
          </div>
          <span className="cpc-vasthu-pill" title="100% Vasthu Compliant">
            <Compass size={12} />
            <span>Vasthu</span>
          </span>
        </div>

        {/* Title */}
        <h3
          className="cpc-title"
          onClick={() => onSelectProject && onSelectProject(project)}
          title={title}
        >
          {title}
        </h3>

        {/* Price & Sq.Ft Row */}
        <div className="cpc-pricing-box">
          <div>
            <span className="cpc-price-sub">Starting Price</span>
            <div className="cpc-price-val">
              {displayPrice}{" "}
              <span className="cpc-period-text">Onwards</span>
            </div>
          </div>

          {pricePerSqft && (
            <div className="cpc-sqft-badge">
              <span className="cpc-sqft-num">
                ₹{Number(pricePerSqft).toLocaleString("en-IN")}
              </span>
              <span className="cpc-sqft-lbl">per sq.ft</span>
            </div>
          )}
        </div>

        {/* Specifications Strip (3 Classic Columns) */}
        <div className="cpc-specs-grid">
          <div className="cpc-spec-col">
            <span className="cpc-spec-title">Land Area</span>
            <span className="cpc-spec-data">{totalArea || "10 Acres"}</span>
          </div>

          <div className="cpc-spec-divider"></div>

          <div className="cpc-spec-col">
            <span className="cpc-spec-title">Plot Sizes</span>
            <span className="cpc-spec-data">
              {area ? area.replace(" sq.ft", "") : "640 - 3,302"}{" "}
              <small>sq.ft</small>
            </span>
          </div>

          <div className="cpc-spec-divider"></div>

          <div className="cpc-spec-col">
            <span className="cpc-spec-title">Total Units</span>
            <span className="cpc-spec-data">
              {totalUnits ? totalUnits.split(" ")[0] : "168"}{" "}
              <small>Units</small>
            </span>
          </div>
        </div>

        {/* Key Feature Highlight Pill */}
        <div className="cpc-feature-highlight">
          <Sparkles size={13} className="cpc-sparkle-icon" />
          <span className="cpc-feature-text">{firstHighlight}</span>
        </div>

        {/* Action Buttons Row */}
        <div className="cpc-actions-row">
          <button
            type="button"
            className="crestora-btn crestora-btn-outline cpc-btn-details"
            onClick={() => onSelectProject && onSelectProject(project)}
            aria-label={`View details for ${title}`}
          >
            <span className="btn-arrow-normal">→</span>
            <span className="btn-text">VIEW DETAILS</span>
            <span className="btn-arrow-hover">→</span>
          </button>

          <button
            type="button"
            className="crestora-btn crestora-btn-gold cpc-btn-visit"
            onClick={() => onBookSiteVisit && onBookSiteVisit(project)}
            aria-label={`Book site visit for ${title}`}
          >
            <span className="btn-arrow-normal">✓</span>
            <span className="btn-text">BOOK VISIT</span>
            <span className="btn-arrow-hover">→</span>
          </button>
        </div>
      </div>
    </article>
  );
}
