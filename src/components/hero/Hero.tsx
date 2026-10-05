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
    <section className="relative w-full pt-6 pb-16 md:pt-10 md:pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
      {/* 2-Column Left & Right Split Layout (Polyfarm / Summer / Mogo reference) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 xl:gap-12 items-center">
        
        {/* Left Column: Headlines, Narrative, Progress Card & Action CTAs */}
        <div className="lg:col-span-7 xl:col-span-7 flex flex-col items-start text-left z-10">
          
          {/* Eyebrow Sticker Badge */}
          <div className="mb-3 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-frontier-yellow text-frontier-ink border-2 border-frontier-ink shadow-pop-sm rotate-[-1.5deg] hover:rotate-0 transition-transform">
            <span className="w-2 h-2 rounded-full bg-frontier-coral animate-ping" />
            <span className="text-xs font-black uppercase tracking-wider font-display">
              ⚔️ Chapter Wars is Live
            </span>
            <span className="text-[11px] font-mono bg-frontier-ink text-white px-2 py-0.5 rounded-full font-bold">
              $FRNT
            </span>
          </div>

          {/* Wordmark & Main Headline */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-7xl xl:text-8xl font-black tracking-tight text-frontier-ink font-display leading-[0.95]">
            FRONTIER
          </h1>

          {/* Saturated Coral Tagline (Replaced Dark Blue) */}
          <p className="mt-2 text-xl sm:text-2xl lg:text-3xl font-black tracking-wide text-frontier-coral uppercase font-display">
            The World Expands By Chapter.
          </p>

          {/* Supporting Narrative */}
          <p className="mt-3 text-sm sm:text-base text-slate-700 font-bold max-w-xl leading-relaxed">
            Every on-chain volume milestone unlocks fresh territory on the 3D archipelago.
            Back the world, conquer chapters, and claim your share of the visual frontier.
          </p>

          {/* Primary Neo-Pop Live State Box */}
          <div className="mt-6 w-full max-w-xl p-5 sm:p-6 rounded-3xl bg-white border-3 border-frontier-ink shadow-pop-lg relative">
            {/* Card Header & Confidence */}
            <div className="flex items-center justify-between mb-3">
              <span className="px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider bg-frontier-yellow text-frontier-ink border-2 border-frontier-ink shadow-pop-sm">
                🗺️ ACTIVE TERRITORY
              </span>
              {chapter && (
                <ConfidenceBadge source={chapter.source.chapter} size="sm" />
              )}
            </div>

            {/* Chapter Title Banner */}
            <div className="flex items-center gap-3 my-1">
              <span className="text-2xl sm:text-3xl font-black tracking-tight text-frontier-ink font-display">
                CHAPTER {display.chapterRoman}
              </span>
              <span className="text-frontier-coral text-2xl font-black">✦</span>
              <span className="text-xl sm:text-2xl font-black tracking-tight text-frontier-coral uppercase font-display">
                {currentName}
              </span>
            </div>

            {/* Progress Percent Callout with Candy Stripe Meter */}
            <div className="mt-4 pt-4 border-t-2 border-dashed border-slate-200">
              <div className="flex items-baseline justify-between mb-1.5">
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl sm:text-5xl font-black text-frontier-ink font-display tracking-tight">
                    {Math.round(chapter ? chapter.progressPercent : 76)}%
                  </span>
                  <span className="text-xs uppercase tracking-wider font-black text-slate-500 font-display">
                    COMPLETE
                  </span>
                </div>
                <span className="text-xs font-mono font-black text-frontier-coral">
                  {display.remainingWithSymbol} TO NEXT UNLOCK
                </span>
              </div>

              {/* Candy-striped progress bar */}
              <div className="w-full h-4 sm:h-5 rounded-full bg-slate-100 border-2 border-frontier-ink overflow-hidden p-0.5 shadow-inner">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-frontier-yellow via-frontier-tangerine to-frontier-coral candy-stripe transition-all duration-700"
                  style={{
                    width: `${Math.min(
                      100,
                      Math.max(5, chapter ? chapter.progressPercent : 76)
                    )}%`,
                  }}
                />
              </div>

              <div className="w-full flex justify-between items-center text-[11px] font-mono font-black text-slate-500 mt-2 px-0.5">
                <span>QUALIFYING VOLUME: {display.volumeProgressString}</span>
                <span>TARGET: {display.nextThresholdFormatted} FRNT</span>
              </div>
            </div>
          </div>

          {/* Tactile Arcade Action Buttons Group */}
          <div className="mt-6 flex flex-wrap items-center gap-3.5">
            <a href="#progress" className="btn-pop-yellow !text-sm !py-3 !px-6">
              <span>ENTER WAR ROOM</span>
              <span className="text-base">⚔️</span>
            </a>
            <a href="#world-map" className="btn-pop-white !text-sm !py-3 !px-6">
              <span>EXPLORE 3D MAP</span>
              <span className="text-base">🧭</span>
            </a>
            <a href="#activity" className="btn-pop-coral !text-sm !py-3 !px-5">
              <span>LIVE TRANSFERS</span>
              <span className="text-base">⚡</span>
            </a>
          </div>
        </div>

        {/* Right Column: 3D Floating Island Canvas in Framed Neo-Pop Showcase Viewport */}
        <div className="lg:col-span-5 xl:col-span-5 relative flex items-center justify-center">
          <div className="relative w-full h-[460px] sm:h-[520px] lg:h-[580px] rounded-3xl bg-gradient-to-b from-[#fef08a]/35 via-[#fed7aa]/25 to-[#faf8f5] border-3 border-frontier-ink shadow-pop-lg overflow-hidden flex items-center justify-center">
            
            {/* 3D Scene Viewport */}
            <HeroScene className="w-full h-full cursor-grab active:cursor-grabbing" />

            {/* Neo-Pop Floating Sticker Badges (Polyfarm / Mogo aesthetic) */}
            <div className="absolute top-4 left-4 z-20 px-3 py-1.5 rounded-2xl bg-frontier-yellow text-frontier-ink border-2 border-frontier-ink shadow-pop-sm rotate-[-3deg] text-xs font-black uppercase font-display flex items-center gap-1.5 pointer-events-none">
              <span>💎 $FRNT PROTOCOL</span>
            </div>

            <div className="absolute top-4 right-4 z-20 px-3 py-1.5 rounded-2xl bg-white text-frontier-ink border-2 border-frontier-ink shadow-pop-sm rotate-[2deg] text-xs font-black uppercase font-display flex items-center gap-1.5 pointer-events-none">
              <span className="w-2 h-2 rounded-full bg-frontier-mint animate-pulse" />
              <span>TOKEN-2022</span>
            </div>

            <div className="absolute bottom-4 left-4 z-20 px-3 py-1.5 rounded-2xl bg-frontier-coral text-white border-2 border-frontier-ink shadow-pop-sm rotate-[1.5deg] text-xs font-black uppercase font-display pointer-events-none">
              <span>🏝️ CHAPTER II • SETTLEMENT</span>
            </div>

            <div className="absolute bottom-4 right-4 z-20 px-2.5 py-1 rounded-full bg-white/95 backdrop-blur-sm border-2 border-frontier-ink text-[11px] font-mono font-black text-slate-700 shadow-pop-sm hidden sm:flex items-center gap-1.5 pointer-events-none">
              <span>👆 Drag village</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
