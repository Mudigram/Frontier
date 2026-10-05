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
      <div className="rounded-3xl bg-frontier-surface/95 border-3 border-frontier-ink p-6 sm:p-10 backdrop-blur-md shadow-pop-lg">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b-2 border-dashed border-frontier-border gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider bg-frontier-coral text-white border-2 border-frontier-ink shadow-pop-sm">
              🛡️ ON-CHAIN TRANSFER HOOK
            </div>
            <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-frontier-ink mt-2 font-display">
              Hook Rejection Events
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-mono font-bold text-slate-600">ENFORCEMENT AUDIT</span>
            <ConfidenceBadge source="on-chain" size="sm" />
          </div>
        </div>

        {/* Narrative Callout */}
        <div className="my-6 p-5 rounded-2xl bg-frontier-bg border-2 border-frontier-ink shadow-pop-sm text-xs font-mono text-slate-700 leading-relaxed font-medium">
          <span className="text-frontier-coral font-black">Token-2022 Transfer Hook Protection:</span>{" "}
          Unlike standard SPL tokens, Frontier transfers invoke an on-chain program on every trade.
          When a buyer attempts to accumulate tokens beyond the active Chapter wallet limit, the hook
          reverts the transaction on-chain with <code className="text-frontier-ink font-bold bg-frontier-yellow/40 px-1.5 py-0.5 rounded border border-frontier-ink">AnchorError: ExceedsMaxHolding (6000 / 0x1770)</code>.
        </div>

        {hookEvents.length === 0 ? (
          <div className="py-12 text-center text-slate-400 font-mono font-bold text-sm">
            No hook rejections observed in recent scanning window.
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Event List (5 cols) */}
            <div className="lg:col-span-5 space-y-3 font-mono">
              <div className="text-xs text-slate-600 uppercase font-black tracking-wider mb-2">
                Captured Rejections ({hookEvents.length})
              </div>
              {hookEvents.map((ev, idx) => (
                <div
                  key={ev.signature}
                  onClick={() => setSelectedEventIndex(idx)}
                  className={`p-4 rounded-2xl border-2 border-frontier-ink cursor-pointer transition-all ${
                    selectedEventIndex === idx
                      ? "bg-frontier-bg shadow-pop-sm border-frontier-coral ring-2 ring-frontier-coral/50"
                      : "bg-frontier-bg/60 opacity-90 hover:opacity-100"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-rose-600 text-xs">
                      {ev.errorCode}
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-rose-100 text-rose-900 border border-frontier-ink font-black uppercase">
                      REJECTED
                    </span>
                  </div>

                  <div className="text-xs text-slate-700 mt-2 truncate font-medium">
                    {ev.errorMessage}
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-slate-500 mt-3 pt-2 border-t border-slate-200">
                    <span>Tx: {truncateAddress(ev.signature, 6, 6)}</span>
                    <span>Slot {ev.slot}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Event Detail Inspection Terminal (7 cols) */}
            {activeEvent && (
              <div className="lg:col-span-7 rounded-xl bg-slate-950 border border-slate-800 p-6 font-mono text-xs shadow-inner">
                {/* Terminal Header */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                    <span className="font-bold text-slate-200">
                      ON-CHAIN CPI LOG TRACE
                    </span>
                  </div>
                  <span className="text-rose-400 font-bold uppercase tracking-wider">
                    STATUS: REJECTED
                  </span>
                </div>

                {/* Error Metrics */}
                <div className="grid grid-cols-2 gap-4 my-4 p-3 rounded-lg bg-slate-900/60 border border-slate-800/80">
                  <div>
                    <div className="text-[11px] text-slate-500">ERROR NAME</div>
                    <div className="text-sm font-bold text-rose-400 mt-0.5">
                      {activeEvent.errorCode}
                    </div>
                  </div>
                  <div>
                    <div className="text-[11px] text-slate-500">ERROR CODE / HEX</div>
                    <div className="text-sm font-bold text-amber-400 mt-0.5">
                      {activeEvent.errorNumber} (0x{activeEvent.errorNumber.toString(16)})
                    </div>
                  </div>
                </div>

                {/* Detailed Narrative */}
                <div className="space-y-3 text-slate-300">
                  <div>
                    <span className="text-slate-500 block mb-0.5">EXPLANATION:</span>
                    <span className="text-slate-200 font-sans text-xs leading-relaxed">
                      Recipient would exceed the configured per-wallet max holding limit.
                      The transfer hook prevented the token transfer instruction from executing.
                    </span>
                  </div>

                  <div className="pt-2 border-t border-slate-900">
                    <span className="text-slate-500 block mb-0.5">TRANSACTION SIGNATURE:</span>
                    <span className="text-slate-300 break-all select-all font-mono text-[11px]">
                      {activeEvent.signature}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-2 border-t border-slate-900">
                    <div>
                      <span className="text-slate-500 block mb-0.5">SLOT:</span>
                      <span className="text-slate-200">{activeEvent.slot}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block mb-0.5">HOOK PROGRAM:</span>
                      <span className="text-slate-200" title={activeEvent.hookProgram}>
                        {truncateAddress(activeEvent.hookProgram, 6, 6)}
                      </span>
                    </div>
                  </div>

                  {/* Raw Program Logs Snippet */}
                  <div className="pt-3 border-t border-slate-900">
                    <span className="text-slate-500 block mb-1.5">SOLANA VM EXECUTION LOGS:</span>
                    <div className="p-3 rounded-lg bg-black/80 border border-slate-900 text-[10px] text-slate-400 overflow-x-auto space-y-1 font-mono">
                      {activeEvent.logs.map((log, lIdx) => (
                        <div
                          key={lIdx}
                          className={
                            log.includes("Error") || log.includes("failed")
                              ? "text-rose-400 font-semibold"
                              : log.includes("TransferHook")
                              ? "text-amber-300"
                              : "text-slate-400"
                          }
                        >
                          {log}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};
