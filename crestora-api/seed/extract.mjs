import fs from "fs";
import vm from "vm";
import path from "path";

const root = "c:/xampp/htdocs/crestora-properties/src/data";

function load(file, extra = "") {
  let src = fs.readFileSync(path.join(root, file), "utf8");
  src = src.replace(/import\s+banner1\s+from\s+['"][^'"]+['"];?/g, 'const banner1 = "http://localhost/crestora-api/uploads/banner-1.png";');
  src = src.replace(/import\s+banner2\s+from\s+['"][^'"]+['"];?/g, 'const banner2 = "http://localhost/crestora-api/uploads/banner-2.png";');
  src = src.replace(/import\s+banner3\s+from\s+['"][^'"]+['"];?/g, 'const banner3 = "http://localhost/crestora-api/uploads/banner-3.png";');
  src = src.replace(/import\s+\{[^}]+\}\s+from\s+['"][^'"]+['"];?/g, "");
  src = src.replace(/const BLOGS_DATA = IMPORTED_BLOGS;/, "const BLOGS_DATA = [];");
  src = src.replace(/export\s+const\s+/g, "const ");
  src = src.replace(/export\s+\{[^}]+\};?/g, "");
  const sandbox = { console };
  vm.createContext(sandbox);
  vm.runInContext(src + "\n" + extra, sandbox, { filename: file });
  return sandbox;
}

const home = load("homeData.js", `
this.out = {
  heroSlides: HERO_SLIDES,
  stats: STATS_DATA,
  categories: CATEGORIES_DATA,
  locations: POPULAR_CITIES,
  whyCoimbatore: CITY_SPOTLIGHT.coimbatore,
  buildCompanion: BUILD_COMPANION_DATA,
  nri: NRI_SERVICES,
  testimonials: TESTIMONIALS_DATA,
  googleReviews: GOOGLE_REVIEWS_META,
  faqs: FAQS_DATA,
  partners: BANK_PARTNERS,
  whyChoose: WHY_CHOOSE_FEATURES
};
`);

const projects = load("projectsData.js", `
this.out = {
  categories: CATEGORIES,
  propertyTypes: PROPERTY_TYPES,
  localities: COIMBATORE_LOCALITIES,
  budgets: BUDGET_RANGES.map(b => ({ label: b.label, value: b.value })),
  sortOptions: SORT_OPTIONS,
  beds: BEDS_OPTIONS,
  floors: FLOORS_OPTIONS,
  garages: GARAGES_OPTIONS,
  navLinks: NAV_LINKS,
  projects: INITIAL_PROJECTS
};
`);

const about = load("aboutData.js", `
this.out = {
  milestones: ABOUT_MILESTONES,
  pillars: CORE_PILLARS,
  leadership: LEADERSHIP_TEAM,
  philosophy: PHILOSOPHY_CARDS,
  accreditations: ACCREDITATIONS
};
`);

const blogs = load("blogsData.js", `
this.out = {
  categories: BLOGS_CATEGORIES,
  posts: BLOGS_DATA,
  newsletter: BLOG_NEWSLETTER_DATA
};
`);

const data = {
  home: home.out,
  projects: projects.out,
  about: about.out,
  blogs: blogs.out,
  settings: {
    site_name: "Crestora Properties",
    phone: "+91 91590 66666",
    phone_tel: "+919159066666",
    email: "info@crestoraproperties.com",
    whatsapp: "https://wa.me/919159066666?text=Hi%20Crestora%20Properties,%20I%20am%20interested%20in%20your%20villa%20plots.",
    address: "Crestora Properties, Coimbatore, Tamil Nadu",
    footer_about: "Crestora Properties develops DTCP and RERA-approved plotted communities and luxury residences across Coimbatore, combining strategic growth locations, crystal-clear titles, and transparent processes.",
    instagram: "https://instagram.com",
    linkedin: "https://linkedin.com",
    facebook: "https://facebook.com",
    youtube: "https://youtube.com",
    logo: "http://localhost/crestora-api/uploads/logo.jpeg"
  },
  ticker: [
    { text: "THINK REAL ESTATE", highlight: false },
    { text: "THINK CRESTORA PROPERTIES", highlight: true },
    { text: "DTCP & RERA APPROVED", highlight: false },
    { text: "BUILDING TRUST • CREATING VALUE", highlight: true },
    { text: "PRIME CORRIDORS & CLEAR TITLES", highlight: false },
    { text: "1,500+ LUXURY PLOTS & VILLAS", highlight: true },
    { text: "100% VASTHU COMPLIANT LAYOUTS", highlight: false }
  ],
  aboutStrip: {
    eyebrow: "ABOUT US",
    title: "All About Crestora Properties",
    paragraphs: [
      "Crestora Properties develops DTCP and RERA-approved gated community villa plots and bespoke luxury residences across Coimbatore and Tamil Nadu's fastest growing corridors.",
      "Combining strategic locations, crystal-clear legal titles, and completely transparent documentation, we engineer spaces where families flourish, communities bond, and generational capital appreciation is assured."
    ],
    features: [
      "100% DTCP & RERA Sanctioned",
      "Instant Patta Transfer & Registry",
      "100% Vasthu Compliant Layouts",
      "Approved by SBI, HDFC & ICICI"
    ],
    badgeValue: "6+ YRS",
    badgeText: "Of Ethical Real Estate Leadership",
    image: "http://localhost/crestora-api/uploads/about.png"
  },
  contact: {
    eyebrow: "CONTACT US",
    title: "Talk to Crestora Properties",
    intro: "Share your requirement and our Coimbatore advisory team will call you with project details, price sheets, and a site-visit slot.",
    phone: "+91 91590 66666",
    email: "info@crestoraproperties.com",
    address: "Crestora Properties, Coimbatore, Tamil Nadu"
  }
};

fs.writeFileSync(path.join("c:/xampp/htdocs/crestora-api/seed", "content.json"), JSON.stringify(data));
console.log("projects", data.projects.projects.length, "blogs", data.blogs.posts.length);
