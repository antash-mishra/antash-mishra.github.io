# From Marching Squares to Marching Cubes

2026-06-04 by Antash Mishra. 10 min read. Tags: Graphics, 3D, Algorithms, Visualization.
Original: https://antash.dev/blog/understanding-marching-cubes

> A visual exploration of marching cubes, starting with the smaller 2D idea of marching squares and building up to surface extraction in 3D.

Marching cubes is one of those algorithms I kept seeing everywhere once I started working with 3D representations. Voxels, signed distance fields, procedural terrain, neural 3D generation — eventually they all need the same bridge: values in space have to become a visible triangle mesh.

The algorithm was introduced by Lorensen and Cline in their 1987 paper [Marching Cubes: A High Resolution 3D Surface Construction Algorithm](https://people.eecs.berkeley.edu/~jrs/meshpapers/LorensenCline.pdf). That paper is the source of the classic idea, but I did not find the algorithm obvious the first time I encountered it.

I first tried to understand marching cubes through Sebastian Lague’s video. The video was good, but I still could not make the idea fully click. Then I read a few articles and asked Codex where I should start if I wanted to understand marching cubes properly. The most useful suggestion was simple: start with the 2D version first. That 2D version is called marching squares.

This article is not meant to be a formal implementation tutorial. It is my attempt to build the idea from the smallest understandable version: first a square, then a grid of squares, then a cube, then a grid of cubes.

## Before marching anything: values in space

The first important shift is that marching cubes does not start with triangles. It starts with a field of values. A field is just something that can answer a question at every point in space: what number lives here?

In 2D, that might be a value at each point on a flat grid. In 3D, it becomes a value at each point inside a volume. The value could mean “inside or outside”, “distance from the surface”, “terrain density”, or something produced by a neural network.

The first key word is **iso-value**. The simplest way to think about it is: an iso-value is the cutoff number we choose.

Imagine every dot in the grid has a number. If the dot’s number is greater than or equal to the iso-value, we color it as inside. If the dot’s number is smaller than the iso-value, we color it as outside. The boundary is not one of the dots. The boundary is the place between neighboring dots where the color changes from outside to inside.

Interactive visual

### Scalar field explorer

iso 0.50

Each dot is one sampled number. The iso-value is the cutoff: orange dots are inside, dark dots are outside. The pale line is where the two sides meet.

inside: value ≥ 0.50outside: value < 0.50boundary appears between neighboring dots that disagree

In the visual above, move the iso-value slider and watch the dots change groups. Marching algorithms start from this exact question: where do neighboring samples disagree?

## A few words that made the idea easier

I found marching cubes much easier after separating a few terms that are often mixed together casually.

- **Voxel grid:** a 3D arrangement of samples. You can think of it like a 3D image.
- **Voxel:** often imagined as a tiny cube of 3D space. In marching-cubes explanations, it is useful to think in terms of sampled values at grid points.
- **Cell or cube:** the cube-shaped region marching cubes processes. It is formed by 8 neighboring corner samples.
- **Isoline:** a boundary line in 2D where the field crosses the iso-value.
- **Isosurface:** the 3D version of that boundary. Instead of a line, it is a surface made from triangles.

The subtle but important point is this: for marching cubes, the cube is not just one stored value. The cube is the space between 8 neighboring values. Those values sit at the cube’s corners.

## Marching squares: the smaller idea

Marching squares is the 2D version of the idea. Instead of looking at a cube with 8 corners, we look at a square with 4 corners.

Each corner has a value. We compare each value with the iso-value and classify the corner as inside or outside. If all corners are inside, there is no boundary passing through that square. If all corners are outside, there is also no boundary. The interesting case happens when some corners are inside and some are outside.

When neighboring corners disagree, the boundary must cross the edge between them.

Interactive visual

### One marching square

The contour connects the places where an edge crosses iso 0.50. If those crossings happen at different positions on different edges, the segment becomes slanted.

click/tap visual to pause

The exact position of the segment comes from interpolation. Marching squares looks along each crossed edge and estimates where the value would reach the iso-value. Those crossing points are not always centered on the edges. When the crossings sit at different offsets, the resulting contour naturally tilts with them.

This is the core idea. We are not drawing a line because we know the final shape already. We are drawing a line because the corner values force the boundary to pass through that square.

## A contour emerges from many small decisions

One square only gives one tiny local piece of the boundary. To get a complete shape, we scan many squares in the grid. Each square contributes either nothing or a small line segment. Those small line segments accumulate into a contour.

Interactive visual

### Marching squares scan

iso 0.50

This was the part that made marching cubes feel less mysterious to me. The algorithm is not trying to understand the whole shape at once. It makes a simple local decision again and again.

## From marching squares to marching cubes

Marching cubes is the same idea lifted into 3D. The square becomes a cube. Four corner values become eight corner values. A contour line becomes a surface. And line segments become triangle patches.

The cube is classified in the same way: compare every corner value to the iso-value. If all corners are on the same side, that cube contributes no surface. If some corners are inside and some are outside, the surface passes through the cube.

Interactive visual

### One marching cube

click/tap visual to pause

This is where lookup tables enter the story. A cube has 8 corners, and each corner can be inside or outside, so there are 256 possible corner patterns. The lookup table is a compact way to say: for this pattern, these edges are crossed, and these triangles should be created.

The lookup table is important for implementation, but it is not the main insight. The main insight is still the same as marching squares: neighboring samples disagree, so the boundary must pass between them.

## Watching a sphere appear cube by cube

A sphere can be represented as a simple signed field: distance from the center minus the radius. Points inside the sphere are negative. Points outside are positive. The surface is where the value is zero.

```
field(x, y, z) = distance_from_center - radius

inside:  field < 0
surface: field = 0
outside: field > 0
```

In the walkthrough below, the left side shows one active cube and the right side shows the accumulated mesh. The useful thing to watch is the chain: corner values, inside/outside classification, crossed edges, triangle patch, then accumulated surface.

Interactive visual

### Sphere walkthrough

Step 1 of 5 — Corners

Start with one cube from the sampled sphere field. Marching cubes only sees this cube’s 8 corner values.

cell 1/26 · cube case 64 · crossed edges 3 · triangles 1 · iso 0

insideoutsidecrossed edgenew trianglemesh

## Procedural terrain is also just a field

The terrain example is the same idea with a different field. Instead of a sphere field, we first create a height for every `x, z` position. Then we compare each 3D point’s`y` value with that height.

If the point is below the terrain height, we treat it as solid ground. If it is above the height, we treat it as empty air. The surface is where that value crosses zero.

Interactive visual

### Procedural terrain extraction

resolution 22 · 2186 triangles

```
function height(x, z) {
  return noise(x, z)
}

function field(x, y, z) {
  return y - height(x, z)
}

for each cube in grid {
  values = sample8Corners(cube, field)
  triangles += marchingCubes(values, iso = 0)
}
```

So the terrain mesh is not a special case. It is still just marching cubes over sampled values. The only difference is how those values are produced.

## Resolution controls what the algorithm can recover

Marching cubes cannot invent detail that was not sampled. If the grid is coarse, the result is coarse. If the grid is denser, the algorithm has more information about where the surface crosses the volume.

Interactive visual

### Resolution comparison

This is why low-resolution marching-cubes outputs often look blocky or faceted. The algorithm is doing the best it can with the samples it was given.

## Why this matters for TinySDS3d

This is also why marching cubes shows up in my TinySDS3d project. The project can create or learn grid-like 3D representations, but a grid is not yet a real asset. To make it inspectable and exportable, I need this bridge:

```
occupancy grid / field
  -> surface extraction
  -> mesh
```

So the article stays general, but the motivation is practical. Marching cubes is the step that turns procedural or learned 3D fields into something I can actually look at, rotate, render, and eventually export.