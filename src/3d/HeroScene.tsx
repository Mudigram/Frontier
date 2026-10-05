"use client";

import React from "react";
import { Canvas } from "@react-three/fiber";
import { ContactShadows, OrbitControls } from "@react-three/drei";
import { SettlementVillage } from "./village/SettlementVillage";

export const HeroScene: React.FC<{ className?: string }> = ({
  className = "w-full h-full",
}) => {
  return (
    <div className={className}>
      <Canvas
        camera={{ position: [4.2, 3.4, 6.4], fov: 38 }}
        gl={{ antialias: true, alpha: true }}
        shadows
      >
        <fog attach="fog" args={["#fef3c7", 16, 28]} />

        <hemisphereLight args={["#fff7ed", "#4d7c0f", 0.95]} />
        <ambientLight intensity={0.55} color="#fffbeb" />
        <directionalLight
          position={[7, 11, 5]}
          intensity={2.15}
          color="#fff7ed"
          castShadow
          shadow-mapSize={[1024, 1024]}
          shadow-camera-far={24}
          shadow-camera-left={-8}
          shadow-camera-right={8}
          shadow-camera-top={8}
          shadow-camera-bottom={-8}
        />
        <directionalLight position={[-4, 3, -2]} intensity={0.45} color="#fb923c" />

        <mesh position={[0.4, 1.6, -5.2]}>
          <circleGeometry args={[2.4, 32]} />
          <meshBasicMaterial color="#fde047" transparent opacity={0.88} />
        </mesh>

        <SettlementVillage />

        <ContactShadows
          position={[0, -1.18, 0]}
          opacity={0.38}
          scale={12}
          blur={2.4}
          far={3}
          color="#431407"
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
