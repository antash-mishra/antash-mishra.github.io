import { Canvas } from '@react-three/fiber';
import { Line } from '@react-three/drei';
import { useMemo, useState } from 'react';
import { INSIDE_COLOR, MUTED_LINE, OUTSIDE_COLOR } from '../constants';
import { scalar2D } from '../math/fields';
import type { Vec2 } from '../types';
import IsoSlider from '../shared/IsoSlider';
import SceneShell from '../shared/SceneShell';

const FieldPoint = ({ position, value, iso }: { position: Vec2; value: number; iso: number }) => (
  <mesh position={[position[0], position[1], 0]}>
    {/* Larger dots mean stronger field values; color shows threshold classification. */}
    <circleGeometry args={[0.075 + value * 0.055, 24]} />
    <meshBasicMaterial color={value >= iso ? INSIDE_COLOR : OUTSIDE_COLOR} transparent opacity={0.92} />
  </mesh>
);

/** First visual: before contours or meshes, there are only sampled scalar values. */
const ScalarFieldExplorer = () => {
  const [iso, setIso] = useState(0.5);
  const samples = useMemo(() => {
    const items: { position: Vec2; value: number }[] = [];
    const count = 13;
    for (let y = 0; y < count; y += 1) {
      for (let x = 0; x < count; x += 1) {
        const px = -1.7 + (3.4 * x) / (count - 1);
        const py = -1.7 + (3.4 * y) / (count - 1);
        items.push({ position: [px, py], value: scalar2D(px, py) });
      }
    }
    return items;
  }, []);

  return (
    <SceneShell title="Scalar field explorer" controls={<IsoSlider value={iso} onChange={setIso} />}>
      <Canvas orthographic camera={{ position: [0, 0, 8], zoom: 82 }}>
        <color attach="background" args={['#101012']} />
        <group>
          {samples.map((sample) => <FieldPoint key={`${sample.position[0]}-${sample.position[1]}`} {...sample} iso={iso} />)}
          {Array.from({ length: 13 }, (_, index) => -1.7 + (3.4 * index) / 12).map((position) => (
            <group key={position}>
              <Line points={[[-1.7, position, -0.02], [1.7, position, -0.02]]} color={MUTED_LINE} lineWidth={1} transparent opacity={0.25} />
              <Line points={[[position, -1.7, -0.02], [position, 1.7, -0.02]]} color={MUTED_LINE} lineWidth={1} transparent opacity={0.25} />
            </group>
          ))}
        </group>
      </Canvas>
    </SceneShell>
  );
};

export default ScalarFieldExplorer;
