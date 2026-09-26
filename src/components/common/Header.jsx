import React, { useState, useEffect } from "react";
import logoImg from "../../assets/logo.jpeg";
import { sectionItems, useSite } from "../../services/SiteData.jsx";
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
  const site = useSite();
  const settings = site.settings || {};
  const phone = settings.phone || "+91 91590 66666";
  const phoneTel = settings.phone_tel || "+919159066666";
  const email = settings.email || "info@crestoraproperties.com";
  const cityLabel = "Coimbatore";
  const logo = settings.logo || logoImg;
  const menuCategories = (site.filters?.categories || []).filter((item) => item.value && item.value !== "all");
  const menuLocations = (sectionItems(site.home?.locations) || [])
    .map((item) => ({
      id: item.id || item.cityKey,
      label: item.name || "",
      value: item.cityKey || "",
      subtitle: item.highlight || item.corridor || item.state || "",
    }))
    .filter((item) => item.value);
  const menuStatuses = site.filters?.statuses || [];
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
              href={`tel:${phoneTel}`}
              className="topbar-item"
              title="Direct Telephone line to Crestora Properties"
            >
              <Phone size={12.5} className="topbar-icon" />
              <span>{phone}</span>
            </a>
            <span className="topbar-separator">|</span>
            <a
              href={`mailto:${email}`}
              className="topbar-item"
              title="Official Enquiry Mail"
            >
              <Mail size={12.5} className="topbar-icon" />
              <span>{email}</span>
            </a>
            <span className="topbar-separator d-none-tablet">|</span>
            <div className="topbar-item d-none-tablet">
              <MapPin size={12.5} className="topbar-icon" />
              <span>{cityLabel}</span>
            </div>
          </div>

          <div className="topbar-right">
            <div className="topbar-badge">
              <ShieldCheck size={13} className="topbar-icon-gold" />
              <span>DTCP &amp; RERA Approved Projects</span>
            </div>
            <span className="topbar-separator d-none-mobile">|</span>
              <span className="topbar-hours d-none-mobile">
              <Clock size={12} className="topbar-icon" /> {settings.hours || "9:00 AM – 7:30 PM"}
            </span>
          </div>
        </div>
      </div>

      {/* 2. Main Fixed Navigation Bar */}
      <div className="crestora-navbar">
        <div className="header-container">
          {/* Brand Logo with Classic Crestora Identity */}
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              onNavigate && onNavigate("home");
            }}
            className="brand-wrapper"
            aria-label="Crestora Properties Home"
          >
            <div className="brand-emblem-wrap">
              <img
                src={logo}
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
                {menuStatuses.map((item) => (
                  <a
                    key={item.value}
                    href="/projects"
                    className={`dropdown-link ${activePage === "projects" && filters?.status === item.value ? "active" : ""}`}
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigate && onNavigate("projects", { status: item.value, type: "all", location: "all" });
                    }}
                  >
                    {item.label}
                  </a>
                ))}
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
                {menuCategories.map((item) => (
                  <a
                    key={item.value}
                    href="/projects"
                    className={`dropdown-link ${activePage === "projects" && filters?.type === item.value ? "active" : ""}`}
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigate && onNavigate("projects", { type: item.value, location: "all" });
                    }}
                  >
                    <span className="dropdown-link-title">{item.label}</span>
                    {item.subtitle ? <span className="dropdown-link-desc">{item.subtitle}</span> : null}
                  </a>
                ))}
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
                {menuLocations.map((item) => (
                  <a
                    key={item.value}
                    href="/projects"
                    className={`dropdown-link ${activePage === "projects" && filters?.location === item.value ? "active" : ""}`}
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigate && onNavigate("projects", { location: item.value, type: "all" });
                    }}
                  >
                    <span className="dropdown-link-title">{item.label}</span>
                    {item.subtitle ? <span className="dropdown-link-desc">{item.subtitle}</span> : null}
                  </a>
                ))}
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
