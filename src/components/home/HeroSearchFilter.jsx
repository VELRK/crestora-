import React, { useState } from "react";
import { useSite } from "../../services/SiteData.jsx";

export default function HeroSearchFilter({ onSearch }) {
  const site = useSite();
  const propertyTypes = site.filters?.propertyTypes || [];
  const locations = site.filters?.localities || [];
  const maxPrices = site.filters?.budgets || [];
  const statuses = site.filters?.statuses || [];
  const [searchParams, setSearchParams] = useState({
    location: "all",
    type: "all",
    maxPrice: "all",
    status: "all",
  });

  const handleChange = (field, val) => {
    setSearchParams((prev) => ({ ...prev, [field]: val }));
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    onSearch && onSearch(searchParams);
  };

  return (
    <div className="hero-search-wrapper">
      <div className="crestora-container">
        <form className="search-filter-card" onSubmit={handleSearchSubmit}>
          {/* Location Field */}
          <div className="filter-input-group">
            <label>Prime Location</label>
            <select
              value={searchParams.location}
              onChange={(e) => handleChange("location", e.target.value)}
              className="filter-select"
            >
              <option value="all">All Locations in Coimbatore</option>
              {locations.filter((l) => l.value !== "all").map((loc) => (
                <option key={loc.id} value={loc.value}>
                  {loc.label}
                </option>
              ))}
            </select>
          </div>

          {/* Property Category Field */}
          <div className="filter-input-group">
            <label>Property Category</label>
            <select
              value={searchParams.type}
              onChange={(e) => handleChange("type", e.target.value)}
              className="filter-select"
            >
              {propertyTypes.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>

          {/* Budget Range Field */}
          <div className="filter-input-group">
            <label>Budget Range (INR)</label>
            <select
              value={searchParams.maxPrice}
              onChange={(e) => handleChange("maxPrice", e.target.value)}
              className="filter-select"
            >
              {maxPrices.map((price) => (
                <option key={price.label} value={price.value}>
                  {price.label}
                </option>
              ))}
            </select>
          </div>

          {/* Development Status */}
          <div className="filter-input-group">
            <label>Project Status</label>
            <select
              value={searchParams.status}
              onChange={(e) => handleChange("status", e.target.value)}
              className="filter-select"
            >
              <option value="all">All Stages</option>
              {statuses.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
          </div>

          {/* Search Button */}
          <button
            type="submit"
            className="crestora-btn crestora-btn-fill"
            style={{ height: "48px", minWidth: "160px" }}
          >
            <span className="btn-arrow-normal">→</span>
            <span className="btn-text">SEARCH</span>
            <span className="btn-arrow-hover">→</span>
          </button>
        </form>
      </div>
    </div>
  );
}
