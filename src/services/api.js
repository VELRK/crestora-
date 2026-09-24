const API = import.meta.env.PROD
  ? "https://crestoraproperties.in/crestora-api/api"
  : "http://localhost:8080/crestora-properties/crestora-api/api";

async function get(path) {
  const res = await fetch(`${API}${path}`);
  if (!res.ok) throw new Error(path);
  return res.json();
}

export const crestoraApi = {
  home: () => get("/home"),
  projects: () => get("/projects"),
  project: (id) => get(`/projects/${id}`),
  similarProjects: (id) => get(`/projects/${encodeURIComponent(id)}/similar`),
  about: () => get("/about"),
  blogs: () => get("/blogs"),
  blog: (id) => get(`/blogs/${id}`),
  contact: () => get("/contact"),
  filters: () => get("/filters"),
  settings: () => get("/settings"),
  submitEnquiry: (body) =>
    fetch(`${API}/enquiries`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    }).then((r) => r.json()),
  bookSiteVisit: (body) =>
    fetch(`${API}/site-visits`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    }).then((r) => r.json()),
};

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
