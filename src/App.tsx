import React, { useEffect, useRef } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Database, Github, Mail, Linkedin, Terminal, Bot, Box } from 'lucide-react';
import Background from './components/Background';
import ProjectCard from './components/ProjectCard';
import SkillsSection from './components/SkillsSection';
import PrivacyPolicy from './components/PrivacyPolicy';

function HomePage() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return;
      const { clientX, clientY } = e;
      const { left, top, width, height } = heroRef.current.getBoundingClientRect();
      const x = (clientX - left) / width - 0.5;
      const y = (clientY - top) / height - 0.5;
      
      heroRef.current.style.transform = `
        perspective(1000px)
        rotateY(${x * 10}deg)
        rotateX(${-y * 10}deg)
        translateZ(20px)
      `;
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen text-white">
      <Background />
      
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-20">
        <div 
          ref={heroRef}
          className="max-w-4xl mx-auto transition-transform duration-200 ease-out"
        >
          <h1 className="text-6xl font-bold mb-4">Antash Mishra</h1>
          <h2 className="text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
            Software Developer
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Transforming complex data into beautiful, interactive visualizations and actionable insights
          </p>
          <div className="flex gap-4">
            <a href="https://github.com/antash-mishra" className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg hover:bg-white/20 transition-colors">
              <Github className="w-5 h-5" />
              GitHub
            </a>
            <a href="mailto:contact@example.com" className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-2 rounded-lg hover:brightness-110 transition-all">
              <Mail className="w-5 h-5" />
              Contact
            </a>
          </div>
        </div>
      </div>

      {/* Projects Section */}
      <div className="container mx-auto px-4 py-20">
        <h2 className="text-4xl font-bold mb-12 text-center">Featured Projects</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <ProjectCard
            icon={Bot}
            title="Vaani AI Bot"
            description="Hindi-language RAG-based voice bot for collecting user feedback, complaints, and campaign details via phone calls"
            link="https://github.com/antash-mishra/Binge-Now"
            color="text-purple-400"
          />

          <ProjectCard
            icon={Database}
            title="Mini Diffuser"
            description="A lightweight implementation of stable diffusion for image generation"
            link="https://github.com/antash-mishra/Mini-Diffuser"
            color="text-blue-400"
          />
          
          <ProjectCard
            icon={Terminal}
            title="HuskyAI (Personalized Scraper & News Aggregator)"
            description="Personalized news recommendation system using RSS feeds"
            link="https://github.com/antash-mishra/News-RSS-Aggregator-Recommender"
            color="text-green-400"
          />

          <ProjectCard
            icon={Box}
            title="Shitty 3D"
            description="3D graphics engine implementation"
            link="https://github.com/antash-mishra/Shitty-3D"
            color="text-orange-400"
          />
        </div>
      </div>

      {/* Skills Section */}
      <SkillsSection />

      {/* Contact Section */}
      <div id="contact" className="container mx-auto px-4 py-20">
        <h2 className="text-4xl font-bold mb-12 text-center">Get in Touch</h2>
        <div className="max-w-xl mx-auto bg-white/5 p-8 rounded-xl backdrop-blur-sm">
          <div className="flex flex-col gap-6">
            <a href="mailto:contact@example.com" className="flex items-center gap-3 text-gray-300 hover:text-white">
              <Mail className="w-6 h-6" />
              mishraantash34@gmail.com
            </a>
            <a href="https://linkedin.com/in/antash-mishra" className="flex items-center gap-3 text-gray-300 hover:text-white">
              <Linkedin className="w-6 h-6" />
              LinkedIn Profile
            </a>
            <a href="https://github.com/antash-mishra" className="flex items-center gap-3 text-gray-300 hover:text-white">
              <Github className="w-6 h-6" />
              GitHub Profile
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/privacy" element={<PrivacyPolicy />} />
    </Routes>
  );
}

export default App;
