import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useDebouncedCallback } from 'use-debounce';
import { Search, Filter, Package, Droplets, Ruler, Palette, ArrowRight, X } from 'lucide-react';
import OptimizedImg from '../components/OptimizedImg';

gsap.registerPlugin(ScrollTrigger);

const ProductsPage = () => {
    const [filter, setFilter] = useState('all');
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchInput, setSearchInput] = useState(''); // Local state for immediate display

    // Memoize products array to prevent recreation on each render
    const products = useMemo(() => [
        {
            id: 1,
            name: 'Alleppey Green Extra Bold',
            grade: 'AGEB',
            category: 'premium',
            size: '8mm+',
            oilContent: '7-8%',
            moisture: '<10%',
            color: 'Deep Green',
            bestFor: 'Premium Retail, Luxury Gifting',
            description: 'Our finest grade cardamom with exceptional aroma and bold size. Hand-selected for premium markets.',
            image: '/media/images/brand-reference/Emperor_brand_pouch_violet.jpg',
            certifications: ['AGMARK', 'FSSAI', 'ISO 22000']
        },
        {
            id: 2,
            name: 'Alleppey Green Bold',
            grade: 'AGB',
            category: 'premium',
            size: '7-8mm',
            oilContent: '6-7%',
            moisture: '<10%',
            color: 'Bright Green',
            bestFor: 'Middle East & European Markets',
            description: 'Perfect balance of size and aroma, ideal for international markets and gourmet applications.',
            image: '/media/images/brand-reference/Emperor_brand_pouch_red.jpg',
            certifications: ['AGMARK', 'FSSAI']
        },
        {
            id: 3,
            name: 'Alleppey Green Special',
            grade: 'AGS',
            category: 'standard',
            size: '6-7mm',
            oilContent: '5-6%',
            moisture: '<11%',
            color: 'Green',
            bestFor: 'Food Processing, Hospitality',
            description: 'Excellent quality for culinary applications, spice blends, and commercial kitchens.',
            image: '/media/images/brand-reference/Emperor_brand_pouch_blue.jpg',
            certifications: ['AGMARK', 'FSSAI']
        },
        {
            id: 4,
            name: 'Cardamom Seeds',
            grade: 'SEEDS',
            category: 'extract',
            size: 'N/A',
            oilContent: '8-10%',
            moisture: '<8%',
            color: 'Brown-Black',
            bestFor: 'Essential Oils, Pharmaceuticals',
            description: 'High oil content seeds for extraction, pharmaceutical applications, and specialized uses.',
            image: '/media/images/brand-reference/Emperor_brand_pouch_fanta.jpg',
            certifications: ['FSSAI', 'Spices Board']
        },
        {
            id: 5,
            name: 'Cardamom Powder',
            grade: 'POWDER',
            category: 'processed',
            size: 'Ground',
            oilContent: '4-5%',
            moisture: '<12%',
            color: 'Light Brown',
            bestFor: 'Bakeries, Beverage Industry',
            description: 'Freshly ground cardamom powder with vibrant aroma, perfect for ready-to-use applications.',
            image: '/media/images/brand-reference/Emperor_brand_pouch_magenta_pink.jpg',
            certifications: ['FSSAI']
        }
    ], []);

    // Memoize categories array
    const categories = useMemo(() => [
        { id: 'all', name: 'All Products' },
        { id: 'premium', name: 'Premium Grade' },
        { id: 'standard', name: 'Standard Grade' },
        { id: 'extract', name: 'Seeds & Extract' },
        { id: 'processed', name: 'Processed' }
    ], []);

    // Memoize filtered products computation
    const filteredProducts = useMemo(() => products.filter(p => {
        const matchesFilter = filter === 'all' || p.category === filter;
        const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.grade.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesFilter && matchesSearch;
    }), [products, filter, searchQuery]);

    // Memoize handlers
    const handleFilterChange = useCallback((catId) => {
        setFilter(catId);
    }, []);

    const handleProductSelect = useCallback((product) => {
        setSelectedProduct(product);
    }, []);

    const handleCloseModal = useCallback(() => {
        setSelectedProduct(null);
    }, []);

    // Debounce search query update for better performance
    const debouncedSetSearch = useDebouncedCallback((value) => {
        setSearchQuery(value);
    }, 150);

    // Handle search input change - updates local state immediately, debounces actual search
    const handleSearchChange = useCallback((e) => {
        const value = e.target.value;
        setSearchInput(value);
        debouncedSetSearch(value);
    }, [debouncedSetSearch]);

    useEffect(() => {
        gsap.fromTo('.product-card',
            { y: 40, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power2.out' }
        );
    }, [filter, searchQuery]);

    return (
        <div className="min-h-screen bg-cream">
            {/* Hero */}
            <section className="py-32 px-6 bg-gradient-to-br from-forest to-sage-dark text-white text-center" data-nav-theme="dark">
                <span className="text-gold text-sm font-semibold tracking-widest uppercase">Our Collection</span>
                <h1 className="text-5xl md:text-6xl font-display font-bold mt-4 mb-6">
                    Premium <span className="font-handwritten">Cardamom</span> Grades
                </h1>
                <p className="text-lg opacity-80 max-w-2xl mx-auto">
                    AGMARK certified cardamom grades for every market requirement
                </p>
            </section>

            {/* Filters */}
            <section className="py-8 px-6 bg-white border-b border-stone-200 sticky top-0 z-40" data-nav-theme="light">
                <div className="max-w-6xl mx-auto flex flex-wrap gap-4 items-center justify-between">
                    <div className="flex flex-wrap gap-2">
                        {categories.map(cat => (
                            <button
                                key={cat.id}
                                onClick={() => handleFilterChange(cat.id)}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${filter === cat.id
                                    ? 'bg-forest text-white'
                                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                                    }`}
                            >
                                {cat.name}
                            </button>
                        ))}
                    </div>
                    <div className="relative">
                        <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                        <input
                            type="text"
                            placeholder="Search products..."
                            value={searchInput}
                            onChange={handleSearchChange}
                            className="pl-10 pr-4 py-2 border border-stone-200 rounded-full text-sm focus:ring-2 focus:ring-sage focus:border-transparent"
                        />
                    </div>
                </div>
            </section>

            {/* Products Grid */}
            <section className="py-16 px-6" data-nav-theme="light">
                <div className="max-w-6xl mx-auto">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredProducts.map((product) => (
                            <div
                                key={product.id}
                                className="product-card bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all cursor-pointer group"
                                onClick={() => handleProductSelect(product)}
                            >
                                <div className="relative h-48 bg-gradient-to-br from-sage/10 to-gold/10 overflow-hidden">
                                    <OptimizedImg
                                        src={product.image}
                                        alt={product.name}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                    />
                                    <div className="absolute top-4 left-4 bg-forest text-white px-3 py-1 rounded-full text-xs font-bold">
                                        {product.grade}
                                    </div>
                                </div>
                                <div className="p-6">
                                    <h3 className="text-lg font-display font-semibold mb-2">{product.name}</h3>
                                    <div className="flex flex-wrap gap-4 text-sm text-stone-500 mb-4">
                                        <span className="flex items-center gap-1">
                                            <Ruler size={14} /> {product.size}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <Droplets size={14} /> {product.oilContent}
                                        </span>
                                    </div>
                                    <p className="text-sm text-stone-600 mb-4">{product.bestFor}</p>
                                    <button className="text-sage font-medium text-sm flex items-center gap-1 group-hover:text-forest transition-colors">
                                        View Details <ArrowRight size={14} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {filteredProducts.length === 0 && (
                        <div className="text-center py-16 text-stone-500">
                            <Package size={48} className="mx-auto mb-4 opacity-50" />
                            <p>No products found matching your criteria.</p>
                        </div>
                    )}
                </div>
            </section>

            {/* Product Modal */}
            {selectedProduct && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-6" onClick={handleCloseModal}>
                    <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
                        <div className="relative h-64 bg-gradient-to-br from-sage/20 to-gold/20">
                            <OptimizedImg
                                src={selectedProduct.image}
                                alt={selectedProduct.name}
                                className="w-full h-full object-cover"
                                sizes="(max-width: 768px) 100vw, 50vw"
                            />
                            <button
                                onClick={handleCloseModal}
                                className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-stone-100"
                            >
                                <X size={20} />
                            </button>
                        </div>
                        <div className="p-8">
                            <div className="flex items-center gap-3 mb-4">
                                <span className="bg-forest text-white px-3 py-1 rounded-full text-sm font-bold">{selectedProduct.grade}</span>
                                <span className="text-stone-500 text-sm">{selectedProduct.category}</span>
                            </div>
                            <h2 className="text-2xl font-display font-bold mb-4">{selectedProduct.name}</h2>
                            <p className="text-stone-600 mb-6">{selectedProduct.description}</p>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                                <div className="bg-stone-50 p-4 rounded-xl text-center">
                                    <Ruler size={20} className="mx-auto mb-2 text-sage" />
                                    <div className="text-xs text-stone-500">Size</div>
                                    <div className="font-semibold">{selectedProduct.size}</div>
                                </div>
                                <div className="bg-stone-50 p-4 rounded-xl text-center">
                                    <Droplets size={20} className="mx-auto mb-2 text-sage" />
                                    <div className="text-xs text-stone-500">Oil Content</div>
                                    <div className="font-semibold">{selectedProduct.oilContent}</div>
                                </div>
                                <div className="bg-stone-50 p-4 rounded-xl text-center">
                                    <Package size={20} className="mx-auto mb-2 text-sage" />
                                    <div className="text-xs text-stone-500">Moisture</div>
                                    <div className="font-semibold">{selectedProduct.moisture}</div>
                                </div>
                                <div className="bg-stone-50 p-4 rounded-xl text-center">
                                    <Palette size={20} className="mx-auto mb-2 text-sage" />
                                    <div className="text-xs text-stone-500">Color</div>
                                    <div className="font-semibold">{selectedProduct.color}</div>
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-2 mb-6">
                                {selectedProduct.certifications.map((cert, i) => (
                                    <span key={i} className="bg-gold/10 text-gold-dark px-3 py-1 rounded-full text-xs font-medium">
                                        ✓ {cert}
                                    </span>
                                ))}
                            </div>

                            <Link to="/contact" className="btn-primary btn-magnetic w-full justify-center" onClick={handleCloseModal}>
                                <span>Request Quote for {selectedProduct.grade}</span>
                            </Link>
                        </div>
                    </div>
                </div>
            )}

            {/* CTA */}
            <section className="py-16 px-6 bg-stone-100" data-nav-theme="light">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl font-display font-bold mb-4">Need Custom Specifications?</h2>
                    <p className="text-stone-600 mb-8">We offer tailored solutions for bulk orders and specific requirements.</p>
                    <Link to="/contact" className="btn-primary btn-magnetic">
                        <span>Contact Our Export Team</span> <ArrowRight size={18} />
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default ProductsPage;
