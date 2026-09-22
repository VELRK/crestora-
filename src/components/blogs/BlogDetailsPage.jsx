import React, { useState, useEffect } from "react";
import { BLOGS_DATA } from "../../data/blogsData";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Share2,
  Bookmark,
  CheckCircle2,
  Printer,
  Sparkles,
  Phone,
  Mail,
  ArrowRight,
  ExternalLink,
  Building2,
  ShieldCheck,
  ChevronRight,
  Check,
  Copy,
  TrendingUp,
} from "lucide-react";

export default function BlogDetailsPage({
  post,
  allPosts = BLOGS_DATA,
  onBackToBlogs,
  onSelectBlog,
  onSelectProject,
  allProjects = [],
  onBookSiteVisit,
  showToast,
}) {
  const [copied, setCopied] = useState(false);
  const [activeSectionId, setActiveSectionId] = useState(
    post?.tableOfContents?.[0]?.id || ""
  );

  // Fallback to first post if none passed
  const currentPost = post || allPosts[0] || BLOGS_DATA[0];

  // Scroll to top on post change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPost.id]);

  // Observer for table of contents active highlighting
  useEffect(() => {
    const handleScroll = () => {
      if (!currentPost.tableOfContents) return;
      const scrollY = window.scrollY;
      for (const item of currentPost.tableOfContents) {
        const el = document.getElementById(item.id);
        if (el) {
          const top = el.offsetTop - 140;
          if (scrollY >= top) {
            setActiveSectionId(item.id);
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [currentPost]);

  // Related posts (excluding current post)
  const relatedPosts = allPosts
    .filter((p) => p.id !== currentPost.id)
    .slice(0, 3);

  // Related project lookup
  const relatedProject = allProjects.find(
    (p) => p.id === currentPost.relatedProjectId
  );

  // Copy article link to clipboard
  const handleCopyLink = () => {
    const url = window.location.href;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url);
      setCopied(true);
      showToast && showToast("Article link copied to clipboard!");
      setTimeout(() => setCopied(false), 3000);
    } else {
      showToast && showToast("Article link: " + url);
    }
  };

  // Share via WhatsApp
  const handleShareWhatsApp = () => {
    const text = encodeURIComponent(
      `${currentPost.title} - Read this insight on Crestora Properties: ${window.location.href}`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, "_blank");
  };

  // Share via LinkedIn
  const handleShareLinkedIn = () => {
    const url = encodeURIComponent(window.location.href);
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
      "_blank"
    );
  };

  // Print article
  const handlePrint = () => {
    window.print();
  };

  return (
    <article className="blog-details-page-wrapper">
      {/* 1. STICKY TOP SUB-BAR */}
      <div className="blog-details-subbar">
        <div className="crestora-container">
          <div className="subbar-inner">
            <button
              type="button"
              className="subbar-back-btn"
              onClick={onBackToBlogs}
            >
              <ArrowLeft size={16} />
              <span>Back to Insights &amp; Blogs</span>
            </button>

            <div className="subbar-category-tag">
              {currentPost.category}
            </div>

            <div className="subbar-actions">
              <button
                type="button"
                className="subbar-action-btn"
                onClick={handleCopyLink}
                title="Copy Link"
              >
                {copied ? <Check size={15} color="#10b981" /> : <Copy size={15} />}
                <span className="d-none-mobile">{copied ? "Copied" : "Copy Link"}</span>
              </button>

              <button
                type="button"
                className="subbar-action-btn"
                onClick={handleShareWhatsApp}
                title="Share on WhatsApp"
              >
                <Share2 size={15} />
                <span className="d-none-mobile">Share</span>
              </button>

              <button
                type="button"
                className="subbar-action-btn d-none-mobile"
                onClick={handlePrint}
                title="Print Article"
              >
                <Printer size={15} />
                <span>Print</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 2. ARTICLE HEADER */}
      <header className="blog-details-header">
        <div className="crestora-container">
          <div className="blog-details-header-inner">
            <div className="article-category-pill">
              <Sparkles size={13} color="#dfb743" />
              <span>{currentPost.category}</span>
            </div>

            <h1 className="article-headline">{currentPost.title}</h1>

            {currentPost.subtitle && (
              <p className="article-lead-subtitle">{currentPost.subtitle}</p>
            )}

            {/* Author and Metadata Strip */}
            <div className="article-meta-strip">
              <div className="author-badge-large">
                <img
                  src={currentPost.author.avatar}
                  alt={currentPost.author.name}
                  className="author-avatar-large"
                />
                <div className="author-info-block">
                  <div className="author-name-large">{currentPost.author.name}</div>
                  <div className="author-role-large">{currentPost.author.role}</div>
                </div>
              </div>

              <div className="article-meta-divider" />

              <div className="article-stats-items">
                <div className="meta-stat-item">
                  <Calendar size={14} color="#c59b27" />
                  <span>{currentPost.date}</span>
                </div>
                <div className="meta-stat-item">
                  <Clock size={14} color="#c59b27" />
                  <span>{currentPost.readTime}</span>
                </div>
                {currentPost.views && (
                  <div className="meta-stat-item views-tag">
                    <span>{currentPost.views}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* 3. HERO BANNER IMAGE */}
      <div className="article-hero-image-wrapper">
        <div className="crestora-container">
          <div className="article-hero-frame">
            <img
              src={currentPost.bannerImage || currentPost.image}
              alt={currentPost.title}
              className="article-hero-img"
              loading="eager"
            />
            <div className="article-img-caption">
              <span>Crestora Research Intelligence • Real Estate Analysis</span>
            </div>
          </div>
        </div>
      </div>

      {/* 4. MAIN ARTICLE 2-COLUMN LAYOUT */}
      <div className="article-body-wrapper">
        <div className="crestora-container">
          <div className="article-layout-grid">
            {/* LEFT: MAIN ARTICLE CONTENT */}
            <main className="article-main-content">
              {/* Key Takeaways Box */}
              {currentPost.keyTakeaways && currentPost.keyTakeaways.length > 0 && (
                <div className="article-takeaways-box">
                  <div className="takeaways-header">
                    <ShieldCheck size={20} color="#dfb743" />
                    <h4>Key Executive Takeaways</h4>
                  </div>
                  <ul className="takeaways-list">
                    {currentPost.keyTakeaways.map((point, idx) => (
                      <li key={idx} className="takeaways-item">
                        <CheckCircle2 size={16} color="#c59b27" className="takeaways-icon" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Table of Contents Box */}
              {currentPost.tableOfContents && currentPost.tableOfContents.length > 0 && (
                <nav className="article-toc-box" aria-label="Table of Contents">
                  <div className="toc-title">Table of Contents</div>
                  <ol className="toc-list">
                    {currentPost.tableOfContents.map((item) => (
                      <li key={item.id} className="toc-item">
                        <a
                          href={`#${item.id}`}
                          className={`toc-link ${activeSectionId === item.id ? "active" : ""}`}
                          onClick={(e) => {
                            e.preventDefault();
                            document.getElementById(item.id)?.scrollIntoView({
                              behavior: "smooth",
                              block: "start",
                            });
                          }}
                        >
                          {item.title}
                        </a>
                      </li>
                    ))}
                  </ol>
                </nav>
              )}

              {/* Article Content Sections */}
              <div className="article-sections-container">
                {currentPost.sections &&
                  currentPost.sections.map((section) => (
                    <section key={section.id} id={section.id} className="article-section-block">
                      <h2 className="section-block-heading">{section.heading}</h2>

                      {section.paragraphs &&
                        section.paragraphs.map((p, pIdx) => (
                          <p key={pIdx} className="section-block-paragraph">
                            {p}
                          </p>
                        ))}

                      {/* Pull Quote */}
                      {section.quote && (
                        <blockquote className="article-pull-quote">
                          <p>"{section.quote}"</p>
                        </blockquote>
                      )}

                      {/* Highlight Stats Matrix */}
                      {section.highlightStats && (
                        <div className="section-stats-matrix">
                          {section.highlightStats.map((stat, sIdx) => (
                            <div key={sIdx} className="stat-matrix-card">
                              <div className="stat-matrix-val">{stat.value}</div>
                              <div className="stat-matrix-lbl">{stat.label}</div>
                            </div>
                          ))}
                        </div>
                      )}
                    </section>
                  ))}
              </div>

              {/* Article Tags Cloud */}
              {currentPost.tags && (
                <div className="article-tags-wrapper">
                  <span className="tags-label">Related Topics:</span>
                  <div className="tags-cloud">
                    {currentPost.tags.map((tag, idx) => (
                      <span key={idx} className="article-tag-chip">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Social Share Bar */}
              <div className="article-share-strip">
                <span className="share-strip-title">Share this advisory:</span>
                <div className="share-buttons-row">
                  <button
                    type="button"
                    className="social-share-btn share-wa"
                    onClick={handleShareWhatsApp}
                  >
                    Share on WhatsApp
                  </button>
                  <button
                    type="button"
                    className="social-share-btn share-li"
                    onClick={handleShareLinkedIn}
                  >
                    Share on LinkedIn
                  </button>
                  <button
                    type="button"
                    className="social-share-btn share-copy"
                    onClick={handleCopyLink}
                  >
                    {copied ? "Link Copied!" : "Copy URL"}
                  </button>
                </div>
              </div>

              {/* Author Bio Box */}
              <div className="article-author-bio-card">
                <img
                  src={currentPost.author.avatar}
                  alt={currentPost.author.name}
                  className="author-bio-avatar"
                />
                <div className="author-bio-text">
                  <div className="bio-written-by">Written by</div>
                  <h4 className="bio-name">{currentPost.author.name}</h4>
                  <div className="bio-role">{currentPost.author.role}</div>
                  <p className="bio-desc">{currentPost.author.bio}</p>
                </div>
              </div>
            </main>

            {/* RIGHT: STICKY SIDEBAR */}
            <aside className="article-sidebar">
              {/* 1. Expert Advisory Consultation Card */}
              <div className="sidebar-advisory-card">
                <div className="advisory-card-badge">DIRECT ASSISTANCE</div>
                <h3 className="advisory-card-title">Talk to Crestora Investment Advisory</h3>
                <p className="advisory-card-desc">
                  Have questions about DTCP sanctions, patta transfer procedures, or NRI power of attorney in Coimbatore?
                </p>

                <div className="advisory-contact-links">
                  <a href="tel:+919159066666" className="advisory-phone-btn">
                    <Phone size={15} color="#dfb743" />
                    <span>+91 91590 66666</span>
                  </a>
                  <a href="mailto:info@crestoraproperties.com" className="advisory-email-btn">
                    <Mail size={15} color="#dfb743" />
                    <span>info@crestoraproperties.com</span>
                  </a>
                </div>

                <button
                  type="button"
                  className="crestora-btn crestora-btn-gold sidebar-cta-btn"
                  onClick={onBookSiteVisit}
                >
                  <span>Book Site Visit &amp; Advisory</span>
                  <ArrowRight size={14} />
                </button>
              </div>

              {/* 2. Featured Project Mentioned */}
              {relatedProject && (
                <div className="sidebar-project-card">
                  <div className="sidebar-card-label">DEVELOPMENT SPOTLIGHT</div>
                  <div className="sidebar-proj-img-wrap">
                    <img
                      src={relatedProject.image}
                      alt={relatedProject.title}
                      className="sidebar-proj-img"
                    />
                    <span className="sidebar-proj-type">{relatedProject.typeName}</span>
                  </div>
                  <div className="sidebar-proj-details">
                    <h4 className="sidebar-proj-title">{relatedProject.title}</h4>
                    <p className="sidebar-proj-loc">{relatedProject.location}</p>
                    <div className="sidebar-proj-price">{relatedProject.priceRange}</div>
                    <button
                      type="button"
                      className="sidebar-proj-btn"
                      onClick={() => onSelectProject && onSelectProject(relatedProject)}
                    >
                      <span>View Development Details</span>
                      <ArrowRight size={13} />
                    </button>
                  </div>
                </div>
              )}

              {/* 3. Trending Articles List */}
              <div className="sidebar-trending-box">
                <div className="trending-box-title">
                  <TrendingUp size={16} color="#c59b27" />
                  <span>Trending Insights</span>
                </div>
                <div className="trending-items-list">
                  {allPosts.slice(0, 4).map((p, idx) => (
                    <div
                      key={p.id}
                      className={`trending-item ${p.id === currentPost.id ? "current" : ""}`}
                      onClick={() => onSelectBlog && onSelectBlog(p)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => e.key === "Enter" && onSelectBlog && onSelectBlog(p)}
                    >
                      <span className="trending-num">0{idx + 1}</span>
                      <div className="trending-item-content">
                        <span className="trending-cat">{p.category}</span>
                        <h5 className="trending-title">{p.title}</h5>
                        <span className="trending-time">{p.readTime}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>

      {/* 5. BOTTOM RELATED ARTICLES CAROUSEL / GRID */}
      <section className="article-related-section">
        <div className="crestora-container">
          <div className="related-section-header">
            <div>
              <h5>CONTINUE READING</h5>
              <h2>Related Market Intelligence &amp; Advisories</h2>
            </div>
            <button
              type="button"
              className="crestora-btn crestora-btn-outline"
              onClick={onBackToBlogs}
            >
              <span>View All Articles</span>
              <ArrowRight size={14} />
            </button>
          </div>

          <div className="related-articles-grid">
            {relatedPosts.map((rPost) => (
              <article
                key={rPost.id}
                className="related-article-card"
                onClick={() => onSelectBlog && onSelectBlog(rPost)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === "Enter" && onSelectBlog && onSelectBlog(rPost)}
              >
                <div className="related-img-holder">
                  <img
                    src={rPost.image}
                    alt={rPost.title}
                    loading="lazy"
                    className="related-img"
                  />
                  <span className="related-cat-pill">{rPost.category}</span>
                </div>
                <div className="related-card-content">
                  <div className="related-meta">
                    <span className="meta-date">
                      <Calendar size={12} color="#c59b27" />
                      {rPost.date}
                    </span>
                    <span>•</span>
                    <span className="meta-read">
                      <Clock size={12} color="#c59b27" />
                      {rPost.readTime}
                    </span>
                  </div>
                  <h4 className="related-title">{rPost.title}</h4>
                  <p className="related-excerpt">{rPost.excerpt}</p>
                  <div className="related-footer">
                    <span className="related-read-link">
                      Read Full Article <ArrowRight size={13} />
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </article>
  );
}
