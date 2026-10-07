"use client";

import React, { useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, ContactShadows } from "@react-three/drei";
import * as THREE from "three";
import { useVillageMaterials } from "./materials";
import { Villager } from "./Villager";
import { CrateStack, Barrel, Palisade, Tree } from "./props";
import { createGateGeometry, createCrystalGeometry } from "../geometry";
import type { FrontierEvent } from "@/data/types";

interface SentryGateSceneProps {
  latestEvent?: FrontierEvent | null;
  onSimulateRejection?: () => void;
  onSimulateBuy?: () => void;
}

// -------------------------------------------------------------
// Interactive Gatekeeper & Courier Arena
// -------------------------------------------------------------
function GatekeeperArena({
  latestEvent,
  triggerState,
}: {
  latestEvent?: FrontierEvent | null;
  triggerState: "idle" | "buy" | "rejection";
}) {
  const m = useVillageMaterials("settlement");
  const crystalRef = useRef<THREE.Mesh>(null);
  const shockwaveRef = useRef<THREE.Mesh>(null);
  const courierRef = useRef<THREE.Group>(null);

  const activeMode = triggerState !== "idle" ? triggerState : latestEvent?.type === "hook_rejection" ? "rejection" : latestEvent?.type === "buy" ? "buy" : "idle";

  useFrame((state) => {
    const t = state.clock.elapsedTime;

    // Hook Monolith Crystal Floating
    if (crystalRef.current) {
      crystalRef.current.rotation.y = t * 1.5;
      crystalRef.current.position.y = 1.35 + Math.sin(t * 2.5) * 0.08;
    }

    // Shockwave pulse during hook rejection
    if (shockwaveRef.current) {
      if (activeMode === "rejection") {
        const pulse = (t * 2) % 1;
        shockwaveRef.current.scale.set(1 + pulse * 2.5, 1 + pulse * 2.5, 1);
        const mat = shockwaveRef.current.material as THREE.MeshBasicMaterial;
        if (mat) mat.opacity = Math.max(0, 0.8 - pulse * 0.8);
      } else {
        const mat = shockwaveRef.current.material as THREE.MeshBasicMaterial;
        if (mat) mat.opacity = 0;
      }
    }

    // Courier animation
    if (courierRef.current) {
      if (activeMode === "buy") {
        // Running through the gate into settlement
        const cycle = (t * 0.8) % 1;
        courierRef.current.position.z = 2.2 - cycle * 3.8;
        courierRef.current.position.x = 0;
        courierRef.current.rotation.y = Math.PI; // facing into gate
      } else if (activeMode === "rejection") {
        // Stumbling backwards away from gate
        const cycle = Math.sin(t * 3.5);
        courierRef.current.position.z = 1.2 + Math.max(0, cycle) * 0.25;
        courierRef.current.position.x = Math.sin(t * 18) * 0.03; // shudder
        courierRef.current.rotation.y = 0; // facing gate
      } else {
        // Idle near entrance
        courierRef.current.position.set(0.6, 0, 1.2);
        courierRef.current.rotation.y = -0.5;
      }
    }
  });

  return (
    <group>
      {/* Stone Courtyard Base */}
      <group position={[0, 0, 0]}>
        <mesh position={[0, -0.25, 0]} receiveShadow>
          <cylinderGeometry args={[2.8, 2.5, 0.45, 16]} />
          <meshStandardMaterial color="#475569" roughness={0.7} />
        </mesh>
        <mesh position={[0, 0.005, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
          <circleGeometry args={[2.75, 24]} />
          <meshStandardMaterial color="#334155" roughness={0.65} />
        </mesh>
        {/* Roadway through gate */}
        <mesh position={[0, 0.015, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
          <planeGeometry args={[1.2, 5.2]} />
          <meshStandardMaterial color="#78350f" roughness={0.8} />
        </mesh>
      </group>

      {/* Fortified Token-2022 Checkpoint Gate */}
      <group position={[0, 0, 0]}>
        <mesh geometry={createGateGeometry()} material={m.wood} position={[0, 0.9, 0]} castShadow />
      </group>

      {/* Flanking Defensive Palisades */}
      <Palisade materials={m} position={[-1.25, 0, 0]} rotationY={0.15} />
      <Palisade materials={m} position={[1.25, 0, 0]} rotationY={-0.15} />
      <CrateStack materials={m} position={[-1.4, 0, 1.1]} />
      <Barrel materials={m} position={[1.4, 0.11, 1.1]} />
      <Tree materials={m} position={[-1.8, 0, -1.0]} scale={0.85} />
      <Tree materials={m} position={[1.8, 0, -1.0]} scale={0.85} />

      {/* Hook Monolith Beacon Shrine */}
      <group position={[-1.3, 0, 0.6]}>
        <mesh position={[0, 0.4, 0]} material={m.stone} castShadow>
          <cylinderGeometry args={[0.22, 0.3, 0.8, 6]} />
        </mesh>
        <mesh
          ref={crystalRef}
          geometry={createCrystalGeometry()}
          material={activeMode === "rejection" ? m.clothCoral : m.clothSky}
          position={[0, 1.35, 0]}
          castShadow
        />
        <pointLight
          color={activeMode === "rejection" ? "#f43f5e" : "#38bdf8"}
          intensity={activeMode === "rejection" ? 2.5 : 1.2}
          distance={4}
          position={[0, 1.4, 0]}
        />
      </group>

      {/* Sentry Guards on Checkpoint Duty */}
      <Villager
        materials={m}
        tunic="#1e293b"
        skin="#e8b894"
        action="guard"
        prop="spear"
        position={[-0.7, 0, 0.3]}
        rotationY={0.65}
        scale={0.92}
      />
      <Villager
        materials={m}
        tunic="#1e293b"
        skin="#c48a6a"
        action="guard"
        prop="spear"
        position={[0.7, 0, 0.3]}
        rotationY={-0.65}
        scale={0.92}
      />

      {/* Dynamic Courier Character */}
      <group ref={courierRef}>
        <Villager
          materials={m}
          tunic={activeMode === "rejection" ? "#e11d48" : activeMode === "buy" ? "#059669" : "#d97706"}
          skin="#f3d0b0"
          action={activeMode === "buy" ? "walk" : activeMode === "rejection" ? "work" : "idle"}
          prop={activeMode === "buy" ? "crate" : activeMode === "rejection" ? "crate" : "sack"}
          scale={0.88}
        />
      </group>

      {/* Rejection Shockwave Ring */}
      <mesh
        ref={shockwaveRef}
        position={[0, 0.04, 0.5]}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <ringGeometry args={[0.5, 0.75, 32]} />
        <meshBasicMaterial color="#f43f5e" side={THREE.DoubleSide} transparent opacity={0} />
      </mesh>
    </group>
  );
}

export const SentryGateScene: React.FC<SentryGateSceneProps> = ({
  latestEvent,
  onSimulateRejection,
  onSimulateBuy,
}) => {
  const [activeTrigger, setActiveTrigger] = useState<"idle" | "buy" | "rejection">("idle");

  const handleTestRejection = () => {
    setActiveTrigger("rejection");
    if (onSimulateRejection) onSimulateRejection();
    setTimeout(() => setActiveTrigger("idle"), 3500);
  };

  const handleTestBuy = () => {
    setActiveTrigger("buy");
    if (onSimulateBuy) onSimulateBuy();
    setTimeout(() => setActiveTrigger("idle"), 3500);
  };

  return (
    <div className="w-full h-full min-h-[340px] sm:min-h-[400px] relative touch-pan-y">
      <Canvas
        camera={{ position: [0, 4.2, 5.5], fov: 38 }}
        dpr={[1, 1.8]}
        performance={{ min: 0.5 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        shadows
      >
        <fog attach="fog" args={["#070a12", 12, 26]} />

        {/* Obsidian atmospheric lighting */}
        <hemisphereLight args={["#1e293b", "#090d16", 0.75]} />
        <ambientLight intensity={0.45} color="#cbd5e1" />
        <directionalLight
          position={[6, 12, 6]}
          intensity={2.0}
          color="#fef08a"
          castShadow
          shadow-mapSize={[512, 512]}
        />
        <directionalLight position={[-4, 3, -2]} intensity={0.4} color="#38bdf8" />

        <GatekeeperArena latestEvent={latestEvent} triggerState={activeTrigger} />

        <ContactShadows
          position={[0, -0.48, 0]}
          opacity={0.45}
          scale={8}
          blur={2.2}
          far={2.5}
          color="#020617"
        />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate={activeTrigger === "idle"}
          autoRotateSpeed={0.5}
          maxPolarAngle={Math.PI / 2.15}
          minPolarAngle={Math.PI / 4.2}
          target={[0, 0.4, 0]}
        />
      </Canvas>

      {/* Floating Status Badge */}
      <div className="absolute top-3 left-3 pointer-events-none">
        <span
          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-wider border backdrop-blur-sm shadow-md ${
            activeTrigger === "rejection" || latestEvent?.type === "hook_rejection"
              ? "bg-rose-950/80 text-rose-300 border-rose-700/80"
              : activeTrigger === "buy" || latestEvent?.type === "buy"
              ? "bg-emerald-950/80 text-emerald-300 border-emerald-700/80"
              : "bg-slate-900/90 text-frontier-gold border-slate-700"
          }`}
        >
          {activeTrigger === "rejection" || latestEvent?.type === "hook_rejection"
            ? "⚠️ HOOK REJECTION DETECTED"
            : activeTrigger === "buy" || latestEvent?.type === "buy"
            ? "⚡ INCOMING TOKEN COURIER"
            : "🛡️ TOKEN-2022 SENTRY GATE ACTIVE"}
        </span>
      </div>

      {/* Interactive 3D Viewport Hint */}
      <div className="absolute bottom-3 right-3 pointer-events-none text-[10px] font-mono font-medium text-slate-400 bg-slate-900/90 px-2.5 py-1 rounded-lg border border-slate-800 shadow-sm backdrop-blur-sm">
        Interactive 3D Sentry Checkpoint • Drag to inspect
      </div>
    </div>
  );
};
