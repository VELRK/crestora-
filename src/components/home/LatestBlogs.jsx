import React from "react";
import { BLOGS_DATA } from "../../data/homeData";
import { useSite } from "../../services/SiteData.jsx";
import { ArrowRight, Calendar, Clock, Sparkles } from "lucide-react";

export default function LatestBlogs({ onSelectBlog, onNavigate }) {
  const site = useSite();
  const copy = site.home?.insights || {};
  const source = site.home?.latestBlogs?.length ? site.home.latestBlogs : BLOGS_DATA;
  const displayBlogs = source.slice(0, 3);
  const eyebrow = copy.eyebrow || "INSIGHT HUB";
  const titleLead = copy.titleLead || "Market Insights &";
  const titleHighlight = copy.titleHighlight || "Advisory";
  const intro = copy.intro || "Stay informed with expert analysis on Coimbatore infrastructure projects, Avinashi road elevated expressway, DTCP legal procedures, and high-yield real estate investments.";
  const buttonText = copy.buttonText || "Explore All Insights & Blogs";

  const handlePostClick = (post) => {
    if (onSelectBlog) {
      onSelectBlog(post);
    } else if (onNavigate) {
      onNavigate("blogs");
    }
  };

  return (
    <section className="comTitle" style={{ background: "#f8fafc", padding: "80px 0" }}>
      <div className="crestora-container">
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "24px",
            marginBottom: "40px",
          }}
        >
          <div className="section-header" style={{ textAlign: "left", margin: 0, maxWidth: "700px" }}>
            <h5>{eyebrow}</h5>
            <h2>
              {titleLead} <span>{titleHighlight}</span>
            </h2>
            <p style={{ margin: 0 }}>
              {intro}
            </p>
          </div>

          <div>
            <button
              type="button"
              className="crestora-btn crestora-btn-outline"
              onClick={() => onNavigate && onNavigate("blogs")}
              style={{ padding: "12px 24px", fontSize: "13px" }}
            >
              <span>{buttonText}</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>

        <div className="blogs-responsive-grid">
          {displayBlogs.map((post) => (
            <article
              key={post.id}
              className="blog-card-article"
              onClick={() => handlePostClick(post)}
              style={{ cursor: "pointer" }}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && handlePostClick(post)}
            >
              <div style={{ position: "relative", height: "210px", overflow: "hidden" }}>
                <img
                  src={post.image}
                  alt={post.title}
                  loading="lazy"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    transition: "transform 0.4s ease",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1.0)")}
                />
                <span
                  style={{
                    position: "absolute",
                    top: "14px",
                    left: "14px",
                    background: "#091a38",
                    border: "1px solid #c59b27",
                    color: "#ffffff",
                    fontSize: "10.5px",
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
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    fontSize: "12px",
                    color: "#718096",
                    marginBottom: "10px",
                  }}
                >
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

                <h3
                  style={{
                    fontSize: "17.5px",
                    fontWeight: "700",
                    color: "#163057",
                    lineHeight: "1.4",
                    marginBottom: "10px",
                  }}
                >
                  {post.title}
                </h3>

                <p
                  style={{
                    fontSize: "14px",
                    color: "#4a5568",
                    lineHeight: "1.6",
                    marginBottom: "20px",
                    flex: 1,
                  }}
                >
                  {post.excerpt}
                </p>

                <div style={{ paddingTop: "14px", borderTop: "1px solid #edf2f7" }}>
                  <span
                    style={{
                      fontSize: "13px",
                      fontWeight: "700",
                      color: "#c59b27",
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
