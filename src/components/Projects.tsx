import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, Filter } from 'lucide-react';

const Projects: React.FC = () => {
  const [filter, setFilter] = useState('all');

  const projects = [
    {
      id: 1,
      title: 'Tetris Game',
      description: 'Classic Tetris game with modern web technologies. Features smooth animations and responsive design.',
      image: '/tetris.png',
      category: 'game',
      technologies: ['JavaScript', 'Three.js', 'React'],
      github: 'https://github.com/antash-mishra/Tetris',
      demo: 'https://tetrisd.fly.dev/',
    },
    {
      id: 2,
      title: 'Invaders 1999',
      description: 'Retro 2D shooter built from scratch in modern C++ & OpenGL ES with custom rendering pipeline, HDR bloom.',
      image: '/invaders.jpeg',
      category: 'game',
      technologies: ['C++', 'OpenGL ES', 'GLSL', 'Android Studio'],
      github: 'https://github.com/antash-mishra/invaders',
      demo: 'https://stoned-monk.itch.io/invaders-1999',
    },
    {
      id: 3,
      title: 'Open Tunnel',
      description: 'A ngrok-like tunnel for secure local development. It is a simple and easy to use tunnel for local development.',
      image: '/tunnel.png',
      category: 'fullstack',
      technologies: ['Node.js', 'WebSocket', 'Express', 'TypeScript'],
      github: 'https://github.com/antash-mishra/open-tunnel',
      demo: 'https://www.npmjs.com/package/@antash-mishra/tunnel-client',
    },
    {
      id: 4,
      title: 'HuskyAI',
      description: 'Developed a news aggregator which develops user feed based on the user\'s preferences.',
      image: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'fullstack',
      technologies: ['Next.js', 'FastAPI', ' LangChain', 'Celery', 'RAG'],
      github: 'https://github.com/antash-mishra/huskyAI',
      demo: '#',
    },
    {
      id: 5,
      title: 'Mini Diffuser',
      description: 'Built a diffusion model from scratch. The model is able to generate images of flowers.',
      image: '/diffuser.png',
      category: 'ai',
      technologies: ['Python', 'PyTorch', 'CUDA', 'NumPy'],
      github: 'https://github.com/antash-mishra/Mini-Diffuser',
      demo: 'https://github.com/antash-mishra/Mini-Diffuser',
    }
  ];

  const categories = [
    { id: 'all', label: 'All Projects' },
    { id: 'fullstack', label: 'Full-Stack' },
    { id: 'game', label: 'Games' },
    // { id: '3d', label: '3D Graphics' },
    { id: 'ai', label: 'AI/ML' },
  ];

  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(project => project.category === filter);

  return (
    <section id="projects" className="py-20 bg-gray-800">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            Featured Projects
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            A showcase of my technical expertise across web development, 3D graphics, and innovative solutions.
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((category) => (
            <motion.button
              key={category.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setFilter(category.id)}
                              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                filter === category.id
                  ? 'bg-apple-blue text-white shadow-lg'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              <Filter size={16} className="inline mr-2" />
              {category.label}
            </motion.button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-gray-700 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 object-cover transition-transform duration-300 hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3 text-white">
                    {project.title}
                  </h3>
                  <p className="text-gray-300 mb-4 text-sm leading-relaxed">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-gray-600 text-apple-blue text-xs rounded-full font-mono"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex gap-4">
                    <motion.a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-gray-300 rounded-lg hover:bg-gray-500 transition-colors duration-200"
                    >
                      <Github size={16} />
                      Code
                    </motion.a>
                    <motion.a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-2 px-4 py-2 bg-apple-blue text-white rounded-lg hover:shadow-lg transition-shadow duration-200"
                    >
                      <ExternalLink size={16} />
                      Demo
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;