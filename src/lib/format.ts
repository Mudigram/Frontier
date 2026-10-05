// ============================================================
// Formatting Utilities
// ============================================================

/**
 * Formats a number with commas and optional decimal places.
 * e.g. 1234567.89 → "1,234,567.89"
 */
export function formatNumber(n: number, decimals: number = 0): string {
  return n.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

/**
 * Formats a large number with a suffix (K, M, B).
 * e.g. 6870000 → "6.87M"
 */
export function formatCompact(n: number, decimals: number = 2): string {
  const abs = Math.abs(n);
  const sign = n < 0 ? "-" : "";

  if (abs >= 1_000_000_000) {
    return `${sign}${(abs / 1_000_000_000).toFixed(decimals)}B`;
  }
  if (abs >= 1_000_000) {
    return `${sign}${(abs / 1_000_000).toFixed(decimals)}M`;
  }
  if (abs >= 1_000) {
    return `${sign}${(abs / 1_000).toFixed(decimals)}K`;
  }
  return `${sign}${abs.toFixed(decimals)}`;
}

/**
 * Formats basis points as a percentage string.
 * e.g. 100 → "1%", 250 → "2.5%"
 */
export function formatBps(bps: number): string {
  const pct = bps / 100;
  if (pct === Math.floor(pct)) {
    return `${pct}%`;
  }
  return `${pct.toFixed(1)}%`;
}

/**
 * Formats a percentage (0-100) with optional decimal places.
 * e.g. 76.333 → "76.3%"
 */
export function formatPercent(pct: number, decimals: number = 1): string {
  return `${pct.toFixed(decimals)}%`;
}

/**
 * Formats a Unix timestamp as a human-readable UTC time.
 * e.g. 1700000000 → "14:13 UTC"
 */
export function formatTimeUTC(timestamp: number): string {
  const date = new Date(timestamp * 1000);
  const hours = date.getUTCHours().toString().padStart(2, "0");
  const minutes = date.getUTCMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes} UTC`;
}

/**
 * Formats a Unix timestamp as a full date+time UTC string.
 * e.g. 1700000000 → "2023-11-14 14:13 UTC"
 */
export function formatDateTimeUTC(timestamp: number): string {
  const date = new Date(timestamp * 1000);
  const year = date.getUTCFullYear();
  const month = (date.getUTCMonth() + 1).toString().padStart(2, "0");
  const day = date.getUTCDate().toString().padStart(2, "0");
  const hours = date.getUTCHours().toString().padStart(2, "0");
  const minutes = date.getUTCMinutes().toString().padStart(2, "0");
  return `${year}-${month}-${day} ${hours}:${minutes} UTC`;
}

/**
 * Formats a relative time string.
 * e.g. "2 minutes ago", "1 hour ago", "3 days ago"
 */
export function formatRelativeTime(timestamp: number): string {
  const now = Math.floor(Date.now() / 1000);
  const diff = now - timestamp;

  if (diff < 60) return "just now";
  if (diff < 3600) {
    const mins = Math.floor(diff / 60);
    return `${mins} minute${mins === 1 ? "" : "s"} ago`;
  }
  if (diff < 86400) {
    const hours = Math.floor(diff / 3600);
    return `${hours} hour${hours === 1 ? "" : "s"} ago`;
  }
  const days = Math.floor(diff / 86400);
  return `${days} day${days === 1 ? "" : "s"} ago`;
}

/**
 * Truncates a Solana address for display.
 * e.g. "AzWdwQ7t4YtLNBBv5UPCkMe9D4N8RCp2rqutrgXMRJZ2" → "AzWd...RJZ2"
 */
export function truncateAddress(
  address: string,
  startChars: number = 4,
  endChars: number = 4
): string {
  if (address.length <= startChars + endChars + 3) return address;
  return `${address.slice(0, startChars)}...${address.slice(-endChars)}`;
}
