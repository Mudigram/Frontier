import React from "react";
import type { DataSource } from "@/data/types";
import { ConfidenceBadge } from "./ConfidenceBadge";

interface SourceIndicatorProps {
  label: string;
  source: DataSource;
  note?: string;
  className?: string;
}

export const SourceIndicator: React.FC<SourceIndicatorProps> = ({
  label,
  source,
  note,
  className = "",
}) => {
  return (
    <div className={`flex items-center justify-between text-xs py-1 ${className}`}>
      <span className="text-slate-400 font-medium">{label}</span>
      <div className="flex items-center gap-2">
        {note && (
          <span className="text-[11px] text-slate-500 font-mono hidden sm:inline">
            {note}
          </span>
        )}
        <ConfidenceBadge source={source} size="sm" />
      </div>
    </div>
  );
};
