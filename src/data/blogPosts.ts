export interface BlogPostMeta {
  slug: string;
  title: string;
  date: string;
  description: string;
  tags: string[];
  readingTime: string;
  series?: {
    slug: string;
    title: string;
    entry: number;
    status: 'ongoing' | 'complete';
  };
}

export const blogPosts: BlogPostMeta[] = [
  {
    slug: 'tiny3dlatent-devlog-01-procedural-3d-dataset',
    title: 'Building a Tiny 3D Dataset Instead of Downloading a Giant One',
    date: '2026-05-17',
    description:
      'The first Tiny3D-Latent devlog: starting a native-3D generation project by building a small procedural voxel dataset from scratch.',
    tags: ['3D', 'Generative AI', 'Devlog', 'PyTorch', 'Voxels'],
    readingTime: '7 min read',
    series: {
      slug: 'tiny3d-latent',
      title: 'Tiny3D-Latent',
      entry: 1,
      status: 'ongoing',
    },
  },
  {
    slug: 'finetuning-qwen-stt',
    title: 'Finetuning Qwen STT Model for Hindi Language',
    date: '2026-02-16',
    description:
      'Fine-tuning Qwen 0.6B with LoRA on 5 hours of Hindi speech data — dropping WER from 31% to 24.67% while keeping sub-250ms latency for Vaani.',
    tags: ['AI/ML', 'STT', 'LoRA', 'Fine-tuning', 'Python'],
    readingTime: '5 min read',
  },
];
