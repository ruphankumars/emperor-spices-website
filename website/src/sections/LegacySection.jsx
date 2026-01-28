import React, { useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const LegacySection = () => {
    const sectionRef = useRef(null);
    const statsRef = useRef(null);

    const stats = [
        { value: 60, suffix: '+', label: 'Years of Excellence' },
        { value: 40, suffix: '+', label: 'Countries Worldwide' },
        { value: 1000, suffix: '+', label: 'Tons Annually' },
        { value: 500, suffix: '+', label: 'Partners Globally' },
    ];

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Stats count-up animation
            const statValues = statsRef.current?.querySelectorAll('.stat-value-num');
            statValues?.forEach((val, i) => {
                const target = stats[i].value;
                gsap.fromTo(val,
                    { innerText: 0 },
                    {
                        innerText: target,
                        duration: 2,
                        ease: 'power2.out',
                        snap: { innerText: 1 },
                        scrollTrigger: {
                            trigger: statsRef.current,
                            start: 'top 80%',
                            toggleActions: 'play none none reverse',
                        },
                    }
                );
            });

            // Stagger stats entrance
            gsap.fromTo('.stat-item',
                { opacity: 0, y: 40 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    stagger: 0.15,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: statsRef.current,
                        start: 'top 85%',
                    },
                }
            );

            // Legacy content animations
            gsap.fromTo('.legacy-label',
                { opacity: 0, y: 30 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    scrollTrigger: {
                        trigger: '.legacy-content',
                        start: 'top 80%',
                    },
                }
            );

            gsap.fromTo('.legacy-title',
                { opacity: 0, y: 50 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    scrollTrigger: {
                        trigger: '.legacy-content',
                        start: 'top 75%',
                    },
                }
            );

            gsap.fromTo('.legacy-text',
                { opacity: 0, y: 30 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    scrollTrigger: {
                        trigger: '.legacy-content',
                        start: 'top 70%',
                    },
                }
            );

            // Heritage image parallax
            gsap.to('.legacy-image', {
                yPercent: -15,
                ease: 'none',
                scrollTrigger: {
                    trigger: '.legacy-content',
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: 1,
                },
            });

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={sectionRef}>
            {/* Stats Strip */}
            <div className="stats-strip" ref={statsRef}>
                {stats.map((stat, index) => (
                    <div key={index} className="stat-item">
                        <div className="stat-value">
                            <span className="stat-value-num">{stat.value}</span>
                            <span>{stat.suffix}</span>
                        </div>
                        <div className="stat-label">{stat.label}</div>
                    </div>
                ))}
            </div>

            {/* Legacy Content */}
            <section id="legacy" className="section section-light legacy-content">
                <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
                    {/* Text Content */}
                    <div>
                        <span className="section-label legacy-label">Our Heritage</span>
                        <h2 className="section-title legacy-title">
                            Our Legacy of <span className="script">Excellence</span>
                        </h2>
                        <p className="section-subtitle legacy-text">
                            Emperor Spices stands proud as a premier cardamom exporter in India, deeply rooted in
                            the lush hills of the Western Ghats. With decades of expertise, we have become known
                            for quality, sustainability, and exceptional organic cardamom products.
                        </p>
                        <p className="section-subtitle legacy-text" style={{ marginTop: '1rem' }}>
                            Our journey began in 1969 when our founder arrived as a migrant to Bodinayakanur,
                            starting as an accountant in a cardamom shop before becoming an individual cardamom trader.
                            Today, we are proud to be a leading exporter of premium Indian green cardamom.
                        </p>
                    </div>

                    {/* Image */}
                    <div className="legacy-image-wrapper" style={{ position: 'relative', borderRadius: '24px', overflow: 'hidden', height: '500px' }}>
                        <img
                            src="/images/heritage-warehouse.png"
                            alt="Emperor Spices Heritage Warehouse"
                            className="legacy-image"
                            style={{ width: '100%', height: '120%', objectFit: 'cover', position: 'absolute', top: '-10%' }}
                        />
                        <div style={{
                            position: 'absolute',
                            bottom: '2rem',
                            left: '2rem',
                            background: 'rgba(255,255,255,0.95)',
                            padding: '1.5rem',
                            borderRadius: '16px',
                            backdropFilter: 'blur(10px)'
                        }}>
                            <div style={{ fontSize: '2rem', fontWeight: '700', color: 'var(--color-forest)' }}>Since 1969</div>
                            <div style={{ fontSize: '0.9rem', color: 'var(--color-stone-600)' }}>Bodinayakanur, Tamil Nadu</div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default LegacySection;
