import { ArrowRight } from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Project } from "@/data/projects";
import { ProjectCard3D } from "@/components/three/ProjectCard3D";

interface ProjectCardProps {
  title: string;
  description: string;
  href: string;
  color?: string;
  tags?: string[];
  status?: string;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  href,
  color = "#ffffff",
  tags = [],
  status = "active",
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const isExternal = href.startsWith("http");
  const CardWrapper = isExternal ? "a" : Link;
  const linkProps = isExternal
    ? { href, target: "_blank", rel: "noopener noreferrer" }
    : { to: href };

  return (
    <CardWrapper
      {...(linkProps as any)}
      className="border border-white/10 rounded-lg p-6 bg-black/30 backdrop-blur-sm hover:border-white/20 transition-all duration-300 group relative overflow-hidden block"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <ProjectCard3D color={color} isHovered={isHovered} />
      <div
        className="absolute top-0 left-0 w-full h-full bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `linear-gradient(135deg, ${color}15 0%, transparent 100%)`,
        }}
      ></div>
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-xl font-semibold text-white">{title}</h3>
          {status && (
            <span
              className="text-xs px-2 py-1 rounded-full border"
              style={{
                borderColor: `${color}40`,
                color: color,
                background: `${color}10`,
              }}
            >
              {status}
            </span>
          )}
        </div>
        <p className="text-gray-400 mb-4 min-h-[96px]">{description}</p>
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-4">
            {tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="text-xs px-2 py-1 bg-white/5 rounded text-gray-500"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
        <div className="text-sm font-medium text-white/50 group-hover:text-white flex items-center transition-colors">
          Explore
          <ArrowRight className="ml-1 h-4 w-4 transform transition-transform group-hover:translate-x-1" />
        </div>
      </div>
    </CardWrapper>
  );
};
