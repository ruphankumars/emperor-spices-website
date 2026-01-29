import React, { useEffect, useRef, useState } from 'react';
import { Building2, Store, ChefHat, Factory, ArrowRight, Phone, Mail, MapPin, Send } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Modal from '../../components/Modal';

gsap.registerPlugin(ScrollTrigger);

const NationwideSection = () => {
    const sectionRef = useRef(null);
    const [showContactModal, setShowContactModal] = useState(false);
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Section header animations
            gsap.fromTo('.nationwide-label',
                { opacity: 0, y: 20 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.6,
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 80%',
                    },
                }
            );

            gsap.fromTo('.nationwide-title',
                { opacity: 0, y: 40 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    delay: 0.1,
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 75%',
                    },
                }
            );

            gsap.fromTo('.nationwide-subtitle',
                { opacity: 0, y: 30 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.7,
                    delay: 0.2,
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 70%',
                    },
                }
            );

            // Staggered category cards with 3D effect
            gsap.fromTo('.nationwide-card',
                { opacity: 0, y: 60, rotateX: -15, scale: 0.9 },
                {
                    opacity: 1,
                    y: 0,
                    rotateX: 0,
                    scale: 1,
                    duration: 0.8,
                    stagger: 0.15,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: '.nationwide-grid',
                        start: 'top 85%',
                    },
                }
            );

            // Trust banner slide-in
            gsap.fromTo('.nationwide-trust',
                { opacity: 0, scale: 0.8, y: 30 },
                {
                    opacity: 1,
                    scale: 1,
                    y: 0,
                    duration: 0.8,
                    ease: 'back.out(1.7)',
                    scrollTrigger: {
                        trigger: '.nationwide-trust',
                        start: 'top 90%',
                    },
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
        await new Promise(resolve => setTimeout(resolve, 1500));
        setIsSubmitting(false);
        setSubmitted(true);
        setTimeout(() => {
            setSubmitted(false);
            setShowContactModal(false);
            setFormData({ fullName: '', email: '', phone: '', message: '' });
        }, 2000);
    };

    const categories = [
        { icon: Building2, title: '500+ Luxury Hotels', subtitle: '5-star properties' },
        { icon: Store, title: 'Modern Retail Chains', subtitle: 'BigBasket, DMart, Spencer\'s' },
        { icon: ChefHat, title: 'Restaurant Chains', subtitle: 'Premium dining' },
        { icon: Factory, title: 'Food Processors', subtitle: 'Masala manufacturers' },
    ];

    return (
        <>
            <section className="section section-dark section-center" id="nationwide" ref={sectionRef}>
                <div className="container">
                    <span className="section-label section-label-light nationwide-label">Our Reach</span>
                    <h2 className="section-title text-white nationwide-title">
                        Trusted <span className="script text-gold">Nationwide</span>
                    </h2>
                    <p className="section-subtitle nationwide-subtitle" style={{ color: 'rgba(255,255,255,0.7)', maxWidth: '500px', margin: '0 auto 2rem' }}>
                        From the aromatic hills of Western Ghats to the bustling markets of Mumbai, Delhi and Dubai.
                    </p>

                    <div className="grid-4 nationwide-grid" style={{ marginTop: '2rem' }}>
                        {categories.map((cat, index) => (
                            <div key={index} className="card-dark nationwide-card" style={{ padding: '1.5rem', borderRadius: '12px', textAlign: 'left', transformStyle: 'preserve-3d' }}>
                                <cat.icon size={24} style={{ color: 'var(--color-gold)', marginBottom: '1rem' }} />
                                <h3 style={{
                                    fontFamily: 'var(--font-display)',
                                    fontSize: '1.1rem',
                                    fontWeight: '600',
                                    color: 'white',
                                    marginBottom: '0.25rem'
                                }}>
                                    {cat.title}
                                </h3>
                                <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.6)' }}>
                                    {cat.subtitle}
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* Clickable Partner CTA - Opens Modal */}
                    <div
                        className="nationwide-trust"
                        onClick={() => setShowContactModal(true)}
                        style={{
                            marginTop: '3rem',
                            padding: '1rem 2rem',
                            background: 'rgba(255,255,255,0.1)',
                            borderRadius: '100px',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.75rem',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease'
                        }}
                    >
                        <span style={{ color: 'var(--color-gold)' }}>★</span>
                        <span style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.9)' }}>
                            Join our growing network of satisfied partners across the country
                        </span>
                        <ArrowRight size={16} style={{ color: 'var(--color-gold)' }} />
                    </div>

                    <div className="scroll-indicator mx-auto mt-4" style={{ justifyContent: 'center', color: 'rgba(255,255,255,0.5)' }}>
                        Scroll to explore <ArrowRight size={16} />
                    </div>
                </div>
            </section>

            {/* Get in Touch Modal */}
            <Modal
                isOpen={showContactModal}
                onClose={() => setShowContactModal(false)}
                title="Get in Touch"
                size="medium"
            >
                <div style={{ display: 'grid', gap: '2rem' }}>
                    <p style={{ color: 'var(--color-stone-600)', lineHeight: '1.7' }}>
                        Interested in partnering with Emperor Spices? Fill out the form below and our team will get back to you within 24 hours.
                    </p>

                    {/* Contact Details */}
                    <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            <Phone size={18} style={{ color: 'var(--color-forest)' }} />
                            <span>+91 97900 05649</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            <Mail size={18} style={{ color: 'var(--color-forest)' }} />
                            <span>info@emperorspices.in</span>
                        </div>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <input
                            type="text"
                            name="fullName"
                            placeholder="Full Name *"
                            value={formData.fullName}
                            onChange={handleChange}
                            required
                            style={{
                                padding: '0.875rem 1rem',
                                borderRadius: '8px',
                                border: '1px solid var(--color-stone-300)',
                                fontSize: '1rem'
                            }}
                        />
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                            <input
                                type="email"
                                name="email"
                                placeholder="Email *"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                style={{
                                    padding: '0.875rem 1rem',
                                    borderRadius: '8px',
                                    border: '1px solid var(--color-stone-300)',
                                    fontSize: '1rem'
                                }}
                            />
                            <input
                                type="tel"
                                name="phone"
                                placeholder="Phone"
                                value={formData.phone}
                                onChange={handleChange}
                                style={{
                                    padding: '0.875rem 1rem',
                                    borderRadius: '8px',
                                    border: '1px solid var(--color-stone-300)',
                                    fontSize: '1rem'
                                }}
                            />
                        </div>
                        <textarea
                            name="message"
                            placeholder="Tell us about your requirements..."
                            value={formData.message}
                            onChange={handleChange}
                            rows={4}
                            style={{
                                padding: '0.875rem 1rem',
                                borderRadius: '8px',
                                border: '1px solid var(--color-stone-300)',
                                fontSize: '1rem',
                                resize: 'vertical',
                                fontFamily: 'inherit'
                            }}
                        />
                        <button
                            type="submit"
                            disabled={isSubmitting || submitted}
                            style={{
                                background: submitted ? 'var(--color-success, #22c55e)' : 'var(--color-forest)',
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
                                gap: '0.5rem'
                            }}
                        >
                            {submitted ? '✓ Message Sent!' : isSubmitting ? 'Sending...' : <><Send size={18} /> Submit</>}
                        </button>
                    </form>
                </div>
            </Modal>
        </>
    );
};

export default NationwideSection;
