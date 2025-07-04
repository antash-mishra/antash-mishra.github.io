import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Code, Palette } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-2xl font-bold text-white mb-4"
            >
              Antash Mishra
            </motion.div>
            <p className="text-gray-400 leading-relaxed">
              Full-Stack Developer & 3D Graphics Enthusiast
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { href: '#about', label: 'About' },
                { href: '#projects', label: 'Projects' },
                { href: '#demoscene', label: 'Demoscene' },
                { href: '#contact', label: 'Contact' },
              ].map((link) => (
                <li key={link.href}>
                  <motion.a
                    href={link.href}
                    whileHover={{ x: 5 }}
                    className="text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </motion.a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Get In Touch</h3>
            <div className="space-y-2 text-gray-400">
              <p>mishraantash34@gmail.com</p>
              <p>Available for freelance work</p>
              <p>Remote & On-site projects</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-center items-center">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-gray-400 flex items-center gap-2 mb-4 md:mb-0"
            >
              Made with <Heart size={16} className="text-red-500" /> using{' '}
              <Code size={16} className="text-apple-blue" /> and{' '}
              <Palette size={16} className="text-purple-400" />
            </motion.p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;