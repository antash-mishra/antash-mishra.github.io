import { Canvas } from '@react-three/fiber';
import { Line, OrbitControls, Text } from '@react-three/drei';
import { useCallback, useEffect, useMemo, useState } from 'react';
import * as THREE from 'three';
import {
  ACTIVE_COLOR,
  INSIDE_COLOR,
  LINE_COLOR,
  MUTED_LINE,
  OUTSIDE_COLOR,
  TRIANGLE_COLOR,
} from '../constants';
import { buildSphereWalkthrough, trianglesThroughStep } from '../math/sphereWalkthrough';
import type { Edge3D, Triangle, Vec3 } from '../types';
import ControlButton from '../shared/ControlButton';
import SceneShell from '../shared/SceneShell';
import TriangleMesh from '../shared/TriangleMesh';

type VisualStage = 'corners' | 'classify' | 'edges' | 'triangle' | 'mesh';

type GuidedStep = {
  stage: VisualStage;
  title: string;
  copy: string;
};

const guidedSteps: GuidedStep[] = [
  {
    stage: 'corners',
    title: 'Corners',
    copy: 'Start with one cube from the sampled sphere field. Marching cubes only sees this cube’s 8 corner values.',
  },
  {
    stage: 'classify',
    title: 'Classify corners',
    copy: 'Orange corners are inside the sphere. Dark corners are outside. The surface must pass between these two groups.',
  },
  {
    stage: 'edges',
    title: 'Find crossed edges',
    copy: 'Blue edges connect an inside corner to an outside corner. The iso-surface crosses those edges.',
  },
  {
    stage: 'triangle',
    title: 'Create triangle patch',
    copy: 'Marching cubes places vertices on crossed edges and connects them into one or more triangles for this cube.',
  },
  {
    stage: 'mesh',
    title: 'Accumulate the mesh',
    copy: 'Repeating the same local decision across many cubes builds the visible sphere surface.',
  },
];

const localCubeEdges: Edge3D[] = [
  [0, 1], [1, 3], [3, 2], [2, 0],
  [4, 5], [5, 7], [7, 6], [6, 4],
  [0, 4], [1, 5], [3, 7], [2, 6],
];

const miniCubePositions: Vec3[] = [
  [-0.75, -0.75, -0.75], [0.75, -0.75, -0.75],
  [-0.75, 0.75, -0.75], [0.75, 0.75, -0.75],
  [-0.75, -0.75, 0.75], [0.75, -0.75, 0.75],
  [-0.75, 0.75, 0.75], [0.75, 0.75, 0.75],
];

const stageIndex = (stage: VisualStage) => guidedSteps.findIndex((item) => item.stage === stage);
const stageAtLeast = (stage: VisualStage, target: VisualStage) => stageIndex(stage) >= stageIndex(target);

const normalizeTriangleIntoMiniCube = (triangle: Triangle, sourcePositions: Vec3[]): Triangle => {
  const min: Vec3 = [
    Math.min(...sourcePositions.map((position) => position[0])),
    Math.min(...sourcePositions.map((position) => position[1])),
    Math.min(...sourcePositions.map((position) => position[2])),
  ];
  const max: Vec3 = [
    Math.max(...sourcePositions.map((position) => position[0])),
    Math.max(...sourcePositions.map((position) => position[1])),
    Math.max(...sourcePositions.map((position) => position[2])),
  ];

  return triangle.map((point) => [
    -0.75 + ((point[0] - min[0]) / (max[0] - min[0])) * 1.5,
    -0.75 + ((point[1] - min[1]) / (max[1] - min[1])) * 1.5,
    -0.75 + ((point[2] - min[2]) / (max[2] - min[2])) * 1.5,
  ] as Vec3) as Triangle;
};

const FloatingLabel = ({ children, position }: { children: string; position: Vec3 }) => (
  <Text
    position={position}
    fontSize={0.095}
    color="#F7E7C2"
    anchorX="center"
    anchorY="middle"
    outlineWidth={0.003}
    outlineColor="#101012"
  >
    {children}
  </Text>
);

const CurrentCellExplainer = ({
  cornerValues,
  crossedEdges,
  triangles,
  sourcePositions,
  stage,
}: {
  cornerValues: number[];
  crossedEdges: Edge3D[];
  triangles: Triangle[];
  sourcePositions: Vec3[];
  stage: VisualStage;
}) => {
  const localTriangles = triangles.map((triangle) => normalizeTriangleIntoMiniCube(triangle, sourcePositions));
  const showClassification = stageAtLeast(stage, 'classify');
  const showEdges = stageAtLeast(stage, 'edges');
  const showTriangle = stageAtLeast(stage, 'triangle');

  return (
    <group position={[-2.05, 0, 0]}>
      <FloatingLabel position={[0, 1.12, 0]}>{'current cube decision'}</FloatingLabel>
      {localCubeEdges.map(([aIndex, bIndex]) => {
        const crossed = crossedEdges.some(
          ([x, y]) => (x === aIndex && y === bIndex) || (x === bIndex && y === aIndex),
        );
        return (
          <Line
            key={`${aIndex}-${bIndex}`}
            points={[miniCubePositions[aIndex], miniCubePositions[bIndex]]}
            color={showEdges && crossed ? ACTIVE_COLOR : MUTED_LINE}
            lineWidth={showEdges && crossed ? 4 : 1.3}
            transparent={!crossed || !showEdges}
            opacity={showEdges && crossed ? 1 : 0.5}
          />
        );
      })}
      {miniCubePositions.map((position, index) => {
        const inside = cornerValues[index] < 0;
        return (
          <mesh key={index} position={position}>
            <sphereGeometry args={[showClassification && inside ? 0.105 : 0.064, 20, 20]} />
            <meshStandardMaterial
              color={showClassification ? (inside ? INSIDE_COLOR : OUTSIDE_COLOR) : '#777777'}
              emissive={showClassification && inside ? '#3B2500' : '#000000'}
              transparent={!showClassification}
              opacity={showClassification ? 1 : 0.7}
            />
          </mesh>
        );
      })}
      {showTriangle && <TriangleMesh triangles={localTriangles} opacity={0.96} />}
    </group>
  );
};

const ActiveCellInSphere = ({ positions, visible }: { positions: Vec3[]; visible: boolean }) => {
  if (!visible) return null;
  return (
    <>
      {localCubeEdges.map(([aIndex, bIndex]) => (
        <Line key={`${aIndex}-${bIndex}`} points={[positions[aIndex], positions[bIndex]]} color={ACTIVE_COLOR} lineWidth={2.5} />
      ))}
    </>
  );
};

const CurrentTriangleHighlight = ({ triangles, visible }: { triangles: Triangle[]; visible: boolean }) => {
  const geometry = useMemo(() => {
    const mesh = new THREE.BufferGeometry();
    const positions = new Float32Array(triangles.flat(2));
    mesh.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    mesh.computeVertexNormals();
    return mesh;
  }, [triangles]);

  useEffect(() => () => geometry.dispose(), [geometry]);

  if (!visible) return null;

  return (
    <mesh geometry={geometry}>
      <meshStandardMaterial color={LINE_COLOR} emissive="#463100" side={THREE.DoubleSide} roughness={0.24} />
    </mesh>
  );
};

const LegendDot = ({ color, label }: { color: string; label: string }) => (
  <span className="inline-flex items-center gap-1.5">
    <span className="h-2 w-2 border border-ind-border" style={{ backgroundColor: color }} />
    {label}
  </span>
);

/**
 * One-button-flow walkthrough.
 * Back/Next moves through the five conceptual stages first, then advances to the next active cube.
 */
const SurfaceEmergence = () => {
  const resolution = 6;
  const [guidedIndex, setGuidedIndex] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [activeStep, setActiveStep] = useState(0);
  const walkthrough = useMemo(() => buildSphereWalkthrough(resolution), []);
  const activeCell = walkthrough.activeCells[activeStep] ?? walkthrough.activeCells[0];
  const guidedStep = guidedSteps[guidedIndex];
  const previousAccumulatedTriangles = useMemo(
    () => (activeStep > 0 ? trianglesThroughStep(walkthrough.activeCells, activeStep - 1) : []),
    [activeStep, walkthrough.activeCells],
  );
  const accumulatedTrianglesThroughCurrentCell = useMemo(
    () => trianglesThroughStep(walkthrough.activeCells, activeStep),
    [activeStep, walkthrough.activeCells],
  );

  // Keep already-finished cells visible while explaining the next active cube.
  // The current cube's triangles join the accumulated mesh only at the final “mesh” stage.
  const visibleAccumulatedTriangles = stageAtLeast(guidedStep.stage, 'mesh')
    ? accumulatedTrianglesThroughCurrentCell
    : previousAccumulatedTriangles;

  const goNext = useCallback(() => {
    setGuidedIndex((currentStage) => {
      if (currentStage < guidedSteps.length - 1) {
        return currentStage + 1;
      }

      setActiveStep((currentCell) => {
        if (currentCell + 1 >= walkthrough.activeCells.length) {
          setPlaying(false);
          return currentCell;
        }
        return currentCell + 1;
      });
      return 0;
    });
  }, [walkthrough.activeCells.length]);

  const goBack = useCallback(() => {
    setGuidedIndex((currentStage) => {
      if (currentStage > 0) {
        return currentStage - 1;
      }

      setActiveStep((currentCell) => Math.max(0, currentCell - 1));
      return guidedSteps.length - 1;
    });
  }, []);

  useEffect(() => {
    if (!playing) return undefined;
    const timer = window.setInterval(goNext, 820);
    return () => window.clearInterval(timer);
  }, [goNext, playing]);

  return (
    <SceneShell
      title="Sphere walkthrough"
      controls={
        <>
          <ControlButton onClick={goBack}>back</ControlButton>
          <ControlButton onClick={goNext}>next</ControlButton>
          <ControlButton onClick={() => setPlaying(!playing)} active={playing}>{playing ? 'pause' : 'play'}</ControlButton>
          <ControlButton onClick={() => { setPlaying(false); setGuidedIndex(0); setActiveStep(0); }}>reset</ControlButton>
        </>
      }
    >
      <div className="grid h-full grid-rows-[auto_1fr_auto]">
        <div className="border-b border-ind-border bg-ind-surface/70 px-4 py-3">
          <p className="m-0 font-mono text-xs uppercase tracking-[0.16em] text-ind-accent">
            Step {guidedIndex + 1} of {guidedSteps.length} — {guidedStep.title}
          </p>
          <p className="m-0 mt-1 text-sm leading-relaxed text-ind-text-dim">{guidedStep.copy}</p>
          {activeCell && (
            <p className="m-0 mt-1 font-mono text-[11px] text-ind-text-dim">
              cell {activeStep + 1}/{walkthrough.activeCells.length} · cube case {activeCell.cubeIndex} · crossed edges {activeCell.crossedEdges.length} · triangles {activeCell.triangles.length} · iso 0{activeStep + 1 === walkthrough.activeCells.length ? ' · complete' : ''}
            </p>
          )}
        </div>
        <Canvas camera={{ position: [0, 2.8, 6.2], fov: 42 }}>
          <color attach="background" args={['#101012']} />
          <ambientLight intensity={0.72} />
          <directionalLight position={[4, 5, 3]} intensity={1.4} />

          {activeCell && (
            <CurrentCellExplainer
              cornerValues={activeCell.values}
              crossedEdges={activeCell.crossedEdges}
              triangles={activeCell.triangles}
              sourcePositions={activeCell.positions}
              stage={guidedStep.stage}
            />
          )}

          <group position={[1.35, 0, 0]}>
            <FloatingLabel position={[0, 1.12, 0]}>{'accumulated sphere mesh'}</FloatingLabel>
            <TriangleMesh triangles={visibleAccumulatedTriangles} opacity={0.42} />
            {activeCell && <CurrentTriangleHighlight triangles={activeCell.triangles} visible={stageAtLeast(guidedStep.stage, 'triangle')} />}
            {activeCell && <ActiveCellInSphere positions={activeCell.positions} visible={stageAtLeast(guidedStep.stage, 'edges')} />}
            <mesh>
              <sphereGeometry args={[0.72, 32, 32]} />
              <meshBasicMaterial color={TRIANGLE_COLOR} transparent opacity={0.035} wireframe />
            </mesh>
          </group>

          <OrbitControls enablePan={false} />
        </Canvas>
        <div className="flex flex-wrap gap-x-3 gap-y-1.5 border-t border-ind-border bg-ind-surface/70 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.12em] text-ind-text-dim">
          <LegendDot color={INSIDE_COLOR} label="inside" />
          <LegendDot color={OUTSIDE_COLOR} label="outside" />
          <LegendDot color={ACTIVE_COLOR} label="crossed edge" />
          <LegendDot color={LINE_COLOR} label="new triangle" />
          <LegendDot color={TRIANGLE_COLOR} label="mesh" />
        </div>
      </div>
    </SceneShell>
  );
};

export default SurfaceEmergence;
