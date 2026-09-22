import React, { useState, useEffect, useRef } from "react";
import { Search, X, MapPin, ArrowRight } from "lucide-react";

export default function SearchModal({
  isOpen,
  onClose,
  projects = [],
  onSelectProject,
}) {
  const [query, setQuery] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
      document.body.style.overflow = "hidden";
      return () => clearTimeout(timer);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleClose = () => {
    setQuery("");
    onClose();
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const filtered = query.trim()
    ? projects.filter(
      (p) =>
        p.title.toLowerCase().includes(query.toLowerCase()) ||
        p.location.toLowerCase().includes(query.toLowerCase()) ||
        p.typeName?.toLowerCase().includes(query.toLowerCase()) ||
        p.locality?.toLowerCase().includes(query.toLowerCase())
    )
    : [];

  const suggestionChips = [
    "Villa Plots",
    "Luxury Villas",
    "Neelambur",
    "Saravanampatti",
    "Avinashi Road",
    "Kovaipudur",
    "Vadavalli",
    "Chennai OMR",
  ];

  if (!isOpen) return null;

  return (
    <div
      className="modal-backdrop search-modal-backdrop"
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="search-modal-box"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            padding: "16px 20px",
            borderBottom: "1px solid #e2e8f0",
            gap: "12px",
          }}
        >
          <Search size={22} color="#163057" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search projects, categories, or localities (e.g. Neelambur, Plots)..."
            style={{
              flex: 1,
              border: "none",
              outline: "none",
              fontSize: "16px",
              color: "#1e293b",
              fontFamily: "inherit",
            }}
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              style={{ background: "none", border: "none", color: "#94a3b8" }}
            >
              Clear
            </button>
          )}
          <button
            type="button"
            onClick={handleClose}
            style={{ background: "none", border: "none", color: "#64748b", padding: "4px" }}
            aria-label="Close search"
          >
            <X size={22} />
          </button>
        </div>

        {/* Suggestion Chips */}
        <div
          style={{
            padding: "14px 20px",
            background: "#f8fafc",
            borderBottom: "1px solid #edf2f7",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            flexWrap: "wrap",
          }}
        >
          <span style={{ fontSize: "12px", fontWeight: "700", textTransform: "uppercase", color: "#64748b" }}>
            Popular:
          </span>
          {suggestionChips.map((chip) => (
            <button
              key={chip}
              type="button"
              onClick={() => setQuery(chip)}
              style={{
                fontSize: "12px",
                background: "#ffffff",
                border: "1px solid #cbd5e1",
                padding: "4px 10px",
                borderRadius: "20px",
                color: "#334155",
                cursor: "pointer",
              }}
            >
              {chip}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div style={{ maxHeight: "380px", overflowY: "auto", padding: "12px 20px" }}>
          {query.trim() === "" ? (
            <div style={{ padding: "30px 10px", textAlign: "center", color: "#94a3b8" }}>
              Type a development name, locality, or property type to search.
            </div>
          ) : filtered.length === 0 ? (
            <div style={{ padding: "30px 10px", textAlign: "center", color: "#64748b" }}>
              No properties found matching "{query}". Try searching by locality like "Neelambur" or "Plots".
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {filtered.map((item) => (
                <div
                  key={item.id}
                  onClick={() => {
                    onSelectProject && onSelectProject(item);
                    handleClose();
                  }}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "12px 14px",
                    borderRadius: "4px",
                    background: "#f8fafc",
                    border: "1px solid #e2e8f0",
                    cursor: "pointer",
                    transition: "all 0.2s",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                    <img
                      src={item.image}
                      alt={item.title}
                      style={{ width: "55px", height: "55px", objectFit: "cover", borderRadius: "4px" }}
                    />
                    <div>
                      <h4 style={{ fontSize: "15px", fontWeight: "700", color: "#163057", margin: "0 0 3px" }}>
                        {item.title}
                      </h4>
                      <p style={{ fontSize: "12.5px", color: "#64748b", margin: 0, display: "flex", alignItems: "center", gap: "4px" }}>
                        <MapPin size={12} color="#274f9a" />
                        {item.location}
                      </p>
                    </div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: "15px", fontWeight: "800", color: "#c59b27" }}>
                      {item.priceDisplay}
                    </div>
                    <span style={{ fontSize: "11px", color: "#274f9a", fontWeight: "600" }}>
                      View Details →
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
