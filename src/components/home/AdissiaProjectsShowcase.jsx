import React, { useState, useMemo } from "react";
import aboutImg from "../../assets/about/about.png";
import { MapPin, Shield, CheckCircle, Landmark, TrendingUp, Layers, Home, Sparkles, Droplet, Star } from "lucide-react";

export default function AdissiaProjectsShowcase({
  projects = [],
  onSelectProject,
  onBookSiteVisit,
  onExploreAll,
}) {
  const [activeTab, setActiveTab] = useState("ongoing"); // "ongoing" | "upcoming" | "completed"

  // Filter projects based on active tab
  const tabProjects = useMemo(() => {
    const list = projects.filter((p) => p.status === activeTab);
    return list.length > 0 ? list : projects;
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
    switch (iconName) {
      case "landmark": return <Landmark size={22} />;
      case "shield": return <Shield size={22} />;
      case "trending-up": return <TrendingUp size={22} />;
      case "star": return <Star size={22} />;
      case "droplet": return <Droplet size={22} />;
      case "home": return <Home size={22} />;
      default: return <Sparkles size={22} />;
    }
  };

  return (
    <section id="landmark-projects" className="landmark-showcase-section">
      <div className="crestora-container">
        {/* Section Header */}
        <div className="section-header">
          <h5>FEATURED DEVELOPMENTS</h5>
          <h2>
            Discover Landmark <span>Properties</span>
          </h2>
          <p>
            Explore Crestora Properties' plotted developments across Coimbatore and Tamil Nadu offering strategic locations, clear DTCP & RERA titles, and master layouts engineered for long-term appreciation.
          </p>
        </div>

        {/* Project Status Tabs */}
        <div className="status-tabs-nav" role="tablist">
          <button
            type="button"
            className={`status-tab-btn ${activeTab === "ongoing" ? "active" : ""}`}
            onClick={() => handleTabChange("ongoing")}
          >
            ONGOING PROJECTS ({projects.filter((p) => p.status === "ongoing").length})
          </button>
          <button
            type="button"
            className={`status-tab-btn ${activeTab === "upcoming" ? "active" : ""}`}
            onClick={() => handleTabChange("upcoming")}
          >
            UPCOMING PROJECTS ({projects.filter((p) => p.status === "upcoming").length})
          </button>
          <button
            type="button"
            className={`status-tab-btn ${activeTab === "completed" ? "active" : ""}`}
            onClick={() => handleTabChange("completed")}
          >
            COMPLETED LANDMARKS ({projects.filter((p) => p.status === "completed").length})
          </button>
        </div>

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
      </div>
    </section>
  );
}
