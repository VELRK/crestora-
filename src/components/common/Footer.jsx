import React from "react";
import logoImg from "../../assets/logo.jpeg";
import { useSite } from "../../services/SiteData.jsx";
import { Phone, Mail, MapPin, ShieldCheck, Award, CheckCircle2 } from "lucide-react";

export default function Footer({ onNavigate }) {
  const site = useSite();
  const settings = site.settings || {};
  const ownerName = settings.owner_name || "Jagadeesh Palanisamy";
  const phone = settings.phone || "+91 99430 53044 / +91 94425 23744";
  const phoneTel = settings.phone_tel || "+919943053044";
  const phoneTel2 = "+919442523744";
  const email = settings.email || "crestoraproperties1@gmail.com";
  const logo = settings.logo || logoImg;
  const about = settings.footer_about || "Crestora Properties develops DTCP and RERA-approved plotted communities and luxury residences across Coimbatore, combining strategic growth locations, crystal-clear titles, and transparent processes.";
  const registeredOffice = settings.registered_office || "6/459, PG Pudur, S S Kulam Via, Coimbatore - 641 107";
  const corporateOffice = settings.corporate_office || "6/459, PG Pudur, S S Kulam Via, Coimbatore - 641 107";
  const siteName = settings.site_name || "Crestora Properties";
  const filterCategories = (site.filters?.categories || []).filter((c) => c.value && c.value !== "all");
  const defaultCategories = [
    { label: "DTCP Villa Plots", value: "plots" },
    { label: "Luxury Gated Villas", value: "villa" },
    { label: "Integrated Communities", value: "gated-community" },
    { label: "Hillside & Farmlands", value: "farmlands" },
    { label: "Commercial Lands", value: "commercial" },
  ];
  const instagram =
    settings.instagram &&
    settings.instagram !== "https://instagram.com" &&
    settings.instagram !== "https://www.instagram.com"
      ? settings.instagram
      : "https://www.instagram.com/crestora_properties/";
  const facebook =
    settings.facebook &&
    settings.facebook !== "https://facebook.com" &&
    settings.facebook !== "https://www.facebook.com"
      ? settings.facebook
      : "https://www.facebook.com/profile.php?id=61592152162671";
  const categoriesList = filterCategories.length > 0 ? filterCategories : defaultCategories;

  return (
    <footer className="crestora-footer">
      <div className="crestora-container">
        {/* Top Footer Grid */}
        <div className="footer-top-grid">
          {/* Brand Col */}
          <div className="footer-col">
            <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "18px" }}>
              <img
                src={logo}
                alt="Crestora Properties"
                style={{ width: "52px", height: "52px", borderRadius: "8px", objectFit: "cover", border: "1px solid #c59b27" }}
              />
              <div style={{ display: "flex", flexDirection: "column" }}>
                <div style={{ fontFamily: "var(--font-brand, 'Cinzel', serif)", fontWeight: "700", fontSize: "20px", letterSpacing: "2px", color: "#ffffff", lineHeight: 1.05 }}>
                  CRESTORA
                </div>
                <div style={{ fontFamily: "var(--font-brand, 'Cinzel', serif)", fontSize: "8px", letterSpacing: "2.6px", color: "#dfb743", textTransform: "uppercase", fontWeight: "600", marginTop: "3.5px", display: "flex", alignItems: "center", gap: "6px", width: "100%" }}>
                  <span style={{ height: "1px", flex: 1, background: "#dfb743", opacity: 0.8 }}></span>
                  <span>PROPERTIES</span>
                  <span style={{ height: "1px", flex: 1, background: "#dfb743", opacity: 0.8 }}></span>
                </div>
              </div>
            </div>
            <p>
              {about}
            </p>
            <div style={{ marginTop: "10px", display: "flex", flexWrap: "wrap", gap: "14px" }}>
              <button
                type="button"
                onClick={() => onNavigate && onNavigate("about")}
                style={{
                  background: "none",
                  border: "none",
                  color: "#dfb743",
                  fontSize: "13px",
                  fontWeight: "600",
                  cursor: "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: 0,
                }}
              >
                <span>Read Company Story &amp; Heritage</span>
                <span>→</span>
              </button>
              <button
                type="button"
                onClick={() => onNavigate && onNavigate("blogs")}
                style={{
                  background: "none",
                  border: "none",
                  color: "#94a3b8",
                  fontSize: "13px",
                  fontWeight: "600",
                  cursor: "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: 0,
                }}
              >
                <span>Market Insights &amp; Blogs</span>
                <span>→</span>
              </button>
              <button
                type="button"
                onClick={() => onNavigate && onNavigate("exclusive-projects")}
                style={{
                  background: "none",
                  border: "none",
                  color: "#dfb743",
                  fontSize: "13px",
                  fontWeight: "600",
                  cursor: "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: 0,
                }}
              >
                <span>Exclusive Signature Projects</span>
                <span>★</span>
              </button>
              <button
                type="button"
                onClick={() => onNavigate && onNavigate("contact")}
                style={{
                  background: "none",
                  border: "none",
                  color: "#dfb743",
                  fontSize: "13px",
                  fontWeight: "600",
                  cursor: "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: 0,
                }}
              >
                <span>Contact &amp; Offices</span>
                <span>→</span>
              </button>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginTop: "16px" }}>
              <span style={{ fontSize: "11.5px", background: "rgba(255,255,255,0.08)", border: "1px solid rgba(197, 155, 39, 0.4)", color: "#dfb743", padding: "4px 10px", borderRadius: "2px" }}>
                ✓ DTCP Approved
              </span>
              <span style={{ fontSize: "11.5px", background: "rgba(255,255,255,0.08)", border: "1px solid rgba(197, 155, 39, 0.4)", color: "#dfb743", padding: "4px 10px", borderRadius: "2px" }}>
                ✓ TN RERA Registered
              </span>
              <span style={{ fontSize: "11.5px", background: "rgba(255,255,255,0.08)", border: "1px solid rgba(197, 155, 39, 0.4)", color: "#dfb743", padding: "4px 10px", borderRadius: "2px" }}>
                ✓ 100% Vasthu
              </span>
            </div>
          </div>

          {/* Registered & Corporate Offices */}
          <div className="footer-col">
            <h4>COIMBATORE OFFICE</h4>
            <div style={{ marginBottom: "12px" }}>
              <p style={{ fontWeight: "700", color: "#ffffff", marginBottom: "4px" }}>Owner &amp; Managing Director:</p>
              <p style={{ color: "#dfb743", fontWeight: "600", fontSize: "14px" }}>{ownerName}</p>
            </div>
            <div style={{ marginBottom: "16px" }}>
              <p style={{ fontWeight: "700", color: "#ffffff", marginBottom: "4px" }}>Office Address:</p>
              <p style={{ lineHeight: "1.6" }}>{corporateOffice}</p>
            </div>
            <div style={{ marginTop: "12px" }}>
              <button
                type="button"
                onClick={() => onNavigate && onNavigate("contact")}
                style={{
                  background: "none",
                  border: "none",
                  color: "#dfb743",
                  fontSize: "12.5px",
                  fontWeight: "600",
                  cursor: "pointer",
                  padding: 0,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "5px"
                }}
              >
                <span>View Full Map &amp; Directions →</span>
              </button>
            </div>
          </div>

          {/* Property Categories */}
          <div className="footer-col">
            <h4>PROPERTY CATEGORIES</h4>
            <ul>
              {categoriesList.map((cat) => (
                <li key={cat.value || cat.id}>
                  <a
                    href="/projects"
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigate && onNavigate("projects", { type: cat.value, location: "all" });
                    }}
                  >
                    {cat.label || cat.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Direct Assistance & Helplines */}
          <div className="footer-col">
            <h4>CONTACT & ASSISTANCE</h4>
            <div style={{ marginTop: "12px", display: "flex", flexDirection: "column", gap: "4px" }}>
              <span style={{ fontSize: "12px", textTransform: "uppercase", color: "#a0aec0", letterSpacing: "1px" }}>Customer Support</span>
              <a href={`tel:${phoneTel}`} className="footer-contact-link">+91 99430 53044</a>
              <a href={`tel:${phoneTel2}`} className="footer-contact-link">+91 94425 23744</a>
            </div>
            <div style={{ marginTop: "14px" }}>
              <span style={{ fontSize: "12px", textTransform: "uppercase", color: "#a0aec0", letterSpacing: "1px" }}>Official Inquiries</span>
              <a href={`mailto:${email}`} className="footer-contact-link" style={{ fontSize: "13.5px" }}>
                {email}
              </a>
            </div>
            <div style={{ marginTop: "18px" }}>
              <button
                type="button"
                className="crestora-btn crestora-btn-gold"
                style={{ width: "100%", height: "42px", fontSize: "12.5px" }}
                onClick={() => onNavigate && onNavigate("contact")}
              >
                <span className="btn-arrow-normal">✓</span>
                <span className="btn-text">CONTACT US &amp; BOOK VISIT</span>
                <span className="btn-arrow-hover">→</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Strip */}
        <div className="footer-bottom-row">
          <div className="footer-copyright">
            © {new Date().getFullYear()} {siteName} Pvt. Ltd. All Rights Reserved. Building Trust. Creating Value.
          </div>
          <div className="footer-social-links">
            <a
              href={facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="social-circle-btn"
              aria-label="Facebook"
              title="Facebook"
            >
              <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </a>
            <a
              href={instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="social-circle-btn"
              aria-label="Instagram"
              title="Instagram"
            >
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
