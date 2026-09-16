import React from "react";
import { FACILITIES_DATA } from "../../data/homeData";

export default function FacilitiesSection() {
  return (
    <section className="home-section facilities-section">
      <div className="ul-container">
        <div className="facilities-grid">
          {/* Text & Facility Items */}
          <div className="facilities-content-col">
            <span className="ul-section-sub-title">Luxury Amenities</span>
            <h2 className="ul-section-title">
              Engineered For <span className="colored">Sophisticated Living</span>
            </h2>
            <p className="facilities-intro">
              Every residence in our portfolio meets rigorous architectural
              criteria, incorporating bespoke wellness facilities, private
              outdoor extensions, and autonomous environmental controls.
            </p>

            <div className="facilities-items-grid">
              {FACILITIES_DATA.map((item) => (
                <div key={item.id} className="facility-item-card">
                  <div className="facility-icon-wrap">
                    <i className={item.icon}></i>
                  </div>
                  <div>
                    <h4 className="facility-title">{item.title}</h4>
                    <p className="facility-desc">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Architectural Photo */}
          <div className="facilities-visual-col">
            <div className="facilities-img-frame">
              <img
                src="/assets/img/facility-img.jpg"
                alt="Luxury resort facility"
                className="facilities-img"
                loading="lazy"
              />
              <div className="facility-floating-pill">
                <i className="flaticon-star" style={{ color: "#f59e0b" }}></i>
                <span>5-Star Architectural Benchmark</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
