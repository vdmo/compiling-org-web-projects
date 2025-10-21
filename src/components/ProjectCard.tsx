import { ArrowRight } from "lucide-react";
import React from "react";

interface ProjectCardProps {
  title: string;
  description: string;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
}) => {
  return (
    <div className="border border-white/10 rounded-lg p-6 bg-black/30 backdrop-blur-sm hover:border-white/20 transition-all duration-300 group relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-purple-900/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      <div className="relative z-10">
        <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
        <p className="text-gray-400 mb-4 h-24">{description}</p>
        <a
          href="#"
          className="text-sm font-medium text-white/50 group-hover:text-white flex items-center transition-colors"
        >
          Explore
          <ArrowRight className="ml-1 h-4 w-4 transform transition-transform group-hover:translate-x-1" />
        </a>
      </div>
    </div>
  );
};