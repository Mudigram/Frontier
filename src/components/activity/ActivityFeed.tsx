"use client";

import React from "react";
import dynamic from "next/dynamic";
import { useFrontier } from "@/context/FrontierContext";
import { formatRelativeTime } from "@/lib/format";
import { ConfidenceBadge } from "../ui/ConfidenceBadge";

const SentryGateScene = dynamic(
  () => import("@/3d/village/SentryGateScene").then((mod) => mod.SentryGateScene),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full min-h-[360px] flex flex-col items-center justify-center font-mono text-xs text-slate-400 gap-2">
        <div className="w-6 h-6 rounded-full border-2 border-slate-700 border-t-amber-400 animate-spin" />
        <span className="font-semibold text-[11px] uppercase tracking-wider">Awakening Sentry Checkpoint...</span>
      </div>
    ),
  }
);

export const ActivityFeed: React.FC = () => {
  const { events } = useFrontier();

  const getEventIcon = (type: string) => {
    switch (type) {
      case "chapter_advance":
        return (
          <div className="w-8 h-8 rounded-lg bg-amber-950/70 border border-amber-600/70 flex items-center justify-center text-amber-300">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
          </div>
        );
      case "hook_rejection":
        return (
          <div className="w-8 h-8 rounded-lg bg-rose-950/70 border border-rose-600/70 flex items-center justify-center text-rose-300">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
            </svg>
          </div>
        );
      case "buy":
        return (
          <div className="w-8 h-8 rounded-lg bg-emerald-950/70 border border-emerald-600/70 flex items-center justify-center text-emerald-300">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </div>
        );
      case "sell":
        return (
          <div className="w-8 h-8 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
            </svg>
          </div>
        );
      case "wallet_milestone":
        return (
          <div className="w-8 h-8 rounded-lg bg-purple-950/70 border border-purple-600/70 flex items-center justify-center text-purple-300">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
            </svg>
          </div>
        );
      case "pool_event":
      default:
        return (
          <div className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </div>
        );
    }
  };

  const latestEvent = events.length > 0 ? events[0] : null;

  return (
    <section id="activity" className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-10">
      <div className="rounded-2xl bg-frontier-surface/90 border border-frontier-border p-6 sm:p-10 backdrop-blur-md shadow-xl">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-800 gap-4">
          <div>
            <div className="text-xs uppercase font-mono tracking-[0.25em] text-slate-400">
              Live Observability Feed
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mt-1">
              Frontier Live Activity & Checkpoint
            </h2>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono font-bold text-emerald-400 bg-emerald-950/80 px-3 py-1.5 rounded-lg border border-emerald-700/80">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>REAL-TIME STREAM</span>
          </div>
        </div>

        {/* Main Grid: 3D Sentry Gate + Live Feed */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* 3D Sentry Checkpoint Viewport (6 cols) */}
          <div className="lg:col-span-6 flex flex-col gap-4">
            <div className="w-full h-[380px] sm:h-[420px] rounded-xl border border-slate-800 bg-gradient-to-b from-slate-950/80 via-slate-900/60 to-frontier-bg shadow-inner overflow-hidden relative">
              <SentryGateScene latestEvent={latestEvent} />
            </div>

            {/* Checkpoint Status Banner */}
            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800/80 font-mono text-xs flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-slate-400">TOKEN-2022 GATEKEEPER:</span>
                <span className="font-bold text-emerald-400">ACTIVE ENFORCEMENT</span>
              </div>
              <span className="text-[11px] text-slate-500 font-mono">CPI Hook Guarded</span>
            </div>
          </div>

          {/* Activity Event Stream List (6 cols) */}
          <div className="lg:col-span-6 space-y-2.5 max-h-[470px] overflow-y-auto pr-1">
            {events.length === 0 ? (
              <div className="py-12 text-center text-slate-500 font-mono text-xs">
                No recent events observed on Frontier.
              </div>
            ) : (
              events.map((evt) => (
                <div
                  key={evt.id}
                  className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80 hover:border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-colors font-mono"
                >
                  <div className="flex items-start sm:items-center gap-3">
                    {getEventIcon(evt.type)}
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-white tracking-wide">
                          {evt.title}
                        </span>
                        <ConfidenceBadge source={evt.confidence} size="sm" />
                      </div>
                      <div className="text-xs text-slate-400 font-sans mt-0.5 max-w-sm">
                        {evt.description}
                      </div>
                    </div>
                  </div>

                  <div className="text-right font-mono text-xs text-slate-400 flex sm:flex-col items-center sm:items-end justify-between sm:justify-center pl-11 sm:pl-0 flex-shrink-0">
                    <span className="font-semibold text-amber-400">{formatRelativeTime(evt.timestamp)}</span>
                    {evt.slot && (
                      <span className="text-[10px] text-slate-500 font-mono mt-0.5">
                        Slot {evt.slot}
                      </span>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
