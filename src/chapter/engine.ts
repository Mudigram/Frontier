// ============================================================
// Chapter Engine — Core Calculation Logic
// ============================================================
// Pure functions that accept observable data and produce a
// normalized Chapter state. No side effects, no I/O.
//
// IMPORTANT: These calculations use CONFIGURED thresholds.
// They do NOT claim to represent the exact live Hooked
// implementation until verified against the hook.
// ============================================================

import type { ChapterConfig, ChapterState, ChapterMode } from "./types";
import type { DataSource } from "@/data/types";

/**
 * Calculates the current chapter index from cumulative volume.
 *
 * Chapter = floor(volume / volumePerChapter)
 *
 * Example with volumePerChapter = 3,000,000:
 *   0          → Chapter 0
 *   2,999,999  → Chapter 0
 *   3,000,000  → Chapter 1
 *   6,870,000  → Chapter 2
 *   9,000,000  → Chapter 3
 */
export function calculateChapter(
  volume: number,
  config: ChapterConfig
): number {
  if (volume < 0) return 0;
  return Math.floor(volume / config.volumePerChapter);
}

/**
 * Calculates the wallet cap in basis points for a given chapter.
 *
 * cap = startingWalletCapBps × (capMultiplier ^ chapter)
 *
 * Example with startingCapBps=100, multiplier=2:
 *   Chapter 0 → 100 bps  (1%)
 *   Chapter 1 → 200 bps  (2%)
 *   Chapter 2 → 400 bps  (4%)
 *   Chapter 3 → 800 bps  (8%)
 *   Chapter 4 → 1600 bps (16%)
 */
export function calculateWalletCapBps(
  chapter: number,
  config: ChapterConfig
): number {
  return config.startingWalletCapBps * Math.pow(config.capMultiplier, chapter);
}

/**
 * Converts basis points to a percentage.
 * 100 bps → 1.0
 * 250 bps → 2.5
 */
export function bpsToPercent(bps: number): number {
  return bps / 100;
}

/**
 * Calculates the volume threshold for the START of a given chapter.
 *
 * threshold = chapter × volumePerChapter
 */
export function calculateChapterThreshold(
  chapter: number,
  config: ChapterConfig
): number {
  return chapter * config.volumePerChapter;
}

/**
 * Calculates progress within the current chapter.
 *
 * Returns:
 * - progressPercent: 0-100 within the current chapter
 * - remainingVolume: tokens needed to reach next chapter
 * - nextThreshold: total volume needed for next chapter
 * - volumeInCurrentChapter: volume accumulated since last chapter start
 */
export function calculateProgress(
  volume: number,
  config: ChapterConfig
): {
  progressPercent: number;
  remainingVolume: number;
  nextThreshold: number;
  volumeInCurrentChapter: number;
} {
  const chapter = calculateChapter(volume, config);
  const chapterStartVolume = chapter * config.volumePerChapter;
  const nextThreshold = (chapter + 1) * config.volumePerChapter;
  const volumeInCurrentChapter = volume - chapterStartVolume;
  const progressPercent =
    (volumeInCurrentChapter / config.volumePerChapter) * 100;

  return {
    progressPercent: Math.min(Math.max(progressPercent, 0), 100),
    remainingVolume: Math.max(nextThreshold - volume, 0),
    nextThreshold,
    volumeInCurrentChapter,
  };
}

/**
 * Builds the complete ChapterState from volume and configuration.
 *
 * This is the primary entry point for the engine.
 * The frontend should call this and render the result.
 *
 * @param volume     - Total observed or simulated volume
 * @param config     - Chapter configuration
 * @param mode       - "simulation" or "observed"
 * @param overrides  - Optional source overrides for provenance tracking
 */
export function buildChapterState(
  volume: number,
  config: ChapterConfig,
  mode: ChapterMode = "simulation",
  overrides?: Partial<ChapterState["source"]>
): ChapterState {
  const chapter = calculateChapter(volume, config);
  const capBps = calculateWalletCapBps(chapter, config);
  const progress = calculateProgress(volume, config);

  // Default source provenance based on mode
  const defaultSource: ChapterState["source"] =
    mode === "observed"
      ? {
          chapter: "derived" as DataSource,
          volume: "observed" as DataSource,
          walletCap: "derived" as DataSource,
        }
      : {
          chapter: "configured" as DataSource,
          volume: "configured" as DataSource,
          walletCap: "configured" as DataSource,
        };

  return {
    chapter,
    observedVolume: volume,
    currentWalletCapBps: capBps,
    currentWalletCapPercent: bpsToPercent(capBps),
    nextThreshold: progress.nextThreshold,
    remainingVolume: progress.remainingVolume,
    progressPercent: progress.progressPercent,
    mode,
    source: {
      ...defaultSource,
      ...overrides,
    },
  };
}

/**
 * Checks whether a given wallet balance (as % of supply) is within
 * the current chapter's wallet cap.
 *
 * @param supplyPercent - Wallet balance as percentage of total supply (e.g. 0.843)
 * @param chapterState  - Current chapter state from the engine
 * @returns true if within limit, false if exceeding, null if cap is unknown
 */
export function isWithinWalletCap(
  supplyPercent: number,
  chapterState: ChapterState
): boolean | null {
  if (chapterState.source.walletCap === "unknown") {
    return null;
  }
  return supplyPercent <= chapterState.currentWalletCapPercent;
}

/**
 * Returns the conceptual chapter progression table.
 * Useful for displaying the full progression in the UI.
 *
 * Example output:
 * [
 *   { chapter: 0, capBps: 100, capPercent: 1, thresholdVolume: 0 },
 *   { chapter: 1, capBps: 200, capPercent: 2, thresholdVolume: 3000000 },
 *   ...
 * ]
 */
export function getProgressionTable(
  config: ChapterConfig,
  maxChapters: number = 5
): Array<{
  chapter: number;
  capBps: number;
  capPercent: number;
  thresholdVolume: number;
}> {
  return Array.from({ length: maxChapters }, (_, i) => ({
    chapter: i,
    capBps: calculateWalletCapBps(i, config),
    capPercent: bpsToPercent(calculateWalletCapBps(i, config)),
    thresholdVolume: calculateChapterThreshold(i, config),
  }));
}
