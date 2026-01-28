import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const RecipesSection = () => {
    const sectionRef = useRef();

    const recipes = [
        {
            title: 'Arabic Coffee (Gahwa)',
            arabicTitle: 'قهوة عربية',
            emoji: '☕',
            description: 'Traditional Gulf coffee with crushed cardamom pods, saffron, and rosewater. A symbol of hospitality.',
            region: 'Middle East',
            difficulty: 'Easy',
            time: '15 min'
        },
        {
            title: 'Cardamom Chai',
            arabicTitle: 'شاي بالهيل',
            emoji: '🍵',
            description: 'Classic Indian masala chai with crushed cardamom, ginger, and aromatic spices in creamy milk tea.',
            region: 'India',
            difficulty: 'Easy',
            time: '10 min'
        },
        {
            title: 'Cardamom Biryani',
            arabicTitle: 'برياني بالهيل',
            emoji: '🍚',
            description: 'Fragrant rice dish with whole cardamom pods, saffron, and tender meat layered with aromatic spices.',
            region: 'South Asia',
            difficulty: 'Medium',
            time: '60 min'
        },
        {
            title: 'Swedish Cardamom Buns',
            arabicTitle: 'كعك الهيل السويدي',
            emoji: '🥐',
            description: 'Kardemummabullar - sweet, buttery buns with freshly ground cardamom, a Scandinavian favorite.',
            region: 'Scandinavia',
            difficulty: 'Medium',
            time: '90 min'
        }
    ];

    useEffect(() => {
        const section = sectionRef.current;
        if (!section) return;

        const cards = section.querySelectorAll('.recipe-card');
        cards.forEach((card, i) => {
            gsap.fromTo(card,
                { x: i % 2 === 0 ? -40 : 40, opacity: 0 },
                {
                    x: 0,
                    opacity: 1,
                    duration: 0.7,
                    delay: i * 0.15,
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
        <section id="recipes" className="recipes-section" ref={sectionRef} data-nav-theme="dark">
            <div className="recipes-container">
                <div className="section-header">
                    <span className="section-label light">Create Your Magic</span>
                    <h2 className="section-title-large" style={{ color: 'white' }}>
                        Cardamom <span className="text-handwritten text-gradient-gold">Recipes</span>
                    </h2>
                    <p className="section-subtitle" style={{ color: 'rgba(255,255,255,0.7)' }}>
                        From the aromatic kitchens of the Middle East to the cozy cafes of Scandinavia
                    </p>
                </div>

                <div className="recipes-grid">
                    {recipes.map((recipe, index) => (
                        <div key={index} className="recipe-card">
                            <div className="recipe-emoji">{recipe.emoji}</div>
                            <div className="recipe-content">
                                <h3 className="recipe-title">{recipe.title}</h3>
                                <span className="recipe-arabic">{recipe.arabicTitle}</span>
                                <p className="recipe-description">{recipe.description}</p>
                                <div className="recipe-meta">
                                    <span className="recipe-region">📍 {recipe.region}</span>
                                    <span className="recipe-time">⏱️ {recipe.time}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="recipes-cta">
                    <p>Want to explore more recipes? We share cooking tips and traditional recipes with our customers.</p>
                </div>
            </div>
        </section>
    );
};

export default RecipesSection;
