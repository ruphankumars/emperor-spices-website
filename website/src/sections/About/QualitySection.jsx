import React, { useState, useRef, useEffect } from 'react';
import { Droplets, Wind, Palette, FileText, Download, ExternalLink, X } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useContact } from '../../contexts/ContactContext';
import Modal from '../../components/Modal';

gsap.registerPlugin(ScrollTrigger);

const QualitySection = () => {
    const sectionRef = useRef(null);
    const [activeGrade, setActiveGrade] = useState('ESJ');
    const [showCOAModal, setShowCOAModal] = useState(false);
    const { openContact } = useContact();

    const grades = ['ESJ', 'EJ', 'ESB', 'EB', 'ESM', 'EM'];

    const parameters = {
        ESJ: {
            oil: { value: '7-8%', range: 'Premium', label: 'Essential Oil Content', desc: 'Aromatic intensity for Gulf markets' },
            moisture: { value: '<10%', range: 'Optimal', label: 'Moisture Content', desc: 'Extended shelf life guarantee' },
            color: { value: 'Deep Green', range: 'Grade A', label: 'Color Grade', desc: 'Visual premium quality indicator' },
        },
        EJ: {
            oil: { value: '6-7%', range: 'High', label: 'Essential Oil Content', desc: 'Rich aromatic profile' },
            moisture: { value: '<10%', range: 'Optimal', label: 'Moisture Content', desc: 'Consistent quality' },
            color: { value: 'Bright Green', range: 'Grade A', label: 'Color Grade', desc: 'Vibrant appearance' },
        },
        ESB: {
            oil: { value: '5-6%', range: 'Standard', label: 'Essential Oil Content', desc: 'Balanced flavor profile' },
            moisture: { value: '<11%', range: 'Good', label: 'Moisture Content', desc: 'Reliable storage' },
            color: { value: 'Green', range: 'Grade B+', label: 'Color Grade', desc: 'Good visual appeal' },
        },
        EB: {
            oil: { value: '4-5%', range: 'Value', label: 'Essential Oil Content', desc: 'Cost-effective solution' },
            moisture: { value: '<11%', range: 'Good', label: 'Moisture Content', desc: 'Stable quality' },
            color: { value: 'Light Green', range: 'Grade B', label: 'Color Grade', desc: 'Processing grade' },
        },
        ESM: {
            oil: { value: '3-4%', range: 'Economy', label: 'Essential Oil Content', desc: 'Budget-friendly option' },
            moisture: { value: '<12%', range: 'Standard', label: 'Moisture Content', desc: 'Suitable for processing' },
            color: { value: 'Mixed Green', range: 'Grade C+', label: 'Color Grade', desc: 'Industrial applications' },
        },
        EM: {
            oil: { value: '2-3%', range: 'Basic', label: 'Essential Oil Content', desc: 'Extract production grade' },
            moisture: { value: '<12%', range: 'Standard', label: 'Moisture Content', desc: 'Processing applications' },
            color: { value: 'Variable', range: 'Grade C', label: 'Color Grade', desc: 'Oil extraction grade' },
        },
    };

    const currentParams = parameters[activeGrade] || parameters.ESJ;

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Section header animations
            gsap.fromTo('.quality-label',
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

            gsap.fromTo('.quality-title',
                { opacity: 0, y: 50 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 75%',
                    },
                }
            );

            gsap.fromTo('.quality-subtitle',
                { opacity: 0, y: 30 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 70%',
                    },
                }
            );

            // Quality tabs staggered entrance
            gsap.fromTo('.quality-tab',
                { opacity: 0, y: 20 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.5,
                    stagger: 0.1,
                    scrollTrigger: {
                        trigger: '.quality-tabs',
                        start: 'top 85%',
                    },
                }
            );

            // Quality cards staggered entrance with scale
            gsap.fromTo('.quality-card',
                { opacity: 0, y: 60, scale: 0.9 },
                {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 0.8,
                    stagger: 0.15,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: '.quality-grid',
                        start: 'top 85%',
                    },
                }
            );

            // Quality icons pop in
            gsap.fromTo('.quality-icon',
                { scale: 0, rotation: -90 },
                {
                    scale: 1,
                    rotation: 0,
                    duration: 0.6,
                    stagger: 0.15,
                    ease: 'back.out(1.7)',
                    scrollTrigger: {
                        trigger: '.quality-grid',
                        start: 'top 80%',
                    },
                }
            );

            // COA banner slide in
            gsap.fromTo('.coa-banner',
                { opacity: 0, y: 40, scale: 0.95 },
                {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 0.8,
                    ease: 'back.out(1.2)',
                    scrollTrigger: {
                        trigger: '.coa-banner',
                        start: 'top 90%',
                    },
                }
            );

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section className="section section-light section-center" id="quality" ref={sectionRef}>
            <div className="container">
                <span className="section-label quality-label">Quality Assurance</span>
                <h2 className="section-title quality-title">
                    Quality <span className="script">Parameters</span>
                </h2>
                <p className="section-subtitle mx-auto quality-subtitle">
                    Every batch is tested for consistency with international export standards
                </p>

                {/* Grade Tabs */}
                <div className="quality-tabs" style={{ marginTop: '2rem' }}>
                    {grades.map((grade) => (
                        <button
                            key={grade}
                            className={`quality-tab ${activeGrade === grade ? 'active' : ''}`}
                            onClick={() => setActiveGrade(grade)}
                        >
                            {grade}
                        </button>
                    ))}
                </div>

                {/* Parameters Grid */}
                <div className="quality-grid">
                    <div className="quality-card">
                        <div className="quality-icon">
                            <Droplets size={32} color="var(--color-forest)" />
                        </div>
                        <div className="quality-value">{currentParams.oil.value}</div>
                        <div className="quality-range">{currentParams.oil.range}</div>
                        <div className="quality-label">{currentParams.oil.label}</div>
                        <div className="quality-desc">{currentParams.oil.desc}</div>
                    </div>

                    <div className="quality-card">
                        <div className="quality-icon">
                            <Wind size={32} color="var(--color-forest)" />
                        </div>
                        <div className="quality-value">{currentParams.moisture.value}</div>
                        <div className="quality-range">{currentParams.moisture.range}</div>
                        <div className="quality-label">{currentParams.moisture.label}</div>
                        <div className="quality-desc">{currentParams.moisture.desc}</div>
                    </div>

                    <div className="quality-card">
                        <div className="quality-icon">
                            <Palette size={32} color="var(--color-forest)" />
                        </div>
                        <div className="quality-value">{currentParams.color.value}</div>
                        <div className="quality-range">{currentParams.color.range}</div>
                        <div className="quality-label">{currentParams.color.label}</div>
                        <div className="quality-desc">{currentParams.color.desc}</div>
                    </div>
                </div>

                {/* COA Banner */}
                <div className="coa-banner">
                    <div className="coa-content">
                        <div className="coa-icon">
                            <FileText size={24} />
                        </div>
                        <div>
                            <div className="coa-title">Certificate of Analysis (COA)</div>
                            <div className="coa-text">
                                Every shipment includes a detailed COA with lab test results for your quality assurance team
                            </div>
                        </div>
                    </div>
                    <div className="coa-actions">
                        <button onClick={() => openContact('Request Sample COA')} className="coa-btn coa-btn-primary">
                            <Download size={16} style={{ marginRight: '0.5rem' }} />
                            Request Sample COA
                        </button>
                        <button onClick={() => setShowCOAModal(true)} className="coa-btn coa-btn-outline">
                            Learn More <ExternalLink size={14} style={{ marginLeft: '0.5rem' }} />
                        </button>
                    </div>
                </div>
            </div>

            {/* COA Info Modal */}
            <Modal isOpen={showCOAModal} onClose={() => setShowCOAModal(false)} title="Certificate of Analysis (COA)" size="medium">
                <div style={{ lineHeight: '1.8' }}>
                    <h4 style={{ color: 'var(--color-forest)', marginBottom: '1rem' }}>What is a COA?</h4>
                    <p style={{ marginBottom: '1.5rem', color: 'var(--color-stone-600)' }}>
                        A Certificate of Analysis (COA) is an official document that verifies the quality parameters of our cardamom shipments.
                        It includes detailed lab test results confirming compliance with international food safety standards.
                    </p>
                    <h4 style={{ color: 'var(--color-forest)', marginBottom: '1rem' }}>Our COA Includes:</h4>
                    <ul style={{ paddingLeft: '1.5rem', marginBottom: '1.5rem', color: 'var(--color-stone-600)' }}>
                        <li>Essential oil content percentage</li>
                        <li>Moisture level analysis</li>
                        <li>Color grading assessment</li>
                        <li>Pesticide residue testing</li>
                        <li>Microbial contamination analysis</li>
                        <li>Heavy metals testing</li>
                        <li>Physical parameters (size, density)</li>
                    </ul>
                    <h4 style={{ color: 'var(--color-forest)', marginBottom: '1rem' }}>Certifications:</h4>
                    <p style={{ color: 'var(--color-stone-600)' }}>
                        All our products are certified under FSSAI, ISO 22000:2018, HACCP, and registered with the Spices Board of India and APEDA.
                    </p>
                    <button
                        onClick={() => { setShowCOAModal(false); openContact('Request Sample COA'); }}
                        className="btn btn-primary"
                        style={{ marginTop: '1.5rem', width: '100%' }}
                    >
                        Request Sample COA
                    </button>
                </div>
            </Modal>
        </section>
    );
};

export default QualitySection;
