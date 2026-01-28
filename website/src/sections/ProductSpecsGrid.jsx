import React from 'react';
import OptimizedImg from '../components/OptimizedImg';
import { Droplets, Thermometer, Palette, ShieldCheck } from 'lucide-react';

const ProductSpecsGrid = () => {
    const specs = [
        {
            icon: <Droplets className="text-blue-400" />,
            value: "7-8%",
            label: "Oil Content",
            src: "/landing_page_images/generated/section_cardamom_closeup_1769454434966.png",
            desc: "Maximum aromatic potency"
        },
        {
            icon: <Thermometer className="text-orange-400" />,
            value: "<10%",
            label: "Moisture",
            src: "/landing_page_images/generated/section_quality_testing_1769454344217.png",
            desc: "Long shelf life guarantee"
        },
        {
            icon: <Palette className="text-green-400" />,
            value: "Deep Green",
            label: "Color Grade",
            src: "/landing_page_images/generated/section_emperor_hero_product_1769454808284.png",
            desc: "Naturally shade-dried"
        },
        {
            icon: <ShieldCheck className="text-gold" />,
            value: "8mm+",
            label: "Pod Size",
            src: "/images/cardamom-hero.png",
            desc: "Alleppey Green Extra Bold"
        }
    ];

    return (
        <section className="py-24 bg-white px-6">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <span className="text-sage font-bold tracking-widest uppercase text-sm">Quality Assurance</span>
                    <h2 className="text-4xl md:text-5xl font-display font-bold mt-4">Certified <span className="text-gold italic font-handwritten">Excellence</span></h2>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {specs.map((spec, i) => (
                        <div key={i} className="group relative h-[400px] rounded-3xl overflow-hidden shadow-2xl transition-all duration-500 hover:-translate-y-2">
                            <div className="absolute inset-0 z-0">
                                <OptimizedImg
                                    src={spec.src}
                                    alt={spec.label}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-forest via-forest/40 to-transparent"></div>
                            </div>

                            <div className="relative z-10 h-full flex flex-col justify-end p-8 text-white">
                                <div className="mb-4 bg-white/10 backdrop-blur-md w-12 h-12 rounded-xl flex items-center justify-center border border-white/20">
                                    {spec.icon}
                                </div>
                                <div className="text-3xl font-display font-bold mb-1">{spec.value}</div>
                                <div className="text-gold font-bold uppercase tracking-widest text-xs mb-3">{spec.label}</div>
                                <p className="text-white/60 text-sm leading-relaxed">{spec.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ProductSpecsGrid;
