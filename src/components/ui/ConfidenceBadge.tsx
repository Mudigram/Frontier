import React from "react";
import type { DataSource } from "@/data/types";

interface ConfidenceBadgeProps {
  source: DataSource | "simulated" | "on-chain";
  size?: "sm" | "md";
  showIcon?: boolean;
  className?: string;
}

export const ConfidenceBadge: React.FC<ConfidenceBadgeProps> = ({
  source,
  size = "sm",
  showIcon = true,
  className = "",
}) => {
  const normalized = source.toLowerCase();

  const getStyle = () => {
    switch (normalized) {
      case "observed":
      case "on-chain":
        return {
          bg: "bg-emerald-50 border-2 border-frontier-ink text-emerald-900 shadow-[1px_1px_0px_#0f172a]",
          dot: "bg-emerald-500",
          label: normalized === "observed" ? "OBSERVED" : "ON-CHAIN",
        };
      case "derived":
        return {
          bg: "bg-amber-50 border-2 border-frontier-ink text-amber-900 shadow-[1px_1px_0px_#0f172a]",
          dot: "bg-amber-500",
          label: "DERIVED",
        };
      case "configured":
        return {
          bg: "bg-purple-50 border-2 border-frontier-ink text-purple-900 shadow-[1px_1px_0px_#0f172a]",
          dot: "bg-purple-500",
          label: "CONFIGURED",
        };
      case "simulated":
        return {
          bg: "bg-rose-50 border-2 border-frontier-ink text-rose-900 shadow-[1px_1px_0px_#0f172a]",
          dot: "bg-rose-500",
          label: "SIMULATED",
        };
      case "unknown":
      default:
        return {
          bg: "bg-slate-100 border-2 border-frontier-ink text-slate-800 shadow-[1px_1px_0px_#0f172a]",
          dot: "bg-slate-400",
          label: "UNKNOWN",
        };
    }
  };

  const { bg, dot, label } = getStyle();
  const sizeStyles =
    size === "sm"
      ? "text-[10px] tracking-wider px-2 py-0.5"
      : "text-xs tracking-widest px-2.5 py-1";

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-mono uppercase font-black border border-frontier-ink rounded-full shadow-[1px_1px_0px_#0f172a] ${bg} ${sizeStyles} ${className}`}
    >
      {showIcon && (
        <span
          className={`w-1.5 h-1.5 rounded-full ${dot} ${
            normalized === "simulated" ? "animate-pulse" : ""
          }`}
        />
      )}
      {label}
    </span>
  );
};
