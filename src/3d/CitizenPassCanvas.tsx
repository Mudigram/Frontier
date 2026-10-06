"use client";

import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { LowPolyCitizen, type CitizenArchetype } from "./LowPolyCitizen";

interface CitizenPassCanvasProps {
  archetype: CitizenArchetype;
}

export const CitizenPassCanvas: React.FC<CitizenPassCanvasProps> = ({ archetype }) => {
  return (
    <div className="w-full h-full min-h-[260px] relative">
      <Canvas
        camera={{ position: [0, 0.45, 3.4], fov: 44 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.65} />
        <directionalLight position={[4, 6, 4]} intensity={1.2} />
        <directionalLight position={[-4, 2, -2]} intensity={0.4} color="#38bdf8" />

        <OrbitControls
          target={[0, 0.05, 0]}
          enableZoom={false}
          enablePan={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 4}
          autoRotate={false}
        />

        <LowPolyCitizen archetype={archetype} />
      </Canvas>
      <div className="absolute bottom-2 right-2 text-[10px] font-mono text-slate-500 pointer-events-none">
        Drag to rotate citizen
      </div>
    </div>
  );
};
