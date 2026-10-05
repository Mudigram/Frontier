"use client";

import React, { useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { LowPolyTerrain } from "./LowPolyTerrain";
import type { TerritoryWithState } from "@/world/chapters";

interface WorldSceneProps {
  territories: TerritoryWithState[];
  selectedTerritory: TerritoryWithState;
  onSelectTerritory: (territory: TerritoryWithState) => void;
}

function ConnectingPaths({ territories }: { territories: TerritoryWithState[] }) {
  // Build tactile 3D arch tubes connecting sequential territories
  const pathTubes = useMemo(() => {
    return territories.slice(0, -1).map((from, idx) => {
      const to = territories[idx + 1];

      const fromPos = new THREE.Vector3(...from.theme.islandPosition);
      const toPos = new THREE.Vector3(...to.theme.islandPosition);

      // Interpolate curved arch
      const mid = fromPos.clone().lerp(toPos, 0.5);
      mid.y += 0.95; // gentle upward crest

      const curve = new THREE.QuadraticBezierCurve3(fromPos, mid, toPos);

      return {
        id: idx,
        curve,
        isUnlocked: to.unlocked,
        color: to.unlocked ? "#f59e0b" : "#cbd5e1",
      };
    });
  }, [territories]);

  return (
    <group>
      {pathTubes.map((p) => (
        <mesh key={p.id}>
          <tubeGeometry args={[p.curve, 24, 0.04, 6, false]} />
          <meshStandardMaterial
            color={p.color}
            roughness={0.4}
            metalness={p.isUnlocked ? 0.35 : 0.05}
            transparent
            opacity={p.isUnlocked ? 0.95 : 0.4}
          />
        </mesh>
      ))}
    </group>
  );
}

export const WorldScene: React.FC<WorldSceneProps> = ({
  territories,
  selectedTerritory,
  onSelectTerritory,
}) => {
  return (
    <div className="w-full h-[450px] sm:h-[550px] rounded-2xl bg-gradient-to-b from-[#fef3c7]/60 via-[#fed7aa]/20 to-[#fdfaf3] relative overflow-hidden">
      {/* 3D Canvas */}
      <Canvas
        camera={{ position: [0, 9, 13.5], fov: 42 }}
        gl={{ antialias: true, alpha: true }}
        shadows
      >
        <fog attach="fog" args={["#fef3c7", 16, 32]} />

        {/* Neo-pop Daytime Lighting */}
        <hemisphereLight args={["#fff7ed", "#65a30d", 0.9]} />
        <ambientLight intensity={0.6} color="#fffbeb" />
        <directionalLight
          position={[8, 16, 8]}
          intensity={2.2}
          color="#fff7ed"
          castShadow
          shadow-mapSize={[1024, 1024]}
          shadow-camera-far={32}
          shadow-camera-left={-12}
          shadow-camera-right={12}
          shadow-camera-top={12}
          shadow-camera-bottom={-12}
        />
        <directionalLight position={[-6, 4, -4]} intensity={0.45} color="#fb923c" />

        {/* Distant Golden Sun Disc */}
        <mesh position={[0, 4.5, -14]}>
          <circleGeometry args={[4.5, 32]} />
          <meshBasicMaterial color="#fde047" transparent opacity={0.6} />
        </mesh>

        {/* Orbit Controls with bounded angles */}
        <OrbitControls
          enableZoom={true}
          minDistance={6}
          maxDistance={22}
          maxPolarAngle={Math.PI / 2.15} // prevent camera going below horizon
          minPolarAngle={Math.PI / 8}
          autoRotate={false}
          dampingFactor={0.05}
          target={[0, 3.2, -0.5]}
        />

        {/* Territory Island Archipelago */}
        {territories.map((t) => (
          <LowPolyTerrain
            key={t.id}
            territory={t}
            isSelected={selectedTerritory.id === t.id}
            onSelect={onSelectTerritory}
          />
        ))}

        {/* Energy Pathways connecting islands */}
        <ConnectingPaths territories={territories} />
      </Canvas>

      {/* Floating 3D Navigation Hint */}
      <div className="absolute bottom-3 left-3 pointer-events-none text-[11px] font-mono font-bold text-frontier-ink bg-white/95 px-3 py-1.5 rounded-xl border-2 border-frontier-ink shadow-pop-sm backdrop-blur-sm flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-frontier-yellow animate-pulse border border-frontier-ink" />
        <span>Click island to inspect • Drag to rotate camera</span>
      </div>
    </div>
  );
};
