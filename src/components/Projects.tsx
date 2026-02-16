import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github } from 'lucide-react';

const Projects: React.FC = () => {
  const [filter, setFilter] = useState('all');

  const projects = [
    {
      id: 7,
      title: 'Vaani',
      description: 'Real-time voice AI agent platform with sub-500 ms latency. Integrates WebRTC, TTS/STT pipelines, and LLM orchestration for telephony and conversational AI.',
      category: 'fullstack',
      technologies: ['WebRTC', 'FastAPI', 'Next.js', 'LLMs', 'TTS/STT'],
      github: 'https://github.com/antash-mishra',
      demo: 'https://agents.corrodedlabs.com',
    },
    {
      id: 6,
      title: 'Engine',
      description: 'Custom OpenGL real-time graphics engine with deferred and clustered deferred shading, PBR, IBL, shadow mapping, HDR post-processing, SSAO, and glTF scene support. Handles 10,000+ dynamic lights.',
      category: '3d',
      technologies: ['C++', 'OpenGL', 'GLSL', 'Vulkan'],
      github: 'https://github.com/antash-mishra/engine',
      demo: 'https://github.com/antash-mishra/engine',
    },
    {
      id: 2,
      title: 'Invaders 1999',
      description: 'Retro 2D shooter built from scratch in modern C++ & OpenGL ES with custom rendering pipeline, HDR bloom.',
      category: 'game',
      technologies: ['C++', 'OpenGL ES', 'GLSL', 'Android Studio'],
      github: 'https://github.com/antash-mishra/invaders',
      demo: 'https://stoned-monk.itch.io/invaders-1999',
    },
    {
      id: 3,
      title: 'Open Tunnel',
      description: 'A ngrok-like tunnel for secure local development. It is a simple and easy to use tunnel for local development.',
      category: 'fullstack',
      technologies: ['Node.js', 'WebSocket', 'Express', 'TypeScript'],
      github: 'https://github.com/antash-mishra/open-tunnel',
      demo: 'https://www.npmjs.com/package/@antash-mishra/tunnel-client',
    },
    {
      id: 4,
      title: 'HuskyAI',
      description: 'Developed a news aggregator which develops user feed based on the user\'s preferences.',
      category: 'fullstack',
      technologies: ['Next.js', 'FastAPI', 'LangChain', 'Celery', 'RAG'],
      github: 'https://github.com/antash-mishra/huskyAI',
      demo: '#',
    },
    {
      id: 5,
      title: 'Mini Diffuser',
      description: 'Built a diffusion model from scratch. The model is able to generate images of flowers.',
      category: 'ai',
      technologies: ['Python', 'PyTorch', 'CUDA', 'NumPy'],
      github: 'https://github.com/antash-mishra/Mini-Diffuser',
      demo: 'https://github.com/antash-mishra/Mini-Diffuser',
    },
  ];

  const categories = [
    { id: 'all', label: 'all' },
    { id: 'game', label: 'games' },
    { id: '3d', label: '3d graphics' },
    { id: 'fullstack', label: 'full-stack' },
    { id: 'ai', label: 'ai/ml' },
  ];

  const filteredProjects = filter === 'all'
    ? projects
    : projects.filter(project => project.category === filter);

  return (
    <section id="projects" className="py-20 bg-gray-900 bg-dot-grid bg-[size:24px_24px]">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <span className="section-eyebrow">03 // Projects</span>
          <h2 className="section-heading">
            Featured Projects
          </h2>
        </motion.div>

        {/* Terminal-style Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex items-center gap-1 mb-12 border-b border-ind-border/30 overflow-x-auto"
        >
          <span className="font-mono text-sm text-ind-accent mr-2 flex-shrink-0">&gt;</span>
          {categories.map((category, index) => (
            <React.Fragment key={category.id}>
              {index > 0 && (
                <span className="font-mono text-ind-text-dim/30 flex-shrink-0">|</span>
              )}
              <button
                onClick={() => setFilter(category.id)}
                className={filter === category.id ? 'terminal-tab-active flex-shrink-0' : 'terminal-tab flex-shrink-0'}
              >
                {category.label}
              </button>
            </React.Fragment>
          ))}
        </motion.div>

        {/* Uniform Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <AnimatePresence>
            {filteredProjects.map((project, index) => {
              const displayIndex = String(index + 1).padStart(2, '0');

              return (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                >
                  <div className="bento-card p-6 flex flex-col h-full">
                    <div className="flex items-center justify-between mb-3">
                      <span className="project-index">{displayIndex}</span>
                      <span className="font-mono text-[10px] uppercase tracking-wider text-ind-text-dim/50">{project.category}</span>
                    </div>
                    <h3 className="mono-title text-lg mb-3">{project.title}</h3>
                    <p className="text-ind-text-dim text-sm leading-relaxed mb-4 flex-grow">{project.description}</p>
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {project.technologies.map((tech) => (
                        <span key={tech} className="tech-tag text-[10px] px-2 py-0.5">{tech}</span>
                      ))}
                    </div>
                    <div className="flex gap-4 font-mono text-xs mt-auto">
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-ind-text-dim hover:text-ind-accent transition-colors flex items-center gap-1"
                      >
                        <Github size={12} />
                        source
                      </a>
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-ind-text-dim hover:text-ind-accent transition-colors"
                      >
                        demo
                      </a>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
