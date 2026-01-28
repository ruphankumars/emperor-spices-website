import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Fade In Up animation wrapper
export const FadeInUp = ({ children, delay = 0, duration = 0.8 }) => {
    const ref = useRef(null);

    useEffect(() => {
        const element = ref.current;

        gsap.fromTo(element,
            { opacity: 0, y: 60 },
            {
                opacity: 1,
                y: 0,
                duration,
                delay,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: element,
                    start: 'top 85%',
                    toggleActions: 'play none none reverse',
                },
            }
        );

        return () => {
            ScrollTrigger.getAll().forEach(t => t.kill());
        };
    }, [delay, duration]);

    return <div ref={ref}>{children}</div>;
};

// Staggered children animation
export const StaggerChildren = ({ children, stagger = 0.1 }) => {
    const ref = useRef(null);

    useEffect(() => {
        const element = ref.current;
        const childElements = element.children;

        gsap.fromTo(childElements,
            { opacity: 0, y: 40 },
            {
                opacity: 1,
                y: 0,
                duration: 0.6,
                stagger,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: element,
                    start: 'top 80%',
                    toggleActions: 'play none none reverse',
                },
            }
        );
    }, [stagger]);

    return <div ref={ref}>{children}</div>;
};

// Parallax background
export const ParallaxBg = ({ children, speed = 0.5 }) => {
    const ref = useRef(null);

    useEffect(() => {
        const element = ref.current;

        gsap.to(element, {
            yPercent: speed * 100,
            ease: 'none',
            scrollTrigger: {
                trigger: element,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true,
            },
        });
    }, [speed]);

    return <div ref={ref} style={{ willChange: 'transform' }}>{children}</div>;
};

// Text reveal animation
export const TextReveal = ({ children }) => {
    const ref = useRef(null);

    useEffect(() => {
        const element = ref.current;

        gsap.fromTo(element,
            { clipPath: 'inset(0 100% 0 0)' },
            {
                clipPath: 'inset(0 0% 0 0)',
                duration: 1,
                ease: 'power3.inOut',
                scrollTrigger: {
                    trigger: element,
                    start: 'top 80%',
                    toggleActions: 'play none none reverse',
                },
            }
        );
    }, []);

    return <div ref={ref} style={{ display: 'inline-block' }}>{children}</div>;
};

// Counter animation
export const CountUp = ({ end, duration = 2, suffix = '' }) => {
    const ref = useRef(null);

    useEffect(() => {
        const element = ref.current;
        let startValue = { value: 0 };

        gsap.to(startValue, {
            value: end,
            duration,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: element,
                start: 'top 85%',
                toggleActions: 'play none none none',
            },
            onUpdate: () => {
                element.textContent = Math.round(startValue.value) + suffix;
            },
        });
    }, [end, duration, suffix]);

    return <span ref={ref}>0{suffix}</span>;
};
