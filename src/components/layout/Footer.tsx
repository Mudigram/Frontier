import React from "react";
import { FRONTIER, TOKEN_2022_PROGRAM } from "@/lib/constants";

export const Footer: React.FC = () => {
  return (
    <footer className="w-full border-t border-slate-800 bg-slate-950/80 py-10 px-4 sm:px-6 lg:px-8 mt-20">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-slate-500 font-mono">
        <div className="flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md border border-frontier-gold/50 bg-slate-900 overflow-hidden flex items-center justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/logo.png"
                alt="Frontier Crest"
                className="w-full h-full object-cover scale-110"
              />
            </div>
            <span className="font-bold tracking-tight text-white font-mono text-sm">
              {FRONTIER.name}
            </span>
            <span className="px-1.5 py-0.2 rounded text-[10px] font-mono font-bold uppercase bg-frontier-gold/15 text-frontier-gold border border-frontier-gold/40">
              ${FRONTIER.symbol}
            </span>
          </div>
          <span className="hidden sm:inline text-slate-700">|</span>
          <span className="text-slate-400">Token-2022 Transfer Hook Architecture</span>
          <span className="hidden sm:inline text-slate-700">|</span>
          <span className="truncate max-w-[200px] text-slate-500" title={TOKEN_2022_PROGRAM}>
            Program: {TOKEN_2022_PROGRAM.slice(0, 8)}...
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <a
            href="https://x.com/PlayFRNTonSol"
            target="_blank"
            rel="noopener noreferrer"
            className="px-2.5 py-1 rounded-lg text-[11px] font-mono bg-slate-900 border border-slate-800 text-slate-300 hover:text-frontier-gold hover:border-slate-700 transition-colors flex items-center gap-1.5"
          >
            <span>X: @PlayFRNTonSol</span>
          </a>

          <a
            href={process.env.NEXT_PUBLIC_FRONTIER_MINT ? `https://pump.fun/${process.env.NEXT_PUBLIC_FRONTIER_MINT}` : "https://pump.fun"}
            target="_blank"
            rel="noopener noreferrer"
            className="px-2.5 py-1 rounded-lg text-[11px] font-mono bg-amber-950/40 border border-amber-600/40 text-amber-300 hover:bg-amber-950/70 transition-colors flex items-center gap-1"
          >
            <span>Pump.fun</span>
            <span>⚡</span>
          </a>

          <a
            href={process.env.NEXT_PUBLIC_FRONTIER_MINT ? `https://dexscreener.com/solana/${process.env.NEXT_PUBLIC_FRONTIER_MINT}` : "https://dexscreener.com/solana"}
            target="_blank"
            rel="noopener noreferrer"
            className="px-2.5 py-1 rounded-lg text-[11px] font-mono bg-slate-900 border border-slate-800 text-slate-300 hover:text-emerald-300 hover:border-emerald-700/60 transition-colors flex items-center gap-1"
          >
            <span>DexScreener</span>
            <span className="text-emerald-400">📈</span>
          </a>

          <span className="px-2.5 py-1 rounded-lg text-[11px] font-mono bg-slate-900 border border-slate-800 text-slate-400 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>SOLANA TOKEN-2022</span>
          </span>
        </div>
      </div>
    </footer>
  );
};
