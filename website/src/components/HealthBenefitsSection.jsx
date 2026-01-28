import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const HealthBenefitsSection = () => {
    const sectionRef = useRef();

    const healthBenefits = [
        {
            icon: '🫁',
            title: 'Respiratory Health',
            description: 'Cardamom\'s aromatic compounds help clear congestion and improve breathing, traditionally used in Ayurveda for respiratory wellness.',
            arabicTitle: 'صحة الجهاز التنفسي'
        },
        {
            icon: '💚',
            title: 'Digestive Aid',
            description: 'Known to soothe stomach discomfort, reduce bloating, and enhance digestion. A natural remedy used for centuries.',
            arabicTitle: 'مساعد للهضم'
        },
        {
            icon: '❤️',
            title: 'Heart Health',
            description: 'Rich in antioxidants that may help lower blood pressure and support cardiovascular health naturally.',
            arabicTitle: 'صحة القلب'
        },
        {
            icon: '🦷',
            title: 'Oral Freshness',
            description: 'Nature\'s mouth freshener with antibacterial properties. Chewing cardamom pods fights bad breath effectively.',
            arabicTitle: 'انتعاش الفم'
        },
        {
            icon: '🧠',
            title: 'Mental Clarity',
            description: 'The aroma of cardamom is believed to stimulate the mind, reduce anxiety, and promote mental alertness.',
            arabicTitle: 'الوضوح الذهني'
        },
        {
            icon: '🛡️',
            title: 'Antioxidant Power',
            description: 'Packed with powerful antioxidants that help fight free radicals and support overall immune health.',
            arabicTitle: 'قوة مضادات الأكسدة'
        }
    ];

    useEffect(() => {
        const section = sectionRef.current;
        if (!section) return;

        const cards = section.querySelectorAll('.health-card');
        cards.forEach((card, i) => {
            gsap.fromTo(card,
                { y: 40, opacity: 0, scale: 0.95 },
                {
                    y: 0,
                    opacity: 1,
                    scale: 1,
                    duration: 0.6,
                    delay: i * 0.1,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: card,
                        start: "top 85%"
                    }
                }
            );
        });
    }, []);

    return (
        <section id="health-benefits" className="health-benefits-section" ref={sectionRef} data-nav-theme="light">
            <div className="health-benefits-container">
                <div className="section-header">
                    <span className="section-label">Doctor of Spices</span>
                    <h2 className="section-title-large">
                        Nature's <span className="text-handwritten text-gradient-nature">Medicine</span>
                    </h2>
                    <p className="section-subtitle">
                        Cardamom has been treasured for its medicinal properties for over 4,000 years in traditional medicine systems.
                    </p>
                </div>

                <div className="health-grid">
                    {healthBenefits.map((benefit, index) => (
                        <div key={index} className="health-card">
                            <div className="health-icon">{benefit.icon}</div>
                            <h3 className="health-title">{benefit.title}</h3>
                            <p className="health-description">{benefit.description}</p>
                            <span className="health-arabic">{benefit.arabicTitle}</span>
                        </div>
                    ))}
                </div>

                <div className="health-disclaimer">
                    <p>
                        <strong>Disclaimer:</strong> These statements are based on traditional use and general wellness practices.
                        Always consult a healthcare professional for medical advice.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default HealthBenefitsSection;
