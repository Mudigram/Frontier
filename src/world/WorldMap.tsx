"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import { useFrontier } from "@/context/FrontierContext";
import { getTerritoriesWithState, type TerritoryWithState } from "./chapters";
import { formatCompact } from "@/lib/format";
import { ConfidenceBadge } from "@/components/ui/ConfidenceBadge";
import { BoundaryDefense } from "@/components/defense/BoundaryDefense";

const WorldScene = dynamic(
  () => import("@/3d/WorldScene").then((mod) => mod.WorldScene),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-[450px] sm:h-[550px] rounded-xl bg-slate-950/90 border border-slate-800 flex flex-col items-center justify-center font-mono text-xs text-slate-500 gap-3">
        <div className="w-6 h-6 rounded-full border-2 border-slate-600 border-t-amber-400 animate-spin" />
        <span>Initializing 3D World Scene...</span>
      </div>
    ),
  }
);

export const WorldMap: React.FC = () => {
  const { chapter } = useFrontier();
  const currentChapter = chapter ? chapter.chapter : 2;
  const territories = getTerritoriesWithState(currentChapter);

  // Allow clicking on any territory to inspect its lore & mechanical specifications
  const [selectedTerritory, setSelectedTerritory] = useState<TerritoryWithState>(
    territories.find((t) => t.id === currentChapter) || territories[0]
  );

  React.useEffect(() => {
    const active = territories.find((t) => t.id === currentChapter);
    if (active) setSelectedTerritory(active);
  }, [currentChapter]);

  return (
    <section id="world-map" className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-10">
      <div className="rounded-2xl bg-frontier-surface/90 border border-frontier-border p-6 sm:p-10 backdrop-blur-md shadow-2xl relative overflow-hidden">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-frontier-border/60 gap-4 relative z-10">
          <div>
            <div className="text-xs uppercase font-mono tracking-[0.25em] text-slate-400">
              Low-Poly 3D Cartography
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mt-1">
              Frontier Expansion Archipelago
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-slate-400">3D TERRAIN ENGINE</span>
            <ConfidenceBadge source={chapter?.source.chapter ?? "configured"} size="sm" />
          </div>
        </div>

        {/* Main Map + Lore Split View */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative z-10">
          {/* Interactive 3D World Scene (7 cols) */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            <div className="rounded-xl border border-slate-800 overflow-hidden shadow-inner">
              <WorldScene
                territories={territories}
                selectedTerritory={selectedTerritory}
                onSelectTerritory={setSelectedTerritory}
              />
            </div>

            {/* Quick Territory Selector Pills */}
            <div className="grid grid-cols-5 gap-2 font-mono text-xs">
              {territories.map((t) => {
                const isSelected = selectedTerritory.id === t.id;
                const isCurrent = t.current;

                return (
                  <button
                    key={t.id}
                    onClick={() => setSelectedTerritory(t)}
                    className={`p-2.5 rounded-lg border text-center transition-all cursor-pointer ${
                      isSelected
                        ? "bg-slate-800 border-frontier-gold text-frontier-gold shadow-md"
                        : isCurrent
                        ? "bg-amber-950/40 border-amber-600/60 text-amber-300"
                        : t.unlocked
                        ? "bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700"
                        : "bg-slate-950/40 border-slate-900 text-slate-600"
                    }`}
                  >
                    <div className="font-bold">{t.roman}</div>
                    <div className="text-[10px] truncate uppercase mt-0.5">{t.name}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Territory Lore & Mechanical Dossier (5 cols) */}
          <div className="lg:col-span-5 bg-slate-900/90 border border-slate-800 rounded-xl p-6 shadow-xl relative flex flex-col justify-between min-h-[500px]">
            <div>
              {/* Card Header */}
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <span className="text-xs font-mono tracking-widest text-slate-400 uppercase">
                  Territory Dossier
                </span>
                <span
                  className={`text-xs font-mono font-bold px-2 py-0.5 rounded ${
                    selectedTerritory.current
                      ? "bg-amber-500/20 text-amber-300 border border-amber-500/40"
                      : selectedTerritory.unlocked
                      ? "bg-emerald-500/20 text-emerald-400"
                      : "bg-slate-800 text-slate-500"
                  }`}
                >
                  CHAPTER {selectedTerritory.roman}
                </span>
              </div>

              {/* Territory Name & Landmark */}
              <div className="mt-4">
                <h3 className="text-2xl font-bold text-white tracking-wide">
                  {selectedTerritory.name}
                </h3>
                <div className="text-sm text-frontier-gold font-mono mt-0.5">
                  {selectedTerritory.subtitle}
                </div>
              </div>

              {/* Landmark illustration badge */}
              <div className="my-5 p-4 rounded-lg bg-slate-950/80 border border-slate-800/80 flex items-center gap-4">
                <div
                  className="w-12 h-12 rounded-lg border flex items-center justify-center flex-shrink-0"
                  style={{
                    backgroundColor: `${selectedTerritory.theme.accentColor}15`,
                    borderColor: `${selectedTerritory.theme.accentColor}50`,
                  }}
                >
                  <div
                    className="w-4 h-4 rounded-full animate-pulse"
                    style={{ backgroundColor: selectedTerritory.theme.accentColor }}
                  />
                </div>
                <div>
                  <div className="text-xs font-mono text-slate-400 uppercase">Civic Landmark</div>
                  <div className="text-sm font-semibold text-slate-200 mt-0.5">
                    {selectedTerritory.landmark}
                  </div>
                </div>
              </div>

              {/* Lore Description */}
              <p className="text-sm text-slate-300 leading-relaxed font-sans mt-3">
                {selectedTerritory.description}
              </p>

              {/* Mechanical Rules Breakdown */}
              <div className="mt-6 pt-4 border-t border-slate-800 space-y-2.5 font-mono text-xs">
                <div className="flex justify-between items-center py-1">
                  <span className="text-slate-400">Wallet Holding Limit:</span>
                  <span className="font-bold text-emerald-400 text-sm">
                    {selectedTerritory.walletCapPercent}% ({selectedTerritory.walletCapBps} bps)
                  </span>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span className="text-slate-400">Max Wallet FRNT:</span>
                  <span className="text-slate-200 font-semibold">
                    {((selectedTerritory.walletCapPercent / 100) * 1_000_000_000).toLocaleString()} FRNT
                  </span>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span className="text-slate-400">Threshold Required:</span>
                  <span className="text-amber-400 font-semibold">
                    {selectedTerritory.thresholdVolume === 0
                      ? "0 (Genesis)"
                      : `${selectedTerritory.thresholdVolume.toLocaleString()} FRNT`}
                  </span>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span className="text-slate-400">Enforcement Engine:</span>
                  <span className="text-slate-300 font-semibold">
                    Token-2022 Transfer Hook
                  </span>
                </div>
              </div>
            </div>

            {/* Status Footer */}
            <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between text-xs font-mono">
              <span className="text-slate-500">Frontier Status:</span>
              <span
                className={`font-semibold ${
                  selectedTerritory.current
                    ? "text-amber-400 animate-pulse"
                    : selectedTerritory.unlocked
                    ? "text-emerald-400"
                    : "text-slate-500"
                }`}
              >
                {selectedTerritory.current
                  ? "◆ ACTIVE EXPANSION"
                  : selectedTerritory.unlocked
                  ? "✓ CONSOLIDATED"
                  : "🔒 UNCLAIMED"}
              </span>
            </div>
          </div>
        </div>

        {/* The Boundary Defense Section inside World Map stage */}
        <div className="mt-10 pt-8 border-t border-frontier-border/60">
          <BoundaryDefense />
        </div>
      </div>
    </section>
  );
};
