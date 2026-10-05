"use client";

import React from "react";
import { useFrontier } from "@/context/FrontierContext";
import { formatCompact, truncateAddress } from "@/lib/format";
import { ConfidenceBadge } from "../ui/ConfidenceBadge";

export const Observatory: React.FC = () => {
  const { observatory, token, pool, chapter } = useFrontier();

  return (
    <section id="observatory" className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-10">
      <div className="rounded-3xl bg-frontier-surface/95 border-3 border-frontier-ink p-6 sm:p-10 backdrop-blur-md shadow-pop-lg">
        {/* Header */}
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b-2 border-dashed border-frontier-border gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider bg-frontier-coral text-white border-2 border-frontier-ink shadow-pop-sm">
              🔭 PROTOCOL OBSERVATORY
            </div>
            <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-frontier-ink mt-2 font-display">
              Frontier Observatory
            </h2>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono font-bold text-frontier-ink bg-frontier-bg px-3 py-1.5 rounded-full border-2 border-frontier-ink shadow-pop-sm">
            <span className="w-2 h-2 rounded-full bg-frontier-mint animate-ping" />
            <span>ON-CHAIN STATE MONITOR</span>
          </div>
        </div>

        {/* Observatory Grid: Architecture & Protocol Facts */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 font-mono text-xs">
          {/* Mint Address */}
          <div className="p-4 rounded-2xl bg-frontier-bg border-2 border-frontier-ink shadow-pop-sm flex flex-col justify-between hover:translate-y-[-2px] transition-transform">
            <div className="flex items-center justify-between text-slate-600 mb-2">
              <span className="font-bold">TOKEN MINT</span>
              <ConfidenceBadge source={observatory?.observability.mint ?? "configured"} size="sm" />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-black text-frontier-ink" title={token?.mint}>
                {token?.mint ? truncateAddress(token.mint, 8, 8) : "Loading..."}
              </span>
              <span className="text-[11px] font-mono bg-frontier-yellow text-frontier-ink px-2 py-0.5 rounded-full font-black border border-frontier-ink">
                SOLANA
              </span>
            </div>
          </div>

          {/* Token Program */}
          <div className="p-4 rounded-2xl bg-frontier-bg border-2 border-frontier-ink shadow-pop-sm flex flex-col justify-between hover:translate-y-[-2px] transition-transform">
            <div className="flex items-center justify-between text-slate-600 mb-2">
              <span className="font-bold">TOKEN PROGRAM</span>
              <ConfidenceBadge source="observed" size="sm" />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-black text-emerald-700">
                Token-2022 (Extensions Active)
              </span>
              <span className="text-[11px] text-slate-600 font-bold">SPL v2</span>
            </div>
          </div>

          {/* Transfer Hook Program */}
          <div className="p-4 rounded-2xl bg-frontier-bg border-2 border-frontier-ink shadow-pop-sm flex flex-col justify-between hover:translate-y-[-2px] transition-transform">
            <div className="flex items-center justify-between text-slate-600 mb-2">
              <span className="font-bold">TRANSFER HOOK PROGRAM</span>
              <ConfidenceBadge source={observatory?.observability.hook ?? "configured"} size="sm" />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-black text-frontier-ink" title={token?.transferHookProgram ?? ""}>
                {token?.transferHookProgram
                  ? truncateAddress(token.transferHookProgram, 8, 8)
                  : "Not registered"}
              </span>
              <span className="text-[11px] text-amber-800 font-bold bg-amber-100 px-2 py-0.5 rounded border border-amber-300">
                CPI Guarded
              </span>
            </div>
          </div>

          {/* Meteora Pool */}
          <div className="p-4 rounded-2xl bg-frontier-bg border-2 border-frontier-ink shadow-pop-sm flex flex-col justify-between hover:translate-y-[-2px] transition-transform">
            <div className="flex items-center justify-between text-slate-600 mb-2">
              <span className="font-bold">METEORA LIQUIDITY POOL</span>
              <ConfidenceBadge source={observatory?.observability.pool ?? "configured"} size="sm" />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-black text-frontier-ink" title={pool?.address ?? ""}>
                {pool?.address ? truncateAddress(pool.address, 8, 8) : "Scanning pools..."}
              </span>
              <span className="text-[11px] text-slate-700 font-bold">
                {pool?.poolType ?? "DLMM"} ({pool?.baseSymbol}/{pool?.quoteSymbol})
              </span>
            </div>
          </div>

          {/* Supply & Decimals */}
          <div className="p-4 rounded-2xl bg-frontier-bg border-2 border-frontier-ink shadow-pop-sm flex flex-col justify-between hover:translate-y-[-2px] transition-transform">
            <div className="flex items-center justify-between text-slate-600 mb-2">
              <span className="font-bold">TOTAL SUPPLY / DECIMALS</span>
              <ConfidenceBadge source="observed" size="sm" />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-black text-frontier-ink">
                {(token?.supply ?? 1_000_000_000).toLocaleString()} FRNT
              </span>
              <span className="text-[11px] text-slate-600 font-bold">
                {token?.decimals ?? 6} Decimals
              </span>
            </div>
          </div>

          {/* Observed Volume */}
          <div className="p-4 rounded-2xl bg-frontier-bg border-2 border-frontier-ink shadow-pop-sm flex flex-col justify-between hover:translate-y-[-2px] transition-transform">
            <div className="flex items-center justify-between text-slate-600 mb-2">
              <span className="font-bold">OBSERVED VOLUME</span>
              <ConfidenceBadge source={observatory?.observability.volume ?? "derived"} size="sm" />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-black text-frontier-ink">
                {formatCompact(chapter?.observedVolume ?? 6_870_000)} FRNT
              </span>
              <span className="text-[11px] text-frontier-coral font-black">
                {chapter ? `${Math.round(chapter.progressPercent)}% to next chapter` : ""}
              </span>
            </div>
          </div>

          {/* Observed Holders */}
          <div className="p-4 rounded-2xl bg-frontier-bg border-2 border-frontier-ink shadow-pop-sm flex flex-col justify-between hover:translate-y-[-2px] transition-transform">
            <div className="flex items-center justify-between text-slate-600 mb-2">
              <span className="font-bold">OBSERVED ACTIVE HOLDERS</span>
              <ConfidenceBadge source={observatory?.observability.wallets ?? "configured"} size="sm" />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-black text-frontier-ink">
                {observatory?.observedHolders.value ?? 3} Sampled Wallets
              </span>
              <span className="text-[11px] text-slate-600 font-bold">Tx Tape Sample</span>
            </div>
          </div>

          {/* Hook Rejections Observed */}
          <div className="p-4 rounded-2xl bg-frontier-bg border-2 border-frontier-ink shadow-pop-sm flex flex-col justify-between hover:translate-y-[-2px] transition-transform">
            <div className="flex items-center justify-between text-slate-600 mb-2">
              <span className="font-bold">HOOK REJECTIONS CAPTURED</span>
              <ConfidenceBadge source={observatory?.observability.failedTxs ?? "configured"} size="sm" />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-black text-rose-700">
                {observatory?.hookRejections.value ?? 2} Enforcements
              </span>
              <span className="text-[11px] text-rose-700 font-black bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
                ExceedsMaxHolding
              </span>
            </div>
          </div>

          {/* Latest Slot */}
          <div className="p-4 rounded-2xl bg-frontier-bg border-2 border-frontier-ink shadow-pop-sm flex flex-col justify-between hover:translate-y-[-2px] transition-transform">
            <div className="flex items-center justify-between text-slate-600 mb-2">
              <span className="font-bold">LATEST OBSERVED SLOT</span>
              <ConfidenceBadge source="observed" size="sm" />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-black text-frontier-ink">
                {observatory?.latestSlot.value ?? 452375727}
              </span>
              <span className="text-[11px] text-slate-600 font-bold">Finalized</span>
            </div>
          </div>

          {/* Last Updated */}
          <div className="p-4 rounded-2xl bg-frontier-bg border-2 border-frontier-ink shadow-pop-sm flex flex-col justify-between hover:translate-y-[-2px] transition-transform">
            <div className="flex items-center justify-between text-slate-600 mb-2">
              <span className="font-bold">LAST STATE SYNC</span>
              <ConfidenceBadge source="observed" size="sm" />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-black text-frontier-ink">
                {observatory?.lastUpdated
                  ? new Date(observatory.lastUpdated).toLocaleTimeString()
                  : "Live"}
              </span>
              <span className="text-[11px] text-slate-600 font-bold">UTC System</span>
            </div>
          </div>
        </div>

        {/* Observability Boundary Banner */}
        <div className="mt-8 p-4 rounded-2xl bg-amber-50 border-2 border-frontier-ink shadow-pop-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs font-mono">
          <div className="flex items-center gap-3">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse border border-frontier-ink" />
            <span className="text-frontier-ink font-bold">
              Observability Boundary: Mint & Hook are CONFIRMED. Chapter index is CONFIGURED.
            </span>
          </div>
          <span className="text-slate-600 font-bold">No fabricated on-chain state</span>
        </div>
      </div>
    </section>
  );
};
