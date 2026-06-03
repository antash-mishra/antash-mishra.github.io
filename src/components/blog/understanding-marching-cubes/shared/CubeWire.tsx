import { Line } from '@react-three/drei';
import { ACTIVE_COLOR, MUTED_LINE } from '../constants';
import { cubeCorners, cubeEdges } from '../data';
import type { Edge3D } from '../types';

/** Wireframe cube used by the one-cube scene. Crossed edges are highlighted blue. */
const CubeWire = ({ crossedEdges = [] }: { crossedEdges?: Edge3D[] }) => (
  <>
    {cubeEdges.map(([aIndex, bIndex]) => {
      const a = cubeCorners[aIndex].position;
      const b = cubeCorners[bIndex].position;
      const crossed = crossedEdges.some(([x, y]) => (x === aIndex && y === bIndex) || (x === bIndex && y === aIndex));
      return <Line key={`${aIndex}-${bIndex}`} points={[a, b]} color={crossed ? ACTIVE_COLOR : MUTED_LINE} lineWidth={crossed ? 4 : 1.5} />;
    })}
  </>
);

export default CubeWire;
