"use client";

import React, { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { TerritoryDiorama } from "./village/TerritoryDiorama";
import type { TerritoryWithState } from "@/world/chapters";

interface LowPolyTerrainProps {
  territory: TerritoryWithState;
  isSelected: boolean;
  onSelect: (territory: TerritoryWithState) => void;
}

export const LowPolyTerrain: React.FC<LowPolyTerrainProps> = ({
  territory,
  isSelected,
  onSelect,
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState<boolean>(false);

  const { lightColor, islandPosition } = territory.theme;
  const isUnlocked = territory.unlocked;
  const isCurrent = territory.current;

  // Gentle float for current or hovered island
  useFrame((state) => {
    if (groupRef.current) {
      const baseY = islandPosition[1];
      const floatOffset = isCurrent
        ? Math.sin(state.clock.elapsedTime * 1.6 + territory.id) * 0.12
        : 0;
      groupRef.current.position.y = baseY + floatOffset;

      const targetScale = isSelected ? 1.06 : hovered ? 1.03 : 1.0;
      groupRef.current.scale.lerp(
        new THREE.Vector3(targetScale, targetScale, targetScale),
        0.1
      );
    }
  });

  return (
    <group
      ref={groupRef}
      position={islandPosition}
      onClick={(e) => {
        e.stopPropagation();
        onSelect(territory);
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
        document.body.style.cursor = "pointer";
      }}
      onPointerOut={() => {
        setHovered(false);
        document.body.style.cursor = "auto";
      }}
    >
      {/* 3D Living Territory Diorama & Tiered Island Base */}
      <TerritoryDiorama territory={territory} isSelected={isSelected} />

      {/* Warm Point Light for active or unlocked territory */}
      {isUnlocked && (
        <pointLight
          color={lightColor}
          intensity={isCurrent ? 1.8 : 0.6}
          distance={5.5}
          position={[0, 1.6, 0]}
        />
      )}

      {/* Neo-pop Halo Boundary Ring for Current or Selected Chapter */}
      {(isCurrent || isSelected) && (
        <mesh position={[0, 0.03, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry
            args={[
              territory.id === 0 ? 1.78 : territory.id === 4 ? 2.32 : 1.98,
              territory.id === 0 ? 1.94 : territory.id === 4 ? 2.48 : 2.14,
              28,
            ]}
          />
          <meshBasicMaterial
            color={isSelected ? "#f59e0b" : lightColor}
            side={THREE.DoubleSide}
            transparent
            opacity={isSelected ? 0.95 : 0.6}
          />
        </mesh>
      )}
    </group>
  );
};
