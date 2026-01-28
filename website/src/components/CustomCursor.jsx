import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

/**
 * CustomCursor - Premium cursor effect for desktop users
 * Features:
 * - Small dot that follows mouse position exactly
 * - Larger circle that follows with spring/delay effect
 * - Scale up on hover over interactive elements
 * - Hidden on touch devices
 */
const CustomCursor = () => {
    const dotRef = useRef(null);
    const circleRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);
    const [isHovering, setIsHovering] = useState(false);
    const [isClicking, setIsClicking] = useState(false);
    const [isTouchDevice, setIsTouchDevice] = useState(false);

    useEffect(() => {
        // Detect touch device
        const checkTouchDevice = () => {
            const isTouchCapable = 'ontouchstart' in window || 
                navigator.maxTouchPoints > 0 || 
                window.matchMedia('(pointer: coarse)').matches;
            setIsTouchDevice(isTouchCapable);
        };
        
        checkTouchDevice();
        
        // Don't initialize on touch devices
        if (isTouchDevice) return;

        const dot = dotRef.current;
        const circle = circleRef.current;
        
        if (!dot || !circle) return;

        // Mouse position
        let mouseX = 0;
        let mouseY = 0;

        // Handle mouse move
        const handleMouseMove = (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;

            // Dot follows exactly
            gsap.to(dot, {
                x: mouseX,
                y: mouseY,
                duration: 0.1,
                ease: 'power2.out'
            });

            // Circle follows with spring effect
            gsap.to(circle, {
                x: mouseX,
                y: mouseY,
                duration: 0.5,
                ease: 'elastic.out(1, 0.5)'
            });

            if (!isVisible) setIsVisible(true);
        };

        // Handle mouse enter/leave viewport
        const handleMouseEnter = () => setIsVisible(true);
        const handleMouseLeave = () => setIsVisible(false);

        // Handle mouse down/up for click effect
        const handleMouseDown = () => setIsClicking(true);
        const handleMouseUp = () => setIsClicking(false);

        // Handle hover over interactive elements
        const handleElementMouseOver = (e) => {
            const target = e.target;
            const isInteractive = 
                target.matches('a, button, [data-cursor="pointer"], .product-card, .hpg-card, .contact-card, .nav-cta, .btn-primary, .btn-secondary, .cert-card, .contact-method-card, input, select, textarea') ||
                target.closest('a, button, [data-cursor="pointer"], .product-card, .hpg-card, .contact-card, .nav-cta, .btn-primary, .btn-secondary, .cert-card, .contact-method-card');
            
            if (isInteractive) {
                setIsHovering(true);
            }
        };

        const handleElementMouseOut = (e) => {
            const target = e.target;
            const relatedTarget = e.relatedTarget;
            
            const isLeavingInteractive = 
                target.matches('a, button, [data-cursor="pointer"], .product-card, .hpg-card, .contact-card, .nav-cta, .btn-primary, .btn-secondary, .cert-card, .contact-method-card, input, select, textarea') ||
                target.closest('a, button, [data-cursor="pointer"], .product-card, .hpg-card, .contact-card, .nav-cta, .btn-primary, .btn-secondary, .cert-card, .contact-method-card');
            
            const isEnteringInteractive = relatedTarget && (
                relatedTarget.matches?.('a, button, [data-cursor="pointer"], .product-card, .hpg-card, .contact-card, .nav-cta, .btn-primary, .btn-secondary, .cert-card, .contact-method-card, input, select, textarea') ||
                relatedTarget.closest?.('a, button, [data-cursor="pointer"], .product-card, .hpg-card, .contact-card, .nav-cta, .btn-primary, .btn-secondary, .cert-card, .contact-method-card')
            );
            
            if (isLeavingInteractive && !isEnteringInteractive) {
                setIsHovering(false);
            }
        };

        // Add event listeners
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseenter', handleMouseEnter);
        document.addEventListener('mouseleave', handleMouseLeave);
        document.addEventListener('mousedown', handleMouseDown);
        document.addEventListener('mouseup', handleMouseUp);
        document.addEventListener('mouseover', handleElementMouseOver);
        document.addEventListener('mouseout', handleElementMouseOut);

        // Cleanup
        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseenter', handleMouseEnter);
            document.removeEventListener('mouseleave', handleMouseLeave);
            document.removeEventListener('mousedown', handleMouseDown);
            document.removeEventListener('mouseup', handleMouseUp);
            document.removeEventListener('mouseover', handleElementMouseOver);
            document.removeEventListener('mouseout', handleElementMouseOut);
        };
    }, [isTouchDevice, isVisible]);

    // Animate hover and click states
    useEffect(() => {
        if (isTouchDevice) return;
        
        const dot = dotRef.current;
        const circle = circleRef.current;
        
        if (!dot || !circle) return;

        if (isHovering) {
            gsap.to(dot, {
                scale: 0.5,
                duration: 0.3,
                ease: 'power2.out'
            });
            gsap.to(circle, {
                scale: 1.5,
                borderWidth: '1px',
                duration: 0.3,
                ease: 'power2.out'
            });
        } else {
            gsap.to(dot, {
                scale: 1,
                duration: 0.3,
                ease: 'power2.out'
            });
            gsap.to(circle, {
                scale: 1,
                borderWidth: '2px',
                duration: 0.3,
                ease: 'power2.out'
            });
        }
    }, [isHovering, isTouchDevice]);

    // Animate click state
    useEffect(() => {
        if (isTouchDevice) return;
        
        const dot = dotRef.current;
        const circle = circleRef.current;
        
        if (!dot || !circle) return;

        if (isClicking) {
            gsap.to(dot, {
                scale: 0.8,
                duration: 0.1,
                ease: 'power2.out'
            });
            gsap.to(circle, {
                scale: 0.8,
                duration: 0.1,
                ease: 'power2.out'
            });
        } else {
            gsap.to(dot, {
                scale: isHovering ? 0.5 : 1,
                duration: 0.2,
                ease: 'power2.out'
            });
            gsap.to(circle, {
                scale: isHovering ? 1.5 : 1,
                duration: 0.2,
                ease: 'elastic.out(1, 0.5)'
            });
        }
    }, [isClicking, isHovering, isTouchDevice]);

    // Don't render on touch devices
    if (isTouchDevice) return null;

    return (
        <>
            {/* Dot - follows cursor exactly */}
            <div
                ref={dotRef}
                className={`custom-cursor-dot ${isVisible ? 'visible' : ''}`}
                aria-hidden="true"
            />
            
            {/* Circle - follows with delay/spring */}
            <div
                ref={circleRef}
                className={`custom-cursor-circle ${isVisible ? 'visible' : ''} ${isHovering ? 'hovering' : ''}`}
                aria-hidden="true"
            />
        </>
    );
};

export default CustomCursor;
