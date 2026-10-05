"use client";

import React from "react";
import { FrontierProvider } from "@/context/FrontierContext";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/hero/Hero";
import { ChapterProgress } from "@/components/chapter/ChapterProgress";
import { WorldMap } from "@/world/WorldMap";
import { ChapterHistory } from "@/components/chapter/ChapterHistory";
import { ActivityFeed } from "@/components/activity/ActivityFeed";
import { Observatory } from "@/components/observatory/Observatory";
import { WalletTerritory } from "@/components/wallet/WalletTerritory";
import { HookExplorer } from "@/components/hooks/HookExplorer";
import { SimulatorControls } from "@/components/dev/SimulatorControls";

export default function Home() {
  return (
    <FrontierProvider>
      <div className="min-h-screen flex flex-col bg-frontier-bg text-frontier-ink selection:bg-frontier-yellow/40">
        <Header />

        <main className="flex-1 flex flex-col items-center gap-4 pb-16">
          <Hero />
          <ChapterProgress />
          <WorldMap />
          <ChapterHistory />
          <ActivityFeed />
          <Observatory />
          <WalletTerritory />
          <HookExplorer />
        </main>

        <SimulatorControls />
        <Footer />
      </div>
    </FrontierProvider>
  );
}
