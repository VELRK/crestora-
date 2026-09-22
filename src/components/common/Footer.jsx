import React from "react";
import logoImg from "../../assets/logo.jpeg";
import { Phone, Mail, MapPin, ShieldCheck, Award, CheckCircle2 } from "lucide-react";

export default function Footer({ onNavigate }) {
  return (
    <footer className="crestora-footer">
      <div className="crestora-container">
        {/* Top Footer Grid */}
        <div className="footer-top-grid">
          {/* Brand Col */}
          <div className="footer-col">
            <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "18px" }}>
              <img
                src={logoImg}
                alt="Crestora Properties"
                style={{ width: "52px", height: "52px", borderRadius: "8px", objectFit: "cover", border: "1px solid #c59b27" }}
              />
              <div>
                <div style={{ fontFamily: "Montserrat, sans-serif", fontWeight: "800", fontSize: "19px", letterSpacing: "1px", color: "#ffffff" }}>
                  CRESTORA
                </div>
                <div style={{ fontSize: "10px", letterSpacing: "1.5px", color: "#dfb743", textTransform: "uppercase" }}>
                  PROPERTIES
                </div>
              </div>
            </div>
            <p>
              Crestora Properties develops DTCP and RERA-approved plotted communities and luxury residences across Coimbatore, combining strategic growth locations, crystal-clear titles, and transparent processes.
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
            <h4>COIMBATORE OFFICES</h4>
            <div style={{ marginBottom: "16px" }}>
              <p style={{ fontWeight: "700", color: "#ffffff", marginBottom: "4px" }}>Registered Office:</p>
              <p>16 A 1, 2nd Floor, Huzur Road, Behind Taj Vivanta, Gopalapuram, Coimbatore - 641 018</p>
            </div>
            <div>
              <p style={{ fontWeight: "700", color: "#ffffff", marginBottom: "4px" }}>Corporate Office:</p>
              <p>3rd Floor, Harita Center, Avinashi Rd, Opp. to GKNM Hospital, Coimbatore - 641 037</p>
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

          {/* Ongoing & Upcoming Projects */}
          <div className="footer-col">
            <h4>FEATURED DEVELOPMENTS</h4>
            <ul>
              <li>
                <a href="#projects" onClick={(e) => { e.preventDefault(); onNavigate && onNavigate("projects", { location: "neelambur" }); }}>
                  Crestora Regal Arch (Neelambur)
                </a>
              </li>
              <li>
                <a href="#projects" onClick={(e) => { e.preventDefault(); onNavigate && onNavigate("projects", { location: "saravanampatti" }); }}>
                  Crestora The Crown (Saravanampatti)
                </a>
              </li>
              <li>
                <a href="#projects" onClick={(e) => { e.preventDefault(); onNavigate && onNavigate("projects", { location: "avinashi-road" }); }}>
                  Crestora Vivaana (Avinashi Road)
                </a>
              </li>
              <li>
                <a href="#projects" onClick={(e) => { e.preventDefault(); onNavigate && onNavigate("projects", { location: "vadavalli" }); }}>
                  Crestora One World (Vadavalli)
                </a>
              </li>
              <li>
                <a href="#projects" onClick={(e) => { e.preventDefault(); onNavigate && onNavigate("projects", { location: "kovaipudur" }); }}>
                  Crestora New Meadows (Kovaipudur)
                </a>
              </li>
              <li>
                <a href="#projects" onClick={(e) => { e.preventDefault(); onNavigate && onNavigate("projects", { location: "peelamedu" }); }}>
                  Crestora Commercial Hub (Peelamedu)
                </a>
              </li>
            </ul>
          </div>

          {/* Direct Assistance & Helplines */}
          <div className="footer-col">
            <h4>CONTACT & ASSISTANCE</h4>
            <div style={{ marginTop: "12px" }}>
              <span style={{ fontSize: "12px", textTransform: "uppercase", color: "#a0aec0", letterSpacing: "1px" }}>Customer Support</span>
              <a href="tel:+919159066666" className="footer-contact-link">+91 91590 66666</a>
            </div>
            <div style={{ marginTop: "14px" }}>
              <span style={{ fontSize: "12px", textTransform: "uppercase", color: "#a0aec0", letterSpacing: "1px" }}>Official Inquiries</span>
              <a href="mailto:info@crestoraproperties.com" className="footer-contact-link" style={{ fontSize: "14px" }}>
                info@crestoraproperties.com
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
            © {new Date().getFullYear()} Crestora Properties Pvt. Ltd. All Rights Reserved. Building Trust. Creating Value.
          </div>
          <div className="footer-social-links">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-circle-btn" aria-label="Instagram">
              ig
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-circle-btn" aria-label="LinkedIn">
              in
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-circle-btn" aria-label="Facebook">
              fb
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="social-circle-btn" aria-label="YouTube">
              yt
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
