import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { X, ChevronRight, ChevronLeft, Check, User, Building, Globe, Package, MessageSquare } from 'lucide-react';

const steps = [
    { id: 1, title: 'Contact Info', icon: User },
    { id: 2, title: 'Company', icon: Building },
    { id: 3, title: 'Requirements', icon: Package },
    { id: 4, title: 'Message', icon: MessageSquare }
];

const countries = [
    'UAE', 'Saudi Arabia', 'Kuwait', 'Qatar', 'Oman', 'Bahrain',
    'UK', 'Germany', 'France', 'Netherlands', 'Belgium',
    'USA', 'Canada', 'Mexico',
    'Japan', 'Korea', 'Singapore', 'Malaysia',
    'South Africa', 'Other'
];

const products = [
    { value: 'ageb', label: 'AGEB (8mm+) - Extra Bold' },
    { value: 'agb', label: 'AGB (7-8mm) - Bold' },
    { value: 'ags', label: 'AGS (6-7mm) - Special' },
    { value: 'seeds', label: 'Cardamom Seeds' },
    { value: 'powder', label: 'Cardamom Powder' },
    { value: 'multiple', label: 'Multiple Products' }
];

const QuoteModal = ({ isOpen, onClose }) => {
    const modalRef = useRef(null);
    const contentRef = useRef(null);
    const backdropRef = useRef(null);
    const [currentStep, setCurrentStep] = useState(1);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        company: '',
        country: '',
        website: '',
        product: '',
        quantity: '',
        frequency: '',
        message: ''
    });
    const [errors, setErrors] = useState({});

    // Animation on open/close
    useEffect(() => {
        if (isOpen) {
            // Save current scroll position and lock body
            const scrollY = window.scrollY;
            document.body.style.position = 'fixed';
            document.body.style.top = `-${scrollY}px`;
            document.body.style.left = '0';
            document.body.style.right = '0';
            document.body.style.overflow = 'hidden';
            document.body.classList.add('modal-open');

            const tl = gsap.timeline();
            tl.set(modalRef.current, { display: 'flex' })
                .fromTo(backdropRef.current,
                    { opacity: 0 },
                    { opacity: 1, duration: 0.3 }
                )
                .fromTo(contentRef.current,
                    { y: '100%', opacity: 0 },
                    { y: '0%', opacity: 1, duration: 0.5, ease: 'power3.out' },
                    '-=0.1'
                );
        } else {
            const tl = gsap.timeline({
                onComplete: () => {
                    if (modalRef.current) {
                        modalRef.current.style.display = 'none';
                    }
                    // Restore body scroll position
                    const scrollY = document.body.style.top;
                    document.body.style.position = '';
                    document.body.style.top = '';
                    document.body.style.left = '';
                    document.body.style.right = '';
                    document.body.style.overflow = '';
                    document.body.classList.remove('modal-open');
                    if (scrollY) {
                        window.scrollTo(0, parseInt(scrollY || '0') * -1);
                    }
                    // Reset state after close
                    setCurrentStep(1);
                    setIsSubmitted(false);
                }
            });
            tl.to(contentRef.current, { y: '100%', opacity: 0, duration: 0.4, ease: 'power3.in' })
                .to(backdropRef.current, { opacity: 0, duration: 0.2 }, '-=0.2');
        }

        const handleEsc = (e) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleEsc);

        return () => {
            window.removeEventListener('keydown', handleEsc);
            // Cleanup: restore body scroll if component unmounts while open
            if (isOpen) {
                const scrollY = document.body.style.top;
                document.body.style.position = '';
                document.body.style.top = '';
                document.body.style.left = '';
                document.body.style.right = '';
                document.body.style.overflow = '';
                document.body.classList.remove('modal-open');
                if (scrollY) {
                    window.scrollTo(0, parseInt(scrollY || '0') * -1);
                }
            }
        };
    }, [isOpen, onClose]);

    const validateStep = () => {
        const newErrors = {};

        if (currentStep === 1) {
            if (!formData.name.trim()) newErrors.name = 'Name is required';
            if (!formData.email.trim()) newErrors.email = 'Email is required';
            else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email';
        }

        if (currentStep === 2) {
            if (!formData.company.trim()) newErrors.company = 'Company name is required';
            if (!formData.country) newErrors.country = 'Please select a country';
        }

        if (currentStep === 3) {
            if (!formData.product) newErrors.product = 'Please select a product';
            if (!formData.quantity.trim()) newErrors.quantity = 'Quantity is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const nextStep = () => {
        if (validateStep()) {
            setCurrentStep(prev => Math.min(prev + 1, 4));
        }
    };

    const prevStep = () => {
        setCurrentStep(prev => Math.max(prev - 1, 1));
    };

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState('');

    const handleSubmit = async () => {
        if (!validateStep()) return;

        setIsSubmitting(true);
        setSubmitError('');

        try {
            // API endpoint - update this when deploying
            const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

            // Map product value to label for clearer emails
            const productLabel = products.find(p => p.value === formData.product)?.label || formData.product;

            const response = await fetch(`${API_URL}/api/quote`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...formData,
                    product: productLabel,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to submit quote request');
            }

            // Success
            setIsSubmitting(false);
            setIsSubmitted(true);

            // Animate success
            gsap.fromTo('.quote-success',
                { scale: 0.5, opacity: 0 },
                { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(1.7)' }
            );
        } catch (error) {
            console.error('Quote submission error:', error);
            setIsSubmitting(false);
            setSubmitError(error.message || 'Something went wrong. Please try again.');
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: null }));
        }
    };

    const renderStep = () => {
        switch (currentStep) {
            case 1:
                return (
                    <div className="quote-step">
                        <h3 className="quote-step-title">Contact Information</h3>
                        <p className="quote-step-desc">Let us know how to reach you</p>

                        <div className="quote-form-group">
                            <label>Full Name *</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="John Doe"
                                className={errors.name ? 'error' : ''}
                            />
                            {errors.name && <span className="quote-error">{errors.name}</span>}
                        </div>

                        <div className="quote-form-row">
                            <div className="quote-form-group">
                                <label>Email *</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="john@company.com"
                                    className={errors.email ? 'error' : ''}
                                />
                                {errors.email && <span className="quote-error">{errors.email}</span>}
                            </div>
                            <div className="quote-form-group">
                                <label>Phone</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    placeholder="+1 234 567 8900"
                                />
                            </div>
                        </div>
                    </div>
                );

            case 2:
                return (
                    <div className="quote-step">
                        <h3 className="quote-step-title">Company Details</h3>
                        <p className="quote-step-desc">Tell us about your business</p>

                        <div className="quote-form-group">
                            <label>Company Name *</label>
                            <input
                                type="text"
                                name="company"
                                value={formData.company}
                                onChange={handleChange}
                                placeholder="Your Company Ltd"
                                className={errors.company ? 'error' : ''}
                            />
                            {errors.company && <span className="quote-error">{errors.company}</span>}
                        </div>

                        <div className="quote-form-row">
                            <div className="quote-form-group">
                                <label>Country *</label>
                                <select
                                    name="country"
                                    value={formData.country}
                                    onChange={handleChange}
                                    className={errors.country ? 'error' : ''}
                                >
                                    <option value="">Select Country</option>
                                    {countries.map(c => (
                                        <option key={c} value={c}>{c}</option>
                                    ))}
                                </select>
                                {errors.country && <span className="quote-error">{errors.country}</span>}
                            </div>
                            <div className="quote-form-group">
                                <label>Website</label>
                                <input
                                    type="url"
                                    name="website"
                                    value={formData.website}
                                    onChange={handleChange}
                                    placeholder="https://company.com"
                                />
                            </div>
                        </div>
                    </div>
                );

            case 3:
                return (
                    <div className="quote-step">
                        <h3 className="quote-step-title">Product Requirements</h3>
                        <p className="quote-step-desc">What cardamom grade are you looking for?</p>

                        <div className="quote-form-group">
                            <label>Product *</label>
                            <select
                                name="product"
                                value={formData.product}
                                onChange={handleChange}
                                className={errors.product ? 'error' : ''}
                            >
                                <option value="">Select Product</option>
                                {products.map(p => (
                                    <option key={p.value} value={p.value}>{p.label}</option>
                                ))}
                            </select>
                            {errors.product && <span className="quote-error">{errors.product}</span>}
                        </div>

                        <div className="quote-form-row">
                            <div className="quote-form-group">
                                <label>Quantity (kg) *</label>
                                <input
                                    type="text"
                                    name="quantity"
                                    value={formData.quantity}
                                    onChange={handleChange}
                                    placeholder="e.g. 500kg, 1 ton"
                                    className={errors.quantity ? 'error' : ''}
                                />
                                {errors.quantity && <span className="quote-error">{errors.quantity}</span>}
                            </div>
                            <div className="quote-form-group">
                                <label>Order Frequency</label>
                                <select
                                    name="frequency"
                                    value={formData.frequency}
                                    onChange={handleChange}
                                >
                                    <option value="">Select Frequency</option>
                                    <option value="onetime">One-time Order</option>
                                    <option value="monthly">Monthly</option>
                                    <option value="quarterly">Quarterly</option>
                                    <option value="yearly">Yearly</option>
                                </select>
                            </div>
                        </div>
                    </div>
                );

            case 4:
                return (
                    <div className="quote-step">
                        <h3 className="quote-step-title">Additional Details</h3>
                        <p className="quote-step-desc">Any specific requirements or questions?</p>

                        <div className="quote-form-group">
                            <label>Message</label>
                            <textarea
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                placeholder="Tell us about packaging preferences, delivery timeline, certifications needed..."
                                rows={5}
                            />
                        </div>

                        <div className="quote-summary">
                            <h4>Summary</h4>
                            <div className="quote-summary-grid">
                                <div><span>Name:</span> {formData.name}</div>
                                <div><span>Company:</span> {formData.company}</div>
                                <div><span>Country:</span> {formData.country}</div>
                                <div><span>Product:</span> {products.find(p => p.value === formData.product)?.label}</div>
                                <div><span>Quantity:</span> {formData.quantity}</div>
                            </div>
                        </div>
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <div ref={modalRef} className="quote-modal" style={{ display: 'none' }}>
            <div ref={backdropRef} className="quote-modal-backdrop" onClick={onClose} />

            <div ref={contentRef} className="quote-modal-content">
                <button className="quote-modal-close" onClick={onClose}>
                    <X size={24} />
                </button>

                {!isSubmitted ? (
                    <>
                        {/* Header */}
                        <div className="quote-modal-header">
                            <h2>Request a Quote</h2>
                            <p>Get competitive pricing for premium cardamom</p>
                        </div>

                        {/* Progress Steps */}
                        <div className="quote-steps-bar">
                            {steps.map((step, index) => {
                                const Icon = step.icon;
                                const isActive = currentStep === step.id;
                                const isCompleted = currentStep > step.id;

                                return (
                                    <div
                                        key={step.id}
                                        className={`quote-step-item ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}`}
                                    >
                                        <div className="quote-step-icon">
                                            {isCompleted ? <Check size={16} /> : <Icon size={16} />}
                                        </div>
                                        <span className="quote-step-label">{step.title}</span>
                                        {index < steps.length - 1 && <div className="quote-step-line" />}
                                    </div>
                                );
                            })}
                        </div>

                        {/* Form Content */}
                        <div className="quote-form-content">
                            {renderStep()}
                        </div>

                        {/* Error Message */}
                        {submitError && (
                            <div style={{
                                background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '10px',
                                padding: '12px 16px', color: '#dc2626', fontSize: '0.9rem', margin: '0 24px 16px'
                            }}>
                                ⚠️ {submitError}
                            </div>
                        )}

                        {/* Navigation */}
                        <div className="quote-modal-footer">
                            {currentStep > 1 && (
                                <button className="quote-btn-secondary btn-magnetic" onClick={prevStep} disabled={isSubmitting}>
                                    <ChevronLeft size={18} />
                                    <span>Back</span>
                                </button>
                            )}

                            {currentStep < 4 ? (
                                <button className="quote-btn-primary btn-magnetic" onClick={nextStep}>
                                    <span>Next</span>
                                    <ChevronRight size={18} />
                                </button>
                            ) : (
                                <button
                                    className="quote-btn-primary btn-magnetic"
                                    onClick={handleSubmit}
                                    disabled={isSubmitting}
                                    style={{ opacity: isSubmitting ? 0.7 : 1, cursor: isSubmitting ? 'wait' : 'pointer' }}
                                >
                                    <span>{isSubmitting ? 'Submitting...' : 'Submit Request'}</span>
                                    {!isSubmitting && <Check size={18} />}
                                </button>
                            )}
                        </div>
                    </>
                ) : (
                    <div className="quote-success">
                        <div className="quote-success-icon">
                            <Check size={48} />
                        </div>
                        <h2>Quote Request Sent!</h2>
                        <p>Thank you for your interest. Our team will review your requirements and get back to you within 24 hours.</p>
                        <button className="quote-btn-primary btn-magnetic" onClick={onClose}>
                            <span>Close</span>
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default QuoteModal;
