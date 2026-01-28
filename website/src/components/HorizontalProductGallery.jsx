import React, { useRef, useEffect, useState, useCallback, useMemo } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useDebouncedCallback } from 'use-debounce';
import ProductModal from './ProductModal';
import OptimizedImg from './OptimizedImg';

gsap.registerPlugin(ScrollTrigger);

// Touch swipe constants
const SWIPE_THRESHOLD = 50; // Minimum distance for a swipe
const SWIPE_VELOCITY_THRESHOLD = 0.3; // Minimum velocity for a swipe

const products = [
    {
        name: "Alleppey Green Extra Bold",
        grade: "AGEB",
        size: "8mm+",
        sizeDisplay: "8mm+",
        sizeCategory: "extra-bold",
        oilContent: "7-8%",
        moisture: "<10%",
        color: "Deep Green",
        origin: "Kerala, India",
        bestFor: ["Premium Retail", "Luxury Gifting", "Arabic Coffee"],
        description: "Our finest grade cardamom with exceptional aroma and bold size. Hand-selected from the best harvests of the Western Ghats.",
        images: ["/images/cardamom-pods.png"],
        isPremium: true,
        specifications: [
            { label: "Size", value: "8mm+" },
            { label: "Oil Content", value: "7-8%" },
            { label: "Moisture", value: "<10%" },
            { label: "Color Grade", value: "Deep Green" }
        ]
    },
    {
        name: "Alleppey Green Bold 7.5mm",
        grade: "AGB-7.5",
        size: "7.5mm",
        sizeDisplay: "7.5mm",
        sizeCategory: "bold",
        oilContent: "6.5-7.5%",
        moisture: "<10%",
        color: "Bright Green",
        origin: "Kerala, India",
        bestFor: ["Gulf Markets", "European Export", "Premium Blends"],
        description: "Premium bold cardamom perfect for Middle East markets. Excellent aroma retention and consistent sizing.",
        images: ["/images/cardamom-pods.png"],
        isPremium: true,
        specifications: [
            { label: "Size", value: "7.5mm" },
            { label: "Oil Content", value: "6.5-7.5%" },
            { label: "Moisture", value: "<10%" },
            { label: "Color Grade", value: "Bright Green" }
        ]
    },
    {
        name: "Alleppey Green Bold 7mm",
        grade: "AGB-7",
        size: "7mm",
        sizeDisplay: "7mm",
        sizeCategory: "bold",
        oilContent: "6-7%",
        moisture: "<10%",
        color: "Bright Green",
        origin: "Kerala, India",
        bestFor: ["Middle East", "European Markets", "Food Service"],
        description: "Perfect balance of size and aroma for international markets. Consistent quality for regular export orders.",
        images: ["/images/cardamom-pods.png"],
        isPremium: false,
        specifications: [
            { label: "Size", value: "7mm" },
            { label: "Oil Content", value: "6-7%" },
            { label: "Moisture", value: "<10%" },
            { label: "Color Grade", value: "Bright Green" }
        ]
    },
    {
        name: "Alleppey Green Special 6.5mm",
        grade: "AGS-6.5",
        size: "6.5mm",
        sizeDisplay: "6.5mm",
        sizeCategory: "special",
        oilContent: "5.5-6.5%",
        moisture: "<11%",
        color: "Green",
        origin: "Tamil Nadu, India",
        bestFor: ["Food Processing", "Hospitality", "Retail Packs"],
        description: "Quality grade cardamom ideal for food processing and commercial kitchens. Excellent value for bulk orders.",
        images: ["/images/cardamom-pods.png"],
        isPremium: false,
        specifications: [
            { label: "Size", value: "6.5mm" },
            { label: "Oil Content", value: "5.5-6.5%" },
            { label: "Moisture", value: "<11%" },
            { label: "Color Grade", value: "Green" }
        ]
    },
    {
        name: "Alleppey Green 6mm",
        grade: "AG-6",
        size: "6mm",
        sizeDisplay: "6mm",
        sizeCategory: "standard",
        oilContent: "5-6%",
        moisture: "<11%",
        color: "Green",
        origin: "Tamil Nadu, India",
        bestFor: ["Spice Blends", "Masala Mfg.", "Bulk Orders"],
        description: "Excellent quality for culinary applications, spice blends, and masala manufacturers.",
        images: ["/images/cardamom-pods.png"],
        isPremium: false,
        specifications: [
            { label: "Size", value: "6mm" },
            { label: "Oil Content", value: "5-6%" },
            { label: "Moisture", value: "<11%" },
            { label: "Color Grade", value: "Green" }
        ]
    },
    {
        name: "Cardamom Seeds",
        grade: "SEEDS",
        size: "N/A",
        sizeDisplay: "Seeds",
        sizeCategory: "seeds",
        oilContent: "8-10%",
        moisture: "<8%",
        color: "Brown-Black",
        origin: "Kerala, India",
        bestFor: ["Essential Oils", "Pharmaceuticals", "Extracts"],
        description: "High oil content seeds ideal for extraction, pharmaceutical, and essential oil industries.",
        images: ["/images/cardamom-pods.png"],
        isPremium: false,
        specifications: [
            { label: "Oil Content", value: "8-10%" },
            { label: "Moisture", value: "<8%" },
            { label: "Color", value: "Brown-Black" },
            { label: "Use", value: "Extraction" }
        ]
    },
    {
        name: "Cardamom Powder",
        grade: "POWDER",
        size: "Fine Ground",
        sizeDisplay: "Powder",
        sizeCategory: "powder",
        oilContent: "6-7%",
        moisture: "<10%",
        color: "Olive Green",
        origin: "Tamil Nadu, India",
        bestFor: ["Bakery", "Spice Blends", "Ready Meals"],
        description: "Freshly ground cardamom powder with intense aroma. Perfect for bakery and spice blend manufacturers.",
        images: ["/images/cardamom-pods.png"],
        isPremium: false,
        specifications: [
            { label: "Grind", value: "Fine" },
            { label: "Oil Content", value: "6-7%" },
            { label: "Moisture", value: "<10%" },
            { label: "Color", value: "Olive Green" }
        ]
    }
];

const HorizontalProductGallery = () => {
    const containerRef = useRef(null);
    const trackRef = useRef(null);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const [isMobile, setIsMobile] = useState(false);
    const [showSwipeHint, setShowSwipeHint] = useState(true);

    // Memoize product selection handler
    const handleProductSelect = useCallback((product) => {
        setSelectedProduct(product);
    }, []);

    // Memoize modal close handler
    const handleCloseModal = useCallback(() => {
        setSelectedProduct(null);
    }, []);
    
    // Touch state refs
    const touchStartX = useRef(0);
    const touchStartY = useRef(0);
    const touchStartTime = useRef(0);
    const currentTranslateX = useRef(0);
    const isDragging = useRef(false);
    const isHorizontalSwipe = useRef(false);
    const scrollTriggerRef = useRef(null);

    // Debounced mobile detection for better resize performance
    const debouncedCheckMobile = useDebouncedCallback(() => {
        const mobile = window.innerWidth < 1024 || 
            ('ontouchstart' in window && window.innerWidth <= 1024);
        setIsMobile(mobile);
    }, 100);

    // Detect mobile devices
    useEffect(() => {
        // Initial check (immediate)
        const mobile = window.innerWidth < 1024 || 
            ('ontouchstart' in window && window.innerWidth <= 1024);
        setIsMobile(mobile);
        
        // Debounced resize listener
        window.addEventListener('resize', debouncedCheckMobile);
        return () => window.removeEventListener('resize', debouncedCheckMobile);
    }, [debouncedCheckMobile]);

    // Get card dimensions for mobile carousel
    const getCardMetrics = useCallback(() => {
        const track = trackRef.current;
        if (!track) return { cardWidth: 320, gap: 32, padding: 20 };
        const card = track.querySelector('.hpg-card');
        if (!card) return { cardWidth: 320, gap: 32, padding: 20 };
        const cardWidth = card.offsetWidth;
        const gap = parseInt(getComputedStyle(track).gap) || 32;
        const padding = window.innerWidth < 768 ? 20 : 32;
        return { cardWidth, gap, padding };
    }, []);

    // Navigate to specific card (mobile carousel)
    const navigateToCard = useCallback((index, immediate = false) => {
        const track = trackRef.current;
        if (!track || !isMobile) return;
        
        const clampedIndex = Math.max(0, Math.min(index, products.length - 1));
        const { cardWidth, gap, padding } = getCardMetrics();
        
        // Center the card in viewport
        const viewportWidth = window.innerWidth;
        const cardCenter = clampedIndex * (cardWidth + gap) + cardWidth / 2 + padding;
        const targetX = -(cardCenter - viewportWidth / 2);
        
        // Clamp to valid range
        const maxTranslate = 0;
        const totalWidth = products.length * (cardWidth + gap) - gap + padding * 2;
        const minTranslate = Math.min(0, -(totalWidth - viewportWidth));
        const clampedX = Math.max(minTranslate, Math.min(maxTranslate, targetX));
        
        if (immediate) {
            gsap.set(track, { x: clampedX });
        } else {
            gsap.to(track, {
                x: clampedX,
                duration: 0.4,
                ease: "power2.out"
            });
        }
        
        currentTranslateX.current = clampedX;
        setActiveIndex(clampedIndex);
        
        // Hide swipe hint after first interaction
        if (showSwipeHint) {
            setShowSwipeHint(false);
        }
    }, [isMobile, getCardMetrics, showSwipeHint]);

    // Touch handlers for mobile swipe navigation
    const handleTouchStart = useCallback((e) => {
        if (!isMobile) return;
        
        const touch = e.touches[0];
        touchStartX.current = touch.clientX;
        touchStartY.current = touch.clientY;
        touchStartTime.current = Date.now();
        isDragging.current = true;
        isHorizontalSwipe.current = false;
        
        // Get current transform value
        const track = trackRef.current;
        if (track) {
            const transform = window.getComputedStyle(track).transform;
            if (transform !== 'none') {
                const matrix = new DOMMatrix(transform);
                currentTranslateX.current = matrix.m41;
            }
        }
        
        // Kill any ongoing animation
        gsap.killTweensOf(track);
    }, [isMobile]);

    const handleTouchMove = useCallback((e) => {
        if (!isMobile || !isDragging.current) return;
        
        const touch = e.touches[0];
        const deltaX = touch.clientX - touchStartX.current;
        const deltaY = touch.clientY - touchStartY.current;
        
        // Determine swipe direction on first significant movement
        if (!isHorizontalSwipe.current && (Math.abs(deltaX) > 10 || Math.abs(deltaY) > 10)) {
            isHorizontalSwipe.current = Math.abs(deltaX) > Math.abs(deltaY);
        }
        
        // If vertical movement is dominant, let browser handle scroll
        if (!isHorizontalSwipe.current) {
            return;
        }
        
        // Prevent default for horizontal swipes to avoid page bouncing
        e.preventDefault();
        
        const track = trackRef.current;
        if (!track) return;
        
        // Calculate bounds
        const { cardWidth, gap, padding } = getCardMetrics();
        const maxTranslate = 0;
        const totalWidth = products.length * (cardWidth + gap) - gap + padding * 2;
        const minTranslate = Math.min(0, -(totalWidth - window.innerWidth));
        
        // Apply rubber band effect at boundaries
        let newTranslateX = currentTranslateX.current + deltaX;
        if (newTranslateX > maxTranslate) {
            newTranslateX = maxTranslate + (newTranslateX - maxTranslate) * 0.2;
        } else if (newTranslateX < minTranslate) {
            newTranslateX = minTranslate + (newTranslateX - minTranslate) * 0.2;
        }
        
        gsap.set(track, { x: newTranslateX });
    }, [isMobile, getCardMetrics]);

    const handleTouchEnd = useCallback((e) => {
        if (!isMobile || !isDragging.current) return;
        
        isDragging.current = false;
        
        // If it was a vertical scroll, ignore
        if (!isHorizontalSwipe.current) return;
        
        const touch = e.changedTouches[0];
        const deltaX = touch.clientX - touchStartX.current;
        const deltaTime = Date.now() - touchStartTime.current;
        const velocity = Math.abs(deltaX) / deltaTime;
        
        // Determine if this was a swipe or drag
        const isQuickSwipe = velocity > SWIPE_VELOCITY_THRESHOLD && Math.abs(deltaX) > 30;
        const isLongDrag = Math.abs(deltaX) > SWIPE_THRESHOLD;
        
        if (isQuickSwipe || isLongDrag) {
            // Navigate to next/prev card
            if (deltaX > 0) {
                navigateToCard(activeIndex - 1);
            } else {
                navigateToCard(activeIndex + 1);
            }
        } else {
            // Not a swipe - snap back to current card
            navigateToCard(activeIndex);
        }
    }, [isMobile, activeIndex, navigateToCard]);

    // Desktop: Scroll-triggered horizontal scroll
    // Mobile: Direct touch carousel
    useEffect(() => {
        const container = containerRef.current;
        const track = trackRef.current;

        if (!container || !track) return;

        // Mobile mode: Setup carousel
        if (isMobile) {
            // Initialize position
            navigateToCard(0, true);
            
            // Card entrance animations
            const cards = track.querySelectorAll('.hpg-card');
            cards.forEach((card, i) => {
                gsap.fromTo(card,
                    { opacity: 0, y: 30 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.5,
                        delay: i * 0.08,
                        scrollTrigger: {
                            trigger: container,
                            start: "top 85%"
                        }
                    }
                );
            });
            
            return () => {
                ScrollTrigger.getAll().forEach(t => t.kill());
            };
        }

        // Desktop mode: Scroll-based horizontal movement
        const totalWidth = track.scrollWidth - container.offsetWidth;

        const scrollTween = gsap.to(track, {
            x: -totalWidth,
            ease: "none",
            scrollTrigger: {
                trigger: container,
                start: "top top",
                end: () => `+=${totalWidth}`,
                scrub: 1,
                pin: true,
                anticipatePin: 1,
                onUpdate: (self) => {
                    const progress = self.progress;
                    const newIndex = Math.floor(progress * products.length);
                    setActiveIndex(Math.min(newIndex, products.length - 1));
                },
                onRefresh: (self) => {
                    scrollTriggerRef.current = self;
                }
            }
        });

        scrollTriggerRef.current = scrollTween.scrollTrigger;

        // Card entrance animations
        const cards = track.querySelectorAll('.hpg-card');
        cards.forEach((card, i) => {
            gsap.fromTo(card,
                { opacity: 0, y: 50 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.6,
                    delay: i * 0.1,
                    scrollTrigger: {
                        trigger: container,
                        start: "top 80%"
                    }
                }
            );
        });

        return () => {
            scrollTween.kill();
            ScrollTrigger.getAll().forEach(t => t.kill());
        };
    }, [isMobile, navigateToCard]);

    return (
        <>
            <section 
                ref={containerRef} 
                className={`hpg-section ${isMobile ? 'hpg-mobile' : ''}`} 
                data-nav-theme="light"
            >
                {/* Background text */}
                <div className="hpg-bg-text">PRODUCTS</div>

                {/* Header */}
                <div className="hpg-header">
                    <span className="section-label">Our Products</span>
                    <h2 className="section-title-large">
                        Premium <span className="text-handwritten text-gradient-nature">Grades</span> for
                        <br />Every Market
                    </h2>
                    <p className="section-subtitle">
                        {isMobile 
                            ? 'Swipe to explore our AGMARK certified cardamom grades'
                            : 'Scroll horizontally to explore our AGMARK certified cardamom grades'
                        }
                    </p>
                </div>

                {/* Progress indicator - Desktop: vertical fixed, Mobile: horizontal dots */}
                <div className={`hpg-progress ${isMobile ? 'hpg-progress-mobile' : ''}`}>
                    {products.map((_, i) => (
                        <button
                            key={i}
                            className={`hpg-progress-dot ${i === activeIndex ? 'active' : ''} ${i < activeIndex ? 'passed' : ''}`}
                            onClick={() => isMobile && navigateToCard(i)}
                            aria-label={`Go to product ${i + 1}`}
                        />
                    ))}
                </div>

                {/* Horizontal track with touch support */}
                <div 
                    ref={trackRef} 
                    className={`hpg-track ${isMobile ? 'touch-enabled' : ''}`}
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                    style={{ touchAction: isMobile ? 'pan-y' : 'auto' }}
                >
                    {products.map((product, index) => (
                        <div
                            key={index}
                            className={`hpg-card ${isMobile && index === activeIndex ? 'active-card' : ''} ${product.isPremium ? 'hpg-card-premium' : ''}`}
                            onClick={() => handleProductSelect(product)}
                        >
                            <div className="hpg-card-image">
                                <OptimizedImg 
                                    src={product.images[0]} 
                                    alt={product.name}
                                    sizes="(max-width: 640px) 80vw, (max-width: 1024px) 40vw, 25vw"
                                />
                                <div className="hpg-card-grade">{product.grade}</div>
                                {product.isPremium && (
                                    <div className="hpg-card-premium-badge">
                                        <span>★</span> Premium
                                    </div>
                                )}
                                {/* Prominent Size Badge */}
                                <div className={`hpg-size-badge hpg-size-${product.sizeCategory}`}>
                                    <span className="hpg-size-value">{product.sizeDisplay}</span>
                                    {product.sizeCategory !== 'seeds' && product.sizeCategory !== 'powder' && (
                                        <span className="hpg-size-label">Grade</span>
                                    )}
                                </div>
                                {/* Enhanced Quick View Overlay */}
                                <div className="hpg-card-overlay">
                                    <div className="hpg-quick-view-btn">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                                            <circle cx="12" cy="12" r="3" />
                                        </svg>
                                        <span>Quick View</span>
                                    </div>
                                    <div className="hpg-quick-specs">
                                        <span>Oil: {product.oilContent}</span>
                                        <span>Moisture: {product.moisture}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="hpg-card-content">
                                <h3 className="hpg-card-title">{product.name}</h3>

                                {/* Prominent Size Display */}
                                <div className="hpg-size-display">
                                    <div className="hpg-size-indicator">
                                        <span className="hpg-size-main">{product.sizeDisplay}</span>
                                        {product.sizeCategory !== 'seeds' && product.sizeCategory !== 'powder' && (
                                            <span className="hpg-size-text">Pod Size</span>
                                        )}
                                    </div>
                                    <div className="hpg-size-bar">
                                        <div className={`hpg-size-fill hpg-size-fill-${product.sizeCategory}`} />
                                    </div>
                                </div>

                                <div className="hpg-card-specs">
                                    <div className="hpg-spec">
                                        <span className="hpg-spec-label">Oil Content</span>
                                        <span className="hpg-spec-value">{product.oilContent}</span>
                                    </div>
                                    <div className="hpg-spec">
                                        <span className="hpg-spec-label">Color</span>
                                        <span className="hpg-spec-value">{product.color}</span>
                                    </div>
                                </div>

                                {/* Best For Tags */}
                                <div className="hpg-best-for">
                                    <span className="hpg-best-for-label">Best for:</span>
                                    <div className="hpg-best-for-tags">
                                        {product.bestFor.map((use, i) => (
                                            <span key={i} className="hpg-tag">{use}</span>
                                        ))}
                                    </div>
                                </div>

                                <button className="hpg-card-cta btn-magnetic">
                                    <span>View Details</span>
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M5 12h14M12 5l7 7-7 7" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Mobile swipe indicator */}
                {isMobile && showSwipeHint && (
                    <div className="hpg-swipe-indicator">
                        <div className="hpg-swipe-hand">
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                <path d="M18 11V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v0M14 10V4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v2M10 10.5V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v8" />
                                <path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15" />
                            </svg>
                        </div>
                        <span>Swipe to browse</span>
                    </div>
                )}

                {/* Desktop scroll hint */}
                {!isMobile && (
                    <div className="hpg-scroll-hint">
                        <span>Scroll to explore</span>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                    </div>
                )}

                {/* Mobile navigation arrows */}
                {isMobile && (
                    <div className="hpg-mobile-nav">
                        <button 
                            className={`hpg-nav-arrow hpg-nav-prev ${activeIndex === 0 ? 'disabled' : ''}`}
                            onClick={() => navigateToCard(activeIndex - 1)}
                            aria-label="Previous product"
                            disabled={activeIndex === 0}
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M15 18l-6-6 6-6" />
                            </svg>
                        </button>
                        <span className="hpg-nav-counter">
                            {activeIndex + 1} / {products.length}
                        </span>
                        <button 
                            className={`hpg-nav-arrow hpg-nav-next ${activeIndex === products.length - 1 ? 'disabled' : ''}`}
                            onClick={() => navigateToCard(activeIndex + 1)}
                            aria-label="Next product"
                            disabled={activeIndex === products.length - 1}
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M9 18l6-6-6-6" />
                            </svg>
                        </button>
                    </div>
                )}
            </section>

            <ProductModal
                product={selectedProduct}
                isOpen={!!selectedProduct}
                onClose={handleCloseModal}
            />
        </>
    );
};

export default HorizontalProductGallery;
