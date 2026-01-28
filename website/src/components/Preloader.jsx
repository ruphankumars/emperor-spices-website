import React, { useEffect, useState, useRef } from 'react';

/**
 * VIDEO PRELOADER - Emperor Spices
 * 
 * Plays a cinematic brand intro video while page loads in background.
 * Smooth fade-out transition reveals the website.
 */

const Preloader = ({ onComplete, contentReady }) => {
    const [isExiting, setIsExiting] = useState(false);
    const [videoEnded, setVideoEnded] = useState(false);
    const videoRef = useRef(null);

    // Handle video end - wait for both video end AND content ready
    useEffect(() => {
        if (videoEnded && contentReady && !isExiting) {
            setIsExiting(true);
            // Smooth fade out, then remove
            setTimeout(() => {
                onComplete?.();
            }, 800);
        }
    }, [videoEnded, contentReady, isExiting, onComplete]);

    // Video event handlers
    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const handleEnded = () => {
            setVideoEnded(true);
        };

        const handleCanPlay = () => {
            video.play().catch(err => {
                console.warn('Video autoplay failed:', err);
                setVideoEnded(true); // Skip if can't play
            });
        };

        video.addEventListener('ended', handleEnded);
        video.addEventListener('canplay', handleCanPlay);

        // Fallback: max 12 seconds
        const fallbackTimer = setTimeout(() => {
            setVideoEnded(true);
        }, 12000);

        return () => {
            video.removeEventListener('ended', handleEnded);
            video.removeEventListener('canplay', handleCanPlay);
            clearTimeout(fallbackTimer);
        };
    }, []);

    return (
        <div
            style={{
                position: 'fixed',
                inset: 0,
                zIndex: 9999,
                background: '#1a2d26', // Dark forest green to match video
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                opacity: isExiting ? 0 : 1,
                transform: isExiting ? 'scale(1.02)' : 'scale(1)',
                transition: 'opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1), transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
                pointerEvents: isExiting ? 'none' : 'auto',
            }}
        >
            {/* Video */}
            <video
                ref={videoRef}
                muted
                playsInline
                preload="auto"
                style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                }}
            >
                <source src="/videos/intro.mp4" type="video/mp4" />
            </video>

            {/* Subtle vignette for cinematic feel */}
            <div style={{
                position: 'absolute',
                inset: 0,
                background: 'radial-gradient(ellipse at center, transparent 60%, rgba(0, 0, 0, 0.25) 100%)',
                pointerEvents: 'none',
            }} />
        </div>
    );
};

export default Preloader;
