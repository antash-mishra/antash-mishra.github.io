import { edgeTable, triTable } from 'three/examples/jsm/objects/MarchingCubes.js';
import {
  cubeCornerBits,
  cubeCornerOffsets,
  marchingCubeEdgePairs,
} from '../data';
import type { Edge3D, Triangle, Vec3 } from '../types';
import { crossingT, lerp3 } from './interpolation';

export type SphereCell = {
  index: number;
  grid: Vec3;
  positions: Vec3[];
  values: number[];
  cubeIndex: number;
  crossedEdges: Edge3D[];
  triangles: Triangle[];
};

export type SphereWalkthrough = {
  resolution: number;
  cells: SphereCell[];
  activeCells: SphereCell[];
};

const SPHERE_RADIUS = 0.72;
const FIELD_MIN = -1.15;
const FIELD_SPAN = 2.3;

/**
 * Signed sphere field.
 * Negative = inside, zero = surface, positive = outside. This makes the iso-value naturally 0.
 */
const sphereDensity = ([x, y, z]: Vec3) => Math.sqrt(x * x + y * y + z * z) - SPHERE_RADIUS;

const pointAt = (resolution: number, ix: number, iy: number, iz: number): Vec3 => {
  const step = FIELD_SPAN / (resolution - 1);
  return [FIELD_MIN + ix * step, FIELD_MIN + iy * step, FIELD_MIN + iz * step];
};

const cellToTriangles = (
  resolution: number,
  ix: number,
  iy: number,
  iz: number,
  index: number,
): SphereCell => {
  const positions = cubeCornerOffsets.map(([dx, dy, dz]) => pointAt(resolution, ix + dx, iy + dy, iz + dz));
  const values = positions.map(sphereDensity);
  let cubeIndex = 0;

  values.forEach((value, cornerIndex) => {
    if (value < 0) {
      cubeIndex |= cubeCornerBits[cornerIndex];
    }
  });

  const bits = edgeTable[cubeIndex];
  const crossedEdges: Edge3D[] = [];
  const edgeVertices: Vec3[] = [];

  if (bits !== 0) {
    marchingCubeEdgePairs.forEach(([aIndex, bIndex], edgeIndex) => {
      if ((bits & (1 << edgeIndex)) === 0) {
        return;
      }
      crossedEdges.push([aIndex, bIndex]);
      edgeVertices[edgeIndex] = lerp3(
        positions[aIndex],
        positions[bIndex],
        crossingT(values[aIndex], values[bIndex], 0),
      );
    });
  }

  const triangles: Triangle[] = [];
  const tableOffset = cubeIndex * 16;
  if (bits !== 0) {
    for (let tableIndex = 0; triTable[tableOffset + tableIndex] !== -1; tableIndex += 3) {
      const a = edgeVertices[triTable[tableOffset + tableIndex]];
      const b = edgeVertices[triTable[tableOffset + tableIndex + 1]];
      const c = edgeVertices[triTable[tableOffset + tableIndex + 2]];
      if (a && b && c) {
        triangles.push([a, b, c]);
      }
    }
  }

  return {
    index,
    grid: [ix, iy, iz],
    positions,
    values,
    cubeIndex,
    crossedEdges,
    triangles,
  };
};

/**
 * Builds every marching-cubes cell for a sphere and separately tracks active cells.
 * Active cells are the ones that actually cross the surface and therefore emit triangles.
 */
export const buildSphereWalkthrough = (resolution: number): SphereWalkthrough => {
  const cells: SphereCell[] = [];
  const activeCells: SphereCell[] = [];
  let index = 0;

  for (let iz = 0; iz < resolution - 1; iz += 1) {
    for (let iy = 0; iy < resolution - 1; iy += 1) {
      for (let ix = 0; ix < resolution - 1; ix += 1) {
        const cell = cellToTriangles(resolution, ix, iy, iz, index);
        cells.push(cell);
        if (cell.triangles.length > 0) {
          activeCells.push(cell);
        }
        index += 1;
      }
    }
  }

  return { resolution, cells, activeCells };
};

export const trianglesThroughStep = (activeCells: SphereCell[], activeStep: number) =>
  activeCells.slice(0, activeStep + 1).flatMap((cell) => cell.triangles);
