import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { X, ChevronRight, ChevronLeft, Check, User, Package, FileText, Send } from 'lucide-react';

// Step definitions - 3 steps as per plan
const steps = [
    { id: 1, title: 'Contact Info', description: 'Your details', icon: User },
    { id: 2, title: 'Product Selection', description: 'What you need', icon: Package },
    { id: 3, title: 'Requirements', description: 'Additional info', icon: FileText }
];

const countries = [
    'UAE', 'Saudi Arabia', 'Kuwait', 'Qatar', 'Oman', 'Bahrain',
    'UK', 'Germany', 'France', 'Netherlands', 'Belgium',
    'USA', 'Canada', 'Mexico',
    'Japan', 'Korea', 'Singapore', 'Malaysia',
    'South Africa', 'India', 'Other'
];

const products = [
    { value: 'ageb', label: 'AGEB (8mm+) - Extra Bold', price: 'Premium' },
    { value: 'agb', label: 'AGB (7-8mm) - Bold', price: 'Standard' },
    { value: 'ags', label: 'AGS (6-7mm) - Special', price: 'Value' },
    { value: 'seeds', label: 'Cardamom Seeds', price: 'Extraction' },
    { value: 'powder', label: 'Cardamom Powder', price: 'Processing' },
    { value: 'multiple', label: 'Multiple Products', price: 'Custom' }
];

const quantities = [
    { value: '100-500', label: '100-500 kg' },
    { value: '500-1000', label: '500 kg - 1 Ton' },
    { value: '1000-5000', label: '1-5 Tons' },
    { value: '5000+', label: '5+ Tons' }
];

const frequencies = [
    { value: 'onetime', label: 'One-time Order' },
    { value: 'monthly', label: 'Monthly' },
    { value: 'quarterly', label: 'Quarterly' },
    { value: 'yearly', label: 'Yearly Contract' }
];

const MultiStepQuoteModal = ({ isOpen, onClose, preselectedProduct = '' }) => {
    const modalRef = useRef(null);
    const contentRef = useRef(null);
    const backdropRef = useRef(null);
    const stepContainerRef = useRef(null);

    const [currentStep, setCurrentStep] = useState(1);
    const [direction, setDirection] = useState(1); // 1 = forward, -1 = backward
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const [formData, setFormData] = useState({
        // Step 1: Contact Info
        name: '',
        email: '',
        phone: '',
        company: '',
        country: '',
        // Step 2: Product Selection
        product: preselectedProduct,
        quantity: '',
        frequency: '',
        // Step 3: Requirements
        packaging: '',
        certifications: [],
        deliveryTimeline: '',
        message: ''
    });

    const [errors, setErrors] = useState({});

    // Reset form when preselectedProduct changes
    useEffect(() => {
        if (preselectedProduct) {
            setFormData(prev => ({ ...prev, product: preselectedProduct }));
        }
    }, [preselectedProduct]);

    // Modal open/close animation
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

            // Show modal
            tl.set(modalRef.current, { display: 'flex' })
                .fromTo(backdropRef.current,
                    { opacity: 0 },
                    { opacity: 1, duration: 0.3, ease: 'power2.out' }
                )
                .fromTo(contentRef.current,
                    { y: '100%', opacity: 0, scale: 0.95 },
                    { y: '0%', opacity: 1, scale: 1, duration: 0.5, ease: 'power3.out' },
                    '-=0.1'
                )
                // Animate progress bar
                .fromTo('.msq-progress-step',
                    { scale: 0.8, opacity: 0 },
                    { scale: 1, opacity: 1, duration: 0.4, stagger: 0.1, ease: 'back.out(2)' },
                    '-=0.2'
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
                    // Reset state
                    setTimeout(() => {
                        setCurrentStep(1);
                        setIsSubmitted(false);
                        setErrors({});
                    }, 100);
                }
            });

            tl.to(contentRef.current, {
                y: '100%',
                opacity: 0,
                scale: 0.95,
                duration: 0.4,
                ease: 'power3.in'
            })
                .to(backdropRef.current, { opacity: 0, duration: 0.2 }, '-=0.2');
        }

        const handleEsc = (e) => {
            if (e.key === 'Escape' && isOpen) onClose();
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

    // Step transition animation
    const animateStepTransition = (newStep, dir) => {
        const container = stepContainerRef.current;
        if (!container) return;

        const tl = gsap.timeline();

        // Slide out current step
        tl.to(container, {
            x: dir === 1 ? -50 : 50,
            opacity: 0,
            duration: 0.25,
            ease: 'power2.in',
            onComplete: () => {
                setCurrentStep(newStep);
            }
        })
            // Slide in new step
            .fromTo(container,
                { x: dir === 1 ? 50 : -50, opacity: 0 },
                { x: 0, opacity: 1, duration: 0.35, ease: 'power2.out' }
            );
    };

    // Validation
    const validateStep = (step) => {
        const newErrors = {};

        if (step === 1) {
            if (!formData.name.trim()) newErrors.name = 'Name is required';
            if (!formData.email.trim()) {
                newErrors.email = 'Email is required';
            } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
                newErrors.email = 'Please enter a valid email';
            }
            if (!formData.country) newErrors.country = 'Please select your country';
        }

        if (step === 2) {
            if (!formData.product) newErrors.product = 'Please select a product';
            if (!formData.quantity) newErrors.quantity = 'Please select quantity range';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const nextStep = () => {
        if (validateStep(currentStep)) {
            if (currentStep < 3) {
                setDirection(1);
                animateStepTransition(currentStep + 1, 1);

                // Animate progress indicator
                gsap.to(`.msq-progress-step[data-step="${currentStep}"]`, {
                    scale: 1.1,
                    duration: 0.2,
                    yoyo: true,
                    repeat: 1
                });
            }
        }
    };

    const prevStep = () => {
        if (currentStep > 1) {
            setDirection(-1);
            animateStepTransition(currentStep - 1, -1);
        }
    };

    const handleSubmit = async () => {
        if (!validateStep(currentStep)) return;

        setIsSubmitting(true);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));

        setIsSubmitting(false);
        setIsSubmitted(true);

        // Success animation
        gsap.timeline()
            .fromTo('.msq-success-icon',
                { scale: 0, rotation: -180 },
                { scale: 1, rotation: 0, duration: 0.6, ease: 'elastic.out(1, 0.5)' }
            )
            .fromTo('.msq-success-text',
                { y: 30, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.4, stagger: 0.1 },
                '-=0.3'
            );
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        if (type === 'checkbox') {
            setFormData(prev => ({
                ...prev,
                certifications: checked
                    ? [...prev.certifications, value]
                    : prev.certifications.filter(c => c !== value)
            }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }

        // Clear error on change
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: null }));
        }
    };

    // Render step content
    const renderStepContent = () => {
        switch (currentStep) {
            case 1:
                return (
                    <div className="msq-step-content">
                        <div className="msq-step-header">
                            <div className="msq-step-icon-large">
                                <User size={28} />
                            </div>
                            <div>
                                <h3 className="msq-step-title">Contact Information</h3>
                                <p className="msq-step-desc">Let us know how to reach you</p>
                            </div>
                        </div>

                        <div className="msq-form-grid">
                            <div className="msq-form-group">
                                <label htmlFor="name">Full Name <span className="required">*</span></label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="John Smith"
                                    className={errors.name ? 'error' : ''}
                                />
                                {errors.name && <span className="msq-error">{errors.name}</span>}
                            </div>

                            <div className="msq-form-group">
                                <label htmlFor="email">Email Address <span className="required">*</span></label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="john@company.com"
                                    className={errors.email ? 'error' : ''}
                                />
                                {errors.email && <span className="msq-error">{errors.email}</span>}
                            </div>

                            <div className="msq-form-group">
                                <label htmlFor="phone">Phone Number</label>
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    placeholder="+1 234 567 8900"
                                />
                            </div>

                            <div className="msq-form-group">
                                <label htmlFor="company">Company Name</label>
                                <input
                                    type="text"
                                    id="company"
                                    name="company"
                                    value={formData.company}
                                    onChange={handleChange}
                                    placeholder="Your Company Ltd"
                                />
                            </div>

                            <div className="msq-form-group msq-full-width">
                                <label htmlFor="country">Country <span className="required">*</span></label>
                                <select
                                    id="country"
                                    name="country"
                                    value={formData.country}
                                    onChange={handleChange}
                                    className={errors.country ? 'error' : ''}
                                >
                                    <option value="">Select your country</option>
                                    {countries.map(c => (
                                        <option key={c} value={c}>{c}</option>
                                    ))}
                                </select>
                                {errors.country && <span className="msq-error">{errors.country}</span>}
                            </div>
                        </div>
                    </div>
                );

            case 2:
                return (
                    <div className="msq-step-content">
                        <div className="msq-step-header">
                            <div className="msq-step-icon-large">
                                <Package size={28} />
                            </div>
                            <div>
                                <h3 className="msq-step-title">Product Selection</h3>
                                <p className="msq-step-desc">Choose your cardamom grade</p>
                            </div>
                        </div>

                        <div className="msq-form-grid">
                            <div className="msq-form-group msq-full-width">
                                <label>Product Grade <span className="required">*</span></label>
                                <div className="msq-product-grid">
                                    {products.map(product => (
                                        <label
                                            key={product.value}
                                            className={`msq-product-card ${formData.product === product.value ? 'selected' : ''}`}
                                        >
                                            <input
                                                type="radio"
                                                name="product"
                                                value={product.value}
                                                checked={formData.product === product.value}
                                                onChange={handleChange}
                                            />
                                            <div className="msq-product-card-content">
                                                <span className="msq-product-name">{product.label}</span>
                                                <span className="msq-product-price">{product.price}</span>
                                            </div>
                                            <div className="msq-product-check">
                                                <Check size={16} />
                                            </div>
                                        </label>
                                    ))}
                                </div>
                                {errors.product && <span className="msq-error">{errors.product}</span>}
                            </div>

                            <div className="msq-form-group">
                                <label htmlFor="quantity">Quantity Range <span className="required">*</span></label>
                                <select
                                    id="quantity"
                                    name="quantity"
                                    value={formData.quantity}
                                    onChange={handleChange}
                                    className={errors.quantity ? 'error' : ''}
                                >
                                    <option value="">Select quantity</option>
                                    {quantities.map(q => (
                                        <option key={q.value} value={q.value}>{q.label}</option>
                                    ))}
                                </select>
                                {errors.quantity && <span className="msq-error">{errors.quantity}</span>}
                            </div>

                            <div className="msq-form-group">
                                <label htmlFor="frequency">Order Frequency</label>
                                <select
                                    id="frequency"
                                    name="frequency"
                                    value={formData.frequency}
                                    onChange={handleChange}
                                >
                                    <option value="">Select frequency</option>
                                    {frequencies.map(f => (
                                        <option key={f.value} value={f.value}>{f.label}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                );

            case 3:
                return (
                    <div className="msq-step-content">
                        <div className="msq-step-header">
                            <div className="msq-step-icon-large">
                                <FileText size={28} />
                            </div>
                            <div>
                                <h3 className="msq-step-title">Additional Requirements</h3>
                                <p className="msq-step-desc">Tell us more about your needs</p>
                            </div>
                        </div>

                        <div className="msq-form-grid">
                            <div className="msq-form-group">
                                <label htmlFor="packaging">Packaging Preference</label>
                                <select
                                    id="packaging"
                                    name="packaging"
                                    value={formData.packaging}
                                    onChange={handleChange}
                                >
                                    <option value="">Select packaging</option>
                                    <option value="25kg">25 kg Bags</option>
                                    <option value="50kg">50 kg Bags</option>
                                    <option value="bulk">Bulk (Custom)</option>
                                    <option value="retail">Retail Packs</option>
                                    <option value="private">Private Label</option>
                                </select>
                            </div>

                            <div className="msq-form-group">
                                <label htmlFor="deliveryTimeline">Delivery Timeline</label>
                                <select
                                    id="deliveryTimeline"
                                    name="deliveryTimeline"
                                    value={formData.deliveryTimeline}
                                    onChange={handleChange}
                                >
                                    <option value="">Select timeline</option>
                                    <option value="urgent">Urgent (1-2 weeks)</option>
                                    <option value="standard">Standard (2-4 weeks)</option>
                                    <option value="flexible">Flexible (1-2 months)</option>
                                    <option value="planning">Planning ahead (3+ months)</option>
                                </select>
                            </div>

                            <div className="msq-form-group msq-full-width">
                                <label>Certifications Required</label>
                                <div className="msq-checkbox-grid">
                                    {['FSSAI', 'ISO 22000', 'HACCP', 'Organic', 'Halal', 'Kosher'].map(cert => (
                                        <label key={cert} className="msq-checkbox">
                                            <input
                                                type="checkbox"
                                                name="certifications"
                                                value={cert}
                                                checked={formData.certifications.includes(cert)}
                                                onChange={handleChange}
                                            />
                                            <span className="msq-checkbox-box">
                                                <Check size={14} />
                                            </span>
                                            <span>{cert}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <div className="msq-form-group msq-full-width">
                                <label htmlFor="message">Additional Message</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    rows={4}
                                    placeholder="Any specific requirements, questions, or additional information..."
                                />
                            </div>
                        </div>

                        {/* Summary Preview */}
                        <div className="msq-summary">
                            <h4>Order Summary</h4>
                            <div className="msq-summary-grid">
                                <div className="msq-summary-item">
                                    <span className="msq-summary-label">Contact</span>
                                    <span className="msq-summary-value">{formData.name} ({formData.email})</span>
                                </div>
                                <div className="msq-summary-item">
                                    <span className="msq-summary-label">Product</span>
                                    <span className="msq-summary-value">
                                        {products.find(p => p.value === formData.product)?.label || '-'}
                                    </span>
                                </div>
                                <div className="msq-summary-item">
                                    <span className="msq-summary-label">Quantity</span>
                                    <span className="msq-summary-value">
                                        {quantities.find(q => q.value === formData.quantity)?.label || '-'}
                                    </span>
                                </div>
                                <div className="msq-summary-item">
                                    <span className="msq-summary-label">Country</span>
                                    <span className="msq-summary-value">{formData.country || '-'}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <div ref={modalRef} className="msq-modal" style={{ display: 'none' }}>
            {/* Backdrop */}
            <div
                ref={backdropRef}
                className="msq-backdrop"
                onClick={onClose}
            />

            {/* Modal Content */}
            <div ref={contentRef} className="msq-content">
                {/* Close Button */}
                <button className="msq-close" onClick={onClose} aria-label="Close modal">
                    <X size={24} />
                </button>

                {!isSubmitted ? (
                    <>
                        {/* Header */}
                        <div className="msq-header">
                            <div className="msq-header-icon">
                                <span>🌿</span>
                            </div>
                            <h2 className="msq-main-title">Request a Quote</h2>
                            <p className="msq-main-subtitle">Get competitive pricing for premium Indian cardamom</p>
                        </div>

                        {/* Progress Steps */}
                        <div className="msq-progress">
                            {steps.map((step, index) => {
                                const Icon = step.icon;
                                const isActive = currentStep === step.id;
                                const isCompleted = currentStep > step.id;

                                return (
                                    <React.Fragment key={step.id}>
                                        <div
                                            className={`msq-progress-step ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}`}
                                            data-step={step.id}
                                        >
                                            <div className="msq-progress-icon">
                                                {isCompleted ? <Check size={18} /> : <span>{step.id}</span>}
                                            </div>
                                            <div className="msq-progress-info">
                                                <span className="msq-progress-title">{step.title}</span>
                                                <span className="msq-progress-desc">{step.description}</span>
                                            </div>
                                        </div>
                                        {index < steps.length - 1 && (
                                            <div className={`msq-progress-line ${isCompleted ? 'completed' : ''}`} />
                                        )}
                                    </React.Fragment>
                                );
                            })}
                        </div>

                        {/* Step Container */}
                        <div ref={stepContainerRef} className="msq-step-container">
                            {renderStepContent()}
                        </div>

                        {/* Footer Navigation */}
                        <div className="msq-footer">
                            <button
                                className="msq-btn msq-btn-secondary"
                                onClick={prevStep}
                                disabled={currentStep === 1}
                                style={{ visibility: currentStep === 1 ? 'hidden' : 'visible' }}
                            >
                                <ChevronLeft size={18} />
                                <span>Back</span>
                            </button>

                            <div className="msq-step-indicator">
                                Step {currentStep} of 3
                            </div>

                            {currentStep < 3 ? (
                                <button className="msq-btn msq-btn-primary" onClick={nextStep}>
                                    <span>Continue</span>
                                    <ChevronRight size={18} />
                                </button>
                            ) : (
                                <button
                                    className="msq-btn msq-btn-primary msq-btn-submit"
                                    onClick={handleSubmit}
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? (
                                        <>
                                            <span className="msq-spinner" />
                                            <span>Submitting...</span>
                                        </>
                                    ) : (
                                        <>
                                            <span>Submit Request</span>
                                            <Send size={18} />
                                        </>
                                    )}
                                </button>
                            )}
                        </div>
                    </>
                ) : (
                    /* Success State */
                    <div className="msq-success">
                        <div className="msq-success-icon">
                            <Check size={48} strokeWidth={3} />
                        </div>
                        <h2 className="msq-success-text">Quote Request Sent!</h2>
                        <p className="msq-success-text">
                            Thank you for your interest in Emperor Spices. Our team will review your
                            requirements and get back to you within 24 hours with a detailed quote.
                        </p>
                        <div className="msq-success-details msq-success-text">
                            <div className="msq-success-detail">
                                <span>📧</span>
                                <span>Check your email for confirmation</span>
                            </div>
                            <div className="msq-success-detail">
                                <span>⏱️</span>
                                <span>Response within 24 hours</span>
                            </div>
                            <div className="msq-success-detail">
                                <span>💬</span>
                                <span>WhatsApp for faster response</span>
                            </div>
                        </div>
                        <div className="msq-success-actions">
                            <button className="msq-btn msq-btn-primary" onClick={onClose}>
                                <span>Close</span>
                            </button>
                            <a
                                href="https://wa.me/919790005649?text=Hi! I just submitted a quote request and would like to discuss further."
                                target="_blank"
                                rel="noopener noreferrer"
                                className="msq-btn msq-btn-whatsapp"
                            >
                                <span>💬</span>
                                <span>Chat on WhatsApp</span>
                            </a>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MultiStepQuoteModal;
