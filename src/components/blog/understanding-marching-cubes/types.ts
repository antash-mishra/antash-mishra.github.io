/**
 * Tiny tuple types keep the marching-code examples close to the diagrams in the article.
 * A full vector class would be overkill here; most calculations are just interpolation between
 * two sample positions.
 */
export type Vec2 = [number, number];
export type Vec3 = [number, number, number];

export type SquareCorner = {
  label: string;
  position: Vec2;
  value: number;
};

export type Edge2D = [number, number];

export type CubeCorner = {
  position: Vec3;
  value: number;
};

export type Edge3D = [number, number];

/** A triangle is exactly the mesh primitive marching cubes emits. */
export type Triangle = [Vec3, Vec3, Vec3];

/** Modes for the terrain scene. The names are intentionally reader-facing labels. */
export type TerrainMode = 'soft hills' | 'bad noise' | 'caves';
