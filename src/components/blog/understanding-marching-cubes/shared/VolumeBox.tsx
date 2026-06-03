import { Line } from '@react-three/drei';
import { MUTED_LINE } from '../constants';
import { cubeEdges } from '../data';
import type { Vec3 } from '../types';

/** Shows the sampled volume boundary in terrain scenes. */
const VolumeBox = ({ size = 2.3 }: { size?: number }) => {
  const half = size / 2;
  const corners: Vec3[] = [
    [-half, -half, -half], [half, -half, -half], [half, half, -half], [-half, half, -half],
    [-half, -half, half], [half, -half, half], [half, half, half], [-half, half, half],
  ];

  return (
    <>
      {cubeEdges.map(([aIndex, bIndex]) => (
        <Line key={`${aIndex}-${bIndex}`} points={[corners[aIndex], corners[bIndex]]} color={MUTED_LINE} lineWidth={1} transparent opacity={0.45} />
      ))}
    </>
  );
};

export default VolumeBox;
