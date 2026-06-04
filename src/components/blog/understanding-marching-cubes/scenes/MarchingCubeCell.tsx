import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { useEffect, useState } from 'react';
import { INSIDE_COLOR, OUTSIDE_COLOR } from '../constants';
import { cubeCorners, cubeEdges } from '../data';
import { trianglesForCubeDemo } from '../math/marchingCubes';
import ControlButton from '../shared/ControlButton';
import CubeWire from '../shared/CubeWire';
import SceneShell from '../shared/SceneShell';
import TriangleMesh from '../shared/TriangleMesh';
import useViewportPlayback from '../shared/useViewportPlayback';

/** The 3D counterpart to the one-square scene: one cube, eight corners, crossed edges, triangles. */
const MarchingCubeCell = () => {
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(true);
  const { ref: sceneRef, isPlaybackActive } = useViewportPlayback<HTMLDivElement>();
  const iso = 0.5;
  const crossedEdges = cubeEdges.filter(([aIndex, bIndex]) => (cubeCorners[aIndex].value >= iso) !== (cubeCorners[bIndex].value >= iso));
  const triangles = trianglesForCubeDemo(iso);

  useEffect(() => {
    // Mirror the marching-square explanation in 3D: cycle through corners,
    // classification, crossed edges, and the final triangle patch while visible.
    if (!playing || !isPlaybackActive) return undefined;

    const timer = window.setInterval(() => setStep((current) => (current + 1) % 4), 1050);
    return () => window.clearInterval(timer);
  }, [isPlaybackActive, playing]);

  return (
    <SceneShell
      containerRef={sceneRef}
      isVisualPaused={!playing}
      onVisualTap={() => setPlaying((current) => !current)}
      title="One marching cube"
      controls={['corners', 'inside / outside', 'crossed edges', 'triangle patch'].map((label, index) => (
        <ControlButton key={label} onClick={() => setStep(index)} active={step === index}>{index + 1}. {label}</ControlButton>
      ))}
    >
      <Canvas camera={{ position: [3.2, 2.6, 3.2], fov: 42 }}>
        <color attach="background" args={['#101012']} />
        <ambientLight intensity={0.65} />
        <directionalLight position={[4, 5, 3]} intensity={1.3} />
        <CubeWire crossedEdges={step >= 2 ? crossedEdges : []} />
        {cubeCorners.map((corner, index) => (
          <mesh key={index} position={corner.position}>
            <sphereGeometry args={[0.095, 24, 24]} />
            <meshStandardMaterial color={step >= 1 && corner.value >= iso ? INSIDE_COLOR : OUTSIDE_COLOR} emissive={step >= 1 && corner.value >= iso ? '#432800' : '#000000'} />
          </mesh>
        ))}
        {step >= 3 && <TriangleMesh triangles={triangles} />}
        <OrbitControls enablePan={false} />
      </Canvas>
    </SceneShell>
  );
};

export default MarchingCubeCell;
