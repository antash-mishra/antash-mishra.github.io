import type { Vec2, Vec3 } from '../types';

export const clamp01 = (value: number) => Math.max(0, Math.min(1, value));

export const lerp2 = (a: Vec2, b: Vec2, t: number): Vec2 => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];

export const lerp3 = (a: Vec3, b: Vec3, t: number): Vec3 => [
  a[0] + (b[0] - a[0]) * t,
  a[1] + (b[1] - a[1]) * t,
  a[2] + (b[2] - a[2]) * t,
];

/**
 * Finds where an edge crosses the iso-value.
 * If one endpoint is 0.2, the other is 0.8, and the iso-value is 0.5, this returns 0.5:
 * the crossing is halfway along the edge. For smoother fields this fraction is what makes the
 * output less blocky than simply placing vertices at voxel centers.
 */
export const crossingT = (a: number, b: number, iso: number) => {
  if (Math.abs(b - a) < 1e-6) return 0.5;
  return clamp01((iso - a) / (b - a));
};
