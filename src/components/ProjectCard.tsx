import React from 'react';
import { LucideIcon } from 'lucide-react';

interface ProjectCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  link: string;
  color: string;
}

export default function ProjectCard({ icon: Icon, title, description, link, color }: ProjectCardProps) {
  return (
    <div className="group relative bg-white/5 p-6 rounded-xl hover:bg-white/10 transition-all duration-300 transform hover:-translate-y-2">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[rgba(255,255,255,0.1)] to-transparent opacity-0 group-hover:opacity-100 transform -translate-x-full group-hover:translate-x-full transition-all duration-1000" />
      <Icon className={`w-12 h-12 mb-4 ${color}`} />
      <h3 className="text-2xl font-bold mb-2">{title}</h3>
      <p className="text-gray-400 mb-4">{description}</p>
      <a href={link} className={`${color} hover:brightness-125 transition-all`}>
        View Project →
      </a>
    </div>
  );
}