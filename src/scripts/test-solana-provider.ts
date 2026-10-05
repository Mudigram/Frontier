// ============================================================
// Stage 7: End-to-End Live Data Integration Test
// ============================================================
// Verifies that SolanaFrontierProvider accurately consumes,
// normalizes, and calculates state from the live Hooked Token
// Observer output on Token-2022 mint AzWdwQ... (SCF).
// ============================================================

import { SolanaFrontierProvider } from "../data/solana-provider";

let passed = 0;
let failed = 0;

function assert(condition: boolean, label: string) {
  if (condition) {
    console.log(`  ✓ ${label}`);
    passed++;
  } else {
    console.log(`  ✗ FAIL: ${label}`);
    failed++;
  }
}

async function run() {
  console.log("\n=== Testing SolanaFrontierProvider with Live Observer Data ===");
  const provider = new SolanaFrontierProvider();

  // 1. Token State
  console.log("\n1. Token State Verification");
  const token = await provider.getToken();
  assert(token.mint === "AzWdwQ7t4YtLNBBv5UPCkMe9D4N8RCp2rqutrgXMRJZ2", "Mint matches on-chain mint");
  assert(token.isToken2022 === true, "Token-2022 confirmed");
  assert(token.decimals === 6, "Decimals is 6");
  assert(token.supply === 1_000_000_000, "Supply is 1,000,000,000 FRNT");
  assert(token.extensions.includes("TransferHook"), "TransferHook extension detected");
  assert(token.transferHookProgram === "4GsxAQV9NeDh4J9HX4dWRfNFacxiqHKRf6RxGJoLuK8n", "Hook program ID matches");

  // 2. Chapter State from Observed Volume
  console.log("\n2. Chapter Engine State from Observed Volume");
  const chapter = await provider.getChapter();
  assert(chapter.chapter === 2, "Observed volume 8.49M maps to Chapter 2 (Settlement)");
  assert(chapter.currentWalletCapPercent === 4, "Chapter 2 wallet cap is 4.00%");
  assert(chapter.nextThreshold === 9_000_000, "Next threshold is 9,000,000 FRNT (Chapter 3)");
  assert(chapter.remainingVolume > 500_000 && chapter.remainingVolume < 520_000, "Remaining volume ~509,303 FRNT");
  assert(chapter.progressPercent > 82 && chapter.progressPercent < 84, "Progress is ~83.0% towards Chapter III");
  assert(chapter.source.volume === "observed", "Volume is strictly OBSERVED");
  assert(chapter.source.chapter === "derived", "Chapter index is strictly DERIVED");

  // 3. Meteora Pool Discovery
  console.log("\n3. Meteora Liquidity Pool Verification");
  const pool = await provider.getPool();
  assert(pool.address === "FhVo3mqL8PW5pH5U2CN4XE33DokiyZnUwuGpH2hmHLuM", "Pool address matches DBC pool");
  assert(pool.poolType === "DynamicBondingCurve", "Pool type is DynamicBondingCurve");
  assert(pool.quoteSymbol === "SOL", "Pairing asset is SOL");

  // 4. Activity Events
  console.log("\n4. On-Chain Event Stream");
  const events = await provider.getEvents();
  assert(events.length > 0, `Captured ${events.length} real events`);
  assert(events.some(e => e.type === "hook_rejection"), "Hook rejection event captured in stream");
  assert(events.some(e => e.type === "buy"), "Swap buy event captured in stream");
  assert(events.every(e => e.confidence === "on-chain"), "All events stamped ON-CHAIN");

  // 5. Hook Rejection Explorer
  console.log("\n5. Hook Rejection Audit");
  const hookEvents = await provider.getHookEvents();
  assert(hookEvents.length === 5, "5 on-chain transfer rejections captured");
  assert(hookEvents[0].errorCode === "ExceedsMaxHolding", "Error is ExceedsMaxHolding");
  assert(hookEvents[0].errorNumber === 6000, "Anchor Error number 6000 (0x1770)");
  assert(hookEvents[0].hookProgram === "4GsxAQV9NeDh4J9HX4dWRfNFacxiqHKRf6RxGJoLuK8n", "Hook program matches");

  // 6. Wallet Territory & Holding Checks
  console.log("\n6. Wallet Territory & 1% Cap Enforcement");
  const walletAlice = await provider.getWallet("3EhKE8DUuN3bR8bZmQpsmEu6UxDNMCYRu3jm72gC5WU7");
  assert(walletAlice.balance.value > 7_600_000, "Trader balance ~7.64M tokens");
  assert(walletAlice.supplyPercent.value > 0.76 && walletAlice.supplyPercent.value < 0.77, "Trader holds ~0.764% of supply");
  assert(walletAlice.withinLimit.value === true, "Holding is within 1% cap");

  // 7. Technical Observatory Console
  console.log("\n7. Technical Observatory Console");
  const obs = await provider.getObservatoryData();
  assert(obs.observability.mint === "observed", "Mint confidence is OBSERVED");
  assert(obs.observability.hook === "observed", "Hook confidence is OBSERVED");
  assert(obs.observability.volume === "derived", "Volume confidence is DERIVED");
  assert(obs.observability.chapter === "unknown", "Chapter on-chain state is UNKNOWN without IDL");
  assert(obs.hookRejections.value === 5, "Observed 5 hook rejections");

  console.log(`\n${"=".repeat(40)}`);
  console.log(`Live Data Integration: ${passed} passed, ${failed} failed`);
  console.log(`${"=".repeat(40)}\n`);

  if (failed > 0) {
    process.exit(1);
  }
}

run().catch(err => {
  console.error("Test failed with error:", err);
  process.exit(1);
});
