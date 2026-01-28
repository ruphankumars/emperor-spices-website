import { useState, useEffect, useRef, useCallback } from 'react';

/**
 * Hook to detect when an element or threshold scroll position is reached
 * Uses IntersectionObserver for performance (no scroll event listeners)
 * 
 * @param {Object} options Configuration options
 * @param {number} options.threshold - Scroll threshold in pixels (creates a sentinel element at this position)
 * @param {string} options.rootMargin - IntersectionObserver root margin
 * @param {boolean} options.once - If true, stops observing after first intersection
 * @returns {Object} { ref, isVisible } - ref for the element, isVisible state
 */
export const useScrollVisibility = ({
    threshold = 0,
    rootMargin = '0px',
    once = false
} = {}) => {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef(null);
    const observerRef = useRef(null);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        observerRef.current = new IntersectionObserver(
            ([entry]) => {
                const visible = entry.isIntersecting;
                setIsVisible(visible);

                // If once mode and now visible, disconnect
                if (once && visible && observerRef.current) {
                    observerRef.current.disconnect();
                }
            },
            {
                root: null,
                rootMargin,
                threshold: 0
            }
        );

        observerRef.current.observe(element);

        return () => {
            if (observerRef.current) {
                observerRef.current.disconnect();
            }
        };
    }, [rootMargin, once]);

    return { ref, isVisible };
};

/**
 * Hook to detect when user has scrolled past a certain point
 * Uses a sentinel element approach with IntersectionObserver
 * 
 * @param {number} scrollThreshold - Pixels from top to trigger visibility
 * @returns {Object} { sentinelRef, hasScrolledPast }
 */
export const useScrollThreshold = (scrollThreshold = 500) => {
    const [hasScrolledPast, setHasScrolledPast] = useState(false);
    const sentinelRef = useRef(null);

    useEffect(() => {
        // Create a sentinel element at the threshold position
        const sentinel = document.createElement('div');
        sentinel.style.cssText = `
            position: absolute;
            top: ${scrollThreshold}px;
            left: 0;
            width: 1px;
            height: 1px;
            pointer-events: none;
            visibility: hidden;
        `;
        document.body.appendChild(sentinel);
        sentinelRef.current = sentinel;

        const observer = new IntersectionObserver(
            ([entry]) => {
                // When sentinel exits viewport (scrolled past), it's not intersecting
                // But we want to detect when we've scrolled past the threshold
                // So we invert the logic - not intersecting means we've scrolled past
                setHasScrolledPast(!entry.isIntersecting);
            },
            {
                root: null,
                rootMargin: '0px',
                threshold: 0
            }
        );

        observer.observe(sentinel);

        return () => {
            observer.disconnect();
            if (sentinel.parentNode) {
                sentinel.parentNode.removeChild(sentinel);
            }
        };
    }, [scrollThreshold]);

    return { hasScrolledPast };
};

/**
 * Hook to track if element is in viewport
 * Simpler version for general visibility detection
 * 
 * @param {Object} options IntersectionObserver options
 * @returns {Array} [ref, isInViewport]
 */
export const useInViewport = (options = {}) => {
    const [isInViewport, setIsInViewport] = useState(false);
    const ref = useRef(null);

    const callback = useCallback(([entry]) => {
        setIsInViewport(entry.isIntersecting);
    }, []);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const observer = new IntersectionObserver(callback, {
            root: null,
            rootMargin: options.rootMargin || '0px',
            threshold: options.threshold || 0
        });

        observer.observe(element);

        return () => observer.disconnect();
    }, [callback, options.rootMargin, options.threshold]);

    return [ref, isInViewport];
};

export default useScrollVisibility;
