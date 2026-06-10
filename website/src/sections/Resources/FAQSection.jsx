import React, { useState, useEffect, useRef } from 'react';
import { Plus, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { faqs } from '../../data/faqData';

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
