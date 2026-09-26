import React, { useEffect, useState, useMemo } from "react";
import aboutImg from "../../assets/about/about.png";
import { useSite } from "../../services/SiteData.jsx";
import { MapPin, Shield, CheckCircle, Landmark, TrendingUp, Layers, Home, Sparkles, Droplet, Star, Building2 } from "lucide-react";

export default function AdissiaProjectsShowcase({
  projects = [],
  onSelectProject,
  onBookSiteVisit,
  onExploreAll,
}) {
  const site = useSite();
  const copy = site.home?.landmark || {};
  const statuses = (site.filters?.statuses || []).filter((item) =>
    projects.some((project) => project.status === item.value)
  );
  const [activeTab, setActiveTab] = useState("");

  // Filter projects based on active tab
  const tabProjects = useMemo(() => {
    if (!activeTab) return [];
    return projects.filter((project) => project.status === activeTab);
  }, [projects, activeTab]);

  // Selected project within the current tab
  const [selectedProjectId, setSelectedProjectId] = useState(null);

  // Active project calculation
  const activeProject = useMemo(() => {
    if (selectedProjectId) {
      const found = tabProjects.find((p) => p.id === selectedProjectId);
      if (found) return found;
    }
    return tabProjects[0] || projects[0] || null;
  }, [tabProjects, selectedProjectId, projects]);

  const statusKey = statuses.map((item) => item.value).join("|");
  useEffect(() => {
    const values = statusKey ? statusKey.split("|") : [];
    if (!values.includes(activeTab)) {
      setActiveTab(values[0] || "");
    }
  }, [statusKey, activeTab]);

  const handleTabChange = (tabKey) => {
    setActiveTab(tabKey);
    const firstInTab = projects.find((p) => p.status === tabKey);
    if (firstInTab) {
      setSelectedProjectId(firstInTab.id);
    }
  };

  if (!activeProject) return null;

  // Icon selector helper
  const renderIcon = (iconName) => {
    const key = String(iconName || "").trim();
    const lower = key.toLowerCase();
    if (key === "Landmark" || lower === "landmark") return <Landmark size={22} />;
    if (key === "ShieldCheck" || key === "Shield" || lower === "shield") return <Shield size={22} />;
    if (key === "TrendingUp" || lower === "trending-up") return <TrendingUp size={22} />;
    if (key === "Star" || lower === "star") return <Star size={22} />;
    if (key === "Droplet" || lower === "droplet") return <Droplet size={22} />;
    if (key === "Home" || lower === "home") return <Home size={22} />;
    if (key === "Building2" || lower === "layout") return <Layers size={22} />;
    if (key === "CheckCircle2") return <CheckCircle size={22} />;
    if (key === "MapPin") return <MapPin size={22} />;
    return <Sparkles size={22} />;
  };

  return (
    <section id="landmark-projects" className="landmark-showcase-section">
      <div className="crestora-container">
        {/* Section Header */}
        <div className="section-header">
          <h5>{copy.eyebrow || "FEATURED DEVELOPMENTS"}</h5>
          <h2>
            {copy.titleLead || "Discover Landmark"} <span>{copy.titleHighlight || "Properties"}</span>
          </h2>
          <p>
            {copy.intro || "Explore Crestora Properties' plotted developments across Coimbatore and Tamil Nadu offering strategic locations, clear DTCP & RERA titles, and master layouts engineered for long-term appreciation."}
          </p>
        </div>

        {/* Project Status Tabs */}
        <div className="status-tabs-nav" role="tablist">
          {statuses.map((item) => (
            <button
              key={item.value}
              type="button"
              className={`status-tab-btn ${activeTab === item.value ? "active" : ""}`}
              onClick={() => handleTabChange(item.value)}
            >
              {item.label.toUpperCase()} ({projects.filter((project) => project.status === item.value).length})
            </button>
          ))}
        </div>

        {activeProject && (
        <>
        {/* Project Selector Pills */}
        <div className="project-pills-selector">
          {tabProjects.map((proj) => (
            <button
              key={proj.id}
              type="button"
              className={`project-pill-btn ${activeProject.id === proj.id ? "active" : ""}`}
              onClick={() => setSelectedProjectId(proj.id)}
            >
              {proj.title.replace("Crestora ", "")}
            </button>
          ))}
        </div>

        {/* Signature Adissia Split Showcase Card */}
        <div className="split-showcase-card">
          <div className="split-top-row">
            {/* Left Col: Details & CTAs */}
            <div className="split-left-col">
              <span className="split-location-tag">
                <MapPin size={15} color="#274f9a" />
                {activeProject.locality || activeProject.location}
              </span>

              <h3 className="split-project-title">
                {activeProject.title.split(" ")[0]} <span>{activeProject.title.split(" ").slice(1).join(" ")}</span>
              </h3>

              <p className="split-project-desc">{activeProject.description}</p>

              <div className="split-buttons-row">
                <button
                  type="button"
                  className="crestora-btn crestora-btn-outline"
                  onClick={() => onSelectProject && onSelectProject(activeProject)}
                >
                  <span className="btn-arrow-normal">→</span>
                  <span className="btn-text">EXPLORE MORE</span>
                  <span className="btn-arrow-hover">→</span>
                </button>

                <button
                  type="button"
                  className="crestora-btn crestora-btn-fill"
                  onClick={() => onBookSiteVisit && onBookSiteVisit(activeProject)}
                >
                  <span className="btn-arrow-normal">✓</span>
                  <span className="btn-text">BOOK SITE VISIT</span>
                  <span className="btn-arrow-hover">→</span>
                </button>
              </div>
            </div>

            {/* Right Col: 2x2 Stats Grid */}
            <div className="split-right-stats">
              <div className="grid-stat-box">
                <div className="grid-stat-val">{activeProject.typeName || "PLOTS"}</div>
                <div className="grid-stat-label">Property Type</div>
              </div>

              <div className="grid-stat-box">
                <div className="grid-stat-val">
                  {activeProject.totalArea ? activeProject.totalArea.split(" ")[0] : "10"}{" "}
                  <small>{activeProject.totalArea ? activeProject.totalArea.split(" ")[1] : "Acres"}</small>
                </div>
                <div className="grid-stat-label">Total Land Area</div>
              </div>

              <div className="grid-stat-box">
                <div className="grid-stat-val" style={{ fontSize: "24px" }}>
                  {activeProject.area ? activeProject.area.replace(" sq.ft", "") : "640 - 3,302"}
                </div>
                <div className="grid-stat-label">Size (SQ.FT)</div>
              </div>

              <div className="grid-stat-box">
                <div className="grid-stat-val">
                  {activeProject.totalUnits ? activeProject.totalUnits.split(" ")[0] : "168"}
                </div>
                <div className="grid-stat-label">No. of Total Units</div>
              </div>
            </div>
          </div>

          {/* Lower "Why Choose [Project]" Section with Classic Arch Visual */}
          {activeProject.whyPoints && activeProject.whyPoints.length > 0 && (
            <div className="split-bottom-why">
              <div className="why-features-col">
                <h3>
                  Why Choose <span>{activeProject.title}</span>
                </h3>

                <div className="why-feature-list">
                  {activeProject.whyPoints.map((item, i) => (
                    <div key={i} className="why-feature-card">
                      <div className="why-icon-bubble">
                        {renderIcon(item.icon)}
                      </div>
                      <div className="why-card-text">
                        <h6>{item.title}</h6>
                        <p>{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="why-arch-image-wrap">
                <div className="why-arch-image">
                  <img src={aboutImg} alt={activeProject.title} />
                </div>
              </div>
            </div>
          )}
        </div>
        </>
        )}
      </div>
    </section>
  );
}
