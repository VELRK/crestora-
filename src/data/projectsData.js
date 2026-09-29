/**
 * Crestora Properties - Project & Inventory Data
 * DTCP & RERA Approved Developments across Coimbatore & Kongu Region.
 * Pricing in Indian Rupees (INR).
 */

export const CATEGORIES = [
  { id: "all", label: "All Categories", value: "all" },
  { id: "plots", label: "Plots", subtitle: "DTCP & RERA Villa Plots", value: "plots", icon: "LandPlot" },
  { id: "villa", label: "Villas", subtitle: "Luxury Gated Villas", value: "villa", icon: "Home" },
  { id: "farmlands", label: "Farmlands", subtitle: "Hillside & Eco Farmlands", value: "farmlands", icon: "Trees" },
  { id: "commercial", label: "Commercial Lands", subtitle: "Commercial & Retail Frontage", value: "commercial", icon: "Building2" },
  { id: "gated-community", label: "Gated Communities", subtitle: "Master-Planned Enclaves", value: "gated-community", icon: "ShieldCheck" },
];

export const PROPERTY_TYPES = [
  { label: "All Categories", value: "all" },
  { label: "Plots (Residential Villa Plots)", value: "plots" },
  { label: "Villas (Luxury Gated Villas)", value: "villa" },
  { label: "Farmlands (Hillside & Eco Farmlands)", value: "farmlands" },
  { label: "Commercial Lands (Retail & Highway)", value: "commercial" },
  { label: "Gated Communities (Integrated Enclaves)", value: "gated-community" },
];

export const COIMBATORE_LOCALITIES = [
  { id: "all", label: "All Prime Locations", value: "all", city: "all" },
  { id: "kovilpalayam", label: "Kovilpalayam", value: "kovilpalayam", city: "coimbatore" },
  { id: "kurumbapalayam", label: "Kurumbapalayam", value: "kurumbapalayam", city: "coimbatore" },
  { id: "kariyampalayam", label: "Kariyampalayam", value: "kariyampalayam", city: "coimbatore" },
  { id: "kunnathur", label: "Kunnathur", value: "kunnathur", city: "coimbatore" },
  { id: "narasimhanaickenpalayam", label: "Narasimhanaickenpalayam", value: "narasimhanaickenpalayam", city: "coimbatore" },
  { id: "ganeshpuram", label: "Ganeshpuram", value: "ganeshpuram", city: "coimbatore" },
  { id: "ponnegounden-pudur", label: "Ponnegounden pudur", value: "ponnegounden-pudur", city: "coimbatore" },
  { id: "neelambur", label: "Neelambur (Avinashi Bypass)", value: "neelambur", city: "coimbatore" },
  { id: "saravanampatti", label: "Saravanampatti (IT Corridor)", value: "saravanampatti", city: "coimbatore" },
  { id: "avinashi-road", label: "Avinashi Road / Airport", value: "avinashi-road", city: "coimbatore" },
  { id: "kovaipudur", label: "Kovaipudur (Western Foothills)", value: "kovaipudur", city: "coimbatore" },
  { id: "vadavalli", label: "Vadavalli (Marudhamalai)", value: "vadavalli", city: "coimbatore" },
  { id: "peelamedu", label: "Peelamedu", value: "peelamedu", city: "coimbatore" },
  { id: "thudiyalur", label: "Thudiyalur (Mettupalayam Rd)", value: "thudiyalur", city: "coimbatore" },
  { id: "pollachi-road", label: "Pollachi Road (Kinathukadavu)", value: "pollachi-road", city: "coimbatore" },
  { id: "kalapatti", label: "Kalapatti (Tech Zone)", value: "kalapatti", city: "coimbatore" },
  { id: "trichy-road", label: "Trichy Road (Singanallur)", value: "trichy-road", city: "coimbatore" },
];

export const LOCATIONS = COIMBATORE_LOCALITIES;

export const BUDGET_RANGES = [
  { label: "All Budgets", value: "all", min: 0, max: Infinity },
  { label: "Under ₹35 Lakhs", value: "3500000", min: 0, max: 3500000 },
  { label: "₹35L - ₹60 Lakhs", value: "6000000", min: 3500000, max: 6000000 },
  { label: "₹60L - ₹1 Crore", value: "10000000", min: 6000000, max: 10000000 },
  { label: "₹1 Cr - ₹2.5 Crores", value: "25000000", min: 10000000, max: 25000000 },
  { label: "₹2.5 Crores & Above", value: "100000000", min: 25000000, max: Infinity },
];

export const MAX_PRICES = BUDGET_RANGES;

export const BEDS_OPTIONS = [
  { label: "Any Bedrooms", value: "all" },
  { label: "2+ BHK / Plots", value: "2" },
  { label: "3+ BHK / Plots", value: "3" },
  { label: "4+ BHK Luxury", value: "4" },
  { label: "5+ BHK Signature", value: "5" },
];

export const FLOORS_OPTIONS = [
  { label: "Any Structure", value: "all" },
  { label: "Ground Floor / Plot", value: "1" },
  { label: "G + 1 Duplex", value: "2" },
  { label: "G + 2 Triplex", value: "3" },
];

export const GARAGES_OPTIONS = [
  { label: "Any Parking", value: "all" },
  { label: "1 Car Covered", value: "1" },
  { label: "2+ Cars Covered", value: "2" },
];

export const SORT_OPTIONS = [
  { label: "Featured Projects", value: "featured" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
  { label: "Highest Rated", value: "rating" },
];

export const INITIAL_PROJECTS = [];

export const NAV_LINKS = [
  { title: "Home", href: "home" },
  { title: "About Us", href: "about" },
  {
    title: "Projects",
    subItems: [
      { title: "Ongoing Projects", status: "ongoing" },
      { title: "Upcoming Projects", status: "upcoming" },
      { title: "Completed Landmarks", status: "completed" },
    ],
  },
  {
    title: "Categories",
    subItems: [
      { title: "DTCP Villa Plots", category: "plots" },
      { title: "Luxury Gated Villas", category: "villa" },
      { title: "Integrated Communities", category: "gated-community" },
      { title: "Hillside & Farmlands", category: "farmlands" },
      { title: "Commercial Lands", category: "commercial" },
    ],
  },
  {
    title: "Locations",
    subItems: [
      { title: "Neelambur (Avinashi Bypass)", locality: "neelambur" },
      { title: "Saravanampatti (IT Corridor)", locality: "saravanampatti" },
      { title: "Avinashi Road / Airport", locality: "avinashi-road" },
      { title: "Kovaipudur (Western Foothills)", locality: "kovaipudur" },
      { title: "Vadavalli (Marudhamalai)", locality: "vadavalli" },
      { title: "Peelamedu (Airport Corridor)", locality: "peelamedu" },
    ],
  },
  {
    title: "Services",
    subItems: [
      { title: "Crestora Build Companion", href: "services" },
      { title: "Crestora for NRI", href: "nri" },
      { title: "Site Visit Concierge", href: "site-visit" },
    ],
  },
  { title: "Contact", href: "contact" },
];
