import React from 'react';
import OptimizedImg from '../components/OptimizedImg';

const PackagingShowcase = () => {
    const pouches = [
        { src: "/images/brand-reference/Emperor_brand_pouch_blue.jpg", color: "Sapphire Blue", grade: "AGEB 8mm+", desc: "The Gold Standard of Cardamom" },
        { src: "/images/brand-reference/Emperor_brand_pouch_red.jpg", color: "Ruby Red", grade: "1kg Bulk Pack", desc: "For High-Volume Gourmet Kitchens" },
        { src: "/images/brand-reference/Emperor_brand_pouch_fanta.jpg", color: "Fanta Orange", grade: "Select 7.5mm", desc: "Vibrant Aroma, Peak Freshness" },
        { src: "/images/brand-reference/Emperor_brand_pouch_magenta_pink.jpg", color: "Magenta Pink", grade: "Organic Certified", desc: "Chemical-Free Heritage Batches" },
        { src: "/images/brand-reference/Emperor_brand_pouch_violet.jpg", color: "Royal Violet", grade: "Limited Harvest", desc: "The Rarest Pods from the Peak" }
    ];

    return (
        <section className="py-24 bg-stone-50 overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-16">
                    <span className="text-sage font-bold tracking-widest uppercase text-sm">Our Presence</span>
                    <h2 className="text-4xl md:text-5xl font-display font-bold mt-4">
                        The Colors of <span className="text-gold italic font-handwritten">Excellence</span>
                    </h2>
                    <p className="text-stone-500 mt-4 max-w-2xl mx-auto">
                        Distinctive packaging that reflects the grade, quality, and heritage inside every pack.
                    </p>
                </div>

                <div className="flex flex-wrap justify-center gap-8">
                    {pouches.map((pouch, i) => (
                        <div key={i} className="group w-full md:w-[220px] lg:w-[240px]">
                            <div className="relative aspect-[3/4] rounded-3xl overflow-hidden shadow-xl mb-6 bg-white flex items-center justify-center p-8 transition-all duration-500 group-hover:shadow-2xl group-hover:-translate-y-2">
                                <OptimizedImg
                                    src={pouch.src}
                                    alt={pouch.color}
                                    className="max-w-full max-h-full object-contain transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 border-2 border-transparent group-hover:border-gold/20 rounded-3xl transition-colors"></div>
                            </div>
                            <div className="text-center">
                                <h3 className="font-display font-bold text-xl mb-1">{pouch.color}</h3>
                                <p className="text-gold text-xs font-bold uppercase tracking-widest mb-2">{pouch.grade}</p>
                                <p className="text-stone-400 text-sm">{pouch.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default PackagingShowcase;
