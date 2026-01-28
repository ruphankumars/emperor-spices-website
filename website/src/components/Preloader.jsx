import React, { useEffect, useState, useRef } from 'react';
import { gsap } from 'gsap';

const Preloader = ({ onComplete }) => {
    const [progress, setProgress] = useState(0);
    const [isVisible, setIsVisible] = useState(true);
    const preloaderRef = useRef(null);
    const contentRef = useRef(null);

    useEffect(() => {
        // Simulate loading progress with a smoother curve
        let currentProgress = 0;
        const interval = setInterval(() => {
            // Use easing for smoother progress
            const remaining = 100 - currentProgress;
            const increment = Math.max(1, remaining * 0.08 + Math.random() * 5);
            currentProgress = Math.min(100, currentProgress + increment);
            setProgress(currentProgress);

            if (currentProgress >= 100) {
                clearInterval(interval);
            }
        }, 80);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (progress >= 100) {
            // Animate out with GSAP
            const tl = gsap.timeline({
                onComplete: () => {
                    setIsVisible(false);
                    onComplete?.();
                }
            });

            // Fade out content first
            tl.to(contentRef.current, {
                opacity: 0,
                y: -30,
                duration: 0.4,
                ease: 'power2.in',
            });

            // Then wipe up the preloader
            tl.to(preloaderRef.current, {
                yPercent: -100,
                duration: 0.6,
                ease: 'power3.inOut',
            }, '-=0.1');
        }
    }, [progress, onComplete]);

    if (!isVisible) return null;

    return (
        <div
            ref={preloaderRef}
            className="preloader"
            style={{
                position: 'fixed',
                inset: 0,
                zIndex: 9999,
                background: 'linear-gradient(135deg, #1a2d26 0%, #2D4A3E 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <div
                ref={contentRef}
                style={{
                    textAlign: 'center',
                    color: 'white',
                }}
            >
                {/* Brand Icon - Animated Cardamom */}
                <div style={{
                    marginBottom: '2rem',
                    position: 'relative',
                }}>
                    <div style={{
                        width: '80px',
                        height: '80px',
                        margin: '0 auto',
                        background: 'linear-gradient(135deg, #9CAF88 0%, #6B8058 100%)',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '2.5rem',
                        animation: 'pulse 2s ease-in-out infinite',
                        boxShadow: '0 0 60px rgba(156, 175, 136, 0.4)',
                    }}>
                        🌿
                    </div>
                    {/* Orbiting dots */}
                    <div style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        width: '120px',
                        height: '120px',
                        marginTop: '-60px',
                        marginLeft: '-60px',
                        animation: 'orbit 3s linear infinite',
                    }}>
                        <div style={{
                            position: 'absolute',
                            top: 0,
                            left: '50%',
                            width: '8px',
                            height: '8px',
                            marginLeft: '-4px',
                            background: 'var(--color-gold)',
                            borderRadius: '50%',
                        }} />
                    </div>
                </div>

                {/* Brand Name */}
                <h1 style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '2.5rem',
                    fontWeight: '600',
                    marginBottom: '0.5rem',
                    letterSpacing: '-0.02em',
                }}>
                    Emperor Spices
                </h1>

                {/* Tagline */}
                <p style={{
                    fontSize: '0.9rem',
                    color: 'rgba(255, 255, 255, 0.6)',
                    marginBottom: '2.5rem',
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                }}>
                    Premium Cardamom Since 1999
                </p>

                {/* Progress Bar */}
                <div style={{
                    width: '200px',
                    height: '2px',
                    background: 'rgba(255, 255, 255, 0.1)',
                    borderRadius: '1px',
                    margin: '0 auto',
                    overflow: 'hidden',
                    position: 'relative',
                }}>
                    <div style={{
                        width: `${Math.min(progress, 100)}%`,
                        height: '100%',
                        background: 'linear-gradient(90deg, var(--color-sage) 0%, var(--color-gold) 100%)',
                        borderRadius: '1px',
                        transition: 'width 0.2s ease-out',
                    }} />
                </div>

                {/* Progress Text */}
                <span style={{
                    display: 'block',
                    marginTop: '1rem',
                    fontSize: '0.8rem',
                    color: 'rgba(255, 255, 255, 0.4)',
                    fontFamily: 'var(--font-display)',
                    fontWeight: '500',
                }}>
                    {Math.round(Math.min(progress, 100))}%
                </span>
            </div>

            <style>{`
                @keyframes pulse {
                    0%, 100% { transform: scale(1); }
                    50% { transform: scale(1.05); }
                }
                @keyframes orbit {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
            `}</style>
        </div>
    );
};

export default Preloader;
