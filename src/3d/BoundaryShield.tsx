"use client";

import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface BoundaryShieldProps {
  color?: string;
  isAlert?: boolean;
}

export const BoundaryShield: React.FC<BoundaryShieldProps> = ({
  color = "#38bdf8",
  isAlert = false,
}) => {
  const domeRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (domeRef.current) {
      domeRef.current.rotation.y += delta * 0.2;
      const pulse = Math.sin(state.clock.elapsedTime * 3) * 0.08;
      domeRef.current.scale.set(1 + pulse, 1 + pulse, 1 + pulse);
    }
    if (ringRef.current) {
      ringRef.current.rotation.z -= delta * 0.5;
    }
  });

  const shieldColor = isAlert ? "#f43f5e" : color;

  return (
    <group position={[0, 0.4, 0]}>
      {/* Geodesic Hexagonal Forcefield Dome */}
      <mesh ref={domeRef}>
        <sphereGeometry args={[2.2, 10, 8, 0, Math.PI * 2, 0, Math.PI / 2.1]} />
        <meshStandardMaterial
          color={shieldColor}
          emissive={shieldColor}
          emissiveIntensity={isAlert ? 1.4 : 0.35}
          wireframe
          transparent
          opacity={isAlert ? 0.75 : 0.35}
          roughness={0.2}
        />
      </mesh>

      {/* Internal Shield Energy Film */}
      <mesh>
        <sphereGeometry args={[2.16, 8, 6, 0, Math.PI * 2, 0, Math.PI / 2.1]} />
        <meshBasicMaterial
          color={shieldColor}
          transparent
          opacity={isAlert ? 0.25 : 0.08}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Deflection Perimeter Ground Ring */}
      <mesh ref={ringRef} position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[2.18, 2.32, 16]} />
        <meshBasicMaterial
          color={shieldColor}
          transparent
          opacity={0.8}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
};
