import React, { useEffect, useRef, useMemo } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Users, Award, Globe, Heart, ArrowRight, Leaf, Mountain, Quote, Shield } from 'lucide-react';
import OptimizedImg from '../components/OptimizedImg';

// V5 Components
import HeroSection from '../sections/HeroSection';
import GlobalUsageCarousel from '../sections/GlobalUsageCarousel';
import TrustStrip from '../sections/TrustStrip';
import ReputationGrid from '../sections/ReputationGrid';
import CategoryGallery from '../sections/CategoryGallery';
import ProductSpecsGrid from '../sections/ProductSpecsGrid';
import ProcessShowcase from '../sections/ProcessShowcase';
import PackagingShowcase from '../sections/PackagingShowcase';
import KnowledgeSection from '../sections/KnowledgeSection';
import AbundanceStrip from '../sections/AbundanceStrip';

gsap.registerPlugin(ScrollTrigger);

const AboutPage = () => {
    // Memoize stats array
    const stats = useMemo(() => [
        { icon: <Leaf size={28} />, value: '25+', label: 'Years Experience', color: 'sage' },
        { icon: <Globe size={28} />, value: '40+', label: 'Countries Served', color: 'gold' },
        { icon: <Users size={28} />, value: '500+', label: 'Happy Clients', color: 'forest' },
        { icon: <Award size={28} />, value: '1000+', label: 'Tons Exported', color: 'coral' }
    ], []);

    useEffect(() => {
        // Entrance animations for V5 sections
        gsap.utils.toArray('section').forEach((section, i) => {
            gsap.fromTo(section,
                { opacity: 0, y: 30 },
                {
                    opacity: 1, y: 0,
                    duration: 1,
                    scrollTrigger: {
                        trigger: section,
                        start: 'top 90%'
                    }
                }
            );
        });

        return () => ScrollTrigger.getAll().forEach(t => t.kill());
    }, []);

    return (
        <div className="min-h-screen bg-cream">
            {/* V5 Hero Section */}
            <HeroSection />

            {/* V5 High-Density Reputation Grid (Zero Space) */}
            <ReputationGrid />

            {/* Quality Specs Grid */}
            <ProductSpecsGrid />

            {/* GLOBAL REACH SECTION (Improved) */}
            <section className="relative py-24 bg-forest text-white overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <OptimizedImg
                        src="/images/cardamom-content/cardamom_global_trade.png"
                        alt="Global Trade"
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
                    <span className="text-gold font-bold tracking-[0.3em] uppercase text-xs">Global Authority</span>
                    <h2 className="text-4xl md:text-6xl font-display font-bold mt-6 mb-12">
                        Serving the World's <br />
                        <span className="text-gold italic font-handwritten">Finest</span> Kitchens.
                    </h2>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {stats.map((stat, i) => (
                            <div key={i} className="stat-item p-8 border border-white/10 rounded-3xl backdrop-blur-sm">
                                <div className="text-gold mb-6 flex justify-center">{stat.icon}</div>
                                <div className="text-5xl font-display font-bold mb-2">{stat.value}</div>
                                <div className="text-white/40 uppercase tracking-widest text-[10px] font-bold">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Global Usage Carousel - Cultures & Traditions */}
            <GlobalUsageCarousel />

            {/* V5 CATEGORY GALLERY - High Density (50+ Visuals Approach) */}
            <CategoryGallery />

            {/* THE COLORS OF EXCELLENCE - PACKAGING */}
            <PackagingShowcase />

            {/* FARM TO FORK JOURNEY */}
            <ProcessShowcase />

            {/* TECHNICAL KNOWLEDGE & ORIGIN */}
            <KnowledgeSection />

            {/* ABUNDANCE STRIP */}
            <AbundanceStrip />

            {/* COMMITMENT TO WORKERS & NATURE */}
            <section className="py-0 overflow-hidden">
                <div className="grid md:grid-cols-2">
                    <div className="h-[600px] relative order-2 md:order-1">
                        <OptimizedImg
                            src="/images/cardamom-harvest-correct.png"
                            alt="Sustainable Harvest"
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-forest/20"></div>
                        <div className="absolute top-12 left-12 bg-white/10 backdrop-blur-xl p-8 rounded-2xl border border-white/20 max-w-xs text-white">
                            <Quote size={32} className="text-gold mb-4" />
                            <p className="font-display text-lg italic italic">"Every pod we harvest is a promise of health and prosperity to our farmers and the earth."</p>
                        </div>
                    </div>
                    <div className="bg-white p-16 md:p-32 flex flex-col justify-center order-1 md:order-2">
                        <span className="text-sage font-bold tracking-widest uppercase text-sm">Our Essence</span>
                        <h2 className="text-4xl md:text-6xl font-display font-bold mt-4 mb-8">
                            Healthy Plantation. <br />
                            <span className="text-gold italic font-handwritten">Happy</span> People.
                        </h2>
                        <p className="text-stone-600 text-lg leading-relaxed mb-8">
                            Our commitment goes beyond quality. We ensure that our plantation workers—the real hands behind the flavor—thrive in a healthy, supportive environment.
                        </p>
                        <ul className="space-y-4 mb-10">
                            {[
                                "Chemical-free plantation management",
                                "Direct farmer welfare programs",
                                "Sustainable shade-grown cultivation",
                                "Zero-waste processing facilities"
                            ].map((item, i) => (
                                <li key={i} className="flex items-center gap-3 text-stone-700">
                                    <Shield size={18} className="text-gold" />
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="py-24 px-6 bg-cream text-center">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-5xl md:text-7xl font-display font-bold mb-8">
                        Experience the <br />
                        <span className="text-gold italic font-handwritten">Excellence</span> of Emperor.
                    </h2>
                    <div className="flex flex-wrap gap-6 justify-center mt-12">
                        <Link to="/contact" className="bg-forest text-white px-12 py-6 rounded-full font-bold text-lg hover:shadow-2xl transition-all">
                            Partner With Us
                        </Link>
                        <Link to="/products" className="border border-forest/20 text-forest px-12 py-6 rounded-full font-bold text-lg hover:bg-forest/5 transition-all">
                            View All Grades
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AboutPage;
