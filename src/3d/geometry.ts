import * as THREE from "three";

/**
 * Creates a procedurally faceted, organic low-poly island plateau geometry.
 */
export function createIslandGeometry(
  radius: number = 2.2,
  heightScale: number = 0.55
): THREE.BufferGeometry {
  // Use cylinder with low radial segments for classic low-poly hexagonal/octagonal base
  const geom = new THREE.CylinderGeometry(
    radius,
    radius * 0.7,
    radius * heightScale,
    7, // 7 segments gives distinct, asymmetric faceted look
    2
  );

  const pos = geom.attributes.position;
  // Deterministic vertex displacement for hand-crafted low-poly aesthetic
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i);
    const y = pos.getY(i);
    const z = pos.getZ(i);

    // Pseudorandom jitter based on coordinate hash
    const hash = Math.sin(x * 12.9898 + y * 78.233 + z * 37.719) * 43758.5453;
    const jitter = (hash - Math.floor(hash) - 0.5) * 0.18 * radius;

    pos.setXYZ(i, x + jitter, y + (y > 0 ? jitter * 0.5 : -Math.abs(jitter)), z + jitter);
  }

  geom.computeVertexNormals();
  return geom;
}

/**
 * Creates the Chapter 0 landmark: Watchtower & Signal Fire Beacon.
 */
export function createBeaconGeometry(): THREE.BufferGeometry {
  const group = new THREE.CylinderGeometry(0.2, 0.45, 1.4, 5);
  return group;
}

/**
 * Creates the Chapter 1 landmark: Frontier Gate (monolith arch).
 */
export function createGateGeometry(): THREE.BufferGeometry {
  // Combined pillar & crossbar shape
  const geom = new THREE.BoxGeometry(1.6, 1.8, 0.4, 2, 2, 2);
  return geom;
}

/**
 * Creates the Chapter 2 landmark: Bazaar & Vault (settlement cluster).
 */
export function createBazaarGeometry(): THREE.BufferGeometry {
  const geom = new THREE.DodecahedronGeometry(0.85, 0);
  return geom;
}

/**
 * Creates the Chapter 3 landmark: Fortified Bastion (castle keep).
 */
export function createBastionGeometry(): THREE.BufferGeometry {
  const geom = new THREE.CylinderGeometry(0.65, 0.9, 1.6, 6);
  return geom;
}

/**
 * Creates the Chapter 4 landmark: Grand Spire (sovereign realm spire).
 */
export function createSpireGeometry(): THREE.BufferGeometry {
  const geom = new THREE.ConeGeometry(0.7, 2.8, 5);
  return geom;
}

/**
 * Creates an energetic floating crystal octahedron.
 */
export function createCrystalGeometry(radius: number = 0.35): THREE.BufferGeometry {
  return new THREE.OctahedronGeometry(radius, 0);
}
