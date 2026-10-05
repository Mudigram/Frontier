"use client";

import React, { useState, useMemo } from "react";
import dynamic from "next/dynamic";
import { useFrontier } from "@/context/FrontierContext";
import { getChapterName } from "@/chapter/events";
import { formatTimeUTC, formatCompact } from "@/lib/format";
import { toRoman } from "@/lib/constants";
import { ConfidenceBadge } from "../ui/ConfidenceBadge";

const HistoryEpochDiorama = dynamic(
  () =>
    import("@/3d/village/HistoryEpochDiorama").then((mod) => mod.HistoryEpochDiorama),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full min-h-[380px] flex flex-col items-center justify-center font-mono text-xs text-frontier-ink gap-2">
        <div className="w-8 h-8 rounded-full border-3 border-frontier-ink border-t-frontier-lavender animate-spin" />
        <span className="font-bold text-[11px] uppercase tracking-wider">Awakening Epoch Time-Machine...</span>
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

      // Realistic mock timeline offsets for demonstration
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
      <div className="rounded-3xl bg-white border-3 border-frontier-ink p-6 sm:p-10 shadow-pop-lg">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b-2 border-dashed border-slate-200 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider bg-frontier-lavender text-frontier-ink border-2 border-frontier-ink shadow-pop-sm">
              📜 3D TIME-MACHINE
            </div>
            <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-frontier-ink mt-2 font-display">
              Chapter Chronicle & Evolution
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-mono font-bold text-slate-500">EPOCH SOURCE</span>
            <ConfidenceBadge source={chapter?.source.chapter ?? "configured"} size="sm" />
          </div>
        </div>

        {/* Quick Epoch Selector Pills */}
        <div className="mt-6 flex flex-wrap items-center gap-2 font-mono text-xs">
          <span className="font-bold text-frontier-ink mr-1">Select Epoch:</span>
          {[0, 1, 2, 3, 4].map((c) => {
            const isSelected = selectedChapter === c;
            const isCurrent = currentChapter === c;
            const isUnlocked = c <= currentChapter;

            return (
              <button
                key={c}
                onClick={() => setSelectedChapter(c)}
                className={`px-3 py-1.5 rounded-xl border-2 border-frontier-ink font-black transition-all cursor-pointer ${
                  isSelected
                    ? "bg-frontier-lavender text-frontier-ink shadow-pop-sm scale-105"
                    : isCurrent
                    ? "bg-frontier-yellow text-frontier-ink"
                    : isUnlocked
                    ? "bg-slate-100 hover:bg-slate-200 text-slate-700"
                    : "bg-slate-50 text-slate-400 border-slate-300"
                }`}
              >
                Chapter {toRoman(c)}: {getChapterName(c)} {isCurrent ? "⚡" : isUnlocked ? "✓" : "🔒"}
              </button>
            );
          })}
        </div>

        {/* Split View: 3D Epoch Time-Machine + Chronicle List */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* 3D Epoch Viewport (6 cols) */}
          <div className="lg:col-span-6 flex flex-col gap-4">
            <div className="w-full h-[400px] sm:h-[440px] rounded-2xl border-2 border-frontier-ink bg-gradient-to-b from-[#fef08a]/20 via-[#fed7aa]/20 to-[#faf8f5] shadow-pop-sm overflow-hidden relative">
              <HistoryEpochDiorama
                selectedChapter={selectedChapter}
                currentChapter={currentChapter}
              />
            </div>

            {/* Epoch Descriptor Card */}
            <div className="p-4 rounded-2xl bg-frontier-bg border-2 border-frontier-ink shadow-pop-sm font-mono text-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-black text-frontier-ink text-sm">
                  Chapter {toRoman(selectedChapter)}: {getChapterName(selectedChapter)}
                </span>
                <span
                  className={`text-[10px] font-black px-2 py-0.5 rounded-full border border-frontier-ink ${
                    selectedChapter === currentChapter
                      ? "bg-frontier-coral text-white"
                      : selectedChapter < currentChapter
                      ? "bg-frontier-mint text-frontier-ink"
                      : "bg-slate-200 text-slate-600"
                  }`}
                >
                  {selectedChapter === currentChapter
                    ? "ACTIVE NOW"
                    : selectedChapter < currentChapter
                    ? "CONSOLIDATED"
                    : "LOCKED HORIZON"}
                </span>
              </div>
              <p className="font-sans text-xs text-slate-600 font-medium">
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
          <div className="lg:col-span-6 relative pl-6 sm:pl-8 border-l-3 border-frontier-ink space-y-6">
            {historyItems.map((item) => {
              const isSelected = selectedChapter === item.chapter;

              return (
                <div
                  key={item.chapter}
                  onClick={() => setSelectedChapter(item.chapter)}
                  className={`relative group cursor-pointer p-3 rounded-xl transition-all border-2 ${
                    isSelected
                      ? "bg-frontier-lavender/30 border-frontier-ink shadow-pop-sm"
                      : "bg-white hover:bg-slate-50 border-transparent"
                  }`}
                >
                  {/* Node dot on the timeline */}
                  <div
                    className={`absolute -left-[37px] sm:-left-[45px] top-4 w-5 h-5 rounded-full border-2 border-frontier-ink transition-all ${
                      item.isCurrent
                        ? "bg-frontier-yellow shadow-pop-sm scale-110"
                        : item.isReached
                        ? "bg-frontier-mint"
                        : "bg-slate-200"
                    }`}
                  />

                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 sm:gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-base font-black text-frontier-ink font-display">
                          Chapter {item.roman}
                        </span>
                        <span className="text-frontier-coral font-black">✦</span>
                        <span className="text-sm font-black text-frontier-coral uppercase font-display">
                          {item.name}
                        </span>
                        {item.isCurrent && (
                          <span className="text-[10px] uppercase font-mono font-black px-2 py-0.5 rounded-full bg-frontier-coral text-white border border-frontier-ink">
                            ACTIVE ⚡
                          </span>
                        )}
                      </div>

                      <div className="text-xs text-slate-600 font-medium mt-1">
                        {item.isGenesis
                          ? "Genesis foundation • Outpost erected"
                          : `Milestone threshold: ${formatCompact(item.volumeThreshold)} FRNT`}
                      </div>
                    </div>

                    <div className="text-xs font-mono text-slate-500 font-medium sm:text-right mt-1 sm:mt-0 flex sm:flex-col sm:items-end">
                      <span className="font-black text-frontier-ink">{item.timeFormatted}</span>
                      <span className="text-[10px] text-slate-400">
                        {item.isGenesis ? "Slot 0" : `Req: ${formatCompact(item.volumeThreshold)}`}
                      </span>
                    </div>
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
