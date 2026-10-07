// ============================================================
// Shared Constants
// ============================================================

/** Frontier token identity */
export const FRONTIER = {
  name: "Frontier",
  symbol: "FRNT",
  decimals: 6,
  supply: 1_000_000_000,
  /**
   * Token Contract Address (Mint).
   * Can be configured via NEXT_PUBLIC_FRONTIER_MINT environment variable
   * or replaced here once live on pump.fun.
   */
  mintAddress: process.env.NEXT_PUBLIC_FRONTIER_MINT || "GLScwap5hj8WC6zicbLv1udMdK5jPdzDBAkVNRuJrm8c",
  domain: "https://www.playfrontier.xyz",
  xHandle: "https://x.com/PlayFRNTonSol",
  pumpFunUrl: (mint?: string) => {
    const ca = mint || process.env.NEXT_PUBLIC_FRONTIER_MINT || "GLScwap5hj8WC6zicbLv1udMdK5jPdzDBAkVNRuJrm8c";
    return ca ? `https://pump.fun/${ca}` : "https://pump.fun";
  },
  dexScreenerUrl: (mint?: string) => {
    const ca = mint || process.env.NEXT_PUBLIC_FRONTIER_MINT || "GLScwap5hj8WC6zicbLv1udMdK5jPdzDBAkVNRuJrm8c";
    return ca ? `https://dexscreener.com/solana/${ca}` : "https://dexscreener.com/solana";
  },
} as const;

/** Token-2022 program address */
export const TOKEN_2022_PROGRAM = "TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb";

/** Legacy SPL Token program address */
export const TOKEN_PROGRAM = "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA";

/** Wrapped SOL mint */
export const WSOL_MINT = "So11111111111111111111111111111111111111112";

/** Roman numeral lookup for chapter display */
export const ROMAN_NUMERALS: Record<number, string> = {
  0: "0",
  1: "I",
  2: "II",
  3: "III",
  4: "IV",
  5: "V",
  6: "VI",
  7: "VII",
  8: "VIII",
  9: "IX",
  10: "X",
};

/**
 * Converts a chapter number to its Roman numeral representation.
 * Falls back to the number itself for values > 10.
 */
export function toRoman(n: number): string {
  return ROMAN_NUMERALS[n] ?? String(n);
}
