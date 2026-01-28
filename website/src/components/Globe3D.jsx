import React, { useRef, useEffect, useMemo, useCallback, useState } from 'react';
import Globe from 'react-globe.gl';
import * as THREE from 'three';

// India coordinates (source point)
const INDIA_COORDS = { lat: 20.5937, lng: 78.9629 };

// Export destinations with coordinates
const DESTINATIONS = [
    { name: 'UAE', lat: 23.4241, lng: 53.8478, region: 'Middle East' },
    { name: 'Saudi Arabia', lat: 23.8859, lng: 45.0792, region: 'Middle East' },
    { name: 'Kuwait', lat: 29.3759, lng: 47.9774, region: 'Middle East' },
    { name: 'Qatar', lat: 25.2854, lng: 51.5310, region: 'Middle East' },
    { name: 'Oman', lat: 21.4735, lng: 55.9754, region: 'Middle East' },
    { name: 'Bahrain', lat: 26.0667, lng: 50.5577, region: 'Middle East' },
    { name: 'UK', lat: 51.5074, lng: -0.1278, region: 'Europe' },
    { name: 'Germany', lat: 52.5200, lng: 13.4050, region: 'Europe' },
    { name: 'France', lat: 48.8566, lng: 2.3522, region: 'Europe' },
    { name: 'Netherlands', lat: 52.3676, lng: 4.9041, region: 'Europe' },
    { name: 'Belgium', lat: 50.8503, lng: 4.3517, region: 'Europe' },
    { name: 'USA', lat: 37.0902, lng: -95.7129, region: 'Americas' },
    { name: 'Canada', lat: 56.1304, lng: -106.3468, region: 'Americas' },
    { name: 'Mexico', lat: 23.6345, lng: -102.5528, region: 'Americas' },
    { name: 'Japan', lat: 36.2048, lng: 138.2529, region: 'Asia Pacific' },
    { name: 'Korea', lat: 35.9078, lng: 127.7669, region: 'Asia Pacific' },
    { name: 'Singapore', lat: 1.3521, lng: 103.8198, region: 'Asia Pacific' },
    { name: 'Malaysia', lat: 4.2105, lng: 101.9758, region: 'Asia Pacific' },
];

// Create arcs data from India to destinations
const createArcsData = () => {
    return DESTINATIONS.map((dest, index) => ({
        startLat: INDIA_COORDS.lat,
        startLng: INDIA_COORDS.lng,
        endLat: dest.lat,
        endLng: dest.lng,
        color: ['#d4a853', '#ffd700'],
        name: dest.name,
        dashAnimateTime: 2000 + (index % 5) * 500
    }));
};

// Create points data for destinations
const createPointsData = () => {
    // India point (larger, prominent)
    const indiaPoint = {
        lat: INDIA_COORDS.lat,
        lng: INDIA_COORDS.lng,
        size: 0.8,
        color: '#ffd700',
        name: 'INDIA',
        isOrigin: true
    };

    // Destination points
    const destPoints = DESTINATIONS.map(dest => ({
        lat: dest.lat,
        lng: dest.lng,
        size: 0.3,
        color: '#ffd700',
        name: dest.name,
        isOrigin: false
    }));

    return [indiaPoint, ...destPoints];
};

// Create rings data for animated pulse effect
const createRingsData = () => {
    return [{
        lat: INDIA_COORDS.lat,
        lng: INDIA_COORDS.lng,
        maxR: 5,
        propagationSpeed: 2,
        repeatPeriod: 1000,
        color: '#ffd700'
    }];
};

// Create labels data
const createLabelsData = () => {
    return [{
        lat: INDIA_COORDS.lat,
        lng: INDIA_COORDS.lng,
        text: 'INDIA',
        color: '#ffd700',
        size: 1.2
    }];
};

const Globe3D = ({ className = '' }) => {
    const globeRef = useRef();
    const containerRef = useRef();
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

    // Memoized data
    const arcsData = useMemo(() => createArcsData(), []);
    const pointsData = useMemo(() => createPointsData(), []);
    const ringsData = useMemo(() => createRingsData(), []);
    const labelsData = useMemo(() => createLabelsData(), []);

    // Handle container resize
    useEffect(() => {
        const updateDimensions = () => {
            if (containerRef.current) {
                const { width, height } = containerRef.current.getBoundingClientRect();
                setDimensions({ width, height });
            }
        };

        updateDimensions();
        window.addEventListener('resize', updateDimensions);
        return () => window.removeEventListener('resize', updateDimensions);
    }, []);

    // Initialize globe settings
    useEffect(() => {
        if (globeRef.current) {
            // Set initial view to focus on India
            globeRef.current.pointOfView({
                lat: 20,
                lng: 60,
                altitude: 2.0
            }, 1000);

            // Start auto-rotation
            const controls = globeRef.current.controls();
            if (controls) {
                controls.autoRotate = true;
                controls.autoRotateSpeed = 0.5;
                controls.enableZoom = false;
            }
        }
    }, [globeRef.current, dimensions]);

    // Custom HTML for labels
    const labelHtml = useCallback((d) => {
        return `<div style="
            color: #ffd700; 
            font-size: 16px; 
            font-weight: bold; 
            text-shadow: 0 0 10px rgba(255, 215, 0, 0.8), 0 0 20px rgba(255, 215, 0, 0.5);
            font-family: 'Inter', sans-serif;
            letter-spacing: 2px;
        ">${d.text}</div>`;
    }, []);

    return (
        <div
            ref={containerRef}
            className={`globe-container ${className}`}
            style={{
                width: '100%',
                height: '100%',
                position: 'relative',
                background: 'transparent'
            }}
        >
            {dimensions.width > 0 && (
                <Globe
                    ref={globeRef}
                    width={dimensions.width}
                    height={dimensions.height}

                    // Globe appearance - Bright daylight styling
                    globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
                    bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
                    backgroundImageUrl={null}
                    backgroundColor="rgba(0,0,0,0)"

                    // Grid lines on globe
                    showGraticules={true}

                    // Disable atmosphere glow
                    showAtmosphere={false}

                    // Arcs (export lines from India)
                    arcsData={arcsData}
                    arcColor="color"
                    arcDashLength={0.5}
                    arcDashGap={0.2}
                    arcDashAnimateTime="dashAnimateTime"
                    arcStroke={0.5}
                    arcAltitudeAutoScale={0.4}

                    // Points (destination markers)
                    pointsData={pointsData}
                    pointColor="color"
                    pointAltitude={0.01}
                    pointRadius="size"

                    // Rings (pulse effect at India)
                    ringsData={ringsData}
                    ringColor="color"
                    ringMaxRadius="maxR"
                    ringPropagationSpeed="propagationSpeed"
                    ringRepeatPeriod="repeatPeriod"

                    // Labels
                    labelsData={labelsData}
                    labelLat="lat"
                    labelLng="lng"
                    labelText="text"
                    labelSize="size"
                    labelDotRadius={0.5}
                    labelColor="color"
                    labelResolution={3}
                    labelAltitude={0.02}

                    // Custom label HTML
                    htmlElementsData={labelsData}
                    htmlElement={labelHtml}
                    htmlAltitude={0.05}

                    // Performance
                    animateIn={true}
                    waitForGlobeReady={true}
                />
            )}

            {/* Stats Overlay */}
            <div style={{
                position: 'absolute',
                bottom: '20px',
                right: '20px',
                display: 'flex',
                gap: '24px',
                background: 'rgba(0, 0, 0, 0.6)',
                backdropFilter: 'blur(10px)',
                padding: '16px 24px',
                borderRadius: '12px',
                border: '1px solid rgba(255, 255, 255, 0.1)'
            }}>
                <div style={{ textAlign: 'center' }}>
                    <div style={{
                        fontSize: '28px',
                        fontWeight: 'bold',
                        color: '#ffd700',
                        lineHeight: 1
                    }}>40+</div>
                    <div style={{
                        fontSize: '11px',
                        color: '#7cb69d',
                        letterSpacing: '1px',
                        marginTop: '4px'
                    }}>COUNTRIES</div>
                </div>
                <div style={{
                    width: '1px',
                    background: 'rgba(255,255,255,0.2)'
                }}></div>
                <div style={{ textAlign: 'center' }}>
                    <div style={{
                        fontSize: '28px',
                        fontWeight: 'bold',
                        color: 'white',
                        lineHeight: 1
                    }}>6</div>
                    <div style={{
                        fontSize: '11px',
                        color: '#7cb69d',
                        letterSpacing: '1px',
                        marginTop: '4px'
                    }}>CONTINENTS</div>
                </div>
            </div>
        </div>
    );
};

export default Globe3D;
