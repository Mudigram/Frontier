"use client";

import React, { useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, ContactShadows } from "@react-three/drei";
import * as THREE from "three";
import { useVillageMaterials, type BiomeName } from "./materials";
import { Villager } from "./Villager";
import {
  Barrel,
  Campfire,
  Cottage,
  CrateStack,
  MarketStall,
  Palisade,
  Tree,
  Vault,
  Well,
} from "./props";
import {
  createGateGeometry,
  createBastionGeometry,
  createSpireGeometry,
} from "../geometry";

interface HistoryEpochDioramaProps {
  selectedChapter: number;
  currentChapter: number;
}

const BIOME_BY_CHAPTER: Record<number, BiomeName> = {
  0: "outpost",
  1: "frontier",
  2: "settlement",
  3: "citadel",
  4: "kingdom",
};

/**
 * Epoch Island Base with smooth low-poly rock and lush vegetation
 */
function EpochIslandBase({
  materials,
  biome,
}: {
  materials: ReturnType<typeof useVillageMaterials>;
  biome: BiomeName;
}) {
  const cliffGeom = useMemo(() => {
    const geom = new THREE.CylinderGeometry(2.6, 1.8, 0.75, 12, 2);
    const pos = geom.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const y = pos.getY(i);
      const x = pos.getX(i);
      const z = pos.getZ(i);
      const hash = Math.sin(x * 6.3 + z * 9.1) * 43758.5453;
      const jitter = (hash - Math.floor(hash) - 0.5) * 0.12;
      if (y < 0.1) {
        pos.setXYZ(i, x + jitter, y - Math.abs(jitter) * 0.3, z + jitter * 0.7);
      }
    }
    geom.computeVertexNormals();
    return geom;
  }, []);

  return (
    <group>
      <mesh
        geometry={cliffGeom}
        material={materials.cliff}
        position={[0, -0.42, 0]}
        castShadow
        receiveShadow
      />
      <mesh position={[0, -0.85, 0]} material={materials.cliffBase} receiveShadow>
        <cylinderGeometry args={[1.7, 1.2, 0.22, 10]} />
      </mesh>
      {/* Top grass surface */}
      <mesh
        position={[0, -0.04, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        material={materials.grass}
        receiveShadow
      >
        <circleGeometry args={[2.55, 24]} />
      </mesh>
      {/* Dark rim */}
      <mesh
        position={[0, -0.02, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        material={materials.grassDark}
        receiveShadow
      >
        <ringGeometry args={[2.1, 2.52, 20]} />
      </mesh>
      {/* Packed earth path */}
      <mesh
        position={[0, 0.005, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        material={materials.packedEarth}
        receiveShadow
      >
        <circleGeometry args={[1.35, 18]} />
      </mesh>
    </group>
  );
}

// -------------------------------------------------------------
// Era Scenes
// -------------------------------------------------------------

function EraOutpost({ m }: { m: ReturnType<typeof useVillageMaterials> }) {
  return (
    <group>
      {/* Lone Campfire with smoke */}
      <Campfire materials={m} position={[0, 0, 0]} />
      <CrateStack materials={m} position={[-0.9, 0, 0.4]} />
      <Barrel materials={m} position={[-0.7, 0.11, 0.9]} />
      <Palisade materials={m} position={[0.9, 0, -0.6]} rotationY={-0.6} />
      <Palisade materials={m} position={[1.4, 0, -0.2]} rotationY={-0.3} />
      <Tree materials={m} position={[-1.3, 0, -0.9]} scale={0.8} />

      {/* Scout Villager by fire */}
      <Villager
        materials={m}
        tunic="#334155"
        skin="#e8b894"
        action="guard"
        prop="spear"
        position={[0.55, 0, 0.5]}
        rotationY={-0.6}
        scale={0.95}
      />
    </group>
  );
}

function EraFrontier({ m }: { m: ReturnType<typeof useVillageMaterials> }) {
  return (
    <group>
      {/* Frontier Gate */}
      <group position={[0, 0, -0.3]}>
        <mesh geometry={createGateGeometry()} material={m.wood} position={[0, 0.9, 0]} castShadow />
      </group>
      <MarketStall materials={m} position={[-0.95, 0, 0.5]} rotationY={0.3} cloth={m.clothGold} />
      <CrateStack materials={m} position={[0.95, 0, 0.4]} />
      <Barrel materials={m} position={[1.2, 0.11, 0]} />
      <Tree materials={m} position={[-1.3, 0, -0.8]} scale={0.85} />
      <Tree materials={m} position={[1.3, 0, -0.8]} scale={0.85} />

      {/* Pioneer Villagers */}
      <Villager
        materials={m}
        tunic="#ca8a04"
        skin="#c48a6a"
        action="idle"
        position={[-0.95, 0, 0.25]}
        rotationY={0.3}
        scale={0.9}
      />
      <Villager
        materials={m}
        tunic="#b45309"
        skin="#e8b894"
        action="walk"
        prop="sack"
        position={[0.25, 0, 0.7]}
        rotationY={-1.2}
        scale={0.9}
      />
    </group>
  );
}

function EraSettlement({ m }: { m: ReturnType<typeof useVillageMaterials> }) {
  return (
    <group>
      <Well materials={m} position={[0, 0, 0]} />
      <Cottage materials={m} position={[-1.1, 0, -0.7]} rotationY={0.4} plaster scale={0.82} />
      <Vault materials={m} position={[1.1, 0, -0.6]} />
      <MarketStall materials={m} position={[-0.75, 0, 0.8]} rotationY={0.25} cloth={m.clothCoral} />
      <CrateStack materials={m} position={[0.65, 0, 0.9]} />
      <Tree materials={m} position={[1.4, 0, 0.6]} scale={0.8} />

      {/* 3 Citizens */}
      <Villager
        materials={m}
        tunic="#047857"
        skin="#f3d0b0"
        action="idle"
        position={[-0.75, 0, 0.5]}
        rotationY={0.25}
        scale={0.9}
      />
      <Villager
        materials={m}
        tunic="#c2410c"
        skin="#e8b894"
        action="walk"
        prop="crate"
        position={[0.15, 0, 0.9]}
        rotationY={-0.8}
        scale={0.9}
      />
      <Villager
        materials={m}
        tunic="#1e3a5f"
        skin="#c48a6a"
        action="guard"
        prop="spear"
        position={[1.1, 0, 0.1]}
        rotationY={0.1}
        scale={0.92}
      />
    </group>
  );
}

function EraCitadel({ m }: { m: ReturnType<typeof useVillageMaterials> }) {
  return (
    <group>
      {/* Bastion Keep */}
      <group position={[0, 0, -0.3]}>
        <mesh geometry={createBastionGeometry()} material={m.stone} position={[0, 0.8, 0]} castShadow />
      </group>
      <Palisade materials={m} position={[-1.15, 0, 0.3]} rotationY={0.4} />
      <Palisade materials={m} position={[1.15, 0, 0.3]} rotationY={-0.4} />
      <CrateStack materials={m} position={[-0.8, 0, 0.9]} />
      <Barrel materials={m} position={[0.8, 0.11, 0.9]} />
      <Tree materials={m} position={[-1.5, 0, -0.6]} scale={0.85} />
      <Tree materials={m} position={[1.5, 0, -0.6]} scale={0.85} />

      {/* Royal Citadel Sentries */}
      <Villager
        materials={m}
        tunic="#5b21b6"
        skin="#e8b894"
        action="guard"
        prop="spear"
        position={[-0.4, 0, 0.85]}
        rotationY={0.15}
        scale={0.92}
      />
      <Villager
        materials={m}
        tunic="#4c1d95"
        skin="#c48a6a"
        action="guard"
        prop="spear"
        position={[0.4, 0, 0.85]}
        rotationY={-0.15}
        scale={0.92}
      />
    </group>
  );
}

function EraKingdom({ m }: { m: ReturnType<typeof useVillageMaterials> }) {
  return (
    <group>
      {/* Grand Sovereign Spire */}
      <group position={[0, 0, -0.2]}>
        <mesh geometry={createSpireGeometry()} material={m.gold} position={[0, 1.25, 0]} castShadow />
      </group>
      <Vault materials={m} position={[-1.1, 0, 0.4]} />
      <Cottage materials={m} position={[1.1, 0, 0.3]} rotationY={-0.5} wide scale={0.78} />
      <Tree materials={m} position={[-1.4, 0, -0.8]} scale={0.9} />
      <Tree materials={m} position={[1.4, 0, -0.8]} scale={0.9} />

      {/* Sovereign Guards */}
      <Villager
        materials={m}
        tunic="#be123c"
        skin="#e8b894"
        action="guard"
        prop="spear"
        position={[0.4, 0, 0.9]}
        rotationY={-0.2}
        scale={0.94}
      />
      <Villager
        materials={m}
        tunic="#ca8a04"
        skin="#f3d0b0"
        action="idle"
        position={[-0.4, 0, 0.9]}
        rotationY={0.2}
        scale={0.92}
      />
    </group>
  );
}

function EpochSceneContent({
  chapter,
  isUnlocked,
}: {
  chapter: number;
  isUnlocked: boolean;
}) {
  const biome = BIOME_BY_CHAPTER[chapter] ?? "settlement";
  const m = useVillageMaterials(biome, !isUnlocked);

  return (
    <group>
      <EpochIslandBase materials={m} biome={biome} />
      {chapter === 0 && <EraOutpost m={m} />}
      {chapter === 1 && <EraFrontier m={m} />}
      {chapter === 2 && <EraSettlement m={m} />}
      {chapter === 3 && <EraCitadel m={m} />}
      {chapter === 4 && <EraKingdom m={m} />}
    </group>
  );
}

export const HistoryEpochDiorama: React.FC<HistoryEpochDioramaProps> = ({
  selectedChapter,
  currentChapter,
}) => {
  const isUnlocked = selectedChapter <= currentChapter;

  return (
    <div className="w-full h-full min-h-[360px] sm:min-h-[420px] relative">
      <Canvas
        camera={{ position: [3.8, 3.2, 5.2], fov: 38 }}
        gl={{ antialias: true, alpha: true }}
        shadows
      >
        <fog attach="fog" args={["#fef3c7", 12, 24]} />

        {/* Daylight neo-pop lighting */}
        <hemisphereLight args={["#fff7ed", "#65a30d", 0.95]} />
        <ambientLight intensity={0.55} color="#fffbeb" />
        <directionalLight
          position={[6, 12, 6]}
          intensity={2.2}
          color="#fff7ed"
          castShadow
          shadow-mapSize={[1024, 1024]}
        />
        <directionalLight position={[-4, 3, -2]} intensity={0.45} color="#fb923c" />

        <EpochSceneContent chapter={selectedChapter} isUnlocked={isUnlocked} />

        <ContactShadows
          position={[0, -0.92, 0]}
          opacity={0.35}
          scale={8}
          blur={2.2}
          far={2.5}
          color="#431407"
        />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.65}
          maxPolarAngle={Math.PI / 2.15}
          minPolarAngle={Math.PI / 4.2}
          target={[0, 0.4, 0]}
        />
      </Canvas>

      {/* Floating Era Tag Badge */}
      <div className="absolute top-3 left-3 pointer-events-none">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono font-black uppercase tracking-wider bg-frontier-yellow text-frontier-ink border-2 border-frontier-ink shadow-pop-sm">
          {selectedChapter === 0
            ? "ERA 0 • GENESIS OUTPOST"
            : selectedChapter === 1
            ? "ERA I • PIONEER FRONTIER"
            : selectedChapter === 2
            ? "ERA II • SETTLEMENT (ACTIVE)"
            : selectedChapter === 3
            ? "ERA III • CITADEL STRONGHOLD"
            : "ERA IV • SOVEREIGN REALM"}
        </span>
      </div>

      <div className="absolute bottom-3 right-3 pointer-events-none text-[10px] font-mono font-bold text-slate-500 bg-white/90 px-2 py-0.5 rounded border border-frontier-ink shadow-sm">
        Drag to rotate epoch diorama
      </div>
    </div>
  );
};
