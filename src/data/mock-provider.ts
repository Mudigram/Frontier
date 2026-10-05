// ============================================================
// Mock Frontier Data Provider
// ============================================================
// Implements FrontierDataProvider with realistic static data
// and simulation controls for development.
//
// All mock data is explicitly marked with appropriate source
// confidence. Nothing pretends to be on-chain.
// ============================================================

import type { FrontierDataProvider } from "./provider";
import type {
  TokenState,
  PoolState,
  FrontierEvent,
  WalletState,
  HookEvent,
  ObservatoryData,
  EventType,
  EventConfidence,
} from "./types";
import type { ChapterState } from "@/chapter/types";
import { CHAPTER_CONFIG } from "@/chapter/config";
import { FRONTIER, TOKEN_2022_PROGRAM, WSOL_MINT } from "@/lib/constants";

// ============================================================
// Mock Addresses (not real — clearly fake for development)
// ============================================================

const MOCK_MINT = "FRNT1111111111111111111111111111111111111111";
const MOCK_HOOK_PROGRAM = "HOOK2222222222222222222222222222222222222222";
const MOCK_HOOK_AUTHORITY = "AUTH3333333333333333333333333333333333333333";
const MOCK_POOL = "POOL4444444444444444444444444444444444444444";

// ============================================================
// Simulation State
// ============================================================

/** Mutable simulation state for the dev simulator */
interface SimulationState {
  volume: number;
  events: FrontierEvent[];
  walletBalances: Map<string, number>;
}

/**
 * Creates a fresh simulation state at Chapter 0.
 */
function createInitialState(): SimulationState {
  const wallets = new Map<string, number>();
  wallets.set("WALLET_ALICE_111111111111111111111111111111111", 8_430_000);
  wallets.set("WALLET_BOB_22222222222222222222222222222222222", 3_250_000);
  wallets.set("WALLET_CAROL_333333333333333333333333333333333", 950_000);
  wallets.set("WALLET_SENTINEL_777777777777777777777777777777777", 22_500_000); // 2.25% Citadel Sentinel
  wallets.set("WALLET_TITAN_999999999999999999999999999999999", 48_000_000); // 4.80% Overburdened Renegade (exceeds cap)
  wallets.set("WALLET_NOMAD_000000000000000000000000000000000", 0); // 0.00% Non-Holder Ghost Specter

  return {
    volume: 6_870_000, // Mid-Chapter 2 for an interesting default state
    events: createInitialEvents(),
    walletBalances: wallets,
  };
}

/**
 * Generates a set of realistic mock events for the initial state.
 */
function createInitialEvents(): FrontierEvent[] {
  const now = Math.floor(Date.now() / 1000);

  const events: FrontierEvent[] = [
    {
      id: "evt-001",
      type: "chapter_advance" as const,
      title: "CHAPTER ADVANCED",
      description: "Chapter I → Chapter II",
      timestamp: now - 7200,
      confidence: "simulated" as const,
      data: { fromChapter: 1, toChapter: 2 },
    },
    {
      id: "evt-002",
      type: "hook_rejection" as const,
      title: "HOOK REJECTION",
      description:
        "Transfer rejected by Frontier's active transfer hook. Recipient would exceed the per-wallet max-holding limit.",
      timestamp: now - 5400,
      confidence: "simulated" as const,
      signature: "TXSIG_REJECT_555555555555555555555555555555555555",
      slot: 452375715,
      errorCode: "ExceedsMaxHolding",
      errorMessage:
        "Recipient would exceed the per-wallet max-holding limit.",
    },
    {
      id: "evt-003",
      type: "buy" as const,
      title: "LARGE BUY",
      description: "2,276,999 FRNT purchased",
      timestamp: now - 3600,
      confidence: "simulated" as const,
      data: { amount: 2_276_999, wallet: "WALLET_ALICE_111111111111111111111111111111111" },
    },
    {
      id: "evt-004",
      type: "wallet_milestone" as const,
      title: "WALLET MILESTONE",
      description: "Wallet crossed 0.8% of supply.",
      timestamp: now - 1800,
      confidence: "simulated" as const,
      data: { wallet: "WALLET_ALICE_111111111111111111111111111111111", percent: 0.843 },
    },
    {
      id: "evt-005",
      type: "sell" as const,
      title: "SELL",
      description: "450,000 FRNT sold",
      timestamp: now - 900,
      confidence: "simulated" as const,
      data: { amount: 450_000, wallet: "WALLET_BOB_22222222222222222222222222222222222" },
    },
    {
      id: "evt-006",
      type: "pool_event" as const,
      title: "POOL EVENT",
      description: "Meteora pool state changed.",
      timestamp: now - 300,
      confidence: "simulated" as const,
    },
    {
      id: "evt-007",
      type: "chapter_advance" as const,
      title: "CHAPTER ADVANCED",
      description: "Chapter 0 → Chapter I",
      timestamp: now - 14400,
      confidence: "simulated" as const,
      data: { fromChapter: 0, toChapter: 1 },
    },
  ];

  return events.sort((a, b) => b.timestamp - a.timestamp);
}

// ============================================================
// Mock Hook Events
// ============================================================

function createMockHookEvents(): HookEvent[] {
  const now = Math.floor(Date.now() / 1000);

  return [
    {
      signature: "TXSIG_REJECT_555555555555555555555555555555555555",
      slot: 452375715,
      timestamp: now - 5400,
      errorCode: "ExceedsMaxHolding",
      errorNumber: 6000,
      errorMessage:
        "Recipient would exceed the per-wallet max-holding limit.",
      hookProgram: MOCK_HOOK_PROGRAM,
      category: "rejected_by_hook",
      rawError: '{"InstructionError":[6,{"Custom":6000}]}',
      logs: [
        `Program ${MOCK_HOOK_PROGRAM} invoke [3]`,
        "Program log: Instruction: TransferHook",
        "Program log: AnchorError thrown in src\\lib.rs:151. Error Code: ExceedsMaxHolding. Error Number: 6000. Error Message: Recipient would exceed the per-wallet max-holding limit.",
        `Program ${MOCK_HOOK_PROGRAM} failed: custom program error: 0x1770`,
      ],
    },
    {
      signature: "TXSIG_REJECT_666666666666666666666666666666666666",
      slot: 452375700,
      timestamp: now - 6000,
      errorCode: "ExceedsMaxHolding",
      errorNumber: 6000,
      errorMessage:
        "Recipient would exceed the per-wallet max-holding limit.",
      hookProgram: MOCK_HOOK_PROGRAM,
      category: "rejected_by_hook",
      rawError: '{"InstructionError":[6,{"Custom":6000}]}',
      logs: [
        `Program ${MOCK_HOOK_PROGRAM} invoke [3]`,
        "Program log: Instruction: TransferHook",
        "Program log: AnchorError thrown in src\\lib.rs:151. Error Code: ExceedsMaxHolding. Error Number: 6000. Error Message: Recipient would exceed the per-wallet max-holding limit.",
        `Program ${MOCK_HOOK_PROGRAM} failed: custom program error: 0x1770`,
      ],
    },
  ];
}

// ============================================================
// Chapter Calculation (inline for mock — will be replaced by
// the Chapter Engine in Stage 2)
// ============================================================

function calculateMockChapterState(volume: number): ChapterState {
  const config = CHAPTER_CONFIG;
  const chapter = Math.floor(volume / config.volumePerChapter);
  const capBps =
    config.startingWalletCapBps * Math.pow(config.capMultiplier, chapter);
  const chapterStartVolume = chapter * config.volumePerChapter;
  const nextThreshold = (chapter + 1) * config.volumePerChapter;
  const progressInChapter = volume - chapterStartVolume;
  const progressPercent = (progressInChapter / config.volumePerChapter) * 100;

  return {
    chapter,
    observedVolume: volume,
    currentWalletCapBps: capBps,
    currentWalletCapPercent: capBps / 100,
    nextThreshold,
    remainingVolume: nextThreshold - volume,
    progressPercent: Math.min(progressPercent, 100),
    mode: "simulation",
    source: {
      chapter: "configured",
      volume: "configured",
      walletCap: "configured",
    },
  };
}

// ============================================================
// MockFrontierProvider
// ============================================================

export class MockFrontierProvider implements FrontierDataProvider {
  private state: SimulationState;
  private nextEventId = 100;

  constructor() {
    this.state = createInitialState();
  }

  // ----------------------------------------------------------
  // FrontierDataProvider implementation
  // ----------------------------------------------------------

  async getToken(): Promise<TokenState> {
    return {
      mint: MOCK_MINT,
      name: FRONTIER.name,
      symbol: FRONTIER.symbol,
      decimals: FRONTIER.decimals,
      supply: FRONTIER.supply,
      imageUri: undefined,
      tokenProgram: TOKEN_2022_PROGRAM,
      isToken2022: true,
      extensions: ["MetadataPointer", "TransferHook", "TokenMetadata"],
      transferHookProgram: MOCK_HOOK_PROGRAM,
      transferHookAuthority: MOCK_HOOK_AUTHORITY,
      mintAuthority: null,
      freezeAuthority: null,
    };
  }

  async getChapter(): Promise<ChapterState> {
    return calculateMockChapterState(this.state.volume);
  }

  async getPool(): Promise<PoolState> {
    return {
      address: MOCK_POOL,
      poolType: "DynamicBondingCurve",
      baseMint: MOCK_MINT,
      quoteMint: WSOL_MINT,
      baseSymbol: FRONTIER.symbol,
      quoteSymbol: "SOL",
      liquidity: {
        value: 125_000,
        source: "configured",
        note: "Simulated pool liquidity",
      },
      price: {
        value: 0.000042,
        source: "configured",
        note: "Simulated token price",
      },
    };
  }

  async getEvents(limit: number = 20): Promise<FrontierEvent[]> {
    return this.state.events.slice(0, limit);
  }

  async getWallet(address: string): Promise<WalletState> {
    const balance = this.state.walletBalances.get(address) ?? 0;
    const supplyPercent = (balance / FRONTIER.supply) * 100;
    const chapter = calculateMockChapterState(this.state.volume);

    return {
      address,
      balance: {
        value: balance,
        source: balance > 0 ? "configured" : "unknown",
        note: "Simulated wallet balance",
      },
      supplyPercent: {
        value: supplyPercent,
        source: balance > 0 ? "configured" : "unknown",
      },
      currentChapter: {
        value: chapter.chapter,
        source: "configured",
      },
      walletCapPercent: {
        value: chapter.currentWalletCapPercent,
        source: "configured",
        note: "Cap based on simulated chapter progression",
      },
      withinLimit: {
        value: supplyPercent <= chapter.currentWalletCapPercent,
        source: balance > 0 ? "configured" : "unknown",
      },
    };
  }

  async getHookEvents(limit: number = 10): Promise<HookEvent[]> {
    return createMockHookEvents().slice(0, limit);
  }

  async getObservatoryData(): Promise<ObservatoryData> {
    const token = await this.getToken();
    const pool = await this.getPool();
    const chapter = await this.getChapter();

    return {
      token,
      pool,
      observedVolume: {
        value: chapter.observedVolume,
        source: "configured",
        note: "Simulated volume",
      },
      observedHolders: {
        value: this.state.walletBalances.size,
        source: "configured",
      },
      hookRejections: {
        value: createMockHookEvents().length,
        source: "configured",
      },
      latestSlot: {
        value: 452375727,
        source: "configured",
        note: "Simulated slot number",
      },
      lastUpdated: new Date().toISOString(),
      observability: {
        mint: "configured",
        hook: "configured",
        pool: "configured",
        trades: "configured",
        volume: "configured",
        chapter: "configured",
        wallets: "configured",
        failedTxs: "configured",
      },
    };
  }

  // ----------------------------------------------------------
  // Simulation Controls (for dev simulator panel)
  // ----------------------------------------------------------

  /** Get current simulated volume */
  getVolume(): number {
    return this.state.volume;
  }

  /** Set simulated volume directly */
  setVolume(volume: number): ChapterState {
    const oldChapter = calculateMockChapterState(this.state.volume);
    this.state.volume = Math.max(0, volume);
    const newChapter = calculateMockChapterState(this.state.volume);

    // Auto-emit chapter advance event if chapter changed
    if (newChapter.chapter > oldChapter.chapter) {
      this.addEvent({
        type: "chapter_advance",
        title: "CHAPTER ADVANCED",
        description: `Chapter ${this.romanize(oldChapter.chapter)} → Chapter ${this.romanize(newChapter.chapter)}`,
        confidence: "simulated",
        data: {
          fromChapter: oldChapter.chapter,
          toChapter: newChapter.chapter,
        },
      });
    }

    return newChapter;
  }

  /** Adjust volume by a delta */
  adjustVolume(delta: number): ChapterState {
    return this.setVolume(this.state.volume + delta);
  }

  /** Jump to the next chapter threshold */
  nextChapter(): ChapterState {
    const current = calculateMockChapterState(this.state.volume);
    return this.setVolume(current.nextThreshold);
  }

  /** Reset to Chapter 0 */
  reset(): ChapterState {
    this.state = createInitialState();
    this.state.volume = 0;
    this.state.events = [
      {
        id: `evt-${this.nextEventId++}`,
        type: "chapter_advance" as const,
        title: "RESET",
        description: "Simulation reset to Chapter 0 — Outpost",
        timestamp: Math.floor(Date.now() / 1000),
        confidence: "simulated" as const,
      },
    ];
    return calculateMockChapterState(0);
  }

  /** Inject a simulated hook rejection event */
  triggerHookRejection(): FrontierEvent {
    return this.addEvent({
      type: "hook_rejection",
      title: "HOOK REJECTION",
      description:
        "Transfer rejected by Frontier's active transfer hook. Recipient would exceed the per-wallet max-holding limit.",
      confidence: "simulated",
      errorCode: "ExceedsMaxHolding",
      errorMessage:
        "Recipient would exceed the per-wallet max-holding limit.",
    });
  }

  /** Inject a random event */
  triggerRandomEvent(): FrontierEvent {
    const types: Array<{ type: EventType; title: string; description: string }> = [
      { type: "buy", title: "LARGE BUY", description: "1,500,000 FRNT purchased" },
      { type: "sell", title: "SELL", description: "780,000 FRNT sold" },
      { type: "transfer", title: "TRANSFER", description: "250,000 FRNT transferred between wallets" },
      { type: "wallet_milestone", title: "WALLET MILESTONE", description: "Wallet crossed 0.5% of supply" },
      { type: "pool_event", title: "POOL EVENT", description: "Meteora pool state changed" },
    ];

    const chosen = types[Math.floor(Math.random() * types.length)];
    return this.addEvent({
      ...chosen,
      confidence: "simulated",
    });
  }

  // ----------------------------------------------------------
  // Internal helpers
  // ----------------------------------------------------------

  private addEvent(
    event: Omit<FrontierEvent, "id" | "timestamp">
  ): FrontierEvent {
    const newEvent: FrontierEvent = {
      ...event,
      id: `evt-${this.nextEventId++}`,
      timestamp: Math.floor(Date.now() / 1000),
    };
    this.state.events.unshift(newEvent);
    return newEvent;
  }

  private romanize(n: number): string {
    const numerals: Record<number, string> = {
      0: "0", 1: "I", 2: "II", 3: "III", 4: "IV", 5: "V",
    };
    return numerals[n] ?? String(n);
  }
}
