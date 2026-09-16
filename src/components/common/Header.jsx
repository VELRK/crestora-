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
  onNavigate,
  onOpenSidebar,
  onOpenSearch,
  onOpenBookVisit,
  favoritesCount = 0,
}) {
  const [isScrolled, setIsScrolled] = useState(false);

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
                className={`nav-link-btn ${activePage === "home" ? "active" : ""}`}
                onClick={() => onNavigate && onNavigate("home")}
              >
                HOME
              </button>
            </div>

            <div className="nav-link-item">
              <button
                type="button"
                className="nav-link-btn"
                onClick={() => {
                  onNavigate && onNavigate("home");
                  setTimeout(() => {
                    document
                      .getElementById("about-crestora")
                      ?.scrollIntoView({ behavior: "smooth" });
                  }, 100);
                }}
              >
                ABOUT US
              </button>
            </div>

            {/* Projects Dropdown */}
            <div className="nav-link-item">
              <button
                type="button"
                className={`nav-link-btn ${activePage === "projects" ? "active" : ""}`}
                onClick={() => onNavigate && onNavigate("projects")}
              >
                PROJECTS <ChevronDown className="nav-chevron" size={13} />
              </button>
              <div className="nav-dropdown-menu">
                <a
                  href="#ongoing"
                  className="dropdown-link"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate && onNavigate("projects", { status: "ongoing" });
                  }}
                >
                  Ongoing Developments
                </a>
                <a
                  href="#upcoming"
                  className="dropdown-link"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate && onNavigate("projects", { status: "upcoming" });
                  }}
                >
                  Upcoming Projects
                </a>
                <a
                  href="#completed"
                  className="dropdown-link"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate && onNavigate("projects", { status: "completed" });
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
                className="nav-link-btn"
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
                  className="dropdown-link"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate && onNavigate("projects", { type: "plots" });
                  }}
                >
                  <span className="dropdown-link-title">Plots</span>
                  <span className="dropdown-link-desc">DTCP &amp; RERA Villa Plots</span>
                </a>
                <a
                  href="#villas"
                  className="dropdown-link"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate && onNavigate("projects", { type: "villa" });
                  }}
                >
                  <span className="dropdown-link-title">Villas</span>
                  <span className="dropdown-link-desc">Luxury Gated Villas</span>
                </a>
                <a
                  href="#farmlands"
                  className="dropdown-link"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate && onNavigate("projects", { type: "farmlands" });
                  }}
                >
                  <span className="dropdown-link-title">Farmlands</span>
                  <span className="dropdown-link-desc">Hillside &amp; Eco Agro Lands</span>
                </a>
                <a
                  href="#commercial"
                  className="dropdown-link"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate && onNavigate("projects", { type: "commercial" });
                  }}
                >
                  <span className="dropdown-link-title">Commercial Lands</span>
                  <span className="dropdown-link-desc">Retail &amp; Highway Frontage</span>
                </a>
                <a
                  href="#communities"
                  className="dropdown-link"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate && onNavigate("projects", { type: "gated-community" });
                  }}
                >
                  <span className="dropdown-link-title">Gated Communities</span>
                  <span className="dropdown-link-desc">Integrated Master Townships</span>
                </a>
              </div>
            </div>

            {/* Locations Dropdown */}
            {/* <div className="nav-link-item"> */}
            {/* <button
              type="button"
              className="nav-link-btn"
              onClick={() => {
                onNavigate && onNavigate("home");
                setTimeout(() => {
                  document
                    .getElementById("city-locations-section")
                    ?.scrollIntoView({ behavior: "smooth" });
                }, 100);
              }}
            >
              LOCATIONS <ChevronDown className="nav-chevron" size={13} />
            </button>
            <div className="nav-dropdown-menu">
              <a
                href="#neelambur"
                className="dropdown-link"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate && onNavigate("projects", { location: "neelambur" });
                }}
              >
                Neelambur (Avinashi Bypass)
              </a>
              <a
                href="#saravanampatti"
                className="dropdown-link"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate && onNavigate("projects", { location: "saravanampatti" });
                }}
              >
                Saravanampatti (IT Corridor)
              </a>
              <a
                href="#avinashi-road"
                className="dropdown-link"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate && onNavigate("projects", { location: "avinashi-road" });
                }}
              >
                Avinashi Road / Airport
              </a>
              <a
                href="#kovaipudur"
                className="dropdown-link"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate && onNavigate("projects", { location: "kovaipudur" });
                }}
              >
                Kovaipudur (Western Foothills)
              </a>
              <a
                href="#vadavalli"
                className="dropdown-link"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate && onNavigate("projects", { location: "vadavalli" });
                }}
              >
                Vadavalli (Marudhamalai)
              </a>
              <a
                href="#chennai"
                className="dropdown-link"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate && onNavigate("projects", { location: "chennai" });
                }}
              >
                Chennai (OMR Corridor)
              </a>
            </div> */}
            {/* </div> */}

            {/* Services Dropdown */}
            {/* <div className="nav-link-item">
              <button
                type="button"
                className="nav-link-btn"
                onClick={() => {
                  onNavigate && onNavigate("home");
                  setTimeout(() => {
                    document
                      .getElementById("build-companion-section")
                      ?.scrollIntoView({ behavior: "smooth" });
                  }, 100);
                }}
              >
                SERVICES <ChevronDown className="nav-chevron" size={13} />
              </button>
              <div className="nav-dropdown-menu">
                <a
                  href="#build-companion"
                  className="dropdown-link"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate && onNavigate("home");
                    setTimeout(() => {
                      document
                        .getElementById("build-companion-section")
                        ?.scrollIntoView({ behavior: "smooth" });
                    }, 100);
                  }}
                >
                  Crestora Build Companion
                </a>
                <a
                  href="#nri-corner"
                  className="dropdown-link"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate && onNavigate("home");
                    setTimeout(() => {
                      document
                        .getElementById("nri-benefits-section")
                        ?.scrollIntoView({ behavior: "smooth" });
                    }, 100);
                  }}
                >
                  Crestora for NRI
                </a>
              </div>
            </div> */}

            <div className="nav-link-item">
              <button
                type="button"
                className="nav-link-btn"
                onClick={() => {
                  onNavigate && onNavigate("home");
                  setTimeout(() => {
                    document
                      .getElementById("faqs-section")
                      ?.scrollIntoView({ behavior: "smooth" });
                  }, 100);
                }}
              >
                FAQS
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
              className="crestora-btn crestora-btn-fill header-btn-visit"
              onClick={onOpenBookVisit}
            >
              <Calendar size={13.5} className="btn-icon-prefix" />
              <span className="btn-text">BOOK SITE VISIT</span>
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
