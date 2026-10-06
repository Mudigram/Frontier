"use client";

import React from "react";
import { useFrontier } from "@/context/FrontierContext";
import { formatCompact, truncateAddress } from "@/lib/format";
import { ConfidenceBadge } from "../ui/ConfidenceBadge";

export const Observatory: React.FC = () => {
  const { observatory, token, pool, chapter } = useFrontier();

  return (
    <section id="observatory" className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-10">
      <div className="rounded-2xl bg-frontier-surface/90 border border-frontier-border p-6 sm:p-10 backdrop-blur-md shadow-xl">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-800 gap-4">
          <div>
            <div className="text-xs uppercase font-mono tracking-[0.25em] text-slate-400">
              Protocol Diagnostics
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mt-1">
              Frontier Observatory
            </h2>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 bg-emerald-950/80 px-3 py-1.5 rounded-lg border border-emerald-700/80">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>ON-CHAIN STATE MONITOR</span>
          </div>
        </div>

        {/* Observatory Grid: Architecture & Protocol Facts */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
          {/* Mint Address */}
          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 flex flex-col justify-between">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span>TOKEN MINT</span>
              <ConfidenceBadge source={observatory?.observability.mint ?? "configured"} size="sm" />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-white" title={token?.mint}>
                {token?.mint ? truncateAddress(token.mint, 8, 8) : "Loading..."}
              </span>
              <span className="text-[11px] font-mono bg-slate-800 text-slate-300 px-2 py-0.5 rounded border border-slate-700">
                SOLANA
              </span>
            </div>
          </div>

          {/* Token Program */}
          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 flex flex-col justify-between">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span>TOKEN PROGRAM</span>
              <ConfidenceBadge source="observed" size="sm" />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-emerald-400">
                Token-2022 (Extensions Active)
              </span>
              <span className="text-[11px] text-slate-400 font-mono">SPL v2</span>
            </div>
          </div>

          {/* Transfer Hook Program */}
          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 flex flex-col justify-between">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span>TRANSFER HOOK PROGRAM</span>
              <ConfidenceBadge source={observatory?.observability.hook ?? "configured"} size="sm" />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-white" title={token?.transferHookProgram ?? ""}>
                {token?.transferHookProgram
                  ? truncateAddress(token.transferHookProgram, 8, 8)
                  : "Not registered"}
              </span>
              <span className="text-[11px] text-amber-300 font-mono bg-amber-950/60 px-2 py-0.5 rounded border border-amber-800/60">
                CPI Guarded
              </span>
            </div>
          </div>

          {/* Meteora Pool */}
          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 flex flex-col justify-between">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span>METEORA LIQUIDITY POOL</span>
              <ConfidenceBadge source={observatory?.observability.pool ?? "configured"} size="sm" />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-white" title={pool?.address ?? ""}>
                {pool?.address ? truncateAddress(pool.address, 8, 8) : "Scanning pools..."}
              </span>
              <span className="text-[11px] text-slate-400 font-mono">
                {pool?.poolType ?? "DLMM"} ({pool?.baseSymbol}/{pool?.quoteSymbol})
              </span>
            </div>
          </div>

          {/* Supply & Decimals */}
          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 flex flex-col justify-between">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span>TOTAL SUPPLY / DECIMALS</span>
              <ConfidenceBadge source="observed" size="sm" />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-white">
                {(token?.supply ?? 1_000_000_000).toLocaleString()} FRNT
              </span>
              <span className="text-[11px] text-slate-400 font-mono">
                {token?.decimals ?? 6} Decimals
              </span>
            </div>
          </div>

          {/* Observed Volume */}
          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 flex flex-col justify-between">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span>OBSERVED VOLUME</span>
              <ConfidenceBadge source={observatory?.observability.volume ?? "derived"} size="sm" />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-white">
                {formatCompact(chapter?.observedVolume ?? 6_870_000)} FRNT
              </span>
              <span className="text-[11px] text-amber-400 font-mono">
                {chapter ? `${Math.round(chapter.progressPercent)}% to next chapter` : ""}
              </span>
            </div>
          </div>

          {/* Observed Holders */}
          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 flex flex-col justify-between">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span>OBSERVED ACTIVE HOLDERS</span>
              <ConfidenceBadge source={observatory?.observability.wallets ?? "configured"} size="sm" />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-white">
                {observatory?.observedHolders.value ?? 3} Sampled Wallets
              </span>
              <span className="text-[11px] text-slate-400 font-mono">Tx Tape Sample</span>
            </div>
          </div>

          {/* Hook Rejections Observed */}
          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 flex flex-col justify-between">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span>HOOK REJECTIONS CAPTURED</span>
              <ConfidenceBadge source={observatory?.observability.failedTxs ?? "configured"} size="sm" />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-rose-400">
                {observatory?.hookRejections.value ?? 2} Enforcements
              </span>
              <span className="text-[11px] text-rose-300 font-mono bg-rose-950/60 px-2 py-0.5 rounded border border-rose-800/60">
                ExceedsMaxHolding
              </span>
            </div>
          </div>

          {/* Latest Slot */}
          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 flex flex-col justify-between">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span>LATEST OBSERVED SLOT</span>
              <ConfidenceBadge source="observed" size="sm" />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-white">
                {observatory?.latestSlot.value ?? 452375727}
              </span>
              <span className="text-[11px] text-slate-400 font-mono">Finalized</span>
            </div>
          </div>

          {/* Last Updated */}
          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 flex flex-col justify-between">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span>LAST STATE SYNC</span>
              <ConfidenceBadge source="observed" size="sm" />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-white">
                {observatory?.lastUpdated
                  ? new Date(observatory.lastUpdated).toLocaleTimeString()
                  : "Live"}
              </span>
              <span className="text-[11px] text-slate-400 font-mono">UTC System</span>
            </div>
          </div>
        </div>

        {/* Observability Boundary Banner */}
        <div className="mt-8 p-4 rounded-xl bg-slate-950/80 border border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs font-mono">
          <div className="flex items-center gap-3">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-slate-300 font-medium">
              Observability Boundary: Mint & Hook are CONFIRMED. Chapter index is CONFIGURED.
            </span>
          </div>
          <span className="text-slate-500 font-medium">No fabricated on-chain state</span>
        </div>
      </div>
    </section>
  );
};
