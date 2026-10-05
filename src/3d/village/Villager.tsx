"use client";

import React, { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import type { VillageMaterials } from "./materials";

export type VillagerAction = "walk" | "idle" | "work" | "guard";
export type VillagerProp = "none" | "crate" | "hammer" | "spear" | "sack";

const bodyGeo = new THREE.CapsuleGeometry(0.075, 0.16, 3, 8);
const headGeo = new THREE.SphereGeometry(0.078, 10, 8);
const limbGeo = new THREE.CapsuleGeometry(0.028, 0.13, 3, 6);
const footGeo = new THREE.BoxGeometry(0.05, 0.03, 0.08);
const hairGeo = new THREE.SphereGeometry(0.08, 8, 6, 0, Math.PI * 2, 0, Math.PI * 0.55);

interface VillagerProps {
  materials: VillageMaterials;
  tunic: string;
  skin?: string;
  action: VillagerAction;
  prop?: VillagerProp;
  position?: [number, number, number];
  rotationY?: number;
  path?: THREE.CatmullRomCurve3;
  pathSpeed?: number;
  pathOffset?: number;
  phase?: number;
  scale?: number;
}

function tunicMaterial(color: string) {
  return new THREE.MeshStandardMaterial({
    color,
    roughness: 0.7,
    metalness: 0.04,
  });
}

export const Villager: React.FC<VillagerProps> = ({
  materials,
  tunic,
  skin,
  action,
  prop = "none",
  position = [0, 0, 0],
  rotationY = 0,
  path,
  pathSpeed = 0.06,
  pathOffset = 0,
  phase = 0,
  scale = 1,
}) => {
  const root = useRef<THREE.Group>(null);
  const torso = useRef<THREE.Group>(null);
  const leftArm = useRef<THREE.Group>(null);
  const rightArm = useRef<THREE.Group>(null);
  const leftLeg = useRef<THREE.Group>(null);
  const rightLeg = useRef<THREE.Group>(null);

  const clothes = useMemo(() => tunicMaterial(tunic), [tunic]);
  const skinMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: skin ?? "#e8b894",
        roughness: 0.62,
        metalness: 0.02,
      }),
    [skin]
  );

  useFrame((state) => {
    const t = state.clock.elapsedTime + phase;
    const group = root.current;
    if (!group) return;

    if (path && (action === "walk" || action === "guard")) {
      const u = (t * pathSpeed + pathOffset) % 1;
      const pos = path.getPointAt(u);
      const tan = path.getTangentAt(u);
      group.position.copy(pos);
      group.rotation.y = Math.atan2(tan.x, tan.z);
    }

    const walk = action === "walk" || action === "guard";
    const cadence = walk ? t * 7.2 : action === "work" ? t * 6.4 : t * 2.1;
    const swing = walk ? 0.62 : action === "work" ? 0.12 : 0.08;

    if (leftLeg.current && rightLeg.current) {
      leftLeg.current.rotation.x = Math.sin(cadence) * swing;
      rightLeg.current.rotation.x = Math.sin(cadence + Math.PI) * swing;
    }

    if (leftArm.current && rightArm.current) {
      if (action === "work") {
        leftArm.current.rotation.x = -0.35;
        rightArm.current.rotation.x = -0.15 - Math.abs(Math.sin(cadence)) * 1.15;
      } else if (action === "guard") {
        leftArm.current.rotation.x = -0.15;
        rightArm.current.rotation.x = -0.55;
      } else if (prop === "crate" || prop === "sack") {
        leftArm.current.rotation.x = -1.15;
        rightArm.current.rotation.x = -1.15;
      } else {
        leftArm.current.rotation.x = Math.sin(cadence + Math.PI) * (walk ? 0.5 : 0.1);
        rightArm.current.rotation.x = Math.sin(cadence) * (walk ? 0.5 : 0.1);
      }
    }

    if (torso.current) {
      torso.current.position.y = walk ? Math.abs(Math.sin(cadence)) * 0.018 : Math.sin(t * 2.4) * 0.008;
      if (action === "idle") {
        torso.current.rotation.y = Math.sin(t * 0.7) * 0.12;
      }
    }
  });

  return (
    <group
      ref={root}
      position={position}
      rotation={[0, rotationY, 0]}
      scale={scale}
      castShadow
    >
      <group ref={torso}>
        <mesh geometry={bodyGeo} material={clothes} position={[0, 0.28, 0]} castShadow />
        <mesh geometry={headGeo} material={skinMat} position={[0, 0.48, 0]} castShadow />
        <mesh geometry={hairGeo} material={materials.hair} position={[0, 0.505, -0.01]} />
        <mesh position={[0, 0.465, 0.07]}>
          <boxGeometry args={[0.055, 0.012, 0.012]} />
          <meshStandardMaterial color="#1c1917" roughness={0.5} />
        </mesh>

        <group ref={leftArm} position={[-0.11, 0.36, 0]}>
          <mesh geometry={limbGeo} material={skinMat} position={[0, -0.08, 0]} castShadow />
        </group>
        <group ref={rightArm} position={[0.11, 0.36, 0]}>
          <mesh geometry={limbGeo} material={skinMat} position={[0, -0.08, 0]} castShadow />
          {prop === "hammer" && (
            <group position={[0.02, -0.16, 0.04]} rotation={[0.2, 0, 0.4]}>
              <mesh material={materials.woodDark}>
                <cylinderGeometry args={[0.012, 0.012, 0.16, 6]} />
              </mesh>
              <mesh position={[0, 0.08, 0]} material={materials.iron}>
                <boxGeometry args={[0.08, 0.045, 0.04]} />
              </mesh>
            </group>
          )}
          {prop === "spear" && (
            <group position={[0.03, -0.02, 0.08]} rotation={[0.85, 0, 0]}>
              <mesh material={materials.wood}>
                <cylinderGeometry args={[0.012, 0.012, 0.55, 6]} />
              </mesh>
              <mesh position={[0, 0.28, 0]} material={materials.iron}>
                <coneGeometry args={[0.028, 0.08, 5]} />
              </mesh>
            </group>
          )}
        </group>

        {(prop === "crate" || prop === "sack") && (
          <mesh position={[0, 0.42, 0.12]} material={prop === "crate" ? materials.wood : materials.thatch} castShadow>
            <boxGeometry args={prop === "crate" ? [0.12, 0.1, 0.1] : [0.11, 0.12, 0.11]} />
          </mesh>
        )}
      </group>

      <group ref={leftLeg} position={[-0.045, 0.16, 0]}>
        <mesh geometry={limbGeo} material={clothes} position={[0, -0.08, 0]} castShadow />
        <mesh geometry={footGeo} material={materials.woodDark} position={[0, -0.16, 0.015]} />
      </group>
      <group ref={rightLeg} position={[0.045, 0.16, 0]}>
        <mesh geometry={limbGeo} material={clothes} position={[0, -0.08, 0]} castShadow />
        <mesh geometry={footGeo} material={materials.woodDark} position={[0, -0.16, 0.015]} />
      </group>
    </group>
  );
};
