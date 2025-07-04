import React from 'react';
import { motion } from 'framer-motion';
import { Play, ExternalLink, Award } from 'lucide-react';

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
    // {
    //   id: 3,
    //   title: 'Fractal Explorer',
    //   description: 'Interactive fractal visualization with real-time parameter manipulation and zoom capabilities.',
    //   image: 'https://basicshadergalaxy.fly.dev/',
    //   demoUrl: 'https://basicshadergalaxy.fly.dev/',
    //   category: 'Interactive',
    //   year: '2022',
    //   technologies: ['WebGL', 'GLSL', 'Three.js'],
    // }
  ];

  return (
    <section id="demoscene" className="py-20 bg-apple-bg dark:bg-gray-900">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            Demoscene Gallery
          </h2>
          <p className="text-lg text-apple-text dark:text-gray-300 max-w-2xl mx-auto">
            Exploring the artistic side of programming through real-time graphics, interactive experiences, and creative coding.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {demosceneProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-gray-50 dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="relative group">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <motion.a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="bg-white/20 backdrop-blur-sm border border-white/30 text-white px-6 py-3 rounded-full flex items-center gap-2 hover:bg-white/30 transition-colors duration-200"
                  >
                    <Play size={20} />
                    View Demo
                  </motion.a>
                </div>
                <div className="absolute top-4 left-4">
                  <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {project.category}
                  </span>
                </div>
                <div className="absolute top-4 right-4">
                  <span className="bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                    {project.year}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold mb-3 text-gray-800 dark:text-white">
                  {project.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 text-xs rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <motion.a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-2 text-apple-blue dark:text-apple-blue-light hover:text-apple-blue dark:hover:text-apple-blue-light font-medium transition-colors duration-200"
                >
                  <ExternalLink size={16} />
                  View Live Demo
                </motion.a>
              </div>
            </motion.div>
          ))}
        </div>


      </div>
    </section>
  );
};

export default DemosceneGallery;