import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import OptimizedImg from '../../components/OptimizedImg';

gsap.registerPlugin(ScrollTrigger);

const GlobalUsageCarousel = () => {
    const sectionRef = useRef(null);

    const usageData = [
        {
            title: "Arabian Heritage",
            location: "Middle East",
            image: "/images/cardamom_content/cardamom_usage_arabic.png",
            desc: "The soul of Arabic Gahwa. Our premium pods provide the intense aroma essential for traditional hospitality."
        },
        {
            title: "Indian Culinary Art",
            location: "South Asia",
            image: "/images/cardamom_content/cardamom_usage_indian.png",
            desc: "From royal biryanis to festive sweets, Emperor Spices is the gold standard in Indian kitchens."
        },
        {
            title: "Eastern Wellness",
            location: "East Asia",
            image: "/images/cardamom_content/cardamom_usage_chinese.png",
            desc: "Valued for centuries in traditional medicine and aromatic cuisine across the Orient."
        },
        {
            title: "Modern Gastronomy",
            location: "Global",
            image: "/images/cardamom_content/cardamom_usage_english.png",
            desc: "Elevating contemporary pastries, craft gins, and gourmet beverages worldwide."
        }
    ];

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".usage-card", {
                y: 50,
                opacity: 0,
                duration: 1,
                stagger: 0.2,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 75%",
                }
            });
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="global-usage-section py-24 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-16">
                    <span className="text-sage font-semibold tracking-widest uppercase text-sm">Global Impact</span>
                    <h2 className="text-4xl md:text-5xl font-display font-bold mt-4">
                        Cardamom Across <span className="text-gold italic font-handwritten">Cultures</span>
                    </h2>
                    <p className="text-stone-500 mt-6 max-w-2xl mx-auto">
                        From traditional ceremonies to modern culinary innovations, our spices bridge continents and flavors.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {usageData.map((item, index) => (
                        <div key={index} className="usage-card group relative h-[500px] rounded-3xl overflow-hidden shadow-2xl">
                            <div className="absolute inset-0">
                                <OptimizedImg
                                    src={item.image}
                                    alt={item.title}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
                            </div>

                            <div className="absolute bottom-0 left-0 p-8 w-full transform translate-y-4 group-hover:translate-y-0 transition-transform">
                                <span className="text-gold text-xs font-bold tracking-widest uppercase">{item.location}</span>
                                <h3 className="text-white text-2xl font-display font-bold mt-2">{item.title}</h3>
                                <p className="text-white/70 text-sm mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                    {item.desc}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default GlobalUsageCarousel;
