"use client";

import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import type { VillageMaterials } from "./materials";

export const Cottage: React.FC<{
  materials: VillageMaterials;
  position: [number, number, number];
  rotationY?: number;
  scale?: number;
  plaster?: boolean;
  wide?: boolean;
}> = ({ materials, position, rotationY = 0, scale = 1, plaster = false, wide = false }) => {
  const w = wide ? 1.15 : 0.85;
  const d = wide ? 0.85 : 0.72;
  return (
    <group position={position} rotation={[0, rotationY, 0]} scale={scale}>
      <mesh position={[0, 0.42, 0]} material={plaster ? materials.plaster : materials.wood} castShadow receiveShadow>
        <boxGeometry args={[w, 0.84, d]} />
      </mesh>
      <mesh position={[0, 0.96, 0]} rotation={[0, Math.PI / 4, 0]} material={materials.roof} castShadow>
        <coneGeometry args={[wide ? 0.92 : 0.72, 0.55, 4]} />
      </mesh>
      <mesh position={[w * 0.28, 1.05, -d * 0.12]} material={materials.stoneDark} castShadow>
        <boxGeometry args={[0.12, 0.28, 0.12]} />
      </mesh>
      <mesh position={[0, 0.28, d / 2 + 0.01]} material={materials.woodDark}>
        <boxGeometry args={[0.18, 0.36, 0.04]} />
      </mesh>
      <mesh position={[-w * 0.22, 0.52, d / 2 + 0.01]} material={materials.iron}>
        <boxGeometry args={[0.16, 0.14, 0.03]} />
      </mesh>
      <mesh position={[w * 0.22, 0.52, d / 2 + 0.01]} material={materials.iron}>
        <boxGeometry args={[0.16, 0.14, 0.03]} />
      </mesh>
    </group>
  );
};

export const MarketStall: React.FC<{
  materials: VillageMaterials;
  position: [number, number, number];
  rotationY?: number;
  cloth: THREE.Material;
}> = ({ materials, position, rotationY = 0, cloth }) => (
  <group position={position} rotation={[0, rotationY, 0]}>
    {([-0.28, 0.28] as const).map((x) =>
      ([-0.18, 0.18] as const).map((z) => (
        <mesh key={`${x}-${z}`} position={[x, 0.28, z]} material={materials.woodDark} castShadow>
          <cylinderGeometry args={[0.025, 0.03, 0.56, 6]} />
        </mesh>
      ))
    )}
    <mesh position={[0, 0.22, 0]} material={materials.wood} castShadow receiveShadow>
      <boxGeometry args={[0.7, 0.08, 0.48]} />
    </mesh>
    <mesh position={[0, 0.58, 0]} rotation={[0.18, 0, 0]} material={cloth} castShadow>
      <boxGeometry args={[0.78, 0.04, 0.55]} />
    </mesh>
    <mesh position={[-0.16, 0.3, 0.04]} material={materials.gold} castShadow>
      <sphereGeometry args={[0.055, 8, 6]} />
    </mesh>
    <mesh position={[0.02, 0.29, 0.06]} material={materials.clothCoral} castShadow>
      <boxGeometry args={[0.1, 0.07, 0.1]} />
    </mesh>
    <mesh position={[0.18, 0.29, -0.04]} material={materials.woodDark} castShadow>
      <cylinderGeometry args={[0.04, 0.045, 0.1, 8]} />
    </mesh>
  </group>
);

export const Vault: React.FC<{
  materials: VillageMaterials;
  position: [number, number, number];
}> = ({ materials, position }) => (
  <group position={position}>
    <mesh position={[0, 0.55, 0]} material={materials.stone} castShadow receiveShadow>
      <boxGeometry args={[1.15, 1.1, 0.95]} />
    </mesh>
    <mesh position={[0, 1.18, 0]} material={materials.stoneDark} castShadow>
      <boxGeometry args={[1.28, 0.18, 1.08]} />
    </mesh>
    <mesh position={[0, 1.42, 0]} rotation={[0, Math.PI / 4, 0]} material={materials.roofDark} castShadow>
      <coneGeometry args={[0.55, 0.55, 4]} />
    </mesh>
    <mesh position={[0, 0.42, 0.49]} material={materials.iron}>
      <boxGeometry args={[0.28, 0.52, 0.06]} />
    </mesh>
    <mesh position={[0.12, 0.42, 0.53]} material={materials.gold}>
      <sphereGeometry args={[0.035, 8, 6]} />
    </mesh>
    <mesh position={[-0.42, 0.95, 0.48]} material={materials.gold}>
      <boxGeometry args={[0.12, 0.12, 0.04]} />
    </mesh>
    {([-0.52, 0.52] as const).map((x) => (
      <mesh key={x} position={[x, 0.7, 0.2]} material={materials.stoneDark} castShadow>
        <cylinderGeometry args={[0.1, 0.12, 1.4, 8]} />
      </mesh>
    ))}
    <pointLight color="#facc15" intensity={1.6} distance={4} position={[0, 0.9, 0.6]} />
  </group>
);

export const Well: React.FC<{
  materials: VillageMaterials;
  position: [number, number, number];
}> = ({ materials, position }) => (
  <group position={position}>
    <mesh position={[0, 0.16, 0]} material={materials.stoneWarm} castShadow receiveShadow>
      <cylinderGeometry args={[0.28, 0.32, 0.32, 10]} />
    </mesh>
    <mesh position={[0, 0.22, 0]} material={materials.stoneDark}>
      <cylinderGeometry args={[0.18, 0.18, 0.08, 10]} />
    </mesh>
    {([-0.22, 0.22] as const).map((x) => (
      <mesh key={x} position={[x, 0.48, 0]} material={materials.woodDark}>
        <cylinderGeometry args={[0.025, 0.025, 0.48, 6]} />
      </mesh>
    ))}
    <mesh position={[0, 0.74, 0]} rotation={[0, Math.PI / 4, 0]} material={materials.thatch} castShadow>
      <coneGeometry args={[0.38, 0.22, 4]} />
    </mesh>
    <mesh position={[0, 0.58, 0]} rotation={[0, 0, Math.PI / 2]} material={materials.wood}>
      <cylinderGeometry args={[0.03, 0.03, 0.44, 8]} />
    </mesh>
  </group>
);

export const Tree: React.FC<{
  materials: VillageMaterials;
  position: [number, number, number];
  scale?: number;
}> = ({ materials, position, scale = 1 }) => (
  <group position={position} scale={scale}>
    <mesh position={[0, 0.38, 0]} material={materials.woodDark} castShadow>
      <cylinderGeometry args={[0.07, 0.11, 0.76, 7]} />
    </mesh>
    <mesh position={[0, 0.95, 0]} material={materials.leaf} castShadow>
      <sphereGeometry args={[0.42, 9, 7]} />
    </mesh>
    <mesh position={[0.18, 1.12, -0.1]} material={materials.leafDark} castShadow>
      <sphereGeometry args={[0.28, 8, 6]} />
    </mesh>
  </group>
);

export const Barrel: React.FC<{
  materials: VillageMaterials;
  position: [number, number, number];
}> = ({ materials, position }) => (
  <mesh position={position} material={materials.wood} castShadow>
    <cylinderGeometry args={[0.12, 0.13, 0.22, 10]} />
  </mesh>
);

export const CrateStack: React.FC<{
  materials: VillageMaterials;
  position: [number, number, number];
}> = ({ materials, position }) => (
  <group position={position}>
    <mesh position={[0, 0.1, 0]} material={materials.wood} castShadow>
      <boxGeometry args={[0.22, 0.2, 0.22]} />
    </mesh>
    <mesh position={[0.08, 0.28, 0.04]} material={materials.woodDark} castShadow>
      <boxGeometry args={[0.16, 0.16, 0.16]} />
    </mesh>
  </group>
);

export const Palisade: React.FC<{
  materials: VillageMaterials;
  position: [number, number, number];
  rotationY?: number;
}> = ({ materials, position, rotationY = 0 }) => (
  <group position={position} rotation={[0, rotationY, 0]}>
    {Array.from({ length: 7 }).map((_, i) => (
      <mesh
        key={i}
        position={[(i - 3) * 0.16, 0.38, 0]}
        material={materials.woodDark}
        castShadow
      >
        <cylinderGeometry args={[0.045, 0.055, 0.76 + (i % 2) * 0.1, 6]} />
      </mesh>
    ))}
  </group>
);

export const Campfire: React.FC<{
  materials: VillageMaterials;
  position: [number, number, number];
}> = ({ materials, position }) => {
  const smoke = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (!smoke.current) return;
    smoke.current.children.forEach((child, i) => {
      const y = ((state.clock.elapsedTime * 0.28 + i * 0.22) % 1.1) + 0.2;
      child.position.y = y;
      const s = 0.35 + y * 0.7;
      child.scale.setScalar(s);
      const mat = (child as THREE.Mesh).material as THREE.MeshStandardMaterial;
      mat.opacity = Math.max(0, 0.35 - y * 0.22);
    });
  });

  return (
    <group position={position}>
      {([-0.08, 0.08] as const).map((x, i) => (
        <mesh key={i} position={[x, 0.04, i === 0 ? 0.05 : -0.04]} rotation={[0.2, 0.4, 0.3]} material={materials.woodDark}>
          <cylinderGeometry args={[0.025, 0.03, 0.22, 5]} />
        </mesh>
      ))}
      <mesh position={[0, 0.08, 0]} material={materials.fire}>
        <coneGeometry args={[0.07, 0.16, 5]} />
      </mesh>
      <pointLight color="#fb923c" intensity={1.8} distance={3.5} position={[0, 0.25, 0]} />
      <group ref={smoke}>
        {[0, 1, 2].map((i) => (
          <mesh key={i} position={[0.02 * i, 0.3, 0]}>
            <sphereGeometry args={[0.08, 7, 6]} />
            <meshStandardMaterial color="#d6d3d1" transparent opacity={0.3} roughness={1} />
          </mesh>
        ))}
      </group>
    </group>
  );
};
