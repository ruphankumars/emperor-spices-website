import React, { useEffect, useRef } from 'react';
import { ArrowRight, Lock } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const PackagingSection = () => {
    const section1Ref = useRef(null);
    const section2Ref = useRef(null);

    const colors = [
        { name: 'Violet', grade: 'ESJ • 8.2mm', description: 'Arabian Coffee Excellence', image: '/images/concept_pouches/concept_violet.png', colorHex: '#8B5CF6' },
        { name: 'Red', grade: 'EJ • 7.8mm Bold', description: 'Global Export Grade', image: '/images/concept_pouches/concept_red.png', colorHex: '#EF4444' },
        { name: 'Blue', grade: 'ESB • 7.8mm', description: 'Premium Retail', image: '/images/concept_pouches/concept_blue.png', colorHex: '#3B82F6' },
        { name: 'Orange', grade: 'EB • 7.3mm', description: 'Hotel & Restaurant', image: '/images/concept_pouches/concept_orange.png', colorHex: '#F97316' },
        { name: 'Ocean Green', grade: 'ESM • 6.5mm', description: 'Bakery & Confectionery', image: '/images/concept_pouches/concept_oceangreen.png', colorHex: '#06B6D4' },
        { name: 'Magenta Pink', grade: 'EM • 6mm', description: 'Desserts & Sweets', image: '/images/concept_pouches/concept_pink.png', colorHex: '#EC4899' },
    ];

    useEffect(() => {
        const ctx = gsap.context(() => {
            // United Colors section animations
            gsap.fromTo('.colors-title',
                { opacity: 0, y: 50 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    scrollTrigger: {
                        trigger: section1Ref.current,
                        start: 'top 75%',
                    },
                }
            );

            gsap.fromTo('.colors-subtitle',
                { opacity: 0, y: 30 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    scrollTrigger: {
                        trigger: section1Ref.current,
                        start: 'top 70%',
                    },
                }
            );

            // Staggered pouch entrance with rotation
            gsap.fromTo('.color-pouch',
                { opacity: 0, y: 60, scale: 0.8, rotateY: -20 },
                {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    rotateY: 0,
                    duration: 0.8,
                    stagger: 0.12,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: '.pouches-container',
                        start: 'top 80%',
                    },
                }
            );

            // Aroma Lock section animations
            gsap.fromTo('.aroma-title',
                { opacity: 0, y: 50 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    scrollTrigger: {
                        trigger: section2Ref.current,
                        start: 'top 75%',
                    },
                }
            );

            gsap.fromTo('.aroma-subtitle',
                { opacity: 0, y: 30 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    scrollTrigger: {
                        trigger: section2Ref.current,
                        start: 'top 70%',
                    },
                }
            );

            // Lock icon spin entrance
            gsap.fromTo('.aroma-lock-icon',
                { opacity: 0, scale: 0, rotation: -180 },
                {
                    opacity: 1,
                    scale: 1,
                    rotation: 0,
                    duration: 1.2,
                    ease: 'elastic.out(1, 0.5)',
                    scrollTrigger: {
                        trigger: '.aroma-content',
                        start: 'top 80%',
                    },
                }
            );

            // Features list staggered entrance
            gsap.fromTo('.aroma-feature',
                { opacity: 0, x: -30 },
                {
                    opacity: 1,
                    x: 0,
                    duration: 0.5,
                    stagger: 0.1,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: '.aroma-content',
                        start: 'top 75%',
                    },
                }
            );

        });

        return () => ctx.revert();
    }, []);

    return (
        <>
            {/* United Colors Section */}
            <section className="section section-light section-center" id="packaging" ref={section1Ref}>
                <div className="container">
                    <h2 className="section-title colors-title">
                        The United <span className="script">Colors</span> of Cardamom
                    </h2>
                    <p className="section-subtitle mx-auto colors-subtitle">
                        Emperor Spices pioneered the color-coded grading system that has become the industry standard
                    </p>

                    {/* Color Pouches Display */}
                    <div className="pouches-container" style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(6, 1fr)',
                        gap: '1.5rem',
                        marginTop: '2rem',
                        marginLeft: 'auto',
                        marginRight: 'auto',
                        perspective: '1000px',
                        maxWidth: '1200px'
                    }}>
                        {colors.map((color, index) => (
                            <div key={index} className="color-pouch" style={{ textAlign: 'center', transformStyle: 'preserve-3d' }}>
                                <div className="pouch-image" style={{
                                    width: '100%',
                                    aspectRatio: '3/4',
                                    borderRadius: '16px',
                                    overflow: 'hidden',
                                    boxShadow: '0 10px 40px rgba(0,0,0,0.15)',
                                    marginBottom: '1rem',
                                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                                    cursor: 'pointer',
                                    border: `3px solid ${color.colorHex}20`,
                                }}>
                                    <img
                                        src={color.image}
                                        alt={color.name}
                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                    />
                                </div>
                                <div className="pouch-name" style={{ fontWeight: '700', fontSize: '1rem', color: color.colorHex }}>{color.name}</div>
                                <div className="pouch-grade" style={{ fontSize: '0.85rem', color: 'var(--color-stone-600)', fontWeight: '500' }}>{color.grade}</div>
                            </div>
                        ))}
                    </div>

                    <style>{`
                        @media (max-width: 1024px) {
                            .pouches-container {
                                grid-template-columns: repeat(3, 1fr) !important;
                                gap: 1rem !important;
                            }
                        }
                        @media (max-width: 640px) {
                            .pouches-container {
                                grid-template-columns: repeat(3, 1fr) !important;
                                gap: 0.5rem !important;
                            }
                            .pouch-image {
                                border-radius: 10px !important;
                                margin-bottom: 0.5rem !important;
                            }
                            .pouch-name {
                                font-size: 0.75rem !important;
                            }
                            .pouch-grade {
                                font-size: 0.6rem !important;
                            }
                        }
                    `}</style>
                </div>
            </section>

            {/* Aroma Lock Technology */}
            <section className="section section-white section-center aroma-lock-section" ref={section2Ref}>
                <div className="container">
                    <span className="section-label">Innovation</span>
                    <h2 className="section-title aroma-title">
                        Aroma Lock <sup style={{ fontSize: '1rem' }}>™</sup> Technology
                    </h2>
                    <p className="section-subtitle mx-auto aroma-subtitle">
                        Our specially designed high-tech, multi-layered packaging preserves the natural aroma
                        and freshness of cardamom from processing to your kitchen.
                    </p>

                    <div className="aroma-content" style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '3rem',
                        marginTop: '2rem',
                        flexWrap: 'wrap'
                    }}>
                        <div className="aroma-lock-icon" style={{
                            width: '200px',
                            height: '200px',
                            background: 'linear-gradient(135deg, var(--color-forest) 0%, var(--color-sage) 100%)',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white'
                        }}>
                            <Lock size={64} />
                        </div>
                        <div className="aroma-details" style={{ textAlign: 'left', maxWidth: '400px' }}>
                            <h3 style={{ fontFamily: 'var(--font-display)', marginBottom: '1rem' }}>
                                Triple-Layer Protection
                            </h3>
                            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                <li className="aroma-feature" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    ✓ <span>Moisture barrier film</span>
                                </li>
                                <li className="aroma-feature" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    ✓ <span>UV protection layer</span>
                                </li>
                                <li className="aroma-feature" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    ✓ <span>Aroma-seal technology</span>
                                </li>
                                <li className="aroma-feature" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    ✓ <span>Extended shelf life (24+ months)</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <style>{`
                    @media (max-width: 768px) {
                        .aroma-lock-section {
                            padding: 2rem 4% !important;
                        }
                        .aroma-lock-section .section-title {
                            font-size: 1.3rem !important;
                        }
                        .aroma-lock-section .section-subtitle {
                            font-size: 0.85rem !important;
                            margin-bottom: 1rem !important;
                        }
                        .aroma-content {
                            flex-direction: column !important;
                            gap: 1.5rem !important;
                            margin-top: 1rem !important;
                        }
                        .aroma-lock-icon {
                            width: 100px !important;
                            height: 100px !important;
                        }
                        .aroma-lock-icon svg {
                            width: 36px !important;
                            height: 36px !important;
                        }
                        .aroma-details {
                            text-align: center !important;
                        }
                        .aroma-details h3 {
                            font-size: 1.1rem !important;
                            margin-bottom: 0.75rem !important;
                        }
                        .aroma-details ul {
                            gap: 0.5rem !important;
                        }
                        .aroma-feature {
                            font-size: 0.85rem !important;
                            justify-content: center !important;
                        }
                    }
                `}</style>
            </section>
        </>
    );
};

export default PackagingSection;
