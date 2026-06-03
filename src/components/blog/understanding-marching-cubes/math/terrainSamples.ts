import type { TerrainMode, Vec3 } from '../types';
import { terrainDensity } from './fields';

/** Sparse point samples for the left side of the terrain scene. */
export const proceduralSamples = (mode: TerrainMode) => {
  const samples: { position: Vec3; inside: boolean; value: number }[] = [];
  const count = 9;
  const min = -1.15;
  const step = 2.3 / (count - 1);

  for (let ix = 0; ix < count; ix += 1) {
    for (let iy = 0; iy < count; iy += 1) {
      for (let iz = 0; iz < count; iz += 1) {
        const position: Vec3 = [min + ix * step, min + iy * step, min + iz * step];
        const value = terrainDensity(mode, ...position);
        samples.push({ position, inside: value < 0, value });
      }
    }
  }

  return samples;
};
