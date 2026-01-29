import React from 'react';
import OptimizedImg from '../../components/OptimizedImg';

const AbundanceStrip = () => {
    return (
        <section className="py-0 overflow-hidden bg-white">
            <div className="grid md:grid-cols-2 lg:grid-cols-3">
                <div className="relative h-[400px] group overflow-hidden">
                    <OptimizedImg
                        src="/images/cardamom-scoop.png"
                        alt="Scoop of Freshness"
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors"></div>
                    <div className="absolute inset-x-0 bottom-0 p-8 text-white">
                        <h3 className="text-2xl font-display font-bold">Abundance</h3>
                        <p className="text-white/70 text-sm">Harvested at peak potency</p>
                    </div>
                </div>

                <div className="relative h-[400px] group overflow-hidden bg-forest flex flex-col justify-center p-12 text-white">
                    <h2 className="text-4xl font-display font-bold mb-6">The King of <span className="text-gold italic font-handwritten">Aroma</span>.</h2>
                    <p className="text-white/60 leading-relaxed mb-8">Every Emperor pod is a promise of consistent quality, meeting the world's most rigorous AGMARK and FSSAI standards.</p>
                    <div className="flex items-center gap-4">
                        <div className="h-px w-12 bg-gold"></div>
                        <span className="uppercase tracking-[0.3em] text-[10px] font-bold">Est. 1996</span>
                    </div>
                </div>

                <div className="relative h-[400px] group overflow-hidden">
                    <OptimizedImg
                        src="/images/cardamom-pods.png"
                        alt="Consistent Quality"
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors"></div>
                    <div className="absolute inset-x-0 bottom-0 p-8 text-white">
                        <h3 className="text-2xl font-display font-bold">Consistency</h3>
                        <p className="text-white/70 text-sm">Sorted with surgical precision</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AbundanceStrip;
