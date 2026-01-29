import React, { useState } from 'react';
import { MapPin, Phone, Mail, MessageCircle } from 'lucide-react';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
    alert('Thank you for your inquiry! We will get back to you within 24 hours.');
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section className="contact-section" id="contact">
      <div className="contact-container">
        {/* Contact Form */}
        <div className="contact-form-wrapper">
          <h3 className="contact-form-title">Get in Touch</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Your Name *</label>
              <input
                type="text"
                name="name"
                className="form-input"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Email Address *</label>
              <input
                type="email"
                name="email"
                className="form-input"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Company Name</label>
              <input
                type="text"
                name="company"
                className="form-input"
                placeholder="Enter your company name"
                value={formData.company}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Message *</label>
              <textarea
                name="message"
                className="form-textarea"
                placeholder="Tell us about your requirements..."
                value={formData.message}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary btn-lg w-full">
              Send Inquiry
            </button>
          </form>
        </div>

        {/* Contact Details */}
        <div className="contact-details">
          <div className="section-header" style={{ textAlign: 'left', marginBottom: 'var(--space-8)' }}>
            <span className="section-label">Contact Us</span>
            <h2 className="section-title">Let's Start a Conversation</h2>
            <p className="section-subtitle" style={{ textAlign: 'left' }}>
              Partner with India's finest cardamom exporters. Premium quality, 
              competitive pricing, reliable shipping worldwide.
            </p>
          </div>

          <div className="contact-detail-item">
            <div className="contact-detail-icon">
              <MapPin size={24} />
            </div>
            <div className="contact-detail-content">
              <h4>Visit Our Facility</h4>
              <p>
                S.F.NO:552/1F-30W, Gandhi Nagar,<br />
                Karuppasamy Koil Street,<br />
                Bodinayakanur – 625513,<br />
                Theni District, Tamil Nadu, India
              </p>
            </div>
          </div>

          <div className="contact-detail-item">
            <div className="contact-detail-icon">
              <Phone size={24} />
            </div>
            <div className="contact-detail-content">
              <h4>Call Us</h4>
              <a href="tel:+919790005649">+91 97900 05649</a>
            </div>
          </div>

          <div className="contact-detail-item">
            <div className="contact-detail-icon">
              <Mail size={24} />
            </div>
            <div className="contact-detail-content">
              <h4>Email Us</h4>
              <a href="mailto:info@emperorspices.com">info@emperorspices.com</a>
            </div>
          </div>

          <a 
            href="https://wa.me/919790005649?text=Hi! I'm interested in your cardamom products." 
            target="_blank" 
            rel="noopener noreferrer"
            className="whatsapp-btn"
            style={{ marginTop: 'var(--space-4)' }}
          >
            <MessageCircle size={20} />
            <span>WhatsApp Us for Quick Response</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
