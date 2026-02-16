import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { blogPosts } from '../data/blogPosts';

const Blog: React.FC = () => {
  return (
    <section id="blog" className="py-20 bg-gray-900">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <span className="section-eyebrow">04 // Blog</span>
          <h2 className="section-heading">Dev Log</h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {blogPosts.map((post) => (
            <div key={post.slug} className="bento-card p-6">
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-xs text-ind-text-dim">
                  {post.date}
                </span>
                <span className="font-mono text-xs text-ind-text-dim">
                  {post.readingTime}
                </span>
              </div>
              <h3 className="mono-title text-xl mb-3">{post.title}</h3>
              <p className="text-ind-text-dim text-sm leading-relaxed mb-4">
                {post.description}
              </p>
              <div className="flex flex-wrap gap-1.5 mb-4">
                {post.tags.map((tag) => (
                  <span key={tag} className="tech-tag text-[10px] px-2 py-0.5">
                    {tag}
                  </span>
                ))}
              </div>
              <Link
                to={`/blog/${post.slug}`}
                className="font-mono text-sm text-ind-accent hover:underline"
              >
                read &rarr;
              </Link>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Blog;
