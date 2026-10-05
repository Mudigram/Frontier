"use client";

import React, { useState, useCallback } from "react";
import dynamic from "next/dynamic";
import { useFrontier } from "@/context/FrontierContext";
import type { WalletState } from "@/data/types";
import { formatNumber, formatPercent } from "@/lib/format";
import { ConfidenceBadge } from "../ui/ConfidenceBadge";
import { getWalletPersona } from "@/3d/village/WalletAvatar";

const WalletAvatar = dynamic(
  () => import("@/3d/village/WalletAvatar").then((mod) => mod.WalletAvatar),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full min-h-[340px] flex flex-col items-center justify-center font-mono text-xs text-frontier-ink gap-2">
        <div className="w-7 h-7 rounded-full border-3 border-frontier-ink border-t-frontier-coral animate-spin" />
        <span className="font-bold text-[11px] uppercase tracking-wider">Awakening 3D Profile...</span>
      </div>
    ),
  }
);

const SAMPLE_WALLETS = [
  { label: "Alice (0.84% - Citizen)", address: "WALLET_ALICE_111111111111111111111111111111111" },
  { label: "Bob (0.33% - Pioneer)", address: "WALLET_BOB_22222222222222222222222222222222222" },
  { label: "Sentinel (2.25% - Whale)", address: "WALLET_SENTINEL_777777777777777777777777777777777" },
  { label: "Titan (4.80% - Exceeds Cap)", address: "WALLET_TITAN_999999999999999999999999999999999" },
  { label: "Nomad (0.00% - Ghost)", address: "WALLET_NOMAD_000000000000000000000000000000000" },
];

export const WalletTerritory: React.FC = () => {
  const { lookupWallet, chapter } = useFrontier();
  const [addressInput, setAddressInput] = useState<string>(
    "WALLET_ALICE_111111111111111111111111111111111"
  );
  const [result, setResult] = useState<WalletState | null>(null);
  const [isSearching, setIsSearching] = useState<boolean>(false);

  const handleSearch = useCallback(async (addressToSearch?: string) => {
    const target = addressToSearch || addressInput;
    if (!target.trim()) return;

    setIsSearching(true);
    try {
      const data = await lookupWallet(target.trim());
      setResult(data);
    } catch (err) {
      console.error("Wallet lookup failed:", err);
    } finally {
      setIsSearching(false);
    }
  }, [addressInput, lookupWallet]);

  // Initial lookup on mount
  React.useEffect(() => {
    handleSearch("WALLET_ALICE_111111111111111111111111111111111");
  }, [handleSearch]);

  const persona = result
    ? getWalletPersona(
        result.balance.value,
        result.supplyPercent.value,
        result.walletCapPercent.value ?? 4,
        result.withinLimit.value
      )
    : null;

  return (
    <section id="wallet" className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-10">
      <div className="rounded-3xl bg-white border-3 border-frontier-ink p-6 sm:p-10 shadow-pop-lg">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b-2 border-dashed border-slate-200 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider bg-frontier-tangerine text-white border-2 border-frontier-ink shadow-pop-sm">
              👛 3D WALLET SCANNER
            </div>
            <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-frontier-ink mt-2 font-display">
              Wallet Territory & Cap
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-mono font-bold text-slate-600">CAP VERIFICATION</span>
            <ConfidenceBadge
              source={chapter?.source.walletCap ?? "configured"}
              size="sm"
            />
          </div>
        </div>

        {/* Search Bar & Sample Buttons */}
        <div className="mt-8 space-y-3">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSearch();
            }}
            className="flex flex-col sm:flex-row gap-3"
          >
            <input
              type="text"
              value={addressInput}
              onChange={(e) => setAddressInput(e.target.value)}
              placeholder="Enter Solana wallet address (or type any random address)..."
              className="flex-1 px-5 py-3.5 rounded-full bg-frontier-bg border-2 border-frontier-ink text-sm font-mono text-frontier-ink placeholder-slate-400 focus:outline-none focus:border-frontier-coral shadow-pop-sm transition-colors font-bold"
            />
            <button
              type="submit"
              disabled={isSearching}
              className="btn-pop-yellow !py-3 !px-7"
            >
              <span>{isSearching ? "SCANNING..." : "SCAN WALLET"}</span>
              <span className="text-sm">🔍</span>
            </button>
          </form>

          {/* Quick preset chips */}
          <div className="flex flex-wrap items-center gap-2 pt-2">
            <span className="text-xs font-mono font-bold text-frontier-ink">Quick Samples:</span>
            {SAMPLE_WALLETS.map((sample) => (
              <button
                key={sample.address}
                onClick={() => {
                  setAddressInput(sample.address);
                  handleSearch(sample.address);
                }}
                className={`text-[11px] font-mono font-black px-3 py-1 rounded-full border-2 border-frontier-ink shadow-pop-sm transition-transform active:translate-y-[1px] cursor-pointer ${
                  addressInput === sample.address
                    ? "bg-frontier-yellow text-frontier-ink"
                    : "bg-white hover:bg-frontier-yellow/50 text-frontier-ink"
                }`}
              >
                {sample.label}
              </button>
            ))}
          </div>
        </div>

        {/* Results Card: 3D Profile Avatar + Stats Split View */}
        {result && persona && (
          <div className="mt-8 p-6 rounded-2xl bg-frontier-bg border-2 border-frontier-ink shadow-pop-sm">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
              {/* 3D Character Viewport (5 cols) */}
              <div className="lg:col-span-5 flex flex-col">
                <div className="w-full h-[360px] sm:h-[400px] rounded-2xl border-2 border-frontier-ink bg-gradient-to-b from-[#fef08a]/20 via-[#fed7aa]/20 to-[#faf8f5] shadow-pop-sm overflow-hidden relative">
                  <WalletAvatar
                    address={result.address}
                    balance={result.balance.value}
                    supplyPercent={result.supplyPercent.value}
                    walletCapPercent={result.walletCapPercent.value ?? 4}
                    withinLimit={result.withinLimit.value}
                  />
                </div>
              </div>

              {/* Dossier & Metrics Breakdown (7 cols) */}
              <div className="lg:col-span-7 flex flex-col justify-between space-y-5 font-mono">
                {/* Dossier Header */}
                <div>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b-2 border-dashed border-slate-200 gap-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-slate-500 font-bold">TARGET WALLET:</span>
                      <span className="text-xs font-black text-frontier-ink truncate max-w-xs sm:max-w-sm">
                        {result.address}
                      </span>
                    </div>
                    <ConfidenceBadge source={result.balance.source} size="sm" />
                  </div>

                  {/* Persona Identity Title & Callout */}
                  <div className="mt-3">
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${persona.badgeClass}`}>
                        {persona.badge}
                      </span>
                      <span className="text-xs font-bold text-slate-500">{persona.tagline}</span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-black text-frontier-ink tracking-tight font-display mt-1">
                      {persona.title}
                    </h3>

                    <div className="mt-2.5 p-3 rounded-xl bg-white border-2 border-frontier-ink shadow-sm text-xs font-sans text-slate-700 leading-relaxed font-medium">
                      {persona.quote}
                    </div>
                  </div>
                </div>

                {/* 4-Stat Metric Grid */}
                <div className="grid grid-cols-2 gap-4 my-2">
                  <div className="p-3.5 rounded-xl bg-white border-2 border-frontier-ink shadow-sm">
                    <div className="text-[11px] text-slate-500 font-bold">BALANCE</div>
                    <div className="text-xl sm:text-2xl font-black text-frontier-ink mt-0.5 font-display">
                      {formatNumber(result.balance.value)}
                    </div>
                    <div className="text-[10px] text-slate-500 font-bold mt-0.5">FRNT Tokens</div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-white border-2 border-frontier-ink shadow-sm">
                    <div className="text-[11px] text-slate-500 font-bold">SUPPLY SHARE</div>
                    <div className="text-xl sm:text-2xl font-black text-emerald-700 mt-0.5 font-display">
                      {formatPercent(result.supplyPercent.value, 3)}
                    </div>
                    <div className="text-[10px] text-slate-500 font-bold mt-0.5">Of 1B Max Supply</div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-white border-2 border-frontier-ink shadow-sm">
                    <div className="text-[11px] text-slate-500 font-bold">CURRENT CHAPTER</div>
                    <div className="text-xl sm:text-2xl font-black text-amber-700 mt-0.5 font-display">
                      Chapter {result.currentChapter.value ?? 2}
                    </div>
                    <div className="text-[10px] text-slate-500 font-bold mt-0.5">Active Expansion</div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-white border-2 border-frontier-ink shadow-sm">
                    <div className="text-[11px] text-slate-500 font-bold">OBSERVED LIMIT</div>
                    <div className="text-xl sm:text-2xl font-black text-frontier-coral mt-0.5 font-display">
                      {result.walletCapPercent.value ?? 4}%
                    </div>
                    <div className="text-[10px] text-slate-500 font-bold mt-0.5">
                      {chapter?.source.walletCap === "unknown" ? "Unverified on-chain" : "Configured Cap"}
                    </div>
                  </div>
                </div>

                {/* Compliance Status Banner */}
                <div className="pt-3 border-t-2 border-dashed border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="text-slate-500 font-bold">HOOK VERDICT:</span>
                    {result.balance.value <= 0 ? (
                      <span className="font-black text-cyan-950 px-3 py-1 rounded-full bg-cyan-100 border-2 border-frontier-ink shadow-pop-sm">
                        GHOST NOMAD • NO HOLDINGS
                      </span>
                    ) : result.withinLimit.value === true ? (
                      <span className="font-black text-emerald-950 px-3 py-1 rounded-full bg-emerald-100 border-2 border-frontier-ink shadow-pop-sm">
                        WITHIN FRONTIER ALLOWANCE
                      </span>
                    ) : (
                      <span className="font-black text-rose-950 px-3 py-1 rounded-full bg-rose-100 border-2 border-frontier-ink shadow-pop-sm">
                        EXCEEDS PER-WALLET CAP
                      </span>
                    )}
                  </div>

                  <div className="text-slate-600 font-bold text-[11px]">
                    {result.balance.value <= 0
                      ? "Acquire $FRNT to summon settler"
                      : result.withinLimit.value === true
                      ? `Holds ${formatPercent(result.supplyPercent.value, 2)} of allowed ${result.walletCapPercent.value}%`
                      : "Transfers rejected by Token-2022 Hook"}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
