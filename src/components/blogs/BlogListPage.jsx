import React, { useState, useEffect, useMemo } from "react";
import { BLOGS_DATA, BLOGS_CATEGORIES, BLOG_NEWSLETTER_DATA } from "../../data/blogsData";
import {
  Search,
  Calendar,
  Clock,
  ArrowRight,
  Sparkles,
  BookOpen,
  Share2,
  TrendingUp,
  ShieldCheck,
  Building2,
  Mail,
  CheckCircle2,
  ChevronRight,
  Filter,
} from "lucide-react";

export default function BlogListPage({
  onSelectBlog,
  onNavigate,
  onBookSiteVisit,
  showToast,
}) {
  const [selectedCategory, setSelectedCategory] = useState("All Articles");
  const [searchQuery, setSearchQuery] = useState("");
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // Filtered blogs
  const filteredBlogs = useMemo(() => {
    return BLOGS_DATA.filter((post) => {
      const matchesCategory =
        selectedCategory === "All Articles" || post.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        post.title.toLowerCase().includes(q) ||
        post.excerpt.toLowerCase().includes(q) ||
        post.category.toLowerCase().includes(q) ||
        post.author.name.toLowerCase().includes(q) ||
        (post.tags && post.tags.some((t) => t.toLowerCase().includes(q)));
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  // Featured Hero Blog (defaults to first featured or first in list)
  const featuredBlog = useMemo(() => {
    return BLOGS_DATA.find((p) => p.featured) || BLOGS_DATA[0];
  }, []);

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes("@")) {
      showToast && showToast("Please enter a valid email address.");
      return;
    }
    setNewsletterSubscribed(true);
    showToast && showToast("Successfully subscribed to Crestora Market Briefing!");
  };

  return (
    <div className="blog-list-page-wrapper">
      {/* 1. CLASSIC LUXURY EDITORIAL HERO BANNER */}
      <section className="blog-hero-banner">
        <div className="crestora-container">
          <div className="blog-hero-content">
            <div className="blog-hero-pill">
              <Sparkles size={14} className="gold-icon" />
              <span>CRESTORA INTELLIGENCE &amp; ADVISORY</span>
            </div>

            <h1 className="blog-hero-title">
              Coimbatore Real Estate <span>Insights &amp; Blogs</span>
            </h1>

            <p className="blog-hero-subtitle">
              Authoritative research on Coimbatore infrastructure expansions, Avinashi road corridor, DTCP and TN RERA legal checklists, remote NRI investment frameworks, and turnkey villa engineering.
            </p>

            {/* Breadcrumb row */}
            <div className="blog-hero-breadcrumbs">
              <button
                type="button"
                className="breadcrumb-link-btn"
                onClick={() => onNavigate && onNavigate("home")}
              >
                Home
              </button>
              <ChevronRight size={13} className="breadcrumb-arrow" />
              <span className="breadcrumb-current">Insights &amp; Blogs</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. FEATURED STORY SPOTLIGHT (Shown when no search filter active) */}
      {!searchQuery && selectedCategory === "All Articles" && featuredBlog && (
        <section className="blog-featured-section">
          <div className="crestora-container">
            <div className="blog-featured-badge-row">
              <span className="blog-section-label">EDITOR'S SPOTLIGHT</span>
            </div>

            <div
              className="blog-featured-card"
              onClick={() => onSelectBlog && onSelectBlog(featuredBlog)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && onSelectBlog && onSelectBlog(featuredBlog)}
            >
              <div className="blog-featured-image-wrapper">
                <img
                  src={featuredBlog.image}
                  alt={featuredBlog.title}
                  className="blog-featured-img"
                  loading="eager"
                />
                <span className="blog-featured-category-tag">
                  {featuredBlog.category}
                </span>
              </div>

              <div className="blog-featured-info">
                <div className="blog-featured-body">
                  <div className="blog-meta-row">
                    <span className="blog-meta-item">
                      <Calendar size={13.5} color="#c59b27" />
                      {featuredBlog.date}
                    </span>
                    <span className="meta-dot">•</span>
                    <span className="blog-meta-item">
                      <Clock size={13.5} color="#c59b27" />
                      {featuredBlog.readTime}
                    </span>
                    <span className="meta-dot">•</span>
                    <span className="blog-views-badge">{featuredBlog.views}</span>
                  </div>

                  <h2 className="blog-featured-title">
                    {featuredBlog.title}
                  </h2>

                  <p className="blog-featured-excerpt">
                    {featuredBlog.subtitle || featuredBlog.excerpt}
                  </p>

                  {/* Key Takeaways preview pills */}
                  {featuredBlog.keyTakeaways && (
                    <div className="featured-takeaways-preview">
                      {featuredBlog.keyTakeaways.slice(0, 2).map((point, idx) => (
                        <div key={idx} className="takeaway-preview-pill">
                          <CheckCircle2 size={13} color="#dfb743" />
                          <span>{point}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="blog-featured-footer">
                  <div className="blog-author-strip">
                    <img
                      src={featuredBlog.author.avatar}
                      alt={featuredBlog.author.name}
                      className="author-avatar-img"
                    />
                    <div>
                      <div className="author-name">{featuredBlog.author.name}</div>
                      <div className="author-role">{featuredBlog.author.role}</div>
                    </div>
                  </div>

                  <button
                    type="button"
                    className="crestora-btn crestora-btn-gold featured-read-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectBlog && onSelectBlog(featuredBlog);
                    }}
                  >
                    <span>Read Full Analysis</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 3. FILTER CONTROLS & SEARCH BAR */}
      <section className="blog-controls-section">
        <div className="crestora-container">
          <div className="blog-controls-bar">
            {/* Category Filter Pills */}
            <div className="blog-categories-scroll" role="tablist">
              {BLOGS_CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  role="tab"
                  aria-selected={selectedCategory === cat}
                  className={`category-pill-btn ${selectedCategory === cat ? "active" : ""}`}
                  onClick={() => setSelectedCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Instant Search Input */}
            <div className="blog-search-box">
              <Search size={16} className="search-icon" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search topics, DTCP, NRI, Neelambur..."
                className="search-input"
                aria-label="Search articles"
              />
              {searchQuery && (
                <button
                  type="button"
                  className="search-clear-btn"
                  onClick={() => setSearchQuery("")}
                >
                  ×
                </button>
              )}
            </div>
          </div>

          {/* Active Filter Info Counter */}
          <div className="blog-results-counter">
            <span>
              Showing <strong>{filteredBlogs.length}</strong> {filteredBlogs.length === 1 ? "article" : "articles"}
              {selectedCategory !== "All Articles" && ` in ${selectedCategory}`}
              {searchQuery && ` matching "${searchQuery}"`}
            </span>
            {(selectedCategory !== "All Articles" || searchQuery) && (
              <button
                type="button"
                className="clear-all-filters-btn"
                onClick={() => {
                  setSelectedCategory("All Articles");
                  setSearchQuery("");
                }}
              >
                Reset Filters
              </button>
            )}
          </div>
        </div>
      </section>

      {/* 4. ARTICLES CATALOG GRID */}
      <section className="blog-grid-section">
        <div className="crestora-container">
          {filteredBlogs.length === 0 ? (
            <div className="blog-empty-state">
              <BookOpen size={48} color="#c59b27" />
              <h3>No articles found</h3>
              <p>We could not find any insights matching your search criteria. Try searching for different keywords or browse all categories.</p>
              <button
                type="button"
                className="crestora-btn crestora-btn-gold"
                onClick={() => {
                  setSelectedCategory("All Articles");
                  setSearchQuery("");
                }}
              >
                <span>View All Articles</span>
                <ArrowRight size={14} />
              </button>
            </div>
          ) : (
            <div className="blog-cards-grid">
              {filteredBlogs.map((post) => (
                <article
                  key={post.id}
                  className="blog-item-card"
                  onClick={() => onSelectBlog && onSelectBlog(post)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === "Enter" && onSelectBlog && onSelectBlog(post)}
                >
                  {/* Card Thumbnail */}
                  <div className="blog-item-image-holder">
                    <img
                      src={post.image}
                      alt={post.title}
                      loading="lazy"
                      className="blog-item-img"
                    />
                    <span className="blog-category-badge">{post.category}</span>
                  </div>

                  {/* Card Body */}
                  <div className="blog-item-content">
                    <div className="blog-item-meta">
                      <span className="meta-time">
                        <Calendar size={12.5} color="#c59b27" />
                        {post.date}
                      </span>
                      <span className="meta-dot">•</span>
                      <span className="meta-time">
                        <Clock size={12.5} color="#c59b27" />
                        {post.readTime}
                      </span>
                    </div>

                    <h3 className="blog-item-title">{post.title}</h3>

                    <p className="blog-item-excerpt">{post.excerpt}</p>

                    {/* Author & Read Action */}
                    <div className="blog-item-bottom">
                      <div className="blog-mini-author">
                        <img
                          src={post.author.avatar}
                          alt={post.author.name}
                          className="mini-avatar"
                        />
                        <span className="mini-name">{post.author.name}</span>
                      </div>

                      <span className="read-more-link">
                        Read Article <ArrowRight size={14} />
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 5. INTERACTIVE NEWSLETTER / ADVISORY SUBSCRIPTION */}
      <section className="blog-newsletter-section">
        <div className="crestora-container">
          <div className="blog-newsletter-card">
            <div className="newsletter-left">
              <span className="newsletter-pill">{BLOG_NEWSLETTER_DATA.badge}</span>
              <h2 className="newsletter-title">{BLOG_NEWSLETTER_DATA.title}</h2>
              <p className="newsletter-desc">{BLOG_NEWSLETTER_DATA.description}</p>
              <div className="newsletter-social-proof">
                <ShieldCheck size={16} color="#dfb743" />
                <span>{BLOG_NEWSLETTER_DATA.subscriberCount}</span>
              </div>
            </div>

            <div className="newsletter-right">
              {newsletterSubscribed ? (
                <div className="newsletter-success-box">
                  <CheckCircle2 size={32} color="#10b981" />
                  <h4>You're on the Crestora Intelligence list!</h4>
                  <p>Check your inbox shortly for our latest quarterly Coimbatore Land Price Index.</p>
                </div>
              ) : (
                <form onSubmit={handleNewsletterSubmit} className="newsletter-form">
                  <div className="newsletter-input-group">
                    <Mail size={18} className="newsletter-input-icon" />
                    <input
                      type="email"
                      required
                      value={newsletterEmail}
                      onChange={(e) => setNewsletterEmail(e.target.value)}
                      placeholder={BLOG_NEWSLETTER_DATA.placeholder}
                      className="newsletter-input"
                    />
                  </div>
                  <button type="submit" className="crestora-btn crestora-btn-gold newsletter-submit-btn">
                    <span>{BLOG_NEWSLETTER_DATA.buttonText}</span>
                    <ArrowRight size={14} />
                  </button>
                  <span className="newsletter-disclaimer">
                    Zero spam. Unsubscribe anytime with 1-click.
                  </span>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 6. REAL ESTATE ADVISORY CONSULTATION BANNER */}
      <section className="blog-advisory-cta-section">
        <div className="crestora-container">
          <div className="blog-advisory-banner">
            <div className="advisory-text">
              <h5>NEED EXPERT REAL ESTATE GUIDANCE?</h5>
              <h3>Schedule a Private Title &amp; Investment Consultation</h3>
              <p>
                Whether you are evaluating DTCP approvals in Neelambur or planning remote land acquisition from overseas, our senior legal and land development advisors are at your service.
              </p>
            </div>
            <div className="advisory-actions">
              <button
                type="button"
                className="crestora-btn crestora-btn-gold"
                onClick={onBookSiteVisit}
              >
                <span>Book Site Visit &amp; Consultation</span>
                <ArrowRight size={14} />
              </button>
              <button
                type="button"
                className="crestora-btn crestora-btn-outline"
                onClick={() => onNavigate && onNavigate("projects")}
              >
                <span>Explore Approved Developments</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
