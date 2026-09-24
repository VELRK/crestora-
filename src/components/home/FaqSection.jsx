import React, { useState } from "react";
import { FAQS_DATA } from "../../data/homeData";
import { sectionItems, useSite } from "../../services/SiteData.jsx";
import { ChevronDown } from "lucide-react";

export default function FaqSection() {
  const site = useSite();
  const block = site.home?.faqs;
  const faqs = sectionItems(block) || FAQS_DATA;
  const eyebrow = block?.eyebrow || "FREQUENTLY ASKED QUESTIONS";
  const titleLead = block?.titleLead || "Answers &";
  const titleHighlight = block?.titleHighlight || "Advisory";
  const intro = block?.intro || "Key insights into DTCP sanctions, TN RERA compliance, bank home loan pre-approvals, and NRI acquisition protocols at Crestora Properties.";
  const [openIndex, setOpenIndex] = useState(0);

  const toggleFaq = (idx) => {
    setOpenIndex((prev) => (prev === idx ? -1 : idx));
  };

  return (
    <section id="faqs-section" className="faq-section">
      <div className="crestora-container">
        <div className="section-header">
          <h5>{eyebrow}</h5>
          <h2>
            {titleLead} <span>{titleHighlight}</span>
          </h2>
          <p>
            {intro}
          </p>
        </div>

        <div className="faq-accordion-wrapper">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className={`faq-accordion-item ${isOpen ? "open" : ""}`}
              >
                <button
                  type="button"
                  className="faq-question-btn"
                  onClick={() => toggleFaq(idx)}
                  aria-expanded={isOpen}
                >
                  <span>{faq.q}</span>
                  <ChevronDown className="faq-chevron-icon" size={20} />
                </button>
                {isOpen && (
                  <div className="faq-answer-inner">
                    <p style={{ margin: 0 }}>{faq.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
