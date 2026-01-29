import React from 'react';
import { Heart, Brain, Sparkles, Shield, ArrowRight } from 'lucide-react';

const HealthSection = () => {
    const benefits = [
        {
            icon: Heart,
            title: 'Digestive Health',
            description: 'Cardamom aids digestion and helps relieve nausea, bloating, and gas.',
        },
        {
            icon: Brain,
            title: 'Cognitive Function',
            description: 'Rich in antioxidants that support brain health and mental clarity.',
        },
        {
            icon: Sparkles,
            title: 'Oral Health',
            description: 'Natural antibacterial properties help freshen breath and fight cavities.',
        },
        {
            icon: Shield,
            title: 'Blood Pressure',
            description: 'Studies show cardamom may help lower blood pressure naturally.',
        },
    ];

    return (
        <section className="section section-light section-center" id="health">
            <div className="container">
                <div className="scroll-indicator mx-auto mb-4" style={{ justifyContent: 'center' }}>
                    Scroll to explore <ArrowRight size={16} />
                </div>

                <span className="section-label">Doctor of Spices</span>
                <h2 className="section-title">
                    Nature's <span className="script">Medicine</span>
                </h2>
                <p className="section-subtitle mx-auto">
                    Cardamom has been treasured for its medicinal properties for over 4,000 years in traditional medicine systems.
                </p>

                {/* Benefits Grid */}
                <div className="grid-4" style={{ marginTop: '2rem' }}>
                    {benefits.map((benefit, index) => (
                        <div key={index} className="card" style={{ padding: '2rem', textAlign: 'center' }}>
                            <div style={{
                                width: '60px',
                                height: '60px',
                                borderRadius: '50%',
                                background: 'var(--color-sage-light)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                margin: '0 auto 1.5rem',
                                color: 'var(--color-forest)'
                            }}>
                                <benefit.icon size={28} />
                            </div>
                            <h3 className="card-title">{benefit.title}</h3>
                            <p className="card-text">{benefit.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HealthSection;
