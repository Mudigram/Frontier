// ============================================================
// Chapter Engine — Core Types
// ============================================================

import type { DataSource } from "@/data/types";

/**
 * Chapter engine operating mode.
 * - simulation: Using configured thresholds (not verified on-chain)
 * - observed:   Using data verified against the actual hook state
 */
export type ChapterMode = "simulation" | "observed";

/**
 * Chapter configuration values.
 *
 * IMPORTANT: These are CONFIGURATION, not proof of live on-chain state.
 * The system must always distinguish CONFIGURED from OBSERVED.
 */
export interface ChapterConfig {
  /** Total token supply (e.g. 1,000,000,000) */
  supply: number;

  /** Starting wallet cap in basis points (100 = 1%) */
  startingWalletCapBps: number;

  /** Token volume required to advance one Chapter */
  volumePerChapter: number;

  /** Multiplier applied to wallet cap each Chapter (e.g. 2 = doubles) */
  capMultiplier: number;

  /** Bonding curve configuration */
  curve: {
    startingMarketCap: number;
    graduationMarketCap: number;
    permanent: boolean;
  };
}

/**
 * Computed Chapter state — the primary output of the Chapter Engine.
 */
export interface ChapterState {
  /** Current chapter index (0-based) */
  chapter: number;

  /** Total observed or simulated volume */
  observedVolume: number;

  /** Current wallet cap in basis points */
  currentWalletCapBps: number;

  /** Current wallet cap as a percentage (e.g. 4.0 = 4%) */
  currentWalletCapPercent: number;

  /** Volume threshold for the NEXT chapter */
  nextThreshold: number;

  /** Volume remaining until next chapter */
  remainingVolume: number;

  /** Progress toward next chapter as percentage (0-100) */
  progressPercent: number;

  /** Engine operating mode */
  mode: ChapterMode;

  /** Provenance tracking for each derived value */
  source: {
    chapter: DataSource;
    volume: DataSource;
    walletCap: DataSource;
  };
}

/**
 * World definition for a single chapter territory.
 */
export interface ChapterWorld {
  /** Chapter index (0-based) */
  id: number;

  /** Territory name (e.g. "Outpost", "Settlement") */
  name: string;

  /** Lore description */
  description: string;

  /** Whether this chapter has been reached */
  unlocked: boolean;

  /** Whether this is the currently active chapter */
  current: boolean;

  /** Timestamp when this chapter was reached (null if unreached) */
  reachedAt?: number;
}

/**
 * Chapter history entry — records when a chapter transition occurred.
 */
export interface ChapterHistoryEntry {
  /** Chapter that was entered */
  chapter: number;

  /** Territory name */
  name: string;

  /** Timestamp of the transition */
  timestamp: number;

  /** Volume at the time of transition */
  volumeAtTransition: number;

  /** Data source of this record */
  source: DataSource;
}
