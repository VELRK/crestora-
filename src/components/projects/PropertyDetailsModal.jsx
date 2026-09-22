import React, { useState, useEffect } from "react";
import { formatINR } from "../../services/mockupApi";
import { X, MapPin, ShieldCheck, Heart, CheckCircle2, Phone, Calendar } from "lucide-react";

export default function PropertyDetailsModal({
  project,
  onClose,
  isFavorite,
  onToggleFavorite,
  onBookSiteVisit,
}) {
  const [activeImg, setActiveImg] = useState(null);

  useEffect(() => {
    if (project) {
      document.body.style.overflow = "hidden";
      setActiveImg(project.image);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [project]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && project) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [project, onClose]);

  if (!project) return null;

  const gallery = project.gallery?.length ? project.gallery : [project.image];
  const displayPrice = project.priceDisplay || formatINR(project.price);

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div
        className="modal-box"
        style={{ maxWidth: "800px" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="modal-header-crestora">
          <div>
            <span style={{ fontSize: "11.5px", color: "#dfb743", fontWeight: "700", textTransform: "uppercase", letterSpacing: "1px" }}>
              {project.statusLabel || "Development Overview"}
            </span>
            <h3 style={{ margin: "2px 0 0" }}>{project.title}</h3>
          </div>
          <button type="button" className="modal-close-btn" onClick={onClose} aria-label="Close">
            <X size={22} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="modal-body-crestora" style={{ padding: "24px" }}>
          {/* Main Visual */}
          <div className="modal-visual-img-wrap">
            <img
              src={activeImg || project.image}
              alt={project.title}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
            {project.badge && (
              <span
                style={{
                  position: "absolute",
                  bottom: "14px",
                  left: "14px",
                  background: "rgba(2, 25, 70, 0.9)",
                  color: "#dfb743",
                  padding: "6px 14px",
                  fontSize: "12px",
                  fontWeight: "700",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                <ShieldCheck size={14} color="#dfb743" />
                {project.badge}
              </span>
            )}
          </div>

          {/* Thumbnail Strip */}
          {gallery.length > 1 && (
            <div style={{ display: "flex", gap: "10px", marginBottom: "22px" }}>
              {gallery.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt={`Thumb ${i}`}
                  onClick={() => setActiveImg(img)}
                  style={{
                    width: "70px",
                    height: "55px",
                    objectFit: "cover",
                    borderRadius: "2px",
                    cursor: "pointer",
                    border: (activeImg || project.image) === img ? "2px solid #c59b27" : "1px solid #cbd5e1",
                  }}
                />
              ))}
            </div>
          )}

          {/* Pricing & Location Overview */}
          <div className="modal-pricing-row">
            <div>
              <div className="modal-price-val">
                {displayPrice}
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "#274f9a", fontSize: "14px", fontWeight: "600", marginTop: "4px" }}>
                <MapPin size={15} color="#274f9a" />
                <span>{project.location}</span>
              </div>
            </div>

            <div style={{ display: "flex", gap: "10px" }}>
              <button
                type="button"
                className="crestora-btn crestora-btn-fill modal-visit-btn"
                onClick={() => {
                  onClose();
                  onBookSiteVisit && onBookSiteVisit(project);
                }}
              >
                <span className="btn-arrow-normal">✓</span>
                <span className="btn-text">BOOK SITE VISIT</span>
                <span className="btn-arrow-hover">→</span>
              </button>
            </div>
          </div>

          {/* Specifications Bar */}
          <div className="modal-specs-bar">
            <div>
              <div style={{ fontSize: "11px", color: "#718096", textTransform: "uppercase" }}>Type</div>
              <div style={{ fontSize: "15px", fontWeight: "700", color: "#163057" }}>{project.typeName}</div>
            </div>
            <div>
              <div style={{ fontSize: "11px", color: "#718096", textTransform: "uppercase" }}>Total Area</div>
              <div style={{ fontSize: "15px", fontWeight: "700", color: "#163057" }}>{project.totalArea || "10 Acres"}</div>
            </div>
            <div>
              <div style={{ fontSize: "11px", color: "#718096", textTransform: "uppercase" }}>Unit Sizes</div>
              <div style={{ fontSize: "15px", fontWeight: "700", color: "#163057" }}>{project.area || "1200 sq.ft"}</div>
            </div>
            <div>
              <div style={{ fontSize: "11px", color: "#718096", textTransform: "uppercase" }}>RERA Number</div>
              <div style={{ fontSize: "13px", fontWeight: "600", color: "#c59b27" }}>{project.reraNumber || "TN/11/Layout"}</div>
            </div>
          </div>

          {/* Description */}
          <div style={{ marginBottom: "22px" }}>
            <h4 style={{ fontSize: "16px", fontWeight: "700", color: "#163057", marginBottom: "8px" }}>
              Project Overview
            </h4>
            <p style={{ color: "#4a5568", fontSize: "15px", lineHeight: "1.7" }}>
              {project.description}
            </p>
          </div>

          {/* Highlights & Amenities */}
          {project.highlights && (
            <div style={{ marginBottom: "24px" }}>
              <h4 style={{ fontSize: "16px", fontWeight: "700", color: "#163057", marginBottom: "12px" }}>
                Development Highlights
              </h4>
              <div className="modal-highlights-grid">
                {project.highlights.map((hl, idx) => (
                  <div key={idx} style={{ display: "flex", alignItems: "flex-start", gap: "8px", fontSize: "13.5px", color: "#2d3748" }}>
                    <CheckCircle2 size={16} color="#c59b27" style={{ flexShrink: 0, marginTop: "2px" }} />
                    <span>{hl}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
