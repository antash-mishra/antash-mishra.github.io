import { Canvas } from '@react-three/fiber';
import { Line, Text } from '@react-three/drei';
import { useEffect, useState } from 'react';
import { ACTIVE_COLOR, INSIDE_COLOR, LINE_COLOR, MUTED_LINE, OUTSIDE_COLOR } from '../constants';
import { squareCorners, squareEdges } from '../data';
import { crossingT, lerp2 } from '../math/interpolation';
import ControlButton from '../shared/ControlButton';
import SceneShell from '../shared/SceneShell';
import useViewportPlayback from '../shared/useViewportPlayback';

/** Shows one square cell so the reader can see the local decision before a full grid scan. */
const MarchingSquareCell = () => {
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(true);
  const { ref: sceneRef, isPlaybackActive } = useViewportPlayback<HTMLDivElement>();
  const iso = 0.5;
  const crossings = squareEdges.flatMap(([aIndex, bIndex]) => {
    const a = squareCorners[aIndex];
    const b = squareCorners[bIndex];
    if ((a.value >= iso) === (b.value >= iso)) return [];
    return [{ point: lerp2(a.position, b.position, crossingT(a.value, b.value, iso)), edge: `${a.label}${b.label}` }];
  });

  useEffect(() => {
    // Treat the single-cell explanation like a looping GIF: once the reader
    // reaches it, the four conceptual states repeat without requiring clicks.
    // Leaving the viewport pauses the timer and resumes from the same step later.
    if (!playing || !isPlaybackActive) return undefined;

    const timer = window.setInterval(() => setStep((current) => (current + 1) % 4), 950);
    return () => window.clearInterval(timer);
  }, [isPlaybackActive, playing]);

  return (
    <SceneShell
      containerRef={sceneRef}
      isVisualPaused={!playing}
      onVisualTap={() => setPlaying((current) => !current)}
      title="One marching square"
      controls={['values', 'inside / outside', 'crossed edges', 'contour segment'].map((label, index) => (
        <ControlButton key={label} onClick={() => setStep(index)} active={step === index}>{index + 1}. {label}</ControlButton>
      ))}
    >
      <div className="grid h-full grid-rows-[auto_1fr]">
        <div className="border-b border-ind-border bg-ind-surface/70 px-4 py-3">
          <p className="m-0 text-sm leading-relaxed text-ind-text-dim">
            The contour connects the places where an edge crosses iso {iso.toFixed(2)}. If those crossings happen at different positions on different edges, the segment becomes slanted.
          </p>
        </div>
        <Canvas orthographic camera={{ position: [0, 0, 8], zoom: 105 }}>
          <color attach="background" args={['#101012']} />
          {squareEdges.map(([aIndex, bIndex]) => {
            const a = squareCorners[aIndex];
            const b = squareCorners[bIndex];
            const crossed = (a.value >= iso) !== (b.value >= iso);
            return <Line key={`${aIndex}-${bIndex}`} points={[[a.position[0], a.position[1], 0], [b.position[0], b.position[1], 0]]} color={step >= 2 && crossed ? ACTIVE_COLOR : MUTED_LINE} lineWidth={step >= 2 && crossed ? 4 : 2} />;
          })}

          {squareCorners.map((corner) => {
            const inside = corner.value >= iso;
            return (
              <group key={corner.label} position={[corner.position[0], corner.position[1], 0]}>
                <mesh>
                  <circleGeometry args={[0.13, 32]} />
                  <meshBasicMaterial color={step >= 1 && inside ? INSIDE_COLOR : OUTSIDE_COLOR} />
                </mesh>
                <Text position={[0, corner.position[1] > 0 ? 0.26 : -0.26, 0.05]} fontSize={0.12} color="#d7d7d7" anchorX="center" anchorY="middle">
                  {corner.label} {corner.value.toFixed(2)}
                </Text>
                {step >= 1 && (
                  <Text position={[0, corner.position[1] > 0 ? 0.42 : -0.42, 0.05]} fontSize={0.09} color={inside ? INSIDE_COLOR : '#8b8b92'} anchorX="center" anchorY="middle">
                    {inside ? 'inside' : 'outside'}
                  </Text>
                )}
              </group>
            );
          })}

          {step >= 2 && crossings.map(({ point, edge }) => (
            <group key={edge} position={[point[0], point[1], 0.06]}>
              <mesh>
                <circleGeometry args={[0.075, 24]} />
                <meshBasicMaterial color={LINE_COLOR} />
              </mesh>
              <Text position={[0, point[1] > 0 ? 0.18 : -0.18, 0.06]} fontSize={0.08} color={LINE_COLOR} anchorX="center" anchorY="middle">
                iso crosses {edge}
              </Text>
            </group>
          ))}

          {step >= 3 && crossings.length >= 2 && <Line points={[[crossings[0].point[0], crossings[0].point[1], 0.03], [crossings[1].point[0], crossings[1].point[1], 0.03]]} color={LINE_COLOR} lineWidth={6} />}
        </Canvas>
      </div>
    </SceneShell>
  );
};

export default MarchingSquareCell;
