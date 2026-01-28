import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';

/**
 * InteractiveMap - Displays an embedded map with location marker
 * Uses OpenStreetMap embed (no API key required)
 */
const InteractiveMap = ({ 
    lat = 10.0103, // Bodinayakanur coordinates
    lng = 77.3491,
    zoom = 14,
    className = '',
    title = "Emperor Spices Location",
    address = "Bodinayakanur, Theni District, Tamil Nadu, India"
}) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [showFullscreen, setShowFullscreen] = useState(false);
    const mapRef = useRef(null);
    const containerRef = useRef(null);

    // OpenStreetMap embed URL
    const mapUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${lng - 0.02}%2C${lat - 0.015}%2C${lng + 0.02}%2C${lat + 0.015}&layer=mapnik&marker=${lat}%2C${lng}`;
    
    // Google Maps directions URL
    const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}&destination_place_id=Bodinayakanur`;

    useEffect(() => {
        if (isLoaded && containerRef.current) {
            gsap.fromTo(containerRef.current,
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }
            );
        }
    }, [isLoaded]);

    const handleFullscreenToggle = () => {
        setShowFullscreen(!showFullscreen);
    };

    return (
        <>
            <div 
                ref={containerRef} 
                className={`interactive-map-container ${className} ${isLoaded ? 'loaded' : ''}`}
            >
                {/* Map Header */}
                <div className="map-header">
                    <div className="map-location-info">
                        <span className="map-pin-icon">📍</span>
                        <div className="map-location-text">
                            <h4>{title}</h4>
                            <p>{address}</p>
                        </div>
                    </div>
                    <div className="map-actions">
                        <button 
                            className="map-action-btn"
                            onClick={handleFullscreenToggle}
                            aria-label="Expand map"
                        >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/>
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Map Frame */}
                <div className="map-frame-wrapper">
                    {!isLoaded && (
                        <div className="map-loading">
                            <div className="map-loading-spinner" />
                            <span>Loading map...</span>
                        </div>
                    )}
                    <iframe
                        ref={mapRef}
                        className={`map-iframe ${isLoaded ? 'visible' : ''}`}
                        src={mapUrl}
                        title="Location Map"
                        loading="lazy"
                        allowFullScreen
                        onLoad={() => setIsLoaded(true)}
                    />
                    
                    {/* Custom marker overlay */}
                    <div className="map-marker-overlay">
                        <div className="custom-marker">
                            <div className="marker-pulse" />
                            <div className="marker-icon">🌿</div>
                        </div>
                    </div>
                </div>

                {/* Map Footer */}
                <div className="map-footer">
                    <a 
                        href={directionsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="directions-btn btn-magnetic"
                    >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M3 11l19-9-9 19-2-8-8-2z"/>
                        </svg>
                        <span>Get Directions</span>
                    </a>
                    <span className="map-attribution">
                        Map data © <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">OpenStreetMap</a>
                    </span>
                </div>
            </div>

            {/* Fullscreen Modal */}
            {showFullscreen && (
                <div className="map-fullscreen-modal" onClick={handleFullscreenToggle}>
                    <div className="map-fullscreen-content" onClick={(e) => e.stopPropagation()}>
                        <button 
                            className="map-close-btn"
                            onClick={handleFullscreenToggle}
                            aria-label="Close fullscreen map"
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M18 6L6 18M6 6l12 12"/>
                            </svg>
                        </button>
                        <iframe
                            className="map-iframe-fullscreen"
                            src={mapUrl}
                            title="Location Map Fullscreen"
                            allowFullScreen
                        />
                        <div className="map-fullscreen-footer">
                            <div className="map-location-info">
                                <span className="map-pin-icon">📍</span>
                                <div>
                                    <h4>{title}</h4>
                                    <p>{address}</p>
                                </div>
                            </div>
                            <a 
                                href={directionsUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="directions-btn btn-magnetic"
                            >
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M3 11l19-9-9 19-2-8-8-2z"/>
                                </svg>
                                <span>Get Directions</span>
                            </a>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default InteractiveMap;
