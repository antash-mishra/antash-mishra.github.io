export interface BlogPostMeta {
  slug: string;
  title: string;
  date: string;
  description: string;
  tags: string[];
  readingTime: string;
}

export const blogPosts: BlogPostMeta[] = [
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
