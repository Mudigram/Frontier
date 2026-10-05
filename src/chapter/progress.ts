// ============================================================
// Chapter Progress — Display Formatting Helpers
// ============================================================
// Transforms raw ChapterState into display-ready strings
// for the UI. Keeps rendering logic out of components.
// ============================================================

import type { ChapterState } from "./types";
import { formatCompact, formatPercent, formatBps } from "@/lib/format";
import { toRoman } from "@/lib/constants";

/**
 * Complete set of display-ready values for the Chapter Progress UI.
 */
export interface ChapterProgressDisplay {
  /** Roman numeral chapter (e.g. "II") */
  chapterRoman: string;

  /** Chapter number (e.g. 2) */
  chapterNumber: number;

  /** Progress percentage formatted (e.g. "76.3%") */
  progressFormatted: string;

  /** Progress as a 0-1 fraction for progress bars */
  progressFraction: number;

  /** Current volume formatted (e.g. "6.87M") */
  volumeFormatted: string;

  /** Next threshold formatted (e.g. "9M") */
  nextThresholdFormatted: string;

  /** Remaining volume formatted (e.g. "2.13M") */
  remainingFormatted: string;

  /** Wallet cap formatted (e.g. "4%") */
  walletCapFormatted: string;

  /** Volume progress string (e.g. "6,870,000 / 9,000,000") */
  volumeProgressString: string;

  /** Remaining with symbol (e.g. "2,130,000 FRNT") */
  remainingWithSymbol: string;

  /** Short status line (e.g. "76% TO NEXT CHAPTER") */
  statusLine: string;
}

/**
 * Transforms a ChapterState into display-ready formatted values.
 *
 * Example usage:
 * ```ts
 * const display = formatChapterProgress(chapterState);
 * // display.chapterRoman     → "II"
 * // display.progressFormatted → "76.3%"
 * // display.remainingFormatted → "2.13M"
 * // display.walletCapFormatted → "4%"
 * ```
 */
export function formatChapterProgress(
  state: ChapterState,
  tokenSymbol: string = "FRNT"
): ChapterProgressDisplay {
  const progressFraction = state.progressPercent / 100;

  return {
    chapterRoman: toRoman(state.chapter),
    chapterNumber: state.chapter,
    progressFormatted: formatPercent(state.progressPercent),
    progressFraction,
    volumeFormatted: formatCompact(state.observedVolume),
    nextThresholdFormatted: formatCompact(state.nextThreshold),
    remainingFormatted: formatCompact(state.remainingVolume),
    walletCapFormatted: formatBps(state.currentWalletCapBps),
    volumeProgressString: `${formatCompact(state.observedVolume)} / ${formatCompact(state.nextThreshold)}`,
    remainingWithSymbol: `${formatCompact(state.remainingVolume)} ${tokenSymbol}`,
    statusLine: `${Math.round(state.progressPercent)}% TO NEXT CHAPTER`,
  };
}

/**
 * Generates the text block for the progress section.
 *
 * Example output:
 * ```text
 * Chapter II
 *
 * 6,870,000 / 9,000,000
 *
 * ██████████████░░░░░░
 *
 * 76.3%
 *
 * 2,130,000 FRNT
 * until Chapter III
 * ```
 */
export function generateProgressText(
  state: ChapterState,
  tokenSymbol: string = "FRNT"
): string {
  const display = formatChapterProgress(state, tokenSymbol);
  const nextChapterRoman = toRoman(state.chapter + 1);

  const barLength = 20;
  const filled = Math.round(display.progressFraction * barLength);
  const empty = barLength - filled;
  const progressBar = "█".repeat(filled) + "░".repeat(empty);

  return [
    `Chapter ${display.chapterRoman}`,
    "",
    display.volumeProgressString,
    "",
    progressBar,
    "",
    display.progressFormatted,
    "",
    `${display.remainingWithSymbol}`,
    `until Chapter ${nextChapterRoman}`,
  ].join("\n");
}
