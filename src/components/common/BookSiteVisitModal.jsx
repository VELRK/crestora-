import React, { useState, useEffect } from "react";
import { mockupApi } from "../../services/mockupApi";
import { INITIAL_PROJECTS } from "../../data/projectsData";
import { X, Calendar, Clock, MapPin, CheckCircle, Car } from "lucide-react";

export default function BookSiteVisitModal({
  isOpen,
  onClose,
  initialProject = null,
}) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    projectId: "",
    projectName: "",
    preferredDate: "",
    preferredSlot: "Morning (10:00 AM - 1:00 PM)",
    needPickup: false,
    pickupAddress: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingResult, setBookingResult] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");

  // Populate project when modal opens
  useEffect(() => {
    if (initialProject) {
      setFormData((prev) => ({
        ...prev,
        projectId: initialProject.id,
        projectName: initialProject.title,
      }));
    } else if (INITIAL_PROJECTS.length > 0) {
      setFormData((prev) => ({
        ...prev,
        projectId: INITIAL_PROJECTS[0].id,
        projectName: INITIAL_PROJECTS[0].title,
      }));
    }
  }, [initialProject, isOpen]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      setBookingResult(null);
      setErrorMsg("");
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleProjectSelect = (e) => {
    const projId = e.target.value;
    const found = INITIAL_PROJECTS.find((p) => p.id === projId);
    setFormData((prev) => ({
      ...prev,
      projectId: projId,
      projectName: found ? found.title : "",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim()) {
      setErrorMsg("Please enter your name and phone number.");
      return;
    }
    setErrorMsg("");
    setIsSubmitting(true);

    try {
      const res = await mockupApi.bookSiteVisit(formData);
      if (res.success) {
        setBookingResult(res);
      } else {
        setErrorMsg(res.error || "Could not schedule site visit. Please try again.");
      }
    } catch (err) {
      setErrorMsg("Connection error. Please try again or call us directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="modal-header-crestora">
          <div>
            <h3>Book a Guided Site Visit</h3>
            <p style={{ margin: 0, fontSize: "12px", color: "rgba(255,255,255,0.75)" }}>
              Experience Crestora Properties developments in person
            </p>
          </div>
          <button type="button" className="modal-close-btn" onClick={onClose} aria-label="Close modal">
            <X size={22} />
          </button>
        </div>

        {/* Body */}
        <div className="modal-body-crestora">
          {bookingResult ? (
            <div style={{ textAlign: "center", padding: "20px 10px" }}>
              <CheckCircle size={54} color="#274f9a" style={{ margin: "0 auto 16px" }} />
              <h4 style={{ fontSize: "22px", fontWeight: "700", color: "#163057", marginBottom: "8px" }}>
                Site Visit Confirmed!
              </h4>
              <p style={{ fontSize: "14px", color: "#4a5568", marginBottom: "16px" }}>
                Booking Reference: <strong style={{ color: "#c59b27" }}>{bookingResult.bookingId}</strong>
              </p>
              <div style={{ background: "#f8fafc", border: "1px solid #e2e8f0", padding: "16px", borderRadius: "4px", textAlign: "left", marginBottom: "20px", fontSize: "13.5px" }}>
                <p style={{ margin: "0 0 6px" }}><strong>Development:</strong> {formData.projectName}</p>
                <p style={{ margin: "0 0 6px" }}><strong>Client:</strong> {formData.name} ({formData.phone})</p>
                {formData.preferredDate && <p style={{ margin: "0 0 6px" }}><strong>Date:</strong> {formData.preferredDate}</p>}
                <p style={{ margin: 0 }}><strong>Slot:</strong> {formData.preferredSlot}</p>
              </div>
              <p style={{ fontSize: "13px", color: "#718096", marginBottom: "24px" }}>
                Our Coimbatore relationship manager will contact you within 2 business hours to confirm transportation details.
              </p>
              <button
                type="button"
                className="crestora-btn crestora-btn-fill"
                style={{ width: "100%" }}
                onClick={onClose}
              >
                <span className="btn-text">DONE</span>
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              {errorMsg && (
                <div style={{ background: "#fee2e2", border: "1px solid #ef4444", color: "#b91c1c", padding: "10px 14px", borderRadius: "4px", fontSize: "13.5px", marginBottom: "16px" }}>
                  {errorMsg}
                </div>
              )}

              {/* Project Select */}
              <div className="crestora-form-group">
                <label>Select Development</label>
                <select
                  value={formData.projectId}
                  onChange={handleProjectSelect}
                  className="crestora-input"
                  style={{ height: "46px" }}
                >
                  {INITIAL_PROJECTS.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.title} ({p.location})
                    </option>
                  ))}
                </select>
              </div>

              {/* Name & Phone Grid */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
                <div className="crestora-form-group">
                  <label>Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Anand Kumar"
                    className="crestora-input"
                    required
                  />
                </div>
                <div className="crestora-form-group">
                  <label>Phone Number *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 98765 43210"
                    className="crestora-input"
                    required
                  />
                </div>
              </div>

              {/* Email */}
              <div className="crestora-form-group">
                <label>Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="anand@example.com"
                  className="crestora-input"
                />
              </div>

              {/* Date & Time Slot Grid */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
                <div className="crestora-form-group">
                  <label>Preferred Date</label>
                  <input
                    type="date"
                    name="preferredDate"
                    value={formData.preferredDate}
                    onChange={handleChange}
                    min={new Date().toISOString().split("T")[0]}
                    className="crestora-input"
                  />
                </div>
                <div className="crestora-form-group">
                  <label>Time Slot</label>
                  <select
                    name="preferredSlot"
                    value={formData.preferredSlot}
                    onChange={handleChange}
                    className="crestora-input"
                  >
                    <option value="Morning (10:00 AM - 1:00 PM)">Morning (10:00 AM - 1:00 PM)</option>
                    <option value="Afternoon (1:00 PM - 4:00 PM)">Afternoon (1:00 PM - 4:00 PM)</option>
                    <option value="Evening (4:00 PM - 6:30 PM)">Evening (4:00 PM - 6:30 PM)</option>
                  </select>
                </div>
              </div>

              {/* Complimentary Pickup Checkbox */}
              <div style={{ marginBottom: "20px" }}>
                <label style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer", fontSize: "14px", color: "#2d3748" }}>
                  <input
                    type="checkbox"
                    name="needPickup"
                    checked={formData.needPickup}
                    onChange={handleChange}
                    style={{ width: "16px", height: "16px" }}
                  />
                  <span>Request complimentary chauffeured AC pickup & drop from airport/hotel</span>
                </label>
                {formData.needPickup && (
                  <div style={{ marginTop: "10px" }}>
                    <input
                      type="text"
                      name="pickupAddress"
                      value={formData.pickupAddress}
                      onChange={handleChange}
                      placeholder="Enter pickup address or hotel name in Coimbatore"
                      className="crestora-input"
                    />
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="crestora-btn crestora-btn-fill"
                style={{ width: "100%", height: "48px" }}
              >
                <span className="btn-arrow-normal">✓</span>
                <span className="btn-text">
                  {isSubmitting ? "CONFIRMING SCHEDULE..." : "CONFIRM SITE VISIT"}
                </span>
                <span className="btn-arrow-hover">→</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
