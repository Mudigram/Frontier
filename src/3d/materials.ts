import * as THREE from "three";

/**
 * Creates a low-poly faceted material with flat shading.
 */
export function createLowPolyMaterial(
  color: string | number,
  options?: {
    emissive?: string | number;
    emissiveIntensity?: number;
    roughness?: number;
    metalness?: number;
    wireframe?: boolean;
    transparent?: boolean;
    opacity?: number;
  }
): THREE.MeshStandardMaterial {
  return new THREE.MeshStandardMaterial({
    color,
    flatShading: true,
    roughness: options?.roughness ?? 0.6,
    metalness: options?.metalness ?? 0.2,
    emissive: options?.emissive ?? 0x000000,
    emissiveIntensity: options?.emissiveIntensity ?? 0,
    wireframe: options?.wireframe ?? false,
    transparent: options?.transparent ?? false,
    opacity: options?.opacity ?? 1,
  });
}

/**
 * Creates an emissive glow material for active beacons and gates.
 */
export function createGlowMaterial(
  color: string | number,
  intensity: number = 1.2
): THREE.MeshStandardMaterial {
  return new THREE.MeshStandardMaterial({
    color,
    emissive: color,
    emissiveIntensity: intensity,
    flatShading: true,
    roughness: 0.2,
    metalness: 0.1,
  });
}

/**
 * Dark translucent material for locked territories shrouded in frontier fog.
 */
export function createLockedMaterial(): THREE.MeshStandardMaterial {
  return new THREE.MeshStandardMaterial({
    color: 0x0f172a,
    emissive: 0x020617,
    flatShading: true,
    roughness: 0.9,
    metalness: 0.1,
    transparent: true,
    opacity: 0.55,
  });
}
