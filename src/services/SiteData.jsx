import React, { createContext, useContext, useEffect, useState } from "react";
import { crestoraApi } from "./api";
import {
  STATS_DATA,
  BUILD_COMPANION_DATA,
  NRI_SERVICES,
  TESTIMONIALS_DATA,
  GOOGLE_REVIEWS_META,
  FAQS_DATA,
  BANK_PARTNERS,
  WHY_COIMBATORE_DATA,
  WHY_CHOOSE_FEATURES,
} from "../data/homeData";
import { MAX_PRICES, SORT_OPTIONS } from "../data/projectsData";
import { BLOG_NEWSLETTER_DATA } from "../data/blogsData";

const STATIC_HOME = {
  aboutStrip: {
    eyebrow: "ABOUT US",
    title: "All About Crestora Properties",
    titleHighlight: "Crestora Properties",
    paragraphs: [
      "Crestora Properties develops DTCP and RERA-approved gated community villa plots and bespoke luxury residences across Coimbatore and Tamil Nadu's fastest growing corridors.",
      "Combining strategic locations, crystal-clear legal titles, and completely transparent documentation, we engineer spaces where families flourish, communities bond, and generational capital appreciation is assured.",
    ],
    features: [
      "100% DTCP & RERA Sanctioned",
      "Instant Patta Transfer & Registry",
      "100% Vasthu Compliant Layouts",
      "Approved by SBI, HDFC & ICICI",
    ],
    badgeValue: "6+ YRS",
    badgeText: "Of Ethical Real Estate Leadership",
  },
  stats: STATS_DATA,
  ticker: [
    { text: "THINK REAL ESTATE", highlight: false },
    { text: "THINK CRESTORA PROPERTIES", highlight: true },
    { text: "DTCP & RERA APPROVED", highlight: false },
    { text: "BUILDING TRUST • CREATING VALUE", highlight: true },
    { text: "PRIME CORRIDORS & CLEAR TITLES", highlight: false },
    { text: "1,500+ LUXURY PLOTS & VILLAS", highlight: true },
    { text: "100% VASTHU COMPLIANT LAYOUTS", highlight: false },
  ],
  whyCoimbatore: WHY_COIMBATORE_DATA,
  testimonials: {
    eyebrow: "HAPPY INVESTORS",
    titleLead: "Client Stories &",
    titleHighlight: "Testimonials",
    intro: "Hear from families and NRI investors who trusted Crestora Properties for secure, DTCP & RERA-approved plotted developments and luxury residences.",
    items: TESTIMONIALS_DATA,
  },
  googleReviews: GOOGLE_REVIEWS_META,
  faqs: {
    eyebrow: "FREQUENTLY ASKED QUESTIONS",
    titleLead: "Answers &",
    titleHighlight: "Advisory",
    intro: "Key insights into DTCP sanctions, TN RERA compliance, bank home loan pre-approvals, and NRI acquisition protocols at Crestora Properties.",
    items: FAQS_DATA,
  },
  partners: {
    eyebrow: "INSTITUTIONAL PRE-APPROVALS",
    titleLead: "Banking & Home Loan Partners",
    intro: "All Crestora Properties projects are pre-sanctioned for hassle-free home and plot loans.",
    items: BANK_PARTNERS,
  },
  whyChoose: { items: WHY_CHOOSE_FEATURES },
  buildCompanion: BUILD_COMPANION_DATA,
  nri: NRI_SERVICES,
  insights: {
    eyebrow: "INSIGHT HUB",
    titleLead: "Market Insights &",
    titleHighlight: "Advisory",
    intro: "Stay informed with expert analysis on Coimbatore infrastructure projects, Avinashi road elevated expressway, DTCP legal procedures, and high-yield real estate investments.",
    buttonText: "Explore All Insights & Blogs",
  },
  featured: {
    eyebrow: "PRESTIGIOUS PROJECTS",
    titleLead: "Featured Prime",
    titleHighlight: "Residences & Plots",
    buttonText: "VIEW ALL PROJECTS",
  },
  landmark: {
    eyebrow: "FEATURED DEVELOPMENTS",
    titleLead: "Discover Landmark",
    titleHighlight: "Properties",
    intro: "Explore Crestora Properties' plotted developments across Coimbatore and Tamil Nadu offering strategic locations, clear DTCP & RERA titles, and master layouts engineered for long-term appreciation.",
  },
};

function listOf(block) {
  if (Array.isArray(block)) return block;
  if (Array.isArray(block?.items)) return block.items;
  return [];
}

function categoryOptions(block, fallback) {
  const items = listOf(block);
  if (!items.length) return Array.isArray(fallback) ? fallback : [];
  return [
    { id: "all", label: "All Categories", value: "all" },
    ...items
      .map((item) => ({
        id: item.id || item.categoryKey || item.value,
        label: item.categoryName || item.label || item.title || "",
        value: item.categoryKey || item.value || "",
        subtitle: item.subtitle || "",
      }))
      .filter((item) => item.value),
  ];
}

function locationOptions(block, fallback) {
  const items = listOf(block);
  const source = items.length
    ? items
    : (Array.isArray(fallback) ? fallback : []);
  return source
    .map((item) => ({
      id: item.id || item.cityKey || item.value,
      label: item.name || item.label || "",
      value: item.cityKey || item.value || "",
    }))
    .filter((item) => item.value && item.value !== "all");
}

const STATUS_ORDER = ["ongoing", "upcoming", "completed"];
const STATUS_LABELS = {
  ongoing: "Ongoing Projects",
  upcoming: "Upcoming Projects",
  completed: "Completed Landmarks",
};

function statusOptions(projects) {
  const found = [];
  (projects || []).forEach((project) => {
    const value = String(project?.status || "").toLowerCase();
    if (!value || found.some((item) => item.value === value)) return;
    found.push({
      value,
      label: STATUS_LABELS[value] || project.statusLabel || value,
    });
  });
  found.sort((a, b) => {
    const ai = STATUS_ORDER.indexOf(a.value);
    const bi = STATUS_ORDER.indexOf(b.value);
    return (ai === -1 ? 99 : ai) - (bi === -1 ? 99 : bi);
  });
  return found;
}

function blogCategories(posts, fromApi) {
  if (Array.isArray(fromApi) && fromApi.length) return fromApi;
  const names = [];
  (posts || []).forEach((post) => {
    if (post?.category && !names.includes(post.category)) names.push(post.category);
  });
  return names.length ? ["All Articles", ...names] : ["All Articles"];
}

const SiteContext = createContext({
  home: STATIC_HOME,
  projects: [],
  about: null,
  blogs: { posts: [], categories: ["All Articles"], newsletter: BLOG_NEWSLETTER_DATA },
  contact: null,
  filters: { categories: [], localities: [], propertyTypes: [], statuses: [], budgets: MAX_PRICES, sortOptions: SORT_OPTIONS },
  settings: null,
  ready: false,
});

export function SiteProvider({ children }) {
  const [state, setState] = useState({
    home: { ...STATIC_HOME, heroSlides: [], categories: null, locations: null },
    projects: [],
    about: null,
    blogs: { posts: [], categories: ["All Articles"], newsletter: BLOG_NEWSLETTER_DATA },
    contact: null,
    filters: { categories: [], localities: [], propertyTypes: [], statuses: [], budgets: MAX_PRICES, sortOptions: SORT_OPTIONS },
    settings: null,
    ready: false,
  });

  useEffect(() => {
    Promise.all([
      crestoraApi.home(),
      crestoraApi.projects(),
      crestoraApi.blogs(),
      crestoraApi.filters(),
      crestoraApi.settings(),
    ])
      .then(([home, projects, blogs, filters, settings]) => {
        const apiHome = home.data || {};
        const apiFilters = filters.data || {};
        const posts = blogs.data?.posts || [];
        const projectList = projects.data || [];
        const categories = categoryOptions(apiHome.categories, apiFilters.categories);
        const localities = locationOptions(apiHome.locations, apiFilters.localities);
        setState({
          home: {
            ...STATIC_HOME,
            heroSlides: Array.isArray(apiHome.heroSlides) ? apiHome.heroSlides : [],
            categories: apiHome.categories || null,
            locations: apiHome.locations || null,
          },
          projects: projectList,
          about: null,
          blogs: {
            posts,
            categories: blogCategories(posts, blogs.data?.categories),
            newsletter: BLOG_NEWSLETTER_DATA,
          },
          contact: null,
          filters: {
            categories,
            localities,
            propertyTypes: categories,
            statuses: statusOptions(projectList),
            budgets: MAX_PRICES,
            sortOptions: SORT_OPTIONS,
          },
          settings: settings.data,
          ready: true,
        });
      })
      .catch((err) => {
        console.warn("Crestora API unavailable", err);
        setState((prev) => ({ ...prev, ready: true }));
      });
  }, []);

  return <SiteContext.Provider value={state}>{children}</SiteContext.Provider>;
}

export function sectionItems(block) {
  if (Array.isArray(block) && block.length) return block;
  if (Array.isArray(block?.items) && block.items.length) return block.items;
  return null;
}

export function useSite() {
  return useContext(SiteContext);
}
