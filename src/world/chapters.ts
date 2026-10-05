// ============================================================
// Frontier World Lore & Territory Definitions (3D Enhanced)
// ============================================================

export interface TerritoryDefinition {
  id: number;
  roman: string;
  name: string;
  subtitle: string;
  description: string;
  thresholdVolume: number;
  walletCapBps: number;
  walletCapPercent: number;
  landmark: string;
  theme: {
    accentColor: string;
    glowColor: string;
    ambientBg: string;
    // 3D Visual Coordinates & Colors
    terrainColor: string;
    terrainHighlight: string;
    lightColor: string;
    elevation: number;
    islandPosition: [number, number, number];
  };
}

export const WORLD_TERRITORIES: TerritoryDefinition[] = [
  {
    id: 0,
    roman: "0",
    name: "Outpost",
    subtitle: "The Foothold",
    description:
      "A signal fire in the void. Surveyors erect the first perimeter beacons. Token-2022 restrictions strictly enforce a 1% wallet ceiling to protect the founding ground.",
    thresholdVolume: 0,
    walletCapBps: 100,
    walletCapPercent: 1,
    landmark: "Signal Fire Beacon & Watchtower",
    theme: {
      accentColor: "#94a3b8",
      glowColor: "rgba(148, 163, 184, 0.3)",
      ambientBg: "from-slate-950 to-slate-900",
      terrainColor: "#1e293b",
      terrainHighlight: "#64748b",
      lightColor: "#94a3b8",
      elevation: 0,
      islandPosition: [0, 0, 4],
    },
  },
  {
    id: 1,
    roman: "I",
    name: "Frontier",
    subtitle: "The Expansion",
    description:
      "The boundary is pushed outward. First trading routes form across uncharted sands. Supply expansion doubles maximum wallet capacity to 2%.",
    thresholdVolume: 3_000_000,
    walletCapBps: 200,
    walletCapPercent: 2,
    landmark: "Frontier Gate & Border Palisade",
    theme: {
      accentColor: "#38bdf8",
      glowColor: "rgba(56, 189, 248, 0.35)",
      ambientBg: "from-sky-950 to-slate-900",
      terrainColor: "#0c4a6e",
      terrainHighlight: "#38bdf8",
      lightColor: "#38bdf8",
      elevation: 1.6,
      islandPosition: [-3.2, 1.6, 2],
    },
  },
  {
    id: 2,
    roman: "II",
    name: "Settlement",
    subtitle: "The Foundation",
    description:
      "Roots take hold. Stone foundations rise from the dust. Permanent trade hubs anchor the civilization as wallet capacity widens to 4%.",
    thresholdVolume: 6_000_000,
    walletCapBps: 400,
    walletCapPercent: 4,
    landmark: "Central Bazaar & Guarded Vault",
    theme: {
      accentColor: "#fbbf24",
      glowColor: "rgba(251, 191, 36, 0.4)",
      ambientBg: "from-amber-950 to-slate-900",
      terrainColor: "#78350f",
      terrainHighlight: "#fbbf24",
      lightColor: "#fbbf24",
      elevation: 3.4,
      islandPosition: [3.2, 3.4, 0],
    },
  },
  {
    id: 3,
    roman: "III",
    name: "Citadel",
    subtitle: "The Fortification",
    description:
      "High walls of cut stone and deep ramparts. A fortress standing against chaos. Deep liquidity allows individual holdings up to 8%.",
    thresholdVolume: 9_000_000,
    walletCapBps: 800,
    walletCapPercent: 8,
    landmark: "Fortified Bastion & High Keep",
    theme: {
      accentColor: "#a855f7",
      glowColor: "rgba(168, 85, 247, 0.4)",
      ambientBg: "from-purple-950 to-slate-900",
      terrainColor: "#581c87",
      terrainHighlight: "#c084fc",
      lightColor: "#a855f7",
      elevation: 5.2,
      islandPosition: [-2.4, 5.2, -2.6],
    },
  },
  {
    id: 4,
    roman: "IV",
    name: "Kingdom",
    subtitle: "The Sovereign Realm",
    description:
      "The frontier is no more. Sovereign dominion is established across the expanse. The civilization has reached full maturity with a 16% wallet allowance.",
    thresholdVolume: 12_000_000,
    walletCapBps: 1600,
    walletCapPercent: 16,
    landmark: "The Grand Spire & Throne",
    theme: {
      accentColor: "#e11d48",
      glowColor: "rgba(225, 29, 72, 0.4)",
      ambientBg: "from-rose-950 to-slate-900",
      terrainColor: "#881337",
      terrainHighlight: "#fb7185",
      lightColor: "#e11d48",
      elevation: 7.2,
      islandPosition: [0, 7.2, -5.2],
    },
  },
];

export interface TerritoryWithState extends TerritoryDefinition {
  unlocked: boolean;
  current: boolean;
  locked: boolean;
}

/**
 * Returns territory definitions enriched with unlocked & current status
 * relative to the given currentChapter index.
 */
export function getTerritoriesWithState(currentChapter: number): TerritoryWithState[] {
  return WORLD_TERRITORIES.map((territory) => ({
    ...territory,
    unlocked: currentChapter >= territory.id,
    current: currentChapter === territory.id,
    locked: currentChapter < territory.id,
  }));
}
