import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useDebouncedCallback } from 'use-debounce';
import { BookOpen, Search, Clock, ChefHat, Leaf, ArrowRight, Filter } from 'lucide-react';
import OptimizedImg from '../components/OptimizedImg';

gsap.registerPlugin(ScrollTrigger);

const KnowledgePage = () => {
    const [activeTab, setActiveTab] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [searchInput, setSearchInput] = useState(''); // Local state for immediate display

    // Memoize articles array to prevent recreation on each render
    const articles = useMemo(() => [
        {
            id: 1,
            category: 'guide',
            title: 'Complete Guide to Green Cardamom Grades',
            excerpt: 'Understanding AGEB, AGB, AGS and other cardamom classifications for import decisions.',
            readTime: '8 min',
            image: '/images/cardamom-content/cardamom_grading.png',
            date: '2026-01-15'
        },
        {
            id: 2,
            category: 'recipe',
            title: 'Traditional Arabic Coffee with Cardamom',
            excerpt: 'The authentic Gahwa recipe using premium green cardamom for rich, aromatic coffee.',
            readTime: '5 min',
            image: '/images/cardamom-content/cardamom_usage_arabic.png',
            date: '2026-01-10'
        },
        {
            id: 3,
            category: 'guide',
            title: 'How to Store Cardamom for Maximum Freshness',
            excerpt: 'Best practices for storing cardamom pods to preserve aroma and essential oils.',
            readTime: '4 min',
            image: '/images/cardamom-content/cardamom_sorting.png',
            date: '2026-01-08'
        },
        {
            id: 4,
            category: 'recipe',
            title: 'Cardamom Spiced Rice Pilaf',
            excerpt: 'A fragrant Middle Eastern rice dish featuring whole cardamom pods.',
            readTime: '6 min',
            image: '/images/indian-biryani.png',
            date: '2026-01-05'
        },
        {
            id: 5,
            category: 'health',
            title: 'Health Benefits of Green Cardamom',
            excerpt: 'Scientific research on digestive health, antioxidants, and medicinal properties.',
            readTime: '7 min',
            image: '/images/health-ayurveda.png',
            date: '2026-01-01'
        },
        {
            id: 6,
            category: 'recipe',
            title: 'Swedish Cardamom Buns (Kardemummabullar)',
            excerpt: 'Classic Scandinavian sweet rolls with aromatic cardamom filling.',
            readTime: '12 min',
            image: '/images/scandinavian-buns.png',
            date: '2025-12-28'
        }
    ], []);

    // Memoize tabs array
    const tabs = useMemo(() => [
        { id: 'all', name: 'All', icon: <BookOpen size={16} /> },
        { id: 'guide', name: 'Guides', icon: <Leaf size={16} /> },
        { id: 'recipe', name: 'Recipes', icon: <ChefHat size={16} /> },
        { id: 'health', name: 'Health', icon: <Leaf size={16} /> }
    ], []);

    // Memoize filtered articles computation
    const filteredArticles = useMemo(() => articles.filter(article => {
        const matchesTab = activeTab === 'all' || article.category === activeTab;
        const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesTab && matchesSearch;
    }), [articles, activeTab, searchQuery]);

    // Memoize tab change handler
    const handleTabChange = useCallback((tabId) => {
        setActiveTab(tabId);
    }, []);

    // Debounce search query update for better performance
    const debouncedSetSearch = useDebouncedCallback((value) => {
        setSearchQuery(value);
    }, 150);

    // Handle search input change
    const handleSearchChange = useCallback((e) => {
        const value = e.target.value;
        setSearchInput(value);
        debouncedSetSearch(value);
    }, [debouncedSetSearch]);

    useEffect(() => {
        gsap.fromTo('.article-card',
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.5, stagger: 0.08, ease: 'power2.out' }
        );
    }, [activeTab, searchQuery]);

    return (
        <div className="min-h-screen bg-cream">
            {/* Hero */}
            <section className="py-32 px-6 bg-gradient-to-br from-sage to-forest text-white text-center" data-nav-theme="dark">
                <BookOpen className="mx-auto mb-6" size={48} />
                <span className="text-gold text-sm font-semibold tracking-widest uppercase">Knowledge Hub</span>
                <h1 className="text-5xl md:text-6xl font-display font-bold mt-4 mb-6">
                    Cardamom <span className="font-handwritten text-gold">Insights</span>
                </h1>
                <p className="text-lg opacity-80 max-w-2xl mx-auto">
                    Guides, recipes, and expert tips from the heart of cardamom country
                </p>
            </section>

            {/* Filters */}
            <section className="py-8 px-6 bg-white border-b border-stone-200 sticky top-0 z-40" data-nav-theme="light">
                <div className="max-w-6xl mx-auto flex flex-wrap gap-4 items-center justify-between">
                    <div className="flex flex-wrap gap-2">
                        {tabs.map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => handleTabChange(tab.id)}
                                className={`px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2 transition-all ${activeTab === tab.id
                                    ? 'bg-sage text-white'
                                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                                    }`}
                            >
                                {tab.icon} {tab.name}
                            </button>
                        ))}
                    </div>
                    <div className="relative">
                        <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                        <input
                            type="text"
                            placeholder="Search articles..."
                            value={searchInput}
                            onChange={handleSearchChange}
                            className="pl-10 pr-4 py-2 border border-stone-200 rounded-full text-sm focus:ring-2 focus:ring-sage focus:border-transparent"
                        />
                    </div>
                </div>
            </section>

            {/* Articles Grid */}
            <section className="py-16 px-6" data-nav-theme="light">
                <div className="max-w-6xl mx-auto">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredArticles.map((article) => (
                            <article key={article.id} className="article-card bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all group">
                                <div className="relative h-48 bg-gradient-to-br from-sage/10 to-gold/10 overflow-hidden">
                                    <OptimizedImg
                                        src={article.image}
                                        alt={article.title}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                    />
                                    <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold text-white ${article.category === 'recipe' ? 'bg-coral' :
                                        article.category === 'guide' ? 'bg-forest' : 'bg-sage'
                                        }`}>
                                        {article.category === 'recipe' ? '🍳 Recipe' :
                                            article.category === 'guide' ? '📖 Guide' : '💚 Health'}
                                    </div>
                                </div>
                                <div className="p-6">
                                    <div className="flex items-center gap-3 text-xs text-stone-500 mb-3">
                                        <span className="flex items-center gap-1">
                                            <Clock size={12} /> {article.readTime}
                                        </span>
                                        <span>{new Date(article.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                                    </div>
                                    <h3 className="text-lg font-display font-semibold mb-2 group-hover:text-sage transition-colors">{article.title}</h3>
                                    <p className="text-sm text-stone-600 mb-4 line-clamp-2">{article.excerpt}</p>
                                    <button className="text-sage font-medium text-sm flex items-center gap-1 group-hover:text-forest transition-colors">
                                        Read More <ArrowRight size={14} />
                                    </button>
                                </div>
                            </article>
                        ))}
                    </div>

                    {filteredArticles.length === 0 && (
                        <div className="text-center py-16 text-stone-500">
                            <BookOpen size={48} className="mx-auto mb-4 opacity-50" />
                            <p>No articles found matching your search.</p>
                        </div>
                    )}
                </div>
            </section>

            {/* Newsletter CTA */}
            <section className="py-20 px-6 bg-forest text-white" data-nav-theme="dark">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl font-display font-bold mb-4">Stay Updated</h2>
                    <p className="opacity-80 mb-8">Get the latest cardamom insights, recipes, and industry news delivered to your inbox.</p>
                    <form className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="flex-1 px-6 py-4 rounded-full text-stone-800 focus:ring-2 focus:ring-gold"
                        />
                        <button type="submit" className="bg-gold text-forest px-8 py-4 rounded-full font-semibold hover:bg-gold-light transition-colors">
                            Subscribe
                        </button>
                    </form>
                </div>
            </section>
        </div>
    );
};

export default KnowledgePage;
