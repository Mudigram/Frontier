"use client";

import React, { useMemo } from "react";
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
  createBeaconGeometry,
  createGateGeometry,
  createBastionGeometry,
  createSpireGeometry,
} from "../geometry";
import type { TerritoryWithState } from "@/world/chapters";

interface TerritoryDioramaProps {
  territory: TerritoryWithState;
  isSelected?: boolean;
}

const BIOME_BY_CHAPTER: Record<number, BiomeName> = {
  0: "outpost",
  1: "frontier",
  2: "settlement",
  3: "citadel",
  4: "kingdom",
};

/**
 * Procedural low-poly tiered island base with faceted cliffs and grassy cap.
 */
function MiniIslandBase({
  materials,
  radius = 1.9,
  locked = false,
}: {
  materials: ReturnType<typeof useVillageMaterials>;
  radius?: number;
  locked?: boolean;
}) {
  const cliffGeom = useMemo(() => {
    const geom = new THREE.CylinderGeometry(radius, radius * 0.72, 0.75, 10, 2);
    const pos = geom.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const y = pos.getY(i);
      const x = pos.getX(i);
      const z = pos.getZ(i);
      const hash = Math.sin(x * 5.1 + z * 8.7) * 43758.5453;
      const jitter = (hash - Math.floor(hash) - 0.5) * 0.14;
      if (y < 0.1) {
        pos.setXYZ(i, x + jitter, y - Math.abs(jitter) * 0.3, z + jitter * 0.7);
      }
    }
    geom.computeVertexNormals();
    return geom;
  }, [radius]);

  return (
    <group>
      {/* Faceted cliff base */}
      <mesh
        geometry={cliffGeom}
        material={materials.cliff}
        position={[0, -0.42, 0]}
        castShadow
        receiveShadow
      />
      {/* Lower bedrock tier */}
      <mesh position={[0, -0.85, 0]} material={materials.cliffBase} receiveShadow>
        <cylinderGeometry args={[radius * 0.65, radius * 0.45, 0.22, 8]} />
      </mesh>
      {/* Top grass surface */}
      <mesh
        position={[0, -0.04, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        material={materials.grass}
        receiveShadow
      >
        <circleGeometry args={[radius * 0.98, 20]} />
      </mesh>
      {/* Dark rim */}
      <mesh
        position={[0, -0.02, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        material={materials.grassDark}
        receiveShadow
      >
        <ringGeometry args={[radius * 0.75, radius * 0.96, 18]} />
      </mesh>
      {/* Central path / earth */}
      {!locked && (
        <mesh
          position={[0, 0.01, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
          material={materials.packedEarth}
          receiveShadow
        >
          <circleGeometry args={[radius * 0.5, 16]} />
        </mesh>
      )}
    </group>
  );
}

/**
 * Low-poly clouds concealing locked unexplored territories.
 */
function LockedCloudCover({ materials }: { materials: ReturnType<typeof useVillageMaterials> }) {
  return (
    <group position={[0, 0.6, 0]}>
      <mesh position={[0, 0.2, 0]}>
        <dodecahedronGeometry args={[0.75, 1]} />
        <meshStandardMaterial
          color="#94a3b8"
          roughness={0.9}
          transparent
          opacity={0.65}
          flatShading
        />
      </mesh>
      <mesh position={[-0.45, 0.1, 0.35]}>
        <dodecahedronGeometry args={[0.55, 1]} />
        <meshStandardMaterial
          color="#cbd5e1"
          roughness={0.9}
          transparent
          opacity={0.6}
          flatShading
        />
      </mesh>
      <mesh position={[0.5, 0.15, -0.3]}>
        <dodecahedronGeometry args={[0.58, 1]} />
        <meshStandardMaterial
          color="#cbd5e1"
          roughness={0.9}
          transparent
          opacity={0.6}
          flatShading
        />
      </mesh>
      {/* Floating locked lock / monolith beacon */}
      <mesh position={[0, 0.85, 0]}>
        <octahedronGeometry args={[0.22, 0]} />
        <meshStandardMaterial
          color="#f43f5e"
          emissive="#e11d48"
          emissiveIntensity={0.8}
          roughness={0.3}
        />
      </mesh>
    </group>
  );
}

export const TerritoryDiorama: React.FC<TerritoryDioramaProps> = ({
  territory,
  isSelected = false,
}) => {
  const biome = BIOME_BY_CHAPTER[territory.id] ?? "settlement";
  const isUnlocked = territory.unlocked;
  const isCurrent = territory.current;
  const m = useVillageMaterials(biome, !isUnlocked);

  // Chapter 0: Outpost diorama
  const renderOutpost = () => (
    <group>
      {/* Central Watchtower Beacon */}
      <group position={[0, 0, -0.2]}>
        <mesh geometry={createBeaconGeometry()} material={m.woodDark} position={[0, 0.7, 0]} castShadow />
        <mesh position={[0, 1.45, 0]} material={m.fire}>
          <coneGeometry args={[0.16, 0.3, 5]} />
        </mesh>
        <pointLight color="#f97316" intensity={2.0} distance={5} position={[0, 1.5, 0]} />
      </group>

      {/* Signal Campfire & Palisade Perimeter */}
      <Campfire materials={m} position={[-0.7, 0, 0.5]} />
      <Palisade materials={m} position={[0.7, 0, 0.3]} rotationY={-0.6} />
      <CrateStack materials={m} position={[-0.45, 0, -0.75]} />
      <Barrel materials={m} position={[0.45, 0.11, -0.65]} />
      <Tree materials={m} position={[-1.1, 0, -0.3]} scale={0.7} />

      {/* Human Scout on Guard */}
      <Villager
        materials={m}
        tunic="#334155"
        skin="#e8b894"
        action="guard"
        prop="spear"
        position={[0.35, 0, 0.65]}
        rotationY={-0.4}
        scale={0.85}
      />
    </group>
  );

  // Chapter 1: Frontier diorama
  const renderFrontier = () => (
    <group>
      {/* Frontier Gate Monolith Arch */}
      <group position={[0, 0, -0.3]}>
        <mesh geometry={createGateGeometry()} material={m.wood} position={[0, 0.9, 0]} castShadow />
      </group>

      {/* Trading Post Market Stall */}
      <MarketStall materials={m} position={[-0.75, 0, 0.4]} rotationY={0.35} cloth={m.clothGold} />
      <CrateStack materials={m} position={[0.75, 0, 0.3]} />
      <Barrel materials={m} position={[0.9, 0.11, -0.1]} />
      <Barrel materials={m} position={[-0.9, 0.11, -0.5]} />
      <Tree materials={m} position={[-1.1, 0, 0.9]} scale={0.75} />
      <Tree materials={m} position={[1.0, 0, -0.8]} scale={0.8} />

      {/* Pioneer Villagers: Merchant & Traveler with Sack */}
      <Villager
        materials={m}
        tunic="#ca8a04"
        skin="#c48a6a"
        action="idle"
        position={[-0.75, 0, 0.15]}
        rotationY={0.35}
        scale={0.82}
      />
      <Villager
        materials={m}
        tunic="#b45309"
        skin="#e8b894"
        action="walk"
        prop="sack"
        position={[0.25, 0, 0.65]}
        rotationY={-1.2}
        scale={0.82}
      />
    </group>
  );

  // Chapter 2: Settlement diorama (Town Bazaar & Vault)
  const renderSettlement = () => (
    <group>
      {/* Village Well at center */}
      <Well materials={m} position={[0, 0, 0]} />
      {/* Settlement Cottage */}
      <Cottage materials={m} position={[-0.85, 0, -0.65]} rotationY={0.4} plaster scale={0.75} />
      {/* Town Vault */}
      <Vault materials={m} position={[0.85, 0, -0.55]} />
      {/* Market Stall */}
      <MarketStall materials={m} position={[-0.55, 0, 0.65]} rotationY={0.3} cloth={m.clothCoral} />
      <Tree materials={m} position={[1.1, 0, 0.7]} scale={0.75} />
      <Tree materials={m} position={[-1.2, 0, 0.2]} scale={0.7} />
      <CrateStack materials={m} position={[0.45, 0, 0.75]} />

      {/* Settlement Villagers: Townsfolk, Worker & Vault Guard */}
      <Villager
        materials={m}
        tunic="#047857"
        skin="#f3d0b0"
        action="idle"
        position={[-0.55, 0, 0.42]}
        rotationY={0.3}
        scale={0.82}
      />
      <Villager
        materials={m}
        tunic="#c2410c"
        skin="#e8b894"
        action="walk"
        prop="crate"
        position={[0.15, 0, 0.8]}
        rotationY={-0.8}
        scale={0.82}
      />
      <Villager
        materials={m}
        tunic="#1e3a5f"
        skin="#c48a6a"
        action="guard"
        prop="spear"
        position={[0.85, 0, 0.15]}
        rotationY={0.1}
        scale={0.85}
      />
    </group>
  );

  // Chapter 3: Citadel diorama (The Stronghold)
  const renderCitadel = () => (
    <group>
      {/* Bastion Fortress */}
      <group position={[0, 0, -0.3]}>
        <mesh geometry={createBastionGeometry()} material={m.stone} position={[0, 0.8, 0]} castShadow />
      </group>

      {/* Fortified walls & Gate */}
      <Palisade materials={m} position={[-0.85, 0, 0.2]} rotationY={0.4} />
      <Palisade materials={m} position={[0.85, 0, 0.2]} rotationY={-0.4} />
      <CrateStack materials={m} position={[-0.6, 0, 0.8]} />
      <Barrel materials={m} position={[0.6, 0.11, 0.8]} />

      {/* Royal Citadel Sentries */}
      <Villager
        materials={m}
        tunic="#5b21b6"
        skin="#e8b894"
        action="guard"
        prop="spear"
        position={[-0.3, 0, 0.75]}
        rotationY={0.15}
        scale={0.85}
      />
      <Villager
        materials={m}
        tunic="#4c1d95"
        skin="#c48a6a"
        action="guard"
        prop="spear"
        position={[0.3, 0, 0.75]}
        rotationY={-0.15}
        scale={0.85}
      />
    </group>
  );

  // Chapter 4: Kingdom diorama (The Sovereign Realm)
  const renderKingdom = () => (
    <group>
      {/* Grand Sovereign Spire Monument */}
      <group position={[0, 0, -0.2]}>
        <mesh geometry={createSpireGeometry()} material={m.gold} position={[0, 1.2, 0]} castShadow />
      </group>

      {/* Treasury Vault */}
      <Vault materials={m} position={[-0.85, 0, 0.4]} />
      <Cottage materials={m} position={[0.85, 0, 0.3]} rotationY={-0.5} wide scale={0.7} />
      <Tree materials={m} position={[-1.1, 0, -0.7]} scale={0.85} />
      <Tree materials={m} position={[1.1, 0, -0.7]} scale={0.85} />

      {/* Royal Sovereign Guard & Envoy */}
      <Villager
        materials={m}
        tunic="#be123c"
        skin="#e8b894"
        action="guard"
        prop="spear"
        position={[0.35, 0, 0.8]}
        rotationY={-0.2}
        scale={0.88}
      />
      <Villager
        materials={m}
        tunic="#ca8a04"
        skin="#f3d0b0"
        action="idle"
        position={[-0.35, 0, 0.8]}
        rotationY={0.2}
        scale={0.85}
      />
    </group>
  );

  const renderContent = () => {
    if (!isUnlocked) {
      return <LockedCloudCover materials={m} />;
    }
    switch (territory.id) {
      case 0:
        return renderOutpost();
      case 1:
        return renderFrontier();
      case 2:
        return renderSettlement();
      case 3:
        return renderCitadel();
      case 4:
        return renderKingdom();
      default:
        return renderSettlement();
    }
  };

  const islandRadius = territory.id === 0 ? 1.75 : territory.id === 4 ? 2.3 : 1.95;

  return (
    <group>
      <MiniIslandBase materials={m} radius={islandRadius} locked={!isUnlocked} />
      {renderContent()}
    </group>
  );
};
