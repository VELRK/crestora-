import React, { useState, useEffect } from "react";
import logoImg from "../../assets/logo.jpeg";
import {
  Phone,
  Mail,
  MapPin,
  ShieldCheck,
  Clock,
  ChevronDown,
  Menu,
  Calendar,
  Sparkles,
} from "lucide-react";

export default function Header({
  activePage = "home",
  filters = {},
  onNavigate,
  onOpenSidebar,
  onOpenSearch,
  onOpenBookVisit,
  favoritesCount = 0,
}) {
  const [isScrolled, setIsScrolled] = useState(false);

  // Determine active highlights based on active page and active filters
  const isHomeActive = activePage === "home";
  const isAboutActive = activePage === "about";
  const isCategoriesActive =
    activePage === "projects" && filters?.type && filters.type !== "all";
  const isLocationsActive =
    activePage === "projects" && filters?.location && filters.location !== "all";
  const isProjectsActive =
    (activePage === "projects" && !isCategoriesActive && !isLocationsActive) ||
    activePage === "project-details";
  const isBlogsActive = activePage === "blogs" || activePage === "blog-details";
  const isContactActive = activePage === "contact";

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`crestora-header-wrapper ${isScrolled ? "scrolled" : ""}`}>
      {/* 1. Classic Luxury Top Utility Bar */}
      <div className="crestora-topbar">
        <div className="topbar-container">
          <div className="topbar-left">
            <a
              href="tel:+919159066666"
              className="topbar-item"
              title="Direct Telephone line to Crestora Properties"
            >
              <Phone size={12.5} className="topbar-icon" />
              <span>+91 91590 66666</span>
            </a>
            <span className="topbar-separator">|</span>
            <a
              href="mailto:info@crestoraproperties.com"
              className="topbar-item"
              title="Official Enquiry Mail"
            >
              <Mail size={12.5} className="topbar-icon" />
              <span>info@crestoraproperties.com</span>
            </a>
            <span className="topbar-separator d-none-tablet">|</span>
            <div className="topbar-item d-none-tablet">
              <MapPin size={12.5} className="topbar-icon" />
              <span>Coimbatore</span>
            </div>
          </div>

          <div className="topbar-right">
            <div className="topbar-badge">
              <ShieldCheck size={13} className="topbar-icon-gold" />
              <span>DTCP &amp; RERA Approved Projects</span>
            </div>
            <span className="topbar-separator d-none-mobile">|</span>
            <span className="topbar-hours d-none-mobile">
              <Clock size={12} className="topbar-icon" /> 9:00 AM – 7:30 PM
            </span>
          </div>
        </div>
      </div>

      {/* 2. Main Fixed Navigation Bar */}
      <div className="crestora-navbar">
        <div className="header-container">
          {/* Brand Logo with Classic Crestora Identity */}
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              onNavigate && onNavigate("home");
            }}
            className="brand-wrapper"
            aria-label="Crestora Properties Home"
          >
            <div className="brand-emblem-wrap">
              <img
                src={logoImg}
                alt="Crestora Emblem"
                className="brand-emblem-img"
              />
            </div>
            <div className="brand-identity">
              <div className="brand-main-title">CRESTORA</div>
              <div className="brand-gold-sub">
                <span className="gold-line"></span>
                <span className="gold-text">PROPERTIES</span>
                <span className="gold-line"></span>
              </div>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="nav-links-wrapper" aria-label="Main Navigation">
            <div className="nav-link-item">
              <button
                type="button"
                className={`nav-link-btn ${isHomeActive ? "active" : ""}`}
                onClick={() => onNavigate && onNavigate("home")}
              >
                HOME
              </button>
            </div>

            <div className="nav-link-item">
              <button
                type="button"
                className={`nav-link-btn ${isAboutActive ? "active" : ""}`}
                onClick={() => onNavigate && onNavigate("about")}
              >
                ABOUT US
              </button>
            </div>

            {/* Projects Dropdown */}
            <div className="nav-link-item">
              <button
                type="button"
                className={`nav-link-btn ${isProjectsActive ? "active" : ""}`}
                onClick={() => onNavigate && onNavigate("projects")}
              >
                PROJECTS <ChevronDown className="nav-chevron" size={13} />
              </button>
              <div className="nav-dropdown-menu">
                <a
                  href="#ongoing"
                  className={`dropdown-link ${activePage === "projects" && filters?.status === "ongoing" ? "active" : ""}`}
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate && onNavigate("projects", { status: "ongoing", type: "all", location: "all" });
                  }}
                >
                  Ongoing Developments
                </a>
                <a
                  href="#upcoming"
                  className={`dropdown-link ${activePage === "projects" && filters?.status === "upcoming" ? "active" : ""}`}
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate && onNavigate("projects", { status: "upcoming", type: "all", location: "all" });
                  }}
                >
                  Upcoming Projects
                </a>
                <a
                  href="#completed"
                  className={`dropdown-link ${activePage === "projects" && filters?.status === "completed" ? "active" : ""}`}
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate && onNavigate("projects", { status: "completed", type: "all", location: "all" });
                  }}
                >
                  Completed Landmarks
                </a>
              </div>
            </div>

            {/* Categories Dropdown */}
            <div className="nav-link-item">
              <button
                type="button"
                className={`nav-link-btn ${isCategoriesActive ? "active" : ""}`}
                onClick={() => {
                  onNavigate && onNavigate("home");
                  setTimeout(() => {
                    document
                      .getElementById("categories-section")
                      ?.scrollIntoView({ behavior: "smooth" });
                  }, 100);
                }}
              >
                CATEGORIES <ChevronDown className="nav-chevron" size={13} />
              </button>
              <div className="nav-dropdown-menu">
                <a
                  href="#plots"
                  className={`dropdown-link ${activePage === "projects" && filters?.type === "plots" ? "active" : ""}`}
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate && onNavigate("projects", { type: "plots", location: "all" });
                  }}
                >
                  <span className="dropdown-link-title">Plots</span>
                  <span className="dropdown-link-desc">DTCP &amp; RERA Villa Plots</span>
                </a>
                <a
                  href="#villas"
                  className={`dropdown-link ${activePage === "projects" && filters?.type === "villa" ? "active" : ""}`}
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate && onNavigate("projects", { type: "villa", location: "all" });
                  }}
                >
                  <span className="dropdown-link-title">Villas</span>
                  <span className="dropdown-link-desc">Luxury Gated Villas</span>
                </a>
                <a
                  href="#farmlands"
                  className={`dropdown-link ${activePage === "projects" && filters?.type === "farmlands" ? "active" : ""}`}
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate && onNavigate("projects", { type: "farmlands", location: "all" });
                  }}
                >
                  <span className="dropdown-link-title">Farmlands</span>
                  <span className="dropdown-link-desc">Hillside &amp; Eco Agro Lands</span>
                </a>
                <a
                  href="#commercial"
                  className={`dropdown-link ${activePage === "projects" && filters?.type === "commercial" ? "active" : ""}`}
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate && onNavigate("projects", { type: "commercial", location: "all" });
                  }}
                >
                  <span className="dropdown-link-title">Commercial Lands</span>
                  <span className="dropdown-link-desc">Retail &amp; Highway Frontage</span>
                </a>
                <a
                  href="#communities"
                  className={`dropdown-link ${activePage === "projects" && filters?.type === "gated-community" ? "active" : ""}`}
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate && onNavigate("projects", { type: "gated-community", location: "all" });
                  }}
                >
                  <span className="dropdown-link-title">Gated Communities</span>
                  <span className="dropdown-link-desc">Integrated Master Townships</span>
                </a>
              </div>
            </div>

            {/* Locations Dropdown */}
            <div className="nav-link-item">
              <button
                type="button"
                className={`nav-link-btn ${isLocationsActive ? "active" : ""}`}
                onClick={() => {
                  onNavigate && onNavigate("home");
                  setTimeout(() => {
                    document
                      .getElementById("locations-section")
                      ?.scrollIntoView({ behavior: "smooth" });
                  }, 100);
                }}
              >
                LOCATIONS <ChevronDown className="nav-chevron" size={13} />
              </button>
              <div className="nav-dropdown-menu">
                <a
                  href="#kovilpalayam"
                  className={`dropdown-link ${activePage === "projects" && filters?.location === "kovilpalayam" ? "active" : ""}`}
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate && onNavigate("projects", { location: "kovilpalayam", type: "all" });
                  }}
                >
                  <span className="dropdown-link-title">Kovilpalayam</span>
                  <span className="dropdown-link-desc">Sathy Road Corridor</span>
                </a>
                <a
                  href="#kurumbapalayam"
                  className={`dropdown-link ${activePage === "projects" && filters?.location === "kurumbapalayam" ? "active" : ""}`}
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate && onNavigate("projects", { location: "kurumbapalayam", type: "all" });
                  }}
                >
                  <span className="dropdown-link-title">Kurumbapalayam</span>
                  <span className="dropdown-link-desc">Sathy Road</span>
                </a>
                <a
                  href="#kariyampalayam"
                  className={`dropdown-link ${activePage === "projects" && filters?.location === "kariyampalayam" ? "active" : ""}`}
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate && onNavigate("projects", { location: "kariyampalayam", type: "all" });
                  }}
                >
                  <span className="dropdown-link-title">Kariyampalayam</span>
                  <span className="dropdown-link-desc">Annur Bypass</span>
                </a>
                <a
                  href="#kunnathur"
                  className={`dropdown-link ${activePage === "projects" && filters?.location === "kunnathur" ? "active" : ""}`}
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate && onNavigate("projects", { location: "kunnathur", type: "all" });
                  }}
                >
                  <span className="dropdown-link-title">Kunnathur</span>
                  <span className="dropdown-link-desc">Kongu Green Belt</span>
                </a>
                <a
                  href="#narasimhanaickenpalayam"
                  className={`dropdown-link ${activePage === "projects" && filters?.location === "narasimhanaickenpalayam" ? "active" : ""}`}
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate && onNavigate("projects", { location: "narasimhanaickenpalayam", type: "all" });
                  }}
                >
                  <span className="dropdown-link-title">Narasimhanaickenpalayam</span>
                  <span className="dropdown-link-desc">Mettupalayam Highway</span>
                </a>
                <a
                  href="#ganeshpuram"
                  className={`dropdown-link ${activePage === "projects" && filters?.location === "ganeshpuram" ? "active" : ""}`}
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate && onNavigate("projects", { location: "ganeshpuram", type: "all" });
                  }}
                >
                  <span className="dropdown-link-title">Ganeshpuram</span>
                  <span className="dropdown-link-desc">Arterial Expressway</span>
                </a>
                <a
                  href="#ponnegounden-pudur"
                  className={`dropdown-link ${activePage === "projects" && filters?.location === "ponnegounden-pudur" ? "active" : ""}`}
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate && onNavigate("projects", { location: "ponnegounden-pudur", type: "all" });
                  }}
                >
                  <span className="dropdown-link-title">Ponnegounden pudur</span>
                  <span className="dropdown-link-desc">Suburban Enclave</span>
                </a>
              </div>
            </div>

            <div className="nav-link-item">
              <button
                type="button"
                className={`nav-link-btn ${isBlogsActive ? "active" : ""}`}
                onClick={() => {
                  onNavigate && onNavigate("blogs");
                }}
              >
                BLOGS
              </button>
            </div>
          </nav>

          {/* Right Header Actions */}
          <div className="header-actions">
            <button
              type="button"
              className="crestora-btn crestora-btn-outline header-btn-explore"
              onClick={() => onNavigate && onNavigate("projects")}
            >
              <span className="btn-arrow-normal">→</span>
              <span className="btn-text">EXPLORE</span>
              <span className="btn-arrow-hover">→</span>
            </button>

            <button
              type="button"
              className={`crestora-btn crestora-btn-fill header-btn-visit ${activePage === "contact" ? "active" : ""}`}
              onClick={() => onNavigate && onNavigate("contact")}
              title="Contact Crestora Properties Advisors"
            >
              <Phone size={13} className="btn-icon-prefix" />
              <span className="btn-text">CONTACT US</span>
              <span className="btn-arrow-hover">→</span>
            </button>

            <button
              type="button"
              className="burger-btn"
              onClick={onOpenSidebar}
              aria-label="Open Navigation Drawer"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
