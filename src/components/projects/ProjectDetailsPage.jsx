import React, { useState, useEffect, useMemo } from "react";
import { formatINR } from "../../services/mockupApi";
import { crestoraApi } from "../../services/api";
import ProjectCard from "./ProjectCard";
import {
  ArrowLeft,
  MapPin,
  ShieldCheck,
  Heart,
  Share2,
  Download,
  Phone,
  MessageCircle,
  CheckCircle2,
  Compass,
  Sparkles,
  ChevronDown,
  Building2,
  Landmark,
  Trees,
  ExternalLink,
  Clock,
  Check,
} from "lucide-react";

export default function ProjectDetailsPage({
  project,
  allProjects = [],
  favorites = new Set(),
  onToggleFavorite,
  onBookSiteVisit,
  onBackToProjects,
  onSelectProject,
  showToast,
}) {
  const [activeImage, setActiveImage] = useState(project?.image || "");
  const [activeTab, setActiveTab] = useState("overview");

  // Site visit quick form state
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    date: "",
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  // EMI Calculator State
  const initialPrice = project?.price || 4500000;
  const [calcPrice, setCalcPrice] = useState(initialPrice);
  const [downPaymentPercent, setDownPaymentPercent] = useState(20);
  const [loanTenureYears, setLoanTenureYears] = useState(15);
  const [interestRate, setInterestRate] = useState(8.5);

  // FAQ open state
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  // Scroll to top on project change and set initial active image
  useEffect(() => {
    if (project) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      setActiveImage(project.image);
      setCalcPrice(project.price || 4500000);
      setFormSubmitted(false);
    }
  }, [project]);

  // EMI Calculation (unconditional hook)
  const { emi, principalLoan, totalInterest, totalAmount } = useMemo(() => {
    const downPayment = (calcPrice * downPaymentPercent) / 100;
    const loan = Math.max(0, calcPrice - downPayment);
    const monthlyRate = interestRate / 12 / 100;
    const months = loanTenureYears * 12;

    if (loan === 0 || monthlyRate === 0 || months === 0) {
      return { emi: 0, principalLoan: loan, totalInterest: 0, totalAmount: loan };
    }

    const emiValue =
      (loan * monthlyRate * Math.pow(1 + monthlyRate, months)) /
      (Math.pow(1 + monthlyRate, months) - 1);

    const totalPay = emiValue * months;
    const totalInt = totalPay - loan;

    return {
      emi: Math.round(emiValue),
      principalLoan: Math.round(loan),
      totalInterest: Math.round(totalInt),
      totalAmount: Math.round(totalPay),
    };
  }, [calcPrice, downPaymentPercent, loanTenureYears, interestRate]);

  const fallbackSimilar = useMemo(() => {
    if (!project) return [];
    const matched = allProjects.filter(
      (p) =>
        p.id !== project.id &&
        (p.locality === project.locality ||
          p.city === project.city ||
          p.type === project.type)
    );
    const rest = allProjects.filter((p) => p.id !== project.id && !matched.includes(p));
    return [...matched, ...rest].slice(0, 3);
  }, [allProjects, project]);
  const [similarProjects, setSimilarProjects] = useState(fallbackSimilar);

  useEffect(() => {
    setSimilarProjects(fallbackSimilar);
    const key = project?.slug || project?.id;
    if (!key) return undefined;
    let cancelled = false;
    crestoraApi
      .similarProjects(key)
      .then((res) => {
        if (!cancelled && Array.isArray(res?.data)) {
          setSimilarProjects(res.data);
        }
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [project?.id, project?.slug, fallbackSimilar]);

  if (!project) {
    return (
      <div className="project-details-page empty-state-wrap">
        <div
          className="crestora-container"
          style={{ textAlign: "center", padding: "100px 20px" }}
        >
          <h2>Project Not Found</h2>
          <p style={{ color: "#64748b", margin: "16px 0 24px" }}>
            The development you are looking for is currently unavailable or has been relocated.
          </p>
          <button
            type="button"
            className="crestora-btn crestora-btn-fill"
            onClick={onBackToProjects}
          >
            <span className="btn-arrow-normal">←</span>
            <span className="btn-text">RETURN TO ALL PROJECTS</span>
            <span className="btn-arrow-hover">←</span>
          </button>
        </div>
      </div>
    );
  }

  const {
    id,
    title,
    tagline,
    location,
    cityName,
    price,
    priceDisplay,
    pricePerSqft,
    badge,
    approval,
    reraNumber,
    dtcpNumber,
    image,
    gallery = [],
    totalArea,
    totalUnits,
    area,
    typeName,
    status,
    statusLabel,
    description,
    highlights = [],
    whyPoints = [],
  } = project;

  const displayPrice = priceDisplay || formatINR(price);
  const fullGallery = gallery && gallery.length > 0 ? gallery : [image];
  const isFavorite = favorites.has(id);

  // Form Submit handler
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      alert("Please provide your name and contact phone number.");
      return;
    }
    setFormSubmitted(true);
    if (showToast) {
      showToast(`Site visit enquiry submitted for ${title}! Our advisor will contact you.`);
    }
  };

  // Share handler
  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: `${title} | Crestora Properties`,
          text: `Explore ${title} - ${tagline || "DTCP & RERA Approved Plots & Luxury Villas"}`,
          url: window.location.href,
        })
        .catch(() => { });
    } else {
      navigator.clipboard?.writeText(window.location.href);
      if (showToast) showToast("Link copied to clipboard!");
    }
  };

  // Brochure Download trigger
  const handleDownloadBrochure = () => {
    if (showToast) {
      showToast(`Brochure for ${title} is ready! Starting download...`);
    }
    const link = document.createElement("a");
    link.href = image;
    link.download = `${title.replace(/\s+/g, "_")}_Brochure.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const projectFaqs = [
    {
      q: `What approvals does ${title} hold?`,
      a: `${title} is fully sanctioned by DTCP (Sanction ${dtcpNumber || approval || "DTCP Approved"}) and registered with TNRERA (Registration ${reraNumber || "TN/11/Layout/1284/2023"}). Complete documentation and legal scrutiny reports are ready for inspection.`,
    },
    {
      q: "Can I avail bank loan for plot purchase and construction?",
      a: "Yes. Up to 80% financing is pre-approved for this project by State Bank of India (SBI), HDFC Bank, ICICI Bank, and Axis Bank with expedited sanction processing and minimal paperwork.",
    },
    {
      q: "Are the plot layouts 100% Vasthu compliant?",
      a: "Absolutely. Every single plot in this community has been designed in strict accordance with traditional Vasthu Shastra principles, ensuring optimal prosperity, health, and positive energy flow.",
    },
    {
      q: "What infrastructure amenities are handed over?",
      a: "The development features wide 30ft & 40ft blacktop tar roads, underground drainage, individual water pipeline tap to each plot boundary, underground EB cabling, avenue tree plantation, solar street illumination, and 24/7 manned security arch.",
    },
    {
      q: "How soon can I commence house construction?",
      a: "Immediate construction is permitted upon title deed registration. Individual patta is transferred directly to the buyer upon registry.",
    },
  ];

  return (
    <div className="project-details-page">
      {/* 1. Classic Breadcrumb & Top Action Strip */}
      <div className="pdp-top-nav-bar">
        <div className="crestora-container pdp-top-nav-inner">
          <button
            type="button"
            className="pdp-back-btn"
            onClick={onBackToProjects}
            aria-label="Back to all projects"
          >
            <ArrowLeft size={16} />
            <span className="pdp-back-text-full">BACK TO ALL PROJECTS</span>
            <span className="pdp-back-text-short">BACK</span>
          </button>

          <nav className="pdp-breadcrumbs-trail" aria-label="Breadcrumb">
            <span
              className="pdp-crumb-link"
              onClick={onBackToProjects}
            >
              Projects
            </span>
            <span className="pdp-crumb-sep">/</span>
            <span className="pdp-crumb-link">
              {cityName || "Coimbatore"}
            </span>
            <span className="pdp-crumb-sep">/</span>
            <span className="pdp-crumb-current">{title}</span>
          </nav>

          <div className="pdp-header-actions">
            <button
              type="button"
              className={`pdp-action-icon-btn ${isFavorite ? "active" : ""}`}
              onClick={() => onToggleFavorite && onToggleFavorite(id)}
              title={isFavorite ? "Saved in Favorites" : "Save Property"}
            >
              <Heart
                size={17}
                fill={isFavorite ? "#dfb743" : "none"}
                color={isFavorite ? "#dfb743" : "#ffffff"}
              />
              <span className="d-none-mobile">
                {isFavorite ? "SAVED" : "SAVE"}
              </span>
            </button>

            <button
              type="button"
              className="pdp-action-icon-btn"
              onClick={handleShare}
              title="Share Development"
            >
              <Share2 size={16} />
              <span className="d-none-mobile">SHARE</span>
            </button>


          </div>
        </div>
      </div>

      {/* 2. Hero Title & Certifications Header */}
      <header className="pdp-hero-header">
        <div className="crestora-container">
          <div className="pdp-hero-header-content">
            <div className="pdp-title-col">
              <div className="pdp-badge-strip">
                <span className={`pdp-status-tag status-${status || "ongoing"}`}>
                  <span className="pdp-status-dot"></span>
                  {statusLabel || (status === "upcoming" ? "Pre-Launch Project" : "Ongoing Development")}
                </span>

                <span className="pdp-cert-tag">
                  <ShieldCheck size={14} color="#dfb743" />
                  <span>{badge || "DTCP & RERA Approved"}</span>
                </span>

                <span className="pdp-cert-tag vasthu">
                  <Compass size={14} color="#dfb743" />
                  <span>100% Vasthu Compliant</span>
                </span>
              </div>

              <h1 className="pdp-main-title">{title}</h1>

              {tagline && <p className="pdp-tagline-text">{tagline}</p>}

              <div className="pdp-location-row">
                <MapPin size={16} className="pdp-map-icon" />
                <span>{location}</span>
                <span className="pdp-loc-dot">•</span>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                    title + " " + location
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pdp-map-link"
                >
                  View on Google Maps <ExternalLink size={12} />
                </a>
              </div>
            </div>

            <div className="pdp-price-col">
              <div className="pdp-price-label">Starting Investment</div>
              <div className="pdp-price-amount">
                {displayPrice} <span className="pdp-period">Onwards</span>
              </div>
              {pricePerSqft && (
                <div className="pdp-price-sqft">
                  ₹{Number(pricePerSqft).toLocaleString("en-IN")} per sq.ft
                </div>
              )}
              <div className="pdp-approval-code">
                {reraNumber && <span>RERA: {reraNumber}</span>}
                {dtcpNumber && <span>DTCP: {dtcpNumber}</span>}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* 3. Key Stats Luxury Ribbon */}
      <section className="pdp-stats-ribbon">
        <div className="crestora-container">
          <div className="pdp-stats-grid">
            <div className="pdp-stat-cell">
              <span className="pdp-stat-lbl">DEVELOPMENT TYPE</span>
              <strong className="pdp-stat-val">{typeName || "Villa Plots"}</strong>
            </div>

            <div className="pdp-stat-cell">
              <span className="pdp-stat-lbl">TOTAL LAND EXTENT</span>
              <strong className="pdp-stat-val">{totalArea || "10 Acres"}</strong>
            </div>

            <div className="pdp-stat-cell">
              <span className="pdp-stat-lbl">PLOT / UNIT SIZES</span>
              <strong className="pdp-stat-val">
                {area ? area : "640 – 3,302 sq.ft"}
              </strong>
            </div>

            <div className="pdp-stat-cell">
              <span className="pdp-stat-lbl">TOTAL NUMBER OF UNITS</span>
              <strong className="pdp-stat-val">{totalUnits || "168 Units"}</strong>
            </div>

            <div className="pdp-stat-cell">
              <span className="pdp-stat-lbl">LEGAL CLEARANCE</span>
              <strong className="pdp-stat-val" style={{ color: "#10b981" }}>
                100% Clear Title
              </strong>
            </div>

            <div className="pdp-stat-cell">
              <span className="pdp-stat-lbl">BANK FINANCING</span>
              <strong className="pdp-stat-val">Up to 80% Pre-Approved</strong>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Interactive Visual Gallery Showcase */}
      <section className="pdp-gallery-section">
        <div className="crestora-container">
          <div className="pdp-gallery-card">
            {/* Main Stage Image */}
            <div className="pdp-main-stage">
              <img
                src={activeImage}
                alt={title}
                className="pdp-hero-image"
              />
              <div className="pdp-stage-overlay"></div>

              {/* Watermark Seal */}
              <div className="pdp-verified-watermark">
                <ShieldCheck size={18} color="#dfb743" />
                <span>OFFICIAL VERIFIED SANCTION <span className="pdp-wm-brand">• CRESTORA PROPERTIES</span></span>
              </div>
            </div>

            {/* Thumbnail Filmstrip */}
            {fullGallery.length > 1 && (
              <div className="pdp-filmstrip-row">
                {fullGallery.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    className={`pdp-filmstrip-thumb ${activeImage === img ? "is-active" : ""
                      }`}
                    onClick={() => setActiveImage(img)}
                    aria-label={`View photo ${idx + 1}`}
                  >
                    <img src={img} alt={`${title} perspective ${idx + 1}`} />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 5. Main 2-Column Content & Sticky Enquiry Desk */}
      <div className="pdp-main-content-layout">
        <div className="crestora-container pdp-content-grid">
          {/* ================= LEFT COLUMN: PROJECT DETAILS ================= */}
          <div className="pdp-details-col">
            {/* Quick Section Anchor Nav */}
            <nav className="pdp-section-jump-tabs" aria-label="Project Sections">
              <a
                href="#overview"
                className={`pdp-tab-item ${activeTab === "overview" ? "active" : ""}`}
                onClick={() => setActiveTab("overview")}
              >
                Overview
              </a>
              <a
                href="#specs"
                className={`pdp-tab-item ${activeTab === "specs" ? "active" : ""}`}
                onClick={() => setActiveTab("specs")}
              >
                Specifications
              </a>
              <a
                href="#amenities"
                className={`pdp-tab-item ${activeTab === "amenities" ? "active" : ""}`}
                onClick={() => setActiveTab("amenities")}
              >
                Amenities
              </a>
              <a
                href="#master-plan"
                className={`pdp-tab-item ${activeTab === "master-plan" ? "active" : ""}`}
                onClick={() => setActiveTab("master-plan")}
              >
                Master Layout
              </a>
              <a
                href="#connectivity"
                className={`pdp-tab-item ${activeTab === "connectivity" ? "active" : ""}`}
                onClick={() => setActiveTab("connectivity")}
              >
                Location & Proximity
              </a>


            </nav>

            {/* SECTION 1: Overview */}
            <section id="overview" className="pdp-section-block">
              <div className="pdp-section-header">
                <span className="pdp-gold-eyebrow">DEVELOPMENT OVERVIEW</span>
                <h2 className="pdp-section-heading">
                  About <span>{title}</span>
                </h2>
              </div>

              <div className="pdp-narrative-text">
                <p>
                  {description ||
                    `${title} is an exclusively master-planned gated enclave offering premium DTCP and RERA approved villa plots and bespoke residences in the thriving corridor of ${location}. Designed with classic architecture and expansive open green expanses, the community harmonizes urban convenience with serene living.`}
                </p>
                <p>
                  Every individual plot is demarcated with clear boundary corner stones, equipped with individual potable water supply pipelines, underground electrical cabling, and connected via wide, tarred avenue roads. Whether you are constructing your dream family villa or securing high-growth real estate equity, {title} offers unmatched peace of mind and assured capital appreciation.
                </p>
              </div>

              {/* Architectural Highlights Grid */}
              {highlights.length > 0 && (
                <div className="pdp-highlights-grid">
                  {highlights.map((highlight, idx) => (
                    <div key={idx} className="pdp-highlight-item">
                      <div className="pdp-highlight-icon-wrap">
                        <CheckCircle2 size={18} color="#dfb743" />
                      </div>
                      <div className="pdp-highlight-text">{highlight}</div>
                    </div>
                  ))}
                </div>
              )}
            </section>

            {/* SECTION 2: Why Choose / Theme Features */}
            {whyPoints.length > 0 && (
              <section className="pdp-section-block">
                <div className="pdp-section-header">
                  <span className="pdp-gold-eyebrow">DISTINCTIVE ADVANTAGES</span>
                  <h2 className="pdp-section-heading">
                    Why Invest in <span>{title}</span>
                  </h2>
                </div>

                <div className="pdp-why-cards-grid">
                  {whyPoints.map((item, idx) => (
                    <div key={idx} className="pdp-why-card">
                      <div className="pdp-why-icon-box">
                        <Sparkles size={20} color="#dfb743" />
                      </div>
                      <div className="pdp-why-card-body">
                        <h4>{item.title}</h4>
                        <p>{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* SECTION 3: Technical Specifications Table */}
            <section id="specs" className="pdp-section-block">
              <div className="pdp-section-header">
                <span className="pdp-gold-eyebrow">TECHNICAL DETAILS</span>
                <h2 className="pdp-section-heading">
                  Project <span>Specifications</span>
                </h2>
              </div>

              <div className="pdp-specs-table-wrap">
                <table className="pdp-specs-table">
                  <tbody>
                    <tr>
                      <td className="pdp-table-lbl">Project Name</td>
                      <td className="pdp-table-val">{title}</td>
                      <td className="pdp-table-lbl">Location</td>
                      <td className="pdp-table-val">{location}</td>
                    </tr>
                    <tr>
                      <td className="pdp-table-lbl">DTCP Sanction No.</td>
                      <td className="pdp-table-val">
                        <strong style={{ color: "#163057" }}>
                          {dtcpNumber || approval || "DTCP Approved"}
                        </strong>
                      </td>
                      <td className="pdp-table-lbl">TNRERA Reg. No.</td>
                      <td className="pdp-table-val">
                        <strong style={{ color: "#163057" }}>
                          {reraNumber || "TN/11/Layout/1284/2023"}
                        </strong>
                      </td>
                    </tr>
                    <tr>
                      <td className="pdp-table-lbl">Total Land Area</td>
                      <td className="pdp-table-val">{totalArea || "10 Acres"}</td>
                      <td className="pdp-table-lbl">Total Units / Plots</td>
                      <td className="pdp-table-val">{totalUnits || "168 Units"}</td>
                    </tr>
                    <tr>
                      <td className="pdp-table-lbl">Internal Road Widths</td>
                      <td className="pdp-table-val">30 Feet &amp; 40 Feet Blacktop</td>
                      <td className="pdp-table-lbl">Vasthu Orientation</td>
                      <td className="pdp-table-val">100% Vasthu Compliant</td>
                    </tr>
                    <tr>
                      <td className="pdp-table-lbl">Water Infrastructure</td>
                      <td className="pdp-table-val">Individual Pipeline to Plot Boundary</td>
                      <td className="pdp-table-lbl">Electrical Grid</td>
                      <td className="pdp-table-val">Underground EB Cabling &amp; Transformers</td>
                    </tr>
                    <tr>
                      <td className="pdp-table-lbl">Security &amp; Perimeter</td>
                      <td className="pdp-table-val">Grand Arch with 24/7 CCTV Surveillance</td>
                      <td className="pdp-table-lbl">Title Guarantee</td>
                      <td className="pdp-table-val">Clear Title with Immediate Registry</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* SECTION 4: Amenities & Infrastructure */}
            <section id="amenities" className="pdp-section-block">
              <div className="pdp-section-header">
                <span className="pdp-gold-eyebrow">PREMIUM INFRASTRUCTURE</span>
                <h2 className="pdp-section-heading">
                  Community <span>Amenities</span>
                </h2>
                <p style={{ color: "#64748b", margin: "8px 0 0", fontSize: "14px" }}>
                  Thoughtfully integrated lifestyle amenities to enrich your everyday living experience.
                </p>
              </div>

              <div className="pdp-amenities-grid">
                {[
                  {
                    title: "Grand Entrance Gateway",
                    desc: "Majestic security entrance arch with boom barrier and surveillance room.",
                    icon: Landmark,
                  },
                  {
                    title: "30ft & 40ft Tar Roads",
                    desc: "High quality engineered blacktop roads designed for heavy traffic durability.",
                    icon: Building2,
                  },
                  {
                    title: "Underground Drainage",
                    desc: "Comprehensive storm water drains and subterranean sewer infrastructure.",
                    icon: Check,
                  },
                  {
                    title: "24/7 CCTV & Security",
                    desc: "Complete gated compound wall with high-definition digital cameras and guards.",
                    icon: ShieldCheck,
                  },
                  {
                    title: "Landscaped Children's Park",
                    desc: "Manicured green lawn with modern play equipment and sitting gazebos.",
                    icon: Trees,
                  },
                  {
                    title: "Solar Street Illumination",
                    desc: "Energy-efficient automatic solar street lamps along all internal avenues.",
                    icon: Sparkles,
                  },
                  {
                    title: "Potable Water Pipeline",
                    desc: "Dedicated Siruvani/borewell water pipeline stub provided for each plot.",
                    icon: CheckCircle2,
                  },
                  {
                    title: "Avenue Tree Plantations",
                    desc: "Shaded green pathways lined with native flora and flowering avenue trees.",
                    icon: Trees,
                  },
                ].map((item, idx) => {
                  const IconComp = item.icon;
                  return (
                    <div key={idx} className="pdp-amenity-card">
                      <div className="pdp-amenity-icon-circle">
                        <IconComp size={22} color="#dfb743" />
                      </div>
                      <div className="pdp-amenity-info">
                        <h5>{item.title}</h5>
                        <p>{item.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* SECTION 5: Master Plan & Plot Configurations */}
            <section id="master-plan" className="pdp-section-block">
              <div className="pdp-section-header">
                <span className="pdp-gold-eyebrow">ARCHITECTURAL BLUEPRINT</span>
                <h2 className="pdp-section-heading">
                  Master Layout <span>Plan</span>
                </h2>
                <p style={{ color: "#64748b", margin: "8px 0 0", fontSize: "14px" }}>
                  Engineered with 100% Vasthu alignment, optimal plot dimensions, and generous park reservations.
                </p>
              </div>

              <div className="pdp-master-plan-box">
                <div className="pdp-plan-visual-wrap">
                  <img
                    src={fullGallery[1] || fullGallery[0]}
                    alt={`${title} Master Plan Layout`}
                    className="pdp-plan-img"
                  />
                  <div className="pdp-plan-overlay">
                    <button
                      type="button"
                      className="crestora-btn crestora-btn-gold pdp-plan-download-btn"
                      onClick={handleDownloadBrochure}
                    >
                      <Download size={15} />
                      <span className="pdp-btn-text-full">DOWNLOAD HIGH-RES MASTER PLAN (PDF)</span>
                      <span className="pdp-btn-text-short">DOWNLOAD PLAN (PDF)</span>
                    </button>
                  </div>
                </div>

                {/* Plot Configuration Sizes */}
                <div className="pdp-plot-sizes-strip">
                  <div className="pdp-plot-size-card">
                    <div className="pdp-size-badge">2 CENTS</div>
                    <div className="pdp-size-sqft">871 sq.ft</div>
                    <div className="pdp-size-ideal">Ideal for compact 2 BHK Villas</div>
                  </div>

                  <div className="pdp-plot-size-card highlight">
                    <div className="pdp-size-badge">3 CENTS</div>
                    <div className="pdp-size-sqft">1,306 sq.ft</div>
                    <div className="pdp-size-ideal">Most Popular for 3 BHK Duplex</div>
                  </div>

                  <div className="pdp-plot-size-card">
                    <div className="pdp-size-badge">5 CENTS</div>
                    <div className="pdp-size-sqft">2,178 sq.ft</div>
                    <div className="pdp-size-ideal">Spacious 4 BHK Mansions with Garden</div>
                  </div>

                  <div className="pdp-plot-size-card">
                    <div className="pdp-size-badge">CORNER PLOTS</div>
                    <div className="pdp-size-sqft">2,500 – 3,500 sq.ft</div>
                    <div className="pdp-size-ideal">Dual Road Frontage &amp; Extra Parking</div>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 6: Location & Connectivity Table */}
            <section id="connectivity" className="pdp-section-block">
              <div className="pdp-section-header">
                <span className="pdp-gold-eyebrow">STRATEGIC PROXIMITY</span>
                <h2 className="pdp-section-heading">
                  Location &amp; <span>Connectivity</span>
                </h2>
                <p style={{ color: "#64748b", margin: "8px 0 0", fontSize: "14px" }}>
                  Positioned with swift access to key transit hubs, prestigious educational hubs, and healthcare centers.
                </p>
              </div>

              <div className="pdp-connectivity-grid">
                {[
                  {
                    landmark: "Coimbatore International Airport",
                    dist: "8.5 km",
                    time: "10 Mins",
                    category: "Transit Hub",
                  },
                  {
                    landmark: "KMCH & Kovai Multi-Speciality Hospital",
                    dist: "6.0 km",
                    time: "8 Mins",
                    category: "Healthcare",
                  },
                  {
                    landmark: "CHIL SEZ & TIDEL Park IT Corridor",
                    dist: "9.2 km",
                    time: "12 Mins",
                    category: "Tech Hub",
                  },
                  {
                    landmark: "Leading International Schools & Engineering Col.",
                    dist: "3.5 km",
                    time: "5 Mins",
                    category: "Education",
                  },
                  {
                    landmark: "Coimbatore Central Railway Junction",
                    dist: "14 km",
                    time: "20 Mins",
                    category: "Transit Hub",
                  },
                  {
                    landmark: "Prozone Mall & Fun Republic Shopping",
                    dist: "8.0 km",
                    time: "11 Mins",
                    category: "Shopping & Dining",
                  },
                ].map((item, idx) => (
                  <div key={idx} className="pdp-proximity-card">
                    <div className="pdp-prox-left">
                      <div className="pdp-prox-category">{item.category}</div>
                      <div className="pdp-prox-name">{item.landmark}</div>
                    </div>
                    <div className="pdp-prox-right">
                      <div className="pdp-prox-time">
                        <Clock size={13} color="#dfb743" />
                        <span>{item.time}</span>
                      </div>
                      <div className="pdp-prox-dist">{item.dist}</div>
                    </div>
                  </div>
                ))}
              </div>
            </section>


          </div>

          {/* ================= RIGHT COLUMN: STICKY CONSULTATION DESK ================= */}
          <aside className="pdp-sidebar-col">
            <div className="pdp-sticky-card">
              {/* Card Header */}
              <div className="pdp-card-header">
                <span className="pdp-card-eyebrow">FREE SITE VISIT &amp; CONSULTATION</span>
                <h3>Book a Complimentary Tour</h3>
                <p>
                  Experience {title} in person.
                </p>
              </div>

              {/* Booking Form */}
              {formSubmitted ? (
                <div className="pdp-form-success">
                  <div className="pdp-success-icon-wrap">
                    <CheckCircle2 size={38} color="#10b981" />
                  </div>
                  <h4>Enquiry Received!</h4>
                  <p>
                    Thank you, <strong>{formData.name}</strong>. Our senior property advisor will call you at <strong>{formData.phone}</strong> to confirm your site visit slot.
                  </p>
                  <button
                    type="button"
                    className="crestora-btn crestora-btn-outline"
                    onClick={() => setFormSubmitted(false)}
                    style={{ width: "100%", marginTop: "14px" }}
                  >
                    <span>Submit Another Enquiry</span>
                  </button>
                </div>
              ) : (
                <form className="pdp-sidebar-form" onSubmit={handleFormSubmit}>
                  <div className="pdp-input-group">
                    <label htmlFor="pdp-name">Full Name *</label>
                    <input
                      id="pdp-name"
                      type="text"
                      placeholder="e.g. Anandha Krishnan"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      required
                    />
                  </div>

                  <div className="pdp-input-group">
                    <label htmlFor="pdp-phone">Phone Number (+91) *</label>
                    <input
                      id="pdp-phone"
                      type="tel"
                      placeholder="e.g. 98420 12345"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      required
                    />
                  </div>

                  <div className="pdp-input-group">
                    <label htmlFor="pdp-email">Email Address</label>
                    <input
                      id="pdp-email"
                      type="email"
                      placeholder="e.g. anand@gmail.com"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                    />
                  </div>




                  <button
                    type="submit"
                    className="crestora-btn crestora-btn-gold pdp-submit-btn"
                  >
                    <span className="btn-arrow-normal">✓</span>
                    <span className="btn-text">CONFIRM SITE VISIT</span>
                    <span className="btn-arrow-hover">→</span>
                  </button>
                </form>
              )}

              {/* Direct WhatsApp & Call Buttons */}
              <div className="pdp-direct-contact-row">
                <a
                  href={`https://wa.me/919159066666?text=${encodeURIComponent(
                    `Hi Crestora Properties, I am interested in visiting ${title} (${location}). Please share plot details.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pdp-whatsapp-btn"
                >
                  <MessageCircle size={18} />
                  <span>WhatsApp Details</span>
                </a>

                <a href="tel:+919159066666" className="pdp-call-btn">
                  <Phone size={17} />
                  <span>Call Now</span>
                </a>
              </div>

              {/* Senior Advisor Bio Card */}


              {/* Legal Verification Stamp */}

            </div>
          </aside>
        </div>
      </div>

      {/* 6. Similar & Nearby Developments */}
      {similarProjects.length > 0 && (
        <section className="pdp-similar-section">
          <div className="crestora-container">
            <div className="section-header" style={{ marginBottom: "40px" }}>
              <h5>EXPLORE MORE</h5>
              <h2>
                Similar <span>Projects You May Like</span>
              </h2>
              <p>Discover other DTCP &amp; RERA sanctioned plotted communities nearby.</p>
            </div>

            <div className="projects-responsive-grid">
              {similarProjects.map((item) => (
                <ProjectCard
                  key={item.id}
                  project={item}
                  isFavorite={favorites.has(item.id)}
                  onToggleFavorite={onToggleFavorite}
                  onSelectProject={onSelectProject}
                  onBookSiteVisit={onBookSiteVisit}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 7. Mobile Sticky Bottom Action Bar */}
      <div className="pdp-mobile-bottom-bar" aria-label="Quick Actions">
        <div className="pdp-mobile-price">
          <span className="lbl">From</span>
          <strong className="val">{displayPrice}</strong>
        </div>

        <div className="pdp-mobile-btns">
          <a
            href={`https://wa.me/919159066666?text=${encodeURIComponent(
              `Hi Crestora Properties, please send me details for ${title}.`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="pdp-mob-btn whatsapp"
            title="Chat on WhatsApp"
          >
            <MessageCircle size={18} />
          </a>

          <button
            type="button"
            className="pdp-mob-btn book"
            onClick={() => onBookSiteVisit && onBookSiteVisit(project)}
          >
            <span>BOOK SITE VISIT</span>
          </button>
        </div>
      </div>
    </div>
  );
}
