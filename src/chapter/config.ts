// ============================================================
// Chapter Configuration
// ============================================================
// IMPORTANT: These values are CONFIGURATION, not proof of
// live on-chain state. The UI must always display these as
// "CONFIGURED" until verified against the actual hook.
// ============================================================

import type { ChapterConfig } from "./types";

/**
 * Initial Chapter configuration for Frontier (FRNT).
 *
 * Starting cap: 1% of supply
 * Volume per chapter: 3,000,000 tokens
 * Cap multiplier: 2x per chapter
 *
 * Conceptual progression:
 *   Chapter 0 → 1%
 *   Chapter 1 → 2%
 *   Chapter 2 → 4%
 *   Chapter 3 → 8%
 *   Chapter 4 → 16%
 *
 * These values have NOT been verified against the on-chain hook
 * implementation. They are starting-point configuration.
 */
export const CHAPTER_CONFIG: ChapterConfig = {
  supply: 1_000_000_000,

  startingWalletCapBps: 100, // 1%

  volumePerChapter: 3_000_000,

  capMultiplier: 2,

  curve: {
    startingMarketCap: 0,
    graduationMarketCap: 0,
    permanent: true,
  },
};

/**
 * Maximum number of chapters supported by the world visualization.
 * The engine itself has no upper bound, but the world map only
 * renders these named territories.
 */
export const MAX_DISPLAY_CHAPTERS = 5;
