import React from "react";

export function ProjectCardSkeleton({ viewMode = "grid" }) {
  if (viewMode === "list") {
    return (
      <div className="project-card-list skeleton-card" style={{ marginBottom: "24px" }}>
        <div className="shimmer-box" style={{ width: "360px", minHeight: "260px", flexShrink: 0 }} />
        <div style={{ padding: "24px 28px", flex: 1, display: "flex", flexDirection: "column", gap: "14px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div className="shimmer-box" style={{ width: "120px", height: "24px" }} />
            <div className="shimmer-box" style={{ width: "90px", height: "28px" }} />
          </div>
          <div className="shimmer-box" style={{ width: "70%", height: "28px" }} />
          <div className="shimmer-box" style={{ width: "40%", height: "18px" }} />
          <div style={{ display: "flex", gap: "10px", margin: "8px 0" }}>
            <div className="shimmer-box" style={{ width: "80px", height: "26px", borderRadius: "20px" }} />
            <div className="shimmer-box" style={{ width: "100px", height: "26px", borderRadius: "20px" }} />
            <div className="shimmer-box" style={{ width: "90px", height: "26px", borderRadius: "20px" }} />
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "auto", paddingTop: "12px", borderTop: "1px solid #f1f5f9" }}>
            <div className="shimmer-box" style={{ width: "130px", height: "36px" }} />
            <div style={{ display: "flex", gap: "10px" }}>
              <div className="shimmer-box" style={{ width: "110px", height: "40px" }} />
              <div className="shimmer-box" style={{ width: "130px", height: "40px" }} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="project-card skeleton-card" style={{ background: "#ffffff", borderRadius: "8px", overflow: "hidden", border: "1px solid #e2e8f0" }}>
      <div className="shimmer-box" style={{ width: "100%", height: "240px", borderRadius: "0" }} />
      <div style={{ padding: "20px", display: "flex", flexDirection: "column", gap: "12px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div className="shimmer-box" style={{ width: "100px", height: "20px" }} />
          <div className="shimmer-box" style={{ width: "70px", height: "24px" }} />
        </div>
        <div className="shimmer-box" style={{ width: "85%", height: "24px" }} />
        <div className="shimmer-box" style={{ width: "55%", height: "16px" }} />
        <div style={{ display: "flex", gap: "8px", margin: "4px 0" }}>
          <div className="shimmer-box" style={{ width: "70px", height: "22px", borderRadius: "14px" }} />
          <div className="shimmer-box" style={{ width: "85px", height: "22px", borderRadius: "14px" }} />
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: "14px", borderTop: "1px solid #f1f5f9", marginTop: "6px" }}>
          <div className="shimmer-box" style={{ width: "95px", height: "28px" }} />
          <div className="shimmer-box" style={{ width: "110px", height: "36px" }} />
        </div>
      </div>
    </div>
  );
}

export function ProjectDetailsSkeleton() {
  return (
    <div className="pdp-wrapper skeleton-details" style={{ background: "#f8fafc", minHeight: "100vh" }}>
      {/* Top Breadcrumb & Title Skeleton */}
      <div style={{ background: "#0b1c38", padding: "60px 0 50px", color: "#fff" }}>
        <div className="crestora-container" style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div className="shimmer-box" style={{ width: "160px", height: "18px", background: "rgba(255,255,255,0.1)" }} />
          <div className="shimmer-box" style={{ width: "50%", height: "42px", background: "rgba(255,255,255,0.12)" }} />
          <div className="shimmer-box" style={{ width: "35%", height: "22px", background: "rgba(255,255,255,0.08)" }} />
          <div style={{ display: "flex", gap: "12px", marginTop: "8px" }}>
            <div className="shimmer-box" style={{ width: "120px", height: "32px", borderRadius: "20px", background: "rgba(255,255,255,0.1)" }} />
            <div className="shimmer-box" style={{ width: "140px", height: "32px", borderRadius: "20px", background: "rgba(255,255,255,0.1)" }} />
          </div>
        </div>
      </div>

      {/* Main Content Skeleton */}
      <div className="crestora-container" style={{ padding: "40px 20px 80px" }}>
        {/* Quick Stats Bar */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px", marginBottom: "36px" }}>
          {[1, 2, 3, 4].map((i) => (
            <div key={i} style={{ background: "#fff", padding: "20px", borderRadius: "8px", border: "1px solid #e2e8f0" }}>
              <div className="shimmer-box" style={{ width: "40px", height: "40px", borderRadius: "8px", marginBottom: "12px" }} />
              <div className="shimmer-box" style={{ width: "60%", height: "16px", marginBottom: "8px" }} />
              <div className="shimmer-box" style={{ width: "80%", height: "22px" }} />
            </div>
          ))}
        </div>

        {/* 2-Column Layout */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 360px", gap: "36px" }}>
          {/* Left Column */}
          <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
            {/* Gallery Image Skeleton */}
            <div className="shimmer-box" style={{ width: "100%", height: "420px", borderRadius: "10px" }} />
            
            {/* Overview Section Skeleton */}
            <div style={{ background: "#fff", padding: "32px", borderRadius: "10px", border: "1px solid #e2e8f0" }}>
              <div className="shimmer-box" style={{ width: "200px", height: "26px", marginBottom: "20px" }} />
              <div className="shimmer-box" style={{ width: "100%", height: "16px", marginBottom: "10px" }} />
              <div className="shimmer-box" style={{ width: "95%", height: "16px", marginBottom: "10px" }} />
              <div className="shimmer-box" style={{ width: "90%", height: "16px", marginBottom: "10px" }} />
              <div className="shimmer-box" style={{ width: "75%", height: "16px", marginBottom: "24px" }} />
              
              <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "12px" }}>
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="shimmer-box" style={{ width: "100%", height: "38px" }} />
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Sticky Form Skeleton */}
          <div>
            <div style={{ background: "#fff", padding: "28px", borderRadius: "10px", border: "1px solid #e2e8f0" }}>
              <div className="shimmer-box" style={{ width: "150px", height: "24px", marginBottom: "14px" }} />
              <div className="shimmer-box" style={{ width: "100%", height: "16px", marginBottom: "24px" }} />
              <div className="shimmer-box" style={{ width: "100%", height: "46px", marginBottom: "14px" }} />
              <div className="shimmer-box" style={{ width: "100%", height: "46px", marginBottom: "14px" }} />
              <div className="shimmer-box" style={{ width: "100%", height: "46px", marginBottom: "20px" }} />
              <div className="shimmer-box" style={{ width: "100%", height: "50px", borderRadius: "6px" }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
