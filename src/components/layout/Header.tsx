"use client";

import React from "react";
import { useFrontier } from "@/context/FrontierContext";
import { ConfidenceBadge } from "../ui/ConfidenceBadge";

export const Header: React.FC = () => {
  const { isSimulationMode, setProviderMode, chapter } = useFrontier();

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-white/85 border-b-2 border-frontier-ink">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 py-3 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl border-2 border-frontier-ink bg-frontier-yellow flex items-center justify-center shadow-pop-sm rotate-[-2deg] hover:rotate-0 transition-transform">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="#0f172a"
              className="w-5 h-5 text-frontier-ink"
              strokeWidth="2.5"
            >
              <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5" />
              <polyline points="12 22 12 15.5" />
              <polyline points="22 8.5 12 15.5 2 8.5" />
            </svg>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-black tracking-tight text-frontier-ink text-lg sm:text-xl font-display">
                FRONTIER
              </span>
              <span className="hidden sm:inline-block px-2 py-0.5 rounded-full text-[10px] font-black uppercase bg-frontier-coral text-white border border-frontier-ink shadow-[1px_1px_0px_#0f172a]">
                $FRNT
              </span>
            </div>
            <span className="text-[10px] font-black uppercase tracking-wider text-frontier-coral">
              CHAPTER WARS
            </span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="hidden lg:flex items-center gap-6 text-xs uppercase tracking-wider font-extrabold text-slate-700">
          <a href="#progress" className="hover:text-frontier-coral transition-colors">
            Progress
          </a>
          <a href="#world-map" className="hover:text-frontier-coral transition-colors">
            World Map
          </a>
          <a href="#history" className="hover:text-frontier-coral transition-colors">
            Timeline
          </a>
          <a href="#activity" className="hover:text-frontier-coral transition-colors">
            Activity
          </a>
          <a href="#observatory" className="hover:text-frontier-coral transition-colors">
            Observatory
          </a>
          <a href="#wallet" className="hover:text-frontier-coral transition-colors">
            Territory
          </a>
        </nav>

        {/* Status Indicators & Mode Switcher */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono font-black bg-white border-2 border-frontier-ink text-slate-800 shadow-pop-sm">
            <span className="w-2 h-2 rounded-full bg-frontier-mint" />
            <span>Token-2022</span>
          </div>

          <button
            onClick={() => setProviderMode(isSimulationMode ? "observed" : "simulation")}
            className={`text-[11px] font-mono font-black px-3 py-1.5 rounded-full border-2 border-frontier-ink shadow-pop-sm transition-all flex items-center gap-2 cursor-pointer ${
              isSimulationMode
                ? "bg-rose-500 text-white hover:bg-rose-600"
                : "bg-frontier-mint text-frontier-ink hover:bg-emerald-400"
            }`}
            title="Click to switch between Simulation Mode and Real On-Chain Observed Data"
          >
            <span
              className={`w-2 h-2 rounded-full ${
                isSimulationMode ? "bg-white animate-pulse" : "bg-frontier-ink"
              }`}
            />
            <span>{isSimulationMode ? "SIMULATION" : "ON-CHAIN"}</span>
          </button>

          <a
            href="#progress"
            className="btn-pop-yellow !py-1.5 !px-3.5 !text-xs hidden sm:inline-flex"
          >
            <span>JOIN WAR</span>
            <span className="text-[10px]">⚔️</span>
          </a>
        </div>
      </div>
    </header>
  );
};
