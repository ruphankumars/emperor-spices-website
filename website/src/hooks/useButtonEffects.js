import { useRef, useEffect, useCallback } from 'react';

/**
 * Custom hook for premium button micro-interactions
 * - Magnetic hover effect (buttons move toward cursor)
 * - Ripple click effect (from click position)
 * 
 * Usage:
 * const { ref, handlers } = useButtonEffects({ magnetic: true, ripple: true });
 * <button ref={ref} {...handlers}>Click me</button>
 */
export function useButtonEffects(options = {}) {
    const {
        magnetic = true,
        ripple = true,
        magneticStrength = 0.3, // 0-1, how much the button moves
        magneticRadius = 100,   // px, how far the magnetic effect reaches
    } = options;

    const buttonRef = useRef(null);
    const boundingRef = useRef(null);

    // Update bounding rect on mount and resize
    useEffect(() => {
        const updateBounding = () => {
            if (buttonRef.current) {
                boundingRef.current = buttonRef.current.getBoundingClientRect();
            }
        };

        updateBounding();
        window.addEventListener('resize', updateBounding, { passive: true });

        return () => {
            window.removeEventListener('resize', updateBounding);
        };
    }, []);

    // Magnetic hover effect
    const handleMouseMove = useCallback((e) => {
        if (!magnetic || !buttonRef.current) return;

        const button = buttonRef.current;
        const rect = button.getBoundingClientRect();

        // Calculate center of button
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        // Calculate distance from cursor to center
        const distX = e.clientX - centerX;
        const distY = e.clientY - centerY;
        const distance = Math.sqrt(distX * distX + distY * distY);

        // Only apply effect within magneticRadius
        if (distance < magneticRadius) {
            const strength = (1 - distance / magneticRadius) * magneticStrength;
            const moveX = distX * strength;
            const moveY = distY * strength;

            button.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.02)`;
        }
    }, [magnetic, magneticStrength, magneticRadius]);

    const handleMouseLeave = useCallback(() => {
        if (!magnetic || !buttonRef.current) return;

        // Reset transform with smooth transition
        buttonRef.current.style.transform = '';
    }, [magnetic]);

    // Ripple click effect
    const handleClick = useCallback((e) => {
        if (!ripple || !buttonRef.current) return;

        const button = buttonRef.current;
        const rect = button.getBoundingClientRect();

        // Calculate ripple position relative to button
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Calculate ripple size (should cover entire button)
        const size = Math.max(rect.width, rect.height);

        // Create ripple element
        const rippleEl = document.createElement('span');
        rippleEl.className = 'btn-ripple';
        rippleEl.style.cssText = `
            width: ${size}px;
            height: ${size}px;
            left: ${x - size / 2}px;
            top: ${y - size / 2}px;
        `;

        button.appendChild(rippleEl);

        // Remove ripple after animation
        rippleEl.addEventListener('animationend', () => {
            rippleEl.remove();
        });
    }, [ripple]);

    return {
        ref: buttonRef,
        handlers: {
            onMouseMove: handleMouseMove,
            onMouseLeave: handleMouseLeave,
            onClick: handleClick,
        },
    };
}

/**
 * Standalone function to add ripple effect to any button
 * Can be called directly without the hook
 */
export function createRipple(event, button = event.currentTarget) {
    const rect = button.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const size = Math.max(rect.width, rect.height);

    const ripple = document.createElement('span');
    ripple.className = 'btn-ripple';
    ripple.style.cssText = `
        width: ${size}px;
        height: ${size}px;
        left: ${x - size / 2}px;
        top: ${y - size / 2}px;
    `;

    button.appendChild(ripple);
    ripple.addEventListener('animationend', () => ripple.remove());
}

/**
 * Higher-order component to wrap buttons with effects
 */
export function withButtonEffects(WrappedButton) {
    return function ButtonWithEffects(props) {
        const { ref, handlers } = useButtonEffects();

        return (
            <WrappedButton
                {...props}
                ref={ref}
                onMouseMove={(e) => {
                    handlers.onMouseMove(e);
                    props.onMouseMove?.(e);
                }}
                onMouseLeave={(e) => {
                    handlers.onMouseLeave(e);
                    props.onMouseLeave?.(e);
                }}
                onClick={(e) => {
                    handlers.onClick(e);
                    props.onClick?.(e);
                }}
            />
        );
    };
}

export default useButtonEffects;
