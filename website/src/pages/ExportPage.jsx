import React, { useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Globe, Ship, FileText, Shield, Package, Truck, CheckCircle, ArrowRight, Download } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const ExportPage = () => {
    // Memoize static data arrays to prevent recreation on each render
    const exportCountries = useMemo(() => [
        { region: 'Middle East', countries: ['UAE', 'Saudi Arabia', 'Kuwait', 'Qatar', 'Oman', 'Bahrain', 'Yemen', 'Iraq'], icon: '🕌' },
        { region: 'Europe', countries: ['UK', 'Germany', 'France', 'Netherlands', 'Belgium', 'Sweden'], icon: '🏰' },
        { region: 'Americas', countries: ['USA', 'Canada', 'Mexico', 'Brazil'], icon: '🗽' },
        { region: 'Asia Pacific', countries: ['Japan', 'Korea', 'Singapore', 'Malaysia', 'Indonesia', 'Australia'], icon: '🏯' }
    ], []);

    const documents = useMemo(() => [
        { name: 'Certificate of Origin', icon: <FileText size={20} />, desc: 'Proof of Indian origin for import regulations' },
        { name: 'Phytosanitary Certificate', icon: <Shield size={20} />, desc: 'Plant health certification for export' },
        { name: 'Certificate of Analysis', icon: <CheckCircle size={20} />, desc: 'Detailed quality specifications' },
        { name: 'FSSAI Certificate', icon: <Shield size={20} />, desc: 'Food safety compliance documentation' },
        { name: 'Fumigation Certificate', icon: <FileText size={20} />, desc: 'Pest treatment documentation' },
        { name: 'Packing List', icon: <Package size={20} />, desc: 'Detailed shipment contents' }
    ], []);

    const incoterms = useMemo(() => [
        { term: 'FOB', name: 'Free On Board', desc: 'Delivery to port of shipment' },
        { term: 'CIF', name: 'Cost, Insurance & Freight', desc: 'Full delivery to destination port' },
        { term: 'CFR', name: 'Cost & Freight', desc: 'Delivery without insurance' },
        { term: 'EXW', name: 'Ex Works', desc: 'Pickup from our facility' }
    ], []);

    useEffect(() => {
        gsap.utils.toArray('.fade-up').forEach((el, i) => {
            gsap.fromTo(el,
                { y: 40, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    delay: i * 0.1,
                    scrollTrigger: {
                        trigger: el,
                        start: 'top 85%'
                    }
                }
            );
        });
        return () => ScrollTrigger.getAll().forEach(t => t.kill());
    }, []);

    return (
        <div className="min-h-screen bg-cream">
            {/* Hero */}
            <section className="py-32 px-6 bg-royal-dark text-white text-center relative overflow-hidden" data-nav-theme="dark">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-white/20 rounded-full" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-white/20 rounded-full" />
                </div>
                <div className="relative z-10">
                    <Globe className="mx-auto mb-6 text-gold" size={48} />
                    <span className="text-gold text-sm font-semibold tracking-widest uppercase">Global Trade</span>
                    <h1 className="text-5xl md:text-6xl font-display font-bold mt-4 mb-6">
                        Export <span className="font-handwritten text-gold">Excellence</span>
                    </h1>
                    <p className="text-lg opacity-80 max-w-2xl mx-auto">
                        Seamless international shipping with complete export documentation and logistics support
                    </p>
                </div>
            </section>

            {/* Global Reach */}
            <section className="py-20 px-6" data-nav-theme="light">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <span className="section-label">Our Reach</span>
                        <h2 className="section-title-large">
                            Serving <span className="text-gradient-nature font-handwritten">40+</span> Countries
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {exportCountries.map((region, i) => (
                            <div key={i} className="fade-up bg-white rounded-2xl p-6 shadow-lg">
                                <div className="text-4xl mb-4">{region.icon}</div>
                                <h3 className="text-xl font-display font-semibold mb-4">{region.region}</h3>
                                <ul className="space-y-2">
                                    {region.countries.map((country, j) => (
                                        <li key={j} className="text-stone-600 text-sm flex items-center gap-2">
                                            <CheckCircle size={14} className="text-sage" /> {country}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Export Documents */}
            <section className="py-20 px-6 bg-white" data-nav-theme="light">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <span className="section-label">Documentation</span>
                        <h2 className="section-title-large">
                            Complete Export <span className="text-gradient-gold font-handwritten">Documents</span>
                        </h2>
                        <p className="section-subtitle">Every shipment includes comprehensive documentation for hassle-free imports</p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {documents.map((doc, i) => (
                            <div key={i} className="fade-up flex items-start gap-4 p-6 bg-stone-50 rounded-xl hover:bg-stone-100 transition-colors">
                                <div className="w-12 h-12 rounded-xl bg-sage/10 text-sage flex items-center justify-center flex-shrink-0">
                                    {doc.icon}
                                </div>
                                <div>
                                    <h3 className="font-semibold mb-1">{doc.name}</h3>
                                    <p className="text-sm text-stone-500">{doc.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="text-center mt-12">
                        <button className="btn-secondary btn-magnetic inline-flex items-center gap-2">
                            <Download size={18} /> <span>Download Sample COA</span>
                        </button>
                    </div>
                </div>
            </section>

            {/* Incoterms */}
            <section className="py-20 px-6 bg-stone-50" data-nav-theme="light">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <span className="section-label">Shipping Terms</span>
                        <h2 className="section-title-large">
                            Flexible <span className="text-gradient-nature font-handwritten">Incoterms</span>
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {incoterms.map((term, i) => (
                            <div key={i} className="fade-up bg-white p-6 rounded-2xl shadow-lg text-center hover:shadow-xl transition-shadow">
                                <div className="text-3xl font-display font-bold text-forest mb-2">{term.term}</div>
                                <div className="font-medium text-stone-800 mb-2">{term.name}</div>
                                <p className="text-sm text-stone-500">{term.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Shipping & Logistics */}
            <section className="py-20 px-6 bg-forest text-white" data-nav-theme="dark">
                <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
                    <div>
                        <span className="text-gold text-sm font-semibold tracking-widest uppercase">Logistics</span>
                        <h2 className="text-4xl font-display font-bold mt-4 mb-6">
                            Reliable Shipping <span className="font-handwritten text-gold">Worldwide</span>
                        </h2>
                        <p className="opacity-80 leading-relaxed mb-6">
                            We partner with major shipping lines to ensure your cardamom reaches its destination
                            on time and in perfect condition. Our logistics team handles everything from
                            documentation to delivery tracking.
                        </p>
                        <ul className="space-y-3 mb-8">
                            {['FCL & LCL shipping options', 'Temperature-controlled containers', 'Real-time shipment tracking', 'Door-to-door delivery available'].map((item, i) => (
                                <li key={i} className="flex items-center gap-3">
                                    <CheckCircle size={18} className="text-gold" />
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                        <Link to="/contact" className="bg-gold text-forest px-8 py-4 rounded-full font-semibold inline-flex items-center gap-2 hover:bg-gold-light transition-colors">
                            Get Shipping Quote <ArrowRight size={18} />
                        </Link>
                    </div>
                    <div className="flex justify-center">
                        <div className="relative group">
                            <div className="w-80 h-80 rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
                                <OptimizedImg
                                    src="/images/cardamom-content/cardamom_global_trade.png"
                                    alt="Global Logistics"
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                />
                            </div>
                            <div className="absolute -top-6 -right-6 w-20 h-20 bg-gold text-forest rounded-2xl flex items-center justify-center shadow-xl animate-bounce">
                                <Ship size={32} />
                            </div>
                            <div className="absolute -bottom-6 -left-6 w-16 h-16 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl flex items-center justify-center">
                                <Globe size={24} className="text-gold" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-20 px-6 bg-white" data-nav-theme="light">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl font-display font-bold mb-4">Ready to Import Premium Cardamom?</h2>
                    <p className="text-stone-600 mb-8">Contact our export team for pricing, samples, and shipping details.</p>
                    <div className="flex flex-wrap gap-4 justify-center">
                        <Link to="/contact" className="btn-primary btn-magnetic">
                            <span>Request Export Quote</span> <ArrowRight size={18} />
                        </Link>
                        <Link to="/products" className="btn-secondary btn-magnetic">
                            <span>View Products</span>
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ExportPage;
