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
    <section id="progress" className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-8">
      <div className="rounded-2xl bg-frontier-surface/90 border border-frontier-border p-6 sm:p-10 backdrop-blur-md shadow-xl">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-800 gap-4">
          <div>
            <div className="text-xs uppercase font-mono tracking-[0.25em] text-slate-400">
              State Engine Progression
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mt-1">
              Chapter Status & Allowance
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-slate-400">STATE CONFIDENCE</span>
            {chapter && (
              <ConfidenceBadge source={chapter.source.chapter} size="sm" />
            )}
          </div>
        </div>

        {/* The Progression Chain: VOLUME → CHAPTER → WALLET LIMIT → WORLD MAP */}
        <div className="my-6 p-4 rounded-xl bg-slate-950/80 border border-slate-800/80 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded bg-slate-800 text-slate-300 flex items-center justify-center font-bold">1</span>
            <span className="text-slate-300">VOLUME ACCUMULATION</span>
          </div>
          <span className="text-slate-600">→</span>
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded bg-slate-800 text-amber-400 flex items-center justify-center font-bold">2</span>
            <span className="text-slate-300">CHAPTER UNLOCK</span>
          </div>
          <span className="text-slate-600">→</span>
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded bg-slate-800 text-emerald-400 flex items-center justify-center font-bold">3</span>
            <span className="text-slate-300">HOOK WALLET LIMIT</span>
          </div>
          <span className="text-slate-600">→</span>
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded bg-slate-800 text-sky-400 flex items-center justify-center font-bold">4</span>
            <span className="text-slate-300">3D ARCHIPELAGO</span>
          </div>
        </div>

        {/* Primary Progression Metrics Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 my-6">
          {/* Chapter */}
          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 flex flex-col justify-between">
            <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
              <span>CURRENT CHAPTER</span>
              <ConfidenceBadge source={chapter?.source.chapter ?? "configured"} size="sm" />
            </div>
            <div className="mt-3">
              <div className="text-3xl font-bold font-mono text-amber-400">
                {display.chapterRoman}
              </div>
              <div className="text-xs uppercase font-mono text-slate-300 tracking-wider mt-1">
                {currentName}
              </div>
            </div>
          </div>

          {/* Wallet Limit */}
          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 flex flex-col justify-between">
            <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
              <span>WALLET CAP</span>
              <ConfidenceBadge source={chapter?.source.walletCap ?? "configured"} size="sm" />
            </div>
            <div className="mt-3">
              <div className="text-3xl font-bold font-mono text-emerald-400">
                {display.walletCapFormatted}
              </div>
              <div className="text-xs text-slate-400 font-mono mt-1">
                Max of 1B Supply
              </div>
            </div>
          </div>

          {/* Observed Volume */}
          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 flex flex-col justify-between">
            <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
              <span>VOLUME TRADED</span>
              <ConfidenceBadge source={chapter?.source.volume ?? "configured"} size="sm" />
            </div>
            <div className="mt-3">
              <div className="text-3xl font-bold font-mono text-white">
                {display.volumeFormatted}
              </div>
              <div className="text-xs text-slate-400 font-mono mt-1">
                Target: {display.nextThresholdFormatted}
              </div>
            </div>
          </div>

          {/* Remaining Volume */}
          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 flex flex-col justify-between">
            <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
              <span>REMAINING</span>
              <ConfidenceBadge source={chapter?.source.volume ?? "configured"} size="sm" />
            </div>
            <div className="mt-3">
              <div className="text-3xl font-bold font-mono text-amber-400">
                {display.remainingFormatted}
              </div>
              <div className="text-xs text-slate-400 font-mono mt-1">
                To Chapter {chapter ? chapter.chapter + 1 : 3}
              </div>
            </div>
          </div>
        </div>

        {/* Progress Bar Callout */}
        <div className="mt-6 pt-6 border-t border-slate-800">
          <div className="flex items-center justify-between mb-2 text-xs font-mono">
            <span className="text-slate-400">
              Progress to Next Territory:
            </span>
            <span className="text-amber-400 font-semibold">
              {display.volumeProgressString} FRNT ({display.progressFormatted})
            </span>
          </div>

          <ProgressBar
            progressPercent={chapter ? chapter.progressPercent : 76.3}
            heightClass="h-2.5"
          />

          <div className="mt-3 flex items-center justify-between text-[11px] text-slate-500 font-mono">
            <span>
              Threshold step: 3,000,000 FRNT per Chapter
            </span>
            <span className="text-slate-400">
              {display.remainingWithSymbol} remaining
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
