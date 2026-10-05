"use client";

import React from "react";
import { useFrontier } from "@/context/FrontierContext";
import { formatChapterProgress } from "@/chapter/progress";
import { getChapterName } from "@/chapter/events";
import { ProgressBar } from "../ui/ProgressBar";
import { ConfidenceBadge } from "../ui/ConfidenceBadge";

export const ChapterProgress: React.FC = () => {
  const { chapter } = useFrontier();

  const display = chapter
    ? formatChapterProgress(chapter)
    : {
        chapterRoman: "II",
        chapterNumber: 2,
        progressFormatted: "76.3%",
        progressFraction: 0.763,
        statusLine: "76% TO NEXT CHAPTER",
        volumeFormatted: "6.87M",
        nextThresholdFormatted: "9.00M",
        remainingFormatted: "2.13M",
        walletCapFormatted: "4%",
        volumeProgressString: "6.87M / 9.00M",
        remainingWithSymbol: "2.13M FRNT",
      };

  const currentName = chapter ? getChapterName(chapter.chapter) : "Settlement";

  return (
    <section id="progress" className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-10">
      <div className="rounded-3xl bg-white border-3 border-frontier-ink p-6 sm:p-10 shadow-pop-lg">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b-2 border-dashed border-slate-200 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider bg-frontier-yellow text-frontier-ink border-2 border-frontier-ink shadow-pop-sm">
              ⚡ PROGRESSION ENGINE
            </div>
            <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-frontier-ink mt-2 font-display">
              Chapter Status & Allowance
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-mono font-bold text-slate-500">STATE CONFIDENCE</span>
            {chapter && (
              <ConfidenceBadge source={chapter.source.chapter} size="md" />
            )}
          </div>
        </div>

        {/* The Progression Chain diagram: VOLUME → CHAPTER → WALLET LIMIT → WORLD STATE */}
        <div className="my-8 p-4 sm:p-5 rounded-2xl bg-frontier-bg border-2 border-frontier-ink shadow-pop-sm flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
          <div className="flex items-center gap-2">
            <span className="w-7 h-7 rounded-xl bg-frontier-yellow text-frontier-ink border-2 border-frontier-ink flex items-center justify-center font-black shadow-pop-sm">1</span>
            <span className="text-frontier-ink font-black">VOLUME</span>
          </div>
          <span className="text-frontier-coral font-black text-base">→</span>
          <div className="flex items-center gap-2">
            <span className="w-7 h-7 rounded-xl bg-frontier-tangerine text-frontier-ink border-2 border-frontier-ink flex items-center justify-center font-black shadow-pop-sm">2</span>
            <span className="text-frontier-ink font-black">CHAPTER</span>
          </div>
          <span className="text-frontier-coral font-black text-base">→</span>
          <div className="flex items-center gap-2">
            <span className="w-7 h-7 rounded-xl bg-frontier-mint text-frontier-ink border-2 border-frontier-ink flex items-center justify-center font-black shadow-pop-sm">3</span>
            <span className="text-frontier-ink font-black">WALLET LIMIT</span>
          </div>
          <span className="text-frontier-coral font-black text-base">→</span>
          <div className="flex items-center gap-2">
            <span className="w-7 h-7 rounded-xl bg-frontier-coral text-white border-2 border-frontier-ink flex items-center justify-center font-black shadow-pop-sm">4</span>
            <span className="text-frontier-ink font-black">WORLD MAP</span>
          </div>
        </div>

        {/* Primary Progression Metrics Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 my-8">
          {/* Chapter */}
          <div className="p-5 rounded-2xl bg-frontier-bg border-2 border-frontier-ink shadow-pop-sm flex flex-col justify-between hover:translate-y-[-2px] transition-transform">
            <div className="flex items-center justify-between text-[11px] font-mono font-bold text-slate-500">
              <span>CURRENT CHAPTER</span>
              <ConfidenceBadge source={chapter?.source.chapter ?? "configured"} size="sm" />
            </div>
            <div className="mt-4">
              <div className="text-3xl sm:text-4xl font-black text-frontier-coral font-display">
                {display.chapterRoman}
              </div>
              <div className="text-xs uppercase font-black text-frontier-ink tracking-wider mt-1">
                {currentName}
              </div>
            </div>
          </div>

          {/* Wallet Limit */}
          <div className="p-5 rounded-2xl bg-frontier-bg border-2 border-frontier-ink shadow-pop-sm flex flex-col justify-between hover:translate-y-[-2px] transition-transform">
            <div className="flex items-center justify-between text-[11px] font-mono font-bold text-slate-500">
              <span>WALLET CAP</span>
              <ConfidenceBadge source={chapter?.source.walletCap ?? "configured"} size="sm" />
            </div>
            <div className="mt-4">
              <div className="text-3xl sm:text-4xl font-black text-emerald-600 font-display">
                {display.walletCapFormatted}
              </div>
              <div className="text-xs font-bold text-slate-500 mt-1">
                Max of 1B Supply
              </div>
            </div>
          </div>

          {/* Observed Volume */}
          <div className="p-5 rounded-2xl bg-frontier-bg border-2 border-frontier-ink shadow-pop-sm flex flex-col justify-between hover:translate-y-[-2px] transition-transform">
            <div className="flex items-center justify-between text-[11px] font-mono font-bold text-slate-500">
              <span>VOLUME TRADED</span>
              <ConfidenceBadge source={chapter?.source.volume ?? "configured"} size="sm" />
            </div>
            <div className="mt-4">
              <div className="text-3xl sm:text-4xl font-black text-frontier-ink font-display">
                {display.volumeFormatted}
              </div>
              <div className="text-xs font-bold text-slate-500 mt-1">
                Target: {display.nextThresholdFormatted}
              </div>
            </div>
          </div>

          {/* Remaining Volume */}
          <div className="p-5 rounded-2xl bg-frontier-bg border-2 border-frontier-ink shadow-pop-sm flex flex-col justify-between hover:translate-y-[-2px] transition-transform">
            <div className="flex items-center justify-between text-[11px] font-mono font-bold text-slate-500">
              <span>REMAINING</span>
              <ConfidenceBadge source={chapter?.source.volume ?? "configured"} size="sm" />
            </div>
            <div className="mt-4">
              <div className="text-3xl sm:text-4xl font-black text-frontier-coral font-display">
                {display.remainingFormatted}
              </div>
              <div className="text-xs font-bold text-slate-500 mt-1">
                To Chapter {chapter ? chapter.chapter + 1 : 3} 🎯
              </div>
            </div>
          </div>
        </div>

        {/* Progress Bar Callout */}
        <div className="mt-8 pt-8 border-t-2 border-dashed border-slate-200">
          <div className="flex items-center justify-between mb-3 text-xs sm:text-sm font-mono">
            <span className="text-slate-600 font-bold">
              Progress to Next Territory:
            </span>
            <span className="text-frontier-coral font-black">
              {display.volumeProgressString} FRNT ({display.progressFormatted})
            </span>
          </div>

          <ProgressBar
            progressPercent={chapter ? chapter.progressPercent : 76.3}
            heightClass="h-4"
          />

          <div className="mt-4 flex items-center justify-between text-xs text-slate-600 font-mono font-bold">
            <span>
              Threshold step: 3,000,000 FRNT per Chapter
            </span>
            <span className="text-frontier-coral">
              {display.remainingWithSymbol} remaining
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
