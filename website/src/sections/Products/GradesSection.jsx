import React from 'react';
import { FadeInUp, StaggerChildren } from '../../components/ScrollAnimations';
import { useContact } from '../../contexts/ContactContext';

const GradesSection = () => {
    const { openContact } = useContact();

    // Grades data with color coding
    const grades = [
        { code: 'ESJ', name: 'Emperor Special Jumbo', size: '8.2mm', colorName: 'Violet', colorHex: '#8B5CF6' },
        { code: 'EJ', name: 'Emperor Jumbo', size: '7.8mm Bold', colorName: 'Red', colorHex: '#EF4444' },
        { code: 'ESB', name: 'Emperor Special Bold', size: '7.8mm', colorName: 'Blue', colorHex: '#3B82F6' },
        { code: 'EB', name: 'Emperor Bold', size: '7.3mm', colorName: 'Orange', colorHex: '#F97316' },
        { code: 'ESM', name: 'Emperor Special Medium', size: '6.5mm', colorName: 'Ocean Green', colorHex: '#06B6D4' },
        { code: 'EM', name: 'Emperor Medium', size: '6mm', colorName: 'Magenta Pink', colorHex: '#EC4899' },
    ];

    return (
        <section className="section section-white section-center" id="grades">
            <div className="container">
                <FadeInUp>
                    <span className="section-label">Quality Standards</span>
                    <h2 className="section-title">
                        Grades as per your <span className="script">Requirement</span>
                    </h2>
                    <p className="section-subtitle mx-auto" style={{ marginBottom: '2rem' }}>
                        Emperor Spices pioneered the color-coded grading system that has become the industry standard
                    </p>
                </FadeInUp>

                {/* Grades Cards Grid */}
                <StaggerChildren stagger={0.1}>
                    <div className="grades-grid">
                        {grades.map((grade, index) => (
                            <div
                                key={index}
                                className="grade-card"
                                style={{ '--grade-color': grade.colorHex }}
                            >
                                <div className="grade-code" style={{ color: grade.colorHex }}>
                                    {grade.code}
                                </div>
                                <div className="grade-size">{grade.size}</div>
                                <div className="grade-name">{grade.colorName}</div>
                            </div>
                        ))}
                    </div>
                </StaggerChildren>

                <FadeInUp delay={0.4}>
                    <p style={{
                        maxWidth: '800px',
                        margin: '3rem auto 0',
                        color: 'var(--color-stone-600)',
                        lineHeight: '1.8'
                    }}>
                        We specialize in the supply of premium quality green cardamom, catering to both domestic
                        and international markets. Our longstanding legacy and commitment to quality have earned
                        us recognition as an eminent green cardamom supplier in India.
                    </p>
                </FadeInUp>

                {/* Expert Advice CTA */}
                <FadeInUp delay={0.5}>
                    <div style={{
                        background: 'var(--color-stone-100)',
                        borderRadius: '100px',
                        padding: '0.75rem 1.5rem',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '1rem',
                        marginTop: '2rem'
                    }}>
                        <span style={{ fontSize: '1.5rem' }}>📋</span>
                        <span style={{ fontSize: '0.9rem', color: 'var(--color-stone-600)' }}>
                            Need help choosing the right grade for your requirements?
                        </span>
                        <button
                            onClick={() => openContact('Grade Inquiry')}
                            className="btn btn-primary"
                            style={{ padding: '0.5rem 1rem', fontSize: '0.8rem' }}
                        >
                            Get Expert Advice
                        </button>
                    </div>
                </FadeInUp>
            </div>
        </section>
    );
};

export default GradesSection;
