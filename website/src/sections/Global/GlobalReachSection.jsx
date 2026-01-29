import React, { useEffect, useRef, useState, lazy, Suspense } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ErrorBoundary from '../../components/ErrorBoundary';

gsap.registerPlugin(ScrollTrigger);

// Lazy load the 3D globe for performance
const Globe3D = lazy(() => import('../../components/Globe3D'));

const GlobalReachSection = () => {
    const sectionRef = useRef(null);
    const [showGlobe, setShowGlobe] = useState(false);
    const [hoveredRegion, setHoveredRegion] = useState(null);

    const regions = {
        'Middle East': {
            countries: ['UAE', 'Saudi Arabia', 'Kuwait', 'Qatar', 'Oman', 'Bahrain'],
            icon: '🕌',
            highlight: 'Primary market for Arabic coffee'
        },
        'Europe': {
            countries: ['UK', 'Germany', 'France', 'Netherlands', 'Belgium'],
            icon: '🏰',
            highlight: 'Fine dining & bakery sector'
        },
        'Americas': {
            countries: ['USA', 'Canada', 'Mexico'],
            icon: '🗽',
            highlight: 'Growing specialty spice market'
        },
        'Asia Pacific': {
            countries: ['Japan', 'Korea', 'Singapore', 'Malaysia'],
            icon: '🏯',
            highlight: 'Premium tea & confectionery'
        },
    };

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Trigger globe loading when section is visible
            ScrollTrigger.create({
                trigger: sectionRef.current,
                start: 'top 90%',
                onEnter: () => setShowGlobe(true),
            });

            // Section header animations
            gsap.fromTo('.global-label',
                { opacity: 0, y: 30 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 75%',
                    },
                }
            );

            gsap.fromTo('.global-title',
                { opacity: 0, y: 50 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 70%',
                    },
                }
            );

            gsap.fromTo('.global-desc',
                { opacity: 0, y: 30 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 65%',
                    },
                }
            );

            // Stagger region cards
            gsap.fromTo('.region-card',
                { opacity: 0, x: -50 },
                {
                    opacity: 1,
                    x: 0,
                    duration: 0.6,
                    stagger: 0.1,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: '.regions-grid',
                        start: 'top 80%',
                    },
                }
            );

            // Globe entrance
            gsap.fromTo('.global-globe-wrapper',
                { opacity: 0, scale: 0.8 },
                {
                    opacity: 1,
                    scale: 1,
                    duration: 1.2,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: '.global-globe-wrapper',
                        start: 'top 80%',
                    },
                }
            );

            // Background text parallax
            gsap.to('.global-bg-text', {
                yPercent: -20,
                ease: 'none',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: 1,
                },
            });

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            id="global"
            className="section section-dark"
            ref={sectionRef}
            style={{ paddingBottom: '8rem', position: 'relative', overflow: 'hidden' }}
        >
            {/* Large background text */}
            <div
                className="global-bg-text"
                style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    fontSize: 'clamp(8rem, 20vw, 18rem)',
                    fontFamily: 'var(--font-display)',
                    fontWeight: '800',
                    color: 'rgba(255, 255, 255, 0.03)',
                    whiteSpace: 'nowrap',
                    pointerEvents: 'none',
                    zIndex: 0,
                }}
            >
                GLOBAL
            </div>

            <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '4rem', alignItems: 'center' }}>
                    {/* Left Content */}
                    <div>
                        <span className="section-label section-label-light global-label">Export Reach</span>
                        <h2 className="section-title text-white global-title" style={{ marginBottom: '1.5rem' }}>
                            Beyond <span className="script text-gold">Borders</span>
                        </h2>
                        <p className="global-desc" style={{ color: 'rgba(255,255,255,0.7)', marginBottom: '2rem', lineHeight: '1.8' }}>
                            Our cardamom reaches kitchens, factories, and markets across 40+ countries.
                            From Arabic coffee in the Gulf to gourmet bakeries in Europe.
                        </p>

                        {/* Region Cards */}
                        <div className="regions-grid" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {Object.entries(regions).map(([region, data]) => (
                                <div
                                    key={region}
                                    className="region-card"
                                    onMouseEnter={() => setHoveredRegion(region)}
                                    onMouseLeave={() => setHoveredRegion(null)}
                                    style={{
                                        background: hoveredRegion === region
                                            ? 'rgba(156, 175, 136, 0.2)'
                                            : 'rgba(255, 255, 255, 0.05)',
                                        border: hoveredRegion === region
                                            ? '1px solid rgba(156, 175, 136, 0.4)'
                                            : '1px solid rgba(255, 255, 255, 0.1)',
                                        borderRadius: '12px',
                                        padding: '1rem 1.25rem',
                                        cursor: 'pointer',
                                        transition: 'all 0.3s ease',
                                        transform: hoveredRegion === region ? 'translateX(8px)' : 'none',
                                    }}
                                >
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                        <span style={{ fontSize: '1.5rem' }}>{data.icon}</span>
                                        <div>
                                            <h4 style={{
                                                color: 'var(--color-gold)',
                                                fontSize: '0.85rem',
                                                fontWeight: '600',
                                                marginBottom: '0.25rem'
                                            }}>
                                                {region}
                                            </h4>
                                            <p style={{
                                                color: 'rgba(255,255,255,0.6)',
                                                fontSize: '0.8rem',
                                                margin: 0
                                            }}>
                                                {data.countries.join(' • ')}
                                            </p>
                                        </div>
                                    </div>
                                    {/* Always render highlight, use opacity for smooth transition */}
                                    <p style={{
                                        color: 'rgba(156, 175, 136, 0.9)',
                                        fontSize: '0.75rem',
                                        marginTop: '0.5rem',
                                        marginLeft: '2.5rem',
                                        fontStyle: 'italic',
                                        opacity: hoveredRegion === region ? 1 : 0,
                                        maxHeight: hoveredRegion === region ? '50px' : '0',
                                        overflow: 'hidden',
                                        transition: 'opacity 0.2s ease, max-height 0.2s ease',
                                    }}>
                                        {data.highlight}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right - 3D Globe */}
                    <div className="global-globe-wrapper" style={{ position: 'relative', height: '550px' }}>
                        {showGlobe ? (
                            <Suspense fallback={
                                <div style={{
                                    width: '100%',
                                    height: '100%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    background: 'radial-gradient(circle at center, rgba(45, 74, 62, 0.3) 0%, transparent 70%)',
                                    borderRadius: '50%'
                                }}>
                                    <div style={{
                                        color: 'rgba(255,255,255,0.5)',
                                        fontSize: '0.9rem',
                                        textAlign: 'center'
                                    }}>
                                        Loading Globe...
                                    </div>
                                </div>
                            }>
                                <ErrorBoundary
                                    message="Globe visualization unavailable"
                                    fallback={
                                        <div style={{
                                            width: '100%',
                                            height: '100%',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            background: 'radial-gradient(circle at center, rgba(45, 74, 62, 0.2) 0%, transparent 70%)',
                                            borderRadius: '50%'
                                        }}>
                                            <div style={{ textAlign: 'center', color: '#666' }}>
                                                <p style={{ fontSize: '48px', margin: 0 }}>🌍</p>
                                                <p style={{ margin: '10px 0 0' }}>40+ countries • 6 continents</p>
                                            </div>
                                        </div>
                                    }
                                >
                                    <Globe3D />
                                </ErrorBoundary>
                            </Suspense>
                        ) : (
                            <div style={{
                                width: '100%',
                                height: '100%',
                                background: 'radial-gradient(circle at center, rgba(45, 74, 62, 0.3) 0%, transparent 70%)',
                                borderRadius: '50%'
                            }} />
                        )}

                        {/* Stats Overlay - hidden on mobile since globe shows these */}
                        <div className="globe-stats-overlay" style={{
                            position: 'absolute',
                            bottom: '2rem',
                            right: '2rem',
                            display: 'flex',
                            gap: '2rem',
                            background: 'rgba(0,0,0,0.6)',
                            backdropFilter: 'blur(10px)',
                            padding: '1.25rem 1.5rem',
                            borderRadius: '16px',
                            border: '1px solid rgba(255,255,255,0.1)',
                        }}>
                            <div style={{ textAlign: 'center' }}>
                                <div style={{
                                    fontSize: '2rem',
                                    fontWeight: '700',
                                    color: 'var(--color-gold)',
                                    fontFamily: 'var(--font-display)'
                                }}>40+</div>
                                <div style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Countries</div>
                            </div>
                            <div style={{ textAlign: 'center' }}>
                                <div style={{
                                    fontSize: '2rem',
                                    fontWeight: '700',
                                    color: 'var(--color-gold)',
                                    fontFamily: 'var(--font-display)'
                                }}>6</div>
                                <div style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Continents</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
                @media (max-width: 1024px) {
                    #global .container > div {
                        grid-template-columns: 1fr !important;
                    }
                    .global-globe-wrapper {
                        height: 400px !important;
                        order: -1;
                    }
                }
                @media (max-width: 768px) {
                    #global {
                        padding-top: 2rem !important;
                        padding-bottom: 3rem !important;
                    }
                    #global .container > div {
                        grid-template-columns: 1fr !important;
                        gap: 1rem !important;
                    }
                    .global-globe-wrapper {
                        height: 200px !important;
                        order: -1;
                        margin-bottom: 0;
                    }
                    .global-globe-wrapper > div:last-child {
                        /* Stats overlay - make smaller */
                        bottom: 0.5rem !important;
                        right: 50% !important;
                        transform: translateX(50%);
                        padding: 0.5rem 1rem !important;
                        gap: 1.5rem !important;
                    }
                    .global-globe-wrapper > div:last-child > div > div:first-child {
                        font-size: 1.25rem !important;
                    }
                    .global-globe-wrapper > div:last-child > div > div:last-child {
                        font-size: 0.55rem !important;
                    }
                    .global-label {
                        font-size: 0.65rem !important;
                        margin-bottom: 0.25rem;
                    }
                    .global-title {
                        font-size: 1.5rem !important;
                        margin-bottom: 0.5rem !important;
                    }
                    .global-desc {
                        font-size: 0.8rem !important;
                        margin-bottom: 1rem !important;
                        line-height: 1.5 !important;
                    }
                    .regions-grid {
                        display: grid !important;
                        grid-template-columns: repeat(2, 1fr) !important;
                        gap: 0.5rem !important;
                    }
                    .region-card {
                        padding: 0.6rem 0.75rem !important;
                        border-radius: 10px !important;
                    }
                    .region-card > div > span {
                        font-size: 1.1rem !important;
                    }
                    .region-card h4 {
                        font-size: 0.75rem !important;
                        margin-bottom: 0.1rem !important;
                    }
                    .region-card p {
                        font-size: 0.65rem !important;
                    }
                    .global-bg-text {
                        font-size: 5rem !important;
                    }
                    .globe-stats-overlay {
                        display: none !important;
                    }
                }
            `}</style>
        </section>
    );
};

export default GlobalReachSection;
