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
      <div className="w-full h-full min-h-[360px] flex flex-col items-center justify-center font-mono text-xs text-frontier-ink gap-2">
        <div className="w-8 h-8 rounded-full border-3 border-frontier-ink border-t-frontier-coral animate-spin" />
        <span className="font-bold text-[11px] uppercase tracking-wider">Awakening Sentry Checkpoint...</span>
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
          <div className="w-8 h-8 rounded-xl bg-frontier-yellow border-2 border-frontier-ink flex items-center justify-center text-frontier-ink shadow-pop-sm">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
          </div>
        );
      case "hook_rejection":
        return (
          <div className="w-8 h-8 rounded-xl bg-rose-100 border-2 border-frontier-ink flex items-center justify-center text-rose-800 shadow-pop-sm">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
            </svg>
          </div>
        );
      case "buy":
        return (
          <div className="w-8 h-8 rounded-xl bg-emerald-100 border-2 border-frontier-ink flex items-center justify-center text-emerald-800 shadow-pop-sm">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
            </svg>
          </div>
        );
      case "sell":
        return (
          <div className="w-8 h-8 rounded-xl bg-amber-100 border-2 border-frontier-ink flex items-center justify-center text-amber-800 shadow-pop-sm">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M20 12H4" />
            </svg>
          </div>
        );
      case "wallet_milestone":
        return (
          <div className="w-8 h-8 rounded-xl bg-purple-100 border-2 border-frontier-ink flex items-center justify-center text-purple-800 shadow-pop-sm">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
            </svg>
          </div>
        );
      case "pool_event":
      default:
        return (
          <div className="w-8 h-8 rounded-xl bg-slate-100 border-2 border-frontier-ink flex items-center justify-center text-slate-800 shadow-pop-sm">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </div>
        );
    }
  };

  const latestEvent = events.length > 0 ? events[0] : null;

  return (
    <section id="activity" className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-10">
      <div className="rounded-3xl bg-white border-3 border-frontier-ink p-6 sm:p-10 shadow-pop-lg">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b-2 border-dashed border-slate-200 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider bg-frontier-coral text-white border-2 border-frontier-ink shadow-pop-sm">
              📡 3D OBSERVABILITY GATE
            </div>
            <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-frontier-ink mt-2 font-display">
              Frontier Live Activity & Checkpoint
            </h2>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono font-bold text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-full border-2 border-frontier-ink shadow-pop-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span>REAL-TIME STREAM</span>
          </div>
        </div>

        {/* Main Grid: 3D Sentry Gate + Live Feed */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* 3D Sentry Checkpoint Viewport (6 cols) */}
          <div className="lg:col-span-6 flex flex-col gap-4">
            <div className="w-full h-[380px] sm:h-[420px] rounded-2xl border-2 border-frontier-ink bg-gradient-to-b from-[#fef08a]/20 via-[#fed7aa]/20 to-[#faf8f5] shadow-pop-sm overflow-hidden relative">
              <SentryGateScene latestEvent={latestEvent} />
            </div>

            {/* Checkpoint Status Banner */}
            <div className="p-4 rounded-2xl bg-frontier-bg border-2 border-frontier-ink shadow-pop-sm font-mono text-xs flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse border border-frontier-ink" />
                <span className="font-bold text-frontier-ink">TOKEN-2022 GATEKEEPER:</span>
                <span className="font-black text-emerald-700">ACTIVE ENFORCEMENT</span>
              </div>
              <span className="text-[11px] text-slate-500 font-bold">CPI Hook Guarded</span>
            </div>
          </div>

          {/* Activity Event Stream List (6 cols) */}
          <div className="lg:col-span-6 divide-y divide-slate-100 max-h-[470px] overflow-y-auto pr-1">
            {events.length === 0 ? (
              <div className="py-12 text-center text-slate-500 font-mono font-bold text-sm">
                No recent events observed on Frontier.
              </div>
            ) : (
              events.map((evt) => (
                <div
                  key={evt.id}
                  className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 group hover:bg-slate-50 px-2 rounded-xl transition-all"
                >
                  <div className="flex items-start sm:items-center gap-3">
                    {getEventIcon(evt.type)}
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-black text-frontier-ink tracking-wide font-display">
                          {evt.title}
                        </span>
                        <ConfidenceBadge source={evt.confidence} size="sm" />
                      </div>
                      <div className="text-xs text-slate-600 font-medium mt-0.5 max-w-sm">
                        {evt.description}
                      </div>
                    </div>
                  </div>

                  <div className="text-right font-mono text-xs text-slate-500 flex sm:flex-col items-center sm:items-end justify-between sm:justify-center pl-11 sm:pl-0 flex-shrink-0">
                    <span className="font-black text-frontier-coral">{formatRelativeTime(evt.timestamp)}</span>
                    {evt.slot && (
                      <span className="text-[10px] text-slate-400 font-mono">
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
