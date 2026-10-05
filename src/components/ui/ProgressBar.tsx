import React from "react";

interface ProgressBarProps {
  progressPercent: number;
  className?: string;
  heightClass?: string;
  showTicks?: boolean;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  progressPercent,
  className = "",
  heightClass = "h-3",
  showTicks = true,
}) => {
  const clampedPercent = Math.min(Math.max(progressPercent, 0), 100);

  return (
    <div className={`relative w-full ${className}`}>
      {/* Track */}
      <div
        className={`w-full ${heightClass} bg-frontier-bg border-2 border-frontier-ink rounded-full overflow-hidden p-0.5 relative shadow-pop-sm`}
      >
        {/* Fill */}
        <div
          className="h-full rounded-full bg-gradient-to-r from-frontier-yellow via-frontier-tangerine to-frontier-coral candy-stripe transition-all duration-500 ease-out relative"
          style={{ width: `${clampedPercent}%` }}
        >
          {/* Subtle light sweep */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent animate-pulse" />
        </div>
      </div>

      {/* Chapter Quarter Ticks */}
      {showTicks && (
        <div className="flex justify-between w-full text-[10px] text-slate-700 font-mono font-bold mt-2.5 px-0.5 select-none">
          <span className="px-2 py-0.5 rounded-full bg-white border border-frontier-ink shadow-[1px_1px_0px_#0f172a]">0%</span>
          <span className="px-2 py-0.5 rounded-full bg-white border border-frontier-ink shadow-[1px_1px_0px_#0f172a]">25%</span>
          <span className="px-2 py-0.5 rounded-full bg-white border border-frontier-ink shadow-[1px_1px_0px_#0f172a]">50%</span>
          <span className="px-2 py-0.5 rounded-full bg-white border border-frontier-ink shadow-[1px_1px_0px_#0f172a]">75%</span>
          <span className="px-2 py-0.5 rounded-full bg-frontier-yellow border border-frontier-ink text-frontier-ink font-black shadow-[1px_1px_0px_#0f172a]">100% 🚀</span>
        </div>
      )}
    </div>
  );
};
