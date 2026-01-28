import React, { useState, useRef, useEffect, useCallback } from 'react';
import gsap from 'gsap';

/**
 * Product360View - 360-degree product view with drag rotation
 * Simulates 3D rotation using a single image with CSS transforms
 * For true 360 view, provide an array of images at different angles
 */
const Product360View = ({
    images = [], // Array of product images at different angles (or single image)
    alt = "Product 360 View",
    className = '',
    autoRotate = false,
    autoRotateSpeed = 3000, // ms per full rotation
}) => {
    const containerRef = useRef(null);
    const imageRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);
    const [rotation, setRotation] = useState(0);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const startX = useRef(0);
    const startRotation = useRef(0);
    const autoRotateRef = useRef(null);

    // Determine if we're using multiple images or single image rotation
    const hasMultipleImages = images.length > 1;
    const imageCount = hasMultipleImages ? images.length : 36; // Simulate 36 angles for single image

    // Calculate current image based on rotation
    useEffect(() => {
        if (hasMultipleImages) {
            const normalizedRotation = ((rotation % 360) + 360) % 360;
            const index = Math.floor((normalizedRotation / 360) * images.length) % images.length;
            setCurrentImageIndex(index);
        }
    }, [rotation, hasMultipleImages, images.length]);

    // Auto-rotate functionality
    useEffect(() => {
        if (autoRotate && !isDragging) {
            autoRotateRef.current = gsap.to({}, {
                duration: autoRotateSpeed / 1000,
                repeat: -1,
                ease: "none",
                onUpdate: function() {
                    setRotation(prev => prev + (360 / autoRotateSpeed) * 16);
                }
            });
        }

        return () => {
            if (autoRotateRef.current) {
                autoRotateRef.current.kill();
            }
        };
    }, [autoRotate, isDragging, autoRotateSpeed]);

    // Handle drag start
    const handleDragStart = useCallback((clientX) => {
        setIsDragging(true);
        startX.current = clientX;
        startRotation.current = rotation;
        
        if (autoRotateRef.current) {
            autoRotateRef.current.kill();
        }

        // Visual feedback
        if (containerRef.current) {
            gsap.to(containerRef.current, {
                scale: 1.02,
                duration: 0.2,
                ease: "power2.out"
            });
        }
    }, [rotation]);

    // Handle drag move
    const handleDragMove = useCallback((clientX) => {
        if (!isDragging) return;

        const deltaX = clientX - startX.current;
        const sensitivity = 0.5; // Adjust rotation speed
        const newRotation = startRotation.current + deltaX * sensitivity;
        setRotation(newRotation);
    }, [isDragging]);

    // Handle drag end
    const handleDragEnd = useCallback(() => {
        setIsDragging(false);
        
        // Visual feedback
        if (containerRef.current) {
            gsap.to(containerRef.current, {
                scale: 1,
                duration: 0.3,
                ease: "power2.out"
            });
        }

        // Optional: Add momentum
        // Could implement inertia here for smoother experience
    }, []);

    // Mouse events
    const handleMouseDown = (e) => {
        e.preventDefault();
        handleDragStart(e.clientX);
    };

    const handleMouseMove = (e) => {
        handleDragMove(e.clientX);
    };

    const handleMouseUp = () => {
        handleDragEnd();
    };

    // Touch events
    const handleTouchStart = (e) => {
        handleDragStart(e.touches[0].clientX);
    };

    const handleTouchMove = (e) => {
        handleDragMove(e.touches[0].clientX);
    };

    const handleTouchEnd = () => {
        handleDragEnd();
    };

    // Global mouse/touch events for dragging outside container
    useEffect(() => {
        if (isDragging) {
            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('mouseup', handleMouseUp);
            window.addEventListener('touchmove', handleTouchMove);
            window.addEventListener('touchend', handleTouchEnd);
        }

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
            window.removeEventListener('touchmove', handleTouchMove);
            window.removeEventListener('touchend', handleTouchEnd);
        };
    }, [isDragging, handleMouseMove, handleMouseUp, handleTouchMove, handleTouchEnd]);

    // Get the CSS transform for rotation effect
    const getRotationStyle = () => {
        if (hasMultipleImages) {
            // When using multiple images, no CSS rotation needed
            return {};
        }
        
        // For single image, apply 3D-like transform
        const normalizedRotation = rotation % 360;
        const perspective = 1000;
        const skewFactor = Math.sin((normalizedRotation * Math.PI) / 180) * 5;
        const scaleFactor = 1 - Math.abs(Math.sin((normalizedRotation * Math.PI) / 180)) * 0.1;
        
        return {
            transform: `perspective(${perspective}px) rotateY(${normalizedRotation}deg) scale(${scaleFactor})`,
            transformStyle: 'preserve-3d'
        };
    };

    // If no images provided, show placeholder
    if (images.length === 0) {
        return (
            <div className={`product-360-container ${className} no-images`}>
                <div className="product-360-placeholder">
                    <span>No images available</span>
                </div>
            </div>
        );
    }

    return (
        <div 
            ref={containerRef}
            className={`product-360-container ${className} ${isDragging ? 'dragging' : ''}`}
            onMouseDown={handleMouseDown}
            onTouchStart={handleTouchStart}
            style={{ touchAction: 'none' }}
        >
            {/* Main product image */}
            <div className="product-360-image-wrapper">
                <img
                    ref={imageRef}
                    src={hasMultipleImages ? images[currentImageIndex] : images[0]}
                    alt={alt}
                    className="product-360-image"
                    style={getRotationStyle()}
                    draggable={false}
                />
            </div>

            {/* Drag indicator */}
            <div className="product-360-indicator">
                <div className="drag-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M14 8l4-4-4-4M10 4L6 8l4 4"/>
                        <path d="M20 4H4"/>
                    </svg>
                </div>
                <span>Drag to rotate</span>
            </div>

            {/* Rotation progress indicator */}
            <div className="rotation-indicator">
                <div 
                    className="rotation-progress" 
                    style={{ 
                        transform: `rotate(${rotation}deg)` 
                    }}
                />
            </div>

            {/* 360 badge */}
            <div className="badge-360">
                <span>360°</span>
            </div>
        </div>
    );
};

export default Product360View;
