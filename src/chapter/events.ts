// ============================================================
// Chapter Events — Event Detection & History Tracking
// ============================================================
// Detects chapter transitions and maintains an event history.
// Used by the mock provider's simulator and will be used by
// the live provider to interpret observed state changes.
// ============================================================

import type { ChapterHistoryEntry, ChapterConfig } from "./types";
import type { FrontierEvent, DataSource } from "@/data/types";
import { calculateChapter } from "./engine";
import { toRoman } from "@/lib/constants";

// ============================================================
// Chapter World Names
// ============================================================

/** Maps chapter index to territory name */
const CHAPTER_NAMES: Record<number, string> = {
  0: "Outpost",
  1: "Frontier",
  2: "Settlement",
  3: "Citadel",
  4: "Kingdom",
};

/**
 * Returns the territory name for a chapter index.
 * Falls back to "Chapter N" for unmapped indices.
 */
export function getChapterName(chapter: number): string {
  return CHAPTER_NAMES[chapter] ?? `Chapter ${chapter}`;
}

// ============================================================
// Transition Detection
// ============================================================

/**
 * Detects if a volume change causes a chapter transition.
 *
 * @param previousVolume - Volume before the change
 * @param newVolume      - Volume after the change
 * @param config         - Chapter configuration
 * @returns Array of chapter transitions that occurred (may be multiple
 *          if volume jumped across several chapters at once)
 */
export function detectChapterTransitions(
  previousVolume: number,
  newVolume: number,
  config: ChapterConfig
): Array<{ from: number; to: number }> {
  const previousChapter = calculateChapter(previousVolume, config);
  const newChapter = calculateChapter(newVolume, config);

  if (newChapter <= previousChapter) return [];

  // Generate transition events for each chapter crossed
  const transitions: Array<{ from: number; to: number }> = [];
  for (let i = previousChapter; i < newChapter; i++) {
    transitions.push({ from: i, to: i + 1 });
  }

  return transitions;
}

/**
 * Creates FrontierEvent objects for detected chapter transitions.
 */
export function createTransitionEvents(
  transitions: Array<{ from: number; to: number }>,
  source: DataSource = "configured"
): FrontierEvent[] {
  const now = Math.floor(Date.now() / 1000);

  return transitions.map((t, idx) => ({
    id: `chapter-transition-${t.from}-${t.to}-${now}`,
    type: "chapter_advance" as const,
    title: "CHAPTER ADVANCED",
    description: `${getChapterName(t.from)} → ${getChapterName(t.to)}`,
    timestamp: now - idx, // Slight offset so they sort correctly
    confidence: (source === "observed" ? "on-chain" : "simulated") as FrontierEvent["confidence"],
    data: {
      fromChapter: t.from,
      toChapter: t.to,
      fromName: getChapterName(t.from),
      toName: getChapterName(t.to),
    },
  }));
}

// ============================================================
// Chapter History Manager
// ============================================================

/**
 * Manages a chronological history of chapter transitions.
 *
 * Usage:
 * ```ts
 * const history = new ChapterHistory();
 *
 * // Record genesis
 * history.recordGenesis();
 *
 * // As volume changes, check for transitions
 * const transitions = detectChapterTransitions(oldVol, newVol, config);
 * for (const t of transitions) {
 *   history.record(t.to, newVol, "configured");
 * }
 *
 * // Get timeline
 * const timeline = history.getTimeline();
 * ```
 */
export class ChapterHistory {
  private entries: ChapterHistoryEntry[] = [];

  constructor(initialEntries?: ChapterHistoryEntry[]) {
    if (initialEntries) {
      this.entries = [...initialEntries];
    }
  }

  /**
   * Records genesis (Chapter 0).
   */
  recordGenesis(timestamp?: number): void {
    const entry: ChapterHistoryEntry = {
      chapter: 0,
      name: getChapterName(0),
      timestamp: timestamp ?? Math.floor(Date.now() / 1000),
      volumeAtTransition: 0,
      source: "configured",
    };

    // Don't duplicate genesis
    if (!this.entries.some((e) => e.chapter === 0)) {
      this.entries.unshift(entry);
    }
  }

  /**
   * Records a chapter transition.
   */
  record(
    chapter: number,
    volumeAtTransition: number,
    source: DataSource = "configured",
    timestamp?: number
  ): void {
    // Don't duplicate
    if (this.entries.some((e) => e.chapter === chapter)) return;

    this.entries.push({
      chapter,
      name: getChapterName(chapter),
      timestamp: timestamp ?? Math.floor(Date.now() / 1000),
      volumeAtTransition,
      source,
    });

    // Keep sorted by chapter (descending for display)
    this.entries.sort((a, b) => b.chapter - a.chapter);
  }

  /**
   * Returns the full timeline, newest chapter first.
   */
  getTimeline(): ChapterHistoryEntry[] {
    return [...this.entries];
  }

  /**
   * Returns the latest recorded chapter entry.
   */
  getLatest(): ChapterHistoryEntry | null {
    return this.entries.length > 0 ? this.entries[0] : null;
  }

  /**
   * Resets history to only genesis.
   */
  reset(): void {
    this.entries = [];
    this.recordGenesis();
  }

  /**
   * Returns the number of chapter transitions recorded.
   */
  get length(): number {
    return this.entries.length;
  }
}

/**
 * Creates a default ChapterHistory pre-populated with mock data
 * matching the mock provider's initial state (mid-Chapter 2).
 */
export function createMockHistory(): ChapterHistory {
  const now = Math.floor(Date.now() / 1000);

  const history = new ChapterHistory([
    {
      chapter: 2,
      name: "Settlement",
      timestamp: now - 7200,
      volumeAtTransition: 6_000_000,
      source: "configured",
    },
    {
      chapter: 1,
      name: "Frontier",
      timestamp: now - 14400,
      volumeAtTransition: 3_000_000,
      source: "configured",
    },
    {
      chapter: 0,
      name: "Outpost",
      timestamp: now - 28800,
      volumeAtTransition: 0,
      source: "configured",
    },
  ]);

  return history;
}
