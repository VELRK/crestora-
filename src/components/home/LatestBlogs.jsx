import React from "react";
import { BLOGS_DATA } from "../../data/homeData";
import { ArrowRight, Calendar, Clock } from "lucide-react";

export default function LatestBlogs() {
  return (
    <section className="comTitle" style={{ background: "#f8fafc", padding: "80px 0" }}>
      <div className="crestora-container">
        <div className="section-header">
          <h5>INSIGHT HUB</h5>
          <h2>
            Market Insights & <span>Advisory</span>
          </h2>
          <p>
            Stay informed with expert analysis on Coimbatore and Chennai infrastructure projects, DTCP legal procedures, and high-yield real estate investments.
          </p>
        </div>

        <div className="blogs-responsive-grid">
          {BLOGS_DATA.map((post) => (
            <article key={post.id} className="blog-card-article">
              <div style={{ position: "relative", height: "200px", overflow: "hidden" }}>
                <img
                  src={post.image}
                  alt={post.title}
                  loading="lazy"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
                <span
                  style={{
                    position: "absolute",
                    top: "14px",
                    left: "14px",
                    background: "#163057",
                    color: "#ffffff",
                    fontSize: "11px",
                    fontWeight: "700",
                    letterSpacing: "0.8px",
                    textTransform: "uppercase",
                    padding: "4px 10px",
                    borderRadius: "2px",
                  }}
                >
                  {post.category}
                </span>
              </div>

              <div style={{ padding: "24px", display: "flex", flexDirection: "column", flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: "12px", fontSize: "12px", color: "#718096", marginBottom: "10px" }}>
                  <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                    <Calendar size={13} color="#c59b27" />
                    {post.date}
                  </span>
                  <span>•</span>
                  <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                    <Clock size={13} color="#c59b27" />
                    {post.readTime}
                  </span>
                </div>

                <h3 style={{ fontSize: "18px", fontWeight: "700", color: "#163057", lineHeight: "1.4", marginBottom: "10px" }}>
                  {post.title}
                </h3>

                <p style={{ fontSize: "14px", color: "#4a5568", lineHeight: "1.6", marginBottom: "20px", flex: 1 }}>
                  {post.excerpt}
                </p>

                <div style={{ paddingTop: "14px", borderTop: "1px solid #edf2f7" }}>
                  <span
                    style={{
                      fontSize: "13px",
                      fontWeight: "700",
                      color: "#274f9a",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "6px",
                    }}
                  >
                    Read Full Article <ArrowRight size={14} />
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
