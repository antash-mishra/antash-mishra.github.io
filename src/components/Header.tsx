import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const navItems = [
    { href: '/#', label: 'About' },
    { href: '/#experience', label: 'Experience' },
    { href: '/#projects', label: 'Projects' },
    { href: '/#blog', label: 'Blog' },
    { href: '/#contact', label: 'Contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToY = (targetTop: number) => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    window.scrollTo({
      top: targetTop,
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
    });
  };

  const handleNavClick = (href: string) => {
    // Header only renders on the homepage today. If it is ever reused elsewhere,
    // fall back to normal navigation instead of trying to scroll a missing page.
    if (window.location.pathname !== '/') {
      window.location.href = href;
      return;
    }

    setIsMenuOpen(false);

    const hash = href.split('#')[1] ?? '';

    if (!hash) {
      window.history.pushState(null, '', '/#');
      scrollToY(0);
      return;
    }

    const target = document.getElementById(hash);
    if (!target) return;

    // The header is fixed, so a raw hash jump places section headings too high.
    // Manually calculating the destination keeps the scroll smooth and gives the
    // section a little breathing room below the nav.
    const headerOffset = 80;
    const targetTop = target.getBoundingClientRect().top + window.scrollY - headerOffset;

    window.history.pushState(null, '', `/#${hash}`);
    scrollToY(targetTop);
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-gray-900/90 backdrop-blur-md border-b border-ind-border'
          : 'bg-transparent'
      }`}
    >
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="text-2xl font-display font-bold tracking-tight text-white"
          >
            Antash Mishra
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <motion.button
                key={item.href}
                type="button"
                onClick={() => handleNavClick(item.href)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="text-ind-text-dim hover:text-ind-accent uppercase tracking-wider text-sm font-medium transition-colors duration-200"
              >
                {item.label}
              </motion.button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded bg-ind-surface border border-ind-border text-gray-300"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden mt-4 py-4 bg-ind-surface border border-ind-border rounded-lg"
          >
            {navItems.map((item) => (
              <button
                key={item.href}
                type="button"
                onClick={() => handleNavClick(item.href)}
                className="block w-full px-4 py-2 text-left text-ind-text-dim hover:text-ind-accent hover:bg-gray-800 uppercase tracking-wider text-sm transition-colors duration-200"
              >
                {item.label}
              </button>
            ))}
          </motion.div>
        )}
      </nav>
    </motion.header>
  );
};

export default Header;
