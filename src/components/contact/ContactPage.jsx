import React, { useState, useEffect } from "react";
import { crestoraApi } from "../../services/api";
import { useSite } from "../../services/SiteData.jsx";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  User,
  MessageSquare,
  CheckCircle2,
  Home,
  ChevronRight,
  ExternalLink,
  PhoneCall,
} from "lucide-react";

export default function ContactPage({ onNavigate, showToast }) {
  const site = useSite();
  const page = site.contact?.page || {};
  const settings = site.settings || {};
  const phone = page.phone || settings.phone || "+91 91590 66666";
  const phoneTel = page.phoneTel || settings.phone_tel || "+919159066666";
  const email = page.email || settings.email || "info@crestoraproperties.com";
  const address = page.address || settings.corporate_office || "3rd Floor, Harita Center, Avinashi Road, Opposite to GKNM Hospital, Coimbatore - 641 037";
  const hours = page.hours || settings.hours || "Monday – Sunday, 9:00 AM – 7:30 PM";
  const whatsapp = page.whatsapp || settings.whatsapp || "https://wa.me/919159066666?text=Hi%20Crestora%20Properties,%20I%20would%20like%20to%20know%20more%20about%20your%20projects.";
  const whatsappLabel = page.whatsappLabel || `Chat on WhatsApp (${phone})`;
  const mapUrl = page.mapUrl || "https://maps.google.com/?q=GKNM+Hospital+Avinashi+Road+Coimbatore";
  const mapEmbed = page.mapEmbed || "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3916.353368297072!2d76.9822452!3d11.0120893!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba859b867c2d829%3A0x7d6f51f49615a13c!2sGKNM%20Hospital%2C%20Avinashi%20Rd%2C%20Pappanaickenpalayam%2C%20Coimbatore%2C%20Tamil%20Nadu%20641037!5e0!3m2!1sen!2sin!4v1711111111111!5m2!1sen!2sin";
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    subject: "General Inquiry",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      showToast && showToast("Please enter your name");
      return;
    }
    if (!formData.phone.trim() || formData.phone.trim().length < 8) {
      showToast && showToast("Please enter a valid phone number");
      return;
    }
    if (!formData.email.trim() || !formData.email.includes("@")) {
      showToast && showToast("Please enter a valid email address");
      return;
    }

    setIsSubmitting(true);
    crestoraApi
      .submitEnquiry({
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        message: `${formData.subject || ""} ${formData.message || ""}`.trim(),
        source: "contact",
      })
      .then(() => {
        setIsSubmitting(false);
        setIsSubmitted(true);
        showToast && showToast("Thank you! Your message has been sent successfully.");
      })
      .catch(() => {
        setIsSubmitting(false);
        showToast && showToast("Could not send your message. Please try again.");
      });
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setFormData({
      name: "",
      phone: "",
      email: "",
      subject: "General Inquiry",
      message: "",
    });
  };

  return (
    <div className="simple-contact-page">
      {/* Elegant Header Banner */}
      <section className="simple-contact-hero">
        <div className="crestora-container">
          <nav className="simple-contact-breadcrumb" aria-label="Breadcrumb">
            <button
              type="button"
              className="sc-bread-btn"
              onClick={() => onNavigate && onNavigate("home")}
            >
              <Home size={13} />
              <span>HOME</span>
            </button>
            <ChevronRight size={12} className="sc-bread-sep" />
            <span className="sc-bread-current">CONTACT US</span>
          </nav>

          <div className="sc-hero-badge">{page.heroBadge || "CRESTORA PROPERTIES"}</div>
          <h1 className="sc-hero-title">
            {page.heroTitle && page.heroTitle !== "Get in Touch" ? (
              page.heroTitle
            ) : (
              <>
                Get in <span className="gold-foil-shimmer">Touch</span>
              </>
            )}
          </h1>
          <p className="sc-hero-sub">
            {page.heroSubtitle || "We would love to hear from you. Speak directly with our team or send us a message below."}
          </p>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="simple-contact-body">
        <div className="crestora-container">
          <div className="simple-contact-grid">
            {/* Left: Contact Info & Direct Channels */}
            <div className="simple-contact-info-card">
              <div className="sc-info-header">
                <h2 className="sc-info-heading">{page.infoHeading || "Contact Information"}</h2>
                <p className="sc-info-lead">
                  {page.infoLead || "Reach out to us directly for enquiries about DTCP & RERA villa plots and residences across Coimbatore."}
                </p>
              </div>

              <div className="sc-info-items">
                {/* Phone */}
                <div className="sc-info-row">
                  <div className="sc-icon-circle">
                    <PhoneCall size={20} />
                  </div>
                  <div className="sc-info-content">
                    <span className="sc-label">Call Us Directly</span>
                    <a href={`tel:${phoneTel}`} className="sc-link-primary">
                      {phone}
                    </a>
                    <div className="sc-sub-note">{hours}</div>
                  </div>
                </div>

                {/* WhatsApp Action */}
                <div className="sc-info-row">
                  <div className="sc-icon-circle green">
                    <MessageSquare size={20} />
                  </div>
                  <div className="sc-info-content">
                    <span className="sc-label">WhatsApp Chat</span>
                    <a
                      href={whatsapp}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="sc-link-whatsapp"
                    >
                      {whatsappLabel} →
                    </a>
                    <div className="sc-sub-note">Instant assistance on mobile</div>
                  </div>
                </div>

                {/* Email */}
                <div className="sc-info-row">
                  <div className="sc-icon-circle">
                    <Mail size={20} />
                  </div>
                  <div className="sc-info-content">
                    <span className="sc-label">Email Us</span>
                    <a href={`mailto:${email}`} className="sc-link-primary">
                      {email}
                    </a>
                    <div className="sc-sub-note">We typically reply within a few hours</div>
                  </div>
                </div>

                {/* Address */}
                <div className="sc-info-row">
                  <div className="sc-icon-circle">
                    <MapPin size={20} />
                  </div>
                  <div className="sc-info-content">
                    <span className="sc-label">Office Address</span>
                    <div className="sc-text-main">
                      {address}
                    </div>
                    <a
                      href={mapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="sc-link-map"
                    >
                      <ExternalLink size={12} />
                      <span>View on Google Maps</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* Simple Map Embed */}
              <div className="sc-map-frame">
                <iframe
                  title="Crestora Properties Location"
                  src={mapEmbed}
                  width="100%"
                  height="170"
                  style={{ border: 0, display: "block" }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>

            {/* Right: Simple, Elegant Message Form */}
            <div className="simple-contact-form-card">
              {isSubmitted ? (
                <div className="sc-success-box">
                  <div className="sc-success-icon-wrap">
                    <CheckCircle2 size={48} className="sc-success-icon" />
                  </div>
                  <h3 className="sc-success-title">Message Sent!</h3>
                  <p className="sc-success-text">
                    Thank you for reaching out, <strong>{formData.name}</strong>. Our team will contact you shortly on <strong>{formData.phone}</strong>.
                  </p>
                  <div className="sc-success-actions">
                    <a
                      href={`https://wa.me/${String(phoneTel).replace(/\D/g, "")}?text=Hi%20Crestora,%20I%20have%20sent%20a%20message%20regarding%20${encodeURIComponent(formData.subject)}.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="crestora-btn crestora-btn-fill"
                      style={{ width: "100%", justifyContent: "center" }}
                    >
                      <MessageSquare size={15} />
                      <span>Continue on WhatsApp</span>
                    </a>
                    <button
                      type="button"
                      className="crestora-btn crestora-btn-outline"
                      onClick={handleReset}
                      style={{ width: "100%", justifyContent: "center" }}
                    >
                      <span>Send Another Message</span>
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="sc-form">
                  <div className="sc-form-header">
                    <h3 className="sc-form-title">Send a Message</h3>
                    <p className="sc-form-sub">
                      Fill out the form below and we will get back to you promptly.
                    </p>
                  </div>

                  <div className="sc-form-group">
                    <label className="sc-form-label" htmlFor="sc-name">
                      Your Name <span className="sc-req">*</span>
                    </label>
                    <input
                      type="text"
                      id="sc-name"
                      name="name"
                      className="sc-form-input"
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="sc-form-row">
                    <div className="sc-form-group">
                      <label className="sc-form-label" htmlFor="sc-phone">
                        Phone Number <span className="sc-req">*</span>
                      </label>
                      <input
                        type="tel"
                        id="sc-phone"
                        name="phone"
                        className="sc-form-input"
                        placeholder="e.g. 91590 66666"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="sc-form-group">
                      <label className="sc-form-label" htmlFor="sc-email">
                        Email Address <span className="sc-req">*</span>
                      </label>
                      <input
                        type="email"
                        id="sc-email"
                        name="email"
                        className="sc-form-input"
                        placeholder="name@example.com"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="sc-form-group">
                    <label className="sc-form-label" htmlFor="sc-subject">
                      Interested In
                    </label>
                    <select
                      id="sc-subject"
                      name="subject"
                      className="sc-form-select"
                      value={formData.subject}
                      onChange={handleChange}
                    >
                      <option value="Residential Villa Plots">Residential Villa Plots (DTCP / RERA)</option>
                      <option value="Gated Luxury Villas">Gated Luxury Villas</option>
                      <option value="Farmlands & Eco Living">Hillside &amp; Eco Farmlands</option>
                      <option value="Commercial Land">Commercial / Highway Parcels</option>
                      <option value="Schedule a Site Visit">Schedule a Site Visit</option>
                      <option value="General Inquiry">General Inquiry</option>
                    </select>
                  </div>

                  <div className="sc-form-group">
                    <label className="sc-form-label" htmlFor="sc-message">
                      Message
                    </label>
                    <textarea
                      id="sc-message"
                      name="message"
                      rows={4}
                      className="sc-form-textarea"
                      placeholder="How can we help you? (e.g. preferred location, budget, or questions)"
                      value={formData.message}
                      onChange={handleChange}
                    />
                  </div>

                  <button
                    type="submit"
                    className="crestora-btn crestora-btn-fill sc-submit-btn"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <span>Sending Message...</span>
                    ) : (
                      <>
                        <Send size={15} />
                        <span>Send Message</span>
                        <span className="btn-arrow-hover">→</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
