"use client";

import React, { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, ContactShadows } from "@react-three/drei";
import * as THREE from "three";

export type WalletPersonaType = "ghost" | "citizen" | "sentinel" | "renegade";

export interface WalletPersonaInfo {
  type: WalletPersonaType;
  title: string;
  badge: string;
  badgeClass: string;
  tagline: string;
  quote: string;
}

export function getWalletPersona(
  balance: number,
  supplyPercent: number,
  walletCapPercent: number,
  withinLimit: boolean | null
): WalletPersonaInfo {
  if (balance <= 0) {
    return {
      type: "ghost",
      title: "Unanchored Specter",
      badge: "👻 NOMAD GHOST",
      badgeClass: "bg-cyan-100 text-cyan-900 border-2 border-frontier-ink",
      tagline: "0 FRNT • Wandering the Void",
      quote: "Holds no stake in the territory. Drifting as an ethereal phantom outside the transfer hook perimeter.",
    };
  }

  if (withinLimit === false || supplyPercent > walletCapPercent) {
    return {
      type: "renegade",
      title: "Overburdened Renegade",
      badge: "⚠️ HOOK RESTRICTED",
      badgeClass: "bg-rose-100 text-rose-900 border-2 border-frontier-ink",
      tagline: `${supplyPercent.toFixed(2)}% • Exceeds Chapter Cap (${walletCapPercent}%)`,
      quote: "Carrying too much weight for the current epoch. Token-2022 transfer hooks will reject further acquisitions.",
    };
  }

  if (supplyPercent >= 1.5) {
    return {
      type: "sentinel",
      title: "High Citadel Sentinel",
      badge: "🛡️ CITADEL SENTINEL",
      badgeClass: "bg-purple-100 text-purple-900 border-2 border-frontier-ink",
      tagline: `${supplyPercent.toFixed(2)}% • Top Holder Guardian`,
      quote: "An elite stronghold holder. Armed with ceremonial spear and royal mantle, guarding community expansion.",
    };
  }

  return {
    type: "citizen",
    title: "Frontier Pioneer",
    badge: "🏕️ FRONTIER CITIZEN",
    badgeClass: "bg-emerald-100 text-emerald-900 border-2 border-frontier-ink",
    tagline: `${supplyPercent.toFixed(2)}% • Verified Settler`,
    quote: "A thriving settler building within the frontier limits. Carrying supplies for the next territory milestone.",
  };
}

function getTunicColorFromAddress(address: string): string {
  const PALETTE = [
    "#059669", // Emerald
    "#d97706", // Amber
    "#e11d48", // Rose/Coral
    "#0284c7", // Sky
    "#ca8a04", // Gold
    "#7c3aed", // Violet
    "#ea580c", // Tangerine
    "#0d9488", // Teal
  ];
  let hash = 0;
  for (let i = 0; i < address.length; i++) {
    hash = (hash << 5) - hash + address.charCodeAt(i);
    hash |= 0;
  }
  return PALETTE[Math.abs(hash) % PALETTE.length];
}

// -------------------------------------------------------------
// Low-poly Geometries
// -------------------------------------------------------------
const bodyGeo = new THREE.CapsuleGeometry(0.08, 0.17, 3, 8);
const headGeo = new THREE.SphereGeometry(0.082, 10, 8);
const limbGeo = new THREE.CapsuleGeometry(0.03, 0.14, 3, 6);
const footGeo = new THREE.BoxGeometry(0.052, 0.032, 0.085);
const hairGeo = new THREE.SphereGeometry(0.084, 8, 6, 0, Math.PI * 2, 0, Math.PI * 0.55);

// -------------------------------------------------------------
// Ghost Character (Non-Holder)
// -------------------------------------------------------------
function GhostCharacter() {
  const root = useRef<THREE.Group>(null);
  const leftArm = useRef<THREE.Group>(null);
  const rightArm = useRef<THREE.Group>(null);
  const tailRef = useRef<THREE.Mesh>(null);
  const particlesRef = useRef<THREE.Group>(null);

  const ghostMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#a5f3fc",
        transparent: true,
        opacity: 0.45,
        roughness: 0.12,
        metalness: 0.15,
        emissive: "#38bdf8",
        emissiveIntensity: 0.6,
      }),
    []
  );

  const eyeMat = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: "#ffffff",
      }),
    []
  );

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (root.current) {
      // Floating zero-g levitation
      root.current.position.y = 0.52 + Math.sin(t * 2.2) * 0.08;
      root.current.rotation.y = Math.sin(t * 0.8) * 0.25;
    }
    if (tailRef.current) {
      tailRef.current.rotation.z = Math.sin(t * 3.1) * 0.15;
      tailRef.current.rotation.x = 0.25 + Math.cos(t * 2.5) * 0.1;
    }
    if (leftArm.current && rightArm.current) {
      leftArm.current.rotation.z = -0.45 + Math.sin(t * 2.0) * 0.2;
      leftArm.current.rotation.x = Math.sin(t * 1.8) * 0.25;
      rightArm.current.rotation.z = 0.45 - Math.sin(t * 2.0) * 0.2;
      rightArm.current.rotation.x = Math.cos(t * 1.8) * 0.25;
    }
    if (particlesRef.current) {
      particlesRef.current.rotation.y = t * 0.6;
    }
  });

  return (
    <group>
      <group ref={root}>
        {/* Floating Torso */}
        <mesh geometry={bodyGeo} material={ghostMat} position={[0, 0.26, 0]} />
        {/* Head */}
        <mesh geometry={headGeo} material={ghostMat} position={[0, 0.46, 0]} />
        {/* Glowing Eyes */}
        <mesh position={[-0.03, 0.465, 0.075]} material={eyeMat}>
          <boxGeometry args={[0.016, 0.012, 0.01]} />
        </mesh>
        <mesh position={[0.03, 0.465, 0.075]} material={eyeMat}>
          <boxGeometry args={[0.016, 0.012, 0.01]} />
        </mesh>

        {/* Ethereal Wisp Arms */}
        <group ref={leftArm} position={[-0.12, 0.34, 0]}>
          <mesh geometry={limbGeo} material={ghostMat} position={[0, -0.07, 0]} />
        </group>
        <group ref={rightArm} position={[0.12, 0.34, 0]}>
          <mesh geometry={limbGeo} material={ghostMat} position={[0, -0.07, 0]} />
        </group>

        {/* Tapering Ghost Robe Tail */}
        <mesh
          ref={tailRef}
          position={[0, 0.08, 0]}
          rotation={[0.2, 0, 0]}
          material={ghostMat}
        >
          <coneGeometry args={[0.09, 0.26, 7]} />
        </mesh>
      </group>

      {/* Orbiting Ethereal Wisps */}
      <group ref={particlesRef} position={[0, 0.5, 0]}>
        {[0, 1.2, 2.4, 3.6, 4.8].map((angle, i) => (
          <mesh
            key={i}
            position={[
              Math.cos(angle) * 0.42,
              Math.sin(angle * 2) * 0.15,
              Math.sin(angle) * 0.42,
            ]}
            material={ghostMat}
          >
            <octahedronGeometry args={[0.025]} />
          </mesh>
        ))}
      </group>

      {/* Ghostly Pedestal: Weathered Void Platform with Cyan Runes */}
      <group position={[0, 0, 0]}>
        <mesh position={[0, -0.1, 0]}>
          <cylinderGeometry args={[0.9, 0.95, 0.2, 12]} />
          <meshStandardMaterial color="#334155" roughness={0.8} />
        </mesh>
        <mesh position={[0, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[0.88, 16]} />
          <meshStandardMaterial color="#1e293b" roughness={0.7} />
        </mesh>
        {/* Cyan Ethereal Ring */}
        <mesh position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.65, 0.78, 24]} />
          <meshBasicMaterial color="#38bdf8" side={THREE.DoubleSide} transparent opacity={0.65} />
        </mesh>
      </group>
    </group>
  );
}

// -------------------------------------------------------------
// Human Character (Citizen, Sentinel, Renegade)
// -------------------------------------------------------------
function HumanCharacter({
  persona,
  address,
}: {
  persona: WalletPersonaType;
  address: string;
}) {
  const root = useRef<THREE.Group>(null);
  const torso = useRef<THREE.Group>(null);
  const leftArm = useRef<THREE.Group>(null);
  const rightArm = useRef<THREE.Group>(null);
  const leftLeg = useRef<THREE.Group>(null);
  const rightLeg = useRef<THREE.Group>(null);
  const crateStackRef = useRef<THREE.Group>(null);

  const tunicColor = useMemo(() => {
    if (persona === "sentinel") return "#5b21b6"; // Royal purple
    if (persona === "renegade") return "#1e293b"; // Dark charcoal outlaw
    return getTunicColorFromAddress(address);
  }, [persona, address]);

  const clothesMat = useMemo(
    () => new THREE.MeshStandardMaterial({ color: tunicColor, roughness: 0.7 }),
    [tunicColor]
  );
  const skinMat = useMemo(
    () => new THREE.MeshStandardMaterial({ color: "#e8b894", roughness: 0.6 }),
    []
  );
  const hairMat = useMemo(
    () => new THREE.MeshStandardMaterial({ color: "#451a03", roughness: 0.8 }),
    []
  );
  const leatherMat = useMemo(
    () => new THREE.MeshStandardMaterial({ color: "#292524", roughness: 0.6 }),
    []
  );
  const woodMat = useMemo(
    () => new THREE.MeshStandardMaterial({ color: "#b45309", roughness: 0.7 }),
    []
  );
  const goldMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#fbbf24",
        metalness: 0.85,
        roughness: 0.25,
      }),
    []
  );

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const group = root.current;
    if (!group) return;

    if (persona === "renegade") {
      // Overburdened jitter / struggle wobble
      const jitter = Math.sin(t * 22) * 0.008;
      group.position.x = jitter;
      if (torso.current) {
        torso.current.rotation.x = -0.12 + Math.sin(t * 3.5) * 0.04;
      }
      if (crateStackRef.current) {
        crateStackRef.current.rotation.z = Math.sin(t * 4.2) * 0.08;
      }
      if (leftArm.current && rightArm.current) {
        leftArm.current.rotation.x = -1.35;
        rightArm.current.rotation.x = -1.35;
      }
    } else if (persona === "sentinel") {
      // Disciplined guard sentinel
      if (torso.current) {
        torso.current.position.y = Math.sin(t * 1.5) * 0.005;
        torso.current.rotation.y = Math.sin(t * 0.8) * 0.06;
      }
      if (leftArm.current && rightArm.current) {
        leftArm.current.rotation.x = -0.15;
        rightArm.current.rotation.x = -0.65; // holding upright spear
      }
    } else {
      // Citizen / Pioneer idle breathing
      if (torso.current) {
        torso.current.position.y = Math.sin(t * 2.2) * 0.008;
        torso.current.rotation.y = Math.sin(t * 0.9) * 0.12;
      }
      if (leftArm.current && rightArm.current) {
        leftArm.current.rotation.x = -0.3 + Math.sin(t * 2.2) * 0.06;
        rightArm.current.rotation.x = -0.3 - Math.sin(t * 2.2) * 0.06;
      }
    }
  });

  return (
    <group ref={root} position={[0, 0, 0]}>
      <group ref={torso}>
        {/* Tunic Torso */}
        <mesh geometry={bodyGeo} material={clothesMat} position={[0, 0.28, 0]} castShadow />
        {/* Head */}
        <mesh geometry={headGeo} material={skinMat} position={[0, 0.48, 0]} castShadow />
        {/* Hair */}
        <mesh geometry={hairGeo} material={hairMat} position={[0, 0.505, -0.01]} />
        {/* Face Eyebrows/Eyes */}
        <mesh position={[0, 0.465, 0.07]}>
          <boxGeometry args={[0.055, 0.012, 0.012]} />
          <meshStandardMaterial color="#1c1917" roughness={0.5} />
        </mesh>

        {/* Sentinel Gold Helmet Accent & Pauldrons */}
        {persona === "sentinel" && (
          <>
            <mesh position={[0, 0.54, 0]}>
              <cylinderGeometry args={[0.05, 0.07, 0.04, 6]} />
              <primitive object={goldMat} attach="material" />
            </mesh>
            <mesh position={[-0.13, 0.38, 0]}>
              <sphereGeometry args={[0.045, 6, 6]} />
              <primitive object={goldMat} attach="material" />
            </mesh>
            <mesh position={[0.13, 0.38, 0]}>
              <sphereGeometry args={[0.045, 6, 6]} />
              <primitive object={goldMat} attach="material" />
            </mesh>
          </>
        )}

        {/* Arms */}
        <group ref={leftArm} position={[-0.11, 0.36, 0]}>
          <mesh geometry={limbGeo} material={skinMat} position={[0, -0.08, 0]} castShadow />
        </group>

        <group ref={rightArm} position={[0.11, 0.36, 0]}>
          <mesh geometry={limbGeo} material={skinMat} position={[0, -0.08, 0]} castShadow />

          {/* Sentinel Spear */}
          {persona === "sentinel" && (
            <group position={[0.03, 0.05, 0.1]} rotation={[0.25, 0, 0]}>
              <mesh material={woodMat}>
                <cylinderGeometry args={[0.012, 0.012, 0.85, 6]} />
              </mesh>
              <mesh position={[0, 0.44, 0]} material={goldMat}>
                <coneGeometry args={[0.036, 0.12, 5]} />
              </mesh>
            </group>
          )}
        </group>

        {/* Citizen Cargo Sack */}
        {persona === "citizen" && (
          <group position={[0, 0.32, 0.12]}>
            <mesh material={leatherMat} castShadow>
              <boxGeometry args={[0.14, 0.12, 0.12]} />
            </mesh>
            <mesh position={[0, 0.07, 0]} material={goldMat}>
              <sphereGeometry args={[0.02, 6, 6]} />
            </mesh>
          </group>
        )}

        {/* Overburdened Renegade: 3 Staggered Crates */}
        {persona === "renegade" && (
          <group ref={crateStackRef} position={[0, 0.32, 0.15]}>
            {/* Crate 1 */}
            <mesh position={[0, 0, 0]} material={woodMat} castShadow>
              <boxGeometry args={[0.16, 0.12, 0.14]} />
            </mesh>
            {/* Crate 2 */}
            <mesh position={[0.01, 0.12, 0.01]} rotation={[0, 0.1, 0.05]} material={woodMat} castShadow>
              <boxGeometry args={[0.14, 0.11, 0.13]} />
            </mesh>
            {/* Crate 3 (teetering) */}
            <mesh position={[-0.015, 0.23, 0.02]} rotation={[0.08, -0.15, -0.1]} material={woodMat} castShadow>
              <boxGeometry args={[0.12, 0.1, 0.12]} />
            </mesh>
          </group>
        )}
      </group>

      {/* Legs */}
      <group ref={leftLeg} position={[-0.045, 0.16, 0]}>
        <mesh geometry={limbGeo} material={clothesMat} position={[0, -0.08, 0]} castShadow />
        <mesh geometry={footGeo} material={leatherMat} position={[0, -0.16, 0.015]} />
      </group>
      <group ref={rightLeg} position={[0.045, 0.16, 0]}>
        <mesh geometry={limbGeo} material={clothesMat} position={[0, -0.08, 0]} castShadow />
        <mesh geometry={footGeo} material={leatherMat} position={[0, -0.16, 0.015]} />
      </group>

      {/* Pedestal Base */}
      <group position={[0, 0, 0]}>
        <mesh position={[0, -0.1, 0]}>
          <cylinderGeometry args={[0.9, 0.95, 0.2, 14]} />
          <meshStandardMaterial
            color={persona === "sentinel" ? "#4c1d95" : "#78350f"}
            roughness={0.7}
          />
        </mesh>
        <mesh position={[0, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[0.88, 20]} />
          <meshStandardMaterial
            color={
              persona === "sentinel"
                ? "#2e1065"
                : persona === "renegade"
                ? "#451a03"
                : "#15803d"
            }
            roughness={0.6}
          />
        </mesh>

        {/* Ring Accent */}
        <mesh position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.72, 0.82, 24]} />
          <meshBasicMaterial
            color={
              persona === "sentinel"
                ? "#fbbf24"
                : persona === "renegade"
                ? "#f43f5e"
                : "#facc15"
            }
            side={THREE.DoubleSide}
            transparent
            opacity={0.8}
          />
        </mesh>
      </group>
    </group>
  );
}

// -------------------------------------------------------------
// Main 3D Canvas Scene
// -------------------------------------------------------------
export const WalletAvatar: React.FC<{
  address: string;
  balance: number;
  supplyPercent: number;
  walletCapPercent: number;
  withinLimit: boolean | null;
  className?: string;
}> = ({
  address,
  balance,
  supplyPercent,
  walletCapPercent,
  withinLimit,
  className = "w-full h-full",
}) => {
  const persona = useMemo(
    () => getWalletPersona(balance, supplyPercent, walletCapPercent, withinLimit),
    [balance, supplyPercent, walletCapPercent, withinLimit]
  );

  return (
    <div className={`relative ${className}`}>
      <Canvas
        camera={{ position: [0, 1.2, 2.2], fov: 38 }}
        gl={{ antialias: true, alpha: true }}
        shadows
      >
        <fog attach="fog" args={["#fef3c7", 10, 22]} />

        {/* Lighting */}
        <hemisphereLight args={["#fff7ed", "#65a30d", 0.95]} />
        <ambientLight intensity={0.55} color="#fffbeb" />
        <directionalLight
          position={[4, 8, 4]}
          intensity={2.1}
          color="#fff7ed"
          castShadow
          shadow-mapSize={[1024, 1024]}
        />
        <directionalLight position={[-3, 2, -2]} intensity={0.4} color="#fb923c" />

        {/* Character depending on persona */}
        {persona.type === "ghost" ? (
          <GhostCharacter />
        ) : (
          <HumanCharacter persona={persona.type} address={address} />
        )}

        <ContactShadows
          position={[0, -0.19, 0]}
          opacity={0.35}
          scale={2.4}
          blur={1.8}
          far={1.5}
          color="#431407"
        />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.8}
          maxPolarAngle={Math.PI / 2.1}
          minPolarAngle={Math.PI / 4}
          target={[0, 0.35, 0]}
        />
      </Canvas>

      {/* Floating Identity Badge Overlay */}
      <div className="absolute top-3 left-3 pointer-events-none">
        <span
          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono font-black shadow-pop-sm ${persona.badgeClass}`}
        >
          {persona.badge}
        </span>
      </div>

      {/* Rotation Guide Hint */}
      <div className="absolute bottom-2.5 right-3 pointer-events-none text-[10px] font-mono font-bold text-slate-500 bg-white/90 px-2 py-0.5 rounded border border-frontier-ink shadow-sm">
        3D Profile • Drag to rotate
      </div>
    </div>
  );
};
