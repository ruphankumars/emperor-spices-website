import React, { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

// Enhanced particle with glow and parallax
function Particle({ position, color, size, speed, glowIntensity, scrollFactor }) {
    const meshRef = useRef();
    const initialY = useRef(position[1]);
    const initialX = useRef(position[0]);

    useFrame((state) => {
        if (meshRef.current) {
            // Gentle floating motion with enhanced movement
            const time = state.clock.elapsedTime;
            meshRef.current.position.y = initialY.current +
                Math.sin(time * speed + position[0]) * 0.6 +
                (scrollFactor * position[2] * 0.1);

            // Horizontal drift with parallax
            meshRef.current.position.x = initialX.current +
                Math.sin(time * 0.15 + position[2]) * 0.3;

            // Subtle pulsing scale for glow effect
            const pulse = 1 + Math.sin(time * 2 + position[0]) * 0.15;
            meshRef.current.scale.setScalar(pulse);

            // Subtle rotation
            meshRef.current.rotation.x += 0.001;
            meshRef.current.rotation.y += 0.0015;
            meshRef.current.rotation.z += 0.0005;

            // Wrap around if too far
            if (meshRef.current.position.y > 12) {
                meshRef.current.position.y = -12;
            }
            if (meshRef.current.position.y < -12) {
                meshRef.current.position.y = 12;
            }
        }
    });

    return (
        <mesh ref={meshRef} position={position}>
            <sphereGeometry args={[size, 12, 12]} />
            <meshStandardMaterial
                color={color}
                transparent
                opacity={0.65}
                emissive={color}
                emissiveIntensity={glowIntensity}
                roughness={0.3}
                metalness={0.1}
            />
        </mesh>
    );
}

// Enhanced particles system with gold/green variations
function ParticlesSystem({ count = 40 }) {
    const particles = useMemo(() => {
        const temp = [];
        // Enhanced color palette - more gold and green variations
        const colors = [
            '#D4A849', // Gold
            '#E8C97A', // Light gold
            '#C9A654', // Deep gold
            '#B8942F', // Antique gold
            '#9CAF88', // Sage
            '#6B8058', // Dark sage
            '#7A9A68', // Forest green
            '#C5D4B7', // Light sage
            '#8BA869', // Olive
        ];

        for (let i = 0; i < count; i++) {
            // Weight towards gold colors (first 4)
            const colorIndex = Math.random() < 0.5
                ? Math.floor(Math.random() * 4)  // Gold colors
                : 4 + Math.floor(Math.random() * 5); // Green colors

            temp.push({
                position: [
                    (Math.random() - 0.5) * 35,
                    (Math.random() - 0.5) * 25,
                    (Math.random() - 0.5) * 18
                ],
                color: colors[colorIndex],
                size: Math.random() * 0.06 + 0.02,
                speed: Math.random() * 0.4 + 0.2,
                glowIntensity: Math.random() * 0.4 + 0.2,
                scrollFactor: 0.1 // Use fixed factor instead of tracking scroll
            });
        }
        return temp;
    }, [count]);

    return (
        <>
            {particles.map((particle, i) => (
                <Particle key={i} {...particle} />
            ))}
        </>
    );
}

// Glow pass component
function GlowLights() {
    return (
        <>
            <ambientLight intensity={0.4} color="#fffdf5" />
            <pointLight position={[10, 10, 10]} intensity={0.6} color="#D4A849" />
            <pointLight position={[-10, -10, 5]} intensity={0.4} color="#9CAF88" />
            <pointLight position={[0, 0, 15]} intensity={0.3} color="#ffffff" />
        </>
    );
}

// Main Component with scroll-aware particles
const ParticleBackground = ({ className = '', particleCount = 30 }) => {
    const [isMobile, setIsMobile] = useState(false);

    // Detect mobile and reduce particle count
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768 ||
                'ontouchstart' in window ||
                navigator.maxTouchPoints > 0);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Reduce particles on mobile for performance
    const adjustedCount = isMobile ? Math.floor(particleCount * 0.4) : particleCount;

    return (
        <div className={`particle-bg ${className}`}>
            <Canvas
                camera={{ position: [0, 0, 12], fov: 55 }}
                gl={{ antialias: !isMobile, alpha: true, powerPreference: 'low-power' }}
                style={{ pointerEvents: 'none' }}
                dpr={isMobile ? 1 : [1, 1.5]}
            >
                <GlowLights />
                <ParticlesSystem count={adjustedCount} />

                {/* Optional: Add subtle fog for depth */}
                <fog attach="fog" args={['#fffdf5', 15, 40]} />
            </Canvas>
        </div>
    );
};

export default ParticleBackground;
