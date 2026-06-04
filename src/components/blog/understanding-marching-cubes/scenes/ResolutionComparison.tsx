import { Canvas } from '@react-three/fiber';
import { Line, OrbitControls } from '@react-three/drei';
import { useMemo } from 'react';
import { MUTED_LINE } from '../constants';
import { spherePatchTriangles } from '../math/marchingCubes';
import SceneShell from '../shared/SceneShell';
import TriangleMesh from '../shared/TriangleMesh';

const ResolutionMesh = ({ resolution, x }: { resolution: number; x: number }) => {
  const triangles = useMemo(() => spherePatchTriangles(resolution, resolution ** 3), [resolution]);
  return <group position={[x, 0, 0]}><TriangleMesh triangles={triangles} opacity={0.78} /><Line points={[[-0.9, -1.15, 0], [0.9, -1.15, 0]]} color={MUTED_LINE} lineWidth={1} /></group>;
};

/** Same shape at multiple sampling densities. This makes “resolution controls detail” visible. */
const ResolutionComparison = () => (
  <SceneShell title="Resolution comparison">
    <Canvas camera={{ position: [0, 2.2, 5.2], fov: 45 }}>
      <color attach="background" args={['#101012']} />
      <ambientLight intensity={0.65} />
      <directionalLight position={[4, 5, 3]} intensity={1.3} />
      <ResolutionMesh resolution={6} x={-1.9} />
      <ResolutionMesh resolution={10} x={0} />
      <ResolutionMesh resolution={14} x={1.9} />
      <OrbitControls enablePan={false} enableZoom={false} />
    </Canvas>
  </SceneShell>
);

export default ResolutionComparison;
