import React, { useEffect, useState } from 'react';

const TimelineNav = () => {
    const [activeSection, setActiveSection] = useState(0);
    const [scrollProgress, setScrollProgress] = useState(0);

    // Complete list of sections matching App.jsx order
    const sections = [
        { id: 'hero', label: 'Home' },
        { id: 'legacy', label: 'Legacy' },
        { id: 'difference', label: 'Difference' },
        { id: 'grades', label: 'Grades' },
        { id: 'products', label: 'Products' },
        { id: 'packaging', label: 'Packaging' },
        { id: 'nationwide', label: 'Nationwide' },
        { id: 'industries', label: 'Industries' },
        { id: 'india', label: 'India' },
        { id: 'global', label: 'Global' },
        { id: 'quality', label: 'Quality' },
        { id: 'recipes', label: 'Recipes' },
        { id: 'health', label: 'Health' },
        { id: 'blogs', label: 'Knowledge' },
        { id: 'testimonials', label: 'Reviews' },
        { id: 'contact', label: 'Contact' },
        { id: 'faq', label: 'FAQ' },
    ];

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            setScrollProgress((scrollTop / docHeight) * 100);

            // Find active section
            const sectionElements = sections.map(s => document.getElementById(s.id));
            const current = sectionElements.findIndex((el, i) => {
                if (!el) return false;
                const rect = el.getBoundingClientRect();
                return rect.top <= 300 && rect.bottom > 300;
            });

            if (current !== -1) setActiveSection(current);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            const headerOffset = 80;
            const elementPosition = element.getBoundingClientRect().top + window.scrollY;
            window.scrollTo({
                top: elementPosition - headerOffset,
                behavior: 'smooth'
            });
        }
    };

    return (
        <nav className="timeline-nav">
            {/* Progress Line */}
            <div className="timeline-progress">
                <div
                    className="timeline-progress-fill"
                    style={{ height: `${scrollProgress}%` }}
                ></div>
            </div>

            {/* Timeline Dots */}
            <div className="timeline-dots">
                {sections.map((section, index) => (
                    <button
                        key={section.id}
                        className={`timeline-dot ${activeSection === index ? 'active' : ''}`}
                        onClick={() => scrollToSection(section.id)}
                        title={section.label}
                    >
                        <span className="timeline-dot-inner"></span>
                        <span className="timeline-label">{section.label}</span>
                    </button>
                ))}
            </div>
        </nav>
    );
};

export default TimelineNav;
