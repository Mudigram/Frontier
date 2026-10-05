import React from "react";
import { FRONTIER, TOKEN_2022_PROGRAM } from "@/lib/constants";

export const Footer: React.FC = () => {
  return (
    <footer className="w-full border-t-2 border-frontier-ink bg-white py-12 px-4 sm:px-6 lg:px-8 mt-20">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-slate-500 font-mono">
        <div className="flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left">
          <div className="flex items-center gap-2">
            <span className="font-black tracking-tight text-frontier-ink font-display text-sm">
              {FRONTIER.name}
            </span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase bg-frontier-yellow text-frontier-ink border border-frontier-ink shadow-sm">
              ${FRONTIER.symbol}
            </span>
          </div>
          <span className="hidden sm:inline text-slate-300">|</span>
          <span className="font-bold text-slate-700">Token-2022 Transfer Hook Architecture</span>
          <span className="hidden sm:inline text-slate-300">|</span>
          <span className="truncate max-w-[200px] text-slate-500" title={TOKEN_2022_PROGRAM}>
            Program: {TOKEN_2022_PROGRAM.slice(0, 8)}...
          </span>
        </div>

        <div className="flex items-center gap-4">
          <span className="px-3 py-1.5 rounded-full text-[11px] font-mono font-black bg-emerald-50 border-2 border-frontier-ink shadow-pop-sm text-emerald-800 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span>SOLANA ON-CHAIN OBSERVABILITY</span>
          </span>
        </div>
      </div>
    </footer>
  );
};
