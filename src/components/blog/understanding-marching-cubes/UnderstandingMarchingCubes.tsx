import ArticleNote from './shared/ArticleNote';
import CodeBlock from './shared/CodeBlock';
import MarchingCubeCell from './scenes/MarchingCubeCell';
import MarchingSquareCell from './scenes/MarchingSquareCell';
import MarchingSquaresScan from './scenes/MarchingSquaresScan';
import ProceduralTerrainDemo from './scenes/ProceduralTerrainDemo';
import ResolutionComparison from './scenes/ResolutionComparison';
import ScalarFieldExplorer from './scenes/ScalarFieldExplorer';
import SurfaceEmergence from './scenes/SurfaceEmergence';

/**
 * Article shell only.
 *
 * The important readability decision is that this file should mostly read like the article itself:
 * headings, paragraphs, and scene placement. The Three.js code and marching-cubes math live in
 * separate files so the writing can evolve without wading through rendering details.
 */
const UnderstandingMarchingCubes = () => (
  <div className="space-y-12">
    <section>
      <p className="text-lg leading-relaxed text-ind-text">
        Marching cubes is one of those algorithms I kept seeing everywhere once I started working
        with 3D representations. Voxels, signed distance fields, procedural terrain, neural 3D
        generation — eventually they all need the same bridge: values in space have to become a
        visible triangle mesh.
      </p>
      <p>
        The algorithm was introduced by Lorensen and Cline in their 1987 paper{' '}
        <a
          href="https://people.eecs.berkeley.edu/~jrs/meshpapers/LorensenCline.pdf"
          target="_blank"
          rel="noreferrer"
        >
          Marching Cubes: A High Resolution 3D Surface Construction Algorithm
        </a>
        . That paper is the source of the classic idea, but I did not find the algorithm obvious the
        first time I encountered it.
      </p>
      <p>
        I first tried to understand marching cubes through Sebastian Lague’s video. The video was
        good, but I still could not make the idea fully click. Then I read a few articles and asked
        Codex where I should start if I wanted to understand marching cubes properly. The most useful
        suggestion was simple: start with the 2D version first. That 2D version is called marching
        squares.
      </p>
      <ArticleNote>
        This article is not meant to be a formal implementation tutorial. It is my attempt to build
        the idea from the smallest understandable version: first a square, then a grid of squares,
        then a cube, then a grid of cubes.
      </ArticleNote>
    </section>

    <section>
      <h2>Before marching anything: values in space</h2>
      <p>
        The first important shift is that marching cubes does not start with triangles. It starts
        with a field of values. A field is just something that can answer a question at every point
        in space: what number lives here?
      </p>
      <p>
        In 2D, that might be a value at each point on a flat grid. In 3D, it becomes a value at each
        point inside a volume. The value could mean “inside or outside”, “distance from the surface”,
        “terrain density”, or something produced by a neural network.
      </p>
      <p>
        The key word here is <strong>iso-value</strong>. An iso-value is the threshold where we say
        the boundary exists. If values below the threshold are outside and values above it are
        inside, then the boundary must live wherever the field crosses that threshold.
      </p>
      <ScalarFieldExplorer />
      <p>
        In the visual above, changing the iso-value changes which samples count as inside. The
        algorithm’s job is to find the boundary between the two groups.
      </p>
    </section>

    <section>
      <h2>A few words that made the idea easier</h2>
      <p>
        I found marching cubes much easier after separating a few terms that are often mixed
        together casually.
      </p>
      <ul>
        <li>
          <strong>Voxel grid:</strong> a 3D arrangement of samples. You can think of it like a 3D
          image.
        </li>
        <li>
          <strong>Voxel:</strong> often imagined as a tiny cube of 3D space. In marching-cubes
          explanations, it is useful to think in terms of sampled values at grid points.
        </li>
        <li>
          <strong>Cell or cube:</strong> the cube-shaped region marching cubes processes. It is
          formed by 8 neighboring corner samples.
        </li>
        <li>
          <strong>Isoline:</strong> a boundary line in 2D where the field crosses the iso-value.
        </li>
        <li>
          <strong>Isosurface:</strong> the 3D version of that boundary. Instead of a line, it is a
          surface made from triangles.
        </li>
      </ul>
      <p>
        The subtle but important point is this: for marching cubes, the cube is not just one stored
        value. The cube is the space between 8 neighboring values. Those values sit at the cube’s
        corners.
      </p>
    </section>

    <section>
      <h2>Marching squares: the smaller idea</h2>
      <p>
        Marching squares is the 2D version of the idea. Instead of looking at a cube with 8 corners,
        we look at a square with 4 corners.
      </p>
      <p>
        Each corner has a value. We compare each value with the iso-value and classify the corner as
        inside or outside. If all corners are inside, there is no boundary passing through that
        square. If all corners are outside, there is also no boundary. The interesting case happens
        when some corners are inside and some are outside.
      </p>
      <p>
        When neighboring corners disagree, the boundary must cross the edge between them.
      </p>
      <MarchingSquareCell />
      <p>
        This is the core idea. We are not drawing a line because we know the final shape already. We
        are drawing a line because the corner values force the boundary to pass through that square.
      </p>
    </section>

    <section>
      <h2>A contour emerges from many small decisions</h2>
      <p>
        One square only gives one tiny local piece of the boundary. To get a complete shape, we scan
        many squares in the grid. Each square contributes either nothing or a small line segment.
        Those small line segments accumulate into a contour.
      </p>
      <MarchingSquaresScan />
      <p>
        This was the part that made marching cubes feel less mysterious to me. The algorithm is not
        trying to understand the whole shape at once. It makes a simple local decision again and
        again.
      </p>
    </section>

    <section>
      <h2>From marching squares to marching cubes</h2>
      <p>
        Marching cubes is the same idea lifted into 3D. The square becomes a cube. Four corner
        values become eight corner values. A contour line becomes a surface. And line segments become
        triangle patches.
      </p>
      <p>
        The cube is classified in the same way: compare every corner value to the iso-value. If all
        corners are on the same side, that cube contributes no surface. If some corners are inside
        and some are outside, the surface passes through the cube.
      </p>
      <MarchingCubeCell />
      <p>
        This is where lookup tables enter the story. A cube has 8 corners, and each corner can be
        inside or outside, so there are 256 possible corner patterns. The lookup table is a compact
        way to say: for this pattern, these edges are crossed, and these triangles should be created.
      </p>
      <ArticleNote>
        The lookup table is important for implementation, but it is not the main insight. The main
        insight is still the same as marching squares: neighboring samples disagree, so the boundary
        must pass between them.
      </ArticleNote>
    </section>

    <section>
      <h2>Watching a sphere appear cube by cube</h2>
      <p>
        A sphere can be represented as a simple signed field: distance from the center minus the
        radius. Points inside the sphere are negative. Points outside are positive. The surface is
        where the value is zero.
      </p>
      <CodeBlock>{`field(x, y, z) = distance_from_center - radius

inside:  field < 0
surface: field = 0
outside: field > 0`}</CodeBlock>
      <p>
        In the walkthrough below, the left side shows one active cube and the right side shows the
        accumulated mesh. The useful thing to watch is the chain: corner values, inside/outside
        classification, crossed edges, triangle patch, then accumulated surface.
      </p>
      <SurfaceEmergence />
    </section>

    <section>
      <h2>Procedural terrain is also just a field</h2>
      <p>
        The terrain example is the same idea with a different field. Instead of a sphere field, we
        first create a height for every <code>x, z</code> position. Then we compare each 3D point’s
        <code>y</code> value with that height.
      </p>
      <p>
        If the point is below the terrain height, we treat it as solid ground. If it is above the
        height, we treat it as empty air. The surface is where that value crosses zero.
      </p>
      <ProceduralTerrainDemo />
      <CodeBlock>{`function height(x, z) {
  return noise(x, z)
}

function field(x, y, z) {
  return y - height(x, z)
}

for each cube in grid {
  values = sample8Corners(cube, field)
  triangles += marchingCubes(values, iso = 0)
}`}</CodeBlock>
      <p>
        So the terrain mesh is not a special case. It is still just marching cubes over sampled
        values. The only difference is how those values are produced.
      </p>
    </section>

    <section>
      <h2>Resolution controls what the algorithm can recover</h2>
      <p>
        Marching cubes cannot invent detail that was not sampled. If the grid is coarse, the result
        is coarse. If the grid is denser, the algorithm has more information about where the surface
        crosses the volume.
      </p>
      <ResolutionComparison />
      <p>
        This is why low-resolution marching-cubes outputs often look blocky or faceted. The
        algorithm is doing the best it can with the samples it was given.
      </p>
    </section>

    <section>
      <h2>Why this matters for TinySDS3d</h2>
      <p>
        This is also why marching cubes shows up in my TinySDS3d project. The project can create or
        learn grid-like 3D representations, but a grid is not yet a real asset. To make it
        inspectable and exportable, I need this bridge:
      </p>
      <CodeBlock>{`occupancy grid / field
  -> surface extraction
  -> mesh`}</CodeBlock>
      <p>
        So the article stays general, but the motivation is practical. Marching cubes is the step
        that turns procedural or learned 3D fields into something I can actually look at, rotate,
        render, and eventually export.
      </p>
    </section>
  </div>
);

export default UnderstandingMarchingCubes;
