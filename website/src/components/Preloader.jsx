import React, { useEffect, useState, useRef } from 'react';

/**
 * VIDEO PRELOADER - Emperor Spices
 * 
 * Plays a cinematic brand intro video while page loads in background.
 * Waits for full video playback before revealing the website.
 * Smooth fade-out transition reveals the website.
 */

const Preloader = ({ onComplete, contentReady }) => {
    const [isExiting, setIsExiting] = useState(false);
    const [videoEnded, setVideoEnded] = useState(false);
    const [videoLoading, setVideoLoading] = useState(true);
    const videoRef = useRef(null);
    const hasTriggeredExit = useRef(false);

    // Detect mobile device
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        typeof navigator !== 'undefined' ? navigator.userAgent : ''
    );

    // Handle video end - wait for both video end AND content ready
    useEffect(() => {
        // Prevent multiple triggers
        if (hasTriggeredExit.current) return;

        if (videoEnded && contentReady && !isExiting) {
            hasTriggeredExit.current = true;
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
        if (!video) {
            // No video element - skip preloader immediately
            setVideoEnded(true);
            return;
        }

        const handleEnded = () => {
            console.log('Video ended - revealing website');
            setVideoEnded(true);
        };

        const handleCanPlay = () => {
            setVideoLoading(false);
            video.play().catch(err => {
                console.warn('Video autoplay failed:', err);
                setVideoEnded(true); // Skip if can't play
            });
        };

        const handleLoadedData = () => {
            setVideoLoading(false);
        };

        const handleError = () => {
            console.warn('Video failed to load, skipping preloader');
            setVideoEnded(true); // Skip on any video error
        };

        // Handle video stalled (slow loading)
        const handleStalled = () => {
            console.warn('Video stalled - may be slow connection');
            if (isMobile) {
                // On mobile, skip immediately if stalled
                setVideoEnded(true);
            }
        };

        // Handle video waiting (buffering)
        const handleWaiting = () => {
            console.warn('Video waiting/buffering');
        };

        video.addEventListener('ended', handleEnded);
        video.addEventListener('canplay', handleCanPlay);
        video.addEventListener('loadeddata', handleLoadedData);
        video.addEventListener('error', handleError);
        video.addEventListener('stalled', handleStalled);
        video.addEventListener('waiting', handleWaiting);

        // Mobile: short 3s timeout since video often doesn't load well
        // Desktop: longer 15s timeout to let video play
        const timeoutMs = isMobile ? 3000 : 15000;
        const fallbackTimer = setTimeout(() => {
            if (!videoEnded) {
                console.warn(`Video fallback timeout (${timeoutMs / 1000}s) - revealing content`);
                setVideoEnded(true);
            }
        }, timeoutMs);

        return () => {
            video.removeEventListener('ended', handleEnded);
            video.removeEventListener('canplay', handleCanPlay);
            video.removeEventListener('loadeddata', handleLoadedData);
            video.removeEventListener('error', handleError);
            video.removeEventListener('stalled', handleStalled);
            video.removeEventListener('waiting', handleWaiting);
            clearTimeout(fallbackTimer);
        };
    }, [videoEnded, isMobile]);

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
                    opacity: videoLoading ? 0 : 1,
                    transition: 'opacity 0.3s ease',
                }}
            >
                <source src="/videos/intro.mp4" type="video/mp4" />
            </video>

            {/* Loading indicator while video loads */}
            {videoLoading && (
                <div style={{
                    position: 'absolute',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '16px',
                }}>
                    <div style={{
                        width: '40px',
                        height: '40px',
                        border: '3px solid rgba(255, 255, 255, 0.2)',
                        borderTopColor: '#c9a961',
                        borderRadius: '50%',
                        animation: 'spin 1s linear infinite',
                    }} />
                    <style>{`
                        @keyframes spin {
                            to { transform: rotate(360deg); }
                        }
                    `}</style>
                </div>
            )}

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
