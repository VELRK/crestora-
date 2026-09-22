import React from "react";
import { ChevronRight } from "lucide-react";

export default function Breadcrumb({
  title = "Our Developments",
  pageName = "All Developments",
  onHomeClick,
}) {
  return (
    <div className="breadcrumb-banner">
      <div className="crestora-container">
        <h1
          style={{
            fontFamily: "Montserrat, sans-serif",
            fontSize: "clamp(32px, 4.5vw, 48px)",
            fontWeight: "300",
            letterSpacing: "-1.5px",
            textTransform: "uppercase",
            marginBottom: "12px",
          }}
        >
          {title.split(" ")[0]} <span style={{ fontWeight: "700", color: "#dfb743" }}>{title.split(" ").slice(1).join(" ")}</span>
        </h1>

        <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", fontSize: "13.5px", color: "rgba(255,255,255,0.75)" }}>
          <button
            type="button"
            onClick={onHomeClick}
            style={{ color: "#ffffff", fontWeight: "600", background: "none", border: "none", cursor: "pointer" }}
          >
            Home
          </button>
          <ChevronRight size={14} color="#dfb743" />
          <span style={{ color: "#dfb743" }}>{pageName}</span>
        </div>
      </div>
    </div>
  );
}
