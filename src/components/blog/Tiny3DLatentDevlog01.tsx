import React from 'react';

const CodeBlock: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <pre className="overflow-x-auto border border-ind-border bg-ind-surface-alt p-4 text-sm leading-relaxed text-ind-text">
    <code className="font-mono">{children}</code>
  </pre>
);

const Tiny3DLatentDevlog01: React.FC = () => {
  const voxelRows = [
    '00011000',
    '00111100',
    '01111110',
    '11111111',
    '11111111',
    '01111110',
    '00111100',
    '00011000',
  ];

  return (
    <div className="space-y-10">
      <section>
        <div className="mb-5 border-b border-ind-border pb-4 font-mono text-xs uppercase tracking-[0.18em] text-ind-text-dim">
          Tiny3D-Latent / Devlog 1 / Ongoing series
        </div>

        <p className="text-lg leading-relaxed text-ind-text">
          I am building a small text-to-3D system from first principles. The long-term goal is to
          understand the modern pattern behind systems like TRELLIS and Hunyuan3D by making a tiny,
          affordable version myself: learn a 3D latent space, generate inside it, and decode the
          result into a mesh.
        </p>
        <p>
          The code for the project is available on{' '}
          <a
            href="https://github.com/antash-mishra/mini-latent"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>
          .
        </p>

        <CodeBlock>{`text label
  -> condition vector
  -> tiny latent generator
  -> 3D latent
  -> decoder
  -> voxel grid / TSDF
  -> mesh
  -> preview render`}</CodeBlock>

        <div className="mt-6 border-t border-ind-border pt-4">
          <div className="mb-2 font-mono text-xs uppercase tracking-[0.18em] text-ind-text-dim">
            Project path
          </div>
          <p className="m-0 text-sm leading-relaxed text-ind-text-dim">
            Data → representation → latent space → generation → assets
          </p>
        </div>
      </section>

      <section>
        <h2>Why start with a dataset?</h2>
        <p>
          Before a model can generate 3D objects, it needs examples of what 3D objects look like. I
          could begin with a real dataset such as Objaverse or ShapeNet, but that would add many
          problems immediately: mesh cleanup, scale normalization, licenses, inconsistent quality,
          and much larger preprocessing work.
        </p>
        <p>
          For the first milestone, I wanted the opposite: a dataset I could inspect completely. So
          I generate simple shapes with math.
        </p>
      </section>

      <section>
        <h2>What the dataset looks like</h2>
        <p>
          A normal image is a grid of pixels. A voxel grid is the 3D version: each voxel is a tiny
          cube in space. In this project, a voxel stores whether that part of space is empty or
          filled.
        </p>
        <CodeBlock>{`image = height x width
object = depth x height x width

0 = empty space
1 = inside the object`}</CodeBlock>
        <p>
          Each training example is a <code>32 x 32 x 32</code> occupancy grid. The diagram below is
          only one flat slice through a 3D object. Stack many slices like that and you get the full
          volume.
        </p>

        <div className="inline-grid grid-cols-8 gap-1 border border-ind-border bg-ind-surface p-4">
          {voxelRows.flatMap((row, rowIndex) =>
            row.split('').map((value, columnIndex) => (
              <span
                key={`${rowIndex}-${columnIndex}`}
                className={`h-5 w-5 border ${
                  value === '1'
                    ? 'border-ind-accent bg-ind-accent'
                    : 'border-ind-border bg-ind-surface-alt'
                }`}
              />
            )),
          )}
        </div>
      </section>

      <section>
        <h2>One concrete example</h2>
        <p>Here is one real example from the generated dataset:</p>

        <table>
          <tbody>
            <tr>
              <th>ID</th>
              <td>
                <code>shape_000007</code>
              </td>
            </tr>
            <tr>
              <th>Label</th>
              <td>
                <code>red medium matte sphere</code>
              </td>
            </tr>
            <tr>
              <th>Shape type</th>
              <td>
                <code>sphere</code>
              </td>
            </tr>
            <tr>
              <th>Grid shape</th>
              <td>
                <code>[32, 32, 32]</code>
              </td>
            </tr>
            <tr>
              <th>Filled voxels</th>
              <td>
                <code>1709</code>
              </td>
            </tr>
            <tr>
              <th>Saved file</th>
              <td>
                <code>data/procedural/train/shape_000007_occupancy.npy</code>
              </td>
            </tr>
          </tbody>
        </table>

        <CodeBlock>{`{
  "id": "shape_000007",
  "label": "red medium matte sphere",
  "shape_type": "sphere",
  "grid_shape": [32, 32, 32],
  "grid_dtype": "uint8",
  "grid_file": "data/procedural/train/shape_000007_occupancy.npy"
}`}</CodeBlock>

        <p>
          Later, the autoencoder will read the voxel grid from that file and learn to compress and
          reconstruct its 3D shape.
        </p>
      </section>

      <section>
        <h2>What I built in this milestone</h2>
        <p>
          The first dataset contains spheres, cubes, rounded boxes, cylinders, capsules, and tori.
          It is saved into a simple train/validation structure:
        </p>
        <CodeBlock>{`data/procedural/
  train/
  val/
  metadata.json
  dataset_stats.json`}</CodeBlock>

        <table>
          <thead>
            <tr>
              <th>Split</th>
              <th>Count</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Train</td>
              <td>1000</td>
            </tr>
            <tr>
              <td>Validation</td>
              <td>200</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section>
        <h2>Dataset preview</h2>
        <p>I also generate preview images so I can inspect the dataset without opening raw arrays.</p>
        <figure>
          <img
            src="/blog/tiny3d-latent/preview-grid.png"
            alt="Preview grid of procedural 3D dataset slices"
          />
          <figcaption>
            A preview grid of generated shapes. Each panel is one middle slice through a 3D voxel
            grid, not a full 3D render.
          </figcaption>
        </figure>
      </section>

      <section>
        <h2>A useful confusion: why a torus did not look like a torus</h2>
        <p>
          One preview label said <code>green medium wide torus</code>, but the image looked like two
          green blobs. At first that seemed like a bug. It turned out to be a visualization lesson.
        </p>
        <blockquote>
          The dataset stores a 3D torus. The preview shows only one 2D slice through it. A rotated
          torus can be sliced in a way that intersects only two small parts of the ring.
        </blockquote>
        <CodeBlock>{`3D torus:
  full donut shape

single 2D slice:
  two separate pieces`}</CodeBlock>
        <figure>
          <img
            src="/blog/tiny3d-latent/example-slices.png"
            alt="Three slices through a rotated torus"
          />
          <figcaption>
            Three different middle slices through a rotated torus. The object is valid in 3D, but
            any one slice can be misleading.
          </figcaption>
        </figure>
        <p>
          That was a good early reminder: if I inspect 3D data with weak visualizations, correct
          geometry can look wrong. In a later milestone I will move toward mesh extraction and
          better 3D previews.
        </p>
      </section>

      <section>
        <h2>Current limits</h2>
        <ul>
          <li>The dataset does not contain real objects like cups or chairs yet.</li>
          <li>
            <code>metallic</code> and <code>matte</code> are currently labels only; they do not yet
            change geometry or create material channels.
          </li>
          <li>The previews are 2D slices, not true mesh renders.</li>
          <li>The data is synthetic and much cleaner than a real mesh dataset.</li>
        </ul>
      </section>

      <section>
        <h2>What comes next</h2>
        <p>The next milestone is to turn these voxel grids into actual mesh assets:</p>
        <CodeBlock>{`occupancy grid
  -> marching cubes
  -> mesh
  -> preview render`}</CodeBlock>
        <p>
          That will make the 3D nature of the data much easier to inspect and will set up the later
          model stages, where the system starts learning and generating shapes rather than just
          constructing them procedurally.
        </p>
      </section>
    </div>
  );
};

export default Tiny3DLatentDevlog01;
