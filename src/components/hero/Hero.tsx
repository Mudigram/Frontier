"use client";

import dynamic from "next/dynamic";
import { useFrontier } from "@/context/FrontierContext";
import { formatChapterProgress } from "@/chapter/progress";
import { getChapterName } from "@/chapter/events";
import { ConfidenceBadge } from "../ui/ConfidenceBadge";

const HeroScene = dynamic(
  () => import("@/3d/HeroScene").then((mod) => mod.HeroScene),
  { ssr: false }
);

export const Hero: React.FC = () => {
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
        nextThresholdFormatted: "9M",
        remainingFormatted: "2.13M",
        walletCapFormatted: "4%",
        volumeProgressString: "6.87M / 9M",
        remainingWithSymbol: "2.13M FRNT",
      };

  const currentName = chapter ? getChapterName(chapter.chapter) : "Settlement";

  return (
    <section className="relative w-full pt-8 pb-16 md:pt-14 md:pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
      {/* 2-Column Split: Tactical Left + Atmospheric 3D Showcase Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-12 items-center">
        
        {/* Left Column: Headlines, Architecture Identity, Live Progress */}
        <div className="lg:col-span-6 xl:col-span-6 flex flex-col items-start text-left z-10">
          
          {/* Subtle Protocol Pill */}
          <div className="mb-4 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/90 border border-slate-700/80 text-xs font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-slate-300 font-semibold tracking-wide">
              TOKEN-2022 TRANSFER HOOK OBSERVABILITY
            </span>
            <span className="text-slate-500 font-bold">|</span>
            <span className="text-frontier-gold font-bold">FRNT</span>
          </div>

          {/* Wordmark & Main Headline */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tight text-white font-display leading-[0.95]">
            FRONTIER
          </h1>

          {/* Subdued Gold/Amber Tagline */}
          <p className="mt-2 text-xl sm:text-2xl font-bold tracking-wide text-frontier-gold uppercase font-display">
            The World Expands By Chapter.
          </p>

          {/* Supporting Narrative */}
          <p className="mt-3 text-sm sm:text-base text-slate-400 max-w-lg leading-relaxed">
            Every qualifying volume milestone unlocks fresh territory on the 3D archipelago.
            Token-2022 transfer hooks actively govern wallet capacities as civilization ascends.
          </p>

          {/* Primary Command Console Live State Box */}
          <div className="mt-6 w-full max-w-xl p-5 sm:p-6 rounded-2xl bg-frontier-surface/90 border border-frontier-border backdrop-blur-md shadow-xl">
            {/* Card Header & Confidence */}
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono tracking-widest text-slate-400 uppercase">
                ACTIVE DOMAIN
              </span>
              {chapter && (
                <ConfidenceBadge source={chapter.source.chapter} size="sm" />
              )}
            </div>

            {/* Chapter Title Banner */}
            <div className="flex items-center gap-3 my-1">
              <span className="text-2xl sm:text-3xl font-black tracking-tight text-white font-mono">
                CHAPTER {display.chapterRoman}
              </span>
              <span className="text-slate-600 text-xl font-light">|</span>
              <span className="text-xl sm:text-2xl font-bold tracking-wider text-frontier-gold uppercase font-mono">
                {currentName}
              </span>
            </div>

            {/* Progress Percent Callout with Sleek Bar */}
            <div className="mt-4 pt-4 border-t border-slate-800">
              <div className="flex items-baseline justify-between mb-2">
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl sm:text-4xl font-black text-amber-400 font-mono tracking-tight">
                    {Math.round(chapter ? chapter.progressPercent : 76)}%
                  </span>
                  <span className="text-xs uppercase tracking-wider font-mono text-slate-500">
                    COMPLETE
                  </span>
                </div>
                <span className="text-xs font-mono text-slate-400">
                  {display.remainingWithSymbol} TO NEXT UNLOCK
                </span>
              </div>

              {/* Sleek Progress Bar */}
              <div className="w-full h-3 rounded-full bg-slate-900 border border-slate-800 overflow-hidden p-0.5">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-amber-600 via-amber-400 to-amber-300 transition-all duration-700 shadow-[0_0_10px_rgba(245,158,11,0.3)]"
                  style={{
                    width: `${Math.min(
                      100,
                      Math.max(5, chapter ? chapter.progressPercent : 76)
                    )}%`,
                  }}
                />
              </div>

              <div className="w-full flex justify-between items-center text-[11px] font-mono text-slate-500 mt-2">
                <span>VOL: {display.volumeProgressString}</span>
                <span>CEILING: {display.walletCapFormatted}</span>
              </div>
            </div>
          </div>

          {/* Tactical Action Buttons Group */}
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <a href="#world-map" className="btn-gold !text-xs !py-2.5 !px-5">
              <span>EXPLORE 3D ARCHIPELAGO</span>
              <span>🧭</span>
            </a>
            <a href="#pioneer-pass" className="btn-tactical !text-xs !py-2.5 !px-5">
              <span>PIONEER TERRITORY PASS</span>
              <span>🪪</span>
            </a>
            <a href="#observatory" className="btn-tactical !text-xs !py-2.5 !px-4">
              <span>HOOK RADAR</span>
              <span>⚡</span>
            </a>
          </div>
        </div>

        {/* Right Column: 3D Floating Island Canvas Spotlight */}
        <div className="lg:col-span-6 xl:col-span-6 relative flex items-center justify-center">
          <div className="relative w-full h-[460px] sm:h-[520px] lg:h-[560px] rounded-2xl bg-gradient-to-b from-slate-950/80 via-slate-900/60 to-frontier-bg border border-slate-800/80 shadow-2xl overflow-hidden flex items-center justify-center">
            
            {/* 3D Scene Viewport */}
            <HeroScene className="w-full h-full cursor-grab active:cursor-grabbing" />

            {/* Tactical Corner Overlays */}
            <div className="absolute top-4 left-4 z-20 px-2.5 py-1 rounded bg-slate-900/80 border border-slate-800 text-[11px] font-mono text-slate-300 flex items-center gap-2 pointer-events-none backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              <span>ACTIVE SETTLEMENT BIOME</span>
            </div>

            <div className="absolute top-4 right-4 z-20 px-2.5 py-1 rounded bg-slate-900/80 border border-slate-800 text-[11px] font-mono text-slate-400 flex items-center gap-1.5 pointer-events-none backdrop-blur-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>HOOK ONLINE</span>
            </div>

            <div className="absolute bottom-4 left-4 z-20 px-2.5 py-1 rounded bg-slate-900/80 border border-slate-800 text-[11px] font-mono text-frontier-gold pointer-events-none backdrop-blur-sm">
              <span>CHAPTER II DIORAMA</span>
            </div>

            <div className="absolute bottom-4 right-4 z-20 px-2.5 py-1 rounded bg-slate-900/80 border border-slate-800 text-[10px] font-mono text-slate-500 pointer-events-none backdrop-blur-sm">
              <span>Drag to rotate</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
