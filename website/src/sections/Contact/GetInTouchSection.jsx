import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Phone, Mail, MapPin, Send } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const GetInTouchSection = () => {
    const sectionRef = useRef(null);
    const [formData, setFormData] = useState({
        fullName: '',
        lastName: '',
        phone: '',
        email: '',
        subject: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Header animation
            gsap.fromTo('.contact-header',
                { opacity: 0, y: 50 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 80%',
                    }
                }
            );

            // Left content animation
            gsap.fromTo('.contact-info',
                { opacity: 0, x: -50 },
                {
                    opacity: 1,
                    x: 0,
                    duration: 0.8,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 75%',
                    }
                }
            );

            // Form animation
            gsap.fromTo('.contact-form',
                { opacity: 0, x: 50 },
                {
                    opacity: 1,
                    x: 0,
                    duration: 0.8,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 75%',
                    }
                }
            );

            // Contact items stagger
            gsap.fromTo('.contact-item',
                { opacity: 0, y: 20 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.5,
                    stagger: 0.1,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: '.contact-info',
                        start: 'top 80%',
                    }
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate form submission
        await new Promise(resolve => setTimeout(resolve, 1500));

        setIsSubmitting(false);
        setSubmitted(true);

        // Reset after showing success
        setTimeout(() => {
            setSubmitted(false);
            setFormData({
                fullName: '',
                lastName: '',
                phone: '',
                email: '',
                subject: '',
                message: ''
            });
        }, 3000);
    };

    return (
        <section className="section section-light get-in-touch-section" id="contact" ref={sectionRef}>
            <div className="container">
                <div className="contact-header" style={{ marginBottom: '3rem', textAlign: 'center' }}>
                    <span className="section-label">REACH OUT</span>
                    <h2 className="section-title">
                        Get in <span className="script">Touch</span>
                    </h2>
                </div>

                <div className="git-grid" data-lenis-prevent style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1.2fr',
                    gap: '4rem',
                    alignItems: 'start'
                }}>
                    {/* Left Column - Contact Info */}
                    <div className="contact-info" style={{
                        background: 'var(--color-stone-100)',
                        padding: '2.5rem',
                        borderRadius: '16px'
                    }}>
                        <h3 style={{
                            fontFamily: 'var(--font-display)',
                            fontSize: '1.75rem',
                            fontWeight: '600',
                            marginBottom: '1.5rem',
                            color: 'var(--color-forest)'
                        }}>
                            Get in Touch
                        </h3>

                        <p className="git-desc" style={{
                            color: 'var(--color-stone-600)',
                            lineHeight: '1.8',
                            marginBottom: '2rem'
                        }}>
                            Thank you for considering Emperor Spices as your premier green cardamom supplier.
                            Whether you're looking for a large quantity of Indian green cardamom for your trading
                            or a small amount for your personal use.
                        </p>

                        <p className="git-desc-2" style={{
                            color: 'var(--color-stone-600)',
                            lineHeight: '1.8',
                            marginBottom: '2rem'
                        }}>
                            Contact us today to learn more about our products and services, or to place an order.
                            If you have any questions, please don't hesitate to get in touch with us.
                        </p>

                        {/* Contact Items */}
                        <div className="git-contact-items" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                            <div className="contact-item" style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '1rem'
                            }}>
                                <div style={{
                                    background: 'var(--color-forest)',
                                    color: 'white',
                                    width: '40px',
                                    height: '40px',
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    <Phone size={18} />
                                </div>
                                <div>
                                    <span style={{ fontWeight: '600', color: 'var(--color-forest)' }}>
                                        +91 97900 05649
                                    </span>
                                </div>
                            </div>

                            <div className="contact-item" style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '1rem'
                            }}>
                                <div style={{
                                    background: 'var(--color-forest)',
                                    color: 'white',
                                    width: '40px',
                                    height: '40px',
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    <Mail size={18} />
                                </div>
                                <div>
                                    <span style={{ fontWeight: '600', color: 'var(--color-forest)' }}>
                                        info@emperorspices.in
                                    </span>
                                </div>
                            </div>

                            <div className="contact-item" style={{
                                display: 'flex',
                                alignItems: 'flex-start',
                                gap: '1rem'
                            }}>
                                <div style={{
                                    background: 'var(--color-forest)',
                                    color: 'white',
                                    width: '40px',
                                    height: '40px',
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    flexShrink: 0
                                }}>
                                    <MapPin size={18} />
                                </div>
                                <div>
                                    <span style={{ fontWeight: '600', color: 'var(--color-forest)' }}>
                                        9b/1 Colony Street,<br />
                                        Bodinayakanur, TN, IN. 625513
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Contact Form */}
                    <div className="contact-form">
                        <form onSubmit={handleSubmit} style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '1.25rem'
                        }}>
                            <div className="git-form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
                                <div>
                                    <label style={{
                                        display: 'block',
                                        marginBottom: '0.5rem',
                                        fontWeight: '500',
                                        color: 'var(--color-stone-700)'
                                    }}>
                                        Full Name *
                                    </label>
                                    <input
                                        type="text"
                                        name="fullName"
                                        value={formData.fullName}
                                        onChange={handleChange}
                                        required
                                        style={{
                                            width: '100%',
                                            padding: '0.875rem 1rem',
                                            borderRadius: '8px',
                                            border: '1px solid var(--color-stone-300)',
                                            background: 'var(--color-stone-100)',
                                            fontSize: '1rem',
                                            transition: 'all 0.3s ease'
                                        }}
                                    />
                                </div>
                                <div>
                                    <label style={{
                                        display: 'block',
                                        marginBottom: '0.5rem',
                                        fontWeight: '500',
                                        color: 'var(--color-stone-700)'
                                    }}>
                                        Last Name *
                                    </label>
                                    <input
                                        type="text"
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={handleChange}
                                        required
                                        style={{
                                            width: '100%',
                                            padding: '0.875rem 1rem',
                                            borderRadius: '8px',
                                            border: '1px solid var(--color-stone-300)',
                                            background: 'var(--color-stone-100)',
                                            fontSize: '1rem',
                                            transition: 'all 0.3s ease'
                                        }}
                                    />
                                </div>
                            </div>

                            <div>
                                <label style={{
                                    display: 'block',
                                    marginBottom: '0.5rem',
                                    fontWeight: '500',
                                    color: 'var(--color-stone-700)'
                                }}>
                                    Phone *
                                </label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    required
                                    style={{
                                        width: '100%',
                                        padding: '0.875rem 1rem',
                                        borderRadius: '8px',
                                        border: '1px solid var(--color-stone-300)',
                                        background: 'var(--color-stone-100)',
                                        fontSize: '1rem',
                                        transition: 'all 0.3s ease'
                                    }}
                                />
                            </div>

                            <div>
                                <label style={{
                                    display: 'block',
                                    marginBottom: '0.5rem',
                                    fontWeight: '500',
                                    color: 'var(--color-stone-700)'
                                }}>
                                    Email *
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    style={{
                                        width: '100%',
                                        padding: '0.875rem 1rem',
                                        borderRadius: '8px',
                                        border: '1px solid var(--color-stone-300)',
                                        background: 'var(--color-stone-100)',
                                        fontSize: '1rem',
                                        transition: 'all 0.3s ease'
                                    }}
                                />
                            </div>

                            <div>
                                <label style={{
                                    display: 'block',
                                    marginBottom: '0.5rem',
                                    fontWeight: '500',
                                    color: 'var(--color-stone-700)'
                                }}>
                                    Subject
                                </label>
                                <input
                                    type="text"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    style={{
                                        width: '100%',
                                        padding: '0.875rem 1rem',
                                        borderRadius: '8px',
                                        border: '1px solid var(--color-stone-300)',
                                        background: 'var(--color-stone-100)',
                                        fontSize: '1rem',
                                        transition: 'all 0.3s ease'
                                    }}
                                />
                            </div>

                            <div>
                                <label style={{
                                    display: 'block',
                                    marginBottom: '0.5rem',
                                    fontWeight: '500',
                                    color: 'var(--color-stone-700)'
                                }}>
                                    Message
                                </label>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    rows={5}
                                    style={{
                                        width: '100%',
                                        padding: '0.875rem 1rem',
                                        borderRadius: '8px',
                                        border: '1px solid var(--color-stone-300)',
                                        background: 'var(--color-stone-100)',
                                        fontSize: '1rem',
                                        resize: 'vertical',
                                        fontFamily: 'inherit',
                                        transition: 'all 0.3s ease'
                                    }}
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting || submitted}
                                style={{
                                    background: submitted ? 'var(--color-success)' : 'var(--color-forest)',
                                    color: 'white',
                                    padding: '1rem 2rem',
                                    borderRadius: '8px',
                                    border: 'none',
                                    fontSize: '1rem',
                                    fontWeight: '600',
                                    cursor: isSubmitting ? 'wait' : 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '0.5rem',
                                    transition: 'all 0.3s ease',
                                    opacity: isSubmitting ? 0.7 : 1
                                }}
                            >
                                {submitted ? (
                                    'Message Sent!'
                                ) : isSubmitting ? (
                                    'Sending...'
                                ) : (
                                    <>
                                        Submit <Send size={18} />
                                    </>
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            <style>{`
                @media (max-width: 768px) {
                    .get-in-touch-section {
                        padding: 1.5rem 4% !important;
                    }
                    .get-in-touch-section .contact-header {
                        margin-bottom: 1rem !important;
                    }
                    .get-in-touch-section .section-label {
                        font-size: 0.65rem !important;
                    }
                    .get-in-touch-section .section-title {
                        font-size: 1.25rem !important;
                    }
                    
                    /* Single vertical scrollable card */
                    .git-grid {
                        display: flex !important;
                        flex-direction: column !important;
                        gap: 0 !important;
                        background: var(--color-stone-100) !important;
                        border-radius: 16px !important;
                        height: 65vh !important;
                        max-height: 65vh !important;
                        overflow: scroll !important;
                        overflow-x: hidden !important;
                        overflow-y: scroll !important;
                        -webkit-overflow-scrolling: touch !important;
                        overscroll-behavior: contain !important;
                        scroll-behavior: smooth !important;
                    }
                    
                    /* Contact info section */
                    .contact-info {
                        order: 1 !important;
                        padding: 1.25rem !important;
                        border-radius: 16px 16px 0 0 !important;
                        background: transparent !important;
                    }
                    .contact-info h3 {
                        font-size: 1.1rem !important;
                        margin-bottom: 0.75rem !important;
                    }
                    .git-desc, .git-desc-2 {
                        font-size: 0.8rem !important;
                        margin-bottom: 0.75rem !important;
                        line-height: 1.6 !important;
                    }
                    .git-contact-items {
                        gap: 0.75rem !important;
                        margin-top: 0.5rem !important;
                    }
                    .contact-item > div:first-child {
                        width: 36px !important;
                        height: 36px !important;
                    }
                    .contact-item span {
                        font-size: 0.8rem !important;
                    }
                    
                    /* Form section */
                    .contact-form {
                        order: 2 !important;
                        padding: 1.25rem !important;
                        border-top: 1px solid var(--color-stone-200) !important;
                    }
                    .contact-form form {
                        gap: 0.875rem !important;
                    }
                    .git-form-row {
                        grid-template-columns: 1fr 1fr !important;
                        gap: 0.75rem !important;
                    }
                    .contact-form label {
                        font-size: 0.8rem !important;
                        margin-bottom: 0.25rem !important;
                    }
                    .contact-form input,
                    .contact-form textarea {
                        padding: 0.7rem 0.875rem !important;
                        font-size: 0.9rem !important;
                        border-radius: 8px !important;
                    }
                    .contact-form textarea {
                        min-height: 70px !important;
                    }
                    .contact-form button {
                        padding: 0.875rem 1.5rem !important;
                        font-size: 0.95rem !important;
                        border-radius: 8px !important;
                        margin-top: 0.25rem !important;
                    }
                }
            `}</style>
        </section>
    );
};

export default GetInTouchSection;
