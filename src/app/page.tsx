"use client";

import React from "react";
import { FrontierProvider } from "@/context/FrontierContext";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/hero/Hero";
import { ChapterProgress } from "@/components/chapter/ChapterProgress";
import { WorldMap } from "@/world/WorldMap";
import { PioneerTerritoryPass } from "@/components/citizen/PioneerTerritoryPass";
import { ChapterHistory } from "@/components/chapter/ChapterHistory";
import { ActivityFeed } from "@/components/activity/ActivityFeed";
import { Observatory } from "@/components/observatory/Observatory";
import { HookExplorer } from "@/components/hooks/HookExplorer";
import { SimulatorControls } from "@/components/dev/SimulatorControls";

export default function Home() {
  return (
    <FrontierProvider>
      <div className="min-h-screen flex flex-col bg-frontier-bg text-frontier-text-primary selection:bg-frontier-gold/30">
        <Header />

        <main className="flex-1 flex flex-col items-center gap-6 pb-20">
          {/* 1. Tactical Hero & Rotating 3D Settlement Island */}
          <Hero />

          {/* 2. Chapter Progress Progression Engine */}
          <ChapterProgress />

          {/* 3. Interactive 3D Archipelago & The Boundary Defense Forcefield HUD */}
          <WorldMap />

          {/* 4. Gamified Citizen Pass & 3D Low-Poly Human Avatar */}
          <PioneerTerritoryPass />

          {/* 5. Historical Record & Milestone Log */}
          <ChapterHistory />

          {/* 6. On-Chain Live Activity Stream */}
          <ActivityFeed />

          {/* 7. Technical On-Chain Observatory Console */}
          <Observatory />

          {/* 8. CPI Hook Rejection Log & Anchor 6000 Explorer */}
          <HookExplorer />
        </main>

        <SimulatorControls />
        <Footer />
      </div>
    </FrontierProvider>
  );
}
