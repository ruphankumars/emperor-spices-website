import React, { useEffect, useRef } from 'react';
import { Diamond, Truck, Shield, Leaf } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const DifferenceSection = () => {
    const sectionRef = useRef(null);

    const pillars = [
        {
            icon: Diamond,
            title: 'Uncompromised Quality',
            description: 'Every pod meets our rigorous 7-point quality check before export.',
            color: 'linear-gradient(135deg, #D4A849 0%, #E8C97A 100%)',
        },
        {
            icon: Truck,
            title: 'Source-Direct Supply',
            description: 'Direct from our plantations in Bodinayakanur to your warehouse.',
            color: 'linear-gradient(135deg, #2D4A3E 0%, #6B8058 100%)',
        },
        {
            icon: Shield,
            title: 'Certified Excellence',
            description: 'FSSAI, ISO 22000, HACCP certified for global compliance.',
            color: 'linear-gradient(135deg, #9CAF88 0%, #C5D4B7 100%)',
        },
        {
            icon: Leaf,
            title: 'Sustainable Practices',
            description: 'Eco-friendly farming with solar-powered processing facilities.',
            color: 'linear-gradient(135deg, #2D4A3E 0%, #9CAF88 100%)',
        },
    ];

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Section header animations
            gsap.fromTo('.difference-label',
                { opacity: 0, y: 30 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 80%',
                    },
                }
            );

            gsap.fromTo('.difference-title',
                { opacity: 0, y: 50 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    delay: 0.1,
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 80%',
                    },
                }
            );

            gsap.fromTo('.difference-subtitle',
                { opacity: 0, y: 30 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    delay: 0.2,
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 80%',
                    },
                }
            );

            // Staggered card entrance with scale and rotation
            gsap.fromTo('.pillar-card',
                {
                    opacity: 0,
                    y: 80,
                    scale: 0.9,
                    rotateY: -10,
                },
                {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    rotateY: 0,
                    duration: 0.8,
                    stagger: 0.15,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: '.pillars-grid',
                        start: 'top 80%',
                    },
                }
            );

            // Icon spin animation on reveal
            gsap.fromTo('.pillar-icon',
                { rotation: -180, scale: 0 },
                {
                    rotation: 0,
                    scale: 1,
                    duration: 0.8,
                    stagger: 0.15,
                    ease: 'back.out(1.7)',
                    scrollTrigger: {
                        trigger: '.pillars-grid',
                        start: 'top 75%',
                    },
                }
            );

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section id="difference" className="section section-white section-center" ref={sectionRef}>
            <div className="container">
                <span className="section-label difference-label">Why Emperor Spices</span>
                <h2 className="section-title difference-title">
                    The <span className="script">Emperor</span> Difference
                </h2>
                <p className="section-subtitle difference-subtitle mx-auto">
                    Four pillars that make us the preferred choice for premium cardamom worldwide
                </p>

                <div className="pillars-grid" style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(4, 1fr)',
                    gap: '1.5rem',
                    marginTop: '4rem'
                }}>
                    {pillars.map((pillar, index) => (
                        <div
                            key={index}
                            className="pillar-card"
                            style={{
                                background: 'white',
                                padding: '2.5rem 2rem',
                                borderRadius: '24px',
                                textAlign: 'center',
                                boxShadow: '0 10px 40px rgba(0,0,0,0.08)',
                                border: '1px solid rgba(0,0,0,0.05)',
                                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                                cursor: 'pointer',
                                perspective: '1000px',
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-10px) scale(1.02)';
                                e.currentTarget.style.boxShadow = '0 20px 60px rgba(0,0,0,0.15)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                                e.currentTarget.style.boxShadow = '0 10px 40px rgba(0,0,0,0.08)';
                            }}
                        >
                            <div
                                className="pillar-icon"
                                style={{
                                    width: '72px',
                                    height: '72px',
                                    borderRadius: '20px',
                                    background: pillar.color,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    margin: '0 auto 1.5rem',
                                    color: 'white',
                                    boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
                                }}
                            >
                                <pillar.icon size={32} />
                            </div>
                            <h3 style={{
                                fontFamily: 'var(--font-display)',
                                fontSize: '1.25rem',
                                fontWeight: '600',
                                marginBottom: '0.75rem',
                                color: 'var(--color-stone-900)'
                            }}>
                                {pillar.title}
                            </h3>
                            <p style={{
                                fontSize: '0.95rem',
                                color: 'var(--color-stone-600)',
                                lineHeight: '1.6'
                            }}>
                                {pillar.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            <style>{`
                @media (max-width: 1024px) {
                    .pillars-grid {
                        grid-template-columns: repeat(2, 1fr) !important;
                    }
                }
                @media (max-width: 640px) {
                    .pillars-grid {
                        grid-template-columns: repeat(2, 1fr) !important;
                        gap: 0.75rem !important;
                    }
                    .pillar-card {
                        padding: 1.25rem 1rem !important;
                    }
                    .pillar-icon {
                        width: 56px !important;
                        height: 56px !important;
                        margin-bottom: 1rem !important;
                    }
                    .pillar-card h3 {
                        font-size: 1rem !important;
                    }
                    .pillar-card p {
                        font-size: 0.8rem !important;
                    }
                }
            `}</style>
        </section>
    );
};

export default DifferenceSection;
