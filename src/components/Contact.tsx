import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin } from 'lucide-react';

const Contact: React.FC = () => {
  return (
    <section id="contact" className="py-20 bg-gray-900">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl"
        >
          <h2 className="font-display text-hero text-white mb-4">
            Let's build something.
          </h2>
          <p className="text-ind-text-dim text-lg max-w-xl mb-8">
            Have a project in mind or want to collaborate? Let's talk.
          </p>
          <a
            href="mailto:mishraantash34@gmail.com"
            className="font-mono text-lg text-ind-text-dim underline underline-offset-4 decoration-ind-border hover:text-ind-accent hover:decoration-ind-accent transition-colors"
          >
            mishraantash34@gmail.com
          </a>
          <div className="flex gap-3 mt-6">
            <a
              href="https://github.com/antash-mishra"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 border border-ind-border text-ind-text-dim hover:text-ind-accent hover:border-ind-accent/50 transition-colors rounded-sm"
            >
              <Github size={18} />
            </a>
            <a
              href="https://linkedin.com/in/antash-mishra"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 border border-ind-border text-ind-text-dim hover:text-ind-accent hover:border-ind-accent/50 transition-colors rounded-sm"
            >
              <Linkedin size={18} />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
