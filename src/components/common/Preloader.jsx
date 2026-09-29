import React, { useState, useEffect } from "react";
import logoImg from "../../assets/logo.jpeg";

export default function Preloader({ ready = false, logo = logoImg }) {
  const [visible, setVisible] = useState(true);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    if (ready) {
      const fadeTimer = setTimeout(() => {
        setFading(true);
      }, 150);
      const removeTimer = setTimeout(() => {
        setVisible(false);
      }, 650);
      return () => {
        clearTimeout(fadeTimer);
        clearTimeout(removeTimer);
      };
    }
  }, [ready]);

  // Safety fallback: Never keep overlay permanently even if API takes long
  useEffect(() => {
    const fallbackTimer = setTimeout(() => {
      setFading(true);
      setTimeout(() => setVisible(false), 500);
    }, 2800);
    return () => clearTimeout(fallbackTimer);
  }, []);

  if (!visible) return null;

  return (
    <div
      className={`crestora-preloader-overlay ${fading ? "preloader-fade-out" : ""}`}
      aria-hidden={fading}
      role="status"
      aria-label="Loading Crestora Properties"
    >
      <div className="crestora-preloader-content">
        <div className="crestora-preloader-logo-wrap">
          <img src={logo} alt="Crestora Properties" className="crestora-preloader-logo" />
          <div className="crestora-preloader-pulse"></div>
        </div>
        <div className="crestora-preloader-brand">
          <h2 className="crestora-preloader-title">CRESTORA PROPERTIES</h2>
          <p className="crestora-preloader-subtitle">DTCP &amp; RERA Sanctioned Plotted Communities</p>
        </div>
        <div className="crestora-preloader-progress-track">
          <div className="crestora-preloader-progress-bar"></div>
        </div>
      </div>
    </div>
  );
}
