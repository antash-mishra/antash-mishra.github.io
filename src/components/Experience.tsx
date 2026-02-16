import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, ChevronRight } from 'lucide-react';

const Experience: React.FC = () => {
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const experiences = [
    {
      id: 1,
      title: 'Full Stack Developer (Consultant)',
      company: 'Piramal Finance',
      location: 'Remote',
      period: 'Aug 2025 – Present',
      isPresent: true,
      description:
        'Owning delivery of Shodh (self-serve analytics dashboard) and shipping features for Analytics Central (~10,000 employees).',
      achievements: [
        'Owned end-to-end delivery of Shodh, a self-serve analytics dashboard for credit policy, product, and model risk teams',
        'Shipped features and APIs for Analytics Central — a microservice platform used by ~10,000 employees — to centralize sales and business analytics',
      ],
      technologies: ['React', 'Next.js', 'Node.js', 'Python', 'REST APIs', 'Microservices'],
    },
    {
      id: 2,
      title: 'Full Stack Developer',
      company: 'Freelance',
      location: 'Remote',
      period: 'Nov 2024 – Aug 2025',
      isPresent: false,
      description:
        'Launched Vaani AI agent platform + built event app.',
      achievements: [
        'Launched Vaani, a self-serve AI agent platform for voice and messaging across phone, WhatsApp, and Instagram, supporting outbound campaigns and two-way conversations',
        'Architected a real-time voice AI stack with WebRTC, LLM orchestration, tool-calling, multilingual routing, vector retrieval, and a speech pipeline (STT, TTS, VAD, turn detection)',
        'Integrated telephony operations with SIP routing, call recording, transcript storage, and SQLite-backed analytics',
        'Shipped a full-stack admin dashboard to create agents, launch bulk campaigns, and monitor conversation metrics',
        'Built a React Native event app (Expo, TypeScript) with event discovery, WebSocket chat, push notifications, and a Go + SQLite backend',
      ],
      technologies: [
        'WebRTC',
        'FastAPI',
        'Next.js',
        'React Native',
        'Go',
        'LLMs',
        'TTS/STT',
        'Docker',
      ],
    },
    {
      id: 3,
      title: 'Data Engineer',
      company: 'Piramal Finance',
      location: 'Bengaluru, India',
      period: 'Jun 2022 – Dec 2024',
      isPresent: false,
      description:
        'Built centralized data marts, dashboards, and internal web tools.',
      achievements: [
        'Built centralized partner data marts to improve reporting and decision-making',
        'Developed dashboards and internal web tools for senior leadership visibility',
        'Contributed to React Native visualization libraries for mobile analytics',
      ],
      technologies: [
        'Python',
        'React Native',
        'D3.js',
        'Power BI',
        'Snowflake',
        'AWS S3',
      ],
    },
  ];

  const maxVisibleTags = 3;

  return (
    <section id="experience" className="py-20 bg-gray-900">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <span className="section-eyebrow">02 // Experience</span>
          <h2 className="section-heading">
            Changelog
          </h2>
        </motion.div>

        <div className="max-w-5xl">
          {experiences.map((experience, index) => {
            const isExpanded = expandedId === experience.id;
            const visibleTechs = experience.technologies.slice(0, maxVisibleTags);
            const overflowCount = Math.max(0, experience.technologies.length - maxVisibleTags);

            return (
              <motion.div
                key={experience.id}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <div
                  className={`exp-row ${experience.isPresent ? 'border-l-2 border-l-ind-accent' : ''}`}
                  onClick={() => setExpandedId(isExpanded ? null : experience.id)}
                >
                  {/* 4-column grid row */}
                  <div className="grid grid-cols-1 md:grid-cols-[180px_1fr_auto_24px] gap-2 md:gap-6 items-start">
                    {/* Left: period */}
                    <div className="font-mono text-sm text-ind-text-dim flex items-center gap-2">
                      {experience.isPresent && (
                        <span className="text-[10px] uppercase tracking-wider bg-ind-accent text-gray-900 px-1.5 py-0.5 font-bold">
                          NOW
                        </span>
                      )}
                      <span className="text-xs">{experience.period}</span>
                    </div>

                    {/* Center: title @ company */}
                    <div className="mono-title text-sm md:text-base">
                      {experience.title}{' '}
                      <span className="text-ind-accent">@</span>{' '}
                      <span className="text-ind-text-dim font-normal">{experience.company}</span>
                    </div>

                    {/* Right: tech tags */}
                    <div className="flex gap-1.5 flex-wrap">
                      {visibleTechs.map((tech) => (
                        <span key={tech} className="tech-tag text-[10px] px-2 py-0.5">{tech}</span>
                      ))}
                      {overflowCount > 0 && (
                        <span className="font-mono text-[10px] text-ind-text-dim px-2 py-0.5">
                          +{overflowCount}
                        </span>
                      )}
                    </div>

                    {/* Chevron expand indicator */}
                    <motion.span
                      animate={{ rotate: isExpanded ? 90 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="text-ind-text-dim ml-auto flex-shrink-0 hidden md:block"
                    >
                      <ChevronRight size={16} />
                    </motion.span>
                  </div>
                </div>

                {/* Expanded content */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-4 py-6 bg-ind-surface/30 border-b border-ind-border/30">
                        <p className="text-ind-text-dim text-sm leading-relaxed mb-4 max-w-3xl">
                          {experience.description}
                        </p>

                        <ul className="space-y-1.5 mb-4">
                          {experience.achievements.map((achievement, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-ind-text-dim">
                              <span className="text-ind-accent font-mono flex-shrink-0">+</span>
                              {achievement}
                            </li>
                          ))}
                        </ul>

                        <div className="flex flex-wrap gap-1.5 mb-3">
                          {experience.technologies.map((tech) => (
                            <span key={tech} className="tech-tag text-[10px] px-2 py-0.5">{tech}</span>
                          ))}
                        </div>

                        <div className="flex items-center gap-1 font-mono text-xs text-ind-text-dim">
                          <MapPin size={12} />
                          {experience.location}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Experience;
