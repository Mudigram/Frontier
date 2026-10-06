"use client";

import React, { useState } from "react";
import { useFrontier } from "@/context/FrontierContext";
import { truncateAddress } from "@/lib/format";
import { ConfidenceBadge } from "../ui/ConfidenceBadge";

export const HookExplorer: React.FC = () => {
  const { hookEvents } = useFrontier();
  const [selectedEventIndex, setSelectedEventIndex] = useState<number>(0);

  const activeEvent = hookEvents[selectedEventIndex] || hookEvents[0];

  return (
    <section id="hooks" className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-10">
      <div className="rounded-2xl bg-frontier-surface/90 border border-frontier-border p-6 sm:p-10 backdrop-blur-md shadow-xl">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-800 gap-4">
          <div>
            <div className="text-xs uppercase font-mono tracking-[0.25em] text-slate-400">
              On-Chain CPI Forensics
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mt-1">
              Hook Rejection Events
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-slate-400">ENFORCEMENT AUDIT</span>
            <ConfidenceBadge source="on-chain" size="sm" />
          </div>
        </div>

        {/* Narrative Callout */}
        <div className="my-6 p-4 rounded-xl bg-slate-950/80 border border-slate-800/80 text-xs font-mono text-slate-300 leading-relaxed">
          <span className="text-rose-400 font-bold">Token-2022 Transfer Hook Protection:</span>{" "}
          Unlike standard SPL tokens, Frontier transfers invoke an on-chain program on every trade.
          When a buyer attempts to accumulate tokens beyond the active Chapter wallet limit, the hook
          reverts the transaction on-chain with <code className="text-rose-300 bg-rose-950/60 px-1.5 py-0.5 rounded border border-rose-800/60 font-semibold">AnchorError: ExceedsMaxHolding (6000 / 0x1770)</code>.
        </div>

        {hookEvents.length === 0 ? (
          <div className="py-12 text-center text-slate-500 font-mono text-xs">
            No hook rejections observed in recent scanning window.
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Event List (5 cols) */}
            <div className="lg:col-span-5 space-y-2.5 font-mono">
              <div className="text-xs text-slate-400 uppercase tracking-wider mb-2">
                Captured Rejections ({hookEvents.length})
              </div>
              {hookEvents.map((ev, idx) => (
                <div
                  key={ev.signature}
                  onClick={() => setSelectedEventIndex(idx)}
                  className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                    selectedEventIndex === idx
                      ? "bg-slate-900 border-rose-600/80 shadow-md ring-1 ring-rose-500/40"
                      : "bg-slate-950/60 border-slate-800/80 hover:border-slate-700"
                  }`}
                >
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-white font-bold">
                      Tx #{idx + 1}
                    </span>
                    <span className="text-[10px] text-rose-400 font-bold px-1.5 py-0.5 rounded bg-rose-950/60 border border-rose-800/60">
                      BLOCKED
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-400 truncate">
                    {truncateAddress(ev.signature, 8, 8)}
                  </div>
                  <div className="mt-2 text-[10px] text-slate-500 flex items-center justify-between">
                    <span>Slot {ev.slot}</span>
                    <span className="text-slate-400">{ev.errorCode}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Event Inspector Console (7 cols) */}
            {activeEvent && (
              <div className="lg:col-span-7 p-6 rounded-xl bg-slate-950 border border-slate-800 shadow-xl font-mono text-xs space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <span className="text-slate-400 uppercase tracking-wider text-[11px]">
                    INSPECTOR CONSOLE
                  </span>
                  <span className="text-rose-400 font-bold">
                    CPI ERROR 0x1770
                  </span>
                </div>

                <div>
                  <div className="text-slate-500 text-[10px]">TRANSACTION SIGNATURE:</div>
                  <div className="text-white break-all text-xs font-semibold mt-0.5 select-all">
                    {activeEvent.signature}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-slate-500 text-[10px]">CATEGORY:</div>
                    <div className="text-rose-400 font-bold mt-0.5">
                      {activeEvent.category}
                    </div>
                  </div>
                  <div>
                    <div className="text-slate-500 text-[10px]">ERROR CODE:</div>
                    <div className="text-amber-400 font-bold mt-0.5">
                      {activeEvent.errorCode}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-slate-500 text-[10px]">SLOT NUMBER:</div>
                    <div className="text-slate-300 font-semibold mt-0.5">
                      {activeEvent.slot}
                    </div>
                  </div>
                  <div>
                    <div className="text-slate-500 text-[10px]">HOOK PROGRAM ID:</div>
                    <div className="text-slate-300 font-semibold mt-0.5 truncate" title={activeEvent.hookProgram}>
                      {truncateAddress(activeEvent.hookProgram, 6, 6)}
                    </div>
                  </div>
                </div>

                {activeEvent.logs && activeEvent.logs.length > 0 && (
                  <div>
                    <div className="text-slate-500 text-[10px] mb-1">PROGRAM CPI LOG TRACE:</div>
                    <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-[11px] text-slate-300 space-y-1 max-h-[140px] overflow-y-auto">
                      {activeEvent.logs.map((log, i) => (
                        <div
                          key={i}
                          className={log.includes("Error") ? "text-rose-400 font-bold" : "text-slate-400"}
                        >
                          {log}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};
