import React from "react";
import { BANK_PARTNERS } from "../../data/homeData";
import { sectionItems, useSite } from "../../services/SiteData.jsx";
import { Landmark } from "lucide-react";

export default function PartnersSection() {
  const site = useSite();
  const block = site.home?.partners;
  const partners = sectionItems(block) || BANK_PARTNERS;
  const eyebrow = block?.eyebrow || "INSTITUTIONAL PRE-APPROVALS";
  const title = block?.titleLead || "Banking & Home Loan Partners";
  const intro = block?.intro || "All Crestora Properties projects are pre-sanctioned for hassle-free home and plot loans.";
  return (
    <section style={{ background: "#ffffff", padding: "60px 0", borderTop: "1px solid #edf2f7" }}>
      <div className="crestora-container">
        <div style={{ textAlign: "center", marginBottom: "35px" }}>
          <span style={{ fontSize: "12px", fontWeight: "700", textTransform: "uppercase", letterSpacing: "1.5px", color: "#c59b27" }}>
            {eyebrow}
          </span>
          <h3 style={{ fontFamily: "Montserrat, sans-serif", fontSize: "24px", fontWeight: "600", color: "#163057", marginTop: "6px" }}>
            {title}
          </h3>
          <p style={{ color: "#718096", fontSize: "14px", marginTop: "4px" }}>
            {intro}
          </p>
        </div>

        <div className="partners-responsive-grid">
          {partners.map((bank, idx) => (
            <div
              key={idx}
              style={{
                background: "#f8fafc",
                border: "1px solid #e2e8f0",
                padding: "18px",
                textAlign: "center",
                borderRadius: "4px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "6px",
              }}
            >
              <Landmark size={24} color="#163057" />
              <div style={{ fontSize: "15px", fontWeight: "700", color: "#1e293b" }}>
                {bank.name}
              </div>
              <div style={{ fontSize: "11px", color: "#718096" }}>
                {bank.desc}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
