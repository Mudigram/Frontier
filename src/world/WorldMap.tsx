"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import { useFrontier } from "@/context/FrontierContext";
import { getTerritoriesWithState, type TerritoryWithState } from "./chapters";
import { formatCompact } from "@/lib/format";
import { ConfidenceBadge } from "@/components/ui/ConfidenceBadge";

const WorldScene = dynamic(
  () => import("@/3d/WorldScene").then((mod) => mod.WorldScene),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-[450px] sm:h-[550px] rounded-2xl bg-gradient-to-b from-[#fef3c7]/60 via-[#fed7aa]/20 to-[#fdfaf3] border-2 border-frontier-ink flex flex-col items-center justify-center font-mono text-xs text-frontier-ink gap-3 shadow-pop-sm">
        <div className="w-8 h-8 rounded-full border-3 border-frontier-ink border-t-frontier-yellow animate-spin" />
        <span className="font-bold uppercase tracking-wider text-[11px]">Initializing 3D Archipelago...</span>
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

  // Update selected territory if currentChapter shifts and user was viewing active one
  React.useEffect(() => {
    const active = territories.find((t) => t.id === currentChapter);
    if (active) setSelectedTerritory(active);
  }, [currentChapter, territories]);

  return (
    <section id="world-map" className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-10">
      <div className="rounded-3xl bg-white border-3 border-frontier-ink p-6 sm:p-10 shadow-pop-lg relative overflow-hidden">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b-2 border-dashed border-slate-200 gap-4 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider bg-frontier-yellow text-frontier-ink border-2 border-frontier-ink shadow-pop-sm">
              🧭 3D ARCHIPELAGO
            </div>
            <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-frontier-ink mt-2 font-display">
              Frontier Expansion Archipelago
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-mono font-bold text-slate-500">3D TERRAIN ENGINE</span>
            <ConfidenceBadge source={chapter?.source.chapter ?? "configured"} size="sm" />
          </div>
        </div>

        {/* Main Map + Lore Split View */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative z-10">
          {/* Interactive 3D World Scene (7 cols) */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            <div className="rounded-2xl border-2 border-frontier-ink overflow-hidden shadow-pop-sm">
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
                    className={`p-2.5 rounded-xl border-2 border-frontier-ink text-center transition-all cursor-pointer ${
                      isSelected
                        ? "bg-frontier-yellow text-frontier-ink font-black shadow-pop-sm scale-105"
                        : isCurrent
                        ? "bg-frontier-coral text-white font-black shadow-pop-sm"
                        : t.unlocked
                        ? "bg-slate-100 text-slate-800 font-black hover:bg-slate-200"
                        : "bg-slate-50 text-slate-400 border-slate-300"
                    }`}
                  >
                    <div className="font-black text-sm">{t.roman}</div>
                    <div className="text-[10px] truncate uppercase font-black mt-0.5">{t.name}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Territory Lore & Mechanical Dossier (5 cols) */}
          <div className="lg:col-span-5 bg-frontier-bg border-2 border-frontier-ink rounded-2xl p-6 shadow-pop-sm relative flex flex-col justify-between min-h-[500px]">
            <div>
              {/* Card Header */}
              <div className="flex items-center justify-between border-b-2 border-dashed border-slate-200 pb-3">
                <span className="text-xs font-mono font-black tracking-wider text-frontier-coral uppercase">
                  📜 TERRITORY DOSSIER
                </span>
                <span
                  className={`text-xs font-mono font-black px-2.5 py-1 rounded-full border-2 border-frontier-ink shadow-pop-sm ${
                    selectedTerritory.current
                      ? "bg-frontier-coral text-white"
                      : selectedTerritory.unlocked
                      ? "bg-frontier-mint text-frontier-ink"
                      : "bg-slate-200 text-slate-600"
                  }`}
                >
                  CHAPTER {selectedTerritory.roman}
                </span>
              </div>

              {/* Territory Name & Landmark */}
              <div className="mt-4">
                <h3 className="text-2xl sm:text-3xl font-black text-frontier-ink tracking-tight font-display">
                  {selectedTerritory.name}
                </h3>
                <div className="text-xs text-frontier-coral font-black uppercase tracking-wider mt-1">
                  {selectedTerritory.subtitle}
                </div>
              </div>

              {/* Landmark illustration badge */}
              <div className="my-5 p-4 rounded-xl bg-white border-2 border-frontier-ink shadow-pop-sm flex items-center gap-4">
                <div
                  className="w-12 h-12 rounded-xl border-2 border-frontier-ink flex items-center justify-center flex-shrink-0 shadow-sm"
                  style={{
                    backgroundColor: `${selectedTerritory.theme.accentColor}25`,
                  }}
                >
                  <div
                    className="w-4 h-4 rounded-full animate-pulse"
                    style={{ backgroundColor: selectedTerritory.theme.accentColor }}
                  />
                </div>
                <div>
                  <div className="text-xs font-mono text-slate-500 uppercase font-bold">Civic Landmark</div>
                  <div className="text-sm font-black text-frontier-ink mt-0.5">
                    {selectedTerritory.landmark}
                  </div>
                </div>
              </div>

              {/* Lore Description */}
              <p className="text-sm text-slate-700 leading-relaxed font-sans mt-3 font-medium">
                {selectedTerritory.description}
              </p>

              {/* Mechanical Rules Breakdown */}
              <div className="mt-6 pt-4 border-t-2 border-dashed border-slate-200 space-y-2.5 font-mono text-xs">
                <div className="flex justify-between items-center py-1">
                  <span className="text-slate-600 font-bold">Wallet Holding Limit:</span>
                  <span className="font-black text-emerald-700 text-sm">
                    {selectedTerritory.walletCapPercent}% ({selectedTerritory.walletCapBps} bps)
                  </span>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span className="text-slate-600 font-bold">Max Wallet FRNT:</span>
                  <span className="text-frontier-ink font-bold">
                    {((selectedTerritory.walletCapPercent / 100) * 1_000_000_000).toLocaleString()} FRNT
                  </span>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span className="text-slate-600 font-bold">Threshold Required:</span>
                  <span className="text-amber-800 font-bold">
                    {selectedTerritory.thresholdVolume === 0
                      ? "0 (Genesis)"
                      : `${selectedTerritory.thresholdVolume.toLocaleString()} FRNT`}
                  </span>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span className="text-slate-600 font-bold">Enforcement Engine:</span>
                  <span className="text-frontier-ink font-bold">
                    Token-2022 Transfer Hook
                  </span>
                </div>
              </div>
            </div>

            {/* Status Footer */}
            <div className="mt-6 pt-4 border-t-2 border-dashed border-slate-200 flex items-center justify-between text-xs font-mono">
              <span className="text-slate-600 font-bold">Frontier Status:</span>
              <span
                className={`font-black ${
                  selectedTerritory.current
                    ? "text-frontier-coral"
                    : selectedTerritory.unlocked
                    ? "text-emerald-700"
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
      </div>
    </section>
  );
};
