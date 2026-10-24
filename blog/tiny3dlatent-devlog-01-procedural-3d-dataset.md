# Building a Tiny 3D Dataset Instead of Downloading a Giant One

2026-05-17 by Antash Mishra. 7 min read. Tags: 3D, Generative AI, Devlog, PyTorch, Voxels.
Original: https://antash.dev/blog/tiny3dlatent-devlog-01-procedural-3d-dataset

> The first Tiny3D-Latent devlog: starting a native-3D generation project by building a small procedural voxel dataset from scratch.

Tiny3D-Latent / Devlog 1 / Ongoing series

I am building a small text-to-3D system from first principles. The long-term goal is to understand the modern pattern behind systems like TRELLIS and Hunyuan3D by making a tiny, affordable version myself: learn a 3D latent space, generate inside it, and decode the result into a mesh.

The code for the project is available on [GitHub](https://github.com/antash-mishra/mini-latent).

```
text label
  -> condition vector
  -> tiny latent generator
  -> 3D latent
  -> decoder
  -> voxel grid / TSDF
  -> mesh
  -> preview render
```

Project path

Data → representation → latent space → generation → assets

## Why start with a dataset?

Before a model can generate 3D objects, it needs examples of what 3D objects look like. I could begin with a real dataset such as Objaverse or ShapeNet, but that would add many problems immediately: mesh cleanup, scale normalization, licenses, inconsistent quality, and much larger preprocessing work.

For the first milestone, I wanted the opposite: a dataset I could inspect completely. So I generate simple shapes with math.

## What the dataset looks like

A normal image is a grid of pixels. A voxel grid is the 3D version: each voxel is a tiny cube in space. In this project, a voxel stores whether that part of space is empty or filled.

```
image = height x width
object = depth x height x width

0 = empty space
1 = inside the object
```

Each training example is a `32 x 32 x 32` occupancy grid. The diagram below is only one flat slice through a 3D object. Stack many slices like that and you get the full volume.

## One concrete example

Here is one real example from the generated dataset:

| ID | `shape_000007` |
| --- | --- |
| Label | `red medium matte sphere` |
| Shape type | `sphere` |
| Grid shape | `[32, 32, 32]` |
| Filled voxels | `1709` |
| Saved file | `data/procedural/train/shape_000007_occupancy.npy` |

```
{
  "id": "shape_000007",
  "label": "red medium matte sphere",
  "shape_type": "sphere",
  "grid_shape": [32, 32, 32],
  "grid_dtype": "uint8",
  "grid_file": "data/procedural/train/shape_000007_occupancy.npy"
}
```

Later, the autoencoder will read the voxel grid from that file and learn to compress and reconstruct its 3D shape.

## What I built in this milestone

The first dataset contains spheres, cubes, rounded boxes, cylinders, capsules, and tori. It is saved into a simple train/validation structure:

```
data/procedural/
  train/
  val/
  metadata.json
  dataset_stats.json
```

| Split | Count |
| --- | --- |
| Train | 1000 |
| Validation | 200 |

## Dataset preview

I also generate preview images so I can inspect the dataset without opening raw arrays.

![Preview grid of procedural 3D dataset slices](https://antash.dev/blog/tiny3d-latent/preview-grid.png)

A preview grid of generated shapes. Each panel is one middle slice through a 3D voxel grid, not a full 3D render.

## A useful confusion: why a torus did not look like a torus

One preview label said `green medium wide torus`, but the image looked like two green blobs. At first that seemed like a bug. It turned out to be a visualization lesson.

The dataset stores a 3D torus. The preview shows only one 2D slice through it. A rotated torus can be sliced in a way that intersects only two small parts of the ring.

```
3D torus:
  full donut shape

single 2D slice:
  two separate pieces
```

![Three slices through a rotated torus](https://antash.dev/blog/tiny3d-latent/example-slices.png)

Three different middle slices through a rotated torus. The object is valid in 3D, but any one slice can be misleading.

That was a good early reminder: if I inspect 3D data with weak visualizations, correct geometry can look wrong. In a later milestone I will move toward mesh extraction and better 3D previews.

## Current limits

- The dataset does not contain real objects like cups or chairs yet.
- `metallic` and `matte` are currently labels only; they do not yet change geometry or create material channels.
- The previews are 2D slices, not true mesh renders.
- The data is synthetic and much cleaner than a real mesh dataset.

## What comes next

The next milestone is to turn these voxel grids into actual mesh assets:

```
occupancy grid
  -> marching cubes
  -> mesh
  -> preview render
```

That will make the 3D nature of the data much easier to inspect and will set up the later model stages, where the system starts learning and generating shapes rather than just constructing them procedurally.