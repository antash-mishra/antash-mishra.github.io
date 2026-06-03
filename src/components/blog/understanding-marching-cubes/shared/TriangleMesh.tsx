import { useEffect, useMemo } from 'react';
import * as THREE from 'three';
import { TRIANGLE_COLOR } from '../constants';
import { meshFromTriangles } from '../math/mesh';
import type { Triangle } from '../types';

/** Renders a list of triangles as a mesh and disposes the generated geometry when it updates. */
const TriangleMesh = ({ triangles, opacity = 0.82 }: { triangles: Triangle[]; opacity?: number }) => {
  const geometry = useMemo(() => meshFromTriangles(triangles), [triangles]);
  useEffect(() => () => geometry.dispose(), [geometry]);

  return (
    <mesh geometry={geometry}>
      <meshStandardMaterial color={TRIANGLE_COLOR} side={THREE.DoubleSide} transparent opacity={opacity} roughness={0.45} metalness={0.05} />
    </mesh>
  );
};

export default TriangleMesh;
