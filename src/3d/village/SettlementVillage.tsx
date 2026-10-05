"use client";

import React, { useMemo } from "react";
import * as THREE from "three";
import { useVillageMaterials } from "./materials";
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

function IslandBase({
  grass,
  grassDark,
  cliff,
  cliffBase,
  packedEarth,
  stoneWarm,
}: {
  grass: THREE.Material;
  grassDark: THREE.Material;
  cliff: THREE.Material;
  cliffBase: THREE.Material;
  packedEarth: THREE.Material;
  stoneWarm: THREE.Material;
}) {
  const cliffGeom = useMemo(() => {
    const geom = new THREE.CylinderGeometry(3.35, 2.35, 0.9, 12, 3);
    const pos = geom.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const y = pos.getY(i);
      const x = pos.getX(i);
      const z = pos.getZ(i);
      const hash = Math.sin(x * 4.1 + z * 7.3) * 43758.5453;
      const jitter = (hash - Math.floor(hash) - 0.5) * 0.12;
      if (y < 0.2) {
        pos.setXYZ(i, x + jitter, y - Math.abs(jitter) * 0.4, z + jitter * 0.8);
      }
    }
    geom.computeVertexNormals();
    return geom;
  }, []);

  return (
    <group>
      <mesh geometry={cliffGeom} material={cliff} position={[0, -0.55, 0]} castShadow receiveShadow />
      <mesh position={[0, -1.05, 0]} material={cliffBase} receiveShadow>
        <cylinderGeometry args={[2.1, 1.55, 0.28, 10]} />
      </mesh>
      <mesh position={[0, -0.05, 0]} rotation={[-Math.PI / 2, 0, 0]} material={grass} receiveShadow>
        <circleGeometry args={[3.28, 28]} />
      </mesh>
      <mesh position={[0, -0.02, 0]} rotation={[-Math.PI / 2, 0, 0]} material={grassDark} receiveShadow>
        <ringGeometry args={[2.55, 3.15, 24]} />
      </mesh>
      <mesh position={[0, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]} material={packedEarth} receiveShadow>
        <circleGeometry args={[1.72, 24]} />
      </mesh>
      <mesh position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]} material={stoneWarm} receiveShadow>
        <ringGeometry args={[0.42, 0.7, 16]} />
      </mesh>
    </group>
  );
}

export const SettlementVillage: React.FC = () => {
  const m = useVillageMaterials();

  const plazaPath = useMemo(
    () =>
      new THREE.CatmullRomCurve3(
        [
          new THREE.Vector3(1.35, 0, 0.15),
          new THREE.Vector3(0.85, 0, 1.15),
          new THREE.Vector3(-0.35, 0, 1.38),
          new THREE.Vector3(-1.32, 0, 0.35),
          new THREE.Vector3(-1.05, 0, -1.05),
          new THREE.Vector3(0.45, 0, -1.32),
          new THREE.Vector3(1.42, 0, -0.55),
        ],
        true,
        "catmullrom",
        0.35
      ),
    []
  );

  const vaultPath = useMemo(
    () =>
      new THREE.CatmullRomCurve3(
        [
          new THREE.Vector3(1.55, 0, 1.45),
          new THREE.Vector3(2.15, 0, 1.05),
          new THREE.Vector3(2.25, 0, 0.35),
          new THREE.Vector3(1.7, 0, 0.15),
          new THREE.Vector3(1.35, 0, 0.75),
        ],
        true,
        "catmullrom",
        0.4
      ),
    []
  );

  return (
    <group position={[0, 0.15, 0]}>
      <IslandBase
        grass={m.grass}
        grassDark={m.grassDark}
        cliff={m.cliff}
        cliffBase={m.cliffBase}
        packedEarth={m.packedEarth}
        stoneWarm={m.stoneWarm}
      />

      <Well materials={m} position={[0, 0, 0]} />
      <Vault materials={m} position={[1.85, 0, 0.75]} />

      <Cottage materials={m} position={[-1.85, 0, 0.55]} rotationY={0.45} plaster />
      <Cottage materials={m} position={[-1.55, 0, -1.35]} rotationY={-0.35} wide />
      <Cottage materials={m} position={[0.15, 0, -1.95]} rotationY={0.12} plaster scale={0.9} />
      <Cottage materials={m} position={[1.65, 0, -1.45]} rotationY={-0.7} />

      <MarketStall materials={m} position={[-0.55, 0, 1.15]} rotationY={0.4} cloth={m.clothGold} />
      <MarketStall materials={m} position={[0.55, 0, 1.35]} rotationY={-0.25} cloth={m.clothCoral} />
      <MarketStall materials={m} position={[-1.15, 0, 1.55]} rotationY={0.9} cloth={m.clothMint} />

      <Palisade materials={m} position={[-2.55, 0, -0.35]} rotationY={1.15} />
      <Palisade materials={m} position={[2.45, 0, -0.85]} rotationY={-0.7} />

      <Tree materials={m} position={[-2.45, 0, 1.55]} scale={1.05} />
      <Tree materials={m} position={[2.55, 0, 1.85]} scale={0.85} />
      <Tree materials={m} position={[-0.15, 0, 2.45]} scale={0.7} />
      <Tree materials={m} position={[2.35, 0, -2.15]} scale={0.95} />
      <Tree materials={m} position={[-2.65, 0, -2.05]} scale={0.8} />

      <CrateStack materials={m} position={[1.15, 0, 1.55]} />
      <CrateStack materials={m} position={[-0.15, 0, 1.75]} />
      <Barrel materials={m} position={[1.05, 0.11, 0.15]} />
      <Barrel materials={m} position={[1.22, 0.11, -0.05]} />
      <Barrel materials={m} position={[-1.95, 0.11, -0.25]} />
      <Campfire materials={m} position={[-2.05, 0, 1.35]} />

      {/* Walkers on the plaza */}
      <Villager
        materials={m}
        tunic="#c2410c"
        skin="#e8b894"
        action="walk"
        prop="crate"
        path={plazaPath}
        pathSpeed={0.055}
        pathOffset={0}
        phase={0.2}
      />
      <Villager
        materials={m}
        tunic="#0f766e"
        skin="#c48a6a"
        action="walk"
        prop="sack"
        path={plazaPath}
        pathSpeed={0.048}
        pathOffset={0.28}
        phase={1.1}
        scale={0.95}
      />
      <Villager
        materials={m}
        tunic="#b45309"
        skin="#f3d0b0"
        action="walk"
        path={plazaPath}
        pathSpeed={0.06}
        pathOffset={0.52}
        phase={2.4}
      />
      <Villager
        materials={m}
        tunic="#7c2d12"
        skin="#8d5a3c"
        action="walk"
        path={plazaPath}
        pathSpeed={0.042}
        pathOffset={0.78}
        phase={0.7}
        scale={1.05}
      />

      {/* Stall keepers */}
      <Villager
        materials={m}
        tunic="#ca8a04"
        action="idle"
        position={[-0.55, 0, 0.92]}
        rotationY={0.4}
        phase={0.4}
      />
      <Villager
        materials={m}
        tunic="#e11d48"
        skin="#c48a6a"
        action="idle"
        position={[0.55, 0, 1.12]}
        rotationY={3.4}
        phase={1.6}
      />
      <Villager
        materials={m}
        tunic="#047857"
        action="idle"
        position={[-1.15, 0, 1.32]}
        rotationY={2.4}
        phase={2.2}
        scale={0.92}
      />

      {/* Masons at the cottage foundations */}
      <Villager
        materials={m}
        tunic="#57534e"
        skin="#c48a6a"
        action="work"
        prop="hammer"
        position={[-1.15, 0, -1.55]}
        rotationY={0.8}
        phase={0.3}
      />
      <Villager
        materials={m}
        tunic="#44403c"
        action="work"
        prop="hammer"
        position={[1.15, 0, -1.65]}
        rotationY={-0.5}
        phase={1.9}
      />

      {/* Vault guard */}
      <Villager
        materials={m}
        tunic="#1e3a5f"
        skin="#e8b894"
        action="guard"
        prop="spear"
        path={vaultPath}
        pathSpeed={0.035}
        pathOffset={0.1}
        phase={0.5}
        scale={1.08}
      />
    </group>
  );
};
