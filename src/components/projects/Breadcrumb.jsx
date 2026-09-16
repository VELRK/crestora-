import React from "react";
import { ChevronRight } from "lucide-react";

export default function Breadcrumb({
  title = "Our Developments",
  pageName = "All Developments",
  onHomeClick,
}) {
  return (
    <div
      style={{
        background: "linear-gradient(rgba(2, 25, 70, 0.9), rgba(2, 25, 70, 0.9)), url(https://cdn.sanity.io/images/hxiv51wl/production/896ee8efe4a681f3058d53747295962d9c51b2eb-1920x1000.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        padding: "155px 0 50px",
        color: "#ffffff",
        textAlign: "center",
      }}
    >
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
