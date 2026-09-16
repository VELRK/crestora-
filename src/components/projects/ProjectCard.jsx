import React from "react";
import { formatINR } from "../../services/mockupApi";
import { MapPin, Heart, ShieldCheck, ArrowRight, Calendar } from "lucide-react";

export default function ProjectCard({
  project,
  isFavorite = false,
  onToggleFavorite,
  onSelectProject,
  onBookSiteVisit,
}) {
  const {
    id,
    title,
    location,
    locality,
    price,
    priceDisplay,
    tag,
    badge,
    image,
    area,
    totalArea,
    totalUnits,
    typeName,
  } = project;

  const displayPrice = priceDisplay || formatINR(price);

  return (
    <article
      style={{
        background: "#ffffff",
        border: "1px solid #e0e6ed",
        boxShadow: "0 10px 30px rgba(10, 28, 56, 0.06)",
        transition: "all 0.35s cubic-bezier(0.22, 1, 0.36, 1)",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
      className="crestora-property-card"
    >
      {/* Thumbnail with overlay & badge */}
      <div
        style={{ position: "relative", height: "230px", overflow: "hidden", cursor: "pointer" }}
        onClick={() => onSelectProject && onSelectProject(project)}
      >
        <img
          src={image}
          alt={title}
          loading="lazy"
          style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.6s ease" }}
          className="card-thumb-img"
        />

        {/* Tag Pill */}
        {tag && (
          <span
            style={{
              position: "absolute",
              top: "14px",
              left: "14px",
              background: "#163057",
              color: "#ffffff",
              fontSize: "11px",
              fontWeight: "700",
              letterSpacing: "0.8px",
              textTransform: "uppercase",
              padding: "4px 10px",
              borderRadius: "2px",
            }}
          >
            {tag}
          </span>
        )}

        {/* Favorite Heart Button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite && onToggleFavorite(id);
          }}
          style={{
            position: "absolute",
            top: "12px",
            right: "12px",
            width: "36px",
            height: "36px",
            borderRadius: "50%",
            background: "rgba(255, 255, 255, 0.9)",
            border: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
          }}
          aria-label="Save to favorites"
        >
          <Heart
            size={18}
            fill={isFavorite ? "#ef4444" : "none"}
            color={isFavorite ? "#ef4444" : "#4a5568"}
          />
        </button>

        {/* DTCP / RERA Badge at Bottom of Image */}
        {badge && (
          <div
            style={{
              position: "absolute",
              bottom: "10px",
              left: "14px",
              background: "rgba(2, 25, 70, 0.85)",
              backdropFilter: "blur(6px)",
              color: "#dfb743",
              fontSize: "11px",
              fontWeight: "700",
              letterSpacing: "0.5px",
              padding: "4px 10px",
              display: "flex",
              alignItems: "center",
              gap: "6px",
            }}
          >
            <ShieldCheck size={13} color="#dfb743" />
            <span>{badge}</span>
          </div>
        )}
      </div>

      {/* Card Body */}
      <div style={{ padding: "22px", display: "flex", flexDirection: "column", flex: 1 }}>
        {/* Price Row */}
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: "8px" }}>
          <div style={{ fontSize: "22px", fontWeight: "800", color: "#163057" }}>
            {displayPrice}
          </div>
          <span style={{ fontSize: "12px", color: "#718096", textTransform: "uppercase", fontWeight: "600" }}>
            {project.status === "upcoming" ? "Pre-Launch" : "Onwards"}
          </span>
        </div>

        {/* Title */}
        <h4
          style={{
            fontSize: "19px",
            fontWeight: "700",
            color: "#1e293b",
            margin: "0 0 8px",
            cursor: "pointer",
          }}
          onClick={() => onSelectProject && onSelectProject(project)}
        >
          {title}
        </h4>

        {/* Location */}
        <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "#274f9a", fontSize: "13.5px", fontWeight: "600", marginBottom: "16px" }}>
          <MapPin size={14} color="#274f9a" />
          <span>{location}</span>
        </div>

        {/* Specs Row */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: "8px",
            padding: "12px 0",
            borderTop: "1px solid #edf2f7",
            borderBottom: "1px solid #edf2f7",
            marginBottom: "18px",
            textAlign: "center",
            fontSize: "12px",
            color: "#4a5568",
          }}
        >
          <div>
            <div style={{ fontWeight: "700", color: "#163057" }}>{typeName || "Plots"}</div>
            <div style={{ color: "#718096", fontSize: "11px" }}>Type</div>
          </div>
          <div>
            <div style={{ fontWeight: "700", color: "#163057" }}>{totalArea || "10 Acres"}</div>
            <div style={{ color: "#718096", fontSize: "11px" }}>Land Area</div>
          </div>
          <div>
            <div style={{ fontWeight: "700", color: "#163057" }}>{totalUnits || "168 Units"}</div>
            <div style={{ color: "#718096", fontSize: "11px" }}>Units</div>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: "flex", gap: "10px", marginTop: "auto" }}>
          <button
            type="button"
            className="crestora-btn crestora-btn-outline"
            style={{ flex: 1, height: "42px", padding: "0 12px", fontSize: "12px" }}
            onClick={() => onSelectProject && onSelectProject(project)}
          >
            <span className="btn-arrow-normal">→</span>
            <span className="btn-text">DETAILS</span>
            <span className="btn-arrow-hover">→</span>
          </button>

          <button
            type="button"
            className="crestora-btn crestora-btn-fill"
            style={{ flex: 1, height: "42px", padding: "0 12px", fontSize: "12px" }}
            onClick={() => onBookSiteVisit && onBookSiteVisit(project)}
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
