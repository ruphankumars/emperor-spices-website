import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, X, ShoppingBag } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Modal from '../components/Modal';
import { useCart } from '../contexts/CartContext';

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
            image: '/images/Emperor_brand_pouch/Emperor_brand_pouch_violet.jpg',
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
            image: '/images/Emperor_brand_pouch/Emperor_brand_pouch_red.jpg',
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
            image: '/images/Emperor_brand_pouch/Emperor_brand_pouch_blue.jpg',
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
            image: '/images/Emperor_brand_pouch/Emperor_brand_pouch_fanta.jpg',
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
            image: '/images/Emperor_brand_pouch/Emperor_brand_pouch_ocean_green.png',
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
            image: '/images/Emperor_brand_pouch/Emperor_brand_pouch_magenta_pink.jpg',
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
            borderRadius: '12px',
            boxShadow: inModal ? '0 4px 20px rgba(0,0,0,0.08)' : undefined,
            display: 'flex', flexDirection: 'column'
        }}>
            <div style={{
                height: inModal ? '180px' : '220px',
                background: `linear-gradient(135deg, ${product.colorHex}15 0%, ${product.colorHex}25 100%)`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '1.5rem',
                position: 'relative'
            }}>
                <img
                    src={product.image}
                    alt={product.name}
                    style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }}
                />
                <div style={{
                    position: 'absolute', top: '12px', right: '12px',
                    background: 'rgba(255,255,255,0.9)', padding: '6px 12px',
                    borderRadius: '100px', fontWeight: '700', fontSize: '0.9rem',
                    boxShadow: '0 4px 10px rgba(0,0,0,0.05)', color: 'var(--color-forest)'
                }}>
                    {product.price}
                </div>
            </div>
            <div className="card-content" style={{ padding: inModal ? '1rem' : '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <div style={{
                    display: 'inline-block',
                    background: product.colorHex,
                    color: 'white',
                    padding: '0.25rem 0.75rem',
                    borderRadius: '4px',
                    fontSize: '0.75rem',
                    fontWeight: '600',
                    marginBottom: '0.75rem',
                    alignSelf: 'flex-start'
                }}>
                    {product.grade} • {product.color}
                </div>
                <h3 style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: inModal ? '1rem' : '1.1rem',
                    fontWeight: '600',
                    marginBottom: '0.5rem'
                }}>
                    {product.name}
                </h3>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '0.5rem',
                    marginTop: '0.5rem',
                    fontSize: '0.85rem'
                }}>
                    <div><strong>Size:</strong> {product.size}</div>
                    <div><strong>Oil:</strong> {product.oil}</div>
                </div>

                <div style={{ marginTop: 'auto', paddingTop: '1.5rem', display: 'flex', gap: '10px' }}>
                    <button
                        onClick={() => addToCart(product)}
                        style={{
                            flex: 1, background: 'var(--color-forest)', color: 'white', border: 'none',
                            padding: '10px', borderRadius: '8px', fontWeight: '600', cursor: 'pointer',
                            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                            transition: 'background 0.2s'
                        }}
                        onMouseOver={e => e.currentTarget.style.background = '#1a4030'}
                        onMouseOut={e => e.currentTarget.style.background = 'var(--color-forest)'}
                    >
                        <ShoppingBag size={16} /> Add to Cart
                    </button>
                </div>
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

                    {/* Products Grid */}
                    <div className="grid-3 products-grid" style={{ marginTop: '2rem', perspective: '1000px', justifyContent: 'center' }}>
                        {displayProducts.map((product, index) => (
                            <ProductCard key={index} product={product} />
                        ))}
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
            </section>

            {/* View All Products Modal */}
            <Modal
                isOpen={showAllProducts}
                onClose={() => setShowAllProducts(false)}
                title="Shop All Cardamom Grades"
                size="xlarge"
            >
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                    gap: '1.5rem',
                    padding: '10px'
                }}>
                    {allProducts.map((product, index) => (
                        <ProductCard key={index} product={product} inModal={true} />
                    ))}
                </div>
            </Modal>
        </>
    );
};

export default ProductsSection;
