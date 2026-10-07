"use client";

import React from "react";
import { Canvas } from "@react-three/fiber";
import { ContactShadows, OrbitControls } from "@react-three/drei";
import { SettlementVillage } from "./village/SettlementVillage";

export const HeroScene: React.FC<{ className?: string }> = ({
  className = "w-full h-full",
}) => {
  return (
    <div className={`${className} touch-pan-y`}>
      <Canvas
        camera={{ position: [4.2, 3.4, 6.4], fov: 38 }}
        dpr={[1, 1.8]}
        performance={{ min: 0.5 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        shadows
      >
        <fog attach="fog" args={["#070a12", 16, 28]} />

        <hemisphereLight args={["#1e293b", "#090d16", 0.75]} />
        <ambientLight intensity={0.45} color="#cbd5e1" />
        <directionalLight
          position={[7, 11, 5]}
          intensity={2.0}
          color="#fef08a"
          castShadow
          shadow-mapSize={[512, 512]}
          shadow-camera-far={24}
          shadow-camera-left={-8}
          shadow-camera-right={8}
          shadow-camera-top={8}
          shadow-camera-bottom={-8}
        />
        <directionalLight position={[-4, 3, -2]} intensity={0.45} color="#38bdf8" />

        <mesh position={[0.4, 1.6, -5.2]}>
          <circleGeometry args={[2.4, 32]} />
          <meshBasicMaterial color="#d4a853" transparent opacity={0.25} />
        </mesh>

        <SettlementVillage />

        <ContactShadows
          position={[0, -1.18, 0]}
          opacity={0.5}
          scale={12}
          blur={2.4}
          far={3}
          color="#020617"
        />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.55}
          maxPolarAngle={Math.PI / 2.15}
          minPolarAngle={Math.PI / 4.2}
          target={[0, 0.45, 0]}
        />
      </Canvas>
    </div>
  );
};
