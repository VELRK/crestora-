import React from "react";

export default function AppAdSection() {
  return (
    <section className="ul-app-ad">
      <div className="ul-app-ad-container">
        <div className="ul-app-ad-grid">
          {/* Text Content */}
          <div className="ul-app-ad-txt">
            <span className="ul-section-sub-title">Download App</span>
            <h2 className="ul-section-title">
              Download Our Real Estate Mobile App{" "}
              <span className="colored">15% Off</span>
            </h2>
            <div className="ul-app-ad-btns">
              <a href="#" className="app-store-btn" role="button">
                <i className="flaticon-play icon"></i>
                <div>
                  <span className="sub-title">Get it on</span>
                  <span className="title">Apps Store</span>
                </div>
              </a>

              <a href="#" className="app-store-btn" role="button">
                <i className="flaticon-play icon"></i>
                <div>
                  <span className="sub-title">Get it on</span>
                  <span className="title">Google Play</span>
                </div>
              </a>
            </div>
          </div>

          {/* Promotional App Mockups */}
          <div className="ul-app-ad-imgs">
            <div className="ul-app-ad-img">
              {/* QR Code */}
              <img
                src="/assets/img/app-ad-qr-code.jpg"
                alt="Scan to download app"
                className="ul-app-ad-qr-code"
                loading="lazy"
              />
              {/* App Screenshot 1 */}
              <img
                src="/assets/img/app-ad-ss-1.png"
                alt="Realestics App Screenshot 1"
                className="ul-app-ad-ss-1"
                loading="lazy"
              />
            </div>

            <div className="ul-app-ad-img">
              {/* App Screenshot 2 */}
              <img
                src="/assets/img/app-ad-ss-2.png"
                alt="Realestics App Screenshot 2"
                className="ul-app-ad-ss-2"
                loading="lazy"
              />
            </div>

            {/* Decorative Vector Graphic */}
            <img
              src="/assets/img/app-ad-img-vector.svg"
              alt=""
              className="ul-app-ad-vector"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
