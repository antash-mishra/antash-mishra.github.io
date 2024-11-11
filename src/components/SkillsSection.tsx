import React from 'react';
import { Database, Code2, LineChart, Box, Cloud, Brain, Globe, GitBranch } from 'lucide-react';

interface SkillCardProps {
  icon: React.ReactNode;
  title: string;
  skills: string[];
  color: string;
}

function SkillCard({ icon, title, skills, color }: SkillCardProps) {
  return (
    <div className={`group relative overflow-hidden bg-white/5 backdrop-blur-sm p-6 rounded-xl hover:bg-white/10 transition-all duration-500 transform hover:-translate-y-2`}>
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 -translate-x-full group-hover:translate-x-full transition-all duration-1000" />
      <div className={`flex items-center gap-4 mb-6 ${color}`}>
        <div className="p-3 bg-white/5 rounded-lg group-hover:scale-110 transition-transform duration-300">
          {icon}
        </div>
        <h3 className="text-xl font-bold">{title}</h3>
      </div>
      <ul className="space-y-2">
        {skills.map((skill, index) => (
          <li key={index} className="flex items-center gap-2 text-gray-300">
            <GitBranch className="w-4 h-4 text-gray-500" />
            {skill}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function SkillsSection() {
  const skills = [
    {
      icon: <Code2 size={32} />,
      title: "Programming",
      color: "text-blue-400",
      skills: ["Python", "JavaScript", "TypeScript"]
    },
    {
      icon: <Database size={32} />,
      title: "Data Engineering",
      color: "text-purple-400",
      skills: ["SQL/NoSQL", "ETL Pipelines", "Data Warehousing", "Data Modeling"]
    },
    {
      icon: <LineChart size={32} />,
      title: "Data Visualization",
      color: "text-indigo-400",
      skills: ["Power BI", "D3.js", "Plotly", "QuickSight"]
    },
    {
      icon: <Box size={32} />,
      title: "3D Graphics",
      color: "text-cyan-400",
      skills: ["Three.js", "WebGL", "React Three Fiber", "GLSL"]
    },
    {
      icon: <Cloud size={32} />,
      title: "Cloud & DevOps",
      color: "text-sky-400",
      skills: ["AWS", "Docker", "CI/CD", "Microservices"]
    },
    {
      icon: <Brain size={32} />,
      title: "Machine Learning",
      color: "text-violet-400",
      skills: ["PyTorch", "Neural Networks", "Transformers", "NLP(LLM, RAG)", "Stable Diffusion"]
    },
    {
      icon: <Globe size={32} />,
      title: "Web Development",
      color: "text-teal-400",
      skills: ["React", "React Native", "Next.js", "Flask", "Fast API"]
    }
  ];

  return (
    <div className="container mx-auto px-4 py-20">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold mb-4">Skills & Expertise</h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Leveraging cutting-edge technologies to transform complex data into actionable insights
          and immersive visualizations
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {skills.map((skill, index) => (
          <SkillCard
            key={index}
            icon={skill.icon}
            title={skill.title}
            skills={skill.skills}
            color={skill.color}
          />
        ))}
      </div>
    </div>
  );
}