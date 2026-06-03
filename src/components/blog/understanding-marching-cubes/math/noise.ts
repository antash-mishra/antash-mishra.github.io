import * as THREE from 'three';

/** Smooths interpolation between lattice noise values so terrain does not look purely blocky. */
const smoothstep = (value: number) => value * value * (3 - 2 * value);
const fract = (value: number) => value - Math.floor(value);

/**
 * Tiny deterministic hash for educational noise.
 * This is not production Perlin/simplex noise; it is enough to create repeatable hills and caves
 * without adding another dependency to the article.
 */
const hash = (x: number, y: number, z = 0) => fract(Math.sin(x * 127.1 + y * 311.7 + z * 74.7) * 43758.5453123);

export const valueNoise2D = (x: number, y: number) => {
  const ix = Math.floor(x);
  const iy = Math.floor(y);
  const fx = smoothstep(fract(x));
  const fy = smoothstep(fract(y));
  const a = hash(ix, iy);
  const b = hash(ix + 1, iy);
  const c = hash(ix, iy + 1);
  const d = hash(ix + 1, iy + 1);

  return THREE.MathUtils.lerp(THREE.MathUtils.lerp(a, b, fx), THREE.MathUtils.lerp(c, d, fx), fy);
};

export const valueNoise3D = (x: number, y: number, z: number) => {
  const ix = Math.floor(x);
  const iy = Math.floor(y);
  const iz = Math.floor(z);
  const fx = smoothstep(fract(x));
  const fy = smoothstep(fract(y));
  const fz = smoothstep(fract(z));

  const x00 = THREE.MathUtils.lerp(hash(ix, iy, iz), hash(ix + 1, iy, iz), fx);
  const x10 = THREE.MathUtils.lerp(hash(ix, iy + 1, iz), hash(ix + 1, iy + 1, iz), fx);
  const x01 = THREE.MathUtils.lerp(hash(ix, iy, iz + 1), hash(ix + 1, iy, iz + 1), fx);
  const x11 = THREE.MathUtils.lerp(hash(ix, iy + 1, iz + 1), hash(ix + 1, iy + 1, iz + 1), fx);
  const y0 = THREE.MathUtils.lerp(x00, x10, fy);
  const y1 = THREE.MathUtils.lerp(x01, x11, fy);
  return THREE.MathUtils.lerp(y0, y1, fz);
};

/** Fractal Brownian motion: layered value noise. */
export const fbm2D = (x: number, y: number, octaves: number) => {
  let value = 0;
  let amplitude = 0.5;
  let frequency = 1;
  let total = 0;

  for (let octave = 0; octave < octaves; octave += 1) {
    value += amplitude * valueNoise2D(x * frequency, y * frequency);
    total += amplitude;
    amplitude *= 0.52;
    frequency *= 2.05;
  }

  return value / total;
};

export const fbm3D = (x: number, y: number, z: number, octaves: number) => {
  let value = 0;
  let amplitude = 0.5;
  let frequency = 1;
  let total = 0;

  for (let octave = 0; octave < octaves; octave += 1) {
    value += amplitude * valueNoise3D(x * frequency, y * frequency, z * frequency);
    total += amplitude;
    amplitude *= 0.55;
    frequency *= 2.1;
  }

  return value / total;
};
