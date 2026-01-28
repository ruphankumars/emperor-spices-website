import React, { useRef, useEffect, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Main Interactive Contact Section - Clean Minimal Design with Premium GSAP Animations
const InteractiveContactSection = () => {
    const sectionRef = useRef();
    const headerRef = useRef();
    const leftPanelRef = useRef();
    const rightPanelRef = useRef();
    const bgTextRef = useRef();
    const cardsContainerRef = useRef();
    const formRef = useRef();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        company: '',
        country: '',
        product: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [activeCard, setActiveCard] = useState(null);
    const [focusedField, setFocusedField] = useState(null);

    // GSAP animation for floating label on focus
    const handleFieldFocus = useCallback((fieldName, inputRef) => {
        setFocusedField(fieldName);
        const field = inputRef?.closest('.form-field-animated');
        if (field) {
            const label = field.querySelector('label');
            const fieldLine = field.querySelector('.field-line');
            
            if (label && !formData[fieldName]) {
                gsap.to(label, {
                    y: -28,
                    x: -4,
                    scale: 0.85,
                    color: '#6B8058',
                    duration: 0.3,
                    ease: 'power2.out'
                });
            }
            
            if (fieldLine) {
                gsap.fromTo(fieldLine,
                    { scaleX: 0 },
                    { scaleX: 1, duration: 0.4, ease: 'power3.out' }
                );
            }
            
            gsap.to(field, {
                scale: 1.02,
                duration: 0.2,
                ease: 'power2.out'
            });
        }
    }, [formData]);

    // GSAP animation for floating label on blur
    const handleFieldBlur = useCallback((fieldName, inputRef) => {
        setFocusedField(null);
        const field = inputRef?.closest('.form-field-animated');
        if (field) {
            const label = field.querySelector('label');
            const fieldLine = field.querySelector('.field-line');
            
            if (label && !formData[fieldName]) {
                gsap.to(label, {
                    y: 0,
                    x: 0,
                    scale: 1,
                    color: '#78716c',
                    duration: 0.3,
                    ease: 'power2.out'
                });
            }
            
            if (fieldLine) {
                gsap.to(fieldLine, {
                    scaleX: 0,
                    duration: 0.3,
                    ease: 'power2.in'
                });
            }
            
            gsap.to(field, {
                scale: 1,
                duration: 0.2,
                ease: 'power2.out'
            });
        }
    }, [formData]);

    // Update floating label when value changes
    const handleInputChange = useCallback((e, fieldName) => {
        const value = e.target.value;
        setFormData(prev => ({ ...prev, [fieldName]: value }));
        
        const field = e.target.closest('.form-field-animated');
        if (field) {
            const label = field.querySelector('label');
            if (label) {
                if (value) {
                    gsap.to(label, {
                        y: -28,
                        x: -4,
                        scale: 0.85,
                        color: '#6B8058',
                        duration: 0.2,
                        ease: 'power2.out'
                    });
                } else if (focusedField !== fieldName) {
                    gsap.to(label, {
                        y: 0,
                        x: 0,
                        scale: 1,
                        color: '#78716c',
                        duration: 0.2,
                        ease: 'power2.out'
                    });
                }
            }
        }
    }, [focusedField]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Background text parallax with subtle movement
            gsap.fromTo(bgTextRef.current,
                { x: '15%', opacity: 0 },
                {
                    x: '-5%',
                    opacity: 0.04,
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top bottom',
                        end: 'bottom top',
                        scrub: 2
                    }
                }
            );

            // Header reveal with elegant split text effect
            const headerTl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 80%',
                    toggleActions: 'play none none none'
                }
            });

            headerTl
                .fromTo('.contact-label-line',
                    { scaleX: 0, transformOrigin: 'left center' },
                    { scaleX: 1, duration: 0.6, ease: 'power3.out' }
                )
                .fromTo('.contact-label-text',
                    { opacity: 0, x: -15 },
                    { opacity: 1, x: 0, duration: 0.4 },
                    '-=0.3'
                )
                .fromTo('.contact-title-word',
                    { y: 60, opacity: 0, rotateX: -30 },
                    { 
                        y: 0, 
                        opacity: 1, 
                        rotateX: 0, 
                        duration: 0.7, 
                        stagger: 0.08, 
                        ease: 'power3.out' 
                    },
                    '-=0.2'
                )
                .fromTo('.contact-subtitle',
                    { y: 20, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out' },
                    '-=0.3'
                );

            // Left panel elegant slide in
            gsap.fromTo(leftPanelRef.current,
                { x: -80, opacity: 0 },
                {
                    x: 0,
                    opacity: 1,
                    duration: 0.9,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: leftPanelRef.current,
                        start: 'top 85%',
                        toggleActions: 'play none none none'
                    }
                }
            );

            // Contact method cards with smooth stagger
            gsap.fromTo('.contact-method-card',
                { y: 40, opacity: 0, scale: 0.97 },
                {
                    y: 0,
                    opacity: 1,
                    scale: 1,
                    duration: 0.6,
                    stagger: 0.1,
                    ease: 'back.out(1.2)',
                    scrollTrigger: {
                        trigger: cardsContainerRef.current,
                        start: 'top 85%',
                        toggleActions: 'play none none none'
                    }
                }
            );

            // Stats counter with number animation feel
            gsap.fromTo('.stat-item',
                { y: 30, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.5,
                    stagger: 0.08,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: '.contact-stats-strip',
                        start: 'top 90%',
                        toggleActions: 'play none none none'
                    }
                }
            );

            // Right panel (form) reveal with depth
            gsap.fromTo(rightPanelRef.current,
                { x: 60, opacity: 0, rotateY: -3 },
                {
                    x: 0,
                    opacity: 1,
                    rotateY: 0,
                    duration: 1,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: rightPanelRef.current,
                        start: 'top 80%',
                        toggleActions: 'play none none none'
                    }
                }
            );

            // Form header elegant reveal
            gsap.fromTo('.form-header-premium',
                { y: 20, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.6,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: '.form-header-premium',
                        start: 'top 90%',
                        toggleActions: 'play none none none'
                    }
                }
            );

            // Form fields staggered reveal with elegant timing
            gsap.fromTo('.form-field-animated',
                { y: 25, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.45,
                    stagger: 0.06,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: '.contact-form-inner',
                        start: 'top 85%',
                        toggleActions: 'play none none none'
                    }
                }
            );

            // Submit button special entrance
            gsap.fromTo('.submit-btn-premium',
                { y: 20, opacity: 0, scale: 0.95 },
                {
                    y: 0,
                    opacity: 1,
                    scale: 1,
                    duration: 0.5,
                    ease: 'back.out(1.5)',
                    scrollTrigger: {
                        trigger: '.submit-btn-premium',
                        start: 'top 95%',
                        toggleActions: 'play none none none'
                    }
                }
            );

            // Subtle floating decorative elements
            gsap.to('.contact-float-element', {
                y: -15,
                duration: 4,
                ease: 'sine.inOut',
                repeat: -1,
                yoyo: true,
                stagger: {
                    each: 0.8,
                    from: 'random'
                }
            });

            // Gradient orbs subtle breathing animation
            gsap.to('.gradient-orb', {
                scale: 1.15,
                opacity: 0.5,
                duration: 5,
                ease: 'sine.inOut',
                repeat: -1,
                yoyo: true,
                stagger: 1.5
            });

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        // Button loading animation
        gsap.to('.submit-btn-premium', {
            scale: 0.98,
            duration: 0.2,
            ease: 'power2.out'
        });
        
        // Simulate API call
        await new Promise(r => setTimeout(r, 2000));
        
        setIsSubmitting(false);
        setSubmitted(true);

        // Success animation sequence
        const successTl = gsap.timeline();
        
        successTl
            .fromTo('.form-success',
                { opacity: 0, scale: 0.9 },
                { opacity: 1, scale: 1, duration: 0.4, ease: 'power2.out' }
            )
            .fromTo('.success-checkmark',
                { scale: 0, rotation: -180 },
                { scale: 1, rotation: 0, duration: 0.6, ease: 'elastic.out(1, 0.5)' },
                '-=0.2'
            )
            .fromTo('.form-success h4',
                { y: 15, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.4, ease: 'power2.out' },
                '-=0.3'
            )
            .fromTo('.form-success p',
                { y: 10, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.4, ease: 'power2.out' },
                '-=0.2'
            )
            .fromTo('.form-success .btn-outline',
                { y: 10, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.3, ease: 'power2.out' },
                '-=0.1'
            );
    };
    
    const handleResetForm = () => {
        // Animate out success state
        gsap.to('.form-success', {
            opacity: 0,
            scale: 0.95,
            duration: 0.3,
            ease: 'power2.in',
            onComplete: () => {
                setSubmitted(false);
                setFormData({
                    name: '',
                    email: '',
                    company: '',
                    country: '',
                    product: '',
                    message: ''
                });
            }
        });
    };

    const contactMethods = [
        {
            id: 'whatsapp',
            icon: '💬',
            title: 'WhatsApp',
            subtitle: 'Instant Response',
            href: 'https://wa.me/919790005649?text=Hi! I\'m interested in your cardamom products.',
            color: '#25D366',
            external: true
        },
        {
            id: 'phone',
            icon: '📞',
            title: 'Call Us',
            subtitle: '+91 97900 05649',
            href: 'tel:+919790005649',
            color: '#4A6B35',
            external: false
        },
        {
            id: 'email',
            icon: '✉️',
            title: 'Email',
            subtitle: 'info@emperorspices.com',
            href: 'mailto:info@emperorspices.com',
            color: '#C9A654',
            external: false
        }
    ];

    return (
        <section id="contact" className="contact-section-premium" ref={sectionRef} data-nav-theme="light">
            {/* Animated Background */}
            <div className="contact-bg-layer">
                {/* Large background text */}
                <div className="contact-bg-text" ref={bgTextRef}>CONTACT</div>
                
                {/* Gradient orbs */}
                <div className="gradient-orb orb-1" />
                <div className="gradient-orb orb-2" />
                <div className="gradient-orb orb-3" />
                
                {/* Decorative lines */}
                <svg className="contact-deco-lines" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <path className="deco-line line-1" d="M0,50 Q25,30 50,50 T100,50" />
                    <path className="deco-line line-2" d="M0,60 Q25,40 50,60 T100,60" />
                </svg>
            </div>

            {/* Floating decorative elements */}
            <div className="contact-float-element float-1">🌿</div>
            <div className="contact-float-element float-2">✨</div>
            <div className="contact-float-element float-3">🌱</div>

            <div className="contact-container">
                {/* Header */}
                <div className="contact-header" ref={headerRef}>
                    <div className="contact-label">
                        <span className="contact-label-line" />
                        <span className="contact-label-text">Get in Touch</span>
                    </div>
                    <h2 className="contact-title">
                        <span className="contact-title-word">Let's</span>{' '}
                        <span className="contact-title-word">Start</span>{' '}
                        <span className="contact-title-word">Your</span>{' '}
                        <span className="contact-title-word contact-title-accent">Journey</span>
                    </h2>
                    <p className="contact-subtitle">
                        Partner with India's finest cardamom exporters for premium quality and reliable worldwide shipping.
                    </p>
                </div>

                {/* Main Content Grid */}
                <div className="contact-grid">
                    {/* Left Panel - Contact Info */}
                    <div className="contact-left-panel" ref={leftPanelRef}>
                        {/* Contact Method Cards */}
                        <div className="contact-methods" ref={cardsContainerRef}>
                            {contactMethods.map((method) => (
                                <a
                                    key={method.id}
                                    href={method.href}
                                    target={method.external ? '_blank' : undefined}
                                    rel={method.external ? 'noopener noreferrer' : undefined}
                                    className={`contact-method-card ${activeCard === method.id ? 'active' : ''}`}
                                    onMouseEnter={() => setActiveCard(method.id)}
                                    onMouseLeave={() => setActiveCard(null)}
                                    style={{ '--accent-color': method.color }}
                                >
                                    <div className="method-icon-wrapper">
                                        <span className="method-icon">{method.icon}</span>
                                        <div className="method-icon-bg" />
                                    </div>
                                    <div className="method-content">
                                        <span className="method-title">{method.title}</span>
                                        <span className="method-subtitle">{method.subtitle}</span>
                                    </div>
                                    <div className="method-arrow">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M5 12h14M12 5l7 7-7 7" />
                                        </svg>
                                    </div>
                                    <div className="method-hover-bg" />
                                </a>
                            ))}
                        </div>

                        {/* Location Card */}
                        <div className="contact-location">
                            <div className="location-icon-wrapper">
                                <span className="location-pin">📍</span>
                            </div>
                            <div className="location-content">
                                <h4>Visit Our Facility</h4>
                                <p>S.F.NO:552/1F-30W, Gandhi Nagar,<br />Bodinayakanur – 625513,<br />Tamil Nadu, India</p>
                                <div className="location-tags">
                                    <span className="location-tag">🏭 Factory Tours</span>
                                    <span className="location-tag">✈️ 3hrs from Madurai</span>
                                </div>
                            </div>
                        </div>

                        {/* Stats Strip */}
                        <div className="contact-stats-strip">
                            <div className="stat-item">
                                <span className="stat-number">40+</span>
                                <span className="stat-text">Countries</span>
                            </div>
                            <div className="stat-divider" />
                            <div className="stat-item">
                                <span className="stat-number">24h</span>
                                <span className="stat-text">Response</span>
                            </div>
                            <div className="stat-divider" />
                            <div className="stat-item">
                                <span className="stat-number">1000+</span>
                                <span className="stat-text">Tons/Year</span>
                            </div>
                        </div>
                    </div>

                    {/* Right Panel - Form */}
                    <div className="contact-right-panel" ref={rightPanelRef}>
                        <div className="contact-form-card">
                            {/* Form Header */}
                            <div className="form-header-premium">
                                <div className="form-header-icon">📋</div>
                                <div>
                                    <h3>Request a Quote</h3>
                                    <p>We'll respond within 24 hours</p>
                                </div>
                            </div>

                            {submitted ? (
                                <div className="form-success">
                                    <div className="success-checkmark">✓</div>
                                    <h4>Thank You!</h4>
                                    <p>Your inquiry has been received. Our team will contact you within 24 hours.</p>
                                    <button 
                                        onClick={handleResetForm} 
                                        className="btn-outline"
                                    >
                                        Send Another Inquiry
                                    </button>
                                </div>
                            ) : (
                                <form ref={formRef} onSubmit={handleSubmit} className="contact-form-inner">
                                    <div className="form-row">
                                        <div className="form-field-animated">
                                            <input
                                                type="text"
                                                id="name"
                                                required
                                                value={formData.name}
                                                onChange={(e) => handleInputChange(e, 'name')}
                                                onFocus={(e) => handleFieldFocus('name', e.target)}
                                                onBlur={(e) => handleFieldBlur('name', e.target)}
                                                autoComplete="name"
                                            />
                                            <label htmlFor="name">Your Name *</label>
                                            <div className="field-line" />
                                            <div className="field-glow" />
                                        </div>
                                        <div className="form-field-animated">
                                            <input
                                                type="email"
                                                id="email"
                                                required
                                                value={formData.email}
                                                onChange={(e) => handleInputChange(e, 'email')}
                                                onFocus={(e) => handleFieldFocus('email', e.target)}
                                                onBlur={(e) => handleFieldBlur('email', e.target)}
                                                autoComplete="email"
                                            />
                                            <label htmlFor="email">Email Address *</label>
                                            <div className="field-line" />
                                            <div className="field-glow" />
                                        </div>
                                    </div>

                                    <div className="form-row">
                                        <div className="form-field-animated">
                                            <input
                                                type="text"
                                                id="company"
                                                value={formData.company}
                                                onChange={(e) => handleInputChange(e, 'company')}
                                                onFocus={(e) => handleFieldFocus('company', e.target)}
                                                onBlur={(e) => handleFieldBlur('company', e.target)}
                                                autoComplete="organization"
                                            />
                                            <label htmlFor="company">Company Name</label>
                                            <div className="field-line" />
                                            <div className="field-glow" />
                                        </div>
                                        <div className="form-field-animated">
                                            <select
                                                id="country"
                                                value={formData.country}
                                                onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                                                className={formData.country ? 'has-value' : ''}
                                            >
                                                <option value="">Select Country</option>
                                                <option value="uae">UAE</option>
                                                <option value="saudi">Saudi Arabia</option>
                                                <option value="kuwait">Kuwait</option>
                                                <option value="qatar">Qatar</option>
                                                <option value="usa">USA</option>
                                                <option value="uk">United Kingdom</option>
                                                <option value="germany">Germany</option>
                                                <option value="singapore">Singapore</option>
                                                <option value="malaysia">Malaysia</option>
                                                <option value="other">Other</option>
                                            </select>
                                            <div className="field-line" />
                                        </div>
                                    </div>

                                    <div className="form-field-animated full-width">
                                        <select
                                            id="product"
                                            value={formData.product}
                                            onChange={(e) => setFormData({ ...formData, product: e.target.value })}
                                            className={formData.product ? 'has-value' : ''}
                                        >
                                            <option value="">Select Product Interest</option>
                                            <option value="ageb">AGEB - Extra Bold (8mm+)</option>
                                            <option value="agb">AGB - Bold (7-8mm)</option>
                                            <option value="ags">AGS - Special (6-7mm)</option>
                                            <option value="seeds">Cardamom Seeds</option>
                                            <option value="powder">Cardamom Powder</option>
                                            <option value="multiple">Multiple Products</option>
                                        </select>
                                        <div className="field-line" />
                                    </div>

                                    <div className="form-field-animated full-width">
                                        <textarea
                                            id="message"
                                            rows={4}
                                            value={formData.message}
                                            onChange={(e) => handleInputChange(e, 'message')}
                                            onFocus={(e) => handleFieldFocus('message', e.target)}
                                            onBlur={(e) => handleFieldBlur('message', e.target)}
                                        />
                                        <label htmlFor="message">Your Requirements</label>
                                        <div className="field-line" />
                                        <div className="field-glow" />
                                    </div>

                                    <button 
                                        type="submit" 
                                        className="submit-btn-premium" 
                                        disabled={isSubmitting}
                                    >
                                        <span className="btn-text">
                                            {isSubmitting ? 'Sending...' : 'Get Your Quote'}
                                        </span>
                                        <span className="btn-icon">
                                            {isSubmitting ? (
                                                <span className="spinner" />
                                            ) : (
                                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                    <path d="M5 12h14M12 5l7 7-7 7" />
                                                </svg>
                                            )}
                                        </span>
                                        <div className="btn-shine" />
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default InteractiveContactSection;
