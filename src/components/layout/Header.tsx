"use client";

import React from "react";
import { useFrontier } from "@/context/FrontierContext";
import { ConfidenceBadge } from "../ui/ConfidenceBadge";

export const Header: React.FC = () => {
  const { isSimulationMode, setProviderMode, chapter } = useFrontier();

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-frontier-bg/90 border-b border-frontier-border/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 py-2 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl border border-frontier-gold/60 bg-slate-900 overflow-hidden flex items-center justify-center shadow-md shadow-amber-950/20">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo.png"
              alt="Frontier Citadel Crest"
              className="w-full h-full object-cover scale-110"
            />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-bold tracking-tight text-white text-base sm:text-lg font-mono">
                FRONTIER
              </span>
              <span className="hidden sm:inline-block px-1.5 py-0.2 rounded text-[10px] font-mono font-bold uppercase bg-frontier-gold/15 text-frontier-gold border border-frontier-gold/40">
                $FRNT
              </span>
            </div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400">
              CHAPTER WARS
            </span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="hidden lg:flex items-center gap-6 text-xs uppercase tracking-wider font-mono text-slate-400">
          <a href="#world-map" className="hover:text-frontier-gold transition-colors">
            3D World
          </a>
          <a href="#pioneer-pass" className="hover:text-frontier-gold transition-colors">
            Pioneer Pass
          </a>
          <a href="#progress" className="hover:text-frontier-gold transition-colors">
            Progression
          </a>
          <a href="#history" className="hover:text-frontier-gold transition-colors">
            Timeline
          </a>
          <a href="#activity" className="hover:text-frontier-gold transition-colors">
            Live Stream
          </a>
          <a href="#observatory" className="hover:text-frontier-gold transition-colors">
            Observatory
          </a>
        </nav>

        {/* Status Indicators, Socials & Buy CTA */}
        <div className="flex items-center gap-2.5">
          {/* X (Twitter) Link */}
          <a
            href="https://x.com/PlayFRNTonSol"
            target="_blank"
            rel="noopener noreferrer"
            className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-frontier-gold hover:border-slate-700 flex items-center justify-center transition-colors"
            title="Follow @PlayFRNTonSol on X"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </a>

          {/* DexScreener Chart Link */}
          <a
            href={process.env.NEXT_PUBLIC_FRONTIER_MINT ? `https://dexscreener.com/solana/${process.env.NEXT_PUBLIC_FRONTIER_MINT}` : "https://dexscreener.com/solana"}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[11px] font-mono bg-slate-900 border border-slate-800 text-slate-300 hover:text-emerald-300 hover:border-emerald-700/60 transition-colors"
            title="View Live Price & Market Cap Chart"
          >
            <span className="text-emerald-400">📈</span>
            <span className="hidden md:inline">Chart</span>
          </a>

          {/* Direct Buy Button (Pump.fun) */}
          <a
            href={process.env.NEXT_PUBLIC_FRONTIER_MINT ? `https://pump.fun/${process.env.NEXT_PUBLIC_FRONTIER_MINT}` : "https://pump.fun"}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-bold bg-frontier-gold/90 hover:bg-frontier-gold text-slate-950 transition-all shadow-sm active:translate-y-[1px]"
            title="Buy $FRNT on Pump.fun"
          >
            <span>BUY $FRNT</span>
            <span className="text-xs">⚡</span>
          </a>

          {/* Simulation vs On-Chain Mode Switcher */}
          <button
            onClick={() => setProviderMode(isSimulationMode ? "observed" : "simulation")}
            className={`hidden md:inline-flex text-[11px] font-mono font-semibold px-2.5 py-1.5 rounded-lg border transition-all items-center gap-1.5 cursor-pointer ${
              isSimulationMode
                ? "bg-rose-950/80 text-rose-300 border-rose-700/80 hover:bg-rose-900"
                : "bg-emerald-950/80 text-emerald-300 border-emerald-700/80 hover:bg-emerald-900"
            }`}
            title="Switch between Simulation Mode and Real On-Chain Observed Data"
          >
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                isSimulationMode ? "bg-rose-400 animate-pulse" : "bg-emerald-400"
              }`}
            />
            <span>{isSimulationMode ? "SIM" : "ON-CHAIN"}</span>
          </button>
        </div>
      </div>
    </header>
  );
};
