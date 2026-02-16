import React from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/atom-one-dark.css';
import { blogPosts } from '../data/blogPosts';

import finetuningQwenContent from '../content/blog/finetuning-qwen-stt.md?raw';

const contentMap: Record<string, string> = {
  'finetuning-qwen-stt': finetuningQwenContent,
};

const BlogPostPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = blogPosts.find((p) => p.slug === slug);
  const content = slug ? contentMap[slug] : undefined;

  if (!post || !content) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-mono text-2xl text-white mb-4">Post not found</h1>
          <Link
            to="/"
            className="font-mono text-sm text-ind-accent hover:underline"
          >
            &larr; Back
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 pt-24 pb-20">
      <div className="container mx-auto px-6 max-w-3xl">
        <Link
          to="/"
          className="font-mono text-sm text-ind-text-dim hover:text-ind-accent transition-colors inline-block mb-8"
        >
          &larr; Back
        </Link>

        <header className="mb-12">
          <div className="flex items-center gap-4 mb-4">
            <span className="font-mono text-xs text-ind-text-dim">
              {post.date}
            </span>
            <span className="font-mono text-xs text-ind-text-dim">
              {post.readingTime}
            </span>
          </div>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            {post.title}
          </h1>
          <div className="flex flex-wrap gap-1.5">
            {post.tags.map((tag) => (
              <span key={tag} className="tech-tag text-[10px] px-2 py-0.5">
                {tag}
              </span>
            ))}
          </div>
        </header>

        <article className="prose prose-invert prose-amber max-w-none">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeHighlight]}
          >
            {content.replace(/^#\s+.+\n+/, '')}
          </ReactMarkdown>
        </article>
      </div>
    </div>
  );
};

export default BlogPostPage;
