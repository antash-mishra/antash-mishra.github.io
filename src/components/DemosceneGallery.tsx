import React from 'react';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';

const DemosceneGallery: React.FC = () => {
  const demosceneProjects = [
    {
      id: 1,
      title: 'Open Road Scene',
      description: 'A 3D open road scene with a car driving on the road.',
      image: '/openroad.png',
      demoUrl: 'https://openroadsim.netlify.app/',
      category: 'Scene',
      year: '2025',
      technologies: ['Three.js', 'Typescript'],
    },
    {
      id: 2,
      title: 'Particle Effect',
      description: 'A firework scene built using shader and particle effects.',
      image: '/firework.png',
      demoUrl: 'https://basicshadingfirework.fly.dev/',
      category: 'Demo',
      year: '2025',
      technologies: ['WebGL', 'GLSL', 'Three.js'],
    },
  ];

  return (
    <section id="demoscene" className="py-20 bg-gray-900">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <span className="section-eyebrow">03 // Demoscene</span>
          <h2 className="section-heading">
            Demo Reel
          </h2>
        </motion.div>

        <div className="space-y-6">
          {demosceneProjects.map((project, index) => (
            <motion.a
              key={project.id}
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="block relative group overflow-hidden rounded-sm"
            >
              {/* Full-width image */}
              <div className="relative h-[50vh] min-h-[320px] max-h-[500px] overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />

                {/* Dark gradient overlay from bottom */}
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent" />

                {/* CRT scanline overlay */}
                <div className="absolute inset-0 crt-overlay opacity-50" />

                {/* Noise texture overlay */}
                <div className="absolute inset-0 bg-noise opacity-30 pointer-events-none" />

                {/* Text overlaid at bottom-left */}
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
                  <span className="font-mono text-xs uppercase tracking-wider text-ind-accent/80 mb-2 block">
                    {project.category} / {project.year}
                  </span>
                  <h3 className="font-display text-3xl md:text-4xl font-bold text-white mb-2">
                    {project.title}
                  </h3>
                  <p className="text-ind-text-dim text-sm md:text-base max-w-xl mb-3">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span key={tech} className="tech-tag">{tech}</span>
                    ))}
                  </div>
                </div>

                {/* "view demo" on hover — bottom-right, hidden on mobile */}
                <div className="absolute bottom-6 right-6 md:bottom-10 md:right-10 hidden md:flex items-center gap-2 font-mono text-sm text-ind-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Play size={14} />
                  view demo
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DemosceneGallery;
