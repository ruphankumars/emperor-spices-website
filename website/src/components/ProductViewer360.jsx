import React, { useRef, useState, useEffect, useCallback } from 'react';
import gsap from 'gsap';
import { RotateCw, MousePointer2, Hand } from 'lucide-react';

const ProductViewer360 = ({ imageSrc, productName }) => {
    const containerRef = useRef(null);
    const imageRef = useRef(null);
    const hintRef = useRef(null);
    
    const [isDragging, setIsDragging] = useState(false);
    const [rotation, setRotation] = useState({ x: 0, y: 0 });
    const [showHint, setShowHint] = useState(true);
    const [autoRotate, setAutoRotate] = useState(true);
    
    const dragStart = useRef({ x: 0, y: 0 });
    const rotationStart = useRef({ x: 0, y: 0 });
    const autoRotateAnimation = useRef(null);

    // Auto-rotation animation
    useEffect(() => {
        if (autoRotate && !isDragging) {
            autoRotateAnimation.current = gsap.to(rotation, {
                y: rotation.y + 360,
                duration: 20,
                ease: "none",
                repeat: -1,
                onUpdate: () => {
                    setRotation(prev => ({
                        ...prev,
                        y: gsap.getProperty(autoRotateAnimation.current.targets()[0], "y")
                    }));
                }
            });
        }
        
        return () => {
            if (autoRotateAnimation.current) {
                autoRotateAnimation.current.kill();
            }
        };
    }, [autoRotate, isDragging]);

    // Stop auto-rotation when dragging starts
    useEffect(() => {
        if (isDragging && autoRotateAnimation.current) {
            autoRotateAnimation.current.pause();
        } else if (!isDragging && autoRotate && autoRotateAnimation.current) {
            autoRotateAnimation.current.resume();
        }
    }, [isDragging, autoRotate]);

    // Hide hint after first interaction
    useEffect(() => {
        if (!showHint) return;
        
        const timer = setTimeout(() => {
            if (hintRef.current) {
                gsap.to(hintRef.current, {
                    opacity: 0,
                    y: 10,
                    duration: 0.5,
                    onComplete: () => setShowHint(false)
                });
            }
        }, 5000);
        
        return () => clearTimeout(timer);
    }, [showHint]);

    // Animate hint entrance
    useEffect(() => {
        if (hintRef.current && showHint) {
            gsap.fromTo(hintRef.current,
                { opacity: 0, y: 10 },
                { opacity: 1, y: 0, duration: 0.5, delay: 0.3 }
            );
        }
    }, [showHint]);

    const handleDragStart = useCallback((clientX, clientY) => {
        setIsDragging(true);
        setAutoRotate(false);
        dragStart.current = { x: clientX, y: clientY };
        rotationStart.current = { ...rotation };
        
        // Hide hint on first drag
        if (showHint && hintRef.current) {
            gsap.to(hintRef.current, {
                opacity: 0,
                y: 10,
                duration: 0.3,
                onComplete: () => setShowHint(false)
            });
        }
    }, [rotation, showHint]);

    const handleDragMove = useCallback((clientX, clientY) => {
        if (!isDragging) return;
        
        const deltaX = clientX - dragStart.current.x;
        const deltaY = clientY - dragStart.current.y;
        
        // Calculate new rotation (sensitivity factor)
        const sensitivity = 0.5;
        const newRotationY = rotationStart.current.y + deltaX * sensitivity;
        const newRotationX = Math.max(-30, Math.min(30, rotationStart.current.x - deltaY * sensitivity * 0.3));
        
        setRotation({
            x: newRotationX,
            y: newRotationY
        });
    }, [isDragging]);

    const handleDragEnd = useCallback(() => {
        setIsDragging(false);
        
        // Spring back X rotation to 0
        gsap.to(rotation, {
            x: 0,
            duration: 0.6,
            ease: "elastic.out(1, 0.5)",
            onUpdate: () => {
                setRotation(prev => ({
                    ...prev,
                    x: gsap.getProperty(gsap.getById('springBack')?.targets()?.[0] || {}, "x") || prev.x
                }));
            }
        });
    }, []);

    // Mouse events
    const handleMouseDown = (e) => {
        e.preventDefault();
        handleDragStart(e.clientX, e.clientY);
    };

    const handleMouseMove = useCallback((e) => {
        handleDragMove(e.clientX, e.clientY);
    }, [handleDragMove]);

    const handleMouseUp = useCallback(() => {
        handleDragEnd();
    }, [handleDragEnd]);

    // Touch events
    const handleTouchStart = (e) => {
        const touch = e.touches[0];
        handleDragStart(touch.clientX, touch.clientY);
    };

    const handleTouchMove = useCallback((e) => {
        const touch = e.touches[0];
        handleDragMove(touch.clientX, touch.clientY);
    }, [handleDragMove]);

    const handleTouchEnd = useCallback(() => {
        handleDragEnd();
    }, [handleDragEnd]);

    // Add global mouse/touch listeners when dragging
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

    const toggleAutoRotate = () => {
        setAutoRotate(!autoRotate);
    };

    // Reset rotation
    const resetRotation = () => {
        gsap.to(rotation, {
            x: 0,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            onUpdate: function() {
                setRotation({
                    x: this.targets()[0].x,
                    y: this.targets()[0].y
                });
            }
        });
    };

    return (
        <div 
            ref={containerRef}
            className="product-viewer-360"
            onMouseDown={handleMouseDown}
            onTouchStart={handleTouchStart}
        >
            {/* 3D Stage */}
            <div className="viewer-360-stage">
                <div 
                    ref={imageRef}
                    className="viewer-360-product"
                    style={{
                        transform: `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
                        cursor: isDragging ? 'grabbing' : 'grab'
                    }}
                >
                    <img 
                        src={imageSrc} 
                        alt={productName}
                        draggable="false"
                    />
                </div>
                
                {/* Reflection */}
                <div 
                    className="viewer-360-reflection"
                    style={{
                        transform: `perspective(1000px) rotateX(${-rotation.x - 180}deg) rotateY(${rotation.y}deg) translateY(-100%)`,
                    }}
                >
                    <img 
                        src={imageSrc} 
                        alt=""
                        draggable="false"
                    />
                </div>
            </div>
            
            {/* Drag hint */}
            {showHint && (
                <div ref={hintRef} className="viewer-360-hint">
                    <Hand size={18} />
                    <span>Drag to rotate</span>
                </div>
            )}
            
            {/* Controls */}
            <div className="viewer-360-controls">
                <button 
                    className={`viewer-360-btn ${autoRotate ? 'active' : ''}`}
                    onClick={toggleAutoRotate}
                    title={autoRotate ? 'Stop auto-rotate' : 'Start auto-rotate'}
                >
                    <RotateCw size={18} className={autoRotate ? 'spinning' : ''} />
                </button>
                <button 
                    className="viewer-360-btn"
                    onClick={resetRotation}
                    title="Reset view"
                >
                    <MousePointer2 size={18} />
                </button>
            </div>
            
            {/* Rotation indicator */}
            <div className="viewer-360-indicator">
                <div 
                    className="indicator-dial"
                    style={{ transform: `rotate(${rotation.y}deg)` }}
                >
                    <div className="indicator-needle"></div>
                </div>
                <span className="indicator-label">360°</span>
            </div>
        </div>
    );
};

export default ProductViewer360;
