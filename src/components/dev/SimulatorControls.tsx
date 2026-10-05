"use client";

import React, { useState } from "react";
import { useFrontier } from "@/context/FrontierContext";

export const SimulatorControls: React.FC = () => {
  const {
    isSimulationMode,
    providerMode,
    setProviderMode,
    adjustVolume,
    nextChapter,
    resetSimulation,
    triggerHookRejection,
    triggerRandomEvent,
  } = useFrontier();

  const [isOpen, setIsOpen] = useState<boolean>(true);

  if (!isSimulationMode) {
    return (
      <aside
        aria-label="Simulation Mode Activator"
        className="fixed bottom-4 right-4 z-50"
      >
        <button
          onClick={() => setProviderMode("simulation")}
          className="px-3 py-2 rounded-xl bg-slate-950/90 border border-slate-700 hover:border-frontier-gold/60 text-xs font-mono font-bold text-slate-300 hover:text-white shadow-xl flex items-center gap-2 backdrop-blur-md transition-all"
        >
          <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
          <span>Switch to Simulation Mode</span>
        </button>
      </aside>
    );
  }

  return (
    <aside
      aria-label="Simulation Controls"
      className="fixed bottom-4 right-4 z-50 max-w-sm w-full sm:w-auto"
    >
      <div className="bg-slate-950/95 border-2 border-rose-500/80 rounded-xl shadow-2xl p-4 backdrop-blur-md transition-all">
        {/* Banner */}
        <div className="flex items-center justify-between gap-3 pb-3 border-b border-rose-900/50">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping" />
            <span className="font-mono font-bold text-xs uppercase tracking-widest text-rose-400">
              SIMULATION MODE
            </span>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-xs font-mono text-slate-400 hover:text-white px-1.5 py-0.5 rounded border border-slate-800"
          >
            {isOpen ? "Hide" : "Show"}
          </button>
        </div>

        {isOpen && (
          <div className="mt-3 space-y-3">
            <p className="text-[11px] text-slate-400 font-mono leading-tight">
              Test world transitions, volume progression, and hook rejections locally.
            </p>

            {/* Volume Steppers */}
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => adjustVolume(-500_000)}
                className="px-2.5 py-1.5 rounded bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-mono text-slate-200 transition-colors"
              >
                - 500K Vol
              </button>
              <button
                onClick={() => adjustVolume(500_000)}
                className="px-2.5 py-1.5 rounded bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-mono text-slate-200 transition-colors"
              >
                + 500K Vol
              </button>
            </div>

            {/* Chapter Jump & Reset */}
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={nextChapter}
                className="px-2.5 py-1.5 rounded bg-amber-950/70 hover:bg-amber-900/80 border border-amber-600/70 text-xs font-mono font-semibold text-amber-300 transition-colors"
              >
                Next Chapter →
              </button>
              <button
                onClick={resetSimulation}
                className="px-2.5 py-1.5 rounded bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-mono text-rose-300 transition-colors"
              >
                Reset (Ch 0)
              </button>
            </div>

            {/* Event Triggers */}
            <div className="grid grid-cols-2 gap-2 pt-1 border-t border-slate-800">
              <button
                onClick={triggerHookRejection}
                className="px-2.5 py-1.5 rounded bg-rose-950/70 hover:bg-rose-900/80 border border-rose-600/70 text-[11px] font-mono font-semibold text-rose-300 transition-colors truncate"
                title="Trigger simulated 6000 ExceedsMaxHolding failure"
              >
                Rejection (6000)
              </button>
              <button
                onClick={triggerRandomEvent}
                className="px-2.5 py-1.5 rounded bg-slate-900 hover:bg-slate-800 border border-slate-700 text-[11px] font-mono text-slate-300 transition-colors"
              >
                Random Event
              </button>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};
