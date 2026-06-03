import { squareEdges } from '../data';
import type { Vec2 } from '../types';
import { scalar2D } from './fields';
import { crossingT, lerp2 } from './interpolation';

/**
 * Runs the marching-squares decision for one grid cell.
 * This deliberately returns visible line segments, not a mesh, because marching squares is the 2D
 * mental model for marching cubes.
 */
export const squareSegmentsForCell = (cellX: number, cellY: number, gridSize: number, iso: number): [Vec2, Vec2][] => {
  const step = 3.2 / gridSize;
  const x0 = -1.6 + cellX * step;
  const y0 = -1.6 + cellY * step;
  const points: Vec2[] = [[x0, y0], [x0 + step, y0], [x0 + step, y0 + step], [x0, y0 + step]];
  const values = points.map(([x, y]) => scalar2D(x, y));
  const crossings: Vec2[] = [];

  squareEdges.forEach(([aIndex, bIndex]) => {
    const a = values[aIndex];
    const b = values[bIndex];
    if ((a >= iso) !== (b >= iso)) crossings.push(lerp2(points[aIndex], points[bIndex], crossingT(a, b, iso)));
  });

  if (crossings.length === 2) return [[crossings[0], crossings[1]]];

  // Ambiguous 4-crossing cases exist. Two simple segments are enough for this visual's purpose.
  if (crossings.length === 4) return [[crossings[0], crossings[1]], [crossings[2], crossings[3]]];

  return [];
};

export const squareSegmentsForFullGrid = (gridSize: number, iso: number, visibleCells: number) => {
  const segments: [Vec2, Vec2][] = [];
  for (let index = 0; index < Math.min(visibleCells, gridSize * gridSize); index += 1) {
    const cellX = index % gridSize;
    const cellY = Math.floor(index / gridSize);
    segments.push(...squareSegmentsForCell(cellX, cellY, gridSize, iso));
  }
  return segments;
};
