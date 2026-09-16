/**
 * Coimbatore Real Estate Mockup API Service
 * Inspired by Adissia Developers (Coimbatore, Tamil Nadu)
 * Simulates REST API endpoints with latency and localStorage persistence.
 */

import { INITIAL_PROJECTS, CATEGORIES, COIMBATORE_LOCALITIES, BUDGET_RANGES } from "../data/projectsData";

const STORAGE_KEY_VISITS = "adissia_site_visits";
const STORAGE_KEY_ENQUIRIES = "adissia_enquiries";

// Format Indian Currency Helper: e.g. 4500000 -> "₹45.0 Lakhs", 12500000 -> "₹1.25 Cr"
export function formatINR(amount) {
  if (amount == null || isNaN(amount)) return "₹0";
  const num = Number(amount);
  if (num >= 10000000) {
    const cr = (num / 10000000).toFixed(2).replace(/\.00$/, "");
    return `₹${cr} Cr`;
  }
  if (num >= 100000) {
    const l = (num / 100000).toFixed(1).replace(/\.0$/, "");
    return `₹${l} Lakhs`;
  }
  return `₹${num.toLocaleString("en-IN")}`;
}

export function formatPerSqft(pricePerSqft) {
  if (!pricePerSqft) return "";
  return `₹${Number(pricePerSqft).toLocaleString("en-IN")} / sq.ft`;
}

class MockupApiService {
  constructor() {
    this.projects = [...INITIAL_PROJECTS];
  }

  // Simulate network delay
  _delay(ms = 250) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  /**
   * Fetch projects with flexible Coimbatore filtering
   */
  async getProjects(filters = {}) {
    await this._delay(200);
    let results = [...this.projects];

    // Status filter: ongoing, upcoming, completed
    if (filters.status && filters.status !== "all") {
      results = results.filter(
        (p) => p.status?.toLowerCase() === filters.status.toLowerCase()
      );
    }

    // Category filter
    if (filters.category && filters.category !== "all") {
      results = results.filter(
        (p) =>
          p.category?.toLowerCase() === filters.category.toLowerCase() ||
          p.type?.toLowerCase() === filters.category.toLowerCase()
      );
    }

    // Locality / City filter
    if (filters.locality && filters.locality !== "all") {
      const target = filters.locality.toLowerCase();
      results = results.filter(
        (p) =>
          p.locality?.toLowerCase() === target ||
          p.city?.toLowerCase() === target ||
          p.location?.toLowerCase().includes(target)
      );
    }

    // Keyword search
    if (filters.keyword && filters.keyword.trim()) {
      const q = filters.keyword.toLowerCase().trim();
      results = results.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.location.toLowerCase().includes(q) ||
          p.locality?.toLowerCase().includes(q) ||
          p.description?.toLowerCase().includes(q)
      );
    }

    // Budget range filter (minPrice, maxPrice in INR)
    if (filters.minPrice != null && filters.minPrice !== "all") {
      results = results.filter((p) => p.price >= Number(filters.minPrice));
    }
    if (filters.maxPrice != null && filters.maxPrice !== "all") {
      results = results.filter((p) => p.price <= Number(filters.maxPrice));
    }

    return {
      success: true,
      total: results.length,
      data: results,
    };
  }

  /**
   * Get single project by ID
   */
  async getProjectById(id) {
    await this._delay(150);
    const project = this.projects.find((p) => p.id === id);
    if (!project) {
      return { success: false, error: "Project not found" };
    }
    return { success: true, data: project };
  }

  /**
   * Get featured projects for homepage
   */
  async getFeaturedProjects() {
    await this._delay(150);
    const featured = this.projects.filter((p) => p.isFeatured || p.isPopular);
    return { success: true, data: featured };
  }

  /**
   * Get categories list
   */
  async getCategories() {
    return { success: true, data: CATEGORIES };
  }

  /**
   * Get Coimbatore localities list
   */
  async getLocalities() {
    return { success: true, data: COIMBATORE_LOCALITIES };
  }

  /**
   * Book a Coimbatore site visit
   */
  async bookSiteVisit(bookingData) {
    await this._delay(400);
    const bookingId = `ADS-CBE-${Math.floor(1000 + Math.random() * 9000)}`;
    const record = {
      id: bookingId,
      ...bookingData,
      createdAt: new Date().toISOString(),
      status: "Confirmed",
    };

    try {
      const existing = JSON.parse(localStorage.getItem(STORAGE_KEY_VISITS) || "[]");
      existing.unshift(record);
      localStorage.setItem(STORAGE_KEY_VISITS, JSON.stringify(existing));
    } catch (e) {
      console.warn("Could not save to localStorage:", e);
    }

    return {
      success: true,
      bookingId,
      message: `Site visit to ${bookingData.projectName || "project"} booked successfully! Our Coimbatore advisor will connect within 2 business hours.`,
      data: record,
    };
  }

  /**
   * Submit property enquiry
   */
  async submitEnquiry(enquiryData) {
    await this._delay(300);
    const enquiryId = `ENQ-${Date.now().toString().slice(-6)}`;
    const record = {
      id: enquiryId,
      ...enquiryData,
      createdAt: new Date().toISOString(),
    };

    try {
      const existing = JSON.parse(localStorage.getItem(STORAGE_KEY_ENQUIRIES) || "[]");
      existing.unshift(record);
      localStorage.setItem(STORAGE_KEY_ENQUIRIES, JSON.stringify(existing));
    } catch (e) {
      console.warn("Could not save to localStorage:", e);
    }

    return {
      success: true,
      enquiryId,
      message: "Thank you for reaching out. We will share the project brochure and price details shortly.",
    };
  }
}

export const mockupApi = new MockupApiService();
export default mockupApi;
