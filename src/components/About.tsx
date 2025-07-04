import React from 'react';
import { motion } from 'framer-motion';
import { Code, Palette, Gamepad2, Zap } from 'lucide-react';

const About: React.FC = () => {
  const highlights = [
    {
      icon: Code,
      title: 'Full-Stack Development',
      description: 'Expert in modern web technologies including React, Node.js, and cloud platforms.',
    },
    {
      icon: Palette,
      title: '3D Graphics & Design',
      description: 'Creating immersive visual experiences with advanced 3D modeling and rendering.',
    },
    {
      icon: Gamepad2,
      title: 'Game Development',
      description: 'Building engaging games and interactive experiences from concept to deployment.',
    },
    {
      icon: Zap,
      title: 'Demoscene Artist',
      description: 'Pushing creative boundaries with real-time graphics and procedural art.',
    },
  ];

  return (
    <section id="about" className="py-20 bg-apple-bg dark:bg-gray-800">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-apple-text">
            About Me
          </h2>
          <p className="text-lg text-apple-text dark:text-gray-300 max-w-xl mx-auto leading-relaxed">
            I'm a developer who loves coding. Powered by caffeine & curiosity.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {highlights.map((highlight, index) => (
            <motion.div
              key={highlight.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-white dark:bg-gray-700 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="w-12 h-12 bg-apple-blue rounded-lg flex items-center justify-center mb-4">
                <highlight.icon size={24} className="text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-white">
                {highlight.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                {highlight.description}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-white dark:bg-gray-700 rounded-2xl p-8 shadow-lg"
        >
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
                What I Do
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                I turn ideas into code—web apps, tools, or 3D experiments—whatever seems fun and useful.
              </p>
            </div>
            <div className="relative">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="w-64 h-64 mx-auto relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-600 rounded-full opacity-20"></div>
                <div className="absolute inset-4 bg-gradient-to-r from-purple-400 to-pink-600 rounded-full opacity-30"></div>
                <div className="absolute inset-8 bg-gradient-to-r from-blue-500 to-purple-700 rounded-full opacity-40"></div>
                <div className="absolute inset-12 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center">
                  <span className="text-2xl font-bold text-gray-800 dark:text-white">
                    Code+Math
                  </span>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;