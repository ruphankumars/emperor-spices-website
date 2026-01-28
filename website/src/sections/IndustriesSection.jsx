import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { X, ArrowRight } from 'lucide-react';
import Modal from '../components/Modal';
import { useLenisContext } from '../contexts/LenisContext';

gsap.registerPlugin(ScrollTrigger);

const IndustriesSection = () => {
    const sectionRef = useRef(null);
    const [selectedIndustry, setSelectedIndustry] = useState(null);
    const { scrollToElement } = useLenisContext();

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo('.industries-label',
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

            gsap.fromTo('.industries-title',
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

            gsap.fromTo('.industries-subtitle',
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

            gsap.fromTo('.industry-card',
                { opacity: 0, y: 80, scale: 0.85 },
                {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 0.7,
                    stagger: 0.1,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: '.industries-grid',
                        start: 'top 85%',
                    },
                }
            );

            gsap.fromTo('.industry-stat',
                { opacity: 0, y: 30, scale: 0.8 },
                {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 0.6,
                    stagger: 0.15,
                    ease: 'back.out(1.7)',
                    scrollTrigger: {
                        trigger: '.industries-stats',
                        start: 'top 90%',
                    },
                }
            );

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const industries = [
        {
            title: 'Arabic Coffee (Qahwa)',
            description: 'Premium 8mm+ pods for authentic Gulf coffee traditions',
            stat: '80% of Gulf imports',
            image: '/images/cardamom-content/cardamom_usage_arabic.png',
            blogContent: {
                title: 'The Art of Arabic Coffee with Cardamom',
                intro: 'Arabic coffee, known as Qahwa or Gahwa, is more than just a beverage—it\'s a symbol of hospitality and tradition that has been cherished in the Gulf region for centuries.',
                sections: [
                    {
                        heading: 'The Perfect Cardamom Grade',
                        content: 'For authentic Arabic coffee, only the finest 8mm+ green cardamom pods are suitable. These extra-bold pods (AGEB grade) provide the perfect balance of aromatic oils and flavor intensity that defines true Qahwa.'
                    },
                    {
                        heading: 'Traditional Preparation',
                        content: 'The cardamom pods are lightly crushed and added to light-roasted Arabic coffee beans. The mixture is brewed in a traditional dallah (coffee pot) and served in small cups called finjans. The aroma of fresh cardamom signifies welcome and respect.'
                    },
                    {
                        heading: 'Cultural Significance',
                        content: 'In Gulf countries, serving Arabic coffee with cardamom is an essential part of hospitality. It is offered at weddings, funerals, business meetings, and family gatherings. The quality of the cardamom directly reflects the host\'s respect for their guests.'
                    }
                ]
            }
        },
        {
            title: 'Food Processors',
            description: 'Consistent quality for masala blends and spice manufacturing',
            stat: '100+ partners',
            image: '/images/cardamom-content/cardamom_sorting.png',
            blogContent: {
                title: 'Cardamom in Food Processing Industry',
                intro: 'The food processing industry relies on consistent quality cardamom for creating standardized products ranging from instant chai mixes to premium masala blends.',
                sections: [
                    {
                        heading: 'Consistency is Key',
                        content: 'Food processors require cardamom with consistent oil content, moisture levels, and flavor profiles batch after batch. This ensures their products maintain the same taste that consumers expect.'
                    },
                    {
                        heading: 'Grade Selection',
                        content: 'Different products require different grades. Premium instant chai may use AGS (7.8mm) grade, while masala blends might use AGS-1 or AGS-2 grades for cost efficiency without compromising on flavor.'
                    },
                    {
                        heading: 'Volume and Reliability',
                        content: 'With over 100 food processing partners, we understand the importance of reliable supply chains. Our climate-controlled warehouses ensure year-round availability of all grades.'
                    }
                ]
            }
        },
        {
            title: 'Hotels & Restaurants',
            description: 'Premium grades for 5-star culinary excellence',
            stat: '500+ luxury hotels',
            image: '/images/cardamom-content/cardamom_biryani.png',
            blogContent: {
                title: 'Cardamom in Premium Hospitality',
                intro: '5-star hotels and fine dining restaurants demand the highest quality ingredients. Our premium cardamom grades meet and exceed the expectations of world-class chefs.',
                sections: [
                    {
                        heading: 'Culinary Applications',
                        content: 'From aromatic biryanis to delicate desserts, cardamom plays a crucial role in Indian and Middle Eastern cuisines. Luxury establishments use whole pods for biryani and ground cardamom for pastries and beverages.'
                    },
                    {
                        heading: 'Premium Grade Selection',
                        content: 'Michelin-starred restaurants and luxury hotels typically choose AGEB or AGB grades for their intense aroma and visual appeal. The vibrant green color adds to plate presentation.'
                    },
                    {
                        heading: 'Partnership Benefits',
                        content: 'We offer dedicated account management, customized packaging sizes, and priority supply during peak seasons to our hospitality partners.'
                    }
                ]
            }
        },
        {
            title: 'Bakery & Confectionery',
            description: 'Scandinavian buns, Middle Eastern sweets, and gourmet desserts',
            stat: 'Growing segment',
            image: '/images/cardamom-content/cardamom_dessert.png',
            blogContent: {
                title: 'Cardamom in Baking and Sweets',
                intro: 'From Swedish kardemummabullar to Middle Eastern baklava, cardamom has become an essential ingredient in bakeries and confectioneries worldwide.',
                sections: [
                    {
                        heading: 'Global Baking Traditions',
                        content: 'Scandinavian countries have embraced cardamom in their baking traditions. The famous Swedish cardamom buns require freshly ground premium cardamom for their distinctive taste.'
                    },
                    {
                        heading: 'Middle Eastern Sweets',
                        content: 'Turkish delight, kunafa, and maamoul all feature cardamom prominently. The spice adds a sophisticated note that complements the sweetness of these traditional confections.'
                    },
                    {
                        heading: 'Ground Cardamom Quality',
                        content: 'Bakeries require fine-ground cardamom with high oil content for maximum flavor release. We offer custom grinding services to meet specific Baker requirements.'
                    }
                ]
            }
        },
        {
            title: 'Pharmaceuticals',
            description: 'High oil content seeds for Ayurvedic and health products',
            stat: '8-10% oil content',
            image: '/images/cardamom-content/cardamom_sample.png',
            blogContent: {
                title: 'Cardamom in Health & Pharmaceuticals',
                intro: 'Cardamom has been used in traditional medicine for centuries. Modern pharmaceutical companies are now harnessing its therapeutic properties for health products.',
                sections: [
                    {
                        heading: 'Medicinal Properties',
                        content: 'Cardamom contains compounds like cineole and limonene that have anti-inflammatory, antimicrobial, and digestive properties. These make it valuable in Ayurvedic formulations.'
                    },
                    {
                        heading: 'Oil Extraction',
                        content: 'Pharmaceutical applications often require cardamom essential oil. Our AGEB grade with 8-10% oil content is ideal for oil extraction, ensuring maximum yield and potency.'
                    },
                    {
                        heading: 'Quality Certifications',
                        content: 'Pharmaceutical clients require stringent quality standards. Our cardamom is AGMARK certified and undergoes rigorous testing for pesticide residues and heavy metals.'
                    }
                ]
            }
        },
        {
            title: 'Retail Chains',
            description: 'Private label and branded packaging for supermarkets',
            stat: '15+ states',
            image: '/images/Emperor_brand_pouch/Emperor_brand_pouch_blue.jpg',
            blogContent: {
                title: 'Cardamom for Retail Distribution',
                intro: 'From local kirana stores to national supermarket chains, we provide packaging solutions that meet diverse retail requirements across India.',
                sections: [
                    {
                        heading: 'Private Label Services',
                        content: 'We offer private label packaging for retail chains looking to sell cardamom under their own brand. Our packaging facility can accommodate various pack sizes from 10g sachets to 500g pouches.'
                    },
                    {
                        heading: 'Nationwide Distribution',
                        content: 'With presence in 15+ states, we ensure timely delivery to distribution centers and individual stores. Our logistics network covers metro cities and tier-2/3 towns alike.'
                    },
                    {
                        heading: 'Retail-Ready Packaging',
                        content: 'Our color-coded packaging system helps retailers organize their spice sections effectively. The premium look of Emperor pouches drives higher retail value.'
                    }
                ]
            }
        },
    ];

    return (
        <>
            <section className="section section-dark section-center" id="industries" ref={sectionRef}>
                <div className="container">
                    <span className="section-label section-label-light industries-label">Who We Serve</span>
                    <h2 className="section-title text-white industries-title">
                        Trusted by <span className="script text-gold">Industries</span> Worldwide
                    </h2>
                    <p className="section-subtitle industries-subtitle" style={{ color: 'rgba(255,255,255,0.7)', maxWidth: '600px', margin: '0 auto' }}>
                        From Arabic coffee ceremonies to Michelin-star kitchens — our cardamom powers diverse industries
                    </p>

                    {/* 6-Card Grid - Clickable */}
                    <div className="grid-6 industries-grid" style={{ marginTop: '3rem' }}>
                        {industries.map((industry, index) => (
                            <div
                                key={index}
                                className="feature-card industry-card"
                                onClick={() => setSelectedIndustry(industry)}
                                style={{ cursor: 'pointer' }}
                            >
                                <img
                                    src={industry.image}
                                    alt={industry.title}
                                    className="feature-card-image"
                                />
                                <div className="feature-card-overlay"></div>
                                <div className="feature-card-content">
                                    <h3 className="feature-card-title">{industry.title}</h3>
                                    <p className="feature-card-text">{industry.description}</p>
                                    <p className="feature-card-stat">+ {industry.stat}</p>
                                    <span style={{
                                        fontSize: '0.75rem',
                                        color: 'var(--color-gold)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.25rem',
                                        marginTop: '0.5rem'
                                    }}>
                                        Read more <ArrowRight size={12} />
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Stats Row */}
                    <div className="industries-stats" style={{
                        display: 'flex',
                        justifyContent: 'center',
                        gap: '4rem',
                        marginTop: '3rem',
                        paddingTop: '2rem',
                        borderTop: '1px solid rgba(255,255,255,0.1)'
                    }}>
                        <div className="stat-item industry-stat">
                            <div className="stat-value">40+</div>
                            <div className="stat-label">Countries</div>
                        </div>
                        <div className="stat-item industry-stat">
                            <div className="stat-value">1000+</div>
                            <div className="stat-label">Tons/Year</div>
                        </div>
                        <div className="stat-item industry-stat">
                            <div className="stat-value">100%</div>
                            <div className="stat-label">Quality Assured</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Blog Popup Modal */}
            <Modal
                isOpen={selectedIndustry !== null}
                onClose={() => setSelectedIndustry(null)}
                title={selectedIndustry?.blogContent?.title || ''}
                size="large"
            >
                {selectedIndustry && (
                    <div>
                        {/* Hero Image */}
                        <div style={{
                            height: '250px',
                            borderRadius: '12px',
                            overflow: 'hidden',
                            marginBottom: '2rem'
                        }}>
                            <img
                                src={selectedIndustry.image}
                                alt={selectedIndustry.title}
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                        </div>

                        {/* Intro */}
                        <p style={{
                            fontSize: '1.1rem',
                            lineHeight: '1.8',
                            color: 'var(--color-stone-700)',
                            marginBottom: '2rem'
                        }}>
                            {selectedIndustry.blogContent.intro}
                        </p>

                        {/* Sections */}
                        {selectedIndustry.blogContent.sections.map((section, index) => (
                            <div key={index} style={{ marginBottom: '1.5rem' }}>
                                <h3 style={{
                                    fontFamily: 'var(--font-display)',
                                    fontSize: '1.25rem',
                                    fontWeight: '600',
                                    marginBottom: '0.75rem',
                                    color: 'var(--color-forest)'
                                }}>
                                    {section.heading}
                                </h3>
                                <p style={{ lineHeight: '1.7', color: 'var(--color-stone-600)' }}>
                                    {section.content}
                                </p>
                            </div>
                        ))}

                        {/* CTA */}
                        <div style={{
                            marginTop: '2rem',
                            padding: '1.5rem',
                            background: 'var(--color-forest)',
                            borderRadius: '12px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between'
                        }}>
                            <div>
                                <h4 style={{ color: 'white', marginBottom: '0.25rem' }}>Interested in partnering?</h4>
                                <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem' }}>Contact us for bulk inquiries</p>
                            </div>
                            <button
                                onClick={() => {
                                    setSelectedIndustry(null);
                                    setTimeout(() => {
                                        scrollToElement('contact', {
                                            offset: -80,
                                            duration: 2.0,
                                        });
                                    }, 300);
                                }}
                                className="btn"
                                style={{ background: 'white', color: 'var(--color-forest)' }}
                            >
                                Get in Touch
                            </button>
                        </div>
                    </div>
                )}
            </Modal>
        </>
    );
};

export default IndustriesSection;
