import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, X, ShoppingBag } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Modal from '../../components/Modal';
import { useCart } from '../../contexts/CartContext';

gsap.registerPlugin(ScrollTrigger);

const ProductsSection = () => {
    const sectionRef = useRef(null);
    const [showAllProducts, setShowAllProducts] = useState(false);
    const { addToCart } = useCart();

    // All 6 products with Emperor grade naming convention
    const allProducts = [
        {
            grade: 'ESJ',
            name: 'Emperor Special Jumbo',
            size: '8.2mm+',
            oil: '8-10%',
            moisture: '<10%',
            color: 'Violet',
            colorHex: '#8B5CF6',
            image: '/images/emperor_brand_pouch/Emperor_brand_pouch_violet.jpg',
            bestFor: 'Premium Retail, Luxury Gifting, Arabic Coffee',
            price: '₹ 3,200/kg'
        },
        {
            grade: 'EJ',
            name: 'Emperor Jumbo',
            size: '7.8mm Bold',
            oil: '7-8%',
            moisture: '<10%',
            color: 'Red',
            colorHex: '#EF4444',
            image: '/images/emperor_brand_pouch/Emperor_brand_pouch_red.jpg',
            bestFor: 'Middle East, Bulk Export',
            price: '₹ 2,950/kg'
        },
        {
            grade: 'ESB',
            name: 'Emperor Special Bold',
            size: '7.8mm',
            oil: '6-7%',
            moisture: '<11%',
            color: 'Blue',
            colorHex: '#3B82F6',
            image: '/images/emperor_brand_pouch/Emperor_brand_pouch_blue.jpg',
            bestFor: 'European Markets, Premium Retail',
            price: '₹ 2,750/kg'
        },
        {
            grade: 'EB',
            name: 'Emperor Bold',
            size: '7.3mm',
            oil: '5-6%',
            moisture: '<11%',
            color: 'Orange',
            colorHex: '#F97316',
            image: '/images/emperor_brand_pouch/Emperor_brand_pouch_fanta.jpg',
            bestFor: 'Food Processing, Hospitality',
            price: '₹ 2,450/kg'
        },
        {
            grade: 'ESM',
            name: 'Emperor Special Medium',
            size: '6.5mm',
            oil: '4-5%',
            moisture: '<12%',
            color: 'Ocean Green',
            colorHex: '#06B6D4',
            image: '/images/emperor_brand_pouch/Emperor_brand_pouch_ocean_green.png',
            bestFor: 'Masala Manufacturing, Bakery',
            price: '₹ 2,200/kg'
        },
        {
            grade: 'EM',
            name: 'Emperor Medium',
            size: '6mm',
            oil: '3-4%',
            moisture: '<12%',
            color: 'Magenta Pink',
            colorHex: '#EC4899',
            image: '/images/emperor_brand_pouch/Emperor_brand_pouch_magenta_pink.jpg',
            bestFor: 'Bulk Processing, Value Segment',
            price: '₹ 1,950/kg'
        },
    ];

    // Show first 3 on main page
    const displayProducts = allProducts.slice(0, 3);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo('.products-title',
                { opacity: 0, y: 50 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 75%',
                    },
                }
            );

            gsap.fromTo('.products-subtitle',
                { opacity: 0, y: 30 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 70%',
                    },
                }
            );

            gsap.fromTo('.product-card',
                { opacity: 0, y: 80, rotateX: -15, scale: 0.9 },
                {
                    opacity: 1,
                    y: 0,
                    rotateX: 0,
                    scale: 1,
                    duration: 0.8,
                    stagger: 0.15,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: '.products-grid',
                        start: 'top 85%',
                    },
                }
            );

            gsap.fromTo('.products-cta',
                { opacity: 0, y: 30 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.6,
                    scrollTrigger: {
                        trigger: '.products-cta',
                        start: 'top 95%',
                    },
                }
            );

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const ProductCard = ({ product, inModal = false }) => (
        <div className={inModal ? '' : 'card product-card'} style={{
            overflow: 'hidden',
            transformStyle: 'preserve-3d',
            background: 'white',
            borderRadius: '20px',
            boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
            border: `2px solid ${product.colorHex}20`,
            transition: 'all 0.3s ease'
        }}>
            {/* Color Accent Strip */}
            <div style={{
                height: '6px',
                background: `linear-gradient(90deg, ${product.colorHex}, ${product.colorHex}99)`,
                borderRadius: '20px 20px 0 0'
            }} />

            {/* Product Image Area */}
            <div style={{
                height: inModal ? '140px' : '160px',
                background: `radial-gradient(circle at 50% 50%, ${product.colorHex}15 0%, transparent 70%)`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '1rem',
                position: 'relative'
            }}>
                <img
                    src={product.image}
                    alt={product.name}
                    style={{
                        maxHeight: '100%',
                        maxWidth: '100%',
                        objectFit: 'contain',
                        filter: 'drop-shadow(0 8px 16px rgba(0,0,0,0.15))',
                        transition: 'transform 0.3s ease'
                    }}
                />

                {/* Floating Price Bubble */}
                <div style={{
                    position: 'absolute',
                    top: '8px',
                    right: '8px',
                    background: 'rgba(255,255,255,0.95)',
                    backdropFilter: 'blur(10px)',
                    padding: '6px 10px',
                    borderRadius: '12px',
                    fontWeight: '700',
                    fontSize: '0.8rem',
                    boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
                    color: product.colorHex,
                    border: `1px solid ${product.colorHex}30`
                }}>
                    {product.price}
                </div>
            </div>

            {/* Card Content */}
            <div style={{
                padding: inModal ? '0.75rem' : '1rem',
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                background: 'linear-gradient(180deg, #fafafa 0%, white 100%)'
            }}>
                {/* Grade Badge */}
                <div style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: `linear-gradient(135deg, ${product.colorHex} 0%, ${product.colorHex}cc 100%)`,
                    color: 'white',
                    padding: '4px 10px',
                    borderRadius: '20px',
                    fontSize: '0.7rem',
                    fontWeight: '800',
                    marginBottom: '4px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    boxShadow: `0 4px 12px ${product.colorHex}40`
                }}>
                    {product.grade}
                </div>
                {/* Color Name - Outside Badge */}
                <span style={{
                    fontSize: '0.65rem',
                    color: product.colorHex,
                    fontWeight: '600',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    marginBottom: '0.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '4px'
                }}>
                    <span style={{
                        width: '6px',
                        height: '6px',
                        background: product.colorHex,
                        borderRadius: '50%'
                    }} />
                    {product.color}
                </span>

                {/* Product Name */}
                <h3 style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: inModal ? '0.9rem' : '0.95rem',
                    fontWeight: '700',
                    marginBottom: '0.5rem',
                    color: '#1a1a1a',
                    lineHeight: '1.3'
                }}>
                    {product.name}
                </h3>

                {/* Specs - Chip Style */}
                <div style={{
                    display: 'flex',
                    gap: '6px',
                    flexWrap: 'wrap',
                    marginTop: 'auto'
                }}>
                    <span style={{
                        background: '#f5f5f5',
                        padding: '4px 8px',
                        borderRadius: '6px',
                        fontSize: '0.7rem',
                        color: '#666',
                        fontWeight: '500'
                    }}>
                        📏 {product.size}
                    </span>
                    <span style={{
                        background: '#f5f5f5',
                        padding: '4px 8px',
                        borderRadius: '6px',
                        fontSize: '0.7rem',
                        color: '#666',
                        fontWeight: '500'
                    }}>
                        💧 {product.oil}
                    </span>
                </div>

                {/* Add to Cart Button */}
                <button
                    onClick={() => addToCart(product)}
                    style={{
                        marginTop: '0.75rem',
                        background: `linear-gradient(135deg, var(--color-forest) 0%, #1a4030 100%)`,
                        color: 'white',
                        border: 'none',
                        padding: '10px',
                        borderRadius: '12px',
                        fontWeight: '600',
                        fontSize: '0.8rem',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px',
                        transition: 'all 0.2s ease',
                        boxShadow: '0 4px 12px rgba(45, 107, 74, 0.25)'
                    }}
                    onMouseOver={e => {
                        e.currentTarget.style.transform = 'translateY(-2px)';
                        e.currentTarget.style.boxShadow = '0 6px 20px rgba(45, 107, 74, 0.35)';
                    }}
                    onMouseOut={e => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = '0 4px 12px rgba(45, 107, 74, 0.25)';
                    }}
                >
                    <ShoppingBag size={14} /> Add
                </button>
            </div>
        </div>
    );

    return (
        <>
            <section className="section section-white section-center" id="products" ref={sectionRef}>
                <div className="container">
                    <h2 className="section-title products-title">
                        Premium <span className="script">Grades</span> for Every Market
                    </h2>
                    <p className="section-subtitle mx-auto products-subtitle">
                        Order our AGMARK certified cardamom online
                    </p>

                    {/* Products Grid - Horizontal scroll on mobile */}
                    <div className="products-scroll-wrapper">
                        <div className="products-grid-scroll">
                            {displayProducts.map((product, index) => (
                                <ProductCard key={index} product={product} />
                            ))}
                        </div>
                    </div>

                    <div className="products-cta" style={{ marginTop: '2rem' }}>
                        <button
                            onClick={() => setShowAllProducts(true)}
                            className="btn btn-primary"
                        >
                            View All Products <ArrowRight size={16} />
                        </button>
                    </div>
                </div>

                <style>{`
                    .products-scroll-wrapper {
                        margin-top: 2rem;
                    }
                    .products-grid-scroll {
                        display: grid;
                        grid-template-columns: repeat(3, 1fr);
                        gap: 1.5rem;
                        perspective: 1000px;
                    }
                    @media (max-width: 768px) {
                        .products-scroll-wrapper {
                            margin-left: -1rem;
                            margin-right: -1rem;
                            padding: 0 1rem;
                            overflow-x: auto;
                            -webkit-overflow-scrolling: touch;
                            scrollbar-width: none;
                        }
                        .products-scroll-wrapper::-webkit-scrollbar {
                            display: none;
                        }
                        .products-grid-scroll {
                            display: flex;
                            gap: 0.75rem;
                            padding-bottom: 0.5rem;
                        }
                        .products-grid-scroll .product-card {
                            flex-shrink: 0;
                            width: 200px;
                        }
                        .products-grid-scroll .product-card .card-content {
                            padding: 1rem !important;
                        }
                        .products-grid-scroll .product-card h3 {
                            font-size: 0.9rem !important;
                        }
                    }
                `}</style>
            </section>

            {/* View All Products Modal */}
            <Modal
                isOpen={showAllProducts}
                onClose={() => setShowAllProducts(false)}
                title="Shop All Cardamom Grades"
                size="xlarge"
            >
                <div className="products-modal-grid" style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                    gap: '1.5rem',
                    padding: '10px'
                }}>
                    {allProducts.map((product, index) => (
                        <ProductCard key={index} product={product} inModal={true} />
                    ))}
                </div>
                <style>{`
                    @media (max-width: 768px) {
                        .products-modal-grid {
                            grid-template-columns: repeat(3, 1fr) !important;
                            gap: 0.5rem !important;
                            padding: 5px !important;
                        }
                        .products-modal-grid .product-card {
                            display: flex !important;
                            flex-direction: column !important;
                        }
                        .products-modal-grid .product-card > div:first-child {
                            height: 100px !important;
                            padding: 0.5rem !important;
                        }
                        .products-modal-grid .product-card img {
                            max-height: 80px !important;
                            width: auto !important;
                        }
                        .products-modal-grid .product-card > div:nth-child(2) {
                            padding: 0.5rem !important;
                            text-align: center !important;
                        }
                        .products-modal-grid .product-card h3 {
                            font-size: 0.7rem !important;
                            line-height: 1.2 !important;
                            text-align: center !important;
                        }
                        .products-modal-grid .product-card > div:nth-child(2) > div:first-child {
                            font-size: 0.55rem !important;
                            padding: 3px 6px !important;
                            margin: 0 auto 0.4rem auto !important;
                        }
                        .products-modal-grid .product-card > div:first-child > div {
                            font-size: 0.65rem !important;
                            padding: 3px 6px !important;
                        }
                    }
                `}</style>
            </Modal>
        </>
    );
};

export default ProductsSection;
