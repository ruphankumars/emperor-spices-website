import React, { useState, useEffect, useRef } from 'react';
import { Plus, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const FAQSection = () => {
    const sectionRef = useRef(null);
    const [openIndex, setOpenIndex] = useState(0);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Section header animations
            gsap.fromTo('.faq-label',
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

            gsap.fromTo('.faq-title',
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

            // Staggered FAQ items
            gsap.fromTo('.faq-item',
                { opacity: 0, x: -30 },
                {
                    opacity: 1,
                    x: 0,
                    duration: 0.5,
                    stagger: 0.1,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: '.faq-list',
                        start: 'top 85%',
                    },
                }
            );

            // CTA slide-in
            gsap.fromTo('.faq-cta',
                { opacity: 0, y: 30, scale: 0.9 },
                {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 0.7,
                    ease: 'back.out(1.5)',
                    scrollTrigger: {
                        trigger: '.faq-cta',
                        start: 'top 90%',
                    },
                }
            );

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const faqs = [
        {
            question: 'What cardamom grades do you export?',
            answer: 'We export all AGMARK certified grades including AGEB (8mm+), AGB (7-8mm), AGS (6-7mm), and AGS-1. Each grade is carefully selected based on size, oil content, color, and aroma intensity.',
        },
        {
            question: 'What is your minimum order quantity (MOQ)?',
            answer: 'Our MOQ varies by market. For bulk export orders, we typically start at 500kg. For private label and branded products, MOQ starts at 250kg. Contact us for specific requirements.',
        },
        {
            question: 'Do you provide samples before bulk orders?',
            answer: 'Yes, we provide 100g-500g samples with a Certificate of Analysis (COA) for quality evaluation. Sample costs are adjusted against your first bulk order.',
        },
        {
            question: 'What certifications do you have?',
            answer: 'We hold FSSAI, ISO 22000:2018, HACCP, APEDA Registration, IEC Code, and our products are GI Tagged from Bodinayakanur. All certifications are available upon request.',
        },
        {
            question: 'What are your payment terms?',
            answer: 'We offer flexible payment terms including LC (Letter of Credit), CAD (Cash Against Documents), and advance payment options. Terms are discussed based on order value and relationship.',
        },
        {
            question: 'How do you ensure quality during shipping?',
            answer: 'Our Aroma Lock™ packaging uses triple-layer protection with moisture barrier, UV protection, and aroma-seal technology. We also provide temperature-controlled shipping for sensitive markets.',
        },
    ];

    return (
        <section className="section section-light section-center" id="faq" ref={sectionRef}>
            <div className="container max-w-3xl">
                <span className="section-label faq-label">FAQ</span>
                <h2 className="section-title faq-title">
                    Frequently Asked <span className="script">Questions</span>
                </h2>

                {/* FAQ List */}
                <div className="faq-list" style={{ marginTop: '2rem' }}>
                    {faqs.map((faq, index) => (
                        <div key={index} className={`faq-item ${openIndex === index ? 'open' : ''}`}>
                            <button
                                className="faq-question"
                                onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
                            >
                                {faq.question}
                                <Plus className="faq-icon" size={20} />
                            </button>
                            <div className="faq-answer">
                                <div className="faq-answer-content">
                                    {faq.answer}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* CTA */}
                <div className="faq-cta" style={{ marginTop: '3rem', textAlign: 'center' }}>
                    <p style={{ color: 'var(--color-stone-600)', marginBottom: '1rem' }}>
                        Ready to experience the difference?
                    </p>
                    <Link to="/contact" className="btn btn-primary">
                        Request Samples <ArrowRight size={16} />
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default FAQSection;
