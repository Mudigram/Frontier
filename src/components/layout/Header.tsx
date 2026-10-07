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

        {/* Status Indicators & Mode Switcher */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-mono bg-slate-900 border border-slate-800 text-slate-300">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span>Token-2022</span>
          </div>

          <button
            onClick={() => setProviderMode(isSimulationMode ? "observed" : "simulation")}
            className={`text-[11px] font-mono font-semibold px-3 py-1.5 rounded-lg border transition-all flex items-center gap-2 cursor-pointer ${
              isSimulationMode
                ? "bg-rose-950/80 text-rose-300 border-rose-700/80 hover:bg-rose-900"
                : "bg-emerald-950/80 text-emerald-300 border-emerald-700/80 hover:bg-emerald-900"
            }`}
            title="Click to switch between Simulation Mode and Real On-Chain Observed Data"
          >
            <span
              className={`w-2 h-2 rounded-full ${
                isSimulationMode ? "bg-rose-400 animate-pulse" : "bg-emerald-400"
              }`}
            />
            <span>{isSimulationMode ? "SIMULATION" : "ON-CHAIN"}</span>
          </button>
        </div>
      </div>
    </header>
  );
};
