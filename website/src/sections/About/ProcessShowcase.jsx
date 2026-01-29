import React from 'react';
import OptimizedImg from '../../components/OptimizedImg';
import { Sprout, Users, Package, Globe, MapPin } from 'lucide-react';

const ProcessShowcase = () => {
    const steps = [
        {
            icon: <Sprout size={32} />,
            title: "The Golden Origin",
            desc: "Our journey begins in the sun-drenched plantations of Bodinayakanur, Tamil Nadu.",
            image: "/images/cardamom-reference/cardamom_plantation_aerial.jpg"
        },
        {
            icon: <MapPin size={32} />,
            title: "Nurtured by Nature",
            desc: "The unique microclimate of the Western Ghats produces the world's finest pods.",
            image: "/images/cardamom-reference/cardamom_plantation_view.jpg"
        },
        {
            icon: <Users size={32} />,
            title: "Hand-Picked",
            desc: "Skilled hands carefully select each pod at the peak of freshness.",
            image: "/images/cardamom-harvest.png"
        },
        {
            icon: <Package size={32} />,
            title: "Freshness Sealed",
            desc: "Moisture-proof packaging preserves the aroma from warehouse to door.",
            image: "/images/emperor-packaging.png"
        },
        {
            icon: <Globe size={32} />,
            title: "Global Reach",
            desc: "Connecting the heart of spice to 40+ countries worldwide.",
            image: "/images/global-export-map.png"
        }
    ];

    return (
        <section className="py-24 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-20">
                    <span className="text-sage font-bold tracking-widest uppercase text-sm">Our Journey</span>
                    <h2 className="text-4xl md:text-5xl font-display font-bold mt-4">
                        From Farm to <span className="text-gold italic font-handwritten">Fork</span>
                    </h2>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-1">
                    {steps.map((step, i) => (
                        <div key={i} className="group relative h-[500px] overflow-hidden">
                            <OptimizedImg
                                src={step.image}
                                alt={step.title}
                                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-forest/40 group-hover:bg-forest/60 transition-colors duration-300"></div>

                            <div className="absolute inset-0 p-10 flex flex-col justify-between text-white">
                                <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center text-gold">
                                    {step.icon}
                                </div>
                                <div>
                                    <h3 className="text-2xl font-display font-bold mb-4">{step.title}</h3>
                                    <p className="text-white/70 text-sm leading-relaxed opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                                        {step.desc}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ProcessShowcase;
