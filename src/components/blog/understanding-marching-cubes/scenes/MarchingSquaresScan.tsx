import { Canvas } from '@react-three/fiber';
import { Line } from '@react-three/drei';
import { useEffect, useMemo, useState } from 'react';
import { ACTIVE_COLOR, LINE_COLOR, MUTED_LINE } from '../constants';
import { squareSegmentsForFullGrid } from '../math/marchingSquares';
import ControlButton from '../shared/ControlButton';
import IsoSlider from '../shared/IsoSlider';
import SceneShell from '../shared/SceneShell';

/** Animates a full 2D marching pass so the contour feels accumulated, not magically generated. */
const MarchingSquaresScan = () => {
  const gridSize = 8;
  const [iso, setIso] = useState(0.5);
  const [cellIndex, setCellIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const totalCells = gridSize * gridSize;
  const segments = useMemo(() => squareSegmentsForFullGrid(gridSize, iso, cellIndex + 1), [cellIndex, iso]);
  const activeX = cellIndex % gridSize;
  const activeY = Math.floor(cellIndex / gridSize);
  const step = 3.2 / gridSize;

  useEffect(() => {
    if (!playing) return undefined;
    const timer = window.setInterval(() => setCellIndex((current) => (current + 1 >= totalCells ? 0 : current + 1)), 180);
    return () => window.clearInterval(timer);
  }, [playing, totalCells]);

  // Changing the iso-value changes the entire contour, so restart the scan from the first cell.
  useEffect(() => { setCellIndex(0); }, [iso]);

  return (
    <SceneShell
      title="Marching squares scan"
      controls={<><IsoSlider value={iso} onChange={setIso} /><ControlButton onClick={() => setPlaying(!playing)} active={playing}>{playing ? 'pause' : 'play'}</ControlButton><ControlButton onClick={() => { setPlaying(false); setCellIndex(0); }}>reset</ControlButton></>}
    >
      <Canvas orthographic camera={{ position: [0, 0, 8], zoom: 90 }}>
        <color attach="background" args={['#101012']} />
        {Array.from({ length: gridSize + 1 }, (_, index) => -1.6 + index * step).map((position) => (
          <group key={position}>
            <Line points={[[-1.6, position, -0.02], [1.6, position, -0.02]]} color={MUTED_LINE} lineWidth={1} transparent opacity={0.4} />
            <Line points={[[position, -1.6, -0.02], [position, 1.6, -0.02]]} color={MUTED_LINE} lineWidth={1} transparent opacity={0.4} />
          </group>
        ))}
        <mesh position={[-1.6 + (activeX + 0.5) * step, -1.6 + (activeY + 0.5) * step, -0.01]}>
          <planeGeometry args={[step, step]} />
          <meshBasicMaterial color={ACTIVE_COLOR} transparent opacity={0.18} />
        </mesh>
        {segments.map(([a, b], index) => <Line key={`${index}-${a[0]}`} points={[[a[0], a[1], 0.03], [b[0], b[1], 0.03]]} color={LINE_COLOR} lineWidth={4} />)}
      </Canvas>
    </SceneShell>
  );
};

export default MarchingSquaresScan;
