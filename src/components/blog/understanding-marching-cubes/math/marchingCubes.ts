import * as THREE from 'three';
// @ts-expect-error - three exposes these lookup tables from the example module without .d.ts types.
import { edgeTable, triTable } from 'three/examples/jsm/objects/MarchingCubes.js';
import { cubeCornerBits, cubeCornerOffsets, cubeCorners, cubeEdges, marchingCubeEdgePairs } from '../data';
import type { TerrainMode, Triangle, Vec3 } from '../types';
import { terrainDensity } from './fields';
import { crossingT, lerp3 } from './interpolation';

export const cubeCrossings = (iso: number) =>
  cubeEdges.flatMap(([aIndex, bIndex]) => {
    const a = cubeCorners[aIndex];
    const b = cubeCorners[bIndex];
    if ((a.value >= iso) === (b.value >= iso)) return [];
    return [lerp3(a.position, b.position, crossingT(a.value, b.value, iso))];
  });

/** Tiny explanatory cube case, not the full algorithm. */
export const trianglesForCubeDemo = (iso: number): Triangle[] => {
  const crossings = cubeCrossings(iso);
  if (crossings.length < 3) return [];
  if (crossings.length === 3) return [[crossings[0], crossings[1], crossings[2]]];
  return [[crossings[0], crossings[1], crossings[2]], [crossings[0], crossings[2], crossings[3]]];
};

/** Lightweight sphere-patch visual for showing accumulation. */
export const spherePatchTriangles = (resolution: number, limitCells: number): Triangle[] => {
  const triangles: Triangle[] = [];
  const maxCells = resolution * resolution * resolution;
  const cellsToVisit = Math.min(limitCells, maxCells);
  const cellSize = 2.4 / resolution;

  for (let index = 0; index < cellsToVisit; index += 1) {
    const ix = index % resolution;
    const iy = Math.floor(index / resolution) % resolution;
    const iz = Math.floor(index / (resolution * resolution));
    const cx = -1.2 + (ix + 0.5) * cellSize;
    const cy = -1.2 + (iy + 0.5) * cellSize;
    const cz = -1.2 + (iz + 0.5) * cellSize;
    const distance = Math.sqrt(cx * cx + cy * cy + cz * cz);

    if (Math.abs(distance - 0.72) < cellSize * 0.78) {
      const normal = new THREE.Vector3(cx, cy, cz).normalize();
      const tangentA = new THREE.Vector3(-normal.y, normal.x, 0);
      if (tangentA.lengthSq() < 0.001) tangentA.set(1, 0, 0);
      tangentA.normalize();
      const tangentB = new THREE.Vector3().crossVectors(normal, tangentA).normalize();
      const center = normal.multiplyScalar(0.72);
      const scale = cellSize * 0.58;
      const p0 = center.clone().add(tangentA.clone().multiplyScalar(scale));
      const p1 = center.clone().add(tangentA.clone().multiplyScalar(-scale * 0.5)).add(tangentB.clone().multiplyScalar(scale * 0.86));
      const p2 = center.clone().add(tangentA.clone().multiplyScalar(-scale * 0.5)).add(tangentB.clone().multiplyScalar(-scale * 0.86));
      triangles.push([p0.toArray() as Vec3, p1.toArray() as Vec3, p2.toArray() as Vec3]);
    }
  }

  return triangles;
};

/**
 * Full marching-cubes extraction for the procedural terrain demo.
 * Each cell is converted into a cubeIndex; the lookup tables tell us which edges are crossed and
 * how to connect those edge vertices into triangles.
 */
export const marchProceduralField = (mode: TerrainMode, resolution: number, iso = 0): Triangle[] => {
  const triangles: Triangle[] = [];
  const min = -1.15;
  const span = 2.3;
  const step = span / (resolution - 1);
  const pointAt = (ix: number, iy: number, iz: number): Vec3 => [min + ix * step, min + iy * step, min + iz * step];

  for (let ix = 0; ix < resolution - 1; ix += 1) {
    for (let iy = 0; iy < resolution - 1; iy += 1) {
      for (let iz = 0; iz < resolution - 1; iz += 1) {
        const positions = cubeCornerOffsets.map(([dx, dy, dz]) => pointAt(ix + dx, iy + dy, iz + dz));
        const values = positions.map(([x, y, z]) => terrainDensity(mode, x, y, z));
        let cubeIndex = 0;

        // The terrain field uses negative = solid and positive = air, so inside means value < iso.
        values.forEach((value, index) => {
          if (value < iso) cubeIndex |= cubeCornerBits[index];
        });

        const bits = edgeTable[cubeIndex];
        if (bits === 0) continue;

        const edgeVertices: Vec3[] = [];
        marchingCubeEdgePairs.forEach(([aIndex, bIndex], edgeIndex) => {
          if ((bits & (1 << edgeIndex)) === 0) return;
          edgeVertices[edgeIndex] = lerp3(positions[aIndex], positions[bIndex], crossingT(values[aIndex], values[bIndex], iso));
        });

        const tableOffset = cubeIndex * 16;
        for (let tableIndex = 0; triTable[tableOffset + tableIndex] !== -1; tableIndex += 3) {
          const a = edgeVertices[triTable[tableOffset + tableIndex]];
          const b = edgeVertices[triTable[tableOffset + tableIndex + 1]];
          const c = edgeVertices[triTable[tableOffset + tableIndex + 2]];
          if (a && b && c) triangles.push([a, b, c]);
        }
      }
    }
  }

  return triangles;
};

export type TerrainCell = {
  index: number;
  positions: Vec3[];
  values: number[];
  cubeIndex: number;
  crossedEdges: Edge3D[];
  triangles: Triangle[];
};

export type TerrainWalkthrough = {
  cells: TerrainCell[];
  activeCells: TerrainCell[];
};

const terrainCellToTriangles = (
  mode: TerrainMode,
  resolution: number,
  ix: number,
  iy: number,
  iz: number,
  index: number,
  iso = 0,
): TerrainCell => {
  const min = -1.15;
  const span = 2.3;
  const step = span / (resolution - 1);
  const pointAt = (px: number, py: number, pz: number): Vec3 => [min + px * step, min + py * step, min + pz * step];
  const positions = cubeCornerOffsets.map(([dx, dy, dz]) => pointAt(ix + dx, iy + dy, iz + dz));
  const values = positions.map(([x, y, z]) => terrainDensity(mode, x, y, z));
  let cubeIndex = 0;

  values.forEach((value, cornerIndex) => {
    if (value < iso) cubeIndex |= cubeCornerBits[cornerIndex];
  });

  const bits = edgeTable[cubeIndex];
  const crossedEdges: Edge3D[] = [];
  const edgeVertices: Vec3[] = [];

  if (bits !== 0) {
    marchingCubeEdgePairs.forEach(([aIndex, bIndex], edgeIndex) => {
      if ((bits & (1 << edgeIndex)) === 0) return;
      crossedEdges.push([aIndex, bIndex]);
      edgeVertices[edgeIndex] = lerp3(positions[aIndex], positions[bIndex], crossingT(values[aIndex], values[bIndex], iso));
    });
  }

  const triangles: Triangle[] = [];
  const tableOffset = cubeIndex * 16;
  if (bits !== 0) {
    for (let tableIndex = 0; triTable[tableOffset + tableIndex] !== -1; tableIndex += 3) {
      const a = edgeVertices[triTable[tableOffset + tableIndex]];
      const b = edgeVertices[triTable[tableOffset + tableIndex + 1]];
      const c = edgeVertices[triTable[tableOffset + tableIndex + 2]];
      if (a && b && c) triangles.push([a, b, c]);
    }
  }

  return { index, positions, values, cubeIndex, crossedEdges, triangles };
};

/**
 * Same extraction as marchProceduralField, but preserves per-cell information for explanation.
 * The terrain scene uses this to show that the final terrain is built one active cube at a time.
 */
export const buildTerrainWalkthrough = (mode: TerrainMode, resolution: number): TerrainWalkthrough => {
  const cells: TerrainCell[] = [];
  const activeCells: TerrainCell[] = [];
  let index = 0;

  for (let iz = 0; iz < resolution - 1; iz += 1) {
    for (let iy = 0; iy < resolution - 1; iy += 1) {
      for (let ix = 0; ix < resolution - 1; ix += 1) {
        const cell = terrainCellToTriangles(mode, resolution, ix, iy, iz, index);
        cells.push(cell);
        if (cell.triangles.length > 0) activeCells.push(cell);
        index += 1;
      }
    }
  }

  return { cells, activeCells };
};

export const terrainTrianglesThroughStep = (activeCells: TerrainCell[], activeStep: number) =>
  activeCells.slice(0, activeStep + 1).flatMap((cell) => cell.triangles);
