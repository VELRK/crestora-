import React, { useState } from "react";
import { FAQS_DATA } from "../../data/homeData";
import { ChevronDown } from "lucide-react";

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleFaq = (idx) => {
    setOpenIndex((prev) => (prev === idx ? -1 : idx));
  };

  return (
    <section id="faqs-section" className="faq-section">
      <div className="crestora-container">
        <div className="section-header">
          <h5>FREQUENTLY ASKED QUESTIONS</h5>
          <h2>
            Answers & <span>Advisory</span>
          </h2>
          <p>
            Key insights into DTCP sanctions, TN RERA compliance, bank home loan pre-approvals, and NRI acquisition protocols at Crestora Properties.
          </p>
        </div>

        <div className="faq-accordion-wrapper">
          {FAQS_DATA.map((faq, idx) => {
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
