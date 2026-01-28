import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { useScroll, PerspectiveCamera, Float } from "@react-three/drei";
import * as THREE from "three";

// Realistic Cardamom Pod - elongated OVAL shape with ROUNDED ends and fine striations
const SpicePod = ({ position, rotation, scale }) => {
    const groupRef = useRef();

    // Ellipsoid parameters for cardamom shape
    const height = 0.65;
    const maxWidth = 0.16;

    // Create realistic elongated OVAL cardamom shape with ROUNDED ends
    const podGeometry = useMemo(() => {
        const points = [];
        const segments = 32;

        for (let i = 0; i <= segments; i++) {
            const t = i / segments;
            const y = (t - 0.5) * height;
            
            // Ellipse formula for smooth rounded oval
            const halfHeight = height / 2;
            const normalizedY = y / halfHeight;
            const yFactor = Math.max(0, 1 - normalizedY * normalizedY);
            let radius = maxWidth * Math.sqrt(yFactor);
            
            // Slight asymmetry - top slightly narrower
            if (t > 0.55) radius *= 0.94;
            
            // Subtle organic variation
            const organicNoise = Math.sin(t * Math.PI * 4) * 0.005;
            radius = Math.max(0.015, radius + organicNoise);
            
            points.push(new THREE.Vector2(radius, y));
        }

        return new THREE.LatheGeometry(points, 48);
    }, []);

    // Create many fine vertical striations like real cardamom
    const ridgeCurves = useMemo(() => {
        const curves = [];
        const numRidges = 28;

        for (let r = 0; r < numRidges; r++) {
            const angle = (r / numRidges) * Math.PI * 2;
            const angleOffset = Math.sin(r * 1.7) * 0.015;
            const pts = [];
            const segs = 24;

            for (let i = 0; i <= segs; i++) {
                const t = i / segs;
                const y = (t - 0.5) * height;
                
                // Match ellipsoid shape
                const halfHeight = height / 2;
                const normalizedY = y / halfHeight;
                const yFactor = Math.max(0, 1 - normalizedY * normalizedY);
                let radius = maxWidth * Math.sqrt(yFactor);
                
                if (t > 0.55) radius *= 0.94;
                radius = Math.max(0.02, radius + 0.004);
                
                const ridgeVariation = Math.sin(t * Math.PI * 2.5 + r) * 0.002;
                
                pts.push(new THREE.Vector3(
                    Math.cos(angle + angleOffset) * (radius + ridgeVariation),
                    y,
                    Math.sin(angle + angleOffset) * (radius + ridgeVariation)
                ));
            }
            curves.push(new THREE.CatmullRomCurve3(pts));
        }
        return curves;
    }, []);

    // Create secondary micro-ridges for texture depth
    const microRidges = useMemo(() => {
        const ridges = [];
        const numMicroRidges = 14;

        for (let r = 0; r < numMicroRidges; r++) {
            const angle = ((r + 0.5) / numMicroRidges) * Math.PI * 2;
            const pts = [];
            const segs = 20;

            for (let i = 0; i <= segs; i++) {
                const t = i / segs;
                const y = (t - 0.5) * height;
                
                const halfHeight = height / 2;
                const normalizedY = y / halfHeight;
                const yFactor = Math.max(0, 1 - normalizedY * normalizedY);
                let radius = maxWidth * Math.sqrt(yFactor);
                
                if (t > 0.55) radius *= 0.94;
                radius = Math.max(0.018, radius + 0.002);
                
                pts.push(new THREE.Vector3(
                    Math.cos(angle) * radius,
                    y,
                    Math.sin(angle) * radius
                ));
            }
            ridges.push(new THREE.CatmullRomCurve3(pts));
        }
        return ridges;
    }, []);

    useFrame((state) => {
        const time = state.clock.getElapsedTime();
        if (groupRef.current) {
            groupRef.current.rotation.x = rotation[0] + Math.sin(time + position[0]) * 0.1;
            groupRef.current.rotation.y = rotation[1] + Math.cos(time + position[1]) * 0.1;
        }
    });

    return (
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
            <group ref={groupRef} position={position} rotation={rotation} scale={scale}>
                {/* Main Pod Body - natural green with texture */}
                <mesh geometry={podGeometry}>
                    <meshStandardMaterial
                        color="#5a7a42"
                        roughness={0.85}
                        metalness={0.02}
                        side={THREE.DoubleSide}
                    />
                </mesh>

                {/* Primary Vertical Striations - fine lines */}
                {ridgeCurves.map((curve, i) => (
                    <mesh key={`ridge-${i}`}>
                        <tubeGeometry args={[curve, 20, 0.003, 4, false]} />
                        <meshStandardMaterial
                            color="#4a6b35"
                            roughness={0.8}
                        />
                    </mesh>
                ))}

                {/* Secondary Micro-ridges for depth */}
                {microRidges.map((curve, i) => (
                    <mesh key={`micro-${i}`}>
                        <tubeGeometry args={[curve, 16, 0.0015, 3, false]} />
                        <meshStandardMaterial
                            color="#3d5c2a"
                            roughness={0.85}
                        />
                    </mesh>
                ))}

                {/* Top Calyx (stem end) - small brown dried flower remnant */}
                <group position={[0, 0.34, 0]}>
                    <mesh>
                        <cylinderGeometry args={[0.018, 0.028, 0.035, 8]} />
                        <meshStandardMaterial color="#5a4d3d" roughness={0.95} />
                    </mesh>
                    {/* Small crown-like structure */}
                    <mesh position={[0, 0.025, 0]}>
                        <coneGeometry args={[0.012, 0.02, 5]} />
                        <meshStandardMaterial color="#4a3d2d" roughness={0.95} />
                    </mesh>
                </group>

                {/* Bottom Stem - small attachment point */}
                <mesh position={[0, -0.34, 0]}>
                    <cylinderGeometry args={[0.008, 0.015, 0.025, 6]} />
                    <meshStandardMaterial color="#5a4d3d" roughness={0.95} />
                </mesh>
            </group>
        </Float>
    );
};

const Scene = () => {
    const scroll = useScroll();
    const groupRef = useRef();

    // Create a field of spice pods
    const pods = useMemo(() => {
        const temp = [];
        for (let i = 0; i < 40; i++) {
            temp.push({
                position: [
                    (Math.random() - 0.5) * 10,
                    (Math.random() - 0.5) * 10,
                    (Math.random() - 0.5) * 20,
                ],
                rotation: [Math.random() * Math.PI, Math.random() * Math.PI, 0],
                scale: 0.5 + Math.random() * 0.5,
            });
        }
        return temp;
    }, []);

    useFrame((state) => {
        // Fly through effect based on scroll
        const scrollOffset = scroll.offset;
        groupRef.current.position.z = scrollOffset * 15;

        // Subtle rotation of the whole field
        groupRef.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.1) * 0.1;
    });

    return (
        <>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1} />
            <spotLight position={[-10, 10, 5]} angle={0.15} penumbra={1} intensity={2} />

            <group ref={groupRef}>
                {pods.map((props, i) => (
                    <SpicePod key={i} {...props} />
                ))}
            </group>

            <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={50} />
        </>
    );
};

export default Scene;
