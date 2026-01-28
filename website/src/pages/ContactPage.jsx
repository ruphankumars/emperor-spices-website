import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Mail, Phone, MapPin, Send, Clock, CheckCircle, AlertCircle, MessageCircle } from 'lucide-react';
import InteractiveMap from '../components/InteractiveMap';

const ContactPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        company: '',
        country: '',
        product: '',
        quantity: '',
        message: ''
    });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null);
    const formRef = useRef();

    useEffect(() => {
        gsap.fromTo('.contact-animate',
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power3.out' }
        );
    }, []);

    const validateForm = () => {
        const newErrors = {};
        if (!formData.name.trim()) newErrors.name = 'Name is required';
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Invalid email format';
        }
        if (!formData.message.trim()) newErrors.message = 'Message is required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setIsSubmitting(true);
        await new Promise(resolve => setTimeout(resolve, 1500));
        setIsSubmitting(false);
        setSubmitStatus('success');
        setFormData({ name: '', email: '', company: '', country: '', product: '', quantity: '', message: '' });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: null }));
        }
    };

    const contactInfo = [
        { icon: <MapPin size={20} />, label: 'Head Office', value: 'S.F.NO:552/1F-30W, Gandhi Nagar,\nKaruppasamy Kovil Street,\nBodinayakanur – 625513,\nTheni District, Tamil Nadu, India' },
        { icon: <Phone size={20} />, label: 'India', value: '+91 97900 05649', link: 'tel:+919790005649' },
        { icon: <Phone size={20} />, label: 'UAE / Middle East', value: '+971 52 XXX XXXX', link: 'tel:+97152XXXXXXX' },
        { icon: <Mail size={20} />, label: 'General Inquiries', value: 'info@emperorspices.com', link: 'mailto:info@emperorspices.com' },
        { icon: <Mail size={20} />, label: 'Export Inquiries', value: 'export@emperorspices.com', link: 'mailto:export@emperorspices.com' },
        { icon: <Clock size={20} />, label: 'Business Hours', value: 'Mon - Sat: 9:00 AM - 6:00 PM IST\nSun: Closed' }
    ];

    const businessCredentials = [
        { label: 'GST', value: '33XXXXXXX1ZX' },
        { label: 'FSSAI', value: '12424997000179' },
        { label: 'IEC', value: 'XXXXXXXX' },
        { label: 'Spices Board', value: 'XXXXXXXX' }
    ];

    const countries = ['UAE', 'Saudi Arabia', 'USA', 'UK', 'Germany', 'France', 'Canada', 'Singapore', 'Japan', 'Kuwait', 'Qatar', 'Oman', 'Other'];
    const products = ['AGEB (8mm+) - Extra Bold', 'AGB (7-8mm) - Bold', 'AGS (6-7mm) - Special', 'Cardamom Seeds', 'Cardamom Powder', 'Mixed Order'];

    return (
        <div className="contact-page">
            {/* Hero Section */}
            <section className="contact-hero" data-nav-theme="light">
                <div className="contact-hero-bg">
                    <div className="contact-hero-circle circle-1" />
                    <div className="contact-hero-circle circle-2" />
                </div>
                <div className="contact-hero-content">
                    <span className="contact-badge">📞 Response within 24 hours</span>
                    <h1 className="contact-title">
                        Let's <span className="text-handwritten text-gradient-gold">Connect</span>
                    </h1>
                    <p className="contact-subtitle">
                        Ready to source premium Indian cardamom? Our export specialists are here to help.
                    </p>
                </div>
            </section>

            {/* Main Content */}
            <section className="contact-main" data-nav-theme="light">
                <div className="contact-grid">
                    {/* Left Column - Contact Info */}
                    <div className="contact-info-column contact-animate">
                        <h2 className="contact-section-title">Contact Information</h2>

                        <div className="contact-info-list">
                            {contactInfo.map((info, i) => (
                                <div key={i} className="contact-info-item">
                                    <div className="contact-info-icon">{info.icon}</div>
                                    <div className="contact-info-content">
                                        <span className="contact-info-label">{info.label}</span>
                                        {info.link ? (
                                            <a href={info.link} className="contact-info-value link">
                                                {info.value}
                                            </a>
                                        ) : (
                                            <span className="contact-info-value">{info.value}</span>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* WhatsApp CTA */}
                        <a
                            href="https://wa.me/919790005649?text=Hi! I'm interested in your cardamom products."
                            target="_blank"
                            rel="noopener noreferrer"
                            className="whatsapp-cta contact-animate"
                        >
                            <MessageCircle size={28} />
                            <div>
                                <strong>Chat on WhatsApp</strong>
                                <span>Get instant response from our team</span>
                            </div>
                        </a>

                        {/* Response Guarantee */}
                        <div className="response-guarantee contact-animate">
                            <h3>Quick Response Guarantee</h3>
                            <p>We respond to all inquiries within 24 hours. For urgent orders, please call directly.</p>
                            <div className="guarantee-badge">
                                <CheckCircle size={16} />
                                <span>24-Hour Response Time</span>
                            </div>
                        </div>

                        {/* Business Credentials - Enhanced */}
                        <div className="company-info-card contact-animate">
                            <div className="company-header">
                                <h3>🏢 Emperor Spices Private Limited</h3>
                                <span className="company-tagline">Premium Green Cardamom Exporters</span>
                            </div>

                            <div className="company-details-grid">
                                <div className="company-detail-row">
                                    <div className="detail-item">
                                        <span className="detail-icon">📋</span>
                                        <div className="detail-content">
                                            <span className="detail-label">GST Number</span>
                                            <span className="detail-value">33AXXXX1234Z5Q</span>
                                        </div>
                                    </div>
                                    <div className="detail-item">
                                        <span className="detail-icon">🍽️</span>
                                        <div className="detail-content">
                                            <span className="detail-label">FSSAI License</span>
                                            <span className="detail-value">12424997000179</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="company-detail-row">
                                    <div className="detail-item">
                                        <span className="detail-icon">📦</span>
                                        <div className="detail-content">
                                            <span className="detail-label">IEC Code</span>
                                            <span className="detail-value">XXXXXXXXX</span>
                                        </div>
                                    </div>
                                    <div className="detail-item">
                                        <span className="detail-icon">🌿</span>
                                        <div className="detail-content">
                                            <span className="detail-label">Spices Board Reg.</span>
                                            <span className="detail-value">SB/TN/XXXXX</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="company-detail-row">
                                    <div className="detail-item">
                                        <span className="detail-icon">✅</span>
                                        <div className="detail-content">
                                            <span className="detail-label">AGMARK License</span>
                                            <span className="detail-value">XXXXXX</span>
                                        </div>
                                    </div>
                                    <div className="detail-item">
                                        <span className="detail-icon">🏆</span>
                                        <div className="detail-content">
                                            <span className="detail-label">Established</span>
                                            <span className="detail-value">Since 1998</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="company-certifications">
                                <span className="cert-badge">GI Tagged</span>
                                <span className="cert-badge">Alleppey Green</span>
                                <span className="cert-badge">Export Quality</span>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Form */}
                    <div className="contact-form-column contact-animate">
                        <div className="contact-form-card">
                            <h2 className="contact-section-title">Send Us a Message</h2>

                            {submitStatus === 'success' ? (
                                <div className="form-success">
                                    <div className="success-icon">
                                        <CheckCircle size={48} />
                                    </div>
                                    <h3>Thank You!</h3>
                                    <p>We've received your inquiry and will get back to you within 24 hours.</p>
                                    <button onClick={() => setSubmitStatus(null)} className="btn-secondary btn-magnetic">
                                        <span>Send Another Message</span>
                                    </button>
                                </div>
                            ) : (
                                <form ref={formRef} onSubmit={handleSubmit} className="contact-form">
                                    <div className="form-row">
                                        <div className="form-group">
                                            <label>Your Name *</label>
                                            <input
                                                type="text"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                placeholder="John Doe"
                                                className={errors.name ? 'error' : ''}
                                            />
                                            {errors.name && <span className="form-error"><AlertCircle size={12} /> {errors.name}</span>}
                                        </div>
                                        <div className="form-group">
                                            <label>Email *</label>
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                placeholder="john@company.com"
                                                className={errors.email ? 'error' : ''}
                                            />
                                            {errors.email && <span className="form-error"><AlertCircle size={12} /> {errors.email}</span>}
                                        </div>
                                    </div>

                                    <div className="form-row">
                                        <div className="form-group">
                                            <label>Company</label>
                                            <input
                                                type="text"
                                                name="company"
                                                value={formData.company}
                                                onChange={handleChange}
                                                placeholder="Your Company"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Country</label>
                                            <select
                                                name="country"
                                                value={formData.country}
                                                onChange={handleChange}
                                            >
                                                <option value="">Select Country</option>
                                                {countries.map(c => <option key={c} value={c}>{c}</option>)}
                                            </select>
                                        </div>
                                    </div>

                                    <div className="form-row">
                                        <div className="form-group">
                                            <label>Product Interest</label>
                                            <select
                                                name="product"
                                                value={formData.product}
                                                onChange={handleChange}
                                            >
                                                <option value="">Select Product</option>
                                                {products.map(p => <option key={p} value={p}>{p}</option>)}
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <label>Estimated Quantity</label>
                                            <input
                                                type="text"
                                                name="quantity"
                                                value={formData.quantity}
                                                onChange={handleChange}
                                                placeholder="e.g., 500 kg/month"
                                            />
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label>Message *</label>
                                        <textarea
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            rows={5}
                                            placeholder="Tell us about your requirements..."
                                            className={errors.message ? 'error' : ''}
                                        />
                                        {errors.message && <span className="form-error"><AlertCircle size={12} /> {errors.message}</span>}
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="btn-primary btn-magnetic submit-btn"
                                    >
                                        <span>{isSubmitting ? 'Sending...' : 'Send Inquiry'}</span>
                                        {!isSubmitting && <Send size={18} />}
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* Interactive Map Section */}
            <section className="contact-map-section" data-nav-theme="light">
                <div className="contact-map-header">
                    <h2>Visit Our Facility</h2>
                    <p>Located in the heart of India's cardamom country</p>
                </div>
                <div className="contact-map-wrapper">
                    <InteractiveMap
                        lat={10.0103}
                        lng={77.3491}
                        zoom={14}
                        title="Emperor Spices Facility"
                        address="S.F.NO:552/1F-30W, Gandhi Nagar, Bodinayakanur – 625513, Tamil Nadu"
                    />
                </div>
            </section>
        </div>
    );
};

export default ContactPage;
