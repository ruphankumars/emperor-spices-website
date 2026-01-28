import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const LenisContext = createContext(null);

export const LenisProvider = ({ children }) => {
    const lenisRef = useRef(null);
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        // Initialize Lenis with smooth, premium scrolling settings
        const lenis = new Lenis({
            duration: 1.4,            // Slightly longer for smoother feel
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Smooth easeOutExpo
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            smoothWheel: true,
            wheelMultiplier: 0.8,     // Slower wheel scroll for smoothness
            touchMultiplier: 1.5,
            infinite: false,
        });

        lenisRef.current = lenis;
        setIsReady(true);

        // Integrate Lenis with GSAP ScrollTrigger
        lenis.on('scroll', ScrollTrigger.update);

        gsap.ticker.add((time) => {
            lenis.raf(time * 1000);
        });

        gsap.ticker.lagSmoothing(0);

        // Cleanup
        return () => {
            lenis.destroy();
            gsap.ticker.remove(lenis.raf);
        };
    }, []);

    // Smooth scroll to element function
    const scrollToElement = (target, options = {}) => {
        if (!lenisRef.current) return;

        const element = typeof target === 'string' ? document.getElementById(target) : target;

        if (element) {
            lenisRef.current.scrollTo(element, {
                offset: options.offset || -80,  // Account for fixed header
                duration: options.duration || 2.0,
                easing: options.easing || ((t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))),
                immediate: false,
                lock: false,
                ...options
            });
        }
    };

    // Scroll to top function
    const scrollToTop = (options = {}) => {
        if (!lenisRef.current) return;

        lenisRef.current.scrollTo(0, {
            duration: options.duration || 2.0,
            easing: options.easing || ((t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))),
            ...options
        });
    };

    return (
        <LenisContext.Provider value={{
            lenis: lenisRef.current,
            scrollToElement,
            scrollToTop,
            isReady
        }}>
            {children}
        </LenisContext.Provider>
    );
};

export const useLenisContext = () => {
    const context = useContext(LenisContext);
    if (!context) {
        throw new Error('useLenisContext must be used within a LenisProvider');
    }
    return context;
};

export default LenisContext;
