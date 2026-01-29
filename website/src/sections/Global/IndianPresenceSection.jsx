
import React, { useState } from 'react';
import { FadeInUp } from '../../components/ScrollAnimations';
import Modal from '../../components/Modal';
import { MapPin, Building2 } from 'lucide-react';
import { useLenisContext } from '../../contexts/LenisContext';

const IndianPresenceSection = () => {
    const [showMapPopup, setShowMapPopup] = useState(false);
    const { scrollToElement } = useLenisContext();

    // Complete list of business cities organized by region
    const regions = [
        {
            name: 'North & Central India',
            color: '#8B5CF6',
            cities: ['Jammu', 'Ladakh', 'Ludhiana', 'Chandigarh', 'Dhuri', 'Meerut', 'Agra', 'Gwalior', 'Jhansi', 'Kanpur', 'Gorakhpur', 'Varanasi', 'Prayagraj', 'Satna', 'Bhopal', 'Jabalpur']
        },
        {
            name: 'West India',
            color: '#F97316',
            cities: ['Bikaner', 'Jodhpur', 'Ajmer', 'Kota', 'Udaipur', 'Rajkot', 'Nadiad', 'Surat', 'Mumbai', 'Pune', 'Kolhapur', 'Sangli', 'Akola', 'Amravati', 'Nagpur']
        },
        {
            name: 'East & Northeast India',
            color: '#3B82F6',
            cities: ['Gaya', 'Jamshedpur', 'Murshidabad', 'Kolkata', 'Siliguri', 'Purnia', 'Guwahati', 'Barpeta Road', 'Dhubri', 'Tinsukia', 'Dimapur', 'Tezpur']
        },
        {
            name: 'South & East Coast',
            color: '#22C55E',
            cities: ['Bilaspur', 'Raipur', 'Gondia', 'Cuttack', 'Brahmapur', 'Visakhapatnam', 'Rajamahendravaram', 'Hyderabad', 'Vijayawada', 'Latur', 'Belagavi', 'Haveri', 'Shivamogga', 'Bengaluru', 'Chennai', 'Salem']
        }
    ];

    const totalCities = regions.reduce((sum, r) => sum + r.cities.length, 0);

    return (
        <>
            <section className="section india-presence-section" style={{ background: '#f0f0f0' }} id="india">
                <div className="container">
                    <div className="india-grid" style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr',
                        gap: '4rem',
                        alignItems: 'center'
                    }}>
                        {/* Map Side */}
                        <FadeInUp>
                            <div
                                className="india-map-container"
                                onClick={() => setShowMapPopup(true)}
                                style={{
                                    borderRadius: '12px',
                                    overflow: 'hidden',
                                    boxShadow: '0 10px 40px rgba(0,0,0,0.15)',
                                    cursor: 'pointer',
                                    transition: 'transform 0.3s ease, box-shadow 0.3s ease'
                                }}
                            >
                                <img
                                    src="/images/ui/india_presence_map.png"
                                    alt="India Map with presence locations"
                                    style={{ width: '100%', display: 'block' }}
                                />
                            </div>
                        </FadeInUp>

                        {/* Content Side */}
                        <FadeInUp delay={0.2}>
                            <div className="india-content">
                                <h2 style={{
                                    fontFamily: 'var(--font-display)',
                                    fontSize: '2.5rem',
                                    fontWeight: '700',
                                    marginBottom: '1.5rem'
                                }}>
                                    Our Indian <span className="script">presence</span>
                                </h2>

                                <p style={{
                                    color: 'var(--color-stone-600)',
                                    lineHeight: '1.8',
                                    marginBottom: '2rem'
                                }}>
                                    We deal with more than <strong>15+ states</strong> inside India with a successful
                                    business operations headed & managed for more than <strong>3 generations</strong>.
                                </p>

                                {/* Quick Stats */}
                                <div className="india-stats" style={{
                                    display: 'flex',
                                    gap: '2rem',
                                    marginBottom: '2rem'
                                }}>
                                    <div style={{ textAlign: 'center' }}>
                                        <div style={{
                                            fontSize: '2rem',
                                            fontWeight: '700',
                                            color: 'var(--color-forest)'
                                        }}>{totalCities}+</div>
                                        <div style={{ fontSize: '0.85rem', color: 'var(--color-stone-500)' }}>Cities</div>
                                    </div>
                                    <div style={{ textAlign: 'center' }}>
                                        <div style={{
                                            fontSize: '2rem',
                                            fontWeight: '700',
                                            color: 'var(--color-forest)'
                                        }}>4</div>
                                        <div style={{ fontSize: '0.85rem', color: 'var(--color-stone-500)' }}>Regions</div>
                                    </div>
                                    <div style={{ textAlign: 'center' }}>
                                        <div style={{
                                            fontSize: '2rem',
                                            fontWeight: '700',
                                            color: 'var(--color-forest)'
                                        }}>3</div>
                                        <div style={{ fontSize: '0.85rem', color: 'var(--color-stone-500)' }}>Generations</div>
                                    </div>
                                </div>

                                <button
                                    onClick={() => setShowMapPopup(true)}
                                    className="btn"
                                    style={{
                                        background: '#1a1a1a',
                                        color: 'white',
                                        padding: '1rem 2rem',
                                        borderRadius: '50px',
                                        fontSize: '0.95rem',
                                        fontWeight: '500',
                                        border: 'none',
                                        cursor: 'pointer'
                                    }}
                                >
                                    Learn More
                                </button>
                            </div>
                        </FadeInUp>
                    </div>
                </div>

                <style>{`
                    @media (max-width: 768px) {
                        .india-grid {
                            grid-template-columns: 1fr !important;
                            gap: 1.5rem !important;
                        }
                        .india-map-container {
                            order: -1;
                            width: 100% !important;
                            max-width: 100%;
                        }
                        .india-map-container img {
                            width: 100%;
                            min-height: 280px;
                            object-fit: contain;
                        }
                        .india-content h2 {
                            font-size: 1.75rem !important;
                            text-align: center;
                        }
                        .india-content p {
                            text-align: center;
                            font-size: 0.9rem;
                        }
                        .india-stats {
                            justify-content: center;
                        }
                        .india-content .btn {
                            display: block;
                            width: 100%;
                            text-align: center;
                        }
                    }
                `}</style>
            </section>

            {/* Indian Presence Map Popup - Innovative City Display */}
            <Modal
                isOpen={showMapPopup}
                onClose={() => setShowMapPopup(false)}
                title="Pan-India Business Network"
                size="xlarge"
            >
                <div>
                    {/* Hero Map */}
                    <div style={{
                        position: 'relative',
                        marginBottom: '2rem'
                    }}>
                        <img
                            src="/images/ui/india_presence_map.png"
                            alt="Emperor Spices Pan-India Presence"
                            style={{
                                width: '100%',
                                borderRadius: '16px',
                                maxHeight: '350px',
                                objectFit: 'cover'
                            }}
                        />
                        <div style={{
                            position: 'absolute',
                            bottom: '1.5rem',
                            left: '1.5rem',
                            background: 'rgba(0,0,0,0.8)',
                            backdropFilter: 'blur(10px)',
                            padding: '1rem 1.5rem',
                            borderRadius: '12px',
                            display: 'flex',
                            gap: '2rem'
                        }}>
                            <div style={{ textAlign: 'center' }}>
                                <div style={{ fontSize: '1.75rem', fontWeight: '700', color: 'var(--color-gold)' }}>{totalCities}+</div>
                                <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase' }}>Cities</div>
                            </div>
                            <div style={{ textAlign: 'center' }}>
                                <div style={{ fontSize: '1.75rem', fontWeight: '700', color: 'var(--color-gold)' }}>15+</div>
                                <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase' }}>States</div>
                            </div>
                            <div style={{ textAlign: 'center' }}>
                                <div style={{ fontSize: '1.75rem', fontWeight: '700', color: 'var(--color-gold)' }}>3</div>
                                <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase' }}>Generations</div>
                            </div>
                        </div>
                    </div>

                    {/* Regional City Grid */}
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(2, 1fr)',
                        gap: '1.5rem'
                    }}>
                        {regions.map((region, index) => (
                            <div
                                key={index}
                                style={{
                                    background: 'var(--color-stone-50)',
                                    borderRadius: '16px',
                                    padding: '1.5rem',
                                    border: `2px solid ${region.color} 20`,
                                    position: 'relative',
                                    overflow: 'hidden'
                                }}
                            >
                                {/* Region Header */}
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.75rem',
                                    marginBottom: '1rem'
                                }}>
                                    <div style={{
                                        width: '40px',
                                        height: '40px',
                                        background: `${region.color} 20`,
                                        borderRadius: '10px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}>
                                        <Building2 size={20} style={{ color: region.color }} />
                                    </div>
                                    <div>
                                        <h3 style={{
                                            fontFamily: 'var(--font-display)',
                                            fontSize: '1rem',
                                            fontWeight: '600',
                                            margin: 0,
                                            color: region.color
                                        }}>
                                            {region.name}
                                        </h3>
                                        <span style={{
                                            fontSize: '0.75rem',
                                            color: 'var(--color-stone-500)'
                                        }}>
                                            {region.cities.length} cities
                                        </span>
                                    </div>
                                </div>

                                {/* City Tags */}
                                <div style={{
                                    display: 'flex',
                                    flexWrap: 'wrap',
                                    gap: '0.5rem'
                                }}>
                                    {region.cities.map((city, cityIndex) => (
                                        <span
                                            key={cityIndex}
                                            style={{
                                                display: 'inline-flex',
                                                alignItems: 'center',
                                                gap: '0.25rem',
                                                background: 'white',
                                                padding: '0.35rem 0.75rem',
                                                borderRadius: '20px',
                                                fontSize: '0.8rem',
                                                color: 'var(--color-stone-700)',
                                                boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
                                                transition: 'all 0.2s ease'
                                            }}
                                        >
                                            <MapPin size={12} style={{ color: region.color }} />
                                            {city}
                                        </span>
                                    ))}
                                </div>

                                {/* Decorative accent */}
                                <div style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    width: '100%',
                                    height: '4px',
                                    background: `linear - gradient(90deg, ${region.color}, ${region.color}50)`
                                }} />
                            </div>
                        ))}
                    </div>

                    {/* CTA */}
                    <div style={{
                        marginTop: '2rem',
                        padding: '1.5rem',
                        background: 'linear-gradient(135deg, var(--color-forest) 0%, #1a3a2a 100%)',
                        borderRadius: '16px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                    }}>
                        <div>
                            <h4 style={{ color: 'white', marginBottom: '0.25rem', fontSize: '1.1rem' }}>
                                Want to partner with us?
                            </h4>
                            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem', margin: 0 }}>
                                Join our growing network of satisfied partners across India
                            </p>
                        </div>
                        <button
                            onClick={() => {
                                setShowMapPopup(false);
                                setTimeout(() => {
                                    scrollToElement('contact', {
                                        offset: -80,
                                        duration: 2.0,
                                    });
                                }, 300);
                            }}
                            className="btn"
                            style={{
                                background: 'white',
                                color: 'var(--color-forest)',
                                padding: '0.875rem 1.5rem',
                                borderRadius: '8px',
                                fontWeight: '600',
                                border: 'none',
                                cursor: 'pointer'
                            }}
                        >
                            Get in Touch
                        </button>
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default IndianPresenceSection;
