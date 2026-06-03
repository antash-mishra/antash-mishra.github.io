import type { CubeCorner, Edge2D, Edge3D, SquareCorner, Vec3 } from './types';

/**
 * One curated marching-squares case.
 * The values are chosen so the left corners are mostly outside and the right corners are inside,
 * producing a simple contour segment that is easy to understand before showing a full grid.
 */
export const squareCorners: SquareCorner[] = [
  { label: 'A', position: [-1, -1], value: 0.24 },
  { label: 'B', position: [1, -1], value: 0.72 },
  { label: 'C', position: [1, 1], value: 0.86 },
  { label: 'D', position: [-1, 1], value: 0.38 },
];

/** Square edges connect the four corners in clockwise order. */
export const squareEdges: Edge2D[] = [[0, 1], [1, 2], [2, 3], [3, 0]];

/**
 * One curated cube case for the explanation scene.
 * This is intentionally not a full marching-cubes implementation; it is a small case that makes
 * “crossed cube edges become triangle patches” visible.
 */
export const cubeCorners: CubeCorner[] = [
  { position: [-1, -1, -1], value: 0.78 },
  { position: [1, -1, -1], value: 0.34 },
  { position: [1, 1, -1], value: 0.26 },
  { position: [-1, 1, -1], value: 0.62 },
  { position: [-1, -1, 1], value: 0.82 },
  { position: [1, -1, 1], value: 0.41 },
  { position: [1, 1, 1], value: 0.31 },
  { position: [-1, 1, 1], value: 0.58 },
];

/** Cube edges for the simple explanatory cube drawing. */
export const cubeEdges: Edge3D[] = [
  [0, 1], [1, 2], [2, 3], [3, 0],
  [4, 5], [5, 6], [6, 7], [7, 4],
  [0, 4], [1, 5], [2, 6], [3, 7],
];

/** Corner offsets used by the real marching-cubes terrain scene. */
export const cubeCornerOffsets: Vec3[] = [
  [0, 0, 0], [1, 0, 0], [0, 1, 0], [1, 1, 0],
  [0, 0, 1], [1, 0, 1], [0, 1, 1], [1, 1, 1],
];

/** Bit order expected by the lookup tables imported from Three.js's MarchingCubes helper. */
export const cubeCornerBits = [1, 2, 8, 4, 16, 32, 128, 64];

/** Edge order expected by the Three.js lookup tables. */
export const marchingCubeEdgePairs: Edge3D[] = [
  [0, 1], [1, 3], [2, 3], [0, 2],
  [4, 5], [5, 7], [6, 7], [4, 6],
  [0, 4], [1, 5], [3, 7], [2, 6],
];
