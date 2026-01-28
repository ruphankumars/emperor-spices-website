import React, { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * LenisProvider - Smooth scroll wrapper using Lenis
 * Integrates with GSAP ScrollTrigger for buttery smooth animations
 */
export const LenisProvider = ({ children }) => {
    const lenisRef = useRef(null);

    useEffect(() => {
        // Initialize Lenis smooth scroll
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // easeOutExpo
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            smoothWheel: true,
            wheelMultiplier: 1,
            touchMultiplier: 2,
            infinite: false,
        });

        lenisRef.current = lenis;

        // Connect Lenis to GSAP ScrollTrigger
        lenis.on('scroll', ScrollTrigger.update);

        // GSAP ticker integration for smooth animations
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

    return <>{children}</>;
};

/**
 * Custom hook to access Lenis instance
 */
export const useLenis = () => {
    const lenisRef = useRef(null);
    
    useEffect(() => {
        // Get the Lenis instance from the global scope if needed
        const checkLenis = () => {
            const lenisInstance = document.querySelector('[data-lenis-wrapper]')?.__lenis;
            if (lenisInstance) {
                lenisRef.current = lenisInstance;
            }
        };
        checkLenis();
    }, []);

    return lenisRef.current;
};

export default LenisProvider;
