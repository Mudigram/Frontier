"use client";

import React from "react";
import { useFrontier } from "@/context/FrontierContext";
import { truncateAddress } from "@/lib/format";
import { ConfidenceBadge } from "@/components/ui/ConfidenceBadge";

export const BoundaryDefense: React.FC = () => {
  const { hookEvents, chapter, triggerHookRejection, isSimulationMode } = useFrontier();

  const currentCap = chapter?.currentWalletCapPercent ?? 4.0;
  const rejectionsCount = hookEvents.length;

  return (
    <div className="rounded-2xl bg-slate-900/90 border border-slate-800 p-6 backdrop-blur-md shadow-xl flex flex-col justify-between">
      {/* HUD Header */}
      <div>
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping" />
            <span className="text-xs font-mono font-bold tracking-widest text-rose-400 uppercase">
              THE BOUNDARY DEFENSE
            </span>
          </div>
          <ConfidenceBadge source="on-chain" size="sm" />
        </div>

        {/* Defense Status Banner */}
        <div className="my-4 p-4 rounded-xl bg-slate-950/80 border border-rose-950/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="text-[11px] font-mono text-slate-400 uppercase">
              Transfer Hook Enforcement Shield
            </div>
            <div className="text-lg font-bold text-white font-mono mt-0.5 flex items-center gap-2">
              <span className="text-rose-400">ACTIVE</span>
              <span className="text-slate-600">|</span>
              <span>{currentCap.toFixed(2)}% Wallet Ceiling</span>
            </div>
          </div>

          <div className="text-right sm:text-right font-mono">
            <div className="text-2xl font-black text-rose-400">
              {rejectionsCount}
            </div>
            <div className="text-[10px] text-slate-500 uppercase tracking-wider">
              Intercepted Breaches
            </div>
          </div>
        </div>

        {/* Tactical Explanation */}
        <p className="text-xs text-slate-300 font-sans leading-relaxed">
          The Token-2022 Transfer Hook executes on every transfer. Whenever a buyer attempts to accumulate past the active Chapter capacity, the hook program halts execution on-chain with <code className="text-rose-300 font-mono text-[11px]">ExceedsMaxHolding (6000)</code>.
        </p>

        {/* Wall of Leviathans (Deflected Attempts) */}
        <div className="mt-5 space-y-2">
          <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400 flex items-center justify-between">
            <span>Wall of Leviathans (Deflected Attempts)</span>
            <span className="text-[10px] text-slate-500">CPI Error 0x1770</span>
          </div>

          <div className="space-y-2 max-h-[220px] overflow-y-auto pr-1">
            {hookEvents.length === 0 ? (
              <div className="py-6 text-center text-slate-500 font-mono text-xs">
                No unauthorized transfers detected in observation window.
              </div>
            ) : (
              hookEvents.map((ev, idx) => (
                <div
                  key={ev.signature + idx}
                  className="p-3 rounded-lg bg-slate-950/60 border border-slate-800/80 font-mono text-xs flex items-center justify-between gap-3 hover:border-rose-900/60 transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                    <div>
                      <div className="text-slate-200 font-semibold truncate max-w-[180px] sm:max-w-xs">
                        Tx: {truncateAddress(ev.signature, 6, 6)}
                      </div>
                      <div className="text-[10px] text-rose-400 mt-0.5">
                        {ev.errorCode} • Slot {ev.slot}
                      </div>
                    </div>
                  </div>

                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-rose-950/60 text-rose-300 border border-rose-800/60 uppercase flex-shrink-0">
                    BLOCKED
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Simulator Action if in Simulation Mode */}
      {isSimulationMode && (
        <div className="mt-5 pt-4 border-t border-slate-800 flex items-center justify-between gap-3">
          <span className="text-[11px] font-mono text-slate-400">
            Simulate whale breach:
          </span>
          <button
            onClick={triggerHookRejection}
            className="px-3 py-1.5 rounded-lg bg-rose-950/80 hover:bg-rose-900 text-rose-300 border border-rose-600/70 text-xs font-mono font-bold transition-all shadow-sm"
          >
            Trigger 6000 Breach ⚡
          </button>
        </div>
      )}
    </div>
  );
};
