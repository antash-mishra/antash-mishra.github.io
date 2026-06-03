import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { blogPosts } from '../data/blogPosts';

const Blog: React.FC = () => {
  return (
    <section id="blog" className="bg-gray-900 py-16">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <span className="section-eyebrow">04 // Blog</span>
          <h2 className="section-heading">Dev Log</h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="divide-y divide-ind-border/60 md:divide-y-0 md:space-y-2"
        >
          {blogPosts.map((post) => (
            <article
              key={post.slug}
              className="group grid gap-3 py-4 transition-colors hover:bg-ind-surface/25 first:pt-0 md:grid-cols-[110px_1fr_auto] md:items-center md:px-3 md:py-3"
            >
              <time className="font-mono text-xs text-ind-text-dim" dateTime={post.date}>
                {post.date}
              </time>

              <div className="min-w-0">
                <Link to={`/blog/${post.slug}`} className="block">
                  <h3 className="mono-title text-lg transition-colors group-hover:text-ind-accent">
                    {post.title}
                  </h3>
                </Link>
                <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.16em] text-ind-text-dim">
                  {post.series ? `${post.series.title} · ` : ''}{post.tags.slice(0, 2).join(' / ')}
                </p>
              </div>

              <Link
                to={`/blog/${post.slug}`}
                className="font-mono text-xs uppercase tracking-[0.16em] text-ind-accent hover:underline md:justify-self-end"
              >
                read &rarr;
              </Link>
            </article>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Blog;
