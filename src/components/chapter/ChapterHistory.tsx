"use client";

import React, { useState, useMemo } from "react";
import dynamic from "next/dynamic";
import { useFrontier } from "@/context/FrontierContext";
import { getChapterName } from "@/chapter/events";
import { formatTimeUTC } from "@/lib/format";
import { toRoman } from "@/lib/constants";
import { ConfidenceBadge } from "../ui/ConfidenceBadge";

const HistoryEpochDiorama = dynamic(
  () =>
    import("@/3d/village/HistoryEpochDiorama").then((mod) => mod.HistoryEpochDiorama),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full min-h-[380px] flex flex-col items-center justify-center font-mono text-xs text-slate-400 gap-2">
        <div className="w-6 h-6 rounded-full border-2 border-slate-700 border-t-amber-400 animate-spin" />
        <span className="font-semibold text-[11px] uppercase tracking-wider">Awakening Epoch Time-Machine...</span>
      </div>
    ),
  }
);

export const ChapterHistory: React.FC = () => {
  const { chapter } = useFrontier();
  const currentChapter = chapter ? chapter.chapter : 2;
  const [selectedChapter, setSelectedChapter] = useState<number>(currentChapter);

  // Synchronize when currentChapter loads
  React.useEffect(() => {
    setSelectedChapter(currentChapter);
  }, [currentChapter]);

  // Build the chronological milestone history for all chapters (0 to 4)
  const historyItems = useMemo(() => {
    const items = [];
    const now = Math.floor(Date.now() / 1000);

    for (let c = 4; c >= 0; c--) {
      const name = getChapterName(c);
      const isGenesis = c === 0;
      const isReached = c <= currentChapter;
      const isCurrent = c === currentChapter;

      const timeOffset = isGenesis ? 28800 : (currentChapter - c) * 7200 + 1800;
      const timestamp = now - timeOffset;

      items.push({
        chapter: c,
        roman: toRoman(c),
        name,
        isGenesis,
        isReached,
        isCurrent,
        timestamp,
        timeFormatted: isGenesis
          ? "Genesis Foundation"
          : isReached
          ? `Reached ${formatTimeUTC(timestamp)}`
          : "Locked Territory",
        volumeThreshold: c * 3_000_000,
        source: chapter?.source.chapter ?? "configured",
      });
    }

    return items;
  }, [currentChapter, chapter]);

  const selectedItem = historyItems.find((i) => i.chapter === selectedChapter) ?? historyItems[0];

  return (
    <section id="history" className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-10">
      <div className="rounded-2xl bg-frontier-surface/90 border border-frontier-border p-6 sm:p-10 backdrop-blur-md shadow-xl">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-800 gap-4">
          <div>
            <div className="text-xs uppercase font-mono tracking-[0.25em] text-slate-400">
              Chronological Architecture
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mt-1">
              Chapter Chronicle & Evolution
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-slate-400">EPOCH SOURCE</span>
            <ConfidenceBadge source={chapter?.source.chapter ?? "configured"} size="sm" />
          </div>
        </div>

        {/* Quick Epoch Selector Pills */}
        <div className="mt-6 flex items-center overflow-x-auto pb-1 sm:pb-0 gap-2 font-mono text-xs scrollbar-none -mx-1 px-1">
          <span className="text-slate-400 mr-1 text-[11px] whitespace-nowrap hidden sm:inline">Select Epoch:</span>
          {[0, 1, 2, 3, 4].map((c) => {
            const isSelected = selectedChapter === c;
            const isCurrent = currentChapter === c;
            const isUnlocked = c <= currentChapter;

            return (
              <button
                key={c}
                onClick={() => setSelectedChapter(c)}
                className={`px-3 py-2 rounded-lg border font-mono transition-all cursor-pointer whitespace-nowrap min-h-[42px] flex items-center justify-center gap-1.5 ${
                  isSelected
                    ? "bg-slate-800 border-frontier-gold text-frontier-gold shadow-sm"
                    : isCurrent
                    ? "bg-amber-950/40 border-amber-600/60 text-amber-300"
                    : isUnlocked
                    ? "bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700"
                    : "bg-slate-950/40 border-slate-900 text-slate-600"
                }`}
              >
                <span>Ch {toRoman(c)}: {getChapterName(c)}</span>
                <span className="text-xs">{isCurrent ? "⚡" : isUnlocked ? "✓" : "🔒"}</span>
              </button>
            );
          })}
        </div>

        {/* Split View: 3D Epoch Time-Machine + Chronicle List */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* 3D Epoch Viewport (6 cols) */}
          <div className="lg:col-span-6 flex flex-col gap-4">
            <div className="w-full h-[400px] sm:h-[440px] rounded-xl border border-slate-800 bg-gradient-to-b from-slate-950/80 via-slate-900/60 to-frontier-bg shadow-inner overflow-hidden relative">
              <HistoryEpochDiorama
                selectedChapter={selectedChapter}
                currentChapter={currentChapter}
              />
            </div>

            {/* Epoch Descriptor Card */}
            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800/80 font-mono text-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-white text-sm">
                  Chapter {toRoman(selectedChapter)}: {getChapterName(selectedChapter)}
                </span>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded border ${
                    selectedChapter === currentChapter
                      ? "bg-amber-950/60 text-amber-300 border-amber-600/60"
                      : selectedChapter < currentChapter
                      ? "bg-emerald-950/60 text-emerald-300 border-emerald-600/60"
                      : "bg-slate-900 text-slate-500 border-slate-800"
                  }`}
                >
                  {selectedChapter === currentChapter
                    ? "ACTIVE NOW"
                    : selectedChapter < currentChapter
                    ? "CONSOLIDATED"
                    : "LOCKED HORIZON"}
                </span>
              </div>
              <p className="font-sans text-xs text-slate-300 leading-relaxed">
                {selectedChapter === 0
                  ? "A signal fire in the void. Surveyors erect founding palisades with strict 1% wallet ceiling."
                  : selectedChapter === 1
                  ? "The boundary is pushed outward. First trading routes open and wallet capacity doubles to 2%."
                  : selectedChapter === 2
                  ? "Roots take hold. Stone well and market stalls rise as wallet capacity widens to 4%."
                  : selectedChapter === 3
                  ? "High stone ramparts and bastion towers protect deep liquidity up to 8% per wallet."
                  : "Sovereign golden spire crowned. Frontier civilization reaches full maturity with a 16% wallet allowance."}
              </p>
            </div>
          </div>

          {/* Timeline List (6 cols) */}
          <div className="lg:col-span-6 relative pl-6 sm:pl-8 border-l border-slate-800 space-y-4">
            {historyItems.map((item) => {
              const isSelected = selectedChapter === item.chapter;

              return (
                <div
                  key={item.chapter}
                  onClick={() => setSelectedChapter(item.chapter)}
                  className={`relative group cursor-pointer p-3.5 rounded-xl transition-all border ${
                    isSelected
                      ? "bg-slate-800/90 border-frontier-gold/80 shadow-md"
                      : "bg-slate-950/60 border-slate-800/80 hover:border-slate-700"
                  }`}
                >
                  {/* Indicator Dot on Timeline */}
                  <div
                    className={`absolute -left-[31px] sm:-left-[39px] top-4 w-3.5 h-3.5 rounded-full border-2 transition-all ${
                      item.isCurrent
                        ? "bg-amber-400 border-amber-300 shadow-[0_0_8px_rgba(245,158,11,0.6)]"
                        : item.isReached
                        ? "bg-emerald-500 border-emerald-400"
                        : "bg-slate-950 border-slate-700"
                    }`}
                  />

                  <div className="flex items-center justify-between font-mono text-xs">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white text-sm">
                        Chapter {item.roman}: {item.name}
                      </span>
                      {item.isCurrent && (
                        <span className="px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 text-[10px] font-bold border border-amber-500/40">
                          ACTIVE
                        </span>
                      )}
                    </div>
                    <span className="text-slate-400 text-[11px]">{item.timeFormatted}</span>
                  </div>

                  <div className="mt-2 text-xs font-mono text-slate-400 flex items-center justify-between">
                    <span>Threshold: {item.volumeThreshold === 0 ? "Genesis" : `${(item.volumeThreshold / 1_000_000).toFixed(0)}M FRNT Vol`}</span>
                    <ConfidenceBadge source={item.source} size="sm" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
