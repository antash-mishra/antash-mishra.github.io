import React from 'react';
import { motion } from 'framer-motion';
import { Download, FileText, Star } from 'lucide-react';

const Resume: React.FC = () => {
  const resumeVersions = [
    {
      title: 'Full-Stack Developer Resume',
      description: 'Comprehensive resume highlighting web development expertise, technical skills, and professional experience.',
      filename: 'Resume Antash.pdf',
      icon: FileText,
      color: 'from-blue-500 to-blue-600',
    },
    {
      title: 'Game Developer Resume',
      description: 'Specialized resume focusing on game development, 3D graphics, and creative programming projects.',
      filename: 'Resume Antash (Indie Dev).pdf',
      icon: Star,
      color: 'from-purple-500 to-purple-600',
    },
  ];

  return (
    <section id="resume" className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Download Resume
          </h2>
          <p className="text-lg text-apple-text dark:text-gray-300 max-w-2xl mx-auto">
            Get a detailed overview of my skills, experience, and achievements. Choose the version that best fits your needs.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {resumeVersions.map((resume, index) => (
            <motion.div
              key={resume.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ y: -5 }}
              className="bg-gray-50 dark:bg-gray-800 rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className={`w-16 h-16 bg-gradient-to-br ${resume.color} rounded-lg flex items-center justify-center mb-6`}>
                <resume.icon size={32} className="text-white" />
              </div>

              <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
                {resume.title}
              </h3>

              <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                {resume.description}
              </p>

              <motion.a
                href={`/${resume.filename}`}
                download
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r ${resume.color} text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transition-shadow duration-300`}
              >
                <Download size={20} />
                Download PDF
              </motion.a>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <div className="bg-apple-gray-light dark:from-gray-800 dark:to-gray-700 rounded-xl p-8 max-w-2xl mx-auto">
            <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">
              Need a Custom Resume?
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Looking for a resume tailored to a specific role or industry? I'd be happy to create a customized version that highlights the most relevant skills and experiences.
            </p>
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 px-6 py-3 bg-apple-blue text-white rounded-lg font-semibold hover:shadow-lg transition-shadow duration-300"
            >
              Get in Touch
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Resume;