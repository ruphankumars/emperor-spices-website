import React from 'react';
import OptimizedImg from '../../components/OptimizedImg';
import { MapPin, Box, Zap, Heart } from 'lucide-react';

const KnowledgeSection = () => {
    return (
        <section className="relative py-24 text-white overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <OptimizedImg
                    src="/images/hero-bg-correct.png"
                    alt="Plantation Background"
                    className="w-full h-full object-cover opacity-20"
                />
                <div className="absolute inset-0 bg-forest/90"></div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    <div>
                        <span className="text-gold font-bold tracking-[0.3em] uppercase text-xs">The Science of Spice</span>
                        <h2 className="text-4xl md:text-6xl font-display font-bold mt-6 mb-8">
                            Engineered by <br />
                            <span className="text-gold italic font-handwritten">Nature.</span>
                        </h2>

                        <div className="space-y-12">
                            <div className="flex gap-6">
                                <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center text-gold shrink-0 border border-gold/20">
                                    <MapPin size={24} />
                                </div>
                                <div>
                                    <h3 className="text-xl font-display font-bold mb-2">The Golden Origin</h3>
                                    <p className="text-white/60">Sourced from the heart of the Western Ghats, where the unique soil and microclimate produce the 'Alleppey Green' standard.</p>
                                </div>
                            </div>
                            <div className="flex gap-6">
                                <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center text-gold shrink-0 border border-gold/20">
                                    <Box size={24} />
                                </div>
                                <div>
                                    <h3 className="text-xl font-display font-bold mb-2">3D Quality Analysis</h3>
                                    <p className="text-white/60">Every pod is inspected for husk integrity, seed density, and moisture balance to ensure maximum aromatic release.</p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-12 p-8 bg-white/5 rounded-3xl border border-white/10 backdrop-blur-sm">
                            <div className="flex items-center gap-4 mb-4">
                                <Zap className="text-gold" />
                                <span className="font-bold uppercase tracking-widest text-xs text-gold">Technical Insight</span>
                            </div>
                            <p className="text-sm text-white/40 leading-relaxed italic">"The superior oil content in Emperor Cardamom is a result of our specialized shade-growing and low-temperature drying process."</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-4">
                            <div className="h-64 rounded-3xl overflow-hidden border border-white/10">
                                <OptimizedImg src="/images/india-map.png" alt="Origin Map" className="w-full h-full object-cover" />
                            </div>
                            <div className="h-80 rounded-3xl overflow-hidden border border-white/10">
                                <OptimizedImg src="/images/cardamom-pod-3d.png" alt="Pod Anatomy" className="w-full h-full object-cover" />
                            </div>
                        </div>
                        <div className="pt-12 space-y-4">
                            <div className="h-80 rounded-3xl overflow-hidden border border-white/10">
                                <OptimizedImg src="/images/cardamom-levitation.png" alt="Spice Levitation" className="w-full h-full object-cover" />
                            </div>
                            <div className="h-64 rounded-3xl overflow-hidden border border-white/10">
                                <OptimizedImg src="/images/cardamom-closeup.png" alt="Macro Detail" className="w-full h-full object-cover" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default KnowledgeSection;
