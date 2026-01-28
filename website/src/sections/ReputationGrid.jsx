import React from 'react';
import OptimizedImg from '../components/OptimizedImg';

const ReputationGrid = () => {
    const reputationItems = [
        { src: "/images/section-certifications.png", title: "Global Certifications", desc: "ISO, HACCP, FSSAI Certified", size: "col-span-2 row-span-2" },
        { src: "/images/cardamom-closeup.png", title: "Quality Control", desc: "Rigorous laboratory testing", size: "col-span-1 row-span-1" },
        { src: "/images/heritage-warehouse.png", title: "Legacy Warehouse", desc: "Our Bodinayakanur heritage", size: "col-span-1 row-span-1" },
        { src: "/images/sustainability.png", title: "Eco Commitment", desc: "Solar-powered facilities", size: "col-span-1 row-span-2" },
        { src: "/images/section-global-export.png", title: "Global Reach", desc: "Serving 40+ countries", size: "col-span-2 row-span-1" },
        { src: "/images/section-about-heritage.png", title: "Generational Bond", desc: "Working with local farmers", size: "col-span-1 row-span-1" }
    ];

    return (
        <section className="py-1 bg-white">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-1 p-1">
                {reputationItems.map((item, i) => (
                    <div key={i} className={`relative overflow-hidden group ${item.size} aspect-square md:aspect-auto`}>
                        <OptimizedImg
                            src={item.src}
                            alt={item.title}
                            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                            <h3 className="text-white font-display text-xl font-bold">{item.title}</h3>
                            <p className="text-white/80 text-sm mt-2">{item.desc}</p>
                        </div>
                    </div>
                ))}

                {/* Individual Certification Trust Strip */}
                <div className="col-span-full bg-white p-8 grid grid-cols-3 md:grid-cols-6 gap-8 items-center justify-items-center border-t border-stone-100">
                    {[
                        "/images/logos/emperor_cardamom_HACCP-logo-e1512580006732.jpg",
                        "/images/logos/emperor_cardamom_halal-logo-150ED752BD-seeklogo.com.png",
                        "/images/logos/emperor_cardamom_iso-9001-2015-certification_orig.png",
                        "/images/logos/emperor_cardamom_265-2650795_final-vacuum-100-organic-logo-png.png",
                        "/images/logos/emperor_cardamom_tu.jpg",
                        "/images/quality-badge.png"
                    ].map((logo, i) => (
                        <div key={i} className="h-16 w-full flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300">
                            <OptimizedImg src={logo} alt="Certification" className="max-h-full max-w-full object-contain" />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ReputationGrid;
