// ============================================================
// Frontier Data Provider Interface
// ============================================================
// The UI's ONLY data contract. All components consume data
// through this interface — they never care whether the data
// comes from simulation, a JSON file, or live Solana RPC.
// ============================================================

import type {
  TokenState,
  PoolState,
  FrontierEvent,
  WalletState,
  HookEvent,
  ObservatoryData,
} from "./types";
import type { ChapterState } from "@/chapter/types";

/**
 * The data provider abstraction.
 *
 * Implementations:
 * - MockFrontierProvider  (Stage 1) — static + simulatable data
 * - SolanaFrontierProvider (Stage 6) — reads hOOKED observer output
 */
export interface FrontierDataProvider {
  /** Get token identity and configuration */
  getToken(): Promise<TokenState>;

  /** Get current Chapter state from the engine */
  getChapter(): Promise<ChapterState>;

  /** Get Meteora pool state */
  getPool(): Promise<PoolState>;

  /** Get recent events, newest first */
  getEvents(limit?: number): Promise<FrontierEvent[]>;

  /** Get wallet territory for a specific address */
  getWallet(address: string): Promise<WalletState>;

  /** Get hook rejection events */
  getHookEvents(limit?: number): Promise<HookEvent[]>;

  /** Get full observatory data panel */
  getObservatoryData(): Promise<ObservatoryData>;
}
