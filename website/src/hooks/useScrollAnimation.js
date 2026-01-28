import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Scroll animation hook using GSAP ScrollTrigger
 * @param {Object} options - Animation options
 * @param {string} options.animation - Animation type: 'fadeUp', 'fadeIn', 'scaleUp', 'slideLeft', 'slideRight'
 * @param {number} options.delay - Animation delay in seconds
 * @param {number} options.duration - Animation duration in seconds
 * @param {string} options.start - ScrollTrigger start position
 * @param {boolean} options.once - Only animate once
 */
export const useScrollAnimation = ({
    animation = 'fadeUp',
    delay = 0,
    duration = 0.8,
    start = 'top 85%',
    once = true
} = {}) => {
    const ref = useRef(null);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        // Define animation presets
        const animations = {
            fadeUp: {
                from: { opacity: 0, y: 60 },
                to: { opacity: 1, y: 0 }
            },
            fadeIn: {
                from: { opacity: 0 },
                to: { opacity: 1 }
            },
            scaleUp: {
                from: { opacity: 0, scale: 0.9 },
                to: { opacity: 1, scale: 1 }
            },
            slideLeft: {
                from: { opacity: 0, x: 80 },
                to: { opacity: 1, x: 0 }
            },
            slideRight: {
                from: { opacity: 0, x: -80 },
                to: { opacity: 1, x: 0 }
            },
            rotateIn: {
                from: { opacity: 0, rotation: -10, scale: 0.9 },
                to: { opacity: 1, rotation: 0, scale: 1 }
            }
        };

        const anim = animations[animation] || animations.fadeUp;

        gsap.fromTo(element, anim.from, {
            ...anim.to,
            duration,
            delay,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: element,
                start,
                toggleActions: once ? 'play none none none' : 'play reverse play reverse'
            }
        });

        return () => {
            ScrollTrigger.getAll().forEach(t => {
                if (t.trigger === element) t.kill();
            });
        };
    }, [animation, delay, duration, start, once]);

    return ref;
};

/**
 * Stagger animation for child elements
 * @param {Object} options - Animation options
 */
export const useStaggerAnimation = ({
    childSelector = '*',
    stagger = 0.1,
    animation = 'fadeUp',
    delay = 0,
    duration = 0.6,
    start = 'top 85%'
} = {}) => {
    const containerRef = useRef(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const children = container.querySelectorAll(childSelector);
        if (!children.length) return;

        const animations = {
            fadeUp: { from: { opacity: 0, y: 50 }, to: { opacity: 1, y: 0 } },
            fadeIn: { from: { opacity: 0 }, to: { opacity: 1 } },
            scaleUp: { from: { opacity: 0, scale: 0.8 }, to: { opacity: 1, scale: 1 } }
        };

        const anim = animations[animation] || animations.fadeUp;

        gsap.fromTo(children, anim.from, {
            ...anim.to,
            duration,
            delay,
            stagger,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: container,
                start
            }
        });

        return () => {
            ScrollTrigger.getAll().forEach(t => {
                if (t.trigger === container) t.kill();
            });
        };
    }, [childSelector, stagger, animation, delay, duration, start]);

    return containerRef;
};

/**
 * Parallax effect hook
 * @param {number} speed - Parallax speed multiplier (0-1)
 */
export const useParallax = (speed = 0.5) => {
    const ref = useRef(null);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        gsap.to(element, {
            y: () => window.innerHeight * speed * 0.5,
            ease: 'none',
            scrollTrigger: {
                trigger: element,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true
            }
        });

        return () => {
            ScrollTrigger.getAll().forEach(t => {
                if (t.trigger === element) t.kill();
            });
        };
    }, [speed]);

    return ref;
};

/**
 * Count-up animation hook
 * @param {number} end - End value
 * @param {number} duration - Animation duration in seconds
 */
export const useCountUp = (end, duration = 2) => {
    const ref = useRef(null);
    const hasAnimatedRef = useRef(false);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        ScrollTrigger.create({
            trigger: element,
            start: 'top 80%',
            once: true,
            onEnter: () => {
                if (hasAnimatedRef.current) return;
                hasAnimatedRef.current = true;

                const obj = { val: 0 };
                gsap.to(obj, {
                    val: end,
                    duration,
                    ease: 'power2.out',
                    onUpdate: () => {
                        element.textContent = Math.floor(obj.val);
                    }
                });
            }
        });

        return () => {
            ScrollTrigger.getAll().forEach(t => {
                if (t.trigger === element) t.kill();
            });
        };
    }, [end, duration]);

    return ref;
};

export default useScrollAnimation;
