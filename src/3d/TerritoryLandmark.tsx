"use client";

import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import {
  createBeaconGeometry,
  createGateGeometry,
  createBazaarGeometry,
  createBastionGeometry,
  createSpireGeometry,
  createCrystalGeometry,
} from "./geometry";
import { createLowPolyMaterial, createGlowMaterial } from "./materials";
import type { TerritoryWithState } from "@/world/chapters";

interface TerritoryLandmarkProps {
  territory: TerritoryWithState;
  isSelected?: boolean;
}

export const TerritoryLandmark: React.FC<TerritoryLandmarkProps> = ({
  territory,
  isSelected = false,
}) => {
  const crystalRef = useRef<THREE.Mesh>(null);
  const baseRef = useRef<THREE.Group>(null);

  // Subtle floating and rotation animation
  useFrame((state, delta) => {
    if (crystalRef.current) {
      crystalRef.current.rotation.y += delta * 1.2;
      crystalRef.current.position.y =
        1.6 + Math.sin(state.clock.elapsedTime * 2 + territory.id) * 0.12;
    }
    if (isSelected && baseRef.current) {
      baseRef.current.rotation.y += delta * 0.4;
    }
  });

  const { accentColor, lightColor } = territory.theme;
  const isUnlocked = territory.unlocked;
  const isCurrent = territory.current;

  const landmarkMaterial = React.useMemo(() => {
    return isUnlocked
      ? createLowPolyMaterial(accentColor, {
          roughness: 0.4,
          metalness: 0.3,
          emissive: isCurrent ? accentColor : 0x000000,
          emissiveIntensity: isCurrent ? 0.35 : 0,
        })
      : createLowPolyMaterial("#334155", { roughness: 0.8, opacity: 0.6, transparent: true });
  }, [accentColor, isUnlocked, isCurrent]);

  const crystalMaterial = React.useMemo(() => {
    return isCurrent
      ? createGlowMaterial(lightColor, 1.8)
      : isUnlocked
      ? createLowPolyMaterial(accentColor, { emissive: accentColor, emissiveIntensity: 0.5 })
      : createLowPolyMaterial("#1e293b", { roughness: 0.9, opacity: 0.5, transparent: true });
  }, [accentColor, lightColor, isCurrent, isUnlocked]);

  const renderStructure = () => {
    switch (territory.id) {
      case 0: // Outpost: Watchtower + Signal Beacon
        return (
          <group>
            <mesh
              geometry={createBeaconGeometry()}
              material={landmarkMaterial}
              position={[0, 0.7, 0]}
              castShadow
            />
            {isUnlocked && (
              <mesh
                ref={crystalRef}
                geometry={createCrystalGeometry(0.3)}
                material={crystalMaterial}
                position={[0, 1.6, 0]}
              />
            )}
          </group>
        );

      case 1: // Frontier: Border Palisade Gate
        return (
          <group>
            <mesh
              geometry={createGateGeometry()}
              material={landmarkMaterial}
              position={[0, 0.9, 0]}
              castShadow
            />
            {isUnlocked && (
              <mesh
                ref={crystalRef}
                geometry={createCrystalGeometry(0.35)}
                material={crystalMaterial}
                position={[0, 2.1, 0]}
              />
            )}
          </group>
        );

      case 2: // Settlement: Bazaar & Guarded Vault
        return (
          <group>
            <mesh
              geometry={createBazaarGeometry()}
              material={landmarkMaterial}
              position={[0, 0.85, 0]}
              castShadow
            />
            {/* Satellite outpost huts */}
            <mesh
              position={[0.8, 0.35, 0.6]}
              material={landmarkMaterial}
              scale={0.4}
              castShadow
            >
              <boxGeometry args={[1, 1, 1]} />
            </mesh>
            <mesh
              position={[-0.7, 0.3, -0.6]}
              material={landmarkMaterial}
              scale={0.35}
              castShadow
            >
              <boxGeometry args={[1, 1, 1]} />
            </mesh>
            {isUnlocked && (
              <mesh
                ref={crystalRef}
                geometry={createCrystalGeometry(0.38)}
                material={crystalMaterial}
                position={[0, 1.9, 0]}
              />
            )}
          </group>
        );

      case 3: // Citadel: Fortified High Keep
        return (
          <group>
            <mesh
              geometry={createBastionGeometry()}
              material={landmarkMaterial}
              position={[0, 0.8, 0]}
              castShadow
            />
            {/* Outer bastion turrets */}
            <mesh position={[0.7, 0.6, 0.7]} material={landmarkMaterial} scale={0.5}>
              <cylinderGeometry args={[0.3, 0.4, 1.2, 5]} />
            </mesh>
            <mesh position={[-0.7, 0.6, -0.7]} material={landmarkMaterial} scale={0.5}>
              <cylinderGeometry args={[0.3, 0.4, 1.2, 5]} />
            </mesh>
            {isUnlocked && (
              <mesh
                ref={crystalRef}
                geometry={createCrystalGeometry(0.42)}
                material={crystalMaterial}
                position={[0, 2.2, 0]}
              />
            )}
          </group>
        );

      case 4: // Kingdom: The Grand Spire
      default:
        return (
          <group>
            <mesh
              geometry={createSpireGeometry()}
              material={landmarkMaterial}
              position={[0, 1.4, 0]}
              castShadow
            />
            {isUnlocked && (
              <mesh
                ref={crystalRef}
                geometry={createCrystalGeometry(0.5)}
                material={crystalMaterial}
                position={[0, 3.2, 0]}
              />
            )}
          </group>
        );
    }
  };

  return <group ref={baseRef}>{renderStructure()}</group>;
};
