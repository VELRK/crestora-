import React, { useState, useEffect } from "react";
import logoImg from "../../assets/logo.jpeg";
import { X, ChevronDown, Phone, Mail, MapPin, Compass, ArrowRight } from "lucide-react";
import { POPULAR_CITIES } from "../../data/homeData";

export default function Sidebar({
  isOpen,
  onClose,
  activePage = "home",
  filters = {},
  onNavigate,
}) {
  const isCategoriesActive =
    activePage === "projects" && filters?.type && filters.type !== "all";
  const isLocationsActive =
    activePage === "projects" && filters?.location && filters.location !== "all";
  const isProjectsActive =
    (activePage === "projects" && !isCategoriesActive && !isLocationsActive) ||
    activePage === "project-details";
  const isBlogsActive = activePage === "blogs" || activePage === "blog-details";
  const isContactActive = activePage === "contact";

  const [openSubmenus, setOpenSubmenus] = useState({
    projects: true,
    categories: isCategoriesActive,
    locations: isLocationsActive,
  });

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const toggleSubmenu = (key) => {
    setOpenSubmenus((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="modal-backdrop"
        style={{
          display: isOpen ? "block" : "none",
          zIndex: 1999,
        }}
        onClick={onClose}
        aria-hidden={!isOpen}
      />

      {/* Slide-out Drawer */}
      <aside
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          width: "100%",
          maxWidth: "380px",
          height: "100vh",
          background: "#091a38",
          color: "#ffffff",
          zIndex: 2000,
          transform: isOpen ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.35s cubic-bezier(0.22, 1, 0.36, 1)",
          overflowY: "auto",
          padding: "24px",
          display: "flex",
          flexDirection: "column",
          boxShadow: "-10px 0 40px rgba(0,0,0,0.5)",
        }}
        aria-label="Mobile Navigation Menu"
      >
        {/* Drawer Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottom: "1px solid rgba(255,255,255,0.12)",
            paddingBottom: "18px",
            marginBottom: "24px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div
              style={{
                width: "42px",
                height: "42px",
                borderRadius: "50%",
                background: "#ffffff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
                border: "1.5px solid #c59b27",
                flexShrink: 0,
              }}
            >
              <img
                src={logoImg}
                alt="Crestora Emblem"
                style={{ width: "140%", height: "140%", objectFit: "cover", objectPosition: "center 20%" }}
              />
            </div>
            <div>
              <div style={{ fontFamily: "Montserrat, sans-serif", fontWeight: "800", fontSize: "17px", letterSpacing: "1px", color: "#ffffff" }}>
                CRESTORA
              </div>
              <div style={{ fontSize: "8.5px", letterSpacing: "1.8px", color: "#dfb743", textTransform: "uppercase", fontWeight: "700" }}>
                PROPERTIES
              </div>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            style={{ color: "#ffffff", padding: "6px", background: "none", border: "none" }}
            aria-label="Close menu"
          >
            <X size={24} />
          </button>
        </div>

        {/* Navigation Links */}
        <nav style={{ flex: 1, display: "flex", flexDirection: "column", gap: "10px" }}>
          <button
            type="button"
            onClick={() => {
              onNavigate && onNavigate("home");
              onClose();
            }}
            style={{
              textAlign: "left",
              padding: "12px 0",
              fontSize: "15px",
              fontWeight: "700",
              color: activePage === "home" ? "#dfb743" : "#ffffff",
              borderBottom: "1px solid rgba(255,255,255,0.08)",
              background: "none",
              border: "none",
            }}
          >
            HOME
          </button>

          <button
            type="button"
            onClick={() => {
              onNavigate && onNavigate("about");
              onClose();
            }}
            style={{
              textAlign: "left",
              padding: "12px 0",
              fontSize: "15px",
              fontWeight: "700",
              color: activePage === "about" ? "#dfb743" : "#ffffff",
              borderBottom: "1px solid rgba(255,255,255,0.08)",
              background: "none",
              border: "none",
            }}
          >
            ABOUT US
          </button>

          {/* Collapsible Projects */}
          <div>
            <button
              type="button"
              onClick={() => toggleSubmenu("projects")}
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "12px 0",
                fontSize: "15px",
                fontWeight: "700",
                color: isProjectsActive ? "#dfb743" : "#ffffff",
                borderBottom: "1px solid rgba(255,255,255,0.08)",
                background: "none",
                border: "none",
              }}
            >
              <span>PROJECTS</span>
              <ChevronDown
                size={16}
                style={{
                  transform: openSubmenus.projects ? "rotate(180deg)" : "rotate(0)",
                  transition: "transform 0.25s",
                }}
              />
            </button>
            {openSubmenus.projects && (
              <div style={{ padding: "8px 0 12px 14px", display: "flex", flexDirection: "column", gap: "8px" }}>
                <button
                  type="button"
                  onClick={() => {
                    onNavigate && onNavigate("projects", { status: "ongoing", type: "all", location: "all" });
                    onClose();
                  }}
                  style={{
                    textAlign: "left",
                    color: activePage === "projects" && filters?.status === "ongoing" ? "#dfb743" : "#cbd5e1",
                    fontWeight: activePage === "projects" && filters?.status === "ongoing" ? "700" : "400",
                    fontSize: "14px",
                    padding: "6px 0",
                    background: "none",
                    border: "none",
                  }}
                >
                  Ongoing Projects
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onNavigate && onNavigate("projects", { status: "upcoming", type: "all", location: "all" });
                    onClose();
                  }}
                  style={{
                    textAlign: "left",
                    color: activePage === "projects" && filters?.status === "upcoming" ? "#dfb743" : "#cbd5e1",
                    fontWeight: activePage === "projects" && filters?.status === "upcoming" ? "700" : "400",
                    fontSize: "14px",
                    padding: "6px 0",
                    background: "none",
                    border: "none",
                  }}
                >
                  Upcoming Projects
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onNavigate && onNavigate("projects", { status: "completed", type: "all", location: "all" });
                    onClose();
                  }}
                  style={{
                    textAlign: "left",
                    color: activePage === "projects" && filters?.status === "completed" ? "#dfb743" : "#cbd5e1",
                    fontWeight: activePage === "projects" && filters?.status === "completed" ? "700" : "400",
                    fontSize: "14px",
                    padding: "6px 0",
                    background: "none",
                    border: "none",
                  }}
                >
                  Completed Landmarks
                </button>
              </div>
            )}
          </div>

          {/* Collapsible Categories */}
          <div>
            <button
              type="button"
              onClick={() => toggleSubmenu("categories")}
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "12px 0",
                fontSize: "15px",
                fontWeight: "700",
                color: isCategoriesActive ? "#dfb743" : "#ffffff",
                borderBottom: "1px solid rgba(255,255,255,0.08)",
                background: "none",
                border: "none",
              }}
            >
              <span>CATEGORIES</span>
              <ChevronDown
                size={16}
                style={{
                  transform: openSubmenus.categories ? "rotate(180deg)" : "rotate(0)",
                  transition: "transform 0.25s",
                }}
              />
            </button>
            {openSubmenus.categories && (
              <div style={{ padding: "8px 0 12px 14px", display: "flex", flexDirection: "column", gap: "10px" }}>
                <button
                  type="button"
                  onClick={() => {
                    onNavigate && onNavigate("projects", { type: "plots", location: "all" });
                    onClose();
                  }}
                  style={{
                    textAlign: "left",
                    color: activePage === "projects" && filters?.type === "plots" ? "#dfb743" : "#cbd5e1",
                    fontWeight: activePage === "projects" && filters?.type === "plots" ? "700" : "400",
                    fontSize: "14px",
                    padding: "4px 0",
                    background: "none",
                    border: "none",
                  }}
                >
                  <span style={{ color: "#dfb743", fontWeight: "700" }}>Plots</span> – DTCP Villa Plots
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onNavigate && onNavigate("projects", { type: "villa", location: "all" });
                    onClose();
                  }}
                  style={{
                    textAlign: "left",
                    color: activePage === "projects" && filters?.type === "villa" ? "#dfb743" : "#cbd5e1",
                    fontWeight: activePage === "projects" && filters?.type === "villa" ? "700" : "400",
                    fontSize: "14px",
                    padding: "4px 0",
                    background: "none",
                    border: "none",
                  }}
                >
                  <span style={{ color: "#dfb743", fontWeight: "700" }}>Villas</span> – Luxury Gated Villas
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onNavigate && onNavigate("projects", { type: "farmlands", location: "all" });
                    onClose();
                  }}
                  style={{
                    textAlign: "left",
                    color: activePage === "projects" && filters?.type === "farmlands" ? "#dfb743" : "#cbd5e1",
                    fontWeight: activePage === "projects" && filters?.type === "farmlands" ? "700" : "400",
                    fontSize: "14px",
                    padding: "4px 0",
                    background: "none",
                    border: "none",
                  }}
                >
                  <span style={{ color: "#dfb743", fontWeight: "700" }}>Farmlands</span> – Hillside &amp; Eco Lands
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onNavigate && onNavigate("projects", { type: "commercial", location: "all" });
                    onClose();
                  }}
                  style={{
                    textAlign: "left",
                    color: activePage === "projects" && filters?.type === "commercial" ? "#dfb743" : "#cbd5e1",
                    fontWeight: activePage === "projects" && filters?.type === "commercial" ? "700" : "400",
                    fontSize: "14px",
                    padding: "4px 0",
                    background: "none",
                    border: "none",
                  }}
                >
                  <span style={{ color: "#dfb743", fontWeight: "700" }}>Commercial Lands</span> – Retail &amp; Highway
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onNavigate && onNavigate("projects", { type: "gated-community", location: "all" });
                    onClose();
                  }}
                  style={{
                    textAlign: "left",
                    color: activePage === "projects" && filters?.type === "gated-community" ? "#dfb743" : "#cbd5e1",
                    fontWeight: activePage === "projects" && filters?.type === "gated-community" ? "700" : "400",
                    fontSize: "14px",
                    padding: "4px 0",
                    background: "none",
                    border: "none",
                  }}
                >
                  <span style={{ color: "#dfb743", fontWeight: "700" }}>Gated Communities</span> – Master Townships
                </button>
              </div>
            )}
          </div>

          {/* Collapsible Locations - Enhanced Rich UI */}
          <div>
            <button
              type="button"
              onClick={() => toggleSubmenu("locations")}
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "12px 0",
                fontSize: "15px",
                fontWeight: "700",
                color: isLocationsActive ? "#dfb743" : "#ffffff",
                borderBottom: "1px solid rgba(255,255,255,0.08)",
                background: "none",
                border: "none",
              }}
            >
              <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <span>LOCATIONS</span>
                <span
                  style={{
                    fontSize: "10px",
                    fontWeight: "800",
                    background: "rgba(197, 155, 39, 0.2)",
                    color: "#dfb743",
                    padding: "1px 6px",
                    borderRadius: "4px",
                    border: "1px solid rgba(197, 155, 39, 0.4)",
                  }}
                >
                  7 Locations
                </span>
              </span>
              <ChevronDown
                size={16}
                style={{
                  transform: openSubmenus.locations ? "rotate(180deg)" : "rotate(0)",
                  transition: "transform 0.25s",
                }}
              />
            </button>
            {openSubmenus.locations && (
              <div style={{ padding: "10px 0 14px", display: "flex", flexDirection: "column", gap: "8px" }}>
                {POPULAR_CITIES.map((city) => {
                  const isSelected = activePage === "projects" && filters?.location === city.cityKey;
                  return (
                    <button
                      key={city.id}
                      type="button"
                      className={`sidebar-location-card ${isSelected ? "active" : ""}`}
                      onClick={() => {
                        onNavigate && onNavigate("projects", { location: city.cityKey, type: "all" });
                        onClose();
                      }}
                    >
                      <div className="sidebar-loc-left">
                        <div className="sidebar-loc-pin">
                          <MapPin size={14} />
                        </div>
                        <div>
                          <span className="sidebar-loc-name">{city.name}</span>
                          <span className="sidebar-loc-desc">{city.state}</span>
                        </div>
                      </div>
                      <span className="sidebar-loc-count">
                        {city.count} {city.count === 1 ? "Property" : "Properties"}
                      </span>
                    </button>
                  );
                })}

                <button
                  type="button"
                  className="sidebar-explore-all-btn"
                  onClick={() => {
                    onNavigate && onNavigate("home");
                    onClose();
                    setTimeout(() => {
                      document
                        .getElementById("locations-section")
                        ?.scrollIntoView({ behavior: "smooth" });
                    }, 150);
                  }}
                >
                  <Compass size={14} />
                  <span>Explore Prime Locations</span>
                  <ArrowRight size={13} />
                </button>
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={() => {
              onNavigate && onNavigate("blogs");
              onClose();
            }}
            style={{
              textAlign: "left",
              padding: "12px 0",
              fontSize: "15px",
              fontWeight: "700",
              color: isBlogsActive ? "#dfb743" : "#ffffff",
              borderBottom: "1px solid rgba(255,255,255,0.08)",
              background: "none",
              border: "none",
            }}
          >
            BLOGS & INSIGHTS
          </button>

          <button
            type="button"
            onClick={() => {
              onNavigate && onNavigate("contact");
              onClose();
            }}
            style={{
              textAlign: "left",
              padding: "12px 0",
              fontSize: "15px",
              fontWeight: "700",
              color: isContactActive ? "#dfb743" : "#dfb743",
              borderBottom: "1px solid rgba(255,255,255,0.08)",
              background: "none",
              border: "none",
            }}
          >
            CONTACT US
          </button>
        </nav>

        {/* Direct Contact Details */}
        <div style={{ paddingTop: "20px", borderTop: "1px solid rgba(255,255,255,0.12)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px", fontSize: "13.5px", color: "#cbd5e1" }}>
            <Phone size={16} color="#dfb743" />
            <a href="tel:+919159066666" style={{ color: "#ffffff", fontWeight: "700" }}>+91 91590 66666</a>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px", fontSize: "13.5px", color: "#cbd5e1" }}>
            <Mail size={16} color="#dfb743" />
            <a href="mailto:info@crestoraproperties.com" style={{ color: "#cbd5e1" }}>info@crestoraproperties.com</a>
          </div>
          <div style={{ display: "flex", alignItems: "flex-start", gap: "10px", fontSize: "12.5px", color: "#94a3b8", lineHeight: "1.5" }}>
            <MapPin size={16} color="#dfb743" style={{ flexShrink: 0, marginTop: "2px" }} />
            <span>Harita Center, Avinashi Rd, Opp. to GKNM Hospital, Coimbatore - 641 037</span>
          </div>
        </div>
      </aside>
    </>
  );
}
