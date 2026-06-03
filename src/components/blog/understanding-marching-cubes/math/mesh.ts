import * as THREE from 'three';
import type { Triangle } from '../types';

/** Converts our simple Triangle tuples into a Three.js geometry that can be rendered by R3F. */
export const meshFromTriangles = (triangles: Triangle[]) => {
  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(triangles.flat(2));
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.computeVertexNormals();
  return geometry;
};
