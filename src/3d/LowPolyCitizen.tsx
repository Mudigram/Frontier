"use client";

import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { createLowPolyMaterial, createGlowMaterial } from "./materials";

export type CitizenArchetype =
  | "scout"
  | "settler"
  | "baron"
  | "vanguard"
  | "leviathan";

export interface CitizenMetadata {
  archetype: CitizenArchetype;
  title: string;
  subtitle: string;
  tierColor: string;
  glowColor: string;
  minPercent: number;
  maxPercent: number;
  description: string;
}

export const ARCHETYPES: Record<CitizenArchetype, CitizenMetadata> = {
  scout: {
    archetype: "scout",
    title: "Frontier Scout",
    subtitle: "Recon & Outpost Cartographer",
    tierColor: "#38bdf8",
    glowColor: "#0284c7",
    minPercent: 0,
    maxPercent: 0.1,
    description: "Light traveler charting the perimeter. Operates safely within the Genesis Outpost zone.",
  },
  settler: {
    archetype: "settler",
    title: "Founding Settler",
    subtitle: "Civic Merchant & Builder",
    tierColor: "#10b981",
    glowColor: "#059669",
    minPercent: 0.1,
    maxPercent: 1.0,
    description: "Permanent resident anchoring early commerce. Full rights under Chapter I expansion.",
  },
  baron: {
    archetype: "baron",
    title: "Territory Baron",
    subtitle: "Settlement Overseer",
    tierColor: "#f59e0b",
    glowColor: "#d97706",
    minPercent: 1.0,
    maxPercent: 2.0,
    description: "Commanding landholder managing distribution across Chapter II Settlement domains.",
  },
  vanguard: {
    archetype: "vanguard",
    title: "Citadel Vanguard",
    subtitle: "Apex Fortress Sentinel",
    tierColor: "#a855f7",
    glowColor: "#7e22ce",
    minPercent: 2.0,
    maxPercent: 4.0,
    description: "Heavy plate vanguard operating at the absolute legal frontier ceiling of 4.00%.",
  },
  leviathan: {
    archetype: "leviathan",
    title: "The Leviathan",
    subtitle: "Cap-Restricted Whale / Exile",
    tierColor: "#f43f5e",
    glowColor: "#e11d48",
    minPercent: 4.0,
    maxPercent: 100,
    description: "Exceeds the active 4% wallet capacity limit. Directly intercepted by the Token-2022 Transfer Hook (Error 6000).",
  },
};

export function getArchetypeFromPercent(percent: number): CitizenMetadata {
  if (percent > 4.0) return ARCHETYPES.leviathan;
  if (percent >= 2.0) return ARCHETYPES.vanguard;
  if (percent >= 1.0) return ARCHETYPES.baron;
  if (percent >= 0.1) return ARCHETYPES.settler;
  return ARCHETYPES.scout;
}

interface LowPolyCitizenProps {
  archetype: CitizenArchetype;
  scale?: number;
}

export const LowPolyCitizen: React.FC<LowPolyCitizenProps> = ({
  archetype,
  scale = 1.0,
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const headRef = useRef<THREE.Mesh>(null);
  const staffRef = useRef<THREE.Group>(null);

  const meta = ARCHETYPES[archetype];

  // Materials based on citizen tier
  const armorMat = React.useMemo(() => {
    return createLowPolyMaterial(
      archetype === "leviathan" ? "#1e1b4b" : archetype === "vanguard" ? "#312e81" : "#1e293b",
      { roughness: 0.4, metalness: 0.6 }
    );
  }, [archetype]);

  const accentMat = React.useMemo(() => {
    return createLowPolyMaterial(meta.tierColor, {
      roughness: 0.3,
      metalness: 0.4,
      emissive: meta.glowColor,
      emissiveIntensity: 0.4,
    });
  }, [meta]);

  const visorMat = React.useMemo(() => {
    return createGlowMaterial(meta.tierColor, 1.8);
  }, [meta]);

  const BASE_Y = -0.85;

  // Subtle idle breathing and bobbing motion
  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.position.y =
        BASE_Y + Math.sin(state.clock.elapsedTime * 2) * 0.035;
      groupRef.current.rotation.y += delta * 0.35;
    }
    if (headRef.current) {
      headRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 1.5) * 0.1;
    }
  });

  return (
    <group ref={groupRef} scale={[scale, scale, scale]} position={[0, BASE_Y, 0]}>
      {/* Pedestal Base Ring */}
      <mesh position={[0, -0.05, 0]}>
        <cylinderGeometry args={[0.9, 1.0, 0.12, 7]} />
        <meshStandardMaterial color="#0f172a" flatShading roughness={0.7} />
      </mesh>
      <mesh position={[0, 0.02, 0]}>
        <ringGeometry args={[0.75, 0.82, 16]} />
        <meshBasicMaterial color={meta.tierColor} side={THREE.DoubleSide} transparent opacity={0.8} />
      </mesh>

      {/* Legs */}
      <mesh position={[-0.14, 0.35, 0]} material={armorMat}>
        <cylinderGeometry args={[0.07, 0.09, 0.6, 5]} />
      </mesh>
      <mesh position={[0.14, 0.35, 0]} material={armorMat}>
        <cylinderGeometry args={[0.07, 0.09, 0.6, 5]} />
      </mesh>

      {/* Pelvis & Belt */}
      <mesh position={[0, 0.68, 0]} material={accentMat}>
        <boxGeometry args={[0.38, 0.12, 0.24]} />
      </mesh>

      {/* Torso / Breastplate */}
      <mesh position={[0, 1.02, 0]} material={armorMat}>
        <cylinderGeometry args={[0.26, 0.19, 0.58, 6]} />
      </mesh>
      {/* Chest Sigil */}
      <mesh position={[0, 1.08, 0.12]} material={accentMat}>
        <octahedronGeometry args={[0.09, 0]} />
      </mesh>

      {/* Pauldrons (Shoulders) - Scale up for Baron & Vanguard */}
      <mesh
        position={[-0.32, 1.25, 0]}
        material={accentMat}
        scale={archetype === "vanguard" || archetype === "baron" ? 1.4 : 1.0}
      >
        <dodecahedronGeometry args={[0.12, 0]} />
      </mesh>
      <mesh
        position={[0.32, 1.25, 0]}
        material={accentMat}
        scale={archetype === "vanguard" || archetype === "baron" ? 1.4 : 1.0}
      >
        <dodecahedronGeometry args={[0.12, 0]} />
      </mesh>

      {/* Arms */}
      <mesh position={[-0.3, 0.88, 0]} material={armorMat}>
        <cylinderGeometry args={[0.06, 0.05, 0.52, 5]} />
      </mesh>
      <mesh position={[0.3, 0.88, 0]} material={armorMat}>
        <cylinderGeometry args={[0.06, 0.05, 0.52, 5]} />
      </mesh>

      {/* Head / Helmet */}
      <mesh ref={headRef} position={[0, 1.46, 0]} material={armorMat}>
        <cylinderGeometry args={[0.16, 0.14, 0.32, 6]} />
      </mesh>
      {/* Glowing Visor */}
      <mesh position={[0, 1.48, 0.12]} material={visorMat}>
        <boxGeometry args={[0.2, 0.06, 0.08]} />
      </mesh>

      {/* Archetype Props */}
      {archetype === "scout" && (
        <group ref={staffRef} position={[0.38, 0.9, 0.1]}>
          <mesh material={armorMat}>
            <cylinderGeometry args={[0.02, 0.02, 1.4, 4]} />
          </mesh>
          <mesh position={[0, 0.72, 0]} material={visorMat}>
            <octahedronGeometry args={[0.08, 0]} />
          </mesh>
        </group>
      )}

      {archetype === "vanguard" && (
        <mesh position={[0, 1.7, -0.05]} material={visorMat}>
          <coneGeometry args={[0.08, 0.22, 4]} />
        </mesh>
      )}

      {archetype === "leviathan" && (
        <group position={[0, 1.1, -0.15]}>
          <mesh material={visorMat}>
            <boxGeometry args={[0.65, 0.8, 0.08]} />
          </mesh>
        </group>
      )}

      {/* Ambient Pedestal Light */}
      <pointLight color={meta.tierColor} intensity={1.8} distance={3} position={[0, 1.2, 0.8]} />
    </group>
  );
};
