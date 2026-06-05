import { Canvas } from '@react-three/fiber';
import { Line } from '@react-three/drei';
import { useMemo, useState } from 'react';
import { INSIDE_COLOR, LINE_COLOR, MUTED_LINE, OUTSIDE_COLOR } from '../constants';
import { scalar2D } from '../math/fields';
import { squareSegmentsForFullGrid } from '../math/marchingSquares';
import type { Vec2 } from '../types';
import IsoSlider from '../shared/IsoSlider';
import SceneShell from '../shared/SceneShell';

const FieldPoint = ({ position, value, iso }: { position: Vec2; value: number; iso: number }) => (
  <group position={[position[0], position[1], 0]}>
    {/* Larger dots mean stronger field values; color shows threshold classification. */}
    <mesh>
      <circleGeometry args={[0.075 + value * 0.055, 24]} />
      <meshBasicMaterial color={value >= iso ? INSIDE_COLOR : OUTSIDE_COLOR} transparent opacity={0.92} />
    </mesh>
  </group>
);

const LegendDot = ({ color, label }: { color: string; label: string }) => (
  <span className="inline-flex items-center gap-1.5">
    <span className="h-2.5 w-2.5 rounded-full border border-white/15" style={{ backgroundColor: color }} />
    {label}
  </span>
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

  const guideSegments = useMemo(() => squareSegmentsForFullGrid(12, iso, 12 * 12), [iso]);

  return (
    <SceneShell title="Scalar field explorer" controls={<IsoSlider value={iso} onChange={setIso} />}>
      <div className="grid h-full grid-rows-[auto_1fr_auto]">
        <div className="border-b border-ind-border bg-ind-surface/70 px-4 py-3">
          <p className="m-0 text-sm leading-relaxed text-ind-text-dim">
            Each dot is one sampled number. The iso-value is the cutoff: orange dots are inside,
            dark dots are outside. The pale line is where the two sides meet.
          </p>
        </div>

        <Canvas orthographic camera={{ position: [0, 0, 8], zoom: 82 }}>
          <color attach="background" args={['#101012']} />
          <group>
            {Array.from({ length: 13 }, (_, index) => -1.7 + (3.4 * index) / 12).map((position) => (
              <group key={position}>
                <Line points={[[-1.7, position, -0.02], [1.7, position, -0.02]]} color={MUTED_LINE} lineWidth={1} transparent opacity={0.25} />
                <Line points={[[position, -1.7, -0.02], [position, 1.7, -0.02]]} color={MUTED_LINE} lineWidth={1} transparent opacity={0.25} />
              </group>
            ))}
            {samples.map((sample) => <FieldPoint key={`${sample.position[0]}-${sample.position[1]}`} {...sample} iso={iso} />)}
            {guideSegments.map(([a, b], index) => (
              <Line key={`${index}-${a[0]}`} points={[[a[0], a[1], 0.04], [b[0], b[1], 0.04]]} color={LINE_COLOR} lineWidth={3} transparent opacity={0.9} />
            ))}
          </group>
        </Canvas>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-ind-border bg-ind-surface/70 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.14em] text-ind-text-dim">
          <LegendDot color={INSIDE_COLOR} label={`inside: value ≥ ${iso.toFixed(2)}`} />
          <LegendDot color={OUTSIDE_COLOR} label={`outside: value < ${iso.toFixed(2)}`} />
          <span className="text-ind-text-dim">boundary appears between neighboring dots that disagree</span>
        </div>
      </div>
    </SceneShell>
  );
};

export default ScalarFieldExplorer;
