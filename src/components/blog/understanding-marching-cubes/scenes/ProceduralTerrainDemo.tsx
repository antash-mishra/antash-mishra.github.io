import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { useEffect, useMemo, useState } from 'react';
import * as THREE from 'three';
import { INSIDE_COLOR, OUTSIDE_COLOR, TRIANGLE_COLOR } from '../constants';
import { marchProceduralField } from '../math/marchingCubes';
import { meshFromTriangles } from '../math/mesh';
import { proceduralSamples } from '../math/terrainSamples';
import type { TerrainMode, Triangle } from '../types';
import ControlButton from '../shared/ControlButton';
import SceneShell from '../shared/SceneShell';
import VolumeBox from '../shared/VolumeBox';

const TerrainSamples = ({ mode }: { mode: TerrainMode }) => {
  const samples = useMemo(() => proceduralSamples(mode), [mode]);
  return (
    <>
      <VolumeBox />
      {samples.map((sample) => (
        <mesh key={sample.position.join('-')} position={sample.position}>
          {/* Bigger/brighter points are inside solid ground; tiny dim points are outside air. */}
          <sphereGeometry args={[sample.inside ? 0.018 : 0.01, 10, 10]} />
          <meshBasicMaterial color={sample.inside ? INSIDE_COLOR : OUTSIDE_COLOR} transparent opacity={sample.inside ? 0.62 : 0.16} />
        </mesh>
      ))}
    </>
  );
};

const TerrainMesh = ({ triangles }: { triangles: Triangle[] }) => {
  const geometry = useMemo(() => meshFromTriangles(triangles), [triangles]);
  useEffect(() => () => geometry.dispose(), [geometry]);

  return (
    <>
      <mesh geometry={geometry}>
        <meshStandardMaterial color={TRIANGLE_COLOR} side={THREE.DoubleSide} transparent opacity={0.86} roughness={0.72} />
      </mesh>
      <mesh geometry={geometry}>
        <meshBasicMaterial color="#FFF5DA" wireframe transparent opacity={0.16} />
      </mesh>
    </>
  );
};

/** Left = sampled inside/outside field, right = the mesh extracted from the same field. */
const ProceduralTerrainDemo = () => {
  const [mode, setMode] = useState<TerrainMode>('bad noise');
  const resolution = 22;
  const triangles = useMemo(() => marchProceduralField(mode, resolution), [mode]);

  return (
    <SceneShell
      title="Procedural terrain extraction"
      controls={
        <>
          {(['soft hills', 'bad noise', 'caves'] as TerrainMode[]).map((modeOption) => (
            <ControlButton key={modeOption} onClick={() => setMode(modeOption)} active={mode === modeOption}>{modeOption}</ControlButton>
          ))}
          <span className="font-mono text-xs text-ind-text-dim">resolution 22 · {triangles.length} triangles</span>
        </>
      }
    >
      <Canvas camera={{ position: [0, 2.2, 5.8], fov: 42 }}>
        <color attach="background" args={['#101012']} />
        <ambientLight intensity={0.72} />
        <directionalLight position={[4, 5, 3]} intensity={1.4} />
        <group position={[-1.45, 0, 0]}><TerrainSamples mode={mode} /></group>
        <group position={[1.45, 0, 0]}><VolumeBox /><TerrainMesh triangles={triangles} /></group>
        <OrbitControls enablePan={false} />
      </Canvas>
    </SceneShell>
  );
};

export default ProceduralTerrainDemo;
