import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Briefcase } from 'lucide-react';

const Experience: React.FC = () => {
  const experiences = [
    {
      id: 1,
      title: 'Data Engineer',
      company: 'Piramal Finance',
      location: 'Bengaluru, India',
      period: 'Jun 2022 - Dec 2024',
      description:
        'Built data platforms, dashboards, and mobile visualisation tools to drive data-informed decisions across the organization.',
      achievements: [
        'Developed a centralized data mart for partners, improving analysis and reporting efficiency',
        'Created a React Native visualisation library that brings BI insights to mobile users',
        'Authored interactive dashboards and web articles with D3.js, Chart.js and Deneb, boosting senior-leadership engagement',
      ],
      technologies: [
        'Python',
        'React Native',
        'D3.js',
        'Chart.js',
        'Deneb',
        'Power BI',
        'Snowflake',
        'AWS S3',
      ],
    },
    {
      id: 2,
      title: 'Freelance Full-Stack Developer',
      company: 'Self-Employed',
      location: 'Remote',
      period: 'May 2024 – Present',
      description:
        'Working with clients and personal initiatives to deliver end-to-end web and AI solutions, blending product vision with hands-on engineering.',
      achievements: [
        'Designed and implemented "Vaani", a multilingual voice-assistant ecosystem featuring real-time phone and web interfaces and sub-500 ms latency through optimised TTS/STT pipelines',
        'Built supporting micro-services and dashboards with FastAPI, Next.js and Rust, enabling scalable deployment and monitoring'
      ],
      technologies: [
        'FastAPI',
        'Next.js',
        'WebSockets',
        'LLMs',
        'TTS/STT',
        'Docker',
        'AWS',
      ],
    },
    // Further professional experiences can be added here
  ];

  return (
    <section id="experience" className="py-20 bg-apple-bg dark:bg-gray-800">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            Professional Experience
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            A journey through diverse roles that shaped my expertise in full-stack development and creative technologies.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {experiences.map((experience, index) => (
            <motion.div
              key={experience.id}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="relative mb-12 last:mb-0"
            >
              {/* Timeline Line */}
              {index < experiences.length - 1 && (
                <div className="absolute left-8 top-16 w-0.5 h-32 bg-gradient-to-b from-blue-500 to-purple-600 hidden md:block" />
              )}

              <div className="flex flex-col md:flex-row gap-8">
                {/* Timeline Dot */}
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                    <Briefcase size={24} className="text-white" />
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 bg-white dark:bg-gray-700 rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                    <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2 sm:mb-0">
                      {experience.title}
                    </h3>
                    <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                      <div className="flex items-center gap-1">
                        <Calendar size={16} />
                        {experience.period}
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin size={16} />
                        {experience.location}
                      </div>
                    </div>
                  </div>

                  <h4 className="text-lg font-semibold text-blue-600 dark:text-blue-400 mb-4">
                    {experience.company}
                  </h4>

                  <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                    {experience.description}
                  </p>

                  <div className="mb-6">
                    <h5 className="font-semibold text-gray-800 dark:text-white mb-3">
                      Key Achievements:
                    </h5>
                    <ul className="space-y-2">
                      {experience.achievements.map((achievement, achievementIndex) => (
                        <li
                          key={achievementIndex}
                          className="flex items-start gap-2 text-gray-600 dark:text-gray-300"
                        >
                          <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {experience.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm rounded-full font-mono"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;