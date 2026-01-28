import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { gsap } from 'gsap';
import { useLenisContext } from '../contexts/LenisContext';

const Modal = ({ isOpen, onClose, title, children, size = 'medium' }) => {
    const overlayRef = useRef(null);
    const contentRef = useRef(null);
    const { lenis } = useLenisContext();

    useEffect(() => {
        if (isOpen) {
            // Stop Lenis and prevent native scroll
            lenis?.stop();
            document.documentElement.style.overflow = 'hidden';

            // GPU acceleration hints for flicker prevention
            if (contentRef.current) {
                gsap.set(contentRef.current, {
                    willChange: 'transform, opacity',
                    backfaceVisibility: 'hidden'
                });
            }

            // Animate modal in
            if (overlayRef.current) {
                gsap.fromTo(overlayRef.current,
                    { opacity: 0 },
                    { opacity: 1, duration: 0.3 }
                );
            }
            if (contentRef.current) {
                gsap.fromTo(contentRef.current,
                    { opacity: 0, scale: 0.9, y: 20 },
                    { opacity: 1, scale: 1, y: 0, duration: 0.4, ease: 'back.out(1.7)' }
                );
            }
        }

        return () => {
            // Resume Lenis and restore native scroll
            lenis?.start();
            document.documentElement.style.overflow = '';

            // Reset GPU hints
            if (contentRef.current) {
                gsap.set(contentRef.current, { willChange: 'auto' });
            }
        };
    }, [isOpen, lenis]);

    const handleClose = () => {
        if (overlayRef.current) {
            gsap.to(overlayRef.current, { opacity: 0, duration: 0.2 });
        }
        if (contentRef.current) {
            gsap.to(contentRef.current, {
                opacity: 0,
                scale: 0.9,
                y: 20,
                duration: 0.2,
                onComplete: onClose
            });
        }
    };

    if (!isOpen) return null;

    const getSizeStyles = () => {
        switch (size) {
            case 'small':
                return { maxWidth: '400px' };
            case 'large':
                return { maxWidth: '900px' };
            case 'xlarge':
                return { maxWidth: '1100px' };
            case 'full':
                return { maxWidth: '95vw' };
            default:
                return { maxWidth: '600px' };
        }
    };

    return (
        <div
            ref={overlayRef}
            onClick={handleClose}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'rgba(0, 0, 0, 0.85)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 10000,
                padding: '20px',
                overflowY: 'auto',
            }}
        >
            <div
                ref={contentRef}
                onClick={(e) => e.stopPropagation()}
                style={{
                    background: 'linear-gradient(180deg, #ffffff 0%, #f8faf9 100%)',
                    borderRadius: '24px',
                    width: '100%',
                    maxHeight: '85vh',
                    display: 'flex',
                    flexDirection: 'column',
                    position: 'relative',
                    boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255,255,255,0.1)',
                    ...getSizeStyles()
                }}
            >
                {/* Header - Fixed */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '20px 28px',
                    borderBottom: '1px solid rgba(0,0,0,0.08)',
                    background: 'linear-gradient(135deg, #2d6b4a 0%, #1a4030 100%)',
                    borderRadius: '24px 24px 0 0',
                    flexShrink: 0,
                }}>
                    <h3 style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '1.4rem',
                        fontWeight: '600',
                        margin: 0,
                        color: '#ffffff',
                    }}>
                        {title}
                    </h3>
                    <button
                        onClick={handleClose}
                        style={{
                            background: 'rgba(255,255,255,0.15)',
                            border: 'none',
                            borderRadius: '50%',
                            width: '40px',
                            height: '40px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease',
                            color: '#ffffff',
                        }}
                        onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.25)'}
                        onMouseOut={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.15)'}
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Content - Scrollable */}
                <div
                    data-lenis-prevent
                    style={{
                        padding: '28px',
                        overflowY: 'auto',
                        overflowX: 'hidden',
                        flex: 1,
                        minHeight: 0,
                        WebkitOverflowScrolling: 'touch',
                    }}
                >
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Modal;
