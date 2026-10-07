"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { useFrontier } from "@/context/FrontierContext";
import type { WalletState } from "@/data/types";
import { formatNumber, formatPercent, truncateAddress } from "@/lib/format";
import { ConfidenceBadge } from "@/components/ui/ConfidenceBadge";
import {
  getArchetypeFromPercent,
  type CitizenMetadata,
} from "@/3d/LowPolyCitizen";

// Dynamic import with SSR false for the 3D Citizen Avatar Canvas
const CitizenPassCanvas = dynamic(
  () => import("@/3d/CitizenPassCanvas").then((mod) => mod.CitizenPassCanvas),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full min-h-[260px] flex flex-col items-center justify-center font-mono text-xs text-slate-500 gap-2">
        <div className="w-5 h-5 rounded-full border-2 border-slate-600 border-t-amber-400 animate-spin" />
        <span>Synthesizing 3D Avatar...</span>
      </div>
    ),
  }
);

const PRESET_WALLETS = [
  { label: "Scout (0.05%)", address: "WALLET_SCOUT_000000000000000000000000000000000", customPercent: 0.05, customBal: 500_000 },
  { label: "Settler (0.84% - Alice)", address: "WALLET_ALICE_111111111111111111111111111111111", customPercent: 0.843, customBal: 8_430_000 },
  { label: "Baron (1.65%)", address: "WALLET_BARON_222222222222222222222222222222222", customPercent: 1.65, customBal: 16_500_000 },
  { label: "Vanguard (3.20%)", address: "WALLET_VANGUARD_333333333333333333333333333333", customPercent: 3.20, customBal: 32_000_000 },
  { label: "Leviathan (5.10% - Breach)", address: "WALLET_LEVIATHAN_999999999999999999999999999", customPercent: 5.10, customBal: 51_000_000 },
];

export const PioneerTerritoryPass: React.FC = () => {
  const { lookupWallet, chapter } = useFrontier();
  const [addressInput, setAddressInput] = useState<string>(PRESET_WALLETS[1].address);
  const [walletData, setWalletData] = useState<WalletState | null>(null);
  const [customPercentOverride, setCustomPercentOverride] = useState<number>(0.843);
  const [isSearching, setIsSearching] = useState<boolean>(false);

  const fetchWallet = async (address: string, overridePct?: number) => {
    setIsSearching(true);
    try {
      const data = await lookupWallet(address);
      setWalletData(data);
      if (overridePct !== undefined) {
        setCustomPercentOverride(overridePct);
      } else {
        setCustomPercentOverride(data.supplyPercent.value);
      }
    } catch (err) {
      console.error("Failed to query wallet:", err);
    } finally {
      setIsSearching(false);
    }
  };

  useEffect(() => {
    fetchWallet(PRESET_WALLETS[1].address, PRESET_WALLETS[1].customPercent);
  }, []);

  const effectivePercent = customPercentOverride;
  const archetypeMeta: CitizenMetadata = getArchetypeFromPercent(effectivePercent);
  const currentCap = chapter?.currentWalletCapPercent ?? 4.0;
  const isWithinLimit = effectivePercent <= currentCap;

  return (
    <section id="pioneer-pass" className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-12">
      <div className="rounded-2xl bg-frontier-surface/90 border border-frontier-border p-6 sm:p-10 backdrop-blur-md shadow-2xl relative overflow-hidden">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-frontier-border/60 gap-4">
          <div>
            <div className="text-xs uppercase font-mono tracking-[0.25em] text-slate-400">
              Citizen Registry & Verification
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mt-1">
              Pioneer Territory Pass
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-slate-400">CITIZEN TIER</span>
            <span
              className="text-xs font-mono font-bold px-2.5 py-1 rounded border uppercase"
              style={{
                borderColor: `${archetypeMeta.tierColor}60`,
                color: archetypeMeta.tierColor,
                backgroundColor: `${archetypeMeta.tierColor}15`,
              }}
            >
              {archetypeMeta.title}
            </span>
          </div>
        </div>

        {/* Address Search & Presets */}
        <div className="mt-8 space-y-3">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (addressInput.trim()) fetchWallet(addressInput.trim());
            }}
            className="flex flex-col sm:flex-row gap-3"
          >
            <input
              type="text"
              value={addressInput}
              onChange={(e) => setAddressInput(e.target.value)}
              placeholder="Enter Solana wallet address to generate pass..."
              className="flex-1 px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-sm font-mono text-white placeholder-slate-500 focus:outline-none focus:border-frontier-gold/60 transition-colors"
            />
            <button
              type="submit"
              disabled={isSearching}
              className="px-6 py-3 rounded-xl bg-frontier-gold/90 hover:bg-frontier-gold text-slate-950 font-bold font-mono text-xs uppercase tracking-wider transition-colors disabled:opacity-50"
            >
              {isSearching ? "Verifying..." : "Verify Identity"}
            </button>
          </form>

          {/* Quick Preset Ranks */}
          <div className="flex items-center overflow-x-auto pb-1 sm:pb-0 gap-2 font-mono text-xs scrollbar-none -mx-1 px-1">
            <span className="text-slate-500 text-[11px] whitespace-nowrap hidden sm:inline">Archetypes:</span>
            {PRESET_WALLETS.map((preset) => (
              <button
                key={preset.label}
                onClick={() => {
                  setAddressInput(preset.address);
                  fetchWallet(preset.address, preset.customPercent);
                }}
                className={`px-3 py-2 rounded-lg border transition-colors whitespace-nowrap min-h-[40px] flex items-center justify-center cursor-pointer ${
                  addressInput === preset.address
                    ? "bg-slate-800 border-frontier-gold text-frontier-gold"
                    : "bg-slate-950/80 border-slate-800 text-slate-400 hover:text-slate-200"
                }`}
              >
                {preset.label}
              </button>
            ))}
          </div>
        </div>

        {/* The 3D Pioneer Identity Card (Split Layout) */}
        <div className="mt-8 rounded-2xl bg-slate-950/90 border border-slate-800 overflow-hidden grid grid-cols-1 lg:grid-cols-12 shadow-2xl">
          {/* Left: 3D Citizen Avatar Canvas (5 cols) */}
          <div
            className="lg:col-span-5 relative flex flex-col items-center justify-center p-6 border-b lg:border-b-0 lg:border-r border-slate-800"
            style={{
              background: `radial-gradient(circle at 50% 60%, ${archetypeMeta.tierColor}15 0%, transparent 70%)`,
            }}
          >
            <div className="w-full h-[320px] sm:h-[340px]">
              <CitizenPassCanvas archetype={archetypeMeta.archetype} />
            </div>

            <div className="text-center mt-2">
              <div
                className="text-base font-bold font-mono uppercase tracking-wider"
                style={{ color: archetypeMeta.tierColor }}
              >
                {archetypeMeta.title}
              </div>
              <div className="text-xs text-slate-400 font-mono mt-0.5">
                {archetypeMeta.subtitle}
              </div>
            </div>
          </div>

          {/* Right: Credentials Dossier (7 cols) */}
          <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between font-mono text-xs">
            <div>
              {/* Pass ID Barcode Banner */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-800/80">
                <span className="text-slate-500 uppercase tracking-widest text-[11px]">
                  TERRITORY CITIZEN IDENTIFIER
                </span>
                <ConfidenceBadge source={walletData?.balance.source ?? "observed"} size="sm" />
              </div>

              {/* Wallet Key */}
              <div className="mt-4">
                <div className="text-slate-400 text-[11px]">SOLANA CREDENTIAL:</div>
                <div className="text-sm font-bold text-white mt-0.5 break-all select-all">
                  {addressInput}
                </div>
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-2 gap-4 my-6 p-4 rounded-xl bg-slate-900/60 border border-slate-800/80">
                <div>
                  <div className="text-slate-500 text-[11px]">ESTIMATED HOLDING</div>
                  <div className="text-xl font-bold text-white mt-1">
                    {formatNumber(effectivePercent * 10_000_000)} FRNT
                  </div>
                  <div className="text-slate-400 text-[10px] mt-0.5">Out of 1B Supply</div>
                </div>

                <div>
                  <div className="text-slate-500 text-[11px]">SUPPLY SHARE</div>
                  <div
                    className="text-xl font-bold mt-1"
                    style={{ color: archetypeMeta.tierColor }}
                  >
                    {formatPercent(effectivePercent, 3)}
                  </div>
                  <div className="text-slate-400 text-[10px] mt-0.5">
                    Active Limit: {currentCap.toFixed(2)}%
                  </div>
                </div>
              </div>

              {/* Lore Role Description */}
              <p className="text-slate-300 font-sans text-xs leading-relaxed">
                {archetypeMeta.description}
              </p>
            </div>

            {/* Compliance Badge */}
            <div className="mt-6 pt-4 border-t border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="text-slate-500">AUTHORIZATION:</span>
                {isWithinLimit ? (
                  <span className="px-2.5 py-1 rounded bg-emerald-950/80 text-emerald-300 border border-emerald-500/50 font-bold text-xs uppercase tracking-wider">
                    ✓ WITHIN FRONTIER ALLOWANCE
                  </span>
                ) : (
                  <span className="px-2.5 py-1 rounded bg-rose-950/80 text-rose-300 border border-rose-500/50 font-bold text-xs uppercase tracking-wider">
                    ⚠ EXCEEDS CHAPTER CEILING (ERROR 6000)
                  </span>
                )}
              </div>

              <div className="text-slate-500 text-[11px]">
                {isWithinLimit
                  ? "Permitted by Transfer Hook"
                  : "Blocked by On-Chain Hook"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
