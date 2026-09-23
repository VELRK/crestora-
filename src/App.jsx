import React, { useState, useEffect, useMemo } from "react";
import Preloader from "./components/common/Preloader";
import Header from "./components/common/Header";
import Sidebar from "./components/common/Sidebar";
import SearchModal from "./components/common/SearchModal";
import BookSiteVisitModal from "./components/common/BookSiteVisitModal";
import Footer from "./components/common/Footer";

// Home Page Components (Adissia Classic Luxury Theme)
import HeroBanner from "./components/home/HeroBanner";
import HeroSearchFilter from "./components/home/HeroSearchFilter";
import MarqueeTicker from "./components/home/MarqueeTicker";
import AboutAdissia from "./components/home/AboutUs";
import CategoriesShowcase from "./components/home/CategoriesShowcase";
import LocationsShowcase from "./components/home/LocationsShowcase";
import AdissiaProjectsShowcase from "./components/home/AdissiaProjectsShowcase";
import WhyCoimbatore from "./components/home/WhyCoimbatore";
import BuildCompanion from "./components/home/BuildCompanion";
import HomeFeaturedProperties from "./components/home/HomeFeaturedProperties";
import TestimonialsSection from "./components/home/TestimonialsSection";
import FaqSection from "./components/home/FaqSection";
import LatestBlogs from "./components/home/LatestBlogs";
import PartnersSection from "./components/home/PartnersSection";

// Projects View Components
import Breadcrumb from "./components/projects/Breadcrumb";
import ProjectFilters from "./components/projects/ProjectFilters";
import ProjectGrid from "./components/projects/ProjectGrid";
import ProjectDetailsPage from "./components/projects/ProjectDetailsPage";
import AboutPage from "./components/about/AboutPage";
import BlogListPage from "./components/blogs/BlogListPage";
import BlogDetailsPage from "./components/blogs/BlogDetailsPage";
import ContactPage from "./components/contact/ContactPage";

import { INITIAL_PROJECTS } from "./data/projectsData";
import { BLOGS_DATA } from "./data/blogsData";
import { mockupApi } from "./services/mockupApi";
import logoImg from "./assets/logo.jpeg";
import { MessageCircle, Phone, Building2, Send, Menu as MenuIcon } from "lucide-react";

const ITEMS_PER_PAGE = 6;

const DEFAULT_FILTERS = {
  keyword: "",
  type: "all",
  location: "all",
  maxPrice: "all",
  status: "all",
};

export default function App() {
  const [activePage, setActivePage] = useState("home"); // "home" | "projects"
  const [projects, setProjects] = useState(INITIAL_PROJECTS);
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [sortBy, setSortBy] = useState("featured");
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState("list");

  // Favorites state persisted in localStorage
  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem("crestora_favorites");
      return saved ? new Set(JSON.parse(saved)) : new Set(["p1", "p2"]);
    } catch {
      return new Set(["p1", "p2"]);
    }
  });

  // Modal and drawer UI states
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isBookVisitOpen, setIsBookVisitOpen] = useState(false);
  const [bookVisitProject, setBookVisitProject] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  // Fetch projects from Mockup API on mount
  useEffect(() => {
    async function loadProjects() {
      try {
        const res = await mockupApi.getProjects();
        if (res.success && res.data.length > 0) {
          setProjects(res.data);
        }
      } catch (err) {
        console.warn("Using fallback initial data:", err);
      }
    }
    loadProjects();
  }, []);

  // Sync favorites with localStorage
  useEffect(() => {
    try {
      localStorage.setItem("crestora_favorites", JSON.stringify(Array.from(favorites)));
    } catch (e) {
      console.error("Could not persist favorites:", e);
    }
  }, [favorites]);

  // Toast notification helper
  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Toggle favorite status
  const handleToggleFavorite = (id) => {
    setFavorites((prev) => {
      const updated = new Set(prev);
      if (updated.has(id)) {
        updated.delete(id);
        showToast("Removed from saved favorites");
      } else {
        updated.add(id);
        showToast("Added to your saved Crestora developments!");
      }
      return updated;
    });
  };

  // Synchronize URL hash with page state for back/forward navigation
  useEffect(() => {
    const handleLocationChange = () => {
      const hash = window.location.hash;
      if (hash.startsWith("#project-details")) {
        const query = hash.split("?")[1] || "";
        const params = new URLSearchParams(query);
        const id = params.get("id");
        if (id) {
          const match = projects.find((p) => p.id === id || p.slug === id);
          if (match) {
            setSelectedProject(match);
            setActivePage("project-details");
            return;
          }
        }
      } else if (hash.startsWith("#blog-details")) {
        const query = hash.split("?")[1] || "";
        const params = new URLSearchParams(query);
        const id = params.get("id");
        if (id) {
          const match = BLOGS_DATA.find((b) => b.id === id || b.slug === id);
          if (match) {
            setSelectedBlog(match);
            setActivePage("blog-details");
            return;
          }
        }
      } else if (hash.startsWith("#blogs")) {
        setActivePage("blogs");
        return;
      } else if (hash.startsWith("#projects")) {
        setActivePage("projects");
        return;
      } else if (hash.startsWith("#contact-us") || hash.startsWith("#contact")) {
        setActivePage("contact");
        return;
      } else if (hash.startsWith("#about")) {
        setActivePage("about");
        return;
      } else if (hash.startsWith("#locations")) {
        setActivePage("home");
        setTimeout(() => {
          document.getElementById("locations-section")?.scrollIntoView({ behavior: "smooth" });
        }, 150);
        return;
      } else if (hash.startsWith("#home")) {
        setActivePage("home");
        return;
      }
    };

    handleLocationChange();
    window.addEventListener("popstate", handleLocationChange);
    window.addEventListener("hashchange", handleLocationChange);
    return () => {
      window.removeEventListener("popstate", handleLocationChange);
      window.removeEventListener("hashchange", handleLocationChange);
    };
  }, [projects]);

  // Project selection helper (Navigates to dedicated Project Details page)
  const handleSelectProject = (project) => {
    if (!project) return;
    setSelectedProject(project);
    setActivePage("project-details");
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (project.id) {
      window.history.pushState(
        { page: "project-details", id: project.id },
        "",
        `#project-details?id=${project.id}`
      );
    }
  };

  // Blog post selection helper (Navigates to dedicated Blog Details page)
  const handleSelectBlog = (blog) => {
    if (!blog) return;
    setSelectedBlog(blog);
    setActivePage("blog-details");
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (blog.id) {
      window.history.pushState(
        { page: "blog-details", id: blog.id },
        "",
        `#blog-details?id=${blog.id}`
      );
    }
  };

  // Open site visit modal
  const handleOpenBookVisit = (project = null) => {
    setBookVisitProject(project);
    setIsBookVisitOpen(true);
  };

  // Navigation helper
  const handleNavigate = (page, filterUpdates = null) => {
    setActivePage(page);
    if (filterUpdates) {
      setFilters((prev) => ({ ...prev, ...filterUpdates }));
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (page === "projects") {
      window.history.pushState({ page: "projects" }, "", "#projects");
    } else if (page === "about") {
      window.history.pushState({ page: "about" }, "", "#about");
    } else if (page === "blogs") {
      window.history.pushState({ page: "blogs" }, "", "#blogs");
    } else if (page === "contact") {
      window.history.pushState({ page: "contact" }, "", "#contact");
    } else if (page === "home") {
      window.history.pushState({ page: "home" }, "", "#home");
    }
  };

  // Hero search filter submission
  const handleHeroSearch = (params) => {
    const filterUpdates = {};
    if (params.location && params.location !== "all") filterUpdates.location = params.location;
    if (params.type && params.type !== "all") filterUpdates.type = params.type;
    if (params.maxPrice && params.maxPrice !== "all") filterUpdates.maxPrice = params.maxPrice;
    if (params.status && params.status !== "all") filterUpdates.status = params.status;

    handleNavigate("projects", filterUpdates);
  };

  // 1-Click Category Filter
  const handleSelectCategory = (categoryKey) => {
    handleNavigate("projects", { type: categoryKey });
  };

  // 1-Click Location Filter
  const handleSelectLocation = (locationKey) => {
    handleNavigate("projects", { location: locationKey });
  };

  // Filter change handler
  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  // Reset filters
  const handleResetFilters = () => {
    setFilters(DEFAULT_FILTERS);
    setCurrentPage(1);
  };

  // Filter and sort computation
  const filteredAndSortedProjects = useMemo(() => {
    let result = [...projects];

    // Keyword filter
    if (filters.keyword && filters.keyword.trim()) {
      const q = filters.keyword.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.location.toLowerCase().includes(q) ||
          p.locality?.toLowerCase().includes(q) ||
          p.description?.toLowerCase().includes(q) ||
          p.typeName?.toLowerCase().includes(q)
      );
    }

    // Property Type / Category
    if (filters.type && filters.type !== "all") {
      result = result.filter(
        (p) => p.type === filters.type || p.category === filters.type
      );
    }

    // Location / Locality
    if (filters.location && filters.location !== "all") {
      result = result.filter(
        (p) => p.locality === filters.location || p.city === filters.location
      );
    }

    // Status (ongoing, upcoming, completed)
    if (filters.status && filters.status !== "all") {
      result = result.filter((p) => p.status === filters.status);
    }

    // Max Price (INR)
    if (filters.maxPrice && filters.maxPrice !== "all") {
      const max = Number(filters.maxPrice);
      if (!isNaN(max)) {
        result = result.filter((p) => p.price <= max);
      }
    }

    // Sort order
    if (sortBy === "price-asc") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-desc") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === "rating") {
      result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    }

    return result;
  }, [projects, filters, sortBy]);

  // Pagination slice
  const totalPages = Math.max(
    1,
    Math.ceil(filteredAndSortedProjects.length / ITEMS_PER_PAGE)
  );
  const displayedProjects = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredAndSortedProjects.slice(
      startIndex,
      startIndex + ITEMS_PER_PAGE
    );
  }, [filteredAndSortedProjects, currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 350, behavior: "smooth" });
  };

  return (
    <div className="crestora-app">
      {/* 1. Preloader */}
      <Preloader />

      {/* 2. Classic Sticky Header */}
      <Header
        activePage={activePage}
        filters={filters}
        onNavigate={handleNavigate}
        onOpenSidebar={() => setIsSidebarOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenBookVisit={() => handleOpenBookVisit()}
        favoritesCount={favorites.size}
      />

      {/* 3. Mobile Slide-out Menu Drawer */}
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        activePage={activePage}
        filters={filters}
        onNavigate={handleNavigate}
      />

      {/* 4. Fullscreen Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        projects={projects}
        onSelectProject={handleSelectProject}
      />

      {/* 5. Book Site Visit Modal */}
      <BookSiteVisitModal
        isOpen={isBookVisitOpen}
        onClose={() => setIsBookVisitOpen(false)}
        initialProject={bookVisitProject}
      />

      {/* 6. Main Content Views */}
      <main>
        {activePage === "home" ? (
          /* ==================== HOME PAGE VIEW ==================== */
          <div className="home-view-wrapper">
            {/* 1. Fullscreen Hero Slider with Left Indicator */}
            <HeroBanner
              onNavigateToProjects={() => handleNavigate("projects")}
              onBookSiteVisit={(slide) => handleOpenBookVisit(slide)}
            />

            {/* 2. Floating Search & Filter Bar */}
            {/* <HeroSearchFilter onSearch={handleHeroSearch} /> */}
            {/* 5. Explore by Property Category (User Requested) */}
            <CategoriesShowcase onSelectCategory={handleSelectCategory} />

            {/* 5b. Explore Prime Locations (User Requested) */}
            <LocationsShowcase onSelectLocation={handleSelectLocation} />


            {/* 4. All About Crestora Properties & 5-Column Stats */}
            <AboutAdissia
              onExplore={() => handleNavigate("projects")}
              onBookSiteVisit={() => handleOpenBookVisit()}
              onReadMore={() => handleNavigate("about")}
            />



            {/* 6. Flagship Landmark Projects Showcase (Adissia Signature Layout) */}
            <AdissiaProjectsShowcase
              projects={projects}
              onSelectProject={handleSelectProject}
              onBookSiteVisit={(project) => handleOpenBookVisit(project)}
              onExploreAll={() => handleNavigate("projects")}
            />
            {/* 3. Smooth Infinite Marquee Ticker */}
            <MarqueeTicker />
            {/* 7. City & Location Spotlight (Why Coimbatore 3-Col Layout) */}
            <WhyCoimbatore
              onExploreProjects={() => handleNavigate("projects")}
              onSelectLocation={handleSelectLocation}
            />


            {/* 9. Featured Residences & Plots Grid */}
            <HomeFeaturedProperties
              featuredProjects={projects.filter((p) => p.isPopular || p.isFeatured)}
              favorites={favorites}
              onToggleFavorite={handleToggleFavorite}
              onSelectProject={handleSelectProject}
              onBookSiteVisit={(project) => handleOpenBookVisit(project)}
              onViewAll={() => handleNavigate("projects")}
            />

            {/* 10. Google Reviews & Testimonials Carousel */}
            <TestimonialsSection />

            {/* 11. Frequently Asked Questions */}
            <FaqSection />

            {/* 12. Market Insights & Blog */}
            <LatestBlogs
              onSelectBlog={handleSelectBlog}
              onNavigate={handleNavigate}
            />

            {/* 13. Banking Pre-Approval Partners */}
            <PartnersSection />
          </div>
        ) : activePage === "about" ? (
          /* ==================== SEPARATE ABOUT US PAGE VIEW ==================== */
          <AboutPage
            onNavigate={handleNavigate}
            onBookSiteVisit={() => handleOpenBookVisit()}
          />
        ) : activePage === "blogs" ? (
          /* ==================== DEDICATED BLOG LIST VIEW ==================== */
          <BlogListPage
            onSelectBlog={handleSelectBlog}
            onNavigate={handleNavigate}
            onBookSiteVisit={() => handleOpenBookVisit()}
            showToast={showToast}
          />
        ) : activePage === "blog-details" ? (
          /* ==================== DEDICATED BLOG DETAILS VIEW ==================== */
          <BlogDetailsPage
            post={selectedBlog || BLOGS_DATA[0]}
            allPosts={BLOGS_DATA}
            onBackToBlogs={() => handleNavigate("blogs")}
            onSelectBlog={handleSelectBlog}
            onSelectProject={handleSelectProject}
            allProjects={projects}
            onBookSiteVisit={() => handleOpenBookVisit()}
            showToast={showToast}
          />
        ) : activePage === "contact" ? (
          /* ==================== SEPARATE CONTACT US PAGE VIEW ==================== */
          <ContactPage
            onNavigate={handleNavigate}
            onBookSiteVisit={() => handleOpenBookVisit()}
            showToast={showToast}
          />
        ) : activePage === "project-details" ? (
          /* ==================== SEPARATE PROJECT DETAILS VIEW ==================== */
          <ProjectDetailsPage
            project={selectedProject || projects[0]}
            allProjects={projects}
            favorites={favorites}
            onToggleFavorite={handleToggleFavorite}
            onBookSiteVisit={(project) => handleOpenBookVisit(project)}
            onBackToProjects={() => handleNavigate("projects")}
            onSelectProject={handleSelectProject}
            showToast={showToast}
          />
        ) : (
          /* ==================== PROJECTS / DEVELOPMENTS PAGE VIEW ==================== */
          <div className="projects-view-wrapper">
            {/* Breadcrumb Banner */}
            <Breadcrumb
              title="All Developments"
              pageName="Coimbatore"
              onHomeClick={() => handleNavigate("home")}
            />

            {/* Projects Content Area */}
            <div style={{ background: "#f8fafc", padding: "60px 0 90px" }}>
              <div className="crestora-container">
                {/* Search & Filter Controls */}
                <ProjectFilters
                  filters={filters}
                  onFilterChange={handleFilterChange}
                  onResetFilters={handleResetFilters}
                  totalCount={projects.length}
                  filteredCount={filteredAndSortedProjects.length}
                  sortBy={sortBy}
                  onSortChange={setSortBy}
                  viewMode={viewMode}
                  onViewModeChange={setViewMode}
                />

                {/* Projects Grid with Pagination */}
                <ProjectGrid
                  projects={displayedProjects}
                  favorites={favorites}
                  onToggleFavorite={handleToggleFavorite}
                  onSelectProject={handleSelectProject}
                  onBookSiteVisit={(project) => handleOpenBookVisit(project)}
                  onResetFilters={handleResetFilters}
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                  viewMode={viewMode}
                />
              </div>
            </div>
          </div>
        )}
      </main>

      {/* 7. Classic Deep Royal Navy Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* 9. Floating Side Action Rail */}
      {activePage !== "project-details" && (
        <div className="side-action-rail" aria-label="Quick Actions">
          <button
            type="button"
            className="side-action-btn fill"
            onClick={() => handleNavigate("projects")}
          >
            EXPLORE PROJECTS
          </button>
          <button
            type="button"
            className="side-action-btn outline"
            onClick={() => handleOpenBookVisit()}
          >
            BOOK SITE VISIT
          </button>
        </div>
      )}

      {/* 10. WhatsApp Floating Chat FAB */}
      {activePage !== "project-details" && (
        <a
          href="https://wa.me/919159066666?text=Hi%20Crestora%20Properties,%20I%20am%20interested%20in%20your%20villa%20plots."
          target="_blank"
          rel="noopener noreferrer"
          className="whatsapp-fab"
          title="Chat on WhatsApp"
          aria-label="Chat on WhatsApp"
        >
          <MessageCircle size={28} />
        </a>
      )}

      {/* 11. Mobile Bottom Action Bar */}
      {activePage !== "project-details" && (
        <nav className="mobile-bottom-bar" aria-label="Mobile Bottom Bar">
          <button
            type="button"
            className="mbb-item"
            onClick={() => handleOpenBookVisit()}
          >
            <Send size={18} />
            <span>Enquiry</span>
          </button>
          <a href="tel:+919159066666" className="mbb-item">
            <Phone size={18} />
            <span>Call Us</span>
          </a>
          <button
            type="button"
            className="mbb-item"
            onClick={() => handleNavigate("home")}
          >
            <div className="mbb-center-circle">
              <img src={logoImg} alt="Crestora" />
            </div>
          </button>
          <button
            type="button"
            className={`mbb-item ${activePage === "projects" ? "active" : ""}`}
            onClick={() => handleNavigate("projects")}
          >
            <Building2 size={18} />
            <span>Projects</span>
          </button>
          <button
            type="button"
            className="mbb-item"
            onClick={() => setIsSidebarOpen(true)}
          >
            <MenuIcon size={18} />
            <span>Menu</span>
          </button>
        </nav>
      )}

      {/* 12. Toast Feedback Notification */}
      {toastMessage && (
        <div className="toast-notification" role="status" aria-live="polite">
          <span style={{ color: "#dfb743", fontSize: "16px" }}>★</span>
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
