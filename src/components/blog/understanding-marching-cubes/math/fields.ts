import type { TerrainMode } from '../types';
import { clamp01 } from './interpolation';
import { fbm2D, fbm3D } from './noise';

/** The 2D scalar field used by the marching-squares scenes. */
export const scalar2D = (x: number, y: number) => {
  const distance = Math.sqrt(x * x + y * y);
  const blob = 1 - distance / 1.65;
  const ripple = 0.12 * Math.sin(3.5 * x) * Math.cos(2.5 * y);
  return clamp01(blob + ripple);
};

/** Turns 2D noise into a terrain height at x/z. */
export const terrainHeight = (mode: TerrainMode, x: number, z: number) => {
  const broadHills = 0.75 * (fbm2D(x * 1.25 + 8.3, z * 1.25 - 4.1, 4) - 0.5);
  const detail = 0.22 * (fbm2D(x * 4.2 - 2.0, z * 4.2 + 5.4, 3) - 0.5);

  if (mode === 'soft hills') return broadHills + detail - 0.08;

  const harshNoise = fbm2D(x * 8.5 + 12.0, z * 8.5 - 6.0, 2) - 0.5;
  const harshSteps = 0.18 * Math.round(harshNoise * 4) / 2;
  if (mode === 'bad noise') return broadHills + detail * 1.4 + harshSteps - 0.02;

  return broadHills + detail + 0.08 * (fbm2D(x * 6.0 + z, z * 6.0 - x, 2) - 0.5);
};

/**
 * Signed terrain field.
 * Negative values mean “solid ground”, positive values mean “empty air”, and zero is the surface.
 */
export const terrainDensity = (mode: TerrainMode, x: number, y: number, z: number) => {
  const heightField = y - terrainHeight(mode, x, z);
  if (mode !== 'caves') return heightField;

  // 3D noise changes the field inside the volume, creating cave-like openings instead of only a heightmap.
  const caveNoise = 0.34 * (fbm3D(x * 4.4 + 10.0, y * 4.4 - 3.0, z * 4.4 + 1.0, 4) - 0.5);
  return heightField + caveNoise;
};
