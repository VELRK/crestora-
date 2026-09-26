import React, { useState, useEffect } from "react";
import {
  ABOUT_MILESTONES,
  CORE_PILLARS,
  PHILOSOPHY_CARDS,
  ACCREDITATIONS,
} from "../../data/aboutData";
import { useSite } from "../../services/SiteData.jsx";
import aboutImg from "../../assets/about/about.png";
import whyCbeImg from "../../assets/whycbe.png";
import banner1 from "../../assets/banner/banner-1.png";
import banner2 from "../../assets/banner/banner-2.png";
import logoImg from "../../assets/logo.jpeg";
import {
  ShieldCheck,
  CheckCircle2,
  Award,
  Users,
  Compass,
  Building2,
  Sparkles,
  Trees,
  Calendar,
  ChevronRight,
  Home,
  Phone,
  ArrowRight,
  Layers,
  MapPin,
  Check,
  Shield,
  Target,
  FileCheck2,
} from "lucide-react";

export default function AboutPage({ onNavigate, onBookSiteVisit }) {
  const site = useSite();
  const about = site.about || {};
  const text = (key, fallback) => {
    const value = about[key];
    return typeof value === "string" && value.trim() ? value : fallback;
  };
  const ABOUT_MILESTONES_LIVE = ABOUT_MILESTONES;
  const CORE_PILLARS_LIVE = CORE_PILLARS;
  const PHILOSOPHY_LIVE = PHILOSOPHY_CARDS;
  const ACCREDITATIONS_LIVE = ACCREDITATIONS;
  const heroMetrics = [
    { value: "6+", label: "Years of Excellence" },
    { value: "8+", label: "Landmark Enclaves" },
    { value: "100+", label: "Sanctioned Plots" },
    { value: "100%", label: "Title Transparency" },
  ];
  const anchors = [
    {
      title: "100% DTCP & RERA Registered",
      text: "Every single layout is verified and registered with TN RERA before launch.",
    },
    {
      title: "Spotless 30-Year Title Pedigree",
      text: "Scrutinized by senior legal advocates for instant registry and peaceful patta transfer.",
    },
    {
      title: "Signature British Architecture",
      text: "Classical neoclassical entry arches and timeless European design aesthetics.",
    },
    {
      title: "100% Vasthu & Natural Harmony",
      text: "Carefully oriented street grids and sweet groundwater reserves for family prosperity.",
    },
  ];
  const anchorIcons = [FileCheck2, Award, Building2, Compass];
  const mainImage = text("mainImage", aboutImg);
  const secondaryImage = text("secondaryImage", banner1);
  const phoneTel = text("ctaPhone", site.settings?.phone_tel || "+919159066666");
  const [activeMilestoneIndex, setActiveMilestoneIndex] = useState(0);
  const [activeTab, setActiveTab] = useState("all");

  // Scroll to top on initial page load
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const activeMilestone = ABOUT_MILESTONES_LIVE[activeMilestoneIndex];

  return (
    <div className="about-page-container">
      {/* 1. CLASSIC LUXURY HERO BANNER WITH ANIMATED GOLD GLOW */}
      <section className="about-hero-section">
        <div className="about-hero-ambient-glow" aria-hidden="true" />
        <div className="about-hero-pattern" aria-hidden="true" />

        <div className="crestora-container relative-z">
          {/* Breadcrumb Navigation */}
          <nav className="about-breadcrumb" aria-label="Breadcrumb">
            <button
              type="button"
              className="about-breadcrumb-link"
              onClick={() => onNavigate && onNavigate("home")}
            >
              <Home size={14} />
              <span>HOME</span>
            </button>
            <ChevronRight size={13} className="about-breadcrumb-sep" />
            <span className="about-breadcrumb-current">{text("breadcrumb", "ABOUT US")}</span>
          </nav>

          {/* Luxury Badge */}
          <div className="about-hero-badge-wrap">
            <div className="about-hero-badge">
              <Sparkles size={14} className="gold-sparkle-icon" />
              <span>{text("heroBadge", "ESTABLISHED 2012 • CRAFTING TIMELESS LANDMARKS")}</span>
            </div>
          </div>

          {/* Main Display Headline with Gold Foil Shimmer */}
          <h1 className="about-hero-title">
            {text("heroTitleLead", "Architecting Generational")}{" "}
            <span className="gold-foil-shimmer">{text("heroTitleHighlight", "Wealth & Trust")}</span>
          </h1>

          <p className="about-hero-lead">
            {text(
              "heroLead",
              "Crestora Properties is Tamil Nadu's benchmark developer for DTCP and RERA-approved gated plotted communities and bespoke residences. We bridge pristine legal transparency with enduring classical architecture."
            )}
          </p>

          {/* Quick Metrics Header Bar */}
          <div className="about-hero-metrics-bar">
            {heroMetrics.map((metric, idx) => (
              <React.Fragment key={`${metric.label}-${idx}`}>
                {idx > 0 ? <div className="ah-metric-divider" /> : null}
                <div className="about-hero-metric-item">
                  <span className="ah-metric-num">{metric.value}</span>
                  <span className="ah-metric-lbl">{metric.label}</span>
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* 2. THE CRESTORA HERITAGE & DUAL-ARCH STORY */}
      <section className="about-heritage-section">
        <div className="crestora-container">
          <div className="about-heritage-grid">
            {/* Left Narrative Column */}
            <div className="about-heritage-text-col">
              <div className="about-eyebrow-pill">
                <ShieldCheck size={14} />
                <span>{text("heritageEyebrow", "THE CRESTORA HERITAGE")}</span>
              </div>
              <h2 className="about-section-heading">
                {text("heritageTitleLead", "Where Visionary Planning Meets")}{" "}
                <span className="gold-accent-text">{text("heritageTitleHighlight", "Unshakeable Integrity")}</span>
              </h2>
              <p className="about-paragraph-lead">
                {text(
                  "heritageLead",
                  "Headquartered in Coimbatore, Crestora Properties was founded with an uncompromising philosophy: to rid the plotted real estate sector of speculation and deliver communities built on 100% sanctioned legal foundations."
                )}
              </p>
              <p className="about-paragraph">
                {text(
                  "heritageBody",
                  "Over the past 12+ years, we have meticulously surveyed, developed, and handed over thousands of premium DTCP & RERA villa plots and master-planned residences across Coimbatore. Every layout is engineered with wide bitumen boulevards, landscaped parks, underground conduits, and natural rainwater harvesting systems."
                )}
              </p>

              {/* Four Value Anchors */}
              <div className="about-anchors-grid">
                {anchors.map((anchor, idx) => {
                  const Icon = anchorIcons[idx % anchorIcons.length];
                  return (
                    <div className="about-anchor-card" key={`${anchor.title}-${idx}`}>
                      <div className="about-anchor-icon-wrap">
                        <Icon size={20} />
                      </div>
                      <div>
                        <h4>{anchor.title}</h4>
                        <p>{anchor.text}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* MD Quote Block */}
              <div className="about-quote-box">
                <div className="quote-mark">“</div>
                <blockquote className="quote-text">
                  {about.founderQuote || "Land is the cornerstone of every family’s generational legacy. When you invest with Crestora, you are not merely purchasing square footage; you are anchoring your family’s future in undisputed certainty."}
                </blockquote>
                <div className="quote-author-wrap">
                  <div className="quote-author-name">{about.founderName || "Dr. K. Ravindran"}</div>
                  <div className="quote-author-title">{about.founderRole || "Founder & Managing Director • Crestora Properties"}</div>
                </div>
              </div>
            </div>

            {/* Right Visual Architecture Column */}
            <div className="about-heritage-visual-col">
              <div className="about-dual-arch-wrapper">
                {/* Main Large Classical Arch */}
                <div className="about-main-arch">
                  <img
                    src={mainImage}
                    alt="Crestora Properties Classical Architecture"
                    className="about-arch-img"
                  />
                  <div className="about-arch-gold-border" />
                </div>

                {/* Secondary Inset Arch Visual */}
                <div className="about-secondary-arch d-none-mobile">
                  <img
                    src={secondaryImage}
                    alt="Crestora British Gateways"
                    className="about-secondary-img"
                  />
                  <div className="about-secondary-badge">
                    <span className="asb-tag">{text("secondaryBadgeTag", "Neoclassical Facade")}</span>
                    <span className="asb-name">{text("secondaryBadgeName", "Regal Arch Gateway")}</span>
                  </div>
                </div>

                {/* Floating Heritage Seal Badge */}
                <div className="about-floating-seal">
                  <div className="seal-emblem">
                    <Award size={24} className="seal-icon" />
                  </div>
                  <div className="seal-text-wrap">
                    <span className="seal-number">{text("sealNumber", "6+")}</span>
                    <span className="seal-desc">{text("sealText", "YEARS OF ETHICAL EXCELLENCE")}</span>
                  </div>
                </div>

                {/* Floating RERA Verification Badge */}
                <div className="about-floating-rera-badge">
                  <ShieldCheck size={18} className="rera-icon" />
                  <div>
                    <span className="rera-badge-title">{text("reraTitle", "100% TN-RERA APPROVED")}</span>
                    <span className="rera-badge-sub">{text("reraSubtitle", "Fully Sanctioned Plots")}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>



      {/* 4. VISION, MISSION & PHILOSOPHY (3D INTERACTIVE CARDS) */}
      <section className="about-philosophy-section">
        <div className="crestora-container">
          <div className="section-header-center">
            <div className="about-eyebrow-pill">
              <Compass size={14} />
              <span>{text("philosophyEyebrow", "GUIDING PRINCIPLES")}</span>
            </div>
            <h2 className="about-section-heading">
              {text("philosophyTitleLead", "Our Vision, Mission &")}{" "}
              <span className="gold-accent-text">{text("philosophyTitleHighlight", "Core Philosophy")}</span>
            </h2>
            <p className="about-section-subheading">
              {text(
                "philosophyIntro",
                "The foundational pillars that guide every land acquisition, master layout design, and customer partnership."
              )}
            </p>
          </div>

          <div className="about-philosophy-cards-grid">
            {PHILOSOPHY_LIVE.map((card, idx) => {
              const IconComponent =
                card.id === "vision" ? Compass : card.id === "mission" ? Target : Shield;
              return (
                <div key={card.id} className="about-philosophy-card">
                  <div className="phil-card-shimmer" />
                  <div className="phil-header">
                    <div className="phil-icon-box">
                      <IconComponent size={24} />
                    </div>
                    <span className="phil-badge">{card.badge}</span>
                  </div>
                  <h3 className="phil-title">{card.title}</h3>
                  <p className="phil-text">{card.text}</p>
                  <div className="phil-footer-decor">
                    <span className="phil-decor-line" />
                    <span className="phil-decor-diamond">◆</span>
                    <span className="phil-decor-line" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>



      {/* 6. THE 6 PILLARS OF CRESTORA EXCELLENCE */}
      <section className="about-pillars-section">
        <div className="crestora-container">
          <div className="section-header-center">
            <div className="about-eyebrow-pill">
              <Layers size={14} />
              <span>{text("pillarsEyebrow", "THE CRESTORA BENCHMARK")}</span>
            </div>
            <h2 className="about-section-heading">
              {text("pillarsTitleLead", "The 6 Pillars of")}{" "}
              <span className="gold-accent-text">{text("pillarsTitleHighlight", "Crestora Excellence")}</span>
            </h2>
            <p className="about-section-subheading">
              {text(
                "pillarsIntro",
                "Why thousands of discerning property buyers, NRI families, and investors place their trust in Crestora developments."
              )}
            </p>
          </div>

          <div className="about-pillars-grid">
            {CORE_PILLARS_LIVE.map((pillar) => (
              <div key={pillar.id} className="about-pillar-card">
                <div className="pillar-num-badge">{pillar.num}</div>
                <h3 className="pillar-title">{pillar.title}</h3>
                <span className="pillar-subtitle">{pillar.subtitle}</span>
                <p className="pillar-desc">{pillar.description}</p>
                <div className="pillar-highlights-list">
                  {pillar.highlights.map((item, idx) => (
                    <div key={idx} className="pillar-highlight-item">
                      <Check size={14} className="pillar-check-icon" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>



      {/* 8. ACCREDITATIONS & INSTITUTIONAL TRUST STRIP */}
      <section className="about-accreditations-section">
        <div className="crestora-container">
          <div className="accreditations-header">
            <div className="about-eyebrow-pill">
              <ShieldCheck size={14} />
              <span>{text("accreditationsEyebrow", "CERTIFICATIONS & REGISTRATIONS")}</span>
            </div>
            <h3 className="accreditations-title">
              {text("accreditationsTitle", "Institutional Accreditations & Legal Assurances")}
            </h3>
          </div>

          <div className="accreditations-grid">
            {ACCREDITATIONS_LIVE.map((item, idx) => (
              <div key={idx} className="accreditation-card">
                <div className="acc-card-top">
                  <ShieldCheck size={20} className="acc-icon" />
                  <span className="acc-tag">{item.tag}</span>
                </div>
                <h4 className="acc-name">{item.name}</h4>
                <p className="acc-desc">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. CLASSIC ROYAL NAVY & METALLIC GOLD CTA BANNER */}
      <section className="about-cta-section">
        <div className="crestora-container">
          <div className="about-cta-card">
            <div className="about-cta-glow-decor" />
            <div className="about-cta-content">
              <div className="about-eyebrow-pill light-pill">
                <Sparkles size={14} />
                <span>{text("ctaEyebrow", "START YOUR PROPERTY JOURNEY")}</span>
              </div>
              <h2 className="about-cta-title">
                {text("ctaTitleLead", "Ready to Experience")}{" "}
                <span className="gold-foil-shimmer">{text("ctaTitleHighlight", "Crestora Excellence")}</span>{" "}
                {text("ctaTitleTrail", "In Person?")}
              </h2>
              <p className="about-cta-sub">
                {text(
                  "ctaText",
                  "Schedule a complimentary private chauffeur-driven site visit to any of our DTCP and RERA-approved gated communities across Coimbatore."
                )}
              </p>

              <div className="about-cta-actions">
                <button
                  type="button"
                  className="crestora-btn crestora-btn-fill"
                  onClick={() => onNavigate && onNavigate("projects")}
                >
                  <span className="btn-arrow-normal">→</span>
                  <span className="btn-text">{text("ctaProjectsLabel", "EXPLORE ALL PROJECTS")}</span>
                  <span className="btn-arrow-hover">→</span>
                </button>

                <button
                  type="button"
                  className="crestora-btn crestora-btn-gold"
                  onClick={onBookSiteVisit}
                >
                  <span className="btn-arrow-normal">✓</span>
                  <span className="btn-text">{text("ctaVisitLabel", "SCHEDULE SITE VISIT")}</span>
                  <span className="btn-arrow-hover">→</span>
                </button>

                <a
                  href={`tel:${phoneTel}`}
                  className="crestora-btn crestora-btn-outline"
                >
                  <Phone size={15} />
                  <span>{text("ctaPhoneLabel", "CALL DIRECT HELPLINE")}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
