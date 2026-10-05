import { useMemo } from "react";
import * as THREE from "three";

export type BiomeName = "outpost" | "frontier" | "settlement" | "citadel" | "kingdom";

export type VillageMaterials = ReturnType<typeof createVillageMaterials>;

const GROUND: Record<
  BiomeName,
  {
    grass: string;
    grassDark: string;
    packedEarth: string;
    cliff: string;
    cliffBase: string;
    stoneWarm: string;
    leaf: string;
    leafDark: string;
    stone: string;
    stoneDark: string;
  }
> = {
  outpost: {
    grass: "#475569",
    grassDark: "#334155",
    packedEarth: "#64748b",
    cliff: "#1e293b",
    cliffBase: "#020617",
    stoneWarm: "#94a3b8",
    leaf: "#3f6212",
    leafDark: "#1e293b",
    stone: "#64748b",
    stoneDark: "#334155",
  },
  frontier: {
    grass: "#ca8a04",
    grassDark: "#a16207",
    packedEarth: "#d97706",
    cliff: "#9a3412",
    cliffBase: "#7c2d12",
    stoneWarm: "#fde68a",
    leaf: "#4d7c0f",
    leafDark: "#3f6212",
    stone: "#a8a29e",
    stoneDark: "#57534e",
  },
  settlement: {
    grass: "#4d7c0f",
    grassDark: "#3f6212",
    packedEarth: "#92400e",
    cliff: "#7c2d12",
    cliffBase: "#431407",
    stoneWarm: "#a8a29e",
    leaf: "#15803d",
    leafDark: "#14532d",
    stone: "#78716c",
    stoneDark: "#44403c",
  },
  citadel: {
    grass: "#5b21b6",
    grassDark: "#4c1d95",
    packedEarth: "#6b21a8",
    cliff: "#3b0764",
    cliffBase: "#2e1065",
    stoneWarm: "#c4b5fd",
    leaf: "#6d28d9",
    leafDark: "#4c1d95",
    stone: "#6b7280",
    stoneDark: "#3730a3",
  },
  kingdom: {
    grass: "#9f1239",
    grassDark: "#881337",
    packedEarth: "#be123c",
    cliff: "#4c0519",
    cliffBase: "#1c1917",
    stoneWarm: "#fda4af",
    leaf: "#166534",
    leafDark: "#14532d",
    stone: "#a8a29e",
    stoneDark: "#44403c",
  },
};

export function createVillageMaterials(biome: BiomeName = "settlement", locked = false) {
  const g = GROUND[biome] ?? GROUND.settlement;
  const mat = (
    color: string,
    extras: Partial<ConstructorParameters<typeof THREE.MeshStandardMaterial>[0]> = {}
  ) =>
    new THREE.MeshStandardMaterial({
      color: locked ? "#334155" : color,
      roughness: locked ? 0.9 : (extras.roughness ?? 0.78),
      metalness: locked ? 0.1 : (extras.metalness ?? 0.04),
      transparent: locked,
      opacity: locked ? 0.45 : (extras.opacity ?? 1),
      ...extras,
    });

  return {
    grass: mat(g.grass, { roughness: 0.94 }),
    grassDark: mat(g.grassDark, { roughness: 0.95 }),
    dirt: mat(g.packedEarth, { roughness: 0.96 }),
    packedEarth: mat(g.packedEarth, { roughness: 0.92 }),
    stone: mat(g.stone, { roughness: 0.88 }),
    stoneDark: mat(g.stoneDark, { roughness: 0.9 }),
    stoneWarm: mat(g.stoneWarm, { roughness: 0.86 }),
    cliff: mat(g.cliff, { roughness: 0.95 }),
    cliffBase: mat(g.cliffBase, { roughness: 0.97 }),
    wood: mat("#9a3412", { roughness: 0.82 }),
    woodDark: mat("#431407", { roughness: 0.85 }),
    plaster: mat("#f5e6c8", { roughness: 0.9 }),
    roof: mat("#c2410c", { roughness: 0.72 }),
    roofDark: mat("#7f1d1d", { roughness: 0.74 }),
    thatch: mat("#ca8a04", { roughness: 0.95 }),
    clothGold: mat("#facc15", { roughness: 0.55 }),
    clothCoral: mat("#f43f5e", { roughness: 0.55 }),
    clothMint: mat("#10b981", { roughness: 0.55 }),
    clothSky: mat("#38bdf8", { roughness: 0.55 }),
    clothWhite: mat("#fff7ed", { roughness: 0.5 }),
    iron: mat("#1c1917", { roughness: 0.45, metalness: 0.55 }),
    gold: mat("#eab308", {
      roughness: 0.28,
      metalness: 0.45,
      emissive: locked ? "#000000" : "#ca8a04",
      emissiveIntensity: locked ? 0 : 0.35,
    }),
    skin: mat("#e8b894", { roughness: 0.62 }),
    hair: mat("#1c1917", { roughness: 0.7 }),
    leaf: mat(g.leaf, { roughness: 0.88 }),
    leafDark: mat(g.leafDark, { roughness: 0.9 }),
    fire: mat("#fb923c", {
      roughness: 0.4,
      emissive: locked ? "#000000" : "#f97316",
      emissiveIntensity: locked ? 0 : 1.4,
    }),
  };
}

export function useVillageMaterials(biome: BiomeName = "settlement", locked = false): VillageMaterials {
  return useMemo(() => createVillageMaterials(biome, locked), [biome, locked]);
}
