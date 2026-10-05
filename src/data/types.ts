// ============================================================
// Frontier Data Layer — Core Types
// ============================================================
// These types represent the frontend's normalized view of
// Frontier token state. They are NOT 1:1 copies of the hOOKED
// observer types — the SolanaFrontierProvider (Stage 6) will
// map ObserverReport → these types.
// ============================================================

/**
 * Data source taxonomy — the most important distinction in the app.
 *
 * Every piece of data displayed to the user must carry one of these:
 * - observed:   Directly read from on-chain state (confirmed fact)
 * - derived:    Calculated from observed data (e.g. aggregated volume)
 * - configured: From the Chapter config, NOT verified on-chain
 * - unknown:    Cannot be determined without additional information
 */
export type DataSource = "observed" | "derived" | "configured" | "unknown";

/**
 * Wraps any value with its data source provenance.
 * Inspired by the hOOKED observer's ConfidentValue<T> pattern.
 */
export interface Sourced<T> {
  value: T;
  source: DataSource;
  note?: string;
}

// ============================================================
// Token State
// ============================================================

export interface TokenState {
  mint: string;
  name: string;
  symbol: string;
  decimals: number;
  supply: number;
  imageUri?: string;
  tokenProgram: string;
  isToken2022: boolean;
  extensions: string[];
  transferHookProgram: string | null;
  transferHookAuthority: string | null;
  mintAuthority: string | null;
  freezeAuthority: string | null;
}

// ============================================================
// Pool State
// ============================================================

export interface PoolState {
  address: string;
  poolType: string;
  baseMint: string;
  quoteMint: string;
  baseSymbol: string;
  quoteSymbol: string;
  liquidity: Sourced<number | null>;
  price: Sourced<number | null>;
}

// ============================================================
// Events
// ============================================================

export type EventType =
  | "chapter_advance"
  | "hook_rejection"
  | "buy"
  | "sell"
  | "transfer"
  | "wallet_milestone"
  | "pool_event";

export type EventConfidence = "on-chain" | "derived" | "simulated";

export interface FrontierEvent {
  id: string;
  type: EventType;
  title: string;
  description: string;
  timestamp: number;
  confidence: EventConfidence;
  data?: Record<string, unknown>;
  // For hook rejections and on-chain events
  signature?: string;
  slot?: number;
  errorCode?: string;
  errorMessage?: string;
}

// ============================================================
// Wallet State
// ============================================================

export interface WalletState {
  address: string;
  balance: Sourced<number>;
  supplyPercent: Sourced<number>;
  currentChapter: Sourced<number | null>;
  walletCapPercent: Sourced<number | null>;
  withinLimit: Sourced<boolean | null>;
}

// ============================================================
// Hook Events
// ============================================================

export type HookFailureCategory =
  | "rejected_by_hook"
  | "token_program_error"
  | "slippage_or_pool_error"
  | "unknown";

export interface HookEvent {
  signature: string;
  slot: number;
  timestamp: number | null;
  errorCode: string;
  errorNumber: number;
  errorMessage: string;
  hookProgram: string;
  category: HookFailureCategory;
  rawError: string;
  logs: string[];
}

// ============================================================
// Observatory Data
// ============================================================

export interface ObservatoryData {
  token: TokenState;
  pool: PoolState | null;
  observedVolume: Sourced<number>;
  observedHolders: Sourced<number>;
  hookRejections: Sourced<number>;
  latestSlot: Sourced<number | null>;
  lastUpdated: string;
  observability: {
    mint: DataSource;
    hook: DataSource;
    pool: DataSource;
    trades: DataSource;
    volume: DataSource;
    chapter: DataSource;
    wallets: DataSource;
    failedTxs: DataSource;
  };
}
