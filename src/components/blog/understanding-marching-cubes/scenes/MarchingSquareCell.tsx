import { Canvas } from '@react-three/fiber';
import { Line } from '@react-three/drei';
import { useState } from 'react';
import { ACTIVE_COLOR, INSIDE_COLOR, LINE_COLOR, MUTED_LINE, OUTSIDE_COLOR } from '../constants';
import { squareCorners, squareEdges } from '../data';
import { crossingT, lerp2 } from '../math/interpolation';
import ControlButton from '../shared/ControlButton';
import SceneShell from '../shared/SceneShell';

/** Shows one square cell so the reader can see the local decision before a full grid scan. */
const MarchingSquareCell = () => {
  const [step, setStep] = useState(0);
  const iso = 0.5;
  const crossings = squareEdges.flatMap(([aIndex, bIndex]) => {
    const a = squareCorners[aIndex];
    const b = squareCorners[bIndex];
    if ((a.value >= iso) === (b.value >= iso)) return [];
    return [lerp2(a.position, b.position, crossingT(a.value, b.value, iso))];
  });

  return (
    <SceneShell
      title="One marching square"
      controls={['values', 'inside / outside', 'crossed edges', 'contour segment'].map((label, index) => (
        <ControlButton key={label} onClick={() => setStep(index)} active={step === index}>{index + 1}. {label}</ControlButton>
      ))}
    >
      <Canvas orthographic camera={{ position: [0, 0, 8], zoom: 105 }}>
        <color attach="background" args={['#101012']} />
        {squareEdges.map(([aIndex, bIndex]) => {
          const a = squareCorners[aIndex];
          const b = squareCorners[bIndex];
          const crossed = (a.value >= iso) !== (b.value >= iso);
          return <Line key={`${aIndex}-${bIndex}`} points={[[a.position[0], a.position[1], 0], [b.position[0], b.position[1], 0]]} color={step >= 2 && crossed ? ACTIVE_COLOR : MUTED_LINE} lineWidth={step >= 2 && crossed ? 4 : 2} />;
        })}
        {squareCorners.map((corner) => (
          <group key={corner.label} position={[corner.position[0], corner.position[1], 0]}>
            <mesh>
              <circleGeometry args={[0.13, 32]} />
              <meshBasicMaterial color={step >= 1 && corner.value >= iso ? INSIDE_COLOR : OUTSIDE_COLOR} />
            </mesh>
          </group>
        ))}
        {step >= 3 && crossings.length >= 2 && <Line points={[[crossings[0][0], crossings[0][1], 0.03], [crossings[1][0], crossings[1][1], 0.03]]} color={LINE_COLOR} lineWidth={6} />}
      </Canvas>
    </SceneShell>
  );
};

export default MarchingSquareCell;
