import React, { useState, useEffect, useRef, useContext } from 'react';
import gsap from 'gsap';
import { X, ChevronLeft, ChevronRight, View, Image } from 'lucide-react';
import { QuoteModalContext } from '../App';
import ProductViewer360 from './ProductViewer360';
import OptimizedImg from './OptimizedImg';

const ProductModal = ({ product, isOpen, onClose }) => {
    const [currentImage, setCurrentImage] = useState(0);
    const [is360View, setIs360View] = useState(false);
    const modalRef = useRef(null);
    const contentRef = useRef(null);
    const backdropRef = useRef(null);
    const quoteModal = useContext(QuoteModalContext);

    // Default product data structure
    const defaultProduct = {
        name: 'Alleppey Green Extra Bold',
        grade: 'AGEB',
        size: '8mm+',
        oilContent: '7-8%',
        moisture: '<10%',
        color: 'Deep Green',
        origin: 'Kerala, India',
        bestFor: 'Premium Retail, Luxury Gifting',
        description: 'Our finest grade cardamom with exceptional aroma and bold size. Hand-selected from the best harvests of the Western Ghats.',
        images: ['/images/cardamom-pods.png'],
        specifications: [
            { label: 'Size', value: '8mm+' },
            { label: 'Oil Content', value: '7-8%' },
            { label: 'Moisture', value: '<10%' },
            { label: 'Color Grade', value: 'Deep Green' },
            { label: 'Origin', value: 'Kerala, India' },
            { label: 'Certification', value: 'FSSAI, ISO' }
        ]
    };

    const productData = product || defaultProduct;

    // Reset 360 view state when product changes
    useEffect(() => {
        setIs360View(false);
        setCurrentImage(0);
    }, [product]);

    useEffect(() => {
        if (isOpen) {
            // Save current scroll position and lock body
            const scrollY = window.scrollY;
            document.documentElement.style.overflow = 'hidden';
            document.body.style.position = 'fixed';
            document.body.style.top = `-${scrollY}px`;
            document.body.style.left = '0';
            document.body.style.right = '0';
            document.body.style.overflow = 'hidden';
            document.body.classList.add('modal-open');

            // GPU acceleration hints for flicker prevention
            gsap.set(contentRef.current, {
                willChange: 'transform, opacity',
                backfaceVisibility: 'hidden',
                transform: 'translateZ(0)'
            });
            gsap.set(backdropRef.current, {
                willChange: 'opacity',
                backfaceVisibility: 'hidden'
            });

            // Open animation
            const tl = gsap.timeline();
            tl.set(modalRef.current, { display: 'flex' })
                .fromTo(backdropRef.current,
                    { opacity: 0 },
                    { opacity: 1, duration: 0.3 }
                )
                .fromTo(contentRef.current,
                    { y: '100%', opacity: 0 },
                    { y: '0%', opacity: 1, duration: 0.5, ease: 'power3.out' },
                    '-=0.1'
                );
        } else {
            // Close animation
            const tl = gsap.timeline({
                onComplete: () => {
                    // Reset GPU hints to prevent memory issues
                    if (contentRef.current) {
                        gsap.set(contentRef.current, { willChange: 'auto' });
                    }
                    if (backdropRef.current) {
                        gsap.set(backdropRef.current, { willChange: 'auto' });
                    }
                    if (modalRef.current) {
                        modalRef.current.style.display = 'none';
                    }
                    // Restore body scroll position
                    const scrollY = document.body.style.top;
                    document.documentElement.style.overflow = '';
                    document.body.style.position = '';
                    document.body.style.top = '';
                    document.body.style.left = '';
                    document.body.style.right = '';
                    document.body.style.overflow = '';
                    document.body.classList.remove('modal-open');
                    if (scrollY) {
                        window.scrollTo(0, parseInt(scrollY || '0') * -1);
                    }
                    // Reset 360 view on close
                    setIs360View(false);
                }
            });
            tl.to(contentRef.current, { y: '100%', opacity: 0, duration: 0.4, ease: 'power3.in' })
                .to(backdropRef.current, { opacity: 0, duration: 0.2 }, '-=0.2');
        }

        // ESC key to close
        const handleEsc = (e) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleEsc);

        return () => {
            window.removeEventListener('keydown', handleEsc);
            // Cleanup: restore body scroll if component unmounts while open
            if (isOpen) {
                const scrollY = document.body.style.top;
                document.body.style.position = '';
                document.body.style.top = '';
                document.body.style.left = '';
                document.body.style.right = '';
                document.body.style.overflow = '';
                document.body.classList.remove('modal-open');
                if (scrollY) {
                    window.scrollTo(0, parseInt(scrollY || '0') * -1);
                }
            }
        };
    }, [isOpen, onClose]);

    const nextImage = () => {
        setCurrentImage((prev) => (prev + 1) % productData.images.length);
    };

    const prevImage = () => {
        setCurrentImage((prev) => (prev - 1 + productData.images.length) % productData.images.length);
    };

    return (
        <div ref={modalRef} className="product-modal" style={{ display: 'none' }}>
            {/* Backdrop */}
            <div
                ref={backdropRef}
                className="product-modal-backdrop"
                onClick={onClose}
            />

            {/* Content */}
            <div ref={contentRef} className="product-modal-content">
                {/* Close Button */}
                <button className="product-modal-close" onClick={onClose}>
                    <X size={24} />
                </button>

                <div className="product-modal-grid">
                    {/* Image Gallery */}
                    <div className="product-modal-gallery">
                        {/* View Toggle */}
                        <div className="gallery-view-toggle">
                            <button
                                className={`view-toggle-btn ${!is360View ? 'active' : ''}`}
                                onClick={() => setIs360View(false)}
                                title="Standard view"
                            >
                                <Image size={16} />
                                <span>Photo</span>
                            </button>
                            <button
                                className={`view-toggle-btn ${is360View ? 'active' : ''}`}
                                onClick={() => setIs360View(true)}
                                title="360° view"
                            >
                                <View size={16} />
                                <span>360°</span>
                            </button>
                        </div>

                        {is360View ? (
                            <ProductViewer360
                                imageSrc={productData.images[0]}
                                productName={productData.name}
                            />
                        ) : (
                            <>
                                <div className="product-modal-image">
                                    <OptimizedImg
                                        src={productData.images[currentImage]}
                                        alt={productData.name}
                                        sizes="(max-width: 768px) 100vw, 50vw"
                                    />
                                </div>
                                {productData.images.length > 1 && (
                                    <div className="product-modal-nav">
                                        <button onClick={prevImage} className="gallery-nav-btn">
                                            <ChevronLeft size={20} />
                                        </button>
                                        <span className="gallery-counter">
                                            {currentImage + 1} / {productData.images.length}
                                        </span>
                                        <button onClick={nextImage} className="gallery-nav-btn">
                                            <ChevronRight size={20} />
                                        </button>
                                    </div>
                                )}
                            </>
                        )}
                    </div>

                    {/* Product Info */}
                    <div className="product-modal-info">
                        <div className="product-modal-header">
                            <span className="product-grade-badge">{productData.grade}</span>
                            <h2 className="product-modal-title">{productData.name}</h2>
                            <p className="product-modal-origin">Origin: {productData.origin}</p>
                        </div>

                        <p className="product-modal-description">{productData.description}</p>

                        {/* Specifications Table */}
                        <div className="product-specs">
                            <h3 className="product-specs-title">Specifications</h3>
                            <div className="product-specs-grid">
                                {productData.specifications.map((spec, index) => (
                                    <div key={index} className="product-spec-item">
                                        <span className="spec-label">{spec.label}</span>
                                        <span className="spec-value">{spec.value}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Best For Tags */}
                        <div className="product-best-for">
                            <span className="best-for-label">Best For:</span>
                            <div className="best-for-tags">
                                {Array.isArray(productData.bestFor)
                                    ? productData.bestFor.map((use, i) => (
                                        <span key={i} className="best-for-tag">{use}</span>
                                    ))
                                    : <span className="best-for-value">{productData.bestFor}</span>
                                }
                            </div>
                        </div>

                        {/* CTA Buttons */}
                        <div className="product-modal-cta">
                            <button className="btn-primary btn-magnetic">
                                <span>Request Sample</span>
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M5 12h14M12 5l7 7-7 7" />
                                </svg>
                            </button>
                            <button
                                className="btn-secondary btn-magnetic"
                                onClick={() => {
                                    // Map product grade to product value for the quote modal
                                    const gradeMap = {
                                        'AGEB': 'ageb',
                                        'AGB': 'agb',
                                        'AGS': 'ags',
                                        'SEEDS': 'seeds'
                                    };
                                    const productValue = gradeMap[productData.grade] || '';
                                    onClose();
                                    quoteModal?.openQuoteModal(productValue);
                                }}
                            >
                                <span>Get Quote</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductModal;
